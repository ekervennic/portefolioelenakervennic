import { useEffect, useState } from "react";
import { useCallback, useMemo, useRef } from "react";
import avatar from "@/assets/elena-avatar.jpg";
import paper from "@/assets/paper-texture.jpg";
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
          {!solved && (
            caseId === "together" ? (
              <MazeGame key={caseId} accent={ACCENT} onSolved={() => setSolved(true)} />
            ) : (
              <HiddenObjectGame key={caseId} accent={ACCENT} onSolved={() => setSolved(true)} />
            )
          )}

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

// Position de l'objet caché (toute petite mouette dans le ciel, par la baie vitrée).
const TARGET = { x: 8.7, y: 23.5, r: 2.2 };

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

        {/* Halo d'indice — la mouette est peinte dans le tableau, pas d'overlay. */}
        {hint && !found && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${TARGET.x}%`,
              top: `${TARGET.y}%`,
              width: "10%",
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              boxShadow: `0 0 24px 6px ${accent}`,
              animation: "pulse 1.2s ease-in-out infinite",
            }}
          />
        )}

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
          OBJET RECHERCHÉ · 1 MOUETTE
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

      {/* CONSIGNE — fond papier sombre avec portrait ovale façon tableau ancien */}
      <div
        className="relative mt-4 w-full flex items-center gap-4 md:gap-5 p-4 border border-[oklch(0.45_0.08_50)]"
        style={{
          backgroundImage: `url(${paper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 0 40px rgba(80,40,10,0.25), 0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
          {/* Portrait ovale — cadre doré façon tableau ancien */}
          <div
            className="shrink-0 relative w-14 h-[72px] md:w-16 md:h-[84px]"
            style={{
              borderRadius: "50% / 50%",
              background:
                "linear-gradient(135deg, oklch(0.72 0.14 75) 0%, oklch(0.45 0.10 55) 50%, oklch(0.72 0.14 75) 100%)",
              padding: "4px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.55), inset 0 0 2px rgba(255,220,160,0.8)",
            }}
          >
            <div
              className="w-full h-full overflow-hidden"
              style={{
                borderRadius: "50% / 50%",
                boxShadow: "inset 0 0 8px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src={avatar}
                alt="Elena"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 22%", filter: "sepia(0.25) contrast(1.05)" }}
              />
            </div>
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
              mouette cachée
            </span>{" "}
            quelque part dans la pièce. Observe bien… elle se fond dans le décor.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * MINI-JEU MAZE — Cas "Together"
 * Elena cherche la sortie du labyrinthe pour rejoindre ses amis.
 * ============================================================ */

// '#' = mur, '.' = couloir, 'S' = départ, 'E' = sortie (amis).
const MAZE: string[] = [
  "###############",
  "#S....#.......#",
  "#.###.#.#####.#",
  "#.#...#.....#.#",
  "#.#.#######.#.#",
  "#.#.......#.#.#",
  "#.#######.#.#.#",
  "#.........#..E#",
  "###############",
];

const COLS = MAZE[0].length;
const ROWS = MAZE.length;

function findCell(ch: string): { c: number; r: number } {
  for (let r = 0; r < ROWS; r++) {
    const c = MAZE[r].indexOf(ch);
    if (c >= 0) return { c, r };
  }
  return { c: 1, r: 1 };
}

function MazeGame({ accent, onSolved }: { accent: string; onSolved: () => void }) {
  const start = findCell("S");
  const exit = findCell("E");
  const [pos, setPos] = useState(start);
  const [steps, setSteps] = useState(0);
  const [won, setWon] = useState(false);
  const wonRef = useRef(false);

  const move = useCallback((dc: number, dr: number) => {
    if (wonRef.current) return;
    setPos((p) => {
      const nc = p.c + dc;
      const nr = p.r + dr;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return p;
      const ch = MAZE[nr][nc];
      if (ch === "#") return p;
      setSteps((s) => s + 1);
      if (ch === "E") {
        wonRef.current = true;
        setWon(true);
        setTimeout(onSolved, 700);
      }
      return { c: nc, r: nr };
    });
  }, [onSolved]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, [number, number]> = {
        ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
        w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
        z: [0, -1], q: [-1, 0],
      };
      const m = map[e.key];
      if (m) {
        e.preventDefault();
        move(m[0], m[1]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  const cellW = 100 / COLS;
  const cellH = 100 / ROWS;

  return (
    <div>
      <div
        className="relative w-full aspect-[15/9] overflow-hidden border border-white/15 rounded-sm select-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, oklch(0.28 0.04 260), oklch(0.14 0.02 260))",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* grille de cellules */}
        <svg viewBox={`0 0 ${COLS} ${ROWS}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {MAZE.map((row, r) =>
            [...row].map((ch, c) => {
              if (ch === "#") {
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c}
                    y={r}
                    width={1}
                    height={1}
                    fill="oklch(0.32 0.03 30)"
                    stroke="oklch(0.18 0.02 30)"
                    strokeWidth={0.05}
                  />
                );
              }
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c}
                  y={r}
                  width={1}
                  height={1}
                  fill="oklch(0.22 0.02 40)"
                  stroke="oklch(0.16 0.02 40)"
                  strokeWidth={0.02}
                />
              );
            })
          )}
          {/* halo sortie */}
          <circle
            cx={exit.c + 0.5}
            cy={exit.r + 0.5}
            r={0.6}
            fill={accent}
            opacity={0.25}
          >
            <animate attributeName="r" values="0.45;0.7;0.45" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Amis à la sortie */}
        <div
          className="absolute flex items-center justify-center text-xl md:text-2xl pointer-events-none"
          style={{
            left: `${exit.c * cellW}%`,
            top: `${exit.r * cellH}%`,
            width: `${cellW}%`,
            height: `${cellH}%`,
            filter: `drop-shadow(0 0 6px ${accent})`,
          }}
        >
          🎉
        </div>

        {/* Elena (joueur) */}
        <div
          className="absolute rounded-full overflow-hidden border-2 transition-all duration-150 ease-out"
          style={{
            left: `${pos.c * cellW + cellW * 0.1}%`,
            top: `${pos.r * cellH + cellH * 0.1}%`,
            width: `${cellW * 0.8}%`,
            height: `${cellH * 0.8}%`,
            borderColor: accent,
            boxShadow: `0 0 12px ${accent}`,
          }}
        >
          <img src={avatar} alt="Elena" className="w-full h-full object-cover" style={{ objectPosition: "center 22%" }} />
        </div>

        {/* HUD */}
        <div className="absolute top-2 left-2 font-stamp text-[10px] tracking-[0.25em] text-white bg-black/55 border border-white/15 px-2.5 py-1 rounded-sm pointer-events-none">
          PAS · {steps}
        </div>
        <div className="absolute top-2 right-2 font-stamp text-[10px] tracking-[0.25em] text-white/85 bg-black/55 border border-white/15 px-2.5 py-1 rounded-sm pointer-events-none">
          ← ↑ ↓ → · WASD
        </div>

        {/* D-pad mobile */}
        <div className="absolute bottom-3 right-3 grid grid-cols-3 grid-rows-3 gap-1 w-28 h-28 md:hidden">
          <div />
          <button onClick={() => move(0, -1)} className="bg-black/60 border border-white/20 text-white" style={{ color: accent }}>▲</button>
          <div />
          <button onClick={() => move(-1, 0)} className="bg-black/60 border border-white/20 text-white" style={{ color: accent }}>◀</button>
          <div />
          <button onClick={() => move(1, 0)} className="bg-black/60 border border-white/20 text-white" style={{ color: accent }}>▶</button>
          <div />
          <button onClick={() => move(0, 1)} className="bg-black/60 border border-white/20 text-white" style={{ color: accent }}>▼</button>
          <div />
        </div>

        {/* Halo de victoire */}
        {won && (
          <div
            className="absolute inset-0 pointer-events-none animate-fade-in"
            style={{
              background: `radial-gradient(circle at ${exit.c * cellW + cellW / 2}% ${exit.r * cellH + cellH / 2}%, ${accent.replace(")", " / 0.5)")} 0%, transparent 45%)`,
            }}
          />
        )}
      </div>

      {/* CONSIGNE — fond papier, portrait ovale */}
      <div
        className="relative mt-4 w-full flex items-center gap-4 md:gap-5 p-4 border border-[oklch(0.45_0.08_50)]"
        style={{
          backgroundImage: `url(${paper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 0 40px rgba(80,40,10,0.25), 0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="shrink-0 relative w-14 h-[72px] md:w-16 md:h-[84px]"
          style={{
            borderRadius: "50% / 50%",
            background:
              "linear-gradient(135deg, oklch(0.72 0.14 75) 0%, oklch(0.45 0.10 55) 50%, oklch(0.72 0.14 75) 100%)",
            padding: "4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.55), inset 0 0 2px rgba(255,220,160,0.8)",
          }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{ borderRadius: "50% / 50%", boxShadow: "inset 0 0 8px rgba(0,0,0,0.6)" }}
          >
            <img
              src={avatar}
              alt="Elena"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 22%", filter: "sepia(0.25) contrast(1.05)" }}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-stamp text-[10px] md:text-xs tracking-[0.3em] mb-1.5" style={{ color: "oklch(0.35 0.10 30)" }}>
            ELENA · EN ROUTE
          </div>
          <p className="font-serif-display leading-snug text-[13px] md:text-[16px]" style={{ color: "oklch(0.22 0.04 30)" }}>
            Aide-moi à{" "}
            <span className="font-bold" style={{ color: "oklch(0.42 0.16 25)" }}>
              traverser le labyrinthe
            </span>{" "}
            pour rejoindre mes amies de l'autre côté. Utilise les flèches du clavier.
          </p>
        </div>
      </div>
    </div>
  );
}

