import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bot, ArrowDownLeft, ArrowUpRight, Sparkles, AlertTriangle, Timer, Hash, Loader2 } from "lucide-react";

interface Message {
  id: string;
  direction: string;
  from_email: string | null;
  to_email: string | null;
  subject: string | null;
  body_text: string | null;
  is_auto_generated: boolean;
  ai_category: string | null;
  received_at: string;
}

export interface InquiryAiFields {
  id: string;
  tracking_code?: string | null;
  ai_category?: string | null;
  ai_summary?: string | null;
  ai_recommendation?: string | null;
  ai_confidence?: number | null;
  is_irrelevant?: boolean | null;
  replied_at?: string | null;
  response_time_minutes?: number | null;
  auto_replied_at?: string | null;
  escalated_at?: string | null;
}

const categoryLabels: Record<string, string> = {
  preisangebot: "Preisangebot",
  zusage: "Zusage",
  absage: "Absage",
  rueckfrage: "Rückfrage",
  termin: "Terminvorschlag",
  dokument_angefordert: "Unterlagen angefordert",
  abwesenheit: "Abwesenheit",
  spam: "Spam",
  irrelevant: "Irrelevant",
};

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} Min`;
  const h = Math.floor(minutes / 60);
  if (h < 24) return `${h} Std ${minutes % 60} Min`;
  return `${Math.floor(h / 24)} Tage ${h % 24} Std`;
}

const InquiryConversation = ({ inquiry }: { inquiry: InquiryAiFields }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from("inquiry_messages")
      .select("id, direction, from_email, to_email, subject, body_text, is_auto_generated, ai_category, received_at")
      .eq("inquiry_id", inquiry.id)
      .order("received_at", { ascending: true })
      .then(({ data }) => {
        if (!active) return;
        setMessages(data || []);
        setLoading(false);
      });
    return () => { active = false; };
  }, [inquiry.id]);

  const hasAi = Boolean(inquiry.ai_summary);

  return (
    <div className="mb-6 space-y-4">
      {/* Tracking & Reaktionszeit */}
      <div className="flex flex-wrap items-center gap-2">
        {inquiry.tracking_code && (
          <Badge variant="outline" className="gap-1 font-mono text-[10px] text-muted-foreground">
            <Hash className="h-3 w-3" />{inquiry.tracking_code}
          </Badge>
        )}
        {inquiry.replied_at ? (
          <Badge variant="outline" className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-[10px] font-bold text-emerald-600">
            <Timer className="h-3 w-3" />
            Antwort nach {formatDuration(inquiry.response_time_minutes ?? 0)}
          </Badge>
        ) : (
          <Badge variant="outline" className="gap-1 text-[10px] font-bold text-muted-foreground">
            <Timer className="h-3 w-3" /> Noch keine Antwort
          </Badge>
        )}
        {inquiry.auto_replied_at && (
          <Badge variant="outline" className="gap-1 border-primary/30 bg-primary/10 text-[10px] font-bold text-primary">
            <Bot className="h-3 w-3" /> Automatisch beantwortet
          </Badge>
        )}
        {inquiry.escalated_at && (
          <Badge variant="outline" className="gap-1 border-amber-500/30 bg-amber-500/10 text-[10px] font-bold text-amber-600">
            <AlertTriangle className="h-3 w-3" /> An GF eskaliert
          </Badge>
        )}
        {inquiry.is_irrelevant && (
          <Badge variant="outline" className="text-[10px] font-bold text-muted-foreground">Automatisch gefiltert</Badge>
        )}
      </div>

      {/* KI-Analyse */}
      {hasAi && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-primary/20 bg-primary/5 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">KI-Analyse</p>
            {inquiry.ai_category && (
              <Badge variant="outline" className="ml-auto text-[10px] font-bold">
                {categoryLabels[inquiry.ai_category] || inquiry.ai_category}
                {typeof inquiry.ai_confidence === "number" && ` · ${Math.round(inquiry.ai_confidence * 100)}%`}
              </Badge>
            )}
          </div>
          <p className="text-sm leading-relaxed text-foreground">{inquiry.ai_summary}</p>
          {inquiry.ai_recommendation && (
            <p className="mt-2 text-xs font-semibold text-muted-foreground">
              Empfehlung: <span className="text-foreground">{inquiry.ai_recommendation}</span>
            </p>
          )}
        </motion.div>
      )}

      {/* Verlauf */}
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">E-Mail-Verlauf</p>
        {loading ? (
          <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/40 p-4 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Verlauf wird geladen …
          </div>
        ) : messages.length === 0 ? (
          <div className="rounded-xl border border-border/50 bg-secondary/40 p-4 text-xs text-muted-foreground">
            Noch keine erfassten E-Mails zu dieser Anfrage.
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((m) => {
              const inbound = m.direction === "inbound";
              return (
                <div
                  key={m.id}
                  className={`rounded-xl border p-3 ${
                    inbound ? "border-border/60 bg-secondary/50" : "border-primary/20 bg-primary/5"
                  }`}
                >
                  <div className="mb-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    {inbound ? <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-600" /> : <ArrowUpRight className="h-3.5 w-3.5 text-primary" />}
                    <span className="font-semibold text-foreground">{inbound ? m.from_email : m.to_email}</span>
                    {m.is_auto_generated && (
                      <Badge variant="outline" className="gap-1 px-1.5 py-0 text-[9px] font-bold">
                        <Bot className="h-2.5 w-2.5" /> Auto
                      </Badge>
                    )}
                    <span className="ml-auto shrink-0">
                      {new Date(m.received_at).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  {m.subject && <p className="mb-1 text-xs font-bold text-foreground">{m.subject}</p>}
                  <p className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground line-clamp-[12]">{m.body_text}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryConversation;
