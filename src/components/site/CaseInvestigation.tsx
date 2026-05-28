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
    case "scan": return <ScanGame onSolved={onSolved} />;
    case "biometric": return <BiometricGame onSolved={onSolved} />;
    case "stamp": return <StampGame onSolved={onSolved} />;
    case "maze": return <MazeGame onSolved={onSolved} />;
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

/* ---------- 4. Scanner les preuves — loupe ---------- */

function ScanGame({ onSolved }: { onSolved: () => void }) {
  const docs = useMemo(() => {
    const target = Math.floor(Math.random() * 6);
    return Array.from({ length: 6 }, (_, i) => ({ id: i, hidden: i === target }));
  }, []);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [found, setFound] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const onClick = (id: number) => {
    if (docs[id].hidden) {
      setFound(true);
      setTimeout(onSolved, 500);
    }
  };

  return (
    <div>
      <Hint>Déplacez la loupe et cliquez sur le document qui dissimule une preuve.</Hint>
      <div
        ref={ref}
        onMouseMove={onMove}
        className="relative h-[240px] bg-paper-foreground/5 border border-paper-foreground/15 grid grid-cols-3 grid-rows-2 gap-2 p-2 cursor-none overflow-hidden"
      >
        {docs.map((d) => {
          const cx = (d.id % 3) * (100 / 3) + 100 / 6;
          const cy = Math.floor(d.id / 3) * 50 + 25;
          const dist = Math.hypot(pos.x - cx, pos.y - cy);
          const revealed = d.hidden && dist < 22;
          return (
            <button
              key={d.id}
              onClick={() => onClick(d.id)}
              className={`relative border border-paper-foreground/20 bg-paper paper-shadow flex items-center justify-center font-stamp text-[10px] tracking-[0.2em] transition-colors
                ${revealed ? "border-evidence text-evidence" : "text-paper-foreground/50"}`}
            >
              {revealed ? "★ PREUVE" : "DOC"}
            </button>
          );
        })}
        {!found && (
          <div
            className="pointer-events-none absolute w-24 h-24 rounded-full border-4 border-evidence/80 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${pos.x}%`, top: `${pos.y}%`,
              boxShadow: "0 0 0 9999px rgba(0,0,0,0.35), inset 0 0 12px rgba(0,0,0,0.3)",
            }}
          />
        )}
      </div>
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

/* ---------- 7. Mini-labyrinthe ---------- */

function MazeGame({ onSolved }: { onSolved: () => void }) {
  // 5x5 grid, 0 = libre, 1 = mur, S start, E exit
  const grid = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
  ];
  const start = { x: 0, y: 0 };
  const exit = { x: 4, y: 4 };
  const [pos, setPos] = useState(start);
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([start]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const dx = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      const dy = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
      if (!dx && !dy) return;
      e.preventDefault();
      move(dx, dy);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const move = (dx: number, dy: number) => {
    const nx = pos.x + dx, ny = pos.y + dy;
    if (nx < 0 || ny < 0 || nx > 4 || ny > 4) return;
    if (grid[ny][nx] === 1) return;
    const np = { x: nx, y: ny };
    setPos(np);
    setTrail((t) => [...t, np]);
    if (nx === exit.x && ny === exit.y) setTimeout(onSolved, 400);
  };

  return (
    <div>
      <Hint>Atteignez la sortie — flèches du clavier ou boutons directionnels.</Hint>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-2">
        <div className="grid grid-cols-5 gap-1 bg-paper-foreground/10 p-2">
          {grid.map((row, y) =>
            row.map((cell, x) => {
              const here = pos.x === x && pos.y === y;
              const onTrail = trail.some((t) => t.x === x && t.y === y);
              const isExit = exit.x === x && exit.y === y;
              return (
                <div
                  key={`${x}-${y}`}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-stamp
                    ${cell === 1 ? "bg-paper-foreground/80" :
                      here ? "bg-evidence text-evidence-foreground" :
                      isExit ? "border-2 border-evidence text-evidence" :
                      onTrail ? "bg-evidence/15" : "bg-paper"}`}
                >
                  {here ? "●" : isExit ? "★" : ""}
                </div>
              );
            }),
          )}
        </div>
        <div className="grid grid-cols-3 gap-1 w-32">
          <div />
          <button onClick={() => move(0, -1)} className="py-2 bg-paper border border-paper-foreground/30 font-stamp">↑</button>
          <div />
          <button onClick={() => move(-1, 0)} className="py-2 bg-paper border border-paper-foreground/30 font-stamp">←</button>
          <button onClick={() => move(0, 1)} className="py-2 bg-paper border border-paper-foreground/30 font-stamp">↓</button>
          <button onClick={() => move(1, 0)} className="py-2 bg-paper border border-paper-foreground/30 font-stamp">→</button>
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
  if (arr.length > 1 && a.every((v, i) => v === arr[i])) return shuffle(arr);
  return a;
}