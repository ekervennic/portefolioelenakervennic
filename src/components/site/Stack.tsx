import { SectionHeader } from "./About";

const skills = [
  { name: "Python", cat: "Langage" },
  { name: "Tableau", cat: "BI" },
  { name: "Power BI", cat: "BI" },
  { name: "Dataiku", cat: "Plateforme" },
  { name: "SQL", cat: "Données" },
  { name: "Scraping", cat: "Collecte" },
  { name: "RAG", cat: "IA" },
  { name: "OpenAI", cat: "IA" },
  { name: "Dust", cat: "IA" },
  { name: "Make", cat: "Automatisation" },
  { name: "n8n", cat: "Automatisation" },
  { name: "Airtable", cat: "Données" },
  { name: "Next.js", cat: "Web" },
  { name: "Supabase", cat: "Backend" },
  { name: "HTML/CSS", cat: "Web" },
  { name: "TypeScript", cat: "Langage" },
];

export function Stack() {
  return (
    <section id="stack" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader number="01" title="Outils d'investigation" subtitle="Arsenal · Compétences" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
          {skills.map((s, i) => (
            <div
              key={s.name}
              className="pin relative paper-bg paper-shadow p-5 pt-8 group hover:-translate-y-1 transition-transform duration-300"
              style={{ transform: `rotate(${((i % 5) - 2) * 0.8}deg)` }}
            >
              <div className="absolute top-2 left-3 font-stamp text-[9px] tracking-[0.25em] text-paper-foreground/50">
                FICHE N° {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-serif-display text-2xl text-paper-foreground mb-1">
                {s.name}
              </div>
              <div className="font-stamp text-[10px] tracking-[0.2em] text-evidence uppercase">
                {s.cat}
              </div>
              <div className="mt-3 h-px bg-paper-foreground/15" />
              <div className="mt-2 font-stamp text-[9px] text-paper-foreground/40 tracking-wider">
                ✓ MAÎTRISE CONFIRMÉE
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}