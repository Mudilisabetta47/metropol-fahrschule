import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Search, LogOut, MessageSquare, Send, ChevronRight,
  Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle,
  PhoneCall, MailOpen, ExternalLink, Inbox, PhoneForwarded,
  Trash2, Users, Sparkles, Image as ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { User } from "@supabase/supabase-js";

interface Inquiry {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  location: string;
  license_class: string | null;
  message: string | null;
  status: string;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
}

const statusConfig: Record<string, { color: string; icon: typeof Inbox; label: string }> = {
  neu: { color: "bg-primary/10 text-primary border-primary/30", icon: Sparkles, label: "Neu" },
  "in bearbeitung": { color: "bg-blue-500/10 text-blue-600 border-blue-500/30", icon: Clock, label: "In Bearbeitung" },
  "rückruf geplant": { color: "bg-amber-500/10 text-amber-600 border-amber-500/30", icon: PhoneForwarded, label: "Rückruf" },
  erledigt: { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30", icon: CheckCircle, label: "Erledigt" },
  spam: { color: "bg-destructive/10 text-destructive border-destructive/30", icon: Trash2, label: "Spam" },
};

const statusOptions = ["neu", "in bearbeitung", "rückruf geplant", "erledigt", "spam"];

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "gerade eben";
  if (diffMin < 60) return `vor ${diffMin} Min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `vor ${diffH} Std`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "gestern";
  if (diffD < 7) return `vor ${diffD} Tagen`;
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Alle");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/login");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    fetchInquiries();
  }, [user]);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Fehler beim Laden", variant: "destructive" });
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Fehler beim Aktualisieren", variant: "destructive" });
    } else {
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      toast({ title: `Status → ${statusConfig[status]?.label || status}`, description: "Erfolgreich aktualisiert." });
    }
  };

  const addNote = async (id: string) => {
    if (!noteText.trim() || !user) return;
    const { error } = await supabase.from("inquiry_notes").insert({
      inquiry_id: id,
      user_id: user.id,
      content: noteText.trim(),
    });
    if (error) {
      toast({ title: "Fehler beim Speichern", variant: "destructive" });
    } else {
      const existing = inquiries.find((i) => i.id === id)?.notes || "";
      const who = user.email?.split("@")[0] || "Mitarbeiter";
      const updatedNotes = existing
        ? `${existing}\n[${new Date().toLocaleDateString("de-DE")} · ${who}] ${noteText.trim()}`
        : `[${new Date().toLocaleDateString("de-DE")} · ${who}] ${noteText.trim()}`;
      await supabase.from("inquiries").update({ notes: updatedNotes }).eq("id", id);
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, notes: updatedNotes } : i)));
      setNoteText("");
      toast({ title: "Notiz gespeichert ✓" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // KPI calculations
  const kpis = useMemo(() => {
    const today = new Date().toDateString();
    return {
      total: inquiries.length,
      neuHeute: inquiries.filter(i => i.status === "neu" && new Date(i.created_at).toDateString() === today).length,
      neu: inquiries.filter(i => i.status === "neu").length,
      offen: inquiries.filter(i => i.status === "in bearbeitung").length,
      rueckruf: inquiries.filter(i => i.status === "rückruf geplant").length,
      erledigt: inquiries.filter(i => i.status === "erledigt").length,
      spam: inquiries.filter(i => i.status === "spam").length,
    };
  }, [inquiries]);

  const filterTabs = [
    { key: "Alle", label: "Alle", count: kpis.total },
    { key: "neu", label: "Neu", count: kpis.neu },
    { key: "in bearbeitung", label: "Offen", count: kpis.offen },
    { key: "rückruf geplant", label: "Rückruf", count: kpis.rueckruf },
    { key: "erledigt", label: "Erledigt", count: kpis.erledigt },
    { key: "spam", label: "Spam", count: kpis.spam },
  ];

  const filtered = inquiries.filter((i) => {
    const matchesSearch = !search || [i.name, i.email, i.phone || "", i.location].some((f) => f.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = activeFilter === "Alle" || i.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const selected = selectedId ? inquiries.find((i) => i.id === selectedId) : null;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-secondary/50 pt-20">
      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-20 z-20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-cta">
              <span className="text-sm font-black text-primary-foreground font-display">M</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground font-display">Anfragen-Dashboard</h1>
              <p className="text-[10px] text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/bilder">
                <ImageIcon className="h-4 w-4 mr-1" /> Bilder
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4 mr-1" /> Abmelden
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-5">
        {/* KPI Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {[
            { label: "Neu heute", value: kpis.neuHeute, icon: Sparkles, accent: "text-primary" },
            { label: "Gesamt", value: kpis.total, icon: Inbox, accent: "text-foreground" },
            { label: "Neu", value: kpis.neu, icon: AlertCircle, accent: "text-primary" },
            { label: "In Bearbeitung", value: kpis.offen, icon: Clock, accent: "text-blue-500" },
            { label: "Rückruf", value: kpis.rueckruf, icon: PhoneForwarded, accent: "text-amber-500" },
            { label: "Erledigt", value: kpis.erledigt, icon: CheckCircle, accent: "text-emerald-500" },
          ].map((kpi) => (
            <div key={kpi.label} className="group rounded-2xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-1">
                <kpi.icon className={`h-3.5 w-3.5 ${kpi.accent}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{kpi.label}</span>
              </div>
              <span className={`text-2xl font-extrabold font-display ${kpi.accent}`}>{kpi.value}</span>
            </div>
          ))}
        </motion.div>

        {/* Search + Filter Chips */}
        <div className="mb-5 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, E-Mail, Telefon oder Standort suchen…"
              className="pl-10 bg-card border-border"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  activeFilter === tab.key
                    ? "gradient-primary text-primary-foreground shadow-cta"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {tab.label}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeFilter === tab.key ? "bg-primary-foreground/20" : "bg-secondary"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-5 lg:grid-cols-5">
          {/* Inquiry List */}
          <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-40" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                <Inbox className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
                <p className="text-sm font-medium text-muted-foreground">Keine Anfragen gefunden</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Passe deine Filter an oder warte auf neue Anfragen.</p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filtered.map((inq, i) => {
                  const sc = statusConfig[inq.status] || statusConfig.neu;
                  const StatusIcon = sc.icon;
                  return (
                    <motion.button
                      key={inq.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      onClick={() => setSelectedId(inq.id)}
                      className={`group w-full text-left rounded-2xl border p-4 transition-all duration-300 ${
                        selectedId === inq.id
                          ? "border-primary/40 bg-card shadow-card-hover ring-1 ring-primary/10"
                          : "border-border bg-card shadow-card hover:shadow-card-hover hover:-translate-y-0.5 hover:border-primary/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-foreground text-sm truncate font-display">{inq.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {inq.phone && (
                              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Phone className="h-3 w-3" /> {inq.phone}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground truncate">
                              <Mail className="h-3 w-3 shrink-0" /> {inq.email}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`shrink-0 text-[10px] font-bold capitalize ${sc.color} gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {sc.label}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60">
                          <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{inq.location}</span>
                          <span>·</span>
                          <span>{inq.license_class || "Keine Klasse"}</span>
                          <span>·</span>
                          <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{timeAgo(inq.created_at)}</span>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-border bg-card p-6 shadow-card"
                >
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-foreground font-display">{selected.name}</h2>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{selected.email}</span>
                        {selected.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{selected.phone}</span>}
                      </div>
                    </div>
                    <Badge variant="outline" className={`capitalize text-xs font-bold gap-1 ${statusConfig[selected.status]?.color || ""}`}>
                      {(() => { const Icon = statusConfig[selected.status]?.icon || Inbox; return <Icon className="h-3.5 w-3.5" />; })()}
                      {statusConfig[selected.status]?.label || selected.status}
                    </Badge>
                  </div>

                  {/* Quick Actions */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-xs" asChild>
                      <a href={`tel:${selected.phone}`}><PhoneCall className="h-3.5 w-3.5 mr-1" /> Anrufen</a>
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs" asChild>
                      <a href={`mailto:${selected.email}`}><MailOpen className="h-3.5 w-3.5 mr-1" /> E-Mail</a>
                    </Button>
                    {selected.phone && (
                      <Button variant="outline" size="sm" className="text-xs" asChild>
                        <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5 mr-1" /> WhatsApp
                        </a>
                      </Button>
                    )}
                    {selected.status !== "erledigt" && (
                      <Button
                        variant="default"
                        size="sm"
                        className="text-xs gradient-primary text-primary-foreground shadow-cta ml-auto"
                        onClick={() => updateStatus(selected.id, "erledigt")}
                      >
                        <CheckCircle className="h-3.5 w-3.5 mr-1" /> Erledigt
                      </Button>
                    )}
                  </div>

                  {/* Info Grid */}
                  <div className="grid gap-3 sm:grid-cols-3 mb-6">
                    {[
                      { label: "Standort", value: selected.location, icon: MapPin },
                      { label: "Klasse", value: selected.license_class || "–", icon: Users },
                      { label: "Eingegangen", value: timeAgo(selected.created_at), icon: Clock },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl bg-secondary/50 border border-border/50 p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <item.icon className="h-3 w-3 text-muted-foreground/50" />
                          <p className="text-[10px] font-bold uppercase text-muted-foreground/50 tracking-widest">{item.label}</p>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Message */}
                  {selected.message && (
                    <div className="mb-6">
                      <p className="mb-2 text-[10px] font-bold uppercase text-muted-foreground/50 tracking-widest">Nachricht</p>
                      <div className="rounded-xl bg-secondary/50 border border-border/50 p-4 text-sm text-foreground leading-relaxed">
                        {selected.message}
                      </div>
                    </div>
                  )}

                  {/* Status Pills */}
                  <div className="mb-6">
                    <p className="mb-2 text-[10px] font-bold uppercase text-muted-foreground/50 tracking-widest">Status ändern</p>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map((s) => {
                        const sc = statusConfig[s];
                        const StatusIcon = sc?.icon || Inbox;
                        return (
                          <button
                            key={s}
                            onClick={() => updateStatus(selected.id, s)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all duration-200 ${
                              selected.status === s
                                ? "gradient-primary text-primary-foreground shadow-cta scale-105"
                                : "bg-secondary/50 border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {sc?.label || s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase text-muted-foreground/50 tracking-widest flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" /> Interne Notizen
                    </p>
                    {selected.notes && (
                      <div className="mb-3 rounded-xl bg-secondary/50 border border-border/50 p-4 text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                        {selected.notes}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Notiz hinzufügen…"
                        rows={2}
                        className="text-sm bg-secondary/30 border-border/50"
                        maxLength={500}
                      />
                      <Button variant="cta" size="icon" onClick={() => addNote(selected.id)} disabled={!noteText.trim()} className="shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-full min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-border/60 bg-card/50 p-12"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                      <ChevronRight className="h-6 w-6 text-muted-foreground/30" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Wähle eine Anfrage</p>
                    <p className="text-xs text-muted-foreground/50 mt-1">Klicke links auf eine Anfrage, um Details zu sehen.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
