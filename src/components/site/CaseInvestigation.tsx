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
 * Inspiré des hidden-object games : trouver un objet précis
 * parmi une scène dense. Consigne donnée par l'avatar en bas.
 * ============================================================ */

function HiddenObjectGame({ accent, onSolved }: { accent: string; onSolved: () => void }) {
  const POOL = [
    { e: "🔑", n: "CLÉ" },
    { e: "🗝️", n: "VIEILLE CLÉ" },
    { e: "📎", n: "TROMBONE" },
    { e: "📌", n: "PUNAISE" },
    { e: "🔒", n: "CADENAS" },
    { e: "💼", n: "MALLETTE" },
    { e: "📕", n: "CARNET ROUGE" },
    { e: "📘", n: "CARNET BLEU" },
    { e: "📷", n: "APPAREIL PHOTO" },
    { e: "📻", n: "RADIO" },
    { e: "🖊️", n: "STYLO" },
    { e: "🔦", n: "LAMPE TORCHE" },
    { e: "🕯️", n: "BOUGIE" },
    { e: "📞", n: "TÉLÉPHONE" },
    { e: "💾", n: "DISQUETTE" },
    { e: "💿", n: "CD" },
    { e: "🔍", n: "LOUPE" },
    { e: "🗂️", n: "DOSSIER" },
    { e: "📂", n: "CHEMISE" },
    { e: "✉️", n: "ENVELOPPE" },
    { e: "🧷", n: "ÉPINGLE" },
    { e: "⌚", n: "MONTRE" },
    { e: "🗞️", n: "JOURNAL" },
    { e: "🎩", n: "CHAPEAU" },
    { e: "🧭", n: "BOUSSOLE" },
    { e: "☕", n: "TASSE" },
    { e: "🍷", n: "VERRE DE VIN" },
    { e: "🖋️", n: "PLUME" },
    { e: "📰", n: "GAZETTE" },
    { e: "🪙", n: "PIÈCE" },
  ];

  const { target, items } = useMemo(() => {
    const picked = shuffle(POOL);
    const target = picked[0];
    const placed: Array<{ e: string; n: string; x: number; y: number; rot: number; size: number; isTarget: boolean }> = [];
    const W = 100, H = 100, R = 6;
    let attempts = 0;
    for (let i = 0; i < picked.length && attempts < 3000; i++) {
      let x = 0, y = 0, ok = false;
      for (let a = 0; a < 100 && !ok; a++) {
        attempts++;
        x = R + Math.random() * (W - 2 * R);
        y = R + Math.random() * (H - 2 * R);
        ok = placed.every((p) => Math.hypot(p.x - x, p.y - y) > 7);
      }
      if (!ok) continue;
      placed.push({
        ...picked[i],
        x, y,
        rot: (Math.random() - 0.5) * 40,
        size: 0.85 + Math.random() * 0.5,
        isTarget: picked[i].n === target.n,
      });
    }
    return { target, items: placed };
  }, []);

  const [shake, setShake] = useState(false);
  const [found, setFound] = useState(false);
  const [misses, setMisses] = useState(0);

  const click = (isTarget: boolean) => {
    if (found) return;
    if (isTarget) {
      setFound(true);
      setTimeout(onSolved, 500);
    } else {
      setMisses((m) => m + 1);
      setShake(true);
      setTimeout(() => setShake(false), 320);
    }
  };

  return (
    <div>
      {/* SCÈNE — format paysage 16:9 */}
      <div
        className={`relative w-full aspect-[16/9] overflow-hidden border border-white/10 rounded-sm ${shake ? "animate-pulse" : ""}`}
        style={{
          background:
            "radial-gradient(ellipse at 30% 25%, oklch(0.32 0.06 60), oklch(0.14 0.03 40) 75%)",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.75)",
        }}
      >
        {/* texture parquet/papier */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,220,180,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,220,180,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => click(it.isTarget)}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 hover:drop-shadow-[0_0_8px_white] focus:outline-none"
            style={{
              left: `${it.x}%`,
              top: `${it.y}%`,
              fontSize: `${it.size * 1.6}rem`,
              transform: `translate(-50%, -50%) rotate(${it.rot}deg) scale(${it.size})`,
              filter: found && it.isTarget ? `drop-shadow(0 0 14px ${accent})` : "none",
            }}
            aria-label={it.n}
          >
            {it.e}
          </button>
        ))}

        {found && (
          <div
            className="absolute inset-0 pointer-events-none animate-fade-in"
            style={{ background: `radial-gradient(circle, ${accent.replace(")", " / 0.22)")} 0%, transparent 60%)` }}
          />
        )}

        {/* HUD compteur */}
        <div className="absolute top-2 right-2 font-stamp text-[10px] tracking-[0.25em] text-white/70 bg-black/40 border border-white/10 px-2 py-1">
          ERREURS · {misses}
        </div>
      </div>

      {/* CONSIGNE — avatar + bulle */}
      <div className="mt-4 flex items-stretch gap-3">
        <div
          className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-sm overflow-hidden border-2"
          style={{ borderColor: accent, boxShadow: `0 0 18px ${accent.replace(")", " / 0.4)")}` }}
        >
          <img src={avatar} alt="Enquêtrice" className="w-full h-full object-cover" />
        </div>
        <div
          className="relative flex-1 px-4 py-3 bg-[oklch(0.22_0.03_60)] border border-white/15 rounded-sm"
          style={{ boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)" }}
        >
          {/* flèche bulle */}
          <span
            className="absolute -left-2 top-5 w-3 h-3 rotate-45 bg-[oklch(0.22_0.03_60)] border-l border-b border-white/15"
          />
          <div className="font-stamp text-[10px] tracking-[0.3em] mb-1" style={{ color: accent }}>
            ELENA · ENQUÊTRICE
          </div>
          <p className="font-serif-display text-base md:text-lg leading-snug text-white/90">
            Pour résoudre cette enquête et ouvrir le dossier, retrouve{" "}
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-0.5 border align-middle"
              style={{
                borderColor: accent,
                color: accent,
                background: accent.replace(")", " / 0.12)"),
              }}
            >
              <span className="text-lg leading-none">{target.e}</span>
              <span className="font-stamp text-xs tracking-[0.2em]">{target.n}</span>
            </span>{" "}
            caché dans la scène.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- utils ---------- */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

