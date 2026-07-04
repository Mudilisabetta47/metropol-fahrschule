// Shared Resend sender with exponential backoff retry.
// Policy:
//   - Max 5 attempts (1 initial + 4 retries)
//   - Exponential backoff: 500ms, 1s, 2s, 4s, 8s (+/- 30% jitter)
//   - Cap: 15 seconds per wait
//   - Retries on: network errors, HTTP 429 (respects Retry-After header), 5xx
//   - Fails fast on: other 4xx (bad request, invalid recipient, auth error, ...)

export interface SendResult {
  ok: boolean;
  status: number;
  data: unknown;
  attempts: number;
  error?: string;
}

const RESEND_URL = "https://api.resend.com/emails";
const MAX_ATTEMPTS = 5;
const BASE_DELAY_MS = 500;
const MAX_DELAY_MS = 15_000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function backoffDelay(attempt: number): number {
  // attempt is 1-based; delay after attempt N = base * 2^(N-1)
  const raw = Math.min(MAX_DELAY_MS, BASE_DELAY_MS * 2 ** (attempt - 1));
  const jitter = raw * (0.7 + Math.random() * 0.6); // 70-130%
  return Math.round(jitter);
}

function parseRetryAfter(header: string | null): number | null {
  if (!header) return null;
  const secs = Number(header);
  if (!Number.isNaN(secs)) return Math.min(MAX_DELAY_MS, secs * 1000);
  const dateMs = Date.parse(header);
  if (!Number.isNaN(dateMs)) return Math.max(0, Math.min(MAX_DELAY_MS, dateMs - Date.now()));
  return null;
}

/**
 * Send an email via Resend with exponential-backoff retry.
 * Returns a SendResult; never throws for delivery failures — caller decides how to react.
 */
export async function sendEmailWithRetry(
  apiKey: string,
  payload: Record<string, unknown>,
  label = "email",
): Promise<SendResult> {
  let lastStatus = 0;
  let lastData: unknown = null;
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(RESEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      lastStatus = res.status;
      lastData = data;

      if (res.ok) {
        if (attempt > 1) console.log(`[retry] ${label} succeeded on attempt ${attempt}/${MAX_ATTEMPTS}`);
        return { ok: true, status: res.status, data, attempts: attempt };
      }

      const retriable = res.status === 429 || res.status >= 500;
      if (!retriable || attempt === MAX_ATTEMPTS) {
        console.error(`[retry] ${label} failed permanently [${res.status}] attempt ${attempt}: ${JSON.stringify(data)}`);
        return {
          ok: false,
          status: res.status,
          data,
          attempts: attempt,
          error: `HTTP ${res.status}: ${JSON.stringify(data)}`,
        };
      }

      const retryAfter = parseRetryAfter(res.headers.get("retry-after"));
      const wait = retryAfter ?? backoffDelay(attempt);
      console.warn(`[retry] ${label} transient [${res.status}] attempt ${attempt}/${MAX_ATTEMPTS} — retry in ${wait}ms`);
      await sleep(wait);
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      if (attempt === MAX_ATTEMPTS) {
        console.error(`[retry] ${label} network error final attempt ${attempt}: ${lastError}`);
        return { ok: false, status: 0, data: null, attempts: attempt, error: lastError };
      }
      const wait = backoffDelay(attempt);
      console.warn(`[retry] ${label} network error attempt ${attempt}/${MAX_ATTEMPTS} — retry in ${wait}ms: ${lastError}`);
      await sleep(wait);
    }
  }

  return {
    ok: false,
    status: lastStatus,
    data: lastData,
    attempts: MAX_ATTEMPTS,
    error: lastError ?? `HTTP ${lastStatus}`,
  };
}
