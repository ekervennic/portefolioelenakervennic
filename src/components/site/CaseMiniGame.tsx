import { useMemo, useState } from "react";

type Props = { caseId: string };

export function CaseMiniGame({ caseId }: Props) {
  return (
    <div className="mt-8 p-5 border-2 border-dashed border-paper-foreground/25 bg-paper-foreground/[0.03]">
      <div className="font-stamp text-[10px] tracking-[0.3em] text-evidence mb-3">
        🎲 MINI-JEU DU DOSSIER
      </div>
      {caseId === "together" && <TogetherGame />}
      {caseId === "mood" && <MoodGame />}
      {caseId === "lyrics" && <LyricsGame />}
      {caseId === "ecole" && <EcoleGame />}
      {caseId === "mirakl" && <MiraklGame />}
    </div>
  );
}

function GameShell({
  prompt,
  children,
  onReset,
  resetLabel = "Rejouer",
  showReset,
}: {
  prompt: string;
  children: React.ReactNode;
  onReset?: () => void;
  resetLabel?: string;
  showReset?: boolean;
}) {
  return (
    <div>
      <p className="font-serif-display italic text-paper-foreground/90 mb-4">{prompt}</p>
      {children}
      {showReset && onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 font-stamp text-[10px] tracking-[0.25em] text-evidence hover:underline"
        >
          ↺ {resetLabel}
        </button>
      )}
    </div>
  );
}

/* ───────── TOGETHER : Sondage éclair ───────── */
function TogetherGame() {
  const options = [
    { label: "🍣 Resto japonais", votes: 7 },
    { label: "🎬 Cinéma à 20h", votes: 5 },
    { label: "🍻 Bar à cocktails", votes: 9 },
  ];
  const [picked, setPicked] = useState<number | null>(null);
  const total = options.reduce((s, o) => s + o.votes, 0) + (picked === null ? 0 : 1);

  return (
    <GameShell
      prompt="Sondage éclair entre amis — pour quoi tu votes ce soir ?"
      onReset={() => setPicked(null)}
      showReset={picked !== null}
    >
      <div className="space-y-2">
        {options.map((o, i) => {
          const v = o.votes + (picked === i ? 1 : 0);
          const pct = picked === null ? 0 : Math.round((v / total) * 100);
          return (
            <button
              key={o.label}
              type="button"
              onClick={() => picked === null && setPicked(i)}
              disabled={picked !== null}
              className={`relative w-full text-left p-3 border transition-all ${
                picked === i
                  ? "border-evidence bg-evidence/10"
                  : "border-paper-foreground/20 hover:border-evidence/60"
              } ${picked !== null ? "cursor-default" : "cursor-pointer"}`}
            >
              {picked !== null && (
                <div
                  className="absolute inset-0 bg-evidence/15 transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              )}
              <div className="relative flex justify-between items-center text-sm text-paper-foreground">
                <span>{o.label}</span>
                {picked !== null && (
                  <span className="font-stamp text-xs text-evidence">{v} votes · {pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className="mt-3 text-xs text-paper-foreground/70 italic">
          ✓ Plan validé dans le groupe. RSVP envoyé aux potes.
        </p>
      )}
    </GameShell>
  );
}

/* ───────── MOOD : Film selon humeur ───────── */
function MoodGame() {
  const moods: Record<string, { film: string; why: string }> = {
    "😌 Cocon": { film: "Le Fabuleux Destin d'Amélie Poulain", why: "Douceur visuelle, narration enveloppante." },
    "😱 Frissons": { film: "Hereditary", why: "Tension lente, ambiance qui colle à la peau." },
    "🤯 Mind-blow": { film: "Everything Everywhere All at Once", why: "Multivers + émotion brute." },
    "😂 Rire": { film: "Le Grand Bain", why: "Comédie chorale, attachante." },
    "💔 Pleurer": { film: "Marriage Story", why: "Drame intime, jeu d'acteurs intense." },
  };
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <GameShell
      prompt="Choisis ton humeur du moment — le moteur RAG te sort un film."
      onReset={() => setPicked(null)}
      showReset={picked !== null}
    >
      <div className="flex flex-wrap gap-2">
        {Object.keys(moods).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setPicked(m)}
            className={`px-3 py-2 text-sm border transition-all ${
              picked === m
                ? "border-evidence bg-evidence/15 text-paper-foreground"
                : "border-paper-foreground/20 text-paper-foreground/80 hover:border-evidence/60"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      {picked && (
        <div className="mt-4 p-3 border border-evidence/40 bg-evidence/5">
          <div className="font-stamp text-[10px] tracking-[0.25em] text-evidence mb-1">
            🎬 RECOMMANDATION
          </div>
          <p className="font-serif-display text-lg text-paper-foreground">{moods[picked].film}</p>
          <p className="text-xs text-paper-foreground/70 italic mt-1">{moods[picked].why}</p>
        </div>
      )}
    </GameShell>
  );
}

/* ───────── LYRICS : Devine la chanson ───────── */
function LyricsGame() {
  const rounds = useMemo(
    () => [
      {
        snippet: "« jai demandé à la luuune… elle a rien voulu savoir »",
        choices: ["Indochine — J'ai demandé à la lune", "Téléphone — Cendrillon", "Mylène Farmer — Désenchantée"],
        answer: 0,
      },
      {
        snippet: "« les chamz elyse… au soleil sous la pluie »",
        choices: ["Stromae — Alors on danse", "Joe Dassin — Les Champs-Élysées", "Calogero — En apesanteur"],
        answer: 1,
      },
      {
        snippet: "« papaoutai, où tes papa ? »",
        choices: ["Maître Gims — Bella", "Stromae — Papaoutai", "Black M — Sur ma route"],
        answer: 1,
      },
    ],
    [],
  );
  const [r, setR] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const round = rounds[r];
  const correct = picked === round.answer;

  return (
    <GameShell
      prompt="Extrait flou intercepté — quelle chanson le RAG va identifier ?"
      onReset={() => {
        setR((r + 1) % rounds.length);
        setPicked(null);
      }}
      resetLabel="Extrait suivant"
      showReset={picked !== null}
    >
      <p className="font-serif-display italic text-paper-foreground/90 mb-3 p-3 border-l-2 border-evidence/60 bg-paper-foreground/5">
        {round.snippet}
      </p>
      <div className="space-y-2">
        {round.choices.map((c, i) => {
          const isPicked = picked === i;
          const isAnswer = i === round.answer;
          return (
            <button
              key={c}
              type="button"
              onClick={() => picked === null && setPicked(i)}
              disabled={picked !== null}
              className={`w-full text-left p-2.5 text-sm border transition-all ${
                picked === null
                  ? "border-paper-foreground/20 hover:border-evidence/60 text-paper-foreground/80"
                  : isAnswer
                    ? "border-evidence bg-evidence/15 text-paper-foreground"
                    : isPicked
                      ? "border-paper-foreground/40 bg-paper-foreground/10 text-paper-foreground/60 line-through"
                      : "border-paper-foreground/15 text-paper-foreground/50"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className="mt-3 text-xs italic text-paper-foreground/70">
          {correct ? "✓ Match sémantique : similarité ~96%." : "✗ Pas tout à fait — le RAG, lui, ne se trompe pas."}
        </p>
      )}
    </GameShell>
  );
}

/* ───────── ECOLE : Quiz éclair ───────── */
function EcoleGame() {
  const questions = [
    {
      q: "Qu'est-ce qu'une API REST ?",
      choices: [
        "Un style d'architecture basé sur HTTP et les ressources",
        "Une base de données relationnelle",
        "Un framework JavaScript",
      ],
      answer: 0,
    },
    {
      q: "Quelle complexité a une recherche binaire ?",
      choices: ["O(n)", "O(log n)", "O(n²)"],
      answer: 1,
    },
    {
      q: "À quoi sert le théorème de Bayes ?",
      choices: [
        "À calculer une probabilité conditionnelle",
        "À résoudre une équation différentielle",
        "À trier un tableau",
      ],
      answer: 0,
    },
  ];
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = questions[i];
  const done = i >= questions.length;

  if (done) {
    return (
      <GameShell
        prompt={`Quiz terminé — score final : ${score}/${questions.length}`}
        onReset={() => {
          setI(0);
          setPicked(null);
          setScore(0);
        }}
        showReset
      >
        <p className="text-sm text-paper-foreground/80">
          {score === questions.length
            ? "🏅 Sans faute — tu mérites un badge dans la plateforme."
            : score >= 2
              ? "👏 Bien joué. Encore quelques quiz et tu cartonnes."
              : "📚 Le suivi des scores te dirait de réviser un peu."}
        </p>
      </GameShell>
    );
  }

  return (
    <GameShell prompt={`Quiz d'entraînement — question ${i + 1}/${questions.length}`}>
      <p className="text-paper-foreground mb-3">{q.q}</p>
      <div className="space-y-2">
        {q.choices.map((c, idx) => {
          const isAnswer = idx === q.answer;
          const isPicked = picked === idx;
          return (
            <button
              key={c}
              type="button"
              onClick={() => {
                if (picked !== null) return;
                setPicked(idx);
                if (idx === q.answer) setScore((s) => s + 1);
              }}
              disabled={picked !== null}
              className={`w-full text-left p-2.5 text-sm border transition-all ${
                picked === null
                  ? "border-paper-foreground/20 hover:border-evidence/60 text-paper-foreground/80"
                  : isAnswer
                    ? "border-evidence bg-evidence/15 text-paper-foreground"
                    : isPicked
                      ? "border-paper-foreground/40 bg-paper-foreground/10 text-paper-foreground/60 line-through"
                      : "border-paper-foreground/15 text-paper-foreground/50"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button
          type="button"
          onClick={() => {
            setI((n) => n + 1);
            setPicked(null);
          }}
          className="mt-3 px-4 py-2 bg-evidence text-evidence-foreground font-stamp text-[10px] tracking-[0.25em]"
        >
          {i + 1 === questions.length ? "Voir mon score →" : "Question suivante →"}
        </button>
      )}
    </GameShell>
  );
}

/* ───────── MIRAKL : Score les candidats ───────── */
function MiraklGame() {
  const offer = "Senior Data Engineer — Python · Airflow · GCP · 5+ ans";
  const candidates = [
    { name: "Léa M.", stack: ["Python", "Airflow", "BigQuery", "dbt"], xp: "6 ans", score: 92 },
    { name: "Tom R.", stack: ["JavaScript", "React", "Node"], xp: "4 ans", score: 31 },
    { name: "Sami K.", stack: ["Python", "Spark", "GCP"], xp: "7 ans", score: 84 },
  ];
  const best = candidates.reduce((a, b) => (a.score > b.score ? a : b));
  const [picked, setPicked] = useState<string | null>(null);
  const correct = picked === best.name;

  return (
    <GameShell
      prompt="Sourcing IA — qui shortlister pour cette offre ?"
      onReset={() => setPicked(null)}
      showReset={picked !== null}
    >
      <div className="mb-3 p-2 border border-paper-foreground/20 bg-paper-foreground/5 text-xs font-stamp tracking-wider text-paper-foreground/80">
        📄 OFFRE · {offer}
      </div>
      <div className="space-y-2">
        {candidates.map((c) => {
          const isPicked = picked === c.name;
          const isBest = c.name === best.name;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => picked === null && setPicked(c.name)}
              disabled={picked !== null}
              className={`w-full text-left p-3 border transition-all ${
                picked === null
                  ? "border-paper-foreground/20 hover:border-evidence/60"
                  : isBest
                    ? "border-evidence bg-evidence/15"
                    : isPicked
                      ? "border-paper-foreground/40 bg-paper-foreground/10 opacity-70"
                      : "border-paper-foreground/15 opacity-60"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-serif-display text-paper-foreground">{c.name}</span>
                {picked !== null && (
                  <span className="font-stamp text-xs text-evidence">score IA : {c.score}</span>
                )}
              </div>
              <div className="text-xs text-paper-foreground/70 mt-1">
                {c.stack.join(" · ")} · {c.xp}
              </div>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className="mt-3 text-xs italic text-paper-foreground/70">
          {correct
            ? `✓ Bingo — c'est exactement la shortlist remontée par le pipeline (${best.name}, score ${best.score}).`
            : `✗ Le scoring IA aurait priorisé ${best.name} (score ${best.score}) pour ce poste.`}
        </p>
      )}
    </GameShell>
  );
}