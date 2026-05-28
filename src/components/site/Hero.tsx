import heroBg from "@/assets/hero-detective.jpg";
import { Nav } from "./Nav";

export function Hero() {
  return (
    <section id="moi-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Nav />
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Bureau de détective"
          width={1920}
          height={1280}
          className="w-full h-full object-cover opacity-70 scale-105 animate-flicker"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,oklch(0.13_0.01_20)_85%)]" />
      </div>

      {/* Crosshair lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-evidence" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-evidence" />
      </div>

      {/* Classified marks */}
      <div className="absolute top-24 left-8 md:left-16 stamp text-sm animate-stamp" style={{ animationDelay: "0.4s" }}>
        CLASSIFIÉ · N° 2025
      </div>
      <div className="absolute bottom-24 right-8 md:right-16 stamp text-sm animate-stamp" style={{ animationDelay: "0.6s", transform: "rotate(6deg)" }}>
        DOSSIER OUVERT
      </div>

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <div className="text-[11px] tracking-[0.4em] text-evidence font-stamp mb-6 animate-fade-in">
          BUREAU D'ENQUÊTE — DATA &amp; IA
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif-display font-medium text-foreground leading-[0.95] mb-6 animate-fade-in">
          ELENA<br />
          <span className="italic text-evidence">KERVENNIC</span>
        </h1>
        <p className="text-base md:text-lg tracking-[0.25em] uppercase text-muted-foreground font-stamp mb-4">
          Étudiante Data &amp; Intelligence Artificielle
        </p>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 font-serif-display italic">
          « Je transforme les données en décisions et les problèmes en enquêtes résolues. »
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#enquetes"
            className="group relative px-8 py-4 bg-evidence text-evidence-foreground font-stamp tracking-[0.2em] text-sm uppercase noir-shadow hover:translate-y-[-2px] transition-transform"
          >
            🔍 Ouvrir les dossiers
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-foreground/30 text-foreground font-stamp tracking-[0.2em] text-sm uppercase backdrop-blur-sm hover:border-evidence hover:text-evidence transition-colors"
          >
            📩 Me contacter
          </a>
        </div>
      </div>

      {/* Pinned cards bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 md:hidden">
        {["MOI", "STACK", "ENQUÊTES", "DATAVIZ"].map((l, i) => (
          <a
            key={l}
            href={`#${l.toLowerCase().replace("ê", "e").replace("é", "e")}`}
            className="pin relative px-3 py-2 paper-bg text-[10px] font-stamp tracking-[0.15em] paper-shadow"
            style={{ transform: `rotate(${(i % 2 ? 2 : -2)}deg)` }}
          >
            {l}
          </a>
        ))}
      </div>

      <div id="moi" className="absolute bottom-0" />
    </section>
  );
}