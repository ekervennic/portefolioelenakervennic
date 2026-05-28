import heroBg from "@/assets/hero-detective.jpg";
import { Nav } from "./Nav";

export function Hero() {
  return (
    <section id="moi-hero" className="relative min-h-screen overflow-hidden">
      <Nav />
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Bureau de détective"
          width={1920}
          height={1280}
          className="w-full h-full object-cover opacity-90 animate-flicker"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40" />
      </div>

      {/* Left-aligned content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32">
          <div className="max-w-3xl">
            {/* DOSSIER stamp */}
            <div className="inline-block mb-10 animate-stamp" style={{ animationDelay: "0.2s" }}>
              <div
                className="font-stamp text-[12px] md:text-sm tracking-[0.35em] text-evidence border-2 border-evidence px-5 py-2.5 uppercase"
                style={{ transform: "rotate(-2deg)", background: "oklch(0.62 0.22 18 / 0.08)" }}
              >
                Dossier #EK — Ouvert
              </div>
            </div>

            <h1 className="font-serif-display leading-[0.88] mb-8">
              <span className="block text-7xl md:text-8xl lg:text-[9rem] text-foreground font-medium tracking-tight">
                ELENA
              </span>
              <span className="block text-7xl md:text-8xl lg:text-[9rem] text-evidence italic font-medium tracking-tight">
                KERVENNIC
              </span>
            </h1>

            <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-foreground/85 font-stamp mb-10">
              Étudiante Data &amp; Intelligence Artificielle
            </p>

            <p className="text-lg md:text-xl text-foreground/85 max-w-xl mb-10 leading-relaxed">
              Je transforme les données en décisions et les problèmes en{" "}
              <strong className="text-evidence font-semibold">enquêtes résolues</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#enquetes"
                className="px-8 py-4 bg-evidence text-evidence-foreground font-stamp tracking-[0.22em] text-sm uppercase noir-shadow hover:translate-y-[-2px] transition-transform"
              >
                🔍 Ouvrir les dossiers
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-foreground/30 text-foreground font-stamp tracking-[0.22em] text-sm uppercase backdrop-blur-sm hover:border-evidence hover:text-evidence transition-colors"
              >
                ✉ Me contacter
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-stamp text-[10px] md:text-[11px] tracking-[0.4em] text-muted-foreground uppercase z-10">
        ↓ Descendre dans le dossier
      </div>

      <div id="moi" className="absolute bottom-0" />
    </section>
  );
}