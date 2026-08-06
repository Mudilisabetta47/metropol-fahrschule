// KI-Mailassistent der Fahrschule Metropol (Lovable AI Gateway, Responses API).
// Beantwortet Standardanfragen ausschließlich aus der hinterlegten Wissensbasis
// und markiert alles andere für die manuelle Bearbeitung.

import { KNOWLEDGE_BASE, SIGNATURE } from "./knowledge-base.ts";

export const COMPANY_CONTEXT = KNOWLEDGE_BASE;

export type AiCategory =
  | "preise"
  | "klassen"
  | "angebote"
  | "anmeldung"
  | "unterlagen"
  | "dauer"
  | "theoriekurs"
  | "oeffnungszeiten"
  | "standort"
  | "fahrzeuge"
  | "kontakt"
  | "sonstige_standardfrage"
  | "preisverhandlung"
  | "rabatt"
  | "beschwerde"
  | "vertrag"
  | "rechtliches"
  | "unklar"
  | "zusage"
  | "absage"
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
  /** true = darf vollständig aus der Wissensbasis beantwortet werden */
  can_auto_answer: boolean;
  needs_manager: boolean;
  auto_reply_subject: string | null;
  auto_reply_body: string | null;
}

const AUTO_CATEGORIES: AiCategory[] = [
  "preise",
  "klassen",
  "angebote",
  "anmeldung",
  "unterlagen",
  "dauer",
  "theoriekurs",
  "oeffnungszeiten",
  "standort",
  "fahrzeuge",
  "kontakt",
  "sonstige_standardfrage",
];

const MANUAL_CATEGORIES: AiCategory[] = [
  "preisverhandlung",
  "rabatt",
  "beschwerde",
  "vertrag",
  "rechtliches",
  "unklar",
  "absage",
  "dokument_angefordert",
];

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "category",
    "summary",
    "recommendation",
    "confidence",
    "is_irrelevant",
    "can_auto_answer",
    "needs_manager",
    "auto_reply_subject",
    "auto_reply_body",
  ],
  properties: {
    category: {
      type: "string",
      enum: [
        "preise", "klassen", "angebote", "anmeldung", "unterlagen", "dauer",
        "theoriekurs", "oeffnungszeiten", "standort", "fahrzeuge", "kontakt",
        "sonstige_standardfrage", "preisverhandlung", "rabatt", "beschwerde",
        "vertrag", "rechtliches", "unklar", "zusage", "absage", "termin",
        "dokument_angefordert", "abwesenheit", "spam", "irrelevant",
      ],
    },
    summary: { type: "string" },
    recommendation: { type: "string" },
    confidence: { type: "number" },
    is_irrelevant: { type: "boolean" },
    can_auto_answer: { type: "boolean" },
    needs_manager: { type: "boolean" },
    auto_reply_subject: { type: ["string", "null"] },
    auto_reply_body: { type: ["string", "null"] },
  },
} as const;

const SYSTEM = `Du bist der KI-Mailassistent der Fahrschule Metropol. Du analysierst eingehende E-Mails
und formulierst – wenn möglich – eine fertige, versandfertige Antwort auf Deutsch.

ABSOLUTE REGEL: Du darfst ausschließlich Informationen aus der unten stehenden Wissensbasis verwenden.
Erfinde niemals Preise, Termine, Fristen, Rabatte, Zahlungsmodelle oder Zusagen.
Ratenzahlung/Finanzierung gibt es NICHT – behaupte das niemals.
Fehlt eine benötigte Information in der Wissensbasis, ist can_auto_answer = false.

can_auto_answer = true nur bei klaren Standardfragen, die vollständig aus der Wissensbasis
beantwortbar sind: Preise/Kosten, "gute Preise?", Führerscheinklassen, Angebote/Kurse,
Anmeldung, benötigte Unterlagen, Dauer, Theoriekurse, Öffnungszeiten, Standort/Anfahrt,
Schalt- und Automatikfahrzeuge, sofortiger Start, Erreichbarkeit/Kontakt.

can_auto_answer = false und needs_manager = true bei: individuellen Preisverhandlungen,
Sonderrabatten, Beschwerden, Verträgen/Kündigungen/Rückerstattungen, rechtlichen Fragen,
unklaren oder mehrdeutigen Anfragen, Absagen und jedem Fall ohne sichere Faktenlage.

is_irrelevant = true bei Autorespondern, Abwesenheitsnotizen, Spam, Werbung, Newslettern
und leeren Nachrichten. Dann keine Antwort formulieren.

Wenn can_auto_answer = true:
- auto_reply_subject: kurzer, passender Betreff.
- auto_reply_body: höfliche, klar strukturierte Antwort (Anrede, Antwort, kurzer Hinweis auf
  Rückfragen), reiner Text, maximal ca. 200 Wörter, endend mit exakt dieser Signatur:
${SIGNATURE}
- Nenne bei Preisfragen die hinterlegten Einzelpreise und weise darauf hin, dass die Gesamtkosten
  von der individuell benötigten Anzahl Fahrstunden abhängen.
Sonst beide Auto-Reply-Felder null.

summary: max. 2 Sätze. recommendation: max. 1 Satz. confidence: 0 bis 1.

WISSENSBASIS:
${KNOWLEDGE_BASE}

Antworte als JSON gemäß Schema.`;

const FALLBACK: AiAnalysis = {
  category: "unklar",
  summary: "Antwort eingegangen – automatische Analyse nicht verfügbar.",
  recommendation: "Nachricht manuell prüfen und beantworten.",
  confidence: 0,
  is_irrelevant: false,
  can_auto_answer: false,
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

Eingegangene E-Mail:
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
    const analysis: AiAnalysis = {
      ...FALLBACK,
      ...parsed,
      confidence: Number.isFinite(parsed.confidence) ? Math.max(0, Math.min(1, parsed.confidence)) : 0,
    };

    // Harte Sicherheitsnetze: nie automatisch antworten, wenn Kategorie oder
    // Antworttext dagegen sprechen.
    if (MANUAL_CATEGORIES.includes(analysis.category)) {
      analysis.can_auto_answer = false;
      analysis.needs_manager = true;
    }
    if (!AUTO_CATEGORIES.includes(analysis.category)) {
      analysis.can_auto_answer = false;
    }
    if (analysis.is_irrelevant) {
      analysis.can_auto_answer = false;
      analysis.needs_manager = false;
    }
    if (!analysis.auto_reply_body || analysis.auto_reply_body.trim().length < 20) {
      analysis.can_auto_answer = false;
    }
    // Verbotene Aussagen abfangen (z. B. Ratenzahlung).
    if (analysis.auto_reply_body && /ratenzahlung|raten|finanzierung|in raten/i.test(analysis.auto_reply_body)) {
      if (!/keine ratenzahlung|keine finanzierung/i.test(analysis.auto_reply_body)) {
        analysis.can_auto_answer = false;
        analysis.needs_manager = true;
      }
    }
    if (analysis.confidence < 0.7) {
      analysis.can_auto_answer = false;
      if (!analysis.is_irrelevant) analysis.needs_manager = true;
    }
    if (!analysis.can_auto_answer && !analysis.is_irrelevant &&
        !["zusage", "termin"].includes(analysis.category)) {
      analysis.needs_manager = true;
    }
    return analysis;
  } catch (err) {
    console.error("KI-Analyse Fehler:", err);
    return FALLBACK;
  }
}
