import { SectionHeader } from "./About";

const questions = [
  {
    q: "Quels moyens de paiement dominent le marché ?",
    a: "La carte bancaire représente près de 74 % des transactions, suivie par le boleto. Le marché brésilien reste majoritairement cashless mais conserve une part locale spécifique.",
    stat: "74%",
    label: "Cartes bancaires",
  },
  {
    q: "Quelles villes génèrent le plus de commandes ?",
    a: "São Paulo concentre près d'un tiers du volume national, devant Rio de Janeiro. Le sud-est domine largement la consommation e-commerce.",
    stat: "32%",
    label: "São Paulo",
  },
  {
    q: "Les délais de livraison sont-ils fiables ?",
    a: "Plus de 90 % des commandes arrivent avant la date estimée, mais les écarts régionaux dépassent 10 jours dans le nord du pays.",
    stat: "92%",
    label: "Livrées à temps",
  },
];

export function Dataviz() {
  return (
    <section id="dataviz" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader number="03" title="Rapport d'enquête" subtitle="Dataviz · E-commerce Brésil" />

        <p className="mt-8 max-w-2xl text-muted-foreground font-serif-display italic text-lg">
          Analyse exhaustive de plus de 100 000 commandes. Trois questions. Trois pistes. Une conclusion.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {questions.map((item, i) => (
            <div
              key={i}
              className="relative paper-bg paper-shadow p-7 group hover:-translate-y-2 transition-transform"
              style={{ transform: `rotate(${(i - 1) * 0.8}deg)` }}
            >
              <div className="font-stamp text-[10px] tracking-[0.3em] text-evidence mb-3">
                PIÈCE N° {String(i + 1).padStart(2, "0")}
              </div>
              <h4 className="font-serif-display text-xl text-paper-foreground mb-4 leading-snug">
                {item.q}
              </h4>
              <div className="flex items-baseline gap-3 my-4">
                <span className="font-serif-display text-5xl text-evidence font-semibold">{item.stat}</span>
                <span className="font-stamp text-[10px] tracking-wider text-paper-foreground/60 uppercase">
                  {item.label}
                </span>
              </div>
              <p className="text-sm text-paper-foreground/80 leading-relaxed">{item.a}</p>
              <div className="mt-5 h-1 w-full bg-paper-foreground/10 overflow-hidden">
                <div
                  className="h-full bg-evidence"
                  style={{ width: item.stat }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-16 relative kraft-bg paper-shadow p-8 md:p-12 max-w-4xl mx-auto -rotate-[0.4deg]">
          <div className="font-stamp text-[11px] tracking-[0.3em] text-evidence mb-3">
            CONCLUSION DE L'ENQUÊTRICE
          </div>
          <p className="font-serif-display text-2xl md:text-3xl text-paper-foreground leading-snug">
            Le marché montre une <span className="text-evidence">forte concentration sur São Paulo et Rio</span>,
            une <span className="text-evidence">domination de la carte bancaire</span>,
            et des <span className="text-evidence">écarts logistiques marqués</span> selon les régions.
          </p>
          <div className="absolute -top-4 -right-4 stamp text-sm" style={{ transform: "rotate(8deg)" }}>
            DOSSIER CLOS
          </div>
        </div>
      </div>
    </section>
  );
}