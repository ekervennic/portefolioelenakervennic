import { useEffect, useState } from "react";
import { useCallback, useMemo, useRef } from "react";
import avatar from "@/assets/elena-avatar.jpg";
import friendsImg from "@/assets/friends-group.png";
import mazeFloor from "@/assets/maze-floor.jpg";
import mazeWall from "@/assets/maze-wall.jpg";
import paper from "@/assets/paper-texture.jpg";
import sceneCabin from "@/assets/scene-cabin.jpg";
import sceneBalcony from "@/assets/scene-balcony.jpg";
import sceneTemple from "@/assets/scene-temple.jpg";
import sceneCinema from "@/assets/scene-cinema.jpg";
import paris1 from "@/assets/paris-1.jpg";
import paris2 from "@/assets/paris-2.jpg";
import paris3 from "@/assets/paris-3.jpg";
import paris4 from "@/assets/paris-4.jpg";
import paris5 from "@/assets/paris-5.jpg";
import paris6 from "@/assets/paris-6.jpg";
import paris7 from "@/assets/paris-7.jpg";
import paris8 from "@/assets/paris-8.jpg";
import cardBack from "@/assets/card-back.jpg";

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
        className="relative w-full max-w-5xl bg-[oklch(0.16_0.02_260)] text-[oklch(0.95_0.01_80)] noir-shadow p-3 sm:p-5 md:p-8 animate-scale-in border border-white/10 max-h-[95vh] overflow-y-auto"
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
            ) : caseId === "mirakl" ? (
              <MemoryGame key={caseId} accent={ACCENT} onSolved={() => setSolved(true)} />
            ) : caseId === "mood" ? (
              <PuzzleGame key={caseId} accent={ACCENT} onSolved={() => setSolved(true)} />
            ) : caseId === "ecole" ? (
              <WireGame key={caseId} accent={ACCENT} onSolved={() => setSolved(true)} />
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
              className="font-stamp text-[10px] tracking-[0.25em] px-3 py-1.5 border rounded-sm transition-colors"
              style={{ color: ACCENT, borderColor: ACCENT, background: ACCENT_SOFT }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = ACCENT;
                e.currentTarget.style.color = "oklch(0.15 0.02 30)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = ACCENT_SOFT;
                e.currentTarget.style.color = ACCENT;
              }}
            >
              PASSER LE MINI-JEU →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
 * MINI-JEU SLIDING PUZZLE — Cas "Mood Film Finder"
 * Reconstitue la scène cinéma en glissant les tuiles.
 * Grille 3x3 — case vide en bas à droite.
 * ============================================================ */

function PuzzleGame({ accent, onSolved }: { accent: string; onSolved: () => void }) {
  const SIZE = 3;
  const TOTAL = SIZE * SIZE;
  const EMPTY = TOTAL - 1;

  const [tiles, setTiles] = useState<number[]>(() => {
    // Mélange via mouvements valides (toujours solvable)
    const arr = Array.from({ length: TOTAL }, (_, i) => i);
    let empty = EMPTY;
    let last = -1;
    for (let k = 0; k < 60; k++) {
      const r = Math.floor(empty / SIZE);
      const c = empty % SIZE;
      const opts: number[] = [];
      if (r > 0) opts.push(empty - SIZE);
      if (r < SIZE - 1) opts.push(empty + SIZE);
      if (c > 0) opts.push(empty - 1);
      if (c < SIZE - 1) opts.push(empty + 1);
      const choices = opts.filter((x) => x !== last);
      const pick = choices[Math.floor(Math.random() * choices.length)];
      [arr[empty], arr[pick]] = [arr[pick], arr[empty]];
      last = empty;
      empty = pick;
    }
    return arr;
  });
  const [moves, setMoves] = useState(0);
  const won = useMemo(() => tiles.every((v, i) => v === i), [tiles]);

  useEffect(() => {
    if (won) {
      const t = setTimeout(onSolved, 900);
      return () => clearTimeout(t);
    }
  }, [won, onSolved]);

  const tryMove = (idx: number) => {
    if (won) return;
    const emptyIdx = tiles.indexOf(EMPTY);
    const r1 = Math.floor(idx / SIZE), c1 = idx % SIZE;
    const r2 = Math.floor(emptyIdx / SIZE), c2 = emptyIdx % SIZE;
    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) !== 1) return;
    const next = tiles.slice();
    [next[idx], next[emptyIdx]] = [next[emptyIdx], next[idx]];
    setTiles(next);
    setMoves((m) => m + 1);
  };

  return (
    <div>
      <div
        className="relative w-full aspect-square sm:aspect-[16/12] overflow-hidden rounded-sm select-none"
        style={{
          backgroundImage: `url(${sceneCinema})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow:
            "inset 0 0 120px rgba(20,8,2,0.7), 0 0 0 3px oklch(0.55 0.14 70 / 0.6), 0 14px 50px rgba(0,0,0,0.7)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.7))" }}
        />

        {/* HUD */}
        <div
          className="absolute top-2 left-2 z-10 font-stamp text-[10px] tracking-[0.25em] text-white px-2.5 py-1 rounded-sm"
          style={{
            background: "rgba(0,0,0,0.65)",
            border: `1px solid ${accent}`,
            boxShadow: `0 0 8px ${accent.replace(")", " / 0.5)")}`,
          }}
        >
          MOUVEMENTS · {moves}
        </div>
        <div className="absolute top-2 right-2 z-10 font-stamp text-[10px] tracking-[0.25em] text-white/90 bg-black/65 border border-white/20 px-2.5 py-1 rounded-sm">
          BOBINE · {SIZE}×{SIZE}
        </div>

        {/* Grille du puzzle */}
        <div className="absolute inset-0 flex items-center justify-center p-3 md:p-6">
          <div
            className="relative grid gap-1 sm:gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${SIZE}, minmax(0, 1fr))`,
              width: "min(92%, 460px)",
              aspectRatio: "1 / 1",
              boxShadow: `0 0 0 2px ${accent}, 0 0 30px ${accent.replace(")", " / 0.4)")}`,
            }}
          >
            {tiles.map((v, idx) => {
              if (v === EMPTY) {
                return <div key={idx} className="bg-black/55 rounded-sm" />;
              }
              const tr = Math.floor(v / SIZE);
              const tc = v % SIZE;
              return (
                <button
                  key={idx}
                  onClick={() => tryMove(idx)}
                  className="relative rounded-sm overflow-hidden transition-transform active:scale-95"
                  style={{
                    backgroundImage: `url(${sceneCinema})`,
                    backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                    backgroundPosition: `${(tc / (SIZE - 1)) * 100}% ${(tr / (SIZE - 1)) * 100}%`,
                    boxShadow:
                      "inset 0 0 0 1px rgba(255,255,255,0.18), 0 4px 10px rgba(0,0,0,0.6)",
                  }}
                  aria-label={`Tuile ${v + 1}`}
                />
              );
            })}
          </div>
        </div>

        {won && (
          <div
            className="absolute inset-0 pointer-events-none animate-fade-in"
            style={{
              background: `radial-gradient(circle at center, ${accent.replace(")", " / 0.45)")} 0%, transparent 60%)`,
            }}
          />
        )}
      </div>

      {/* CONSIGNE */}
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
            <img src={avatar} alt="Elena" className="w-full h-full object-cover" style={{ objectPosition: "center 22%", filter: "sepia(0.25) contrast(1.05)" }} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-stamp text-[10px] md:text-xs tracking-[0.3em] mb-1.5" style={{ color: "oklch(0.35 0.10 30)" }}>
            ELENA · CINÉPHILE
          </div>
          <p className="font-serif-display leading-snug text-[13px] md:text-[16px]" style={{ color: "oklch(0.22 0.04 30)" }}>
            La bobine s'est emmêlée dans la salle de projection. Glisse les tuiles pour{" "}
            <span className="font-bold" style={{ color: "oklch(0.42 0.16 25)" }}>
              reconstituer la scène
            </span>{" "}
            et accéder au dossier.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * MINI-JEU CONNEXIONS — Cas "Plateforme Scolaire"
 * Relie chaque rune à sa jumelle de la même couleur, sans
 * croiser tes propres tracés. Décor : temple égyptien.
 * ============================================================ */

type WirePoint = { id: string; color: string; label: string; x: number; y: number };

const WIRE_POINTS: WirePoint[] = [
  { id: "a1", color: "#ff6b6b", label: "Cours", x: 12, y: 22 },
  { id: "a2", color: "#ff6b6b", label: "Cours", x: 86, y: 30 },
  { id: "b1", color: "#ffd93d", label: "Agenda", x: 18, y: 78 },
  { id: "b2", color: "#ffd93d", label: "Agenda", x: 82, y: 72 },
  { id: "c1", color: "#6bcfff", label: "Chat", x: 50, y: 14 },
  { id: "c2", color: "#6bcfff", label: "Chat", x: 52, y: 86 },
  { id: "d1", color: "#a78bfa", label: "Quiz", x: 30, y: 50 },
  { id: "d2", color: "#a78bfa", label: "Quiz", x: 72, y: 52 },
];

function WireGame({ accent, onSolved }: { accent: string; onSolved: () => void }) {
  const [connections, setConnections] = useState<Array<{ from: string; to: string; color: string }>>([]);
  const [pending, setPending] = useState<WirePoint | null>(null);
  const allColors = useMemo(() => Array.from(new Set(WIRE_POINTS.map((p) => p.color))), []);
  const won = useMemo(
    () => allColors.every((c) => connections.some((cn) => cn.color === c)),
    [connections, allColors],
  );

  useEffect(() => {
    if (won) {
      const t = setTimeout(onSolved, 900);
      return () => clearTimeout(t);
    }
  }, [won, onSolved]);

  const isUsed = (id: string) =>
    connections.some((c) => c.from === id || c.to === id);

  const onPointClick = (p: WirePoint) => {
    if (won) return;
    if (isUsed(p.id)) {
      // Annule la connexion liée à ce point
      setConnections((cs) => cs.filter((c) => c.from !== p.id && c.to !== p.id));
      setPending(null);
      return;
    }
    if (!pending) {
      setPending(p);
      return;
    }
    if (pending.id === p.id) {
      setPending(null);
      return;
    }
    if (pending.color !== p.color) {
      // mauvaise paire — feedback rapide
      setPending(null);
      return;
    }
    setConnections((cs) => [
      ...cs.filter((c) => c.color !== p.color),
      { from: pending.id, to: p.id, color: p.color },
    ]);
    setPending(null);
  };

  return (
    <div>
      <div
        className="relative w-full aspect-[16/10] overflow-hidden rounded-sm select-none"
        style={{
          backgroundImage: `url(${sceneTemple})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow:
            "inset 0 0 120px rgba(20,8,2,0.55), 0 0 0 3px oklch(0.55 0.14 70 / 0.7), 0 14px 50px rgba(0,0,0,0.7)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* HUD */}
        <div
          className="absolute top-2 left-2 z-20 font-stamp text-[10px] tracking-[0.25em] text-white px-2.5 py-1 rounded-sm"
          style={{
            background: "rgba(0,0,0,0.65)",
            border: `1px solid ${accent}`,
            boxShadow: `0 0 8px ${accent.replace(")", " / 0.5)")}`,
          }}
        >
          RUNES · {connections.length}/{allColors.length}
        </div>
        <div className="absolute top-2 right-2 z-20 font-stamp text-[10px] tracking-[0.25em] text-white/90 bg-black/65 border border-white/20 px-2.5 py-1 rounded-sm">
          RELIE LES PAIRES
        </div>

        {/* Tracés lumineux */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <defs>
            {connections.map((c) => (
              <filter key={`f-${c.color}`} id={`glow-${c.color.replace("#", "")}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>
          {connections.map((c, i) => {
            const a = WIRE_POINTS.find((p) => p.id === c.from)!;
            const b = WIRE_POINTS.find((p) => p.id === c.to)!;
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 - 8;
            return (
              <path
                key={i}
                d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                stroke={c.color}
                strokeWidth={1.1}
                fill="none"
                strokeLinecap="round"
                filter={`url(#glow-${c.color.replace("#", "")})`}
                opacity={0.95}
              />
            );
          })}
        </svg>

        {/* Points cliquables */}
        {WIRE_POINTS.map((p) => {
          const used = isUsed(p.id);
          const isPending = pending?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onPointClick(p)}
              className="absolute z-20 flex items-center justify-center rounded-full transition-transform active:scale-90"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: 44,
                height: 44,
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle at 30% 30%, ${p.color}, ${p.color}cc 60%, ${p.color}55 100%)`,
                border: `2px solid ${isPending ? "#fff" : "rgba(255,255,255,0.5)"}`,
                boxShadow: `0 0 ${used ? 24 : isPending ? 28 : 12}px ${p.color}, inset 0 0 6px rgba(0,0,0,0.4)`,
              }}
              aria-label={`${p.label} ${p.color}`}
            >
              <span className="font-stamp text-[8px] tracking-[0.2em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {p.label}
              </span>
            </button>
          );
        })}

        {won && (
          <div
            className="absolute inset-0 pointer-events-none animate-fade-in z-30"
            style={{
              background: `radial-gradient(circle at center, ${accent.replace(")", " / 0.5)")} 0%, transparent 65%)`,
            }}
          />
        )}
      </div>

      {/* CONSIGNE */}
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
            <img src={avatar} alt="Elena" className="w-full h-full object-cover" style={{ objectPosition: "center 22%", filter: "sepia(0.25) contrast(1.05)" }} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-stamp text-[10px] md:text-xs tracking-[0.3em] mb-1.5" style={{ color: "oklch(0.35 0.10 30)" }}>
            ELENA · EXPLORATRICE
          </div>
          <p className="font-serif-display leading-snug text-[13px] md:text-[16px]" style={{ color: "oklch(0.22 0.04 30)" }}>
            Dans le temple oublié, chaque rune cherche sa jumelle. Relie les{" "}
            <span className="font-bold" style={{ color: "oklch(0.42 0.16 25)" }}>
              paires de couleur
            </span>{" "}
            pour réveiller les piliers et déverrouiller le dossier.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * MINI-JEU MEMORY — Cas "Mirakl"
 * Retourne les paires de talents pour reconstituer la shortlist.
 * Décor : balcon parisien au coucher du soleil.
 * ============================================================ */

const MEMORY_CARDS: Array<{ id: string; img: string; name: string }> = [
  { id: "eiffel", img: paris1, name: "Tour Eiffel" },
  { id: "montparnasse", img: paris2, name: "Montparnasse" },
  { id: "invalides", img: paris3, name: "Invalides" },
  { id: "notredame", img: paris4, name: "Notre-Dame" },
  { id: "sacrecoeur", img: paris5, name: "Sacré-Cœur" },
  { id: "arc", img: paris6, name: "Arc de Triomphe" },
  { id: "louvre", img: paris7, name: "Louvre" },
  { id: "opera", img: paris8, name: "Opéra Garnier" },
];

function shuffleDeck(seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const base = [...MEMORY_CARDS, ...MEMORY_CARDS];
  const deck = base.map((c, i) => ({ uid: i, ...c }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function MemoryGame({ accent, onSolved }: { accent: string; onSolved: () => void }) {
  const [seed] = useState(() => Math.floor(Math.random() * 100000) + 1);
  const deck = useMemo(() => shuffleDeck(seed), [seed]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const lock = useRef(false);

  const allMatched = matched.size === deck.length;

  useEffect(() => {
    if (allMatched) {
      const t = setTimeout(onSolved, 900);
      return () => clearTimeout(t);
    }
  }, [allMatched, onSolved]);

  const handleFlip = (idx: number) => {
    if (lock.current) return;
    if (matched.has(idx) || flipped.includes(idx)) return;
    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (deck[a].id === deck[b].id) {
        setTimeout(() => {
          setMatched((prev) => new Set(prev).add(a).add(b));
          setFlipped([]);
        }, 420);
      } else {
        lock.current = true;
        setTimeout(() => {
          setFlipped([]);
          lock.current = false;
        }, 820);
      }
    }
  };

  return (
    <div>
      <div
        className="relative w-full aspect-[16/9] overflow-hidden rounded-sm select-none"
        style={{
          backgroundImage: `url(${sceneBalcony})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow:
            "inset 0 0 120px rgba(20,8,2,0.55), 0 0 0 3px oklch(0.55 0.14 70 / 0.6), 0 14px 50px rgba(0,0,0,0.7)",
        }}
      >
        {/* Voile sombre pour lisibilité */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* HUD */}
        <div
          className="absolute top-2 left-2 font-stamp text-[10px] tracking-[0.25em] text-white px-2.5 py-1 rounded-sm pointer-events-none"
          style={{
            background: "rgba(0,0,0,0.65)",
            border: `1px solid ${accent}`,
            boxShadow: `0 0 8px ${accent.replace(")", " / 0.5)")}`,
          }}
        >
          COUPS · {moves}
        </div>
        <div className="absolute top-2 right-2 font-stamp text-[10px] tracking-[0.25em] text-white/90 bg-black/65 border border-white/20 px-2.5 py-1 rounded-sm pointer-events-none">
          PAIRES · {matched.size / 2}/{MEMORY_CARDS.length}
        </div>

        {/* Grille de cartes */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
          <div
            className="grid grid-cols-4 gap-2 md:gap-3 h-full"
            style={{ aspectRatio: "4 / 4", maxHeight: "100%" }}
          >
            {deck.map((card, idx) => {
              const isFlipped = flipped.includes(idx) || matched.has(idx);
              const isMatched = matched.has(idx);
              return (
                <button
                  key={card.uid}
                  onClick={() => handleFlip(idx)}
                  className="relative"
                  style={{ perspective: "800px" }}
                  aria-label={isFlipped ? card.name : "Carte face cachée"}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-500"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Dos de carte */}
                    <div
                      className="absolute inset-0 rounded-md border overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        borderColor: accent,
                        boxShadow: `0 4px 12px rgba(0,0,0,0.55), inset 0 0 12px rgba(0,0,0,0.5), 0 0 6px ${accent.replace(")", " / 0.4)")}`,
                      }}
                    >
                      <img
                        src={cardBack}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ boxShadow: "inset 0 0 14px rgba(0,0,0,0.55)" }}
                      />
                    </div>
                    {/* Face de carte */}
                    <div
                      className="absolute inset-0 rounded-md border-2 overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        borderColor: isMatched ? accent : "oklch(0.45 0.08 50)",
                        boxShadow: isMatched
                          ? `0 0 18px ${accent}, 0 4px 10px rgba(0,0,0,0.5)`
                          : "0 4px 10px rgba(0,0,0,0.5), inset 0 0 8px rgba(0,0,0,0.15)",
                      }}
                    >
                      <img
                        src={card.img}
                        alt={card.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                          filter: isMatched ? "saturate(1.15)" : "saturate(1)",
                        }}
                      />
                      {/* Voile inférieur + nom */}
                      <div
                        className="absolute inset-x-0 bottom-0 px-1 py-0.5 font-stamp text-[7px] md:text-[9px] tracking-[0.18em] text-white text-center"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 100%)",
                        }}
                      >
                        {card.name}
                      </div>
                      {isMatched && (
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            boxShadow: `inset 0 0 16px ${accent}`,
                            background: `linear-gradient(135deg, ${accent.replace(")", " / 0.15)")} 0%, transparent 60%)`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Halo de victoire */}
        {allMatched && (
          <div
            className="absolute inset-0 pointer-events-none animate-fade-in"
            style={{
              background: `radial-gradient(circle at center, ${accent.replace(")", " / 0.45)")} 0%, transparent 60%)`,
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
            ELENA · SOURCING IA
          </div>
          <p className="font-serif-display leading-snug text-[13px] md:text-[16px]" style={{ color: "oklch(0.22 0.04 30)" }}>
            Sur le balcon parisien, reconstitue les{" "}
            <span className="font-bold" style={{ color: "oklch(0.42 0.16 25)" }}>
              paires de monuments emblématiques
            </span>
            . Observation et mémoire seront tes meilleurs alliés.
          </p>
        </div>
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

        {/* Silhouette de mouette discrète mais visible — overlay SVG par dessus le tableau */}
        {!found && (
          <svg
            className="absolute pointer-events-none"
            viewBox="0 0 100 60"
            style={{
              left: `${TARGET.x}%`,
              top: `${TARGET.y}%`,
              width: "2.4%",
              transform: "translate(-50%, -50%)",
              opacity: 0.55,
              filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.45))",
            }}
          >
            <path
              d="M5 38 Q22 8 50 30 Q78 8 95 38"
              fill="none"
              stroke="#f6efe2"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* Halo d'indice */}
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

// Dimensions du labyrinthe (toujours impaires pour l'algo DFS).
const MAZE_COLS = 21;
const MAZE_ROWS = 11;

// Génération d'un labyrinthe parfait via DFS récursif (avec seed pour stabilité).
function generateMaze(cols: number, rows: number, seed = 1): string[][] {
  // PRNG simple seedé
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const g: string[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => "#")
  );
  const stack: Array<[number, number]> = [[1, 1]];
  g[1][1] = ".";
  while (stack.length) {
    const [cx, cy] = stack[stack.length - 1];
    const dirs: Array<[number, number]> = (
      [
        [0, -2],
        [0, 2],
        [-2, 0],
        [2, 0],
      ] as Array<[number, number]>
    ).sort(() => rand() - 0.5);
    let carved = false;
    for (const [dx, dy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx > 0 && ny > 0 && nx < cols - 1 && ny < rows - 1 && g[ny][nx] === "#") {
        g[cy + dy / 2][cx + dx / 2] = ".";
        g[ny][nx] = ".";
        stack.push([nx, ny]);
        carved = true;
        break;
      }
    }
    if (!carved) stack.pop();
  }
  g[1][1] = "S";
  g[rows - 2][cols - 2] = "E";
  return g;
}

function MazeGame({ accent, onSolved }: { accent: string; onSolved: () => void }) {
  const maze = useMemo(() => generateMaze(MAZE_COLS, MAZE_ROWS, 42), []);
  const COLS = MAZE_COLS;
  const ROWS = MAZE_ROWS;
  const start = { c: 1, r: 1 };
  const exit = { c: COLS - 2, r: ROWS - 2 };
  const [pos, setPos] = useState(start);
  const [steps, setSteps] = useState(0);
  const [won, setWon] = useState(false);
  const [trail, setTrail] = useState<Array<{ c: number; r: number }>>([start]);
  const wonRef = useRef(false);

  const move = useCallback(
    (dc: number, dr: number) => {
      if (wonRef.current) return;
      setPos((p) => {
        const nc = p.c + dc;
        const nr = p.r + dr;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return p;
        const ch = maze[nr][nc];
        if (ch === "#") return p;
        setSteps((s) => s + 1);
        setTrail((t) => (t.some((x) => x.c === nc && x.r === nr) ? t : [...t, { c: nc, r: nr }]));
        if (ch === "E") {
          wonRef.current = true;
          setWon(true);
          setTimeout(onSolved, 900);
        }
        return { c: nc, r: nr };
      });
    },
    [maze, onSolved, COLS, ROWS],
  );

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
        className="relative w-full aspect-[21/11] overflow-hidden rounded-sm select-none"
        style={{
          backgroundImage: `url(${mazeFloor})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow:
            "inset 0 0 140px rgba(20,8,2,0.85), 0 0 0 3px oklch(0.55 0.14 70 / 0.7), 0 14px 50px rgba(0,0,0,0.7)",
        }}
      >
        {/* Voile sombre par-dessus le sol pour le contraste */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Murs en pierre — tuiles image */}
        <div className="absolute inset-0">
          {maze.map((row, r) =>
            row.map((ch, c) => {
              if (ch !== "#") return null;
              return (
                <div
                  key={`w-${r}-${c}`}
                  className="absolute"
                  style={{
                    left: `${c * cellW}%`,
                    top: `${r * cellH}%`,
                    width: `${cellW}%`,
                    height: `${cellH}%`,
                    backgroundImage: `url(${mazeWall})`,
                    backgroundSize: "300% 300%",
                    backgroundPosition: `${((c * 37) % 100)}% ${((r * 53) % 100)}%`,
                    boxShadow:
                      "inset 0 0 0 1px rgba(60,30,5,0.6), inset 0 -3px 6px rgba(0,0,0,0.45), inset 0 2px 3px rgba(255,210,140,0.25), 0 2px 4px rgba(0,0,0,0.55)",
                    borderRadius: 3,
                  }}
                />
              );
            }),
          )}
        </div>

        {/* Couche SVG : traînée, halos, hiéroglyphes au sol */}
        <svg
          viewBox={`0 0 ${COLS} ${ROWS}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <radialGradient id="trailGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Traînée de pas */}
          {trail.map((t, i) => (
            <circle
              key={`tr-${i}`}
              cx={t.c + 0.5}
              cy={t.r + 0.5}
              r={0.42}
              fill="url(#trailGlow)"
              opacity={0.6}
            />
          ))}

          {/* Halo arrivée */}
          <circle cx={exit.c + 0.5} cy={exit.r + 0.5} r={0.7} fill={accent} opacity={0.3}>
            <animate attributeName="r" values="0.5;0.9;0.5" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.6s" repeatCount="indefinite" />
          </circle>

          {/* Étoile de départ */}
          <circle
            cx={start.c + 0.5}
            cy={start.r + 0.5}
            r={0.35}
            fill="none"
            stroke={accent}
            strokeWidth={0.05}
            strokeDasharray="0.15 0.1"
            opacity={0.6}
          />

          {/* Vignette */}
          <radialGradient id="vign" cx="50%" cy="50%" r="65%">
            <stop offset="55%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.75)" />
          </radialGradient>
          <rect x={0} y={0} width={COLS} height={ROWS} fill="url(#vign)" pointerEvents="none" />
        </svg>

        {/* Torches aux coins */}
        {[
          { l: 1, t: 1 },
          { l: 97, t: 1 },
          { l: 1, t: 97 },
          { l: 97, t: 97 },
        ].map((p, i) => (
          <div
            key={`torch-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${p.l}%`,
              top: `${p.t}%`,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
              filter: "blur(2px)",
              animation: `pulse ${1.4 + i * 0.2}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Groupe d'amis à la sortie */}
        <div
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            left: `${(exit.c - 2.2) * cellW}%`,
            top: `${(exit.r - 2.4) * cellH}%`,
            width: `${cellW * 5}%`,
            height: `${cellH * 4.5}%`,
            filter: `drop-shadow(0 0 14px ${accent}) drop-shadow(0 4px 8px rgba(0,0,0,0.7))`,
          }}
        >
          <img
            src={friendsImg}
            alt="Les amies d'Elena"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bannière FINISH au-dessus de la sortie */}
        <div
          className="absolute font-stamp text-[8px] md:text-[10px] tracking-[0.3em] px-2 py-0.5 border pointer-events-none"
          style={{
            left: `${(exit.c - 1.5) * cellW}%`,
            top: `${(exit.r - 1.2) * cellH}%`,
            color: "oklch(0.15 0.02 30)",
            background: accent,
            borderColor: "oklch(0.25 0.05 30)",
            transform: "rotate(-3deg)",
            boxShadow: `0 0 12px ${accent}`,
          }}
        >
          ARRIVÉE
        </div>

        {/* Aura lumineuse autour d'Elena */}
        <div
          className="absolute pointer-events-none transition-all duration-150 ease-out"
          style={{
            left: `${pos.c * cellW + cellW / 2}%`,
            top: `${pos.r * cellH + cellH / 2}%`,
            width: 180,
            height: 180,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${accent.replace(")", " / 0.35)")} 0%, transparent 60%)`,
            filter: "blur(8px)",
          }}
        />

        {/* Elena (joueur) */}
        <div
          className="absolute rounded-full overflow-hidden border-2 transition-all duration-150 ease-out"
          style={{
            left: `${pos.c * cellW + cellW * 0.08}%`,
            top: `${pos.r * cellH + cellH * 0.05}%`,
            width: `${cellW * 0.84}%`,
            height: `${cellH * 0.9}%`,
            borderColor: accent,
            boxShadow: `0 0 18px ${accent}, 0 2px 8px rgba(0,0,0,0.6)`,
            background: "oklch(0.1 0.02 30)",
          }}
        >
          <img
            src={avatar}
            alt="Elena"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 22%" }}
          />
        </div>

        {/* HUD */}
        <div
          className="absolute top-2 left-2 font-stamp text-[10px] tracking-[0.25em] text-white px-2.5 py-1 rounded-sm pointer-events-none"
          style={{ background: "rgba(0,0,0,0.65)", border: `1px solid ${accent}`, boxShadow: `0 0 8px ${accent.replace(")", " / 0.5)")}` }}
        >
          PAS · {steps}
        </div>
        <div className="absolute top-2 right-2 font-stamp text-[10px] tracking-[0.25em] text-white/90 bg-black/65 border border-white/20 px-2.5 py-1 rounded-sm pointer-events-none">
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

        {/* Halo + confettis de victoire */}
        {won && (
          <>
            <div
              className="absolute inset-0 pointer-events-none animate-fade-in"
              style={{
                background: `radial-gradient(circle at ${exit.c * cellW + cellW / 2}% ${exit.r * cellH + cellH / 2}%, ${accent.replace(")", " / 0.55)")} 0%, transparent 50%)`,
              }}
            />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute text-base"
                  style={{
                    left: `${(exit.c / COLS) * 100 + (Math.random() * 30 - 15)}%`,
                    top: `${(exit.r / ROWS) * 100 - 5}%`,
                    color: ["#ff6b6b", "#ffd93d", "#6bcfff", accent][i % 4],
                    animation: `fall ${1 + Math.random()}s ease-in ${Math.random() * 0.4}s forwards`,
                  }}
                >
                  ●
                </span>
              ))}
            </div>
            <style>{`@keyframes fall { to { transform: translateY(220px) rotate(360deg); opacity: 0; } }`}</style>
          </>
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

