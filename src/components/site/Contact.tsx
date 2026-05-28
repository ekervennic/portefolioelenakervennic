import { SectionHeader } from "./About";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader number="04" title="Prendre contact" subtitle="Communication · Sécurisée" />

        <div className="mt-16 relative paper-bg paper-shadow p-8 md:p-14 -rotate-[0.5deg]">
          <div className="absolute top-4 right-4 stamp text-xs">
            URGENT
          </div>

          <div className="font-stamp text-[11px] tracking-[0.3em] text-evidence mb-4">
            TRANSMISSION DIRECTE
          </div>
          <h3 className="font-serif-display text-4xl md:text-5xl text-paper-foreground mb-6">
            Une enquête à confier ?
          </h3>
          <p className="text-paper-foreground/80 leading-relaxed mb-10 max-w-xl">
            Stage, alternance, mission data ou IA : ouvrez votre dossier. Je réponds rapidement, avec un brief clair et structuré.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="mailto:elena.kervennic@example.com"
              className="group flex items-center gap-4 p-5 border-2 border-paper-foreground/20 hover:border-evidence transition-colors"
            >
              <div className="w-12 h-12 bg-evidence text-evidence-foreground flex items-center justify-center text-xl">
                ✉
              </div>
              <div>
                <div className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/60">EMAIL</div>
                <div className="font-serif-display text-lg text-paper-foreground">Écrire un message</div>
              </div>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 p-5 border-2 border-paper-foreground/20 hover:border-evidence transition-colors"
            >
              <div className="w-12 h-12 bg-paper-foreground text-paper flex items-center justify-center text-xl font-bold">
                in
              </div>
              <div>
                <div className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/60">LINKEDIN</div>
                <div className="font-serif-display text-lg text-paper-foreground">Voir le profil</div>
              </div>
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-paper-foreground/15 flex justify-between items-center text-[10px] font-stamp tracking-[0.2em] text-paper-foreground/50">
            <span>BUREAU D'ENQUÊTE · E.K.</span>
            <span>© 2025 — TOUS DOSSIERS RÉSERVÉS</span>
          </div>
        </div>
      </div>
    </section>
  );
}