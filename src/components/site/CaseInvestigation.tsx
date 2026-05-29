import { useEffect, useState } from "react";
import avatar from "@/assets/elena-avatar.jpg";
import papyrus from "@/assets/papyrus-torn.png";
import sceneCabin from "@/assets/scene-cabin.jpg";

type Props = {
  caseId: string;
  caseTitle: string;
  onSolved: () => void;
  onClose: () => void;
};

// Accent unique pour la fouille — chaud type carnet d'enquête.
const ACCENT = "oklch(0.82 0.16 60)";
const ACCENT_SOFT = "oklch(0.82 0.16 60 / 0.18)";

export function CaseInvestigation({ caseId, caseTitle, onSolved, onClose }: Props) {
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (!solved) return;
    const t = setTimeout(() => onSolved(), 950);
    return () => clearTimeout(t);
  }, [solved, onSolved]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-background/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[oklch(0.16_0.02_260)] text-[oklch(0.95_0.01_80)] noir-shadow p-5 md:p-8 animate-scale-in border border-white/10"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage:
            `radial-gradient(circle at 20% 0%, ${ACCENT_SOFT}, transparent 60%), radial-gradient(circle at 100% 100%, rgba(120,140,255,0.06), transparent 50%)`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-evidence hover:text-evidence-foreground text-white/70 text-lg transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div
          className="font-stamp text-[10px] tracking-[0.3em] mb-2 flex items-center gap-2"
          style={{ color: ACCENT }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
          />
          ACCÈS CLASSIFIÉ · FOUILLE DE LA SCÈNE
        </div>
        <h3 className="font-serif-display text-xl md:text-2xl leading-tight mb-4">
          {caseTitle}
        </h3>

        <div className="relative">
          {!solved && <HiddenObjectGame key={caseId} accent={ACCENT} onSolved={() => setSolved(true)} />}

          {solved && (
            <div className="min-h-[320px] flex flex-col items-center justify-center text-center animate-fade-in">
              <div
                className="px-6 py-3 border-2 font-stamp text-base tracking-[0.3em] rotate-[-3deg] mb-4"
                style={{
                  borderColor: ACCENT,
                  color: ACCENT,
                  boxShadow: `0 0 24px ${ACCENT}`,
                }}
              >
                ✓ DOSSIER OUVERT
              </div>
              <p className="font-serif-display italic text-white/80">Objet retrouvé — dossier ouvert.</p>
            </div>
          )}
        </div>

        {!solved && (
          <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-dashed border-white/15">
            <span className="font-stamp text-[10px] tracking-[0.25em] text-white/40">
              Fouillez la scène · épreuve d'accès
            </span>
            <button
              onClick={onSolved}
              className="font-stamp text-[10px] tracking-[0.25em] text-white/50 underline-offset-4 hover:underline transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Passer l'enquête →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
 * MINI-JEU UNIQUE — Fouille de la scène (format paysage)
 * Décor cabine + vinyle caché à retrouver. Consigne sur papyrus
 * avec le portrait d'Elena.
 * ============================================================ */

// Position de l'objet caché (coquillage) — coordonnées en % sur la scène.
// Posé discrètement sur la table basse, presque confondu avec le décor.
const TARGET = { x: 50, y: 72, r: 4 };

// Leurres : zones cliquables qui ne déclenchent que la pénalité d'erreur.
// Pas besoin de pixel-perfect — l'utilisateur peut cliquer n'importe où ailleurs.
function HiddenObjectGame({ accent, onSolved }: { accent: string; onSolved: () => void }) {
  const [shake, setShake] = useState(false);
  const [found, setFound] = useState(false);
  const [misses, setMisses] = useState(0);
  const [hint, setHint] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (found) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const d = Math.hypot(x - TARGET.x, y - TARGET.y);
    if (d <= TARGET.r) {
      setFound(true);
      setTimeout(onSolved, 600);
    } else {
      setMisses((m) => m + 1);
      setShake(true);
      setTimeout(() => setShake(false), 320);
    }
  };

  return (
    <div>
      {/* SCÈNE — décor cabine, format paysage */}
      <div
        onClick={handleClick}
        className={`relative w-full aspect-[16/9] overflow-hidden border border-white/15 rounded-sm cursor-crosshair select-none ${shake ? "animate-pulse" : ""}`}
        style={{
          backgroundImage: `url(${sceneCabin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.55)",
        }}
      >
        {/* vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Coquillage discret posé dans le décor. */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${TARGET.x}%`,
            top: `${TARGET.y}%`,
            transform: `translate(-50%, -50%) rotate(-8deg)`,
            width: "4.5%",
            aspectRatio: "1",
            opacity: found ? 1 : 0.85,
            filter: found
              ? `drop-shadow(0 0 18px ${accent})`
              : hint
              ? `drop-shadow(0 0 10px ${accent})`
              : "drop-shadow(0 1px 2px rgba(0,0,0,0.55))",
            animation: hint && !found ? "pulse 1.2s ease-in-out infinite" : undefined,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="shellG" cx="50%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#fbeacb" />
                <stop offset="55%" stopColor="#e8b87a" />
                <stop offset="100%" stopColor="#9b6638" />
              </radialGradient>
            </defs>
            {/* éventail / coquille Saint-Jacques */}
            <path
              d="M50 92 C 12 92 6 50 22 22 C 30 38 38 44 50 46 C 62 44 70 38 78 22 C 94 50 88 92 50 92 Z"
              fill="url(#shellG)"
              stroke="#6b3f1f"
              strokeWidth="1.2"
            />
            {[28, 38, 50, 62, 72].map((x) => (
              <path
                key={x}
                d={`M50 88 Q ${x} 55 ${x + (x - 50) * 0.4} 26`}
                stroke="rgba(107,63,31,0.55)"
                strokeWidth="0.9"
                fill="none"
              />
            ))}
            <path d="M40 22 Q 50 14 60 22 L 56 30 Q 50 26 44 30 Z" fill="#c98a4d" stroke="#6b3f1f" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Halo de cible trouvée */}
        {found && (
          <div
            className="absolute inset-0 pointer-events-none animate-fade-in"
            style={{
              background: `radial-gradient(circle at ${TARGET.x}% ${TARGET.y}%, ${accent.replace(")", " / 0.45)")} 0%, transparent 35%)`,
            }}
          />
        )}

        {/* HUD */}
        <div className="absolute top-2 left-2 font-stamp text-[10px] tracking-[0.25em] text-white bg-black/55 border border-white/15 px-2.5 py-1 rounded-sm pointer-events-none">
          OBJET RECHERCHÉ · 1 COQUILLAGE
        </div>
        <div className="absolute top-2 right-2 font-stamp text-[10px] tracking-[0.25em] text-white/85 bg-black/55 border border-white/15 px-2.5 py-1 rounded-sm pointer-events-none">
          ERREURS · {misses}
        </div>

        {/* Bouton indice (apparaît après 3 erreurs) */}
        {misses >= 3 && !found && (
          <button
            onClick={(ev) => { ev.stopPropagation(); setHint(true); setTimeout(() => setHint(false), 1800); }}
            className="absolute bottom-2 right-2 font-stamp text-[10px] tracking-[0.25em] px-3 py-1.5 border bg-black/60 hover:bg-black/80 transition-colors"
            style={{ borderColor: accent, color: accent }}
          >
            INDICE
          </button>
        )}
      </div>

      {/* CONSIGNE — papyrus avec petit portrait encadré façon tableau */}
      <div
        className="relative mt-4 w-full flex items-stretch gap-4 p-4 border border-[oklch(0.45_0.08_50)]"
        style={{
          backgroundImage: `url(${paper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 0 60px rgba(120,70,20,0.35), 0 8px 24px rgba(0,0,0,0.4)",
          filter: "sepia(0.15)",
        }}
      >
        {/* Portrait — petit cadre doré façon tableau, non déformé */}
        <div
          className="shrink-0 w-14 h-16 md:w-16 md:h-20 overflow-hidden"
          style={{
            border: "3px solid oklch(0.62 0.13 70)",
            outline: "1px solid oklch(0.32 0.06 50)",
            outlineOffset: "-5px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.55), inset 0 0 8px rgba(0,0,0,0.4)",
            background: "oklch(0.25 0.04 40)",
          }}
        >
          <img
            src={avatar}
            alt="Elena"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>

        {/* Texte — bien à droite du portrait */}
        <div className="flex-1 min-w-0">
          <div
            className="font-stamp text-[10px] md:text-xs tracking-[0.3em] mb-1.5"
            style={{ color: "oklch(0.35 0.10 30)" }}
          >
            ELENA · ENQUÊTRICE
          </div>
          <p
            className="font-serif-display leading-snug text-[13px] md:text-[16px]"
            style={{ color: "oklch(0.22 0.04 30)" }}
          >
            Pour résoudre cette enquête et ouvrir le dossier, retrouve le{" "}
            <span className="font-bold" style={{ color: "oklch(0.42 0.16 25)" }}>
              coquillage caché
            </span>{" "}
            quelque part dans la pièce. Observe bien… il se fond dans le décor.
          </p>
        </div>
      </div>
    </div>
  );
}

