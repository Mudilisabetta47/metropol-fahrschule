// KI-Analyse eingehender Fahrschul-Antworten über das Lovable AI Gateway (Responses API).
// Liefert Kategorie, Zusammenfassung, Empfehlung und – falls möglich – eine fertige Standardantwort.

export const COMPANY_CONTEXT = `
Unternehmen: Fahrschule Metropol (Inh. Vedat Özel), Standorte Hannover, Garbsen, Bremen.
Website: fahrschule-metropol.de
Zahlung: Barzahlung oder Kartenzahlung vor Ort. Keine Ratenzahlung.
Zusammenarbeit: Anfragen von Interessenten werden automatisch an den passenden Standort weitergeleitet.
Es fallen keine Provisionen und keine Vermittlungsgebühren an.
Benötigte Unterlagen von Interessenten: Personalausweis, Sehtest, Erste-Hilfe-Kurs, Passbild.
Auszahlungen/Abrechnungen erfolgen nicht, da keine Provisionsmodelle bestehen.
Ausbildung: Zertifizierte Ausbildung, alle gängigen Klassen (B, B197, B196, B96, BE, A, A1, A2, AM, L).
Öffnungszeiten: Mo–Fr; Sa/So geschlossen.
`.trim();

export type AiCategory =
  | "preisangebot"
  | "zusage"
  | "absage"
  | "rueckfrage"
  | "termin"
  | "dokument_angefordert"
  | "abwesenheit"
  | "spam"
  | "irrelevant";

export interface AiAnalysis {
  category: AiCategory;
  summary: string;
  recommendation: string;
  confidence: number;
  is_irrelevant: boolean;
  needs_manager: boolean;
  auto_reply_subject: string | null;
  auto_reply_body: string | null;
}

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "category",
    "summary",
    "recommendation",
    "confidence",
    "is_irrelevant",
    "needs_manager",
    "auto_reply_subject",
    "auto_reply_body",
  ],
  properties: {
    category: {
      type: "string",
      enum: [
        "preisangebot",
        "zusage",
        "absage",
        "rueckfrage",
        "termin",
        "dokument_angefordert",
        "abwesenheit",
        "spam",
        "irrelevant",
      ],
    },
    summary: { type: "string" },
    recommendation: { type: "string" },
    confidence: { type: "number" },
    is_irrelevant: { type: "boolean" },
    needs_manager: { type: "boolean" },
    auto_reply_subject: { type: ["string", "null"] },
    auto_reply_body: { type: ["string", "null"] },
  },
} as const;

const SYSTEM = `Du bist der Assistent des Anfrage-Managements der Fahrschule Metropol.
Analysiere eine eingehende E-Mail-Antwort zu einer Anfrage.

Regeln:
- category: preisangebot, zusage, absage, rueckfrage, termin, dokument_angefordert, abwesenheit, spam oder irrelevant.
- is_irrelevant = true bei Autorespondern, Abwesenheitsnotizen, Spam, Werbung, Newslettern und leeren Antworten.
- needs_manager = true nur bei Absagen, fehlenden wichtigen Informationen, Beschwerden, unklaren oder wichtigen Fällen.
- summary: maximal 2 Sätze, deutsch. recommendation: eine konkrete Handlungsempfehlung, maximal 1 Satz.
- confidence: 0 bis 1.
- auto_reply_body nur ausfüllen, wenn es eine eindeutige Standardfrage ist (Provision, Gebühren, Ablauf der Zusammenarbeit, benötigte Unterlagen, weitere Informationen, Auszahlung).
  Dann höflich, kurz, deutsch, mit Grußformel "Mit freundlichen Grüßen\\nFahrschule Metropol". Sonst beide Auto-Reply-Felder auf null.
- Erfinde keine Preise, Fristen oder Zusagen. Nutze ausschließlich die Unternehmensinformationen.

Unternehmensinformationen:
${COMPANY_CONTEXT}

Antworte als JSON gemäß Schema.`;

const FALLBACK: AiAnalysis = {
  category: "rueckfrage",
  summary: "Antwort eingegangen – automatische Analyse nicht verfügbar.",
  recommendation: "Antwort manuell prüfen.",
  confidence: 0,
  is_irrelevant: false,
  needs_manager: true,
  auto_reply_subject: null,
  auto_reply_body: null,
};

export async function analyzeReply(input: {
  inquiryName: string;
  location: string;
  licenseClass: string | null;
  originalMessage: string | null;
  fromEmail: string;
  subject: string;
  body: string;
}): Promise<AiAnalysis> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return FALLBACK;

  const userText = `Ursprüngliche Anfrage:
Interessent: ${input.inquiryName}
Standort: ${input.location}
Klasse: ${input.licenseClass ?? "keine Angabe"}
Nachricht: ${input.originalMessage ?? "-"}

Eingegangene Antwort:
Von: ${input.fromEmail}
Betreff: ${input.subject}
Text:
${input.body.slice(0, 6000)}`;

  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-5.6-sol",
        stream: true,
        instructions: SYSTEM,
        input: [{ role: "user", content: [{ type: "input_text", text: userText }] }],
        store: false,
        reasoning: { effort: "low", summary: "auto" },
        text: {
          format: { type: "json_schema", name: "reply_analysis", strict: true, schema: SCHEMA },
        },
      }),
    });

    if (!res.ok || !res.body) {
      console.error("KI-Analyse fehlgeschlagen:", res.status, await res.text().catch(() => ""));
      return FALLBACK;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    let text = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const evt = JSON.parse(payload);
          if (evt.type === "response.output_text.delta" && typeof evt.delta === "string") text += evt.delta;
          if (evt.type === "response.completed" && !text && evt.response?.output_text) text = evt.response.output_text;
        } catch {
          // Teil-Event ignorieren
        }
      }
    }

    if (!text.trim()) return FALLBACK;
    const parsed = JSON.parse(text) as AiAnalysis;
    return {
      ...FALLBACK,
      ...parsed,
      confidence: Number.isFinite(parsed.confidence) ? Math.max(0, Math.min(1, parsed.confidence)) : 0,
    };
  } catch (err) {
    console.error("KI-Analyse Fehler:", err);
    return FALLBACK;
  }
}
