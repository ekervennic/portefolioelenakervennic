import { useState } from "react";
import { SectionHeader } from "./About";

type Node = { id: string; name: string; cat: string; x: number; y: number };

// Coordinates are in a 1000x620 viewBox — we scale the cards to match.
const nodes: Node[] = [
  { id: "python",   name: "Python",          cat: "Langage",        x: 200, y: 150 },
  { id: "js",       name: "JavaScript",      cat: "Langage",        x:  90, y: 360 },
  { id: "ts",       name: "TypeScript",      cat: "Langage",        x: 920, y: 200 },
  { id: "scraping", name: "Scraping",        cat: "Collecte",       x: 360, y:  90 },
  { id: "rag",      name: "RAG",             cat: "IA",             x: 260, y: 520 },
  { id: "dataiku",  name: "Dataiku",         cat: "Plateforme",     x: 460, y: 300 },
  { id: "openai",   name: "OpenAI",          cat: "IA",             x: 620, y: 150 },
  { id: "dust",     name: "Dust",            cat: "Agents",         x: 820, y: 320 },
  { id: "n8n",      name: "n8n",             cat: "Automatisation", x: 900, y: 520 },
  { id: "agents",   name: "Agents LLM",      cat: "IA",             x: 700, y: 460 },
  { id: "make",     name: "Make",            cat: "Automatisation", x: 540, y: 620 },
  { id: "tableau",  name: "Tableau",         cat: "BI",             x: 120, y: 620 },
  { id: "powerbi",  name: "Power BI",        cat: "BI",             x: 740, y:  80 },
  { id: "dataviz",  name: "DataViz",         cat: "Analyse",        x: 380, y: 720 },
  { id: "piano",    name: "Piano Analytics", cat: "Analytics",      x: 880, y: 660 },
  { id: "tagco",    name: "Tag Commander",   cat: "Tracking",       x: 600, y: 760 },
  { id: "sql",      name: "SQL",             cat: "Données",        x: 160, y: 760 },
  { id: "next",     name: "Next.js",         cat: "Web",            x: 500, y: 440 },
  { id: "supa",     name: "Supabase",        cat: "Backend",        x: 820, y: 760 },
  { id: "html",     name: "HTML / CSS",      cat: "Web",            x: 340, y: 220 },
];

const links: [string, string][] = [
  ["python", "scraping"], ["python", "rag"], ["python", "dataiku"], ["python", "sql"],
  ["js", "html"], ["js", "ts"], ["js", "next"],
  ["openai", "dust"], ["openai", "n8n"], ["openai", "agents"], ["openai", "rag"],
  ["tableau", "powerbi"], ["tableau", "dataviz"], ["powerbi", "dataviz"],
  ["next", "supa"], ["next", "ts"], ["html", "next"],
  ["dataiku", "dataviz"], ["agents", "n8n"], ["make", "n8n"], ["make", "agents"],
  ["piano", "tagco"], ["piano", "dataviz"], ["tagco", "html"], ["piano", "powerbi"],
  ["sql", "dataiku"], ["sql", "powerbi"],
];

export function Stack() {
  const [active, setActive] = useState<string | null>(null);

  const isLinked = (a: string, b: string) =>
    active != null && (a === active || b === active);

  const isNodeLit = (id: string) =>
    active === id || (active != null && links.some(([a, b]) => (a === active && b === id) || (b === active && a === id)));

  return (
    <section id="stack" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader number="01" title="Tableau d'investigation" subtitle="Arsenal · Compétences reliées" />

        <div className="relative mt-10 paper-shadow rounded-sm border border-evidence/20 bg-[radial-gradient(circle_at_20%_10%,oklch(0.22_0.03_25/0.6),transparent_60%),radial-gradient(circle_at_80%_90%,oklch(0.2_0.04_20/0.7),transparent_55%)] bg-card overflow-hidden">
          {/* Cork-like texture */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(oklch(0.7 0.1 60) 1px, transparent 1px), radial-gradient(oklch(0.6 0.1 50) 1px, transparent 1px)",
              backgroundSize: "14px 14px, 22px 22px",
              backgroundPosition: "0 0, 7px 11px",
            }}
          />
          <CornerStamps />

          <div className="relative aspect-[1000/820] w-full">
            {/* Threads */}
            <svg
              viewBox="0 0 1000 820"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              {links.map(([a, b], i) => {
                const na = nodes.find((n) => n.id === a)!;
                const nb = nodes.find((n) => n.id === b)!;
                const lit = isLinked(a, b);
                return (
                  <line
                    key={i}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    className={`thread ${lit ? "thread-on" : ""}`}
                    stroke="oklch(0.62 0.22 18)"
                    strokeOpacity={lit ? 1 : 0.35}
                    strokeWidth={lit ? 2.4 : 1.2}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((n, i) => {
              const lit = isNodeLit(n.id);
              const dim = active != null && !lit;
              const rot = ((i % 5) - 2) * 1.2;
              return (
                <button
                  key={n.id}
                  type="button"
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(n.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((p) => (p === n.id ? null : n.id))}
                  className={`pin absolute paper-bg paper-shadow px-3 py-2 pt-4 text-left transition-all duration-300 ${
                    dim ? "opacity-40" : "opacity-100"
                  } ${lit ? "scale-110 z-20 ring-2 ring-evidence" : "z-10 hover:-translate-y-0.5"}`}
                  style={{
                    left: `${(n.x / 1000) * 100}%`,
                    top: `${(n.y / 820) * 100}%`,
                    transform: `translate(-50%, -50%) rotate(${rot}deg)`,
                    minWidth: 96,
                  }}
                >
                  <div className="font-serif-display text-base md:text-lg leading-none text-paper-foreground">
                    {n.name}
                  </div>
                  <div className="font-stamp text-[8px] md:text-[9px] tracking-[0.2em] text-evidence uppercase mt-0.5">
                    {n.cat}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

function CornerStamps() {
  return (
    <>
      <div className="absolute top-3 left-3 font-stamp text-[9px] tracking-[0.3em] text-evidence/70">
        BOARD 01 — ARSENAL
      </div>
      <div className="absolute top-3 right-3 font-stamp text-[9px] tracking-[0.3em] text-muted-foreground">
        EVIDENCE MAP
      </div>
      <div className="absolute bottom-3 right-3 stamp text-[9px]">VÉRIFIÉ</div>
    </>
  );
}