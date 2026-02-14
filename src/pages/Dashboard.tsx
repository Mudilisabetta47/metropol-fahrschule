import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, LogOut, Filter, MessageSquare, Send, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
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

const statusColors: Record<string, string> = {
  neu: "bg-primary/10 text-primary border-primary/20",
  "in bearbeitung": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "rückruf geplant": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  erledigt: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  spam: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusOptions = ["neu", "in bearbeitung", "rückruf geplant", "erledigt", "spam"];
const locationOptions = ["Alle", "Bremen", "Garbsen", "Hannover"];

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Alle");
  const [filterLocation, setFilterLocation] = useState("Alle");
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
      toast({ title: `Status → ${status}` });
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
      // Also update the inline notes field for quick view
      const existing = inquiries.find((i) => i.id === id)?.notes || "";
      const updatedNotes = existing ? `${existing}\n[${new Date().toLocaleDateString("de-DE")}] ${noteText.trim()}` : `[${new Date().toLocaleDateString("de-DE")}] ${noteText.trim()}`;
      await supabase.from("inquiries").update({ notes: updatedNotes }).eq("id", id);
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, notes: updatedNotes } : i)));
      setNoteText("");
      toast({ title: "Notiz gespeichert" });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const filtered = inquiries.filter((i) => {
    const matchesSearch = !search || [i.name, i.email, i.phone || ""].some((f) => f.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = filterStatus === "Alle" || i.status === filterStatus;
    const matchesLocation = filterLocation === "Alle" || i.location === filterLocation;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const selected = selectedId ? inquiries.find((i) => i.id === selectedId) : null;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-secondary pt-20">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-foreground font-display">Dashboard</h1>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Abmelden
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name, E-Mail oder Telefon suchen…" className="pl-10" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-3.5 w-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alle">Alle Status</SelectItem>
              {statusOptions.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locationOptions.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="flex items-center text-xs text-muted-foreground">
            {filtered.length} Anfrage{filtered.length !== 1 ? "n" : ""}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* List */}
          <div className="lg:col-span-2 space-y-2 max-h-[75vh] overflow-y-auto pr-1">
            {loading ? (
              <div className="py-12 text-center text-sm text-muted-foreground">Laden…</div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">Keine Anfragen gefunden.</div>
            ) : (
              filtered.map((inq) => (
                <motion.button
                  key={inq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedId(inq.id)}
                  className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 ${
                    selectedId === inq.id ? "border-primary bg-card shadow-card-hover" : "border-border bg-card shadow-card hover:shadow-card-hover"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{inq.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{inq.email}</p>
                    </div>
                    <Badge variant="outline" className={`shrink-0 text-[10px] capitalize ${statusColors[inq.status] || ""}`}>
                      {inq.status}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{inq.location}</span>
                    <span>·</span>
                    <span>{inq.license_class || "Keine Klasse"}</span>
                    <span>·</span>
                    <span>{new Date(inq.created_at).toLocaleDateString("de-DE")}</span>
                  </div>
                </motion.button>
              ))
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-3xl border border-border bg-card p-6 shadow-card"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground font-display">{selected.name}</h2>
                    <p className="text-sm text-muted-foreground">{selected.email} · {selected.phone || "Kein Telefon"}</p>
                  </div>
                  <Badge variant="outline" className={`capitalize text-xs ${statusColors[selected.status] || ""}`}>
                    {selected.status}
                  </Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                  <div className="rounded-xl bg-secondary p-3">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Standort</p>
                    <p className="text-sm font-semibold text-foreground">{selected.location}</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Klasse</p>
                    <p className="text-sm font-semibold text-foreground">{selected.license_class || "–"}</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Eingegangen</p>
                    <p className="text-sm font-semibold text-foreground">{new Date(selected.created_at).toLocaleString("de-DE")}</p>
                  </div>
                </div>

                {selected.message && (
                  <div className="mb-6">
                    <p className="mb-1 text-xs font-bold uppercase text-muted-foreground tracking-widest">Nachricht</p>
                    <p className="rounded-xl bg-secondary p-4 text-sm text-foreground leading-relaxed">{selected.message}</p>
                  </div>
                )}

                {/* Status ändern */}
                <div className="mb-6">
                  <p className="mb-2 text-xs font-bold uppercase text-muted-foreground tracking-widest">Status ändern</p>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                          selected.status === s
                            ? "gradient-primary text-primary-foreground shadow-cta"
                            : "bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="mb-2 text-xs font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5" /> Notizen
                  </p>
                  {selected.notes && (
                    <div className="mb-3 rounded-xl bg-secondary p-4 text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                      {selected.notes}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Notiz hinzufügen…"
                      rows={2}
                      className="text-sm"
                      maxLength={500}
                    />
                    <Button variant="cta" size="icon" onClick={() => addNote(selected.id)} disabled={!noteText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-3xl border border-border bg-card p-12 shadow-card">
                <div className="text-center">
                  <ChevronRight className="mx-auto mb-3 h-8 w-8 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">Wähle eine Anfrage aus der Liste.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
