import elena from "@/assets/elena-avatar.jpg";

export function About() {
  return (
    <section id="moi" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader number="00" title="L'enquêtrice" subtitle="Profil du sujet" />

        <div className="grid md:grid-cols-[auto_1fr] gap-12 items-start mt-16">
          {/* Polaroid */}
          <div className="relative animate-float mx-auto md:mx-0">
            <div className="pin relative bg-paper p-3 pb-12 paper-shadow rotate-[-3deg] w-[260px]">
              <img
                src={elena}
                alt="Elena Kervennic"
                width={768}
                height={768}
                loading="lazy"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute bottom-3 left-0 right-0 text-center font-stamp text-paper-foreground text-xs tracking-[0.2em]">
                SUJET — E.K.
              </div>
            </div>
            <div className="absolute -top-4 -right-8 stamp text-xs">
              VÉRIFIÉ
            </div>
          </div>

          {/* Dossier */}
          <article className="paper-bg p-8 md:p-12 paper-shadow relative -rotate-[0.5deg]">
            <div className="absolute top-4 right-4 font-stamp text-[10px] tracking-[0.2em] text-paper-foreground/60">
              DOSSIER #E-001
            </div>
            <h3 className="font-serif-display text-3xl md:text-4xl text-paper-foreground mb-6">
              Note de l'enquêtrice
            </h3>
            <div className="space-y-4 text-paper-foreground/85 leading-relaxed">
              <p>
                Je suis <strong>Elena Kervennic</strong>, étudiante en data et intelligence artificielle.
              </p>
              <p>
                Je développe mes compétences en analyse de données, visualisation, automatisation et IA à travers des projets concrets.
              </p>
              <p>
                En parallèle, je réalise mon alternance à la <strong>FDJ</strong> au sein du service data où j'apprends à collecter, structurer, analyser et valoriser les données pour accompagner la prise de décision.
              </p>
            </div>
            <blockquote className="mt-8 pt-6 border-t border-paper-foreground/20 font-serif-display italic text-xl text-paper-foreground">
              « Je ne code pas pour coder. Je construis des solutions qui répondent à de vrais problèmes. »
            </blockquote>
            <div className="absolute -bottom-4 -right-4 stamp text-sm">
              Enquête en cours
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-baseline gap-6">
      <div className="font-stamp text-evidence text-sm tracking-[0.3em]">§ {number}</div>
      <div>
        <div className="font-stamp text-[10px] tracking-[0.4em] text-muted-foreground uppercase mb-2">
          {subtitle}
        </div>
        <h2 className="font-serif-display text-5xl md:text-6xl text-foreground">
          {title}
        </h2>
      </div>
      <div className="flex-1 h-px bg-evidence/40 hidden md:block" />
    </div>
  );
}