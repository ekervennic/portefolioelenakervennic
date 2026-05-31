import { SectionHeader } from "./About";
import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = encodeURIComponent(String(data.get("name") || ""));
    const email = encodeURIComponent(String(data.get("email") || ""));
    const desc = encodeURIComponent(String(data.get("desc") || ""));
    window.location.href = `mailto:ekervennic@eugeniaschool.com?subject=Nouveau%20dossier%20—%20${name}&body=De%20:%20${name}%20(${email})%0A%0A${desc}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionHeader number="04" title="Prendre contact" subtitle="Communication · Sécurisée" />

        <div className="mt-12 md:mt-16 relative paper-bg paper-shadow p-5 sm:p-8 md:p-14 md:-rotate-[0.5deg]">
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

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <a
              href="mailto:ekervennic@eugeniaschool.com"
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 border-paper-foreground/20 hover:border-evidence transition-colors min-w-0"
            >
              <div className="w-12 h-12 shrink-0 bg-evidence text-evidence-foreground flex items-center justify-center text-xl">
                ✉
              </div>
              <div className="min-w-0">
                <div className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/60">EMAIL</div>
                <div className="font-serif-display text-sm sm:text-base md:text-lg text-paper-foreground break-all">ekervennic@eugeniaschool.com</div>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/elena-k-60b559223"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 border-paper-foreground/20 hover:border-evidence transition-colors min-w-0"
            >
              <div className="w-12 h-12 shrink-0 bg-paper-foreground text-paper flex items-center justify-center text-xl font-bold">
                in
              </div>
              <div className="min-w-0">
                <div className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/60">LINKEDIN</div>
                <div className="font-serif-display text-base md:text-lg text-paper-foreground break-all">elena-k-60b559223</div>
              </div>
            </a>
            <a
              href="https://github.com/ekervennic"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 border-paper-foreground/20 hover:border-evidence transition-colors min-w-0"
            >
              <div className="w-12 h-12 shrink-0 bg-paper-foreground text-paper flex items-center justify-center text-xl font-bold">
                ⌥
              </div>
              <div className="min-w-0">
                <div className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/60">GITHUB</div>
                <div className="font-serif-display text-base md:text-lg text-paper-foreground break-all">ekervennic</div>
              </div>
            </a>
            <a
              href="https://public.tableau.com/app/profile/elena.kervennic"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border-2 border-paper-foreground/20 hover:border-evidence transition-colors min-w-0"
            >
              <div className="w-12 h-12 shrink-0 bg-evidence text-evidence-foreground flex items-center justify-center text-xl">
                📊
              </div>
              <div className="min-w-0">
                <div className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/60">TABLEAU PUBLIC</div>
                <div className="font-serif-display text-base md:text-lg text-paper-foreground">Voir mes dashboards</div>
              </div>
            </a>
          </div>

          {/* Formulaire — Transmettre le dossier */}
          <form onSubmit={onSubmit} className="mt-10 pt-8 border-t border-paper-foreground/15 space-y-6">
            <div className="font-stamp text-[11px] tracking-[0.3em] text-evidence">
              FORMULAIRE — NOUVEAU DOSSIER
            </div>

            <div>
              <label className="block font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/60 mb-2">
                NOM DU DEMANDEUR
              </label>
              <input
                name="name"
                required
                className="w-full bg-transparent border-b border-paper-foreground/40 focus:border-evidence outline-none py-2 text-paper-foreground font-serif-display"
              />
            </div>

            <div>
              <label className="block font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/60 mb-2">
                EMAIL
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-transparent border-b border-paper-foreground/40 focus:border-evidence outline-none py-2 text-paper-foreground font-serif-display"
              />
            </div>

            <div>
              <label className="block font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/60 mb-2">
                DESCRIPTION DE L'AFFAIRE
              </label>
              <textarea
                name="desc"
                required
                rows={4}
                className="w-full bg-transparent border-b border-paper-foreground/40 focus:border-evidence outline-none py-2 text-paper-foreground font-serif-display resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-evidence text-evidence-foreground font-stamp tracking-[0.25em] text-sm uppercase noir-shadow hover:translate-y-[-2px] transition-transform"
            >
              ✉ Transmettre le dossier
            </button>

            {sent && (
              <p className="font-stamp text-[11px] tracking-[0.25em] text-evidence text-center">
                ● TRANSMISSION EN COURS — VOTRE CLIENT MAIL VA S'OUVRIR
              </p>
            )}
          </form>

          <div className="mt-10 pt-6 border-t border-paper-foreground/15 flex justify-between items-center text-[10px] font-stamp tracking-[0.2em] text-paper-foreground/50">
            <span>BUREAU D'ENQUÊTE · E.K.</span>
            <span>© 2025 — TOUS DOSSIERS RÉSERVÉS</span>
          </div>
        </div>
      </div>
    </section>
  );
}