export interface LicenseClassFAQ {
  question: string;
  answer: string;
}

export interface LicenseClassData {
  slug: string;
  name: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  heroDescription: string;
  details: {
    minAge: string;
    duration: string;
    includes: string;
    exam: string;
  };
  prerequisites: string[];
  advantages: string[];
  description: string[];
  process: { step: string; title: string; text: string }[];
  faqs: LicenseClassFAQ[];
}

export const licenseClasses: LicenseClassData[] = [
  {
    slug: "klasse-b",
    name: "Klasse B",
    subtitle: "PKW-Führerschein",
    seoTitle: "Führerschein Klasse B – PKW | Fahrschule Metropol",
    seoDescription: "Führerschein Klasse B bei Fahrschule Metropol: PKW bis 3,5t. Infos zu Ablauf, Voraussetzungen & Anmeldung in Hannover, Bremen & Garbsen.",
    heroDescription: "Der klassische Autoführerschein – dein Schlüssel zur Mobilität. Fahrzeuge bis 3,5 t zulässiges Gesamtgewicht ab 17 Jahren (BF17) oder 18 Jahren.",
    details: {
      minAge: "17 Jahre (BF17) / 18 Jahre",
      duration: "Ca. 3–6 Monate",
      includes: "Theorie & Praxis, Sonderfahrten, Erste-Hilfe-Kurs",
      exam: "Theoretische & praktische Prüfung",
    },
    prerequisites: [
      "Mindestalter 17 Jahre (BF17) oder 18 Jahre",
      "Sehtest & Erste-Hilfe-Kurs",
      "Gültiger Personalausweis oder Reisepass",
    ],
    advantages: [
      "Moderne Fahrzeuge (BMW, VW, Mercedes)",
      "98% Erstbestehensquote",
      "Flexible Fahrstunden – auch abends & samstags",
      "Erfahrene, geduldige Fahrlehrer",
      "Prüfungsstrecken-Training inklusive",
    ],
    description: [
      "Der Führerschein Klasse B ist der meistgemachte Führerschein in Deutschland. Er berechtigt dich, Kraftfahrzeuge bis 3.500 kg zulässiges Gesamtgewicht zu führen – inklusive Anhänger bis 750 kg.",
      "Bei Fahrschule Metropol begleiten wir dich von der ersten Theoriestunde bis zur bestandenen Prüfung. Unsere erfahrenen Fahrlehrer sorgen dafür, dass du dich sicher im Straßenverkehr bewegst.",
      "Du kannst den Führerschein bereits mit 17 Jahren im Rahmen des Begleiteten Fahrens (BF17) beginnen. Ab 18 Jahren darfst du dann alleine fahren.",
    ],
    process: [
      { step: "01", title: "Anmeldung", text: "Melde dich bei uns an – online oder vor Ort an einem unserer Standorte." },
      { step: "02", title: "Theorieunterricht", text: "14 Doppelstunden Grundstoff + 2 Doppelstunden Zusatzstoff für Klasse B." },
      { step: "03", title: "Praktische Ausbildung", text: "Übungsfahrten & Sonderfahrten (Autobahn, Nacht, Überland) mit deinem Fahrlehrer." },
      { step: "04", title: "Prüfungen", text: "Erst die Theorieprüfung, dann die praktische Prüfung – und schon hast du deinen Führerschein!" },
    ],
    faqs: [
      { question: "Wie lange dauert die Ausbildung für Klasse B?", answer: "In der Regel 3 bis 6 Monate, je nach Häufigkeit der Fahrstunden und Verfügbarkeit der Prüfungstermine." },
      { question: "Was kostet der Führerschein Klasse B?", answer: "Die Kosten variieren je nach Anzahl der benötigten Fahrstunden. Kontaktiere uns für ein individuelles Angebot." },
      { question: "Kann ich mit 17 schon anfangen?", answer: "Ja! Mit dem Begleiteten Fahren (BF17) kannst du bereits mit 17 Jahren deinen Führerschein machen und in Begleitung fahren." },
      { question: "Was sind Sonderfahrten?", answer: "Sonderfahrten sind Pflichtfahrten auf der Autobahn (4 Stunden), Überlandfahrten (5 Stunden) und Nachtfahrten (3 Stunden)." },
    ],
  },
  {
    slug: "klasse-b197",
    name: "Klasse B197",
    subtitle: "PKW Automatik + Schaltung",
    seoTitle: "Führerschein Klasse B197 – Automatik & Schaltwagen | Fahrschule Metropol",
    seoDescription: "Klasse B197: Ausbildung auf Automatik mit Schaltprüfung. Volle Flexibilität bei Fahrschule Metropol in Hannover, Bremen & Garbsen.",
    heroDescription: "Die smarte Kombination: Ausbildung auf Automatik mit zusätzlicher Schaltprüfung. So darfst du beide Varianten fahren – ohne Einschränkung.",
    details: {
      minAge: "17 Jahre (BF17) / 18 Jahre",
      duration: "Ca. 3–6 Monate",
      includes: "Automatik-Ausbildung + 10 Schaltstunden, Sonderfahrten",
      exam: "Prüfung auf Automatik + Schaltkompetenznachweis",
    },
    prerequisites: [
      "Mindestalter 17 Jahre (BF17) oder 18 Jahre",
      "Sehtest & Erste-Hilfe-Kurs",
      "Gültiger Personalausweis oder Reisepass",
    ],
    advantages: [
      "Prüfung auf Automatik – einfacher & stressfreier",
      "Trotzdem Schaltwagen fahren erlaubt",
      "Moderne Automatik-Fahrzeuge",
      "Erfahrene Fahrlehrer für beide Varianten",
    ],
    description: [
      "Klasse B197 ist die moderne Alternative zum klassischen Klasse-B-Führerschein. Du lernst hauptsächlich auf einem Automatik-Fahrzeug – das ist einfacher und stressfreier.",
      "Mit nur 10 zusätzlichen Fahrstunden auf einem Schaltwagen und einer internen Prüfung erhältst du die volle Berechtigung, auch Schaltwagen zu fahren.",
      "Der Vorteil: Die praktische Prüfung findet auf dem Automatik-Fahrzeug statt, was vielen Fahrschülern deutlich leichter fällt.",
    ],
    process: [
      { step: "01", title: "Anmeldung", text: "Wähle bei der Anmeldung die Klasse B197 – wir beraten dich gerne zu den Vorteilen." },
      { step: "02", title: "Theorieunterricht", text: "Identisch zur Klasse B: 14 + 2 Doppelstunden Theorieunterricht." },
      { step: "03", title: "Praxis auf Automatik", text: "Deine Hauptausbildung findet auf einem komfortablen Automatik-Fahrzeug statt." },
      { step: "04", title: "Schaltkompetenz", text: "10 Fahrstunden auf Schaltwagen + interner Test – dann darfst du beides fahren." },
    ],
    faqs: [
      { question: "Was ist der Unterschied zwischen B und B197?", answer: "Bei B197 lernst du hauptsächlich auf Automatik und machst die Prüfung auf Automatik. Mit 10 Schaltstunden + Test darfst du trotzdem Schaltwagen fahren." },
      { question: "Ist B197 einfacher als Klasse B?", answer: "Viele Fahrschüler empfinden es als einfacher, da die Prüfung auf Automatik stattfindet und das Schalten wegfällt." },
      { question: "Darf ich mit B197 auch im Ausland Schaltwagen fahren?", answer: "Im EU-Ausland ja. Außerhalb der EU kann es Einschränkungen geben – informiere dich vor Reiseantritt." },
    ],
  },
  {
    slug: "klasse-a",
    name: "Klasse A",
    subtitle: "Motorrad unbeschränkt",
    seoTitle: "Führerschein Klasse A – Motorrad unbeschränkt | Fahrschule Metropol",
    seoDescription: "Motorradführerschein Klasse A ohne Leistungsbeschränkung. Alle Infos bei Fahrschule Metropol in Hannover, Bremen & Garbsen.",
    heroDescription: "Die ultimative Freiheit auf zwei Rädern – alle Motorräder ohne Leistungsbeschränkung. Für erfahrene Biker und Aufsteiger.",
    details: {
      minAge: "24 Jahre (Direkteinstieg) / 20 Jahre (Aufstieg von A2)",
      duration: "Ca. 2–4 Monate",
      includes: "Theorie & Praxis, Sonderfahrten, Schutzausrüstung erforderlich",
      exam: "Theoretische & praktische Prüfung",
    },
    prerequisites: [
      "Mindestalter 24 Jahre (Direkteinstieg) oder 20 Jahre (Aufstieg von A2)",
      "Sehtest & Erste-Hilfe-Kurs",
      "Motorradhelm (Pflicht), Schutzkleidung empfohlen",
    ],
    advantages: [
      "Alle Motorräder ohne Leistungsbeschränkung",
      "Leidenschaftliche Motorrad-Fahrlehrer",
      "Moderne Ausbildungsmotorräder",
      "Leihausrüstung verfügbar",
    ],
    description: [
      "Der Führerschein Klasse A ist der Königsweg für Motorradfahrer. Er erlaubt dir das Fahren aller Motorräder und dreirädrigen Kraftfahrzeuge – ohne Leistungsbeschränkung.",
      "Beim Direkteinstieg musst du mindestens 24 Jahre alt sein. Hast du bereits den A2-Führerschein seit mindestens 2 Jahren, kannst du mit 20 Jahren aufsteigen.",
      "Unsere Motorrad-Fahrlehrer sind selbst leidenschaftliche Biker und bringen dir alles bei, was du für sicheres Fahren brauchst.",
    ],
    process: [
      { step: "01", title: "Anmeldung & Beratung", text: "Wir klären, ob Direkteinstieg oder Aufstieg von A2 für dich der richtige Weg ist." },
      { step: "02", title: "Theorieunterricht", text: "12 Doppelstunden Grundstoff + 4 Doppelstunden Zusatzstoff Motorrad." },
      { step: "03", title: "Praktische Ausbildung", text: "Grundfahraufgaben, Übungsfahrten und Sonderfahrten auf dem Motorrad." },
      { step: "04", title: "Prüfung", text: "Theorieprüfung + praktische Prüfung – dann gehört dir die Straße!" },
    ],
    faqs: [
      { question: "Brauche ich einen Vorbesitz für Klasse A?", answer: "Nein, beim Direkteinstieg ab 24 Jahren nicht. Bei Aufstieg von A2 brauchst du 2 Jahre Vorbesitz." },
      { question: "Muss ich eigene Schutzausrüstung mitbringen?", answer: "Ein passender Motorradhelm ist Pflicht. Handschuhe, Stiefel und Schutzkleidung werden empfohlen – frag uns nach Leihausrüstung." },
      { question: "Kann ich die Ausbildung im Winter machen?", answer: "Die Theorie kannst du jederzeit beginnen. Praxisstunden finden witterungsabhängig statt – idealerweise von März bis Oktober." },
    ],
  },
  {
    slug: "klasse-a2",
    name: "Klasse A2",
    subtitle: "Motorrad bis 35 kW",
    seoTitle: "Führerschein Klasse A2 – Motorrad bis 35 kW | Fahrschule Metropol",
    seoDescription: "Motorradführerschein Klasse A2 für Motorräder bis 35 kW. Jetzt bei Fahrschule Metropol in Hannover, Bremen & Garbsen anmelden.",
    heroDescription: "Der perfekte Einstieg in die Motorradwelt – Motorräder mit max. 35 kW Leistung ab 18 Jahren.",
    details: {
      minAge: "18 Jahre",
      duration: "Ca. 2–4 Monate",
      includes: "Theorie & Praxis, Sonderfahrten",
      exam: "Theoretische & praktische Prüfung",
    },
    prerequisites: [
      "Mindestalter 18 Jahre",
      "Sehtest & Erste-Hilfe-Kurs",
      "Motorradhelm (Pflicht)",
    ],
    advantages: [
      "Riesige Auswahl an A2-Motorrädern",
      "Aufstieg auf Klasse A nach 2 Jahren möglich",
      "Moderne Ausbildungsmotorräder",
      "Erfahrene Motorrad-Fahrlehrer",
    ],
    description: [
      "Mit Klasse A2 darfst du Motorräder mit einer Leistung von maximal 35 kW (48 PS) fahren. Das Leistungsgewicht darf 0,2 kW/kg nicht übersteigen.",
      "Klasse A2 ist ideal für den Einstieg ab 18 Jahren. Nach 2 Jahren kannst du auf die unbeschränkte Klasse A aufsteigen – mit vereinfachter Prüfung.",
      "Die Auswahl an A2-tauglichen Motorrädern ist riesig – von Naked Bikes bis Adventure-Tourern ist für jeden Geschmack etwas dabei.",
    ],
    process: [
      { step: "01", title: "Anmeldung", text: "Melde dich an und wir finden das passende Motorrad für deine Ausbildung." },
      { step: "02", title: "Theorie", text: "12 Doppelstunden Grundstoff + 4 Doppelstunden motorradspezifischer Zusatzstoff." },
      { step: "03", title: "Praxis", text: "Grundfahraufgaben, Stadt- und Überlandfahrten auf einem A2-Motorrad." },
      { step: "04", title: "Prüfung & Aufstieg", text: "Nach bestandener Prüfung kannst du nach 2 Jahren auf Klasse A aufsteigen." },
    ],
    faqs: [
      { question: "Welche Motorräder darf ich mit A2 fahren?", answer: "Motorräder bis max. 35 kW (48 PS) und einem Leistungsgewicht von max. 0,2 kW/kg." },
      { question: "Wie funktioniert der Aufstieg auf Klasse A?", answer: "Nach 2 Jahren A2-Besitz kannst du mit einer verkürzten Ausbildung und nur einer praktischen Prüfung auf Klasse A aufsteigen." },
      { question: "Brauche ich vorher Klasse A1?", answer: "Nein, du kannst A2 direkt mit 18 Jahren machen. Mit A1-Vorbesitz wird die Ausbildung aber kürzer." },
    ],
  },
  {
    slug: "klasse-a1",
    name: "Klasse A1",
    subtitle: "Leichtkrafträder bis 125 ccm",
    seoTitle: "Führerschein Klasse A1 – 125ccm Motorrad | Fahrschule Metropol",
    seoDescription: "Klasse A1 Führerschein für Leichtkrafträder bis 125 ccm ab 16 Jahren. Fahrschule Metropol in Hannover, Bremen & Garbsen.",
    heroDescription: "Dein erster Motorradführerschein ab 16 Jahren – für Leichtkrafträder bis 125 ccm und 11 kW Leistung.",
    details: {
      minAge: "16 Jahre",
      duration: "Ca. 2–4 Monate",
      includes: "Theorie & Praxis, Sonderfahrten",
      exam: "Theoretische & praktische Prüfung",
    },
    prerequisites: [
      "Mindestalter 16 Jahre",
      "Sehtest & Erste-Hilfe-Kurs",
      "Anmeldung 6 Monate vorher möglich",
    ],
    advantages: [
      "Mobil ab 16 Jahren",
      "Perfekte Grundlage für A2 und A",
      "Verkürzte Ausbildung bei Aufstieg",
      "Erfahrene Motorrad-Fahrlehrer",
    ],
    description: [
      "Klasse A1 ist der erste Schritt in die Motorradwelt. Ab 16 Jahren darfst du Leichtkrafträder bis 125 ccm Hubraum und 11 kW (15 PS) Leistung fahren.",
      "A1 ist ideal für Jugendliche, die früh mobil sein möchten. Später kannst du über A2 bis zum unbeschränkten Klasse-A-Führerschein aufsteigen.",
      "Die Ausbildung umfasst Theorie und Praxis – inklusive Sonderfahrten auf Autobahn, Überland und bei Nacht.",
    ],
    process: [
      { step: "01", title: "Anmeldung", text: "Du kannst dich bereits 6 Monate vor deinem 16. Geburtstag anmelden." },
      { step: "02", title: "Theorie", text: "12 Doppelstunden Grundstoff + 4 Doppelstunden motorradspezifisch." },
      { step: "03", title: "Praxis", text: "Fahrübungen auf einem 125er-Motorrad mit erfahrenen Fahrlehrern." },
      { step: "04", title: "Prüfung", text: "Theorie + Praxis bestehen – und los geht's auf zwei Rädern!" },
    ],
    faqs: [
      { question: "Kann ich A1 schon vor meinem 16. Geburtstag anfangen?", answer: "Ja, du kannst dich 6 Monate vorher anmelden und mit der Theorie beginnen. Die Prüfung darf frühestens 1 Monat vor dem 16. Geburtstag abgelegt werden." },
      { question: "Was darf ich mit A1 fahren?", answer: "Leichtkrafträder bis 125 ccm, max. 11 kW, max. 0,1 kW/kg Leistungsgewicht." },
      { question: "Ist A1 eine gute Grundlage für später?", answer: "Absolut! Du kannst nach 2 Jahren auf A2 und später auf A aufsteigen – jeweils mit verkürzter Ausbildung." },
    ],
  },
  {
    slug: "klasse-am",
    name: "Klasse AM",
    subtitle: "Moped & Roller",
    seoTitle: "Führerschein Klasse AM – Moped & Roller ab 15 | Fahrschule Metropol",
    seoDescription: "Moped-Führerschein Klasse AM ab 15 Jahren. Roller bis 45 km/h bei Fahrschule Metropol in Hannover, Bremen & Garbsen.",
    heroDescription: "Mobil ab 15 Jahren – Kleinkrafträder und Roller bis 45 km/h. Ideal für den Schulweg und die erste Freiheit.",
    details: {
      minAge: "15 Jahre",
      duration: "Ca. 1–2 Monate",
      includes: "Theorie & Praxis",
      exam: "Theoretische & praktische Prüfung",
    },
    prerequisites: [
      "Mindestalter 15 Jahre",
      "Sehtest & Erste-Hilfe-Kurs",
      "Anmeldung 6 Monate vorher möglich",
    ],
    advantages: [
      "Schnellster Weg zur Mobilität",
      "Kompakte Ausbildung (1–2 Monate)",
      "Keine Sonderfahrten nötig",
      "Ideal für den Schulweg",
    ],
    description: [
      "Mit Klasse AM darfst du zweirädrige Kleinkrafträder (Mopeds, Roller) und dreirädrige Kleinkraftfahrzeuge bis 45 km/h fahren.",
      "Der AM-Führerschein ist der schnellste Weg zur Mobilität für Jugendliche ab 15 Jahren. Perfekt für den Schulweg oder die Freizeit.",
      "Die Ausbildung ist kompakt und du kannst schnell durchstarten – in der Regel bist du in 1 bis 2 Monaten fertig.",
    ],
    process: [
      { step: "01", title: "Anmeldung", text: "Melde dich an – du kannst 6 Monate vor deinem 15. Geburtstag beginnen." },
      { step: "02", title: "Theorie", text: "12 Doppelstunden Grundstoff + 2 Doppelstunden Zusatzstoff." },
      { step: "03", title: "Praxis", text: "Übungsfahrten auf dem Roller – keine Sonderfahrten nötig." },
      { step: "04", title: "Prüfung", text: "Theorie + Praxis bestehen – und ab auf den Roller!" },
    ],
    faqs: [
      { question: "Ab wann darf ich den AM-Führerschein machen?", answer: "Ab 15 Jahren. Du kannst dich 6 Monate vorher anmelden." },
      { question: "Brauche ich Sonderfahrten für AM?", answer: "Nein, bei Klasse AM sind keine Sonderfahrten vorgeschrieben." },
      { question: "Darf ich mit AM auch 50er-Roller fahren?", answer: "Ja, solange der Roller bauartbedingt nicht schneller als 45 km/h fährt und max. 50 ccm hat." },
    ],
  },
  {
    slug: "klasse-be",
    name: "Klasse BE",
    subtitle: "PKW + Anhänger",
    seoTitle: "Führerschein Klasse BE – PKW mit Anhänger | Fahrschule Metropol",
    seoDescription: "Klasse BE: PKW mit schwerem Anhänger. Für Wohnwagen, Pferdeanhänger & mehr. Jetzt bei Fahrschule Metropol anmelden.",
    heroDescription: "PKW mit schwerem Anhänger über 750 kg – für Wohnwagen, Pferdeanhänger, Bootstrailer und mehr.",
    details: {
      minAge: "17 Jahre (BF17) / 18 Jahre",
      duration: "Ca. 1–2 Monate",
      includes: "Nur Praxis, Sonderfahrten mit Anhänger",
      exam: "Nur praktische Prüfung",
    },
    prerequisites: [
      "Führerschein Klasse B (Vorbesitz)",
      "Mindestalter 17/18 Jahre",
    ],
    advantages: [
      "Keine Theorieprüfung erforderlich",
      "Kompakte Ausbildung",
      "Wohnwagen, Pferdeanhänger & mehr",
      "Sonderfahrten mit Anhänger inklusive",
    ],
    description: [
      "Mit Klasse BE darfst du Anhänger über 750 kg an deinen PKW hängen – das Gesamtgewicht des Anhängers darf bis 3.500 kg betragen.",
      "Voraussetzung ist der Besitz von Klasse B. Die Ausbildung besteht nur aus praktischen Fahrstunden – eine Theorieprüfung ist nicht erforderlich.",
      "Ideal für alle, die Wohnwagen, Pferdeanhänger, Bootstrailer oder andere schwere Anhänger ziehen möchten.",
    ],
    process: [
      { step: "01", title: "Anmeldung", text: "Du brauchst einen gültigen Klasse-B-Führerschein als Voraussetzung." },
      { step: "02", title: "Praxis", text: "Fahrstunden mit Zugfahrzeug und Anhänger – inkl. An- und Abkuppeln." },
      { step: "03", title: "Sonderfahrten", text: "3x Überland, 1x Autobahn, 1x Nacht – alle mit Anhänger." },
      { step: "04", title: "Praktische Prüfung", text: "Keine Theorieprüfung nötig – nur die praktische Prüfung bestehen." },
    ],
    faqs: [
      { question: "Brauche ich eine Theorieprüfung für BE?", answer: "Nein, für Klasse BE ist keine Theorieprüfung erforderlich – nur eine praktische Prüfung." },
      { question: "Wie schwer darf der Anhänger sein?", answer: "Der Anhänger darf eine zulässige Gesamtmasse von bis zu 3.500 kg haben." },
      { question: "Wie viele Fahrstunden brauche ich?", answer: "Neben den Übungsstunden sind 5 Sonderfahrten Pflicht. Die Gesamtzahl hängt von deinen Vorkenntnissen ab." },
    ],
  },
  {
    slug: "klasse-b196",
    name: "Klasse B196",
    subtitle: "125er mit B-Führerschein",
    seoTitle: "B196 Erweiterung – 125er fahren mit Klasse B | Fahrschule Metropol",
    seoDescription: "B196: Erweiterung des Klasse-B-Führerscheins auf 125er-Motorräder. Keine Prüfung nötig. Fahrschule Metropol informiert.",
    heroDescription: "Erweitere deinen Klasse-B-Führerschein auf 125er-Motorräder – ohne extra Prüfung! Ab 25 Jahren mit 5 Jahren B-Besitz.",
    details: {
      minAge: "25 Jahre + 5 Jahre Klasse B",
      duration: "Ca. 2–4 Wochen",
      includes: "4 Theorie- + 5 Praxiseinheiten (je 90 Min.)",
      exam: "Keine Prüfung erforderlich",
    },
    prerequisites: [
      "Mindestalter 25 Jahre",
      "Mindestens 5 Jahre Klasse B im Besitz",
    ],
    advantages: [
      "Keine Prüfung erforderlich",
      "Schnelle Erweiterung in 2–4 Wochen",
      "125er-Motorräder fahren",
      "Kompakte Ausbildung (4 Theorie + 5 Praxis)",
    ],
    description: [
      "Mit der B196-Erweiterung darfst du Leichtkrafträder bis 125 ccm und 11 kW fahren – ganz ohne zusätzliche Prüfung.",
      "Voraussetzung: Du musst mindestens 25 Jahre alt sein und seit mindestens 5 Jahren den Klasse-B-Führerschein besitzen.",
      "Achtung: B196 gilt nur in Deutschland. Im Ausland darfst du damit keine 125er fahren. Es ist auch kein vollwertiger A1-Führerschein.",
    ],
    process: [
      { step: "01", title: "Anmeldung", text: "Prüfe die Voraussetzungen: 25 Jahre alt + 5 Jahre Klasse B." },
      { step: "02", title: "Theorie", text: "4 Unterrichtseinheiten à 90 Minuten – motorradspezifische Theorie." },
      { step: "03", title: "Praxis", text: "5 Unterrichtseinheiten à 90 Minuten auf einem 125er-Motorrad." },
      { step: "04", title: "Eintragung", text: "Keine Prüfung – die Schlüsselzahl 196 wird in deinen Führerschein eingetragen." },
    ],
    faqs: [
      { question: "Ist B196 das gleiche wie A1?", answer: "Nein. B196 gilt nur in Deutschland und berechtigt nicht zum Aufstieg auf A2 oder A. Für den vollen A1 brauchst du eine reguläre Prüfung." },
      { question: "Darf ich mit B196 im Ausland fahren?", answer: "Nein, die B196-Erweiterung gilt ausschließlich in Deutschland." },
      { question: "Brauche ich eine Prüfung?", answer: "Nein, es ist keine theoretische oder praktische Prüfung erforderlich." },
    ],
  },
  {
    slug: "klasse-l",
    name: "Klasse L",
    subtitle: "Land- & Forstwirtschaft",
    seoTitle: "Führerschein Klasse L – Traktor & Zugmaschinen | Fahrschule Metropol",
    seoDescription: "Klasse L Führerschein für Zugmaschinen bis 40 km/h in der Land- und Forstwirtschaft. Fahrschule Metropol informiert.",
    heroDescription: "Zugmaschinen bis 40 km/h für land- oder forstwirtschaftliche Zwecke. Ab 16 Jahren – nur Theorieprüfung.",
    details: {
      minAge: "16 Jahre",
      duration: "Ca. 2–4 Wochen",
      includes: "Nur Theorieunterricht",
      exam: "Nur theoretische Prüfung",
    },
    prerequisites: [
      "Mindestalter 16 Jahre",
      "Sehtest & Erste-Hilfe-Kurs",
    ],
    advantages: [
      "Keine praktische Prüfung",
      "In Klasse B bereits enthalten",
      "Schnelle Ausbildung (2–4 Wochen)",
      "Ideal für Land-/Forstwirtschaft",
    ],
    description: [
      "Klasse L berechtigt zum Fahren von Zugmaschinen mit einer bauartbedingten Höchstgeschwindigkeit von max. 40 km/h für land- oder forstwirtschaftliche Zwecke.",
      "Mit Anhänger darf nicht schneller als 25 km/h gefahren werden. Klasse L ist rein theoretisch – es gibt keine praktische Prüfung.",
      "Klasse L ist in Klasse B enthalten. Wer also bereits Klasse B hat, braucht keinen zusätzlichen Klasse-L-Führerschein.",
    ],
    process: [
      { step: "01", title: "Anmeldung", text: "Melde dich an – die Ausbildung besteht nur aus Theorie." },
      { step: "02", title: "Theorie", text: "12 Doppelstunden Grundstoff + 2 Doppelstunden Zusatzstoff." },
      { step: "03", title: "Theorieprüfung", text: "Bestehe die theoretische Prüfung – das war's!" },
      { step: "04", title: "Führerschein", text: "Keine Praxisprüfung nötig – du bekommst direkt deinen Führerschein." },
    ],
    faqs: [
      { question: "Brauche ich Fahrstunden für Klasse L?", answer: "Nein, Klasse L erfordert keine praktische Ausbildung und keine praktische Prüfung." },
      { question: "Ist Klasse L in Klasse B enthalten?", answer: "Ja, wer Klasse B besitzt, darf auch Fahrzeuge der Klasse L führen." },
      { question: "Darf ich mit Klasse L auch auf der Straße fahren?", answer: "Ja, Zugmaschinen bis 40 km/h dürfen auf öffentlichen Straßen bewegt werden – aber nur für land- oder forstwirtschaftliche Zwecke." },
    ],
  },
];

export const getClassBySlug = (slug: string): LicenseClassData | undefined => {
  return licenseClasses.find((c) => c.slug === slug);
};
