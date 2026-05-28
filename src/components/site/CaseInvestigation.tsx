import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  caseId: string;
  caseTitle: string;
  onSolved: () => void;
  onClose: () => void;
};

type GameKey = "maze" | "dial" | "decode" | "signal" | "network";

// Chaque mini-jeu a son propre accent couleur (style app d'enquête moderne).
const META: Record<GameKey, { label: string; success: string; accent: string; accentSoft: string }> = {
  maze:    { label: "Labyrinthe sécurisé",     success: "Sortie atteinte — dossier ouvert.",        accent: "oklch(0.78 0.18 200)", accentSoft: "oklch(0.78 0.18 200 / 0.15)" }, // cyan
  dial:    { label: "Cadran du coffre",        success: "Combinaison verrouillée — accès accordé.", accent: "oklch(0.82 0.16 80)",  accentSoft: "oklch(0.82 0.16 80 / 0.15)"  }, // amber
  decode:  { label: "Séquence de décodage",    success: "Séquence validée — dossier ouvert.",       accent: "oklch(0.78 0.20 320)", accentSoft: "oklch(0.78 0.20 320 / 0.15)" }, // magenta
  signal:  { label: "Stabilisation du signal", success: "Signal stabilisé — accès accordé.",        accent: "oklch(0.78 0.18 150)", accentSoft: "oklch(0.78 0.18 150 / 0.15)" }, // green
  network: { label: "Réseau d'interception",   success: "Réseau activé — dossier déverrouillé.",    accent: "oklch(0.72 0.20 18)",  accentSoft: "oklch(0.72 0.20 18 / 0.15)"  }, // red
};

// Un mini-jeu unique et stable par dossier.
const GAME_BY_CASE: Record<string, GameKey> = {
  together: "maze",
  mood:     "dial",
  lyrics:   "decode",
  ecole:    "signal",
  mirakl:   "network",
};

export function CaseInvestigation({ caseId, caseTitle, onSolved, onClose }: Props) {
  const [solved, setSolved] = useState(false);
  const key = GAME_BY_CASE[caseId] ?? "maze";
  const meta = META[key];

  useEffect(() => {
    if (!solved) return;
    const t = setTimeout(() => onSolved(), 950);
    return () => clearTimeout(t);
  }, [solved, onSolved]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-[oklch(0.18_0.02_260)] text-[oklch(0.95_0.01_80)] noir-shadow p-8 md:p-10 animate-scale-in border border-white/10"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage:
            `radial-gradient(circle at 20% 0%, ${meta.accentSoft}, transparent 60%), radial-gradient(circle at 100% 100%, rgba(120,140,255,0.06), transparent 50%)`,
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
          style={{ color: meta.accent }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: meta.accent, boxShadow: `0 0 10px ${meta.accent}` }}
          />
          ACCÈS CLASSIFIÉ · {meta.label.toUpperCase()}
        </div>
        <h3 className="font-serif-display text-2xl md:text-3xl leading-tight mb-6">
          {caseTitle}
        </h3>

        <div className="relative min-h-[280px]">
          {!solved && <Router game={key} accent={meta.accent} onSolved={() => setSolved(true)} />}

          {solved && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-fade-in">
              <div
                className="px-6 py-3 border-2 font-stamp text-base tracking-[0.3em] rotate-[-3deg] mb-4"
                style={{
                  borderColor: meta.accent,
                  color: meta.accent,
                  boxShadow: `0 0 24px ${meta.accent}`,
                }}
              >
                ✓ DOSSIER OUVERT
              </div>
              <p className="font-serif-display italic text-white/80">{meta.success}</p>
            </div>
          )}
        </div>

        {!solved && (
          <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-dashed border-white/15">
            <span className="font-stamp text-[10px] tracking-[0.25em] text-white/40">
              3–10s · épreuve d'accès
            </span>
            <button
              onClick={onSolved}
              className="font-stamp text-[10px] tracking-[0.25em] text-white/50 underline-offset-4 hover:underline transition-colors"
              style={{ ['--hover' as any]: meta.accent }}
              onMouseEnter={(e) => (e.currentTarget.style.color = meta.accent)}
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

function Router({ game, accent, onSolved }: { game: GameKey; accent: string; onSolved: () => void }) {
  switch (game) {
    case "maze":    return <MazeGame    accent={accent} onSolved={onSolved} />;
    case "dial":    return <DialGame    accent={accent} onSolved={onSolved} />;
    case "decode":  return <DecodeGame  accent={accent} onSolved={onSolved} />;
    case "signal":  return <SignalGame  accent={accent} onSolved={onSolved} />;
    case "network": return <NetworkGame accent={accent} onSolved={onSolved} />;
  }
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-stamp text-[10px] tracking-[0.25em] text-white/50 mb-4">
      {children}
    </p>
  );
}

/* ============================================================
 * 1. LABYRINTHE SÉCURISÉ — drag pour tracer le chemin
 * ============================================================ */

function MazeGame({ accent, onSolved }: { accent: string; onSolved: () => void }) {
  const NEON = accent;
  const W = 8, H = 6, CELL = 36;
  type Cell = { r: boolean; d: boolean };

  const maze = useMemo<Cell[][]>(() => {
    const g: Cell[][] = Array.from({ length: H }, () =>
      Array.from({ length: W }, () => ({ r: true, d: true })),
    );
    // chemin solution garanti (escalier aléatoire)
    let x = 0, y = 0;
    while (x < W - 1 || y < H - 1) {
      const goRight = y === H - 1 ? true : x === W - 1 ? false : Math.random() < 0.55;
      if (goRight) { g[y][x].r = false; x++; }
      else         { g[y][x].d = false; y++; }
    }
    // ouvertures supplémentaires pour faire de vrais couloirs/leurres
    for (let i = 0; i < 18; i++) {
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
    if (dx === 1)  return !maze[a.y][a.x].r;
    if (dx === -1) return !maze[a.y][b.x].r;
    if (dy === 1)  return !maze[a.y][a.x].d;
    if (dy === -1) return !maze[b.y][a.x].d;
    return false;
  };

  const enter = (x: number, y: number) => {
    if (!dragging) return;
    if (trail.length >= 2) {
      const prev = trail[trail.length - 2];
      if (prev.x === x && prev.y === y) { setTrail((t) => t.slice(0, -1)); return; }
    }
    if (trail.some((t) => t.x === x && t.y === y)) return;
    if (!canMove(head, { x, y })) return;
    const next = [...trail, { x, y }];
    setTrail(next);
    if (x === exit.x && y === exit.y) {
      setDragging(false);
      setTimeout(onSolved, 350);
    }
  };

  return (
    <div>
      <Hint>Maintenez le clic et tracez le chemin de l'entrée jusqu'à la sortie.</Hint>
      <div className="flex justify-center">
        <div
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          className="relative bg-[oklch(0.12_0.02_260)] border border-white/10 select-none"
          style={{
            width: W * CELL,
            height: H * CELL,
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* grid background */}
          <svg className="absolute inset-0 pointer-events-none" width={W * CELL} height={H * CELL}>
            {/* tracé néon */}
            {trail.length > 1 && (
              <polyline
                fill="none"
                stroke={NEON}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                points={trail
                  .map((t) => `${t.x * CELL + CELL / 2},${t.y * CELL + CELL / 2}`)
                  .join(" ")}
                style={{ filter: `drop-shadow(0 0 6px ${NEON})` }}
              />
            )}
            {/* murs */}
            {maze.map((row, y) =>
              row.map((c, x) => (
                <g key={`${x}-${y}`}>
                  {c.r && (
                    <line
                      x1={(x + 1) * CELL} y1={y * CELL}
                      x2={(x + 1) * CELL} y2={(y + 1) * CELL}
                      stroke="oklch(0.45 0.05 260)" strokeWidth={2}
                    />
                  )}
                  {c.d && (
                    <line
                      x1={x * CELL} y1={(y + 1) * CELL}
                      x2={(x + 1) * CELL} y2={(y + 1) * CELL}
                      stroke="oklch(0.45 0.05 260)" strokeWidth={2}
                    />
                  )}
                </g>
              )),
            )}
            {/* bord extérieur */}
            <rect x="0" y="0" width={W * CELL} height={H * CELL}
              fill="none" stroke="oklch(0.55 0.08 260)" strokeWidth={2} />
          </svg>

          {/* hover targets */}
          {maze.map((row, y) =>
            row.map((_, x) => (
              <div
                key={`hit-${x}-${y}`}
                onMouseEnter={() => enter(x, y)}
                onMouseDown={(e) => { e.preventDefault(); setDragging(true); enter(x, y); }}
                className="absolute"
                style={{ left: x * CELL, top: y * CELL, width: CELL, height: CELL }}
              />
            )),
          )}

          {/* start marker */}
          <div
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: CELL / 2 - 4, top: CELL / 2 - 4, width: 8, height: 8,
            }}
          />
          {/* exit marker */}
          <div
            className="absolute rounded-full pointer-events-none animate-pulse"
            style={{
              left: exit.x * CELL + CELL / 2 - 7,
              top: exit.y * CELL + CELL / 2 - 7,
              width: 14, height: 14,
              background: NEON,
              boxShadow: `0 0 16px ${NEON}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * 2. CADRAN DU COFFRE — rotation à la souris
 * ============================================================ */

function DialGame({ onSolved }: { onSolved: () => void }) {
  const target = useMemo(() => Math.floor(Math.random() * 360), []);
  const [angle, setAngle] = useState(0);
  const [locked, setLocked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromEvent = (clientX: number, clientY: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const a = (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI + 90;
    setAngle((a + 360) % 360);
  };

  useEffect(() => {
    const move = (e: MouseEvent) => { if (dragging.current) setFromEvent(e.clientX, e.clientY); };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  const diff = Math.min(Math.abs(angle - target), 360 - Math.abs(angle - target));
  const near = diff < 6;

  const lock = () => {
    if (!near || locked) return;
    setLocked(true);
    setTimeout(onSolved, 500);
  };

  return (
    <div>
      <Hint>Tournez le cadran jusqu'à la marque, puis verrouillez.</Hint>
      <div className="flex flex-col items-center">
        <div
          ref={ref}
          onMouseDown={(e) => { dragging.current = true; setFromEvent(e.clientX, e.clientY); }}
          className="relative w-52 h-52 rounded-full cursor-grab active:cursor-grabbing select-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.32 0.02 260), oklch(0.12 0.02 260) 70%)",
            boxShadow:
              "inset 0 0 30px rgba(0,0,0,0.7), 0 12px 30px rgba(0,0,0,0.5), 0 0 0 6px oklch(0.22 0.02 260)",
          }}
        >
          {/* graduations */}
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1 w-px h-2 bg-white/30 origin-[50%_104px]"
              style={{ transform: `translateX(-50%) rotate(${i * 10}deg)` }}
            />
          ))}
          {/* target notch */}
          <div
            className="absolute left-1/2 top-0 w-1.5 h-4 origin-[50%_104px] rounded-b"
            style={{
              background: NEON,
              boxShadow: `0 0 10px ${NEON}`,
              transform: `translateX(-50%) rotate(${target}deg)`,
            }}
          />
          {/* indicator (rotates with dial) */}
          <div
            className="absolute inset-3 rounded-full border border-white/10"
            style={{ transform: `rotate(${angle}deg)`, transition: locked ? "transform .3s" : "none" }}
          >
            <div
              className="absolute left-1/2 -top-1 w-2 h-6 -translate-x-1/2 rounded"
              style={{
                background: near ? NEON : "oklch(0.9 0.01 80)",
                boxShadow: near ? `0 0 12px ${NEON}` : "none",
              }}
            />
          </div>
          {/* center hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[oklch(0.2_0.02_260)] border border-white/10 flex items-center justify-center font-stamp text-[10px] tracking-[0.2em] text-white/60">
            {Math.round(angle)}°
          </div>
        </div>

        <button
          onClick={lock}
          disabled={!near || locked}
          className={`mt-5 px-6 py-2.5 font-stamp text-xs tracking-[0.3em] border transition-all
            ${near ? "border-evidence text-evidence bg-evidence/10 hover:bg-evidence hover:text-evidence-foreground" :
              "border-white/15 text-white/30"}`}
        >
          {locked ? "VERROUILLÉ" : "VERROUILLER"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
 * 3. TRACÉ D'EMPREINTE — suivre une courbe d'un seul geste
 * ============================================================ */

function TraceGame({ onSolved }: { onSolved: () => void }) {
  const W = 420, H = 220;
  // Courbe paramétrique (sinusoïde douce)
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const N = 60;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const x = 30 + t * (W - 60);
      const y = H / 2 + Math.sin(t * Math.PI * 2.2) * 55;
      pts.push({ x, y });
    }
    return pts;
  }, []);
  const pathD = useMemo(
    () => points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" "),
    [points],
  );

  const [progress, setProgress] = useState(0); // index suivant à atteindre
  const [failed, setFailed] = useState(false);
  const ref = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const onMove = (clientX: number, clientY: number) => {
    if (!dragging.current) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = ((clientX - r.left) / r.width) * W;
    const py = ((clientY - r.top) / r.height) * H;
    // distance au prochain point
    const next = points[progress];
    if (!next) return;
    const d = Math.hypot(px - next.x, py - next.y);
    if (d < 22) {
      const np = progress + 1;
      setProgress(np);
      if (np >= points.length) {
        dragging.current = false;
        setTimeout(onSolved, 350);
      }
    } else {
      // si on s'éloigne trop de la trace globale → reset
      const dCurrent = Math.hypot(px - points[Math.max(0, progress - 1)].x, py - points[Math.max(0, progress - 1)].y);
      if (dCurrent > 60) {
        dragging.current = false;
        setFailed(true);
        setTimeout(() => { setFailed(false); setProgress(0); }, 500);
      }
    }
  };

  useEffect(() => {
    const move = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, points]);

  const pct = (progress / points.length) * 100;

  return (
    <div>
      <Hint>Maintenez le clic et suivez la courbe d'un seul geste — du point au cercle.</Hint>
      <div className="flex justify-center">
        <svg
          ref={ref}
          viewBox={`0 0 ${W} ${H}`}
          className={`w-full max-w-md h-[220px] bg-[oklch(0.12_0.02_260)] border border-white/10 ${failed ? "animate-pulse" : ""}`}
          style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)" }}
          onMouseDown={(e) => {
            dragging.current = true;
            onMove(e.clientX, e.clientY);
          }}
        >
          {/* trace de fond */}
          <path d={pathD} stroke="oklch(0.4 0.05 260)" strokeWidth={3} fill="none" strokeDasharray="4 6" />
          {/* trace effectuée */}
          {progress > 0 && (
            <path
              d={points.slice(0, progress + 1).map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")}
              stroke={NEON}
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 6px ${NEON})` }}
            />
          )}
          {/* point de départ */}
          <circle cx={points[0].x} cy={points[0].y} r={9}
            fill="none" stroke="white" strokeWidth={2} className={progress === 0 ? "animate-pulse" : ""} />
          <circle cx={points[0].x} cy={points[0].y} r={4} fill="white" />
          {/* arrivée */}
          <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r={10}
            fill="none" stroke={NEON} strokeWidth={2} />
        </svg>
      </div>
      <div className="mt-3 w-full max-w-md mx-auto h-1 bg-white/10 overflow-hidden">
        <div className="h-full bg-evidence" style={{ width: `${pct}%`, transition: "width .15s" }} />
      </div>
    </div>
  );
}

/* ============================================================
 * 4. STABILISATION DU SIGNAL — aligner deux ondes
 * ============================================================ */

function SignalGame({ onSolved }: { onSolved: () => void }) {
  const W = 420, H = 160;
  const targetPhase = useMemo(() => 0.2 + Math.random() * 0.6, []); // 0..1
  const targetFreq = useMemo(() => 1.5 + Math.random() * 1.5, []);  // 1.5..3
  const [phase, setPhase] = useState(0);
  const [freq, setFreq] = useState(2.3);
  const [locked, setLocked] = useState(false);

  const pathFor = (p: number, f: number, color: string, dashed = false) => {
    let d = "";
    for (let x = 0; x <= W; x += 4) {
      const t = x / W;
      const y = H / 2 + Math.sin((t + p) * Math.PI * 2 * f) * 45;
      d += `${x === 0 ? "M" : "L"}${x},${y} `;
    }
    return (
      <path d={d} stroke={color} strokeWidth={2} fill="none"
        strokeDasharray={dashed ? "4 4" : undefined}
        style={dashed ? undefined : { filter: `drop-shadow(0 0 5px ${color})` }} />
    );
  };

  const dPhase = Math.min(Math.abs(phase - targetPhase), 1 - Math.abs(phase - targetPhase));
  const dFreq = Math.abs(freq - targetFreq);
  const aligned = dPhase < 0.04 && dFreq < 0.15;

  useEffect(() => {
    if (aligned && !locked) {
      setLocked(true);
      setTimeout(onSolved, 600);
    }
  }, [aligned, locked, onSolved]);

  return (
    <div>
      <Hint>Faites coïncider votre onde rouge avec l'onde cible (pointillés).</Hint>
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-md h-[160px] bg-[oklch(0.12_0.02_260)] border border-white/10"
          style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)" }}
        >
          {/* grille */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={(i + 1) * (W / 8)} y1={0} x2={(i + 1) * (W / 8)} y2={H}
              stroke="oklch(0.25 0.02 260)" strokeWidth={1} />
          ))}
          <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="oklch(0.3 0.02 260)" />
          {pathFor(targetPhase, targetFreq, "oklch(0.7 0.1 200)", true)}
          {pathFor(phase, freq, aligned ? "oklch(0.7 0.2 150)" : NEON)}
        </svg>
      </div>

      <div className="mt-5 space-y-4">
        <SliderRow label="PHASE" value={phase} onChange={setPhase} min={0} max={1} step={0.01} hot={dPhase < 0.04} />
        <SliderRow label="FRÉQUENCE" value={freq} onChange={setFreq} min={1} max={3.5} step={0.02} hot={dFreq < 0.15} />
      </div>
    </div>
  );
}

function SliderRow({
  label, value, onChange, min, max, step, hot,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; hot: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`font-stamp text-[10px] tracking-[0.25em] w-24 ${hot ? "text-evidence" : "text-white/50"}`}>
        {label}
      </span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-[oklch(0.62_0.22_18)]"
      />
      <span className={`w-2 h-2 rounded-full ${hot ? "bg-evidence shadow-[0_0_8px_oklch(0.62_0.22_18)]" : "bg-white/20"}`} />
    </div>
  );
}

/* ============================================================
 * 5. RÉSEAU D'INTERCEPTION — relier les nœuds dans l'ordre
 * ============================================================ */

function NetworkGame({ onSolved }: { onSolved: () => void }) {
  const W = 420, H = 240;
  const nodes = useMemo(() => {
    const layout = [
      { x: 60, y: 60 }, { x: 360, y: 50 }, { x: 350, y: 200 },
      { x: 80, y: 190 }, { x: 220, y: 120 },
    ];
    const shuffled = shuffle(layout.map((_, i) => i)).slice(0, 4);
    return shuffled.map((idx, order) => ({ ...layout[idx], order: order + 1, id: idx }));
  }, []);

  const [step, setStep] = useState(0); // prochain nœud à cliquer (order = step+1)
  const [error, setError] = useState(false);
  const clicked = nodes.filter((n) => n.order <= step);

  const click = (n: { order: number }) => {
    if (n.order === step + 1) {
      const next = step + 1;
      setStep(next);
      if (next === nodes.length) setTimeout(onSolved, 500);
    } else {
      setError(true);
      setTimeout(() => { setError(false); setStep(0); }, 500);
    }
  };

  return (
    <div>
      <Hint>Activez le réseau en cliquant sur les nœuds dans l'ordre indiqué.</Hint>
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${W} ${H}`}
          className={`w-full max-w-md h-[240px] bg-[oklch(0.12_0.02_260)] border border-white/10 ${error ? "animate-pulse" : ""}`}
          style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)" }}
        >
          {/* radar grid */}
          {[0.25, 0.5, 0.75].map((r) => (
            <circle key={r} cx={W / 2} cy={H / 2} r={Math.min(W, H) * r}
              fill="none" stroke="oklch(0.22 0.02 260)" strokeDasharray="2 4" />
          ))}
          <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="oklch(0.22 0.02 260)" />
          <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="oklch(0.22 0.02 260)" />

          {/* lignes activées */}
          {clicked.slice(1).map((n, i) => {
            const prev = clicked[i];
            return (
              <line key={n.id} x1={prev.x} y1={prev.y} x2={n.x} y2={n.y}
                stroke={NEON} strokeWidth={2}
                style={{ filter: `drop-shadow(0 0 6px ${NEON})` }} />
            );
          })}

          {/* nœuds */}
          {nodes.map((n) => {
            const done = n.order <= step;
            const isNext = n.order === step + 1;
            return (
              <g key={n.id} onClick={() => click(n)} className="cursor-pointer">
                {isNext && (
                  <circle cx={n.x} cy={n.y} r={22}
                    fill="none" stroke={NEON} strokeWidth={1} opacity={0.6}>
                    <animate attributeName="r" from="14" to="26" dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={n.x} cy={n.y} r={14}
                  fill={done ? NEON : "oklch(0.2 0.02 260)"}
                  stroke={done ? NEON : "oklch(0.5 0.05 260)"} strokeWidth={2}
                  style={done ? { filter: `drop-shadow(0 0 8px ${NEON})` } : undefined}
                />
                <text x={n.x} y={n.y + 4} textAnchor="middle"
                  fontSize={12} fontFamily="monospace"
                  fill={done ? "white" : "oklch(0.7 0.05 260)"}>
                  {n.order}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="text-center font-stamp text-[10px] tracking-[0.25em] text-white/40 mt-3">
        {step}/{nodes.length} nœuds activés
      </p>
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