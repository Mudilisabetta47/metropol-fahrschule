import SEO from "@/components/SEO";

const Impressum = () => {
  return (
    <>
      <SEO
        title="Impressum | Fahrschule Metropol"
        description="Impressum der Fahrschule Metropol – Angaben gemäß § 5 TMG."
        canonical="https://metropol-drive-hub.lovable.app/impressum"
      />

      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-8 text-foreground">
            Impressum
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-foreground/80 text-sm leading-relaxed">
            <h2 className="text-xl font-bold text-foreground mt-8">Angaben gemäß § 5 TMG</h2>
            <p>
              Fahrschule Metropol<br />
              Vahrenwalder Str. 213<br />
              30165 Hannover
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">Kontakt</h2>
            <p>
              Telefon: 0511 6425066<br />
              E-Mail: info@metropol-bz.de
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">Aufsichtsbehörde</h2>
            <p>
              Landeshauptstadt Hannover<br />
              Fachbereich Öffentliche Ordnung<br />
              Fahrerlaubnisbehörde
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">Berufsbezeichnung</h2>
            <p>
              Fahrlehrer/in (verliehen in der Bundesrepublik Deutschland)
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>

            <p className="text-xs text-muted-foreground mt-12">Stand: Februar 2026</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Impressum;
