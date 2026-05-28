import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  caseId: string;
  caseTitle: string;
  onSolved: () => void;
  onClose: () => void;
};

type GameKey =
  | "threads" | "lock" | "shred" | "hidden" | "biometric"
  | "stamp" | "maze" | "polygraph" | "code";

const GAMES: { key: GameKey; label: string; success: string }[] = [
  { key: "threads", label: "Tableau d'enquête", success: "Connexions établies — dossier déverrouillé." },
  { key: "lock", label: "Cadenas classifié", success: "Code aligné — dossier déverrouillé." },
  { key: "shred", label: "Document à reconstituer", success: "Document reconstitué — dossier ouvert." },
  { key: "hidden", label: "Cherchez les indices", success: "Indices trouvés — dossier autorisé." },
  { key: "biometric", label: "Déverrouillage biométrique", success: "Empreinte validée — accès autorisé." },
  { key: "stamp", label: "Validation des tampons", success: "Tampon officiel apposé — dossier ouvert." },
  { key: "maze", label: "Labyrinthe d'archives", success: "Sortie atteinte — dossier ouvert." },
  { key: "polygraph", label: "Polygraphe", success: "Signal vert — accès accordé." },
  { key: "code", label: "Code à 4 chiffres", success: "Combinaison cassée — dossier ouvert." },
];

export function CaseInvestigation({ caseTitle, onSolved, onClose }: Props) {
  const [solved, setSolved] = useState(false);
  const game = useMemo(() => GAMES[Math.floor(Math.random() * GAMES.length)], []);

  useEffect(() => {
    if (!solved) return;
    const t = setTimeout(() => onSolved(), 900);
    return () => clearTimeout(t);
  }, [solved, onSolved]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full paper-bg paper-shadow p-8 md:p-10 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-paper-foreground/10 hover:bg-evidence hover:text-evidence-foreground text-paper-foreground text-lg transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="font-stamp text-[10px] tracking-[0.3em] text-evidence mb-2">
          ACCÈS CLASSIFIÉ · {game.label.toUpperCase()}
        </div>
        <h3 className="font-serif-display text-2xl md:text-3xl text-paper-foreground leading-tight mb-6">
          {caseTitle}
        </h3>

        <div className="relative min-h-[260px]">
          {!solved && (
            <GameRouter game={game.key} onSolved={() => setSolved(true)} />
          )}

          {solved && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="stamp text-base md:text-lg px-6 py-3 rotate-[-4deg] mb-4">
                ✓ DOSSIER OUVERT
              </div>
              <p className="font-serif-display italic text-paper-foreground/80">
                {game.success}
              </p>
            </div>
          )}
        </div>

        {!solved && (
          <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-dashed border-paper-foreground/25">
            <span className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/50">
              3–10s · épreuve d'accès
            </span>
            <button
              onClick={onSolved}
              className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/60 hover:text-evidence underline-offset-4 hover:underline transition-colors"
            >
              Passer l'enquête →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function GameRouter({ game, onSolved }: { game: GameKey; onSolved: () => void }) {
  switch (game) {
    case "threads": return <ThreadsGame onSolved={onSolved} />;
    case "lock": return <LockGame onSolved={onSolved} />;
    case "shred": return <ShredGame onSolved={onSolved} />;
    case "hidden": return <HiddenGame onSolved={onSolved} />;
    case "biometric": return <BiometricGame onSolved={onSolved} />;
    case "stamp": return <StampGame onSolved={onSolved} />;
    case "maze": return <MazeGame onSolved={onSolved} />;
    case "polygraph": return <PolygraphGame onSolved={onSolved} />;
    case "code": return <CodeGame onSolved={onSolved} />;
  }
}

/* ---------- helpers ---------- */

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/60 mb-4">
      {children}
    </p>
  );
}

/* ---------- 1. Tableau d'enquête — fils rouges ---------- */

function ThreadsGame({ onSolved }: { onSolved: () => void }) {
  const nodes = useMemo(() => {
    const groups = [1, 1, 2, 2];
    const shuffled = [...groups].sort(() => Math.random() - 0.5);
    const pos = [
      { x: 15, y: 22 }, { x: 85, y: 20 },
      { x: 18, y: 78 }, { x: 82, y: 80 },
    ];
    return shuffled.map((g, i) => ({ id: String(i), group: g, ...pos[i] }));
  }, []);
  const [picked, setPicked] = useState<string | null>(null);
  const [links, setLinks] = useState<Array<[string, string]>>([]);
  const [error, setError] = useState(false);

  const pick = (id: string) => {
    const alreadyLinked = links.some(([a, b]) => a === id || b === id);
    if (alreadyLinked) return;
    if (picked === null) { setPicked(id); return; }
    if (picked === id) { setPicked(null); return; }
    const a = nodes.find((f) => f.id === picked)!;
    const b = nodes.find((f) => f.id === id)!;
    if (a.group === b.group) {
      setLinks((l) => [...l, [picked, id]]);
      setPicked(null);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setPicked(null);
    }
  };

  useEffect(() => {
    if (links.length >= 2) {
      const t = setTimeout(onSolved, 400);
      return () => clearTimeout(t);
    }
  }, [links, onSolved]);

  const at = (id: string) => nodes.find((f) => f.id === id)!;

  return (
    <div>
      <Hint>Reliez les suspects associés — un fil rouge pour chaque paire.</Hint>
      <div className={`relative w-full h-[240px] bg-paper-foreground/5 border border-paper-foreground/15 ${error ? "animate-pulse" : ""}`}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {links.map(([a, b], i) => {
            const A = at(a); const B = at(b);
            return (
              <line key={i} x1={`${A.x}%`} y1={`${A.y}%`} x2={`${B.x}%`} y2={`${B.y}%`}
                stroke="oklch(0.62 0.22 18)" strokeWidth={2}
                style={{ filter: "drop-shadow(0 0 4px oklch(0.62 0.22 18 / 0.6))" }} />
            );
          })}
        </svg>
        {nodes.map((f) => {
          const active = picked === f.id;
          const linked = links.some(([a, b]) => a === f.id || b === f.id);
          const symbol = ["☉", "✦", "✚", "✷"][Number(f.id)];
          return (
            <button key={f.id} onClick={() => pick(f.id)}
              style={{ left: `${f.x}%`, top: `${f.y}%`, transform: "translate(-50%, -50%)" }}
              className={`absolute w-16 h-20 border-2 flex items-center justify-center text-2xl transition-all paper-shadow
                ${linked ? "bg-evidence text-evidence-foreground border-evidence" : active ? "bg-paper-foreground text-paper border-paper-foreground scale-110" : "bg-paper text-paper-foreground border-paper-foreground/40 hover:border-evidence"}`}
            >
              {symbol}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 2. Cadenas classifié — aligner 3 symboles ---------- */

function LockGame({ onSolved }: { onSolved: () => void }) {
  const SYMBOLS = ["☉", "✦", "✚", "✷", "❖", "✱"];
  const target = useMemo(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], []);
  const [reels, setReels] = useState<string[]>(() =>
    Array.from({ length: 3 }, () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]),
  );

  const cycle = (i: number) => {
    setReels((r) => {
      const next = [...r];
      const idx = SYMBOLS.indexOf(next[i]);
      next[i] = SYMBOLS[(idx + 1) % SYMBOLS.length];
      return next;
    });
  };

  useEffect(() => {
    if (reels.every((s) => s === target)) {
      const t = setTimeout(onSolved, 500);
      return () => clearTimeout(t);
    }
  }, [reels, target, onSolved]);

  return (
    <div>
      <Hint>Alignez les 3 rouleaux sur le symbole cible : <span className="text-evidence text-base">{target}</span></Hint>
      <div className="flex items-center justify-center gap-4 my-6">
        {reels.map((s, i) => (
          <button
            key={i}
            onClick={() => cycle(i)}
            className={`w-20 h-24 flex items-center justify-center text-4xl border-2 paper-shadow transition-all
              ${s === target ? "bg-evidence/15 border-evidence text-evidence" : "bg-paper border-paper-foreground/40 text-paper-foreground hover:border-evidence"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="text-center font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/50">
        Cliquez chaque rouleau pour le faire défiler
      </p>
    </div>
  );
}

/* ---------- 3. Document déchiré ---------- */

function ShredGame({ onSolved }: { onSolved: () => void }) {
  const [order, setOrder] = useState(() => shuffle([0, 1, 2, 3]));
  const [selected, setSelected] = useState<number | null>(null);

  const swap = (i: number) => {
    if (selected === null) { setSelected(i); return; }
    if (selected === i) { setSelected(null); return; }
    setOrder((o) => {
      const next = [...o];
      [next[selected], next[i]] = [next[i], next[selected]];
      return next;
    });
    setSelected(null);
  };

  useEffect(() => {
    if (order.every((v, i) => v === i)) {
      const t = setTimeout(onSolved, 400);
      return () => clearTimeout(t);
    }
  }, [order, onSolved]);

  const STRIPES = [
    "▬▬▬▬▬▬▬▬▬▬▬  CONFIDENTIEL  ▬▬▬",
    "Sujet : Dossier classifié n°427-B",
    "Statut : Accès restreint — niveau 3",
    "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",
  ];

  return (
    <div>
      <Hint>Reconstituez le document — cliquez deux bandes pour les échanger.</Hint>
      <div className="space-y-1.5">
        {order.map((idx, i) => {
          const isRight = idx === i;
          const active = selected === i;
          return (
            <button
              key={i}
              onClick={() => swap(i)}
              style={{ transform: `translateX(${(i % 2 === 0 ? -2 : 2)}px)` }}
              className={`block w-full text-left px-4 py-3 font-stamp text-[11px] tracking-[0.15em] paper-shadow transition-all border-l-4
                ${isRight ? "bg-evidence/10 border-evidence text-paper-foreground" : active ? "bg-paper-foreground text-paper border-paper-foreground" : "bg-paper text-paper-foreground/80 border-paper-foreground/20 hover:border-evidence/60"}`}
            >
              {STRIPES[idx]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 4. Cherchez les indices — loupe sur scène ---------- */

function HiddenGame({ onSolved }: { onSolved: () => void }) {
  // Scène : icônes dispersées comme décor. 3 cibles à trouver parmi les décors.
  const POOL = ["🔑", "📎", "✉️", "🕯", "📷", "🎩", "📞", "🔍", "🗝", "🎲", "📰", "🧷", "🖋", "💼", "📌"];
  const TARGETS_POOL = ["🔫", "💊", "💎", "🗡", "🩸"];
  const { decor, targets } = useMemo(() => {
    const targets = shuffle(TARGETS_POOL).slice(0, 3);
    const decorCount = 22;
    const decor: { icon: string; x: number; y: number; r: number }[] = [];
    for (let i = 0; i < decorCount; i++) {
      decor.push({
        icon: POOL[Math.floor(Math.random() * POOL.length)],
        x: 6 + Math.random() * 88,
        y: 8 + Math.random() * 84,
        r: (Math.random() - 0.5) * 30,
      });
    }
    // Place les 3 cibles à des positions distinctes
    const placed = targets.map((icon) => ({
      icon,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 70,
      r: (Math.random() - 0.5) * 24,
    }));
    return { decor, targets: placed };
  }, []);

  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [found, setFound] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const clickTarget = (icon: string) => {
    if (found.includes(icon)) return;
    const next = [...found, icon];
    setFound(next);
    if (next.length === targets.length) setTimeout(onSolved, 500);
  };

  return (
    <div>
      <Hint>Trouvez les 3 indices cachés dans la scène — déplacez la loupe.</Hint>
      <div className="mb-2 flex items-center justify-center gap-3">
        {targets.map((t) => {
          const got = found.includes(t.icon);
          return (
            <div
              key={t.icon}
              className={`w-10 h-10 flex items-center justify-center text-xl border-2 transition-all
                ${got ? "border-evidence bg-evidence/15" : "border-paper-foreground/30 bg-paper-foreground/5 text-paper-foreground/40 grayscale"}`}
              title={got ? "trouvé" : "à trouver"}
            >
              {got ? t.icon : "?"}
            </div>
          );
        })}
      </div>
      <div
        ref={ref}
        onMouseMove={onMove}
        className="relative h-[240px] bg-[oklch(0.92_0.04_80)] border border-paper-foreground/15 cursor-none overflow-hidden select-none"
      >
        {/* décor */}
        {decor.map((d, i) => (
          <span
            key={i}
            className="absolute text-xl opacity-60 pointer-events-none"
            style={{ left: `${d.x}%`, top: `${d.y}%`, transform: `translate(-50%,-50%) rotate(${d.r}deg)` }}
          >
            {d.icon}
          </span>
        ))}
        {/* cibles */}
        {targets.map((t) => {
          const got = found.includes(t.icon);
          return (
            <button
              key={t.icon}
              onClick={() => clickTarget(t.icon)}
              className={`absolute text-xl transition-all ${got ? "scale-150 text-evidence" : "opacity-90 hover:scale-110"}`}
              style={{ left: `${t.x}%`, top: `${t.y}%`, transform: `translate(-50%,-50%) rotate(${t.r}deg)` }}
            >
              {t.icon}
            </button>
          );
        })}
        {/* loupe */}
        <div
          className="pointer-events-none absolute w-28 h-28 rounded-full border-[3px] border-paper-foreground/80 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${pos.x}%`, top: `${pos.y}%`,
            boxShadow: "0 0 0 9999px rgba(20,15,10,0.55), inset 0 0 14px rgba(0,0,0,0.35)",
          }}
        />
      </div>
      <p className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/50 mt-2 text-center">
        {found.length}/{targets.length} indices
      </p>
    </div>
  );
}

/* ---------- 5. Biométrique ---------- */

function BiometricGame({ onSolved }: { onSolved: () => void }) {
  const [progress, setProgress] = useState(0);
  const holding = useRef(false);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      setProgress((p) => {
        const next = holding.current ? Math.min(100, p + 2.2) : Math.max(0, p - 1.2);
        if (next >= 100) { setTimeout(onSolved, 300); return 100; }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onSolved]);

  const start = () => { holding.current = true; };
  const stop = () => { holding.current = false; };

  return (
    <div>
      <Hint>Maintenez votre empreinte sur le lecteur jusqu'à validation.</Hint>
      <div className="flex flex-col items-center my-4">
        <button
          onMouseDown={start} onMouseUp={stop} onMouseLeave={stop}
          onTouchStart={start} onTouchEnd={stop}
          className="relative w-32 h-40 rounded-2xl border-2 border-paper-foreground/40 bg-paper-foreground/5 flex items-center justify-center select-none overflow-hidden"
        >
          <svg viewBox="0 0 64 80" className="w-20 h-24" style={{ color: `oklch(${0.4 + progress * 0.003} 0.22 18)` }}>
            <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M32 6c-14 0-24 12-24 26v18" />
              <path d="M32 14c-10 0-18 8-18 20v14" />
              <path d="M32 22c-6 0-12 6-12 14v18" />
              <path d="M32 30c-4 0-8 4-8 10v18" />
              <path d="M32 38c-2 0-4 2-4 6v18" />
              <path d="M40 12c8 4 12 14 12 22v22" />
              <path d="M44 28c4 4 4 12 4 20v14" />
            </g>
          </svg>
          <div
            className="absolute left-0 right-0 bottom-0 bg-evidence/25 pointer-events-none transition-[height] duration-100"
            style={{ height: `${progress}%` }}
          />
        </button>
        <div className="mt-4 w-48 h-1 bg-paper-foreground/15 rounded-full overflow-hidden">
          <div className="h-full bg-evidence" style={{ width: `${progress}%` }} />
        </div>
        <p className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/60 mt-2">
          {progress < 100 ? "MAINTENEZ" : "VALIDÉ"}
        </p>
      </div>
    </div>
  );
}

/* ---------- 6. Tampon confidentiel ---------- */

function StampGame({ onSolved }: { onSolved: () => void }) {
  const stamps = useMemo(() => {
    const all = ["REFUSÉ", "EN ATTENTE", "AUTORISÉ", "CLASSIFIÉ", "ARCHIVÉ"];
    return shuffle(all).slice(0, 4);
  }, []);
  const [wrong, setWrong] = useState<string | null>(null);
  const [stamped, setStamped] = useState<string | null>(null);

  const pick = (s: string) => {
    if (s === "AUTORISÉ") {
      setStamped(s);
      setTimeout(onSolved, 600);
    } else {
      setWrong(s);
      setTimeout(() => setWrong(null), 400);
    }
  };

  return (
    <div>
      <Hint>Apposez le tampon « AUTORISÉ » sur le dossier.</Hint>
      <div className="grid grid-cols-2 gap-3 my-4">
        {stamps.map((s, i) => {
          const isWrong = wrong === s;
          const isOk = stamped === s;
          return (
            <button
              key={s}
              onClick={() => pick(s)}
              disabled={!!stamped}
              style={{ transform: `rotate(${((i % 2) - 0.5) * 3}deg)` }}
              className={`py-6 border-4 font-stamp text-lg tracking-[0.25em] transition-all
                ${isOk ? "border-evidence text-evidence bg-evidence/10 scale-110" :
                  isWrong ? "border-destructive text-destructive bg-destructive/10 animate-pulse" :
                  "border-paper-foreground/60 text-paper-foreground/80 hover:border-evidence hover:text-evidence hover:-translate-y-0.5"}`}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 7. Labyrinthe d'archives — tracer le chemin ---------- */

function MazeGame({ onSolved }: { onSolved: () => void }) {
  // Labyrinthe 7x7 avec murs entre cellules. b/r/d/l = murs.
  // Chemin garanti via la diagonale en escalier.
  const W = 7, H = 7;
  type Cell = { r: boolean; d: boolean }; // mur droite / bas
  const maze = useMemo<Cell[][]>(() => {
    const g: Cell[][] = Array.from({ length: H }, () =>
      Array.from({ length: W }, () => ({ r: true, d: true })),
    );
    // chemin solution : escalier (0,0) → (6,6)
    let x = 0, y = 0;
    const path: Array<[number, number]> = [[0, 0]];
    while (x < W - 1 || y < H - 1) {
      const goRight =
        y === H - 1 ? true :
        x === W - 1 ? false :
        Math.random() < 0.5;
      if (goRight) { g[y][x].r = false; x++; }
      else { g[y][x].d = false; y++; }
      path.push([x, y]);
    }
    // ouvre quelques passages aléatoires pour faire des couloirs/leurres
    for (let i = 0; i < 14; i++) {
      const rx = Math.floor(Math.random() * W);
      const ry = Math.floor(Math.random() * H);
      if (Math.random() < 0.5 && rx < W - 1) g[ry][rx].r = false;
      else if (ry < H - 1) g[ry][rx].d = false;
    }
    return g;
  }, []);

  const start = { x: 0, y: 0 };
  const exit = { x: W - 1, y: H - 1 };
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([start]);
  const [dragging, setDragging] = useState(false);
  const head = trail[trail.length - 1];

  const canMove = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = b.x - a.x, dy = b.y - a.y;
    if (Math.abs(dx) + Math.abs(dy) !== 1) return false;
    if (dx === 1) return !maze[a.y][a.x].r;
    if (dx === -1) return !maze[a.y][b.x].r;
    if (dy === 1) return !maze[a.y][a.x].d;
    if (dy === -1) return !maze[b.y][a.x].d;
    return false;
  };

  const enter = (x: number, y: number) => {
    if (!dragging) return;
    // si on revient en arrière sur l'avant-dernière case, on annule la dernière
    if (trail.length >= 2) {
      const prev = trail[trail.length - 2];
      if (prev.x === x && prev.y === y) {
        setTrail((t) => t.slice(0, -1));
        return;
      }
    }
    if (trail.some((t) => t.x === x && t.y === y)) return;
    if (!canMove(head, { x, y })) return;
    const np = { x, y };
    const next = [...trail, np];
    setTrail(next);
    if (x === exit.x && y === exit.y) {
      setDragging(false);
      setTimeout(onSolved, 400);
    }
  };

  const cellSize = 30;

  return (
    <div>
      <Hint>Tracez le chemin de l'entrée à la sortie — maintenez le clic et survolez les cases.</Hint>
      <div className="flex justify-center">
        <div
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          className="relative bg-[oklch(0.94_0.04_80)] border-2 border-paper-foreground/40 paper-shadow select-none"
          style={{ width: W * cellSize, height: H * cellSize }}
        >
          {/* fil rouge tracé */}
          <svg className="absolute inset-0 pointer-events-none" width={W * cellSize} height={H * cellSize}>
            <polyline
              fill="none"
              stroke="oklch(0.62 0.22 18)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              points={trail.map((t) => `${t.x * cellSize + cellSize / 2},${t.y * cellSize + cellSize / 2}`).join(" ")}
              style={{ filter: "drop-shadow(0 0 4px oklch(0.62 0.22 18 / 0.6))" }}
            />
          </svg>
          {/* cellules + murs */}
          {maze.map((row, y) =>
            row.map((c, x) => {
              const isStart = x === 0 && y === 0;
              const isExit = x === exit.x && y === exit.y;
              return (
                <div
                  key={`${x}-${y}`}
                  onMouseEnter={() => enter(x, y)}
                  onMouseDown={(e) => { e.preventDefault(); setDragging(true); enter(x, y); }}
                  className="absolute"
                  style={{
                    left: x * cellSize, top: y * cellSize,
                    width: cellSize, height: cellSize,
                    borderRight: c.r ? "2px solid oklch(0.3 0.04 60)" : "none",
                    borderBottom: c.d ? "2px solid oklch(0.3 0.04 60)" : "none",
                  }}
                >
                  {isStart && (
                    <span className="absolute inset-0 flex items-center justify-center font-stamp text-[9px] tracking-wider text-paper-foreground/70">
                      ▶
                    </span>
                  )}
                  {isExit && (
                    <span className="absolute inset-0 flex items-center justify-center text-evidence text-base">★</span>
                  )}
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- 8. Polygraphe — stopper l'aiguille dans la zone verte ---------- */

function PolygraphGame({ onSolved }: { onSolved: () => void }) {
  const [pos, setPos] = useState(0);
  const [stopped, setStopped] = useState<number | null>(null);
  const zoneStart = useMemo(() => 30 + Math.random() * 40, []);
  const zoneEnd = zoneStart + 15;

  useEffect(() => {
    if (stopped !== null) return;
    let raf: number;
    let dir = 1;
    const tick = () => {
      setPos((p) => {
        let n = p + dir * 1.5;
        if (n >= 100) { n = 100; dir = -1; }
        if (n <= 0) { n = 0; dir = 1; }
        return n;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stopped]);

  const stop = () => {
    setStopped(pos);
    if (pos >= zoneStart && pos <= zoneEnd) {
      setTimeout(onSolved, 600);
    } else {
      // relance après court délai
      setTimeout(() => { setStopped(null); }, 700);
    }
  };

  const inZone = stopped !== null && stopped >= zoneStart && stopped <= zoneEnd;

  return (
    <div>
      <Hint>Stoppez l'aiguille dans la zone verte pour valider le polygraphe.</Hint>
      <div className="relative h-12 bg-paper-foreground/10 border border-paper-foreground/30 my-6 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 bg-evidence/30 border-x-2 border-evidence"
          style={{ left: `${zoneStart}%`, width: `${zoneEnd - zoneStart}%` }}
        />
        <div
          className={`absolute top-0 bottom-0 w-1 ${stopped === null ? "bg-paper-foreground" : inZone ? "bg-evidence" : "bg-destructive"}`}
          style={{ left: `${pos}%`, transition: stopped !== null ? "none" : undefined }}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={stop}
          disabled={stopped !== null}
          className="px-8 py-3 bg-paper-foreground text-paper font-stamp text-xs tracking-[0.3em] noir-shadow hover:-translate-y-0.5 transition-transform disabled:opacity-60"
        >
          {stopped === null ? "STOP" : inZone ? "VALIDÉ" : "RAYÉ — RECOMMENCEZ"}
        </button>
      </div>
    </div>
  );
}

/* ---------- 9. Code à 4 chiffres ---------- */

function CodeGame({ onSolved }: { onSolved: () => void }) {
  const target = useMemo(
    () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)),
    [],
  );
  const [guess, setGuess] = useState<number[]>([0, 0, 0, 0]);
  const [active, setActive] = useState(0);

  const adjust = (d: number) => {
    setGuess((g) => {
      const next = [...g];
      next[active] = (next[active] + d + 10) % 10;
      return next;
    });
  };

  useEffect(() => {
    if (guess.every((d, i) => d === target[i])) {
      const t = setTimeout(onSolved, 500);
      return () => clearTimeout(t);
    }
  }, [guess, target, onSolved]);

  return (
    <div>
      <Hint>Composez la combinaison — ▲ trop bas · ▼ trop haut · ● correct.</Hint>
      <div className="flex items-center justify-center gap-3 my-6">
        {guess.map((d, i) => {
          const hint =
            d === target[i] ? "ok" :
            d < target[i] ? "low" :
            "high";
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-14 h-20 border-2 font-mono text-3xl flex items-center justify-center transition-all
                ${active === i ? "border-evidence bg-evidence/10" : "border-paper-foreground/40 bg-paper"}
                text-paper-foreground`}
            >
              {d}
              <span className={`absolute -bottom-5 text-xs font-stamp tracking-wider
                ${hint === "ok" ? "text-evidence" : "text-paper-foreground/50"}`}>
                {hint === "ok" ? "●" : hint === "low" ? "▲" : "▼"}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center gap-3 mt-8">
        <button onClick={() => adjust(-1)} className="w-12 h-10 bg-paper border-2 border-paper-foreground/40 font-stamp">−</button>
        <button onClick={() => adjust(+1)} className="w-12 h-10 bg-paper border-2 border-paper-foreground/40 font-stamp">+</button>
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
  if (arr.length > 1 && a.every((v, i) => v === arr[i])) return shuffle(arr);
  return a;
}