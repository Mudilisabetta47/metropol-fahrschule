// Exercise the real edge handler without sending email or writing production data.
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import ts from "typescript";
import { describe, expect, it } from "vitest";

async function savedInquiry(extra: Record<string, unknown>) {
  const source = readFileSync("supabase/functions/notify-inquiry/index.ts", "utf8")
    .replace(/^import .*;\r?\n/gm, "");
  const code = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
  }).outputText;
  let handler: ((req: Request) => Promise<Response>) | undefined;
  let saved: Record<string, unknown> | undefined;
  const client = {
    from: (table: string) => ({
      insert: (row: Record<string, unknown>) => {
        if (table === "inquiries") saved = row;
        return { select: () => ({ single: async () => ({ data: { id: "test-id" }, error: null }) }) };
      },
    }),
  };
  new Function("Deno", "createClient", "sendEmailWithRetry", "esc", "isEmail", "crypto", code)(
    { env: { get: () => "configured-for-test" }, serve: (fn: typeof handler) => { handler = fn; } },
    () => client,
    async () => ({ ok: true, attempts: 1 }),
    (value: string) => value,
    (value: string) => value.includes("@"),
    { randomUUID },
  );
  if (!handler) throw new Error("Edge handler was not registered");
  const response = await handler(new Request("https://example.test/notify-inquiry", {
    method: "POST",
    body: JSON.stringify({
      name: "Messe Test", email: "messe@example.test", location: "Hannover",
      turnstile_token: btoa(JSON.stringify({ a: 2, b: 3, answer: 5, t: Date.now() })),
      ...extra,
    }),
  }));
  expect(response.status).toBe(200);
  return saved;
}

describe("notify-inquiry persistence", () => {
  const metadata = {
    source: "messe", campaign: "MESSE_2026",
    birth_date: "2000-05-12", contact_preference: "whatsapp",
  };

  it.each(Object.entries(metadata))("preserves Messe %s", async (field, value) => {
    expect((await savedInquiry(metadata))?.[field]).toBe(value);
  });

  it("keeps ordinary inquiries classified as website", async () => {
    expect(await savedInquiry({})).toMatchObject({
      source: "website", campaign: null, birth_date: null, contact_preference: null,
    });
  });
});