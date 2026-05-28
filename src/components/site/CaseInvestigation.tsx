import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  caseId: string;
  caseTitle: string;
  onSolved: () => void;
  onClose: () => void;
};

const SUCCESS_MESSAGES: Record<string, string> = {
  together: "Groupe synchronisé — dossier ouvert.",
  mood: "Humeur détectée — recommandation prête.",
  lyrics: "Paroles identifiées — piste retrouvée.",
  ecole: "Outils réunis — plateforme débloquée.",
  mirakl: "Pipeline activé — enquête gagnante débloquée.",
  brasil: "Insights reliés — rapport ouvert.",
};

export function CaseInvestigation({ caseId, caseTitle, onSolved, onClose }: Props) {
  const [solved, setSolved] = useState(false);

  // Auto-trigger modal opening shortly after success stamp
  useEffect(() => {
    if (!solved) return;
    const t = setTimeout(() => onSolved(), 900);
    return () => clearTimeout(t);
  }, [solved, onSolved]);

  const successMsg = SUCCESS_MESSAGES[caseId] ?? "Enquête résolue — dossier ouvert.";

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
          MINI-ENQUÊTE
        </div>
        <h3 className="font-serif-display text-2xl md:text-3xl text-paper-foreground leading-tight mb-6">
          {caseTitle}
        </h3>

        <div className="relative min-h-[260px]">
          {!solved && (
            <GameForCase caseId={caseId} onSolved={() => setSolved(true)} />
          )}

          {solved && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="stamp text-base md:text-lg px-6 py-3 rotate-[-4deg] mb-4">
                ✓ DOSSIER OUVERT
              </div>
              <p className="font-serif-display italic text-paper-foreground/80">
                {successMsg}
              </p>
            </div>
          )}
        </div>

        {!solved && (
          <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-dashed border-paper-foreground/25">
            <span className="font-stamp text-[10px] tracking-[0.25em] text-paper-foreground/50">
              5–10s · résolvez pour ouvrir
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

function GameForCase({ caseId, onSolved }: { caseId: string; onSolved: () => void }) {
  switch (caseId) {
    case "together":
      return <TogetherGame onSolved={onSolved} />;
    case "mood":
      return <MoodGame onSolved={onSolved} />;
    case "lyrics":
      return <LyricsGame onSolved={onSolved} />;
    case "ecole":
      return <EcoleGame onSolved={onSolved} />;
    case "mirakl":
      return <MiraklGame onSolved={onSolved} />;
    case "brasil":
      return <BrasilGame onSolved={onSolved} />;
    default:
      return <GenericGame onSolved={onSolved} />;
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

/* ---------- CASE 01 — Together : relier les amis ---------- */

function TogetherGame({ onSolved }: { onSolved: () => void }) {
  // 4 amis, 2 paires correctes (même plan)
  const friends = [
    { id: "a", label: "Léa", plan: 1, x: 12, y: 20 },
    { id: "b", label: "Tom", plan: 2, x: 88, y: 22 },
    { id: "c", label: "Sami", plan: 1, x: 18, y: 78 },
    { id: "d", label: "Inès", plan: 2, x: 82, y: 80 },
  ];
  const [picked, setPicked] = useState<string | null>(null);
  const [links, setLinks] = useState<Array<[string, string]>>([]);
  const [error, setError] = useState(false);

  const pick = (id: string) => {
    if (picked === null) {
      setPicked(id);
      return;
    }
    if (picked === id) {
      setPicked(null);
      return;
    }
    const a = friends.find((f) => f.id === picked)!;
    const b = friends.find((f) => f.id === id)!;
    if (a.plan === b.plan) {
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

  const pos = (id: string) => friends.find((f) => f.id === id)!;

  return (
    <div>
      <Hint>Reliez les amis qui partagent le même plan de sortie.</Hint>
      <div className={`relative w-full h-[240px] bg-paper-foreground/5 border border-paper-foreground/15 ${error ? "animate-pulse" : ""}`}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {links.map(([a, b], i) => {
            const A = pos(a);
            const B = pos(b);
            return (
              <line
                key={i}
                x1={`${A.x}%`} y1={`${A.y}%`}
                x2={`${B.x}%`} y2={`${B.y}%`}
                stroke="oklch(0.62 0.22 18)"
                strokeWidth={2}
                strokeDasharray="0"
                style={{ filter: "drop-shadow(0 0 4px oklch(0.62 0.22 18 / 0.6))" }}
              />
            );
          })}
        </svg>
        {friends.map((f) => {
          const active = picked === f.id;
          const linked = links.some(([a, b]) => a === f.id || b === f.id);
          return (
            <button
              key={f.id}
              onClick={() => pick(f.id)}
              style={{ left: `${f.x}%`, top: `${f.y}%`, transform: "translate(-50%, -50%)" }}
              className={`absolute w-14 h-14 rounded-full border-2 flex items-center justify-center font-stamp text-xs tracking-wider transition-all
                ${linked ? "bg-evidence text-evidence-foreground border-evidence" : active ? "bg-paper-foreground text-paper border-paper-foreground scale-110" : "bg-paper text-paper-foreground border-paper-foreground/40 hover:border-evidence"}`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- CASE 02 — Mood : calibrer l'humeur ---------- */

function MoodGame({ onSolved }: { onSolved: () => void }) {
  const moods = ["Rire", "Aventure", "Réflexion", "Romance"];
  const target = useMemo(() => Math.floor(Math.random() * moods.length), []);
  const [value, setValue] = useState(50);
  const [locked, setLocked] = useState(false);

  // map value 0-100 to zone 0..3
  const zone = Math.min(moods.length - 1, Math.floor((value / 100) * moods.length));
  const onLock = () => {
    if (zone !== target) return;
    setLocked(true);
    setTimeout(onSolved, 600);
  };

  return (
    <div>
      <Hint>Calibrez l'aiguille sur l'humeur recherchée : <span className="text-evidence">« {moods[target]} »</span></Hint>

      <div className="relative h-3 bg-paper-foreground/10 rounded-full overflow-hidden">
        {moods.map((_, i) => (
          <div
            key={i}
            className={`absolute top-0 bottom-0 ${i === target ? "bg-evidence/30" : ""}`}
            style={{ left: `${(i / moods.length) * 100}%`, width: `${100 / moods.length}%` }}
          />
        ))}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full -ml-2 transition-colors ${zone === target ? "bg-evidence shadow-[0_0_12px_oklch(0.62_0.22_18)]" : "bg-paper-foreground"}`}
          style={{ left: `${value}%` }}
        />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        disabled={locked}
        className="w-full mt-3 accent-[oklch(0.62_0.22_18)]"
      />

      <div className="grid grid-cols-4 gap-2 mt-3 text-center font-stamp text-[10px] tracking-wider text-paper-foreground/70">
        {moods.map((m, i) => (
          <span key={m} className={i === zone ? "text-paper-foreground" : ""}>{m}</span>
        ))}
      </div>

      <button
        onClick={onLock}
        disabled={locked}
        className={`mt-5 w-full py-2.5 font-stamp text-xs tracking-[0.25em] border transition-colors
          ${zone === target ? "bg-evidence text-evidence-foreground border-evidence" : "bg-paper-foreground/5 border-paper-foreground/20 text-paper-foreground/60"}`}
      >
        VERROUILLER L'HUMEUR
      </button>
    </div>
  );
}

/* ---------- CASE 03 — Lyrics : remettre dans l'ordre ---------- */

function LyricsGame({ onSolved }: { onSolved: () => void }) {
  const correct = ["J'ai demandé", "à la lune", "et le soleil", "ne le sait pas"];
  const [order, setOrder] = useState(() => shuffle(correct.map((_, i) => i)));
  const [selected, setSelected] = useState<number | null>(null);

  const swap = (i: number) => {
    if (selected === null) {
      setSelected(i);
      return;
    }
    if (selected === i) {
      setSelected(null);
      return;
    }
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

  return (
    <div>
      <Hint>Reconstituez l'extrait dans le bon ordre — cliquez deux fragments pour les échanger.</Hint>
      <div className="space-y-2">
        {order.map((idx, i) => {
          const isRight = idx === i;
          const active = selected === i;
          return (
            <button
              key={i}
              onClick={() => swap(i)}
              style={{ transform: `rotate(${(i % 2 === 0 ? -0.6 : 0.8)}deg)` }}
              className={`block w-full text-left px-4 py-2.5 paper-shadow font-serif-display text-base md:text-lg transition-all
                ${isRight ? "bg-evidence/15 border-l-4 border-evidence text-paper-foreground" : active ? "bg-paper-foreground text-paper" : "bg-paper text-paper-foreground hover:bg-paper-foreground/5"}`}
            >
              <span className="font-stamp text-[10px] tracking-[0.25em] opacity-60 mr-3">{i + 1}</span>
              {correct[idx]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- CASE 04 — École : centraliser les outils ---------- */

function EcoleGame({ onSolved }: { onSolved: () => void }) {
  const tools = [
    { id: "cours", label: "Cours", x: 8, y: 18 },
    { id: "agenda", label: "Agenda", x: 86, y: 24 },
    { id: "quiz", label: "Quiz", x: 12, y: 78 },
    { id: "chat", label: "Messagerie", x: 82, y: 80 },
  ];
  const [collected, setCollected] = useState<string[]>([]);

  const pick = (id: string) => {
    setCollected((c) => (c.includes(id) ? c : [...c, id]));
  };

  useEffect(() => {
    if (collected.length === tools.length) {
      const t = setTimeout(onSolved, 500);
      return () => clearTimeout(t);
    }
  }, [collected.length, tools.length, onSolved]);

  return (
    <div>
      <Hint>Rapatriez chaque outil étudiant dans la plateforme centrale.</Hint>
      <div className="relative h-[240px] bg-paper-foreground/5 border border-paper-foreground/15">
        {/* central hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-dashed border-evidence/60 flex items-center justify-center text-center font-stamp text-[10px] tracking-[0.2em] text-paper-foreground/80">
          PLATEFORME<br />({collected.length}/{tools.length})
        </div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {tools.map((t) =>
            collected.includes(t.id) ? (
              <line
                key={t.id}
                x1={`${t.x}%`} y1={`${t.y}%`}
                x2="50%" y2="50%"
                stroke="oklch(0.62 0.22 18)"
                strokeWidth={2}
                style={{ filter: "drop-shadow(0 0 4px oklch(0.62 0.22 18 / 0.6))" }}
              />
            ) : null,
          )}
        </svg>
        {tools.map((t) => {
          const got = collected.includes(t.id);
          return (
            <button
              key={t.id}
              onClick={() => pick(t.id)}
              style={{ left: `${t.x}%`, top: `${t.y}%`, transform: "translate(-50%, -50%)" }}
              className={`absolute px-3 py-2 font-stamp text-[10px] tracking-[0.2em] border-2 transition-all
                ${got ? "bg-evidence text-evidence-foreground border-evidence" : "bg-paper text-paper-foreground border-paper-foreground/40 hover:border-evidence hover:-translate-y-0.5"}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- CASE 05 — Mirakl : assembler les preuves ---------- */

function MiraklGame({ onSolved }: { onSolved: () => void }) {
  const proofs = ["GitHub", "LinkedIn", "IA"];
  const [placed, setPlaced] = useState<string[]>([]);

  const drop = (p: string) => {
    setPlaced((arr) => (arr.includes(p) ? arr : [...arr, p]));
  };

  useEffect(() => {
    if (placed.length === proofs.length) {
      const t = setTimeout(onSolved, 500);
      return () => clearTimeout(t);
    }
  }, [placed.length, proofs.length, onSolved]);

  return (
    <div>
      <Hint>Glissez chaque preuve dans le pipeline de sourcing.</Hint>

      <div className="flex flex-wrap gap-2 mb-4">
        {proofs.map((p) => {
          const used = placed.includes(p);
          return (
            <button
              key={p}
              onClick={() => drop(p)}
              disabled={used}
              className={`px-4 py-2 font-stamp text-xs tracking-[0.2em] border-2 transition-all
                ${used ? "opacity-30 line-through" : "bg-paper border-paper-foreground/40 text-paper-foreground hover:border-evidence hover:-translate-y-0.5"}`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <div className="border-2 border-dashed border-evidence/50 bg-evidence/5 p-4 min-h-[110px]">
        <div className="font-stamp text-[10px] tracking-[0.3em] text-evidence mb-3">
          PIPELINE DE SOURCING ({placed.length}/{proofs.length})
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {placed.map((p, i) => (
            <span key={p} className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-evidence text-evidence-foreground font-stamp text-[11px] tracking-[0.2em] paper-shadow">
                {p}
              </span>
              {i < placed.length - 1 && <span className="text-evidence">→</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- CASE 06 — Brésil : relier les insights ---------- */

function BrasilGame({ onSolved }: { onSolved: () => void }) {
  const dots = [
    { id: "pay", label: "Paiement", x: 18, y: 30 },
    { id: "city", label: "Ville", x: 50, y: 78 },
    { id: "ship", label: "Livraison", x: 82, y: 30 },
  ];
  const sequence = ["pay", "city", "ship"];
  const [progress, setProgress] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const pick = (id: string) => {
    const next = progress.length;
    if (sequence[next] === id) {
      const np = [...progress, id];
      setProgress(np);
      if (np.length === sequence.length) setTimeout(onSolved, 500);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
        setProgress([]);
      }, 400);
    }
  };

  const pos = (id: string) => dots.find((d) => d.id === id)!;

  return (
    <div>
      <Hint>Reliez les indices dans l'ordre : Paiement → Ville → Livraison.</Hint>
      <div className={`relative h-[240px] bg-paper-foreground/5 border border-paper-foreground/15 ${error ? "animate-pulse" : ""}`}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {progress.slice(1).map((id, i) => {
            const A = pos(progress[i]);
            const B = pos(id);
            return (
              <line
                key={i}
                x1={`${A.x}%`} y1={`${A.y}%`}
                x2={`${B.x}%`} y2={`${B.y}%`}
                stroke="oklch(0.62 0.22 18)"
                strokeWidth={2}
                style={{ filter: "drop-shadow(0 0 6px oklch(0.62 0.22 18 / 0.7))" }}
              />
            );
          })}
        </svg>
        {dots.map((d) => {
          const done = progress.includes(d.id);
          return (
            <button
              key={d.id}
              onClick={() => pick(d.id)}
              style={{ left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%, -50%)" }}
              className={`absolute flex flex-col items-center gap-2`}
            >
              <span className={`w-5 h-5 rounded-full border-2 transition-all ${done ? "bg-evidence border-evidence shadow-[0_0_10px_oklch(0.62_0.22_18)]" : "bg-paper border-paper-foreground/50"}`} />
              <span className="font-stamp text-[10px] tracking-[0.2em] text-paper-foreground">
                {d.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- fallback ---------- */

function GenericGame({ onSolved }: { onSolved: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <button
        onClick={onSolved}
        className="px-6 py-3 bg-evidence text-evidence-foreground font-stamp text-xs tracking-[0.25em] noir-shadow hover:-translate-y-0.5 transition-transform"
      >
        OUVRIR LE DOSSIER
      </button>
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
  // s'assurer que l'ordre n'est pas déjà bon
  if (a.every((v, i) => v === arr[i])) return shuffle(arr);
  return a;
}