import { useEffect, useState } from "react";
import parchment from "@/assets/elena-parchment.png";
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

// Position de l'objet caché (vinyle) — coordonnées en % sur la scène.
// Sous la table basse, légèrement à gauche de l'ancre, partiellement masqué.
const TARGET = { x: 41, y: 86, r: 4 };

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

        {/* Vinyle caché — visuel SVG positionné sur la cible.
            Discret par défaut ; pulsé si l'indice est activé. */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${TARGET.x}%`,
            top: `${TARGET.y}%`,
            transform: `translate(-50%, -50%) rotate(-18deg)`,
            width: "8%",
            aspectRatio: "1",
            opacity: found ? 1 : 0.78,
            filter: found
              ? `drop-shadow(0 0 18px ${accent})`
              : hint
              ? `drop-shadow(0 0 12px ${accent})`
              : "drop-shadow(0 2px 3px rgba(0,0,0,0.6))",
            animation: hint && !found ? "pulse 1.2s ease-in-out infinite" : undefined,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="vinylG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="60%" stopColor="#0a0a0a" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#vinylG)" stroke="#222" strokeWidth="1" />
            {[42, 36, 30, 24].map((r) => (
              <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            ))}
            <circle cx="50" cy="50" r="16" fill="#b8412a" />
            <circle cx="50" cy="50" r="2" fill="#0a0a0a" />
            {/* reflet */}
            <path d="M 20 30 Q 50 10 80 30" stroke="rgba(255,255,255,0.18)" strokeWidth="2" fill="none" />
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
          OBJET RECHERCHÉ · 1 VINYLE
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

      {/* CONSIGNE — papyrus avec portrait d'Elena */}
      <div
        className="relative mt-4 w-full"
        style={{
          aspectRatio: "3 / 1.05",
          backgroundImage: `url(${parchment})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Texte calé sur la zone vide à droite du portrait */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-[38%]" />
          <div className="flex-1 pr-[10%] pl-2">
            <div
              className="font-stamp text-[10px] md:text-xs tracking-[0.3em] mb-1.5"
              style={{ color: "oklch(0.35 0.08 30)" }}
            >
              ELENA · ENQUÊTRICE
            </div>
            <p
              className="font-serif-display leading-snug text-[13px] md:text-[17px]"
              style={{ color: "oklch(0.22 0.04 30)" }}
            >
              Pour résoudre cette enquête et ouvrir le dossier, retrouve le{" "}
              <span
                className="font-bold"
                style={{ color: "oklch(0.42 0.16 25)" }}
              >
                vinyle caché
              </span>{" "}
              quelque part dans la pièce. Observe bien… il se fond dans le décor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

