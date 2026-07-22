import { useEffect, useState } from "react";

// Weekly schedule per location. Times are in Europe/Berlin, 24h format.
// Multiple intervals per day are supported (e.g. lunch break).
type Interval = { open: string; close: string };
type Schedule = Interval[][]; // index 0 = Sunday ... 6 = Saturday

const SCHEDULES: Record<string, Schedule> = {
  // Mo–Fr: 10:00–13:30, 14:30–19:00 Uhr · Sa/So geschlossen
  hannover: [
    [], // Sun
    [{ open: "10:00", close: "13:30" }, { open: "14:30", close: "19:00" }],
    [{ open: "10:00", close: "13:30" }, { open: "14:30", close: "19:00" }],
    [{ open: "10:00", close: "13:30" }, { open: "14:30", close: "19:00" }],
    [{ open: "10:00", close: "13:30" }, { open: "14:30", close: "19:00" }],
    [{ open: "10:00", close: "13:30" }, { open: "14:30", close: "19:00" }],
    [], // Sat
  ],
  bremen: [
    [],
    [{ open: "10:00", close: "13:30" }, { open: "14:30", close: "19:00" }],
    [{ open: "10:00", close: "13:30" }, { open: "14:30", close: "19:00" }],
    [{ open: "10:00", close: "13:30" }, { open: "14:30", close: "19:00" }],
    [{ open: "10:00", close: "13:30" }, { open: "14:30", close: "19:00" }],
    [{ open: "10:00", close: "13:30" }, { open: "14:30", close: "19:00" }],
    [],
  ],
  // Mo–Fr: 14:30–18:30 Uhr · Sa/So geschlossen
  garbsen: [
    [],
    [{ open: "14:30", close: "18:30" }],
    [{ open: "14:30", close: "18:30" }],
    [{ open: "14:30", close: "18:30" }],
    [{ open: "14:30", close: "18:30" }],
    [{ open: "14:30", close: "18:30" }],
    [],
  ],
};

const DAY_LABELS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Read current Berlin wall-clock time as { day: 0-6, minutes: 0-1439 }. */
function getBerlinNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const wk = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hh = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const mm = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return { day: dayMap[wk] ?? 1, minutes: (hh % 24) * 60 + mm };
}

function computeStatus(schedule: Schedule) {
  const { day, minutes } = getBerlinNow();

  // Currently open?
  for (const iv of schedule[day]) {
    if (minutes >= toMinutes(iv.open) && minutes < toMinutes(iv.close)) {
      return { open: true as const, closeAt: iv.close };
    }
  }

  // Find next opening across the coming 7 days.
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7;
    for (const iv of schedule[d]) {
      const openMin = toMinutes(iv.open);
      if (offset === 0 && openMin <= minutes) continue;
      let label: string;
      if (offset === 0) label = "heute";
      else if (offset === 1) label = "morgen";
      else label = `am ${DAY_LABELS[d]}`;
      return { open: false as const, nextOpen: iv.open, nextLabel: label };
    }
  }
  return { open: false as const, nextOpen: null, nextLabel: null };
}

interface Props {
  location: string; // "Hannover" | "Bremen" | "Garbsen"
  className?: string;
}

const OpenStatusBadge = ({ location, className = "" }: Props) => {
  const key = location.toLowerCase();
  const schedule = SCHEDULES[key];
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!schedule) return null;
  const status = computeStatus(schedule);
  // tick is used only to force periodic recomputation.
  void tick;

  const isOpen = status.open;
  const label = isOpen
    ? `Jetzt geöffnet · bis ${status.closeAt} Uhr`
    : status.nextOpen
    ? `Geschlossen – öffnet ${status.nextLabel} um ${status.nextOpen} Uhr`
    : "Geschlossen";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
        isOpen
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-destructive/30 bg-destructive/10 text-destructive"
      } ${className}`}
      role="status"
      aria-live="polite"
      title={label}
    >
      <span className="relative flex h-2.5 w-2.5">
        {isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            isOpen ? "bg-primary" : "bg-destructive"
          }`}
        />
      </span>
      <span>{label}</span>
    </div>
  );
};

export default OpenStatusBadge;
