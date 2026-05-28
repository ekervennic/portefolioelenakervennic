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
    <section id="stack" className="relative py-12 md:py-16 px-4">
      <div className="max-w-[1500px] mx-auto">
        <SectionHeader number="01" title="Tableau d'investigation" subtitle="Arsenal · Compétences reliées" />

        {/* Wooden frame */}
        <div
          className="relative mt-10 p-3 md:p-5 rounded-md overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.38 0.06 50) 0%, oklch(0.28 0.05 45) 50%, oklch(0.42 0.07 55) 100%)",
            boxShadow:
              "0 30px 60px -20px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.12), inset 0 -2px 0 rgba(0,0,0,0.35)",
          }}
        >
          {/* Wood grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60 mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(92deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(88deg, rgba(255,220,180,0.08) 0px, rgba(255,220,180,0.08) 2px, transparent 2px, transparent 9px)",
            }}
          />

          {/* Cork board inside the frame */}
          <div
            className="relative rounded-sm overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, oklch(0.68 0.09 65) 0%, oklch(0.55 0.09 55) 60%, oklch(0.48 0.08 50) 100%)",
              boxShadow:
                "inset 0 0 60px rgba(0,0,0,0.45), inset 0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            {/* Cork speckle */}
            <div
              className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(60,30,10,0.55) 1px, transparent 1.6px), radial-gradient(rgba(40,20,8,0.4) 1px, transparent 1.4px), radial-gradient(rgba(120,70,30,0.3) 1px, transparent 1.2px)",
                backgroundSize: "9px 9px, 14px 14px, 22px 22px",
                backgroundPosition: "0 0, 4px 6px, 11px 3px",
              }}
            />
            <CornerStamps />

            <div className="relative aspect-[1600/680] w-full">
            {/* Red thread */}
            <svg
              viewBox="0 0 1000 820"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="threadShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" />
                  <feOffset dx="0.6" dy="1.4" result="off" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.55" /></feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
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
                    stroke="#c4242b"
                    strokeOpacity={lit ? 1 : 0.85}
                    strokeWidth={lit ? 3.2 : 2}
                    strokeLinecap="round"
                    filter="url(#threadShadow)"
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
                  {/* Red push pin */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full z-10"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, #ff8a8a 0%, #d62b2b 45%, #7a1313 100%)",
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.5), inset -1px -1px 2px rgba(0,0,0,0.4), inset 1px 1px 1.5px rgba(255,255,255,0.55)",
                    }}
                  />
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