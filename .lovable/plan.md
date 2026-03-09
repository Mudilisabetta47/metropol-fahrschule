
# Plan: Google SEO-Sprachproblem beheben

## Problem-Analyse
Die Website zeigt in Google Search als englisch an, obwohl sie primär deutsch sein sollte. Das liegt an fehlerhafter SEO-Konfiguration für mehrsprachige Websites:

1. **Fehlende hreflang-Tags** - Google weiß nicht, welche Sprachversionen existieren
2. **Fehlende og:locale Meta-Tags** - Social Media Plattformen erkennen Sprache nicht korrekt  
3. **Keine mehrsprachige URL-Struktur** - Alle Sprachen nutzen dieselbe URL
4. **Dynamisches lang-Attribut ohne SEO-Signale** - Sprachwechsel wird von Suchmaschinen nicht erkannt

## Lösungsansatz

### 1. SEO-Komponente erweitern
- `hreflang`-Tags für alle 4 Sprachen hinzufügen (de, en, tr, ar)
- `og:locale` Meta-Tag basierend auf aktueller Sprache setzen
- `x-default` hreflang für Deutsch als Hauptsprache definieren

### 2. Sprachbasierte URL-Struktur (Optional)
Zwei Optionen:
- **Option A**: URL-Parameter (`?lang=en`)
- **Option B**: Subdirectories (`/en/`, `/tr/`, `/ar/`)

### 3. Sitemap erweitern
- Mehrsprachige Sitemap mit hreflang-Referenzen
- Oder separate Sitemaps pro Sprache

### 4. robots.txt anpassen
- Crawling-Hinweise für mehrsprachige Struktur

## Technische Umsetzung

```tsx
// SEO.tsx - Erweiterte Meta-Tags
const currentLanguage = i18n.language || 'de';
const hreflangs = [
  { lang: 'de', url: canonical },
  { lang: 'en', url: canonical + '?lang=en' },
  { lang: 'tr', url: canonical + '?lang=tr' },
  { lang: 'ar', url: canonical + '?lang=ar' },
  { lang: 'x-default', url: canonical }
];

// og:locale basierend auf Sprache
const localeMap = {
  'de': 'de_DE',
  'en': 'en_US', 
  'tr': 'tr_TR',
  'ar': 'ar_SA'
};
```

### Dateien die geändert werden:
- `src/components/SEO.tsx` - Hreflang und og:locale hinzufügen
- `src/i18n/index.ts` - URL-Updates bei Sprachwechsel
- `public/sitemap.xml` - Mehrsprachige Struktur
- Eventuell `App.tsx` - Router-Anpassungen für Sprach-URLs

### Sofortige Maßnahme
Als Quickfix können wir die Standard-Sprache in der SEO-Komponente fest auf Deutsch setzen und explizite hreflang-Tags hinzufügen, damit Google eindeutig erkennt, dass die Hauptsprache Deutsch ist.

## Priorisierung
1. **Hoch**: Hreflang-Tags und og:locale (behebt unmittelbar das Google-Problem)
2. **Mittel**: URL-Struktur (langfristige SEO-Verbesserung)
3. **Niedrig**: Sitemap-Erweiterung (für bessere Indexierung)

Die wichtigste Änderung ist das Hinzufügen der hreflang-Tags, damit Google versteht, dass Deutsch die Hauptsprache ist.
