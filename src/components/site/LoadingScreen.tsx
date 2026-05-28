import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-detective.jpg";

const steps = [
  "Ouverture du dossier Elena Kervennic…",
  "Analyse des preuves…",
  "Chargement des enquêtes résolues…",
  "Accès autorisé.",
];

export function LoadingScreen({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + (p < 60 ? 2.4 : p < 90 ? 1.2 : 0.6);
        if (next >= 100) {
          clearInterval(t);
          setStepIdx(steps.length - 1);
          setReady(true);
          return 100;
        }
        setStepIdx(Math.min(steps.length - 1, Math.floor((next / 100) * steps.length)));
        return next;
      });
    }, 60);
    return () => clearInterval(t);
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-background transition-all duration-700 ${
        leaving ? "opacity-0 scale-105 blur-sm pointer-events-none" : ""
      }`}
    >
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-25 animate-flicker"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,oklch(0.13_0.01_20)_85%)]" />

      {/* Scanline */}
      <div className="absolute inset-x-0 h-[2px] bg-evidence/40 animate-scanline pointer-events-none" />

      {/* Grid noise */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, oklch(1 0 0 / 0.4) 2px 3px)",
        }}
      />

      {/* Corner brackets */}
      <CornerBrackets />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between font-stamp text-[10px] tracking-[0.35em] text-evidence/80 mb-6">
            <span>● REC</span>
            <span>BUREAU D'ENQUÊTE — DATA &amp; IA</span>
            <span className="animate-blink">_</span>
          </div>

          {/* Title */}
          <div className="border border-evidence/40 bg-background/40 backdrop-blur-sm p-8 md:p-10 noir-shadow">
            <div className="font-stamp text-[10px] tracking-[0.3em] text-evidence mb-2">
              CONFIDENTIEL · NIVEAU 5
            </div>
            <h1 className="font-serif-display text-5xl md:text-7xl text-foreground leading-none mb-3 animate-glitch">
              DOSSIER <span className="text-evidence">#EK</span>
            </h1>
            <p className="font-stamp text-[11px] tracking-[0.25em] text-muted-foreground uppercase mb-8">
              Classification : Portfolio confidentiel
            </p>

            {/* Steps */}
            <div className="space-y-1.5 font-stamp text-sm md:text-base text-foreground/85 min-h-[140px]">
              {steps.map((s, i) => {
                const done = i < stepIdx || (i === steps.length - 1 && ready);
                const active = i === stepIdx && !done;
                const visible = i <= stepIdx;
                if (!visible) return null;
                return (
                  <div key={s} className="flex items-baseline gap-3 animate-fade-in">
                    <span className={done ? "text-evidence" : "text-evidence/60"}>
                      {done ? "✓" : ">"}
                    </span>
                    <span className={active ? "animate-glitch" : ""}>
                      {s}
                      {active && <span className="animate-blink">▌</span>}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress */}
            <div className="mt-8">
              <div className="flex items-center justify-between font-stamp text-[10px] tracking-[0.3em] text-muted-foreground mb-2">
                <span>DÉCRYPTAGE</span>
                <span className="text-evidence">{Math.floor(progress)}%</span>
              </div>
              <div className="relative h-2 bg-foreground/10 overflow-hidden border border-evidence/30">
                <div
                  className="absolute inset-y-0 left-0 bg-evidence transition-[width] duration-100 ease-out"
                  style={{ width: `${progress}%`, boxShadow: "0 0 12px var(--evidence)" }}
                />
                <div
                  className="absolute inset-y-0 w-px bg-foreground/60 animate-pulse"
                  style={{ left: `${progress}%` }}
                />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
              <div className="font-stamp text-[10px] tracking-[0.3em] text-muted-foreground">
                {ready ? (
                  <span className="text-evidence">● ACCÈS AUTORISÉ</span>
                ) : (
                  <span>⏳ ANALYSE EN COURS</span>
                )}
              </div>
              <button
                onClick={handleEnter}
                disabled={!ready}
                className={`px-7 py-3 font-stamp tracking-[0.25em] text-sm uppercase transition-all ${
                  ready
                    ? "bg-evidence text-evidence-foreground noir-shadow hover:translate-y-[-2px] animate-stamp cursor-pointer"
                    : "border border-foreground/15 text-foreground/30 cursor-not-allowed"
                }`}
              >
                🔍 Ouvrir le dossier
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-between font-stamp text-[9px] tracking-[0.3em] text-muted-foreground/60">
            <span>ID : EK-2025-001</span>
            <span>SIGNAL STABLE</span>
            <span>{new Date().toISOString().slice(0, 10)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CornerBrackets() {
  const cls = "absolute w-10 h-10 border-evidence/70 pointer-events-none";
  return (
    <>
      <div className={`${cls} top-6 left-6 border-t-2 border-l-2`} />
      <div className={`${cls} top-6 right-6 border-t-2 border-r-2`} />
      <div className={`${cls} bottom-6 left-6 border-b-2 border-l-2`} />
      <div className={`${cls} bottom-6 right-6 border-b-2 border-r-2`} />
    </>
  );
}