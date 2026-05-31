import { useState } from "react";
import { SectionHeader } from "./About";
import { useIsMobile } from "@/hooks/use-mobile";

type Node = { id: string; name: string; cat: string; x: number; y: number; mx: number; my: number };

// Desktop coordinates are in a 1000x560 viewBox — mobile keeps its own taller layout.
const nodes: Node[] = [
  { id: "python", name: "Python", cat: "Langage", x: 200, y: 120, mx: 180, my: 90 },
  { id: "js", name: "JavaScript", cat: "Langage", x: 90, y: 260, mx: 90, my: 230 },
  { id: "ts", name: "TypeScript", cat: "Langage", x: 920, y: 130, mx: 470, my: 140 },
  { id: "scraping", name: "Scraping", cat: "Collecte", x: 360, y: 70, mx: 420, my: 60 },
  { id: "rag", name: "RAG", cat: "IA", x: 260, y: 370, mx: 130, my: 540 },
  { id: "dataiku", name: "Dataiku", cat: "Plateforme", x: 460, y: 235, mx: 300, my: 380 },
  { id: "openai", name: "OpenAI", cat: "IA", x: 620, y: 125, mx: 320, my: 210 },
  { id: "dust", name: "Dust", cat: "Agents", x: 820, y: 245, mx: 480, my: 320 },
  { id: "n8n", name: "n8n", cat: "Automatisation", x: 900, y: 365, mx: 490, my: 480 },
  { id: "agents", name: "Agents LLM", cat: "IA", x: 700, y: 335, mx: 330, my: 460 },
  { id: "make", name: "Make", cat: "Automatisation", x: 540, y: 435, mx: 200, my: 660 },
  { id: "tableau", name: "Tableau", cat: "BI", x: 120, y: 430, mx: 100, my: 760 },
  { id: "powerbi", name: "Power BI", cat: "BI", x: 740, y: 70, mx: 470, my: 60 },
  { id: "dataviz", name: "DataViz", cat: "Analyse", x: 380, y: 495, mx: 320, my: 780 },
  { id: "piano", name: "Piano Analytics", cat: "Analytics", x: 880, y: 465, mx: 490, my: 880 },
  { id: "tagco", name: "Tag Commander", cat: "Tracking", x: 600, y: 510, mx: 470, my: 1020 },
  { id: "sql", name: "SQL", cat: "Données", x: 160, y: 515, mx: 110, my: 920 },
  { id: "next", name: "Next.js", cat: "Web", x: 500, y: 335, mx: 310, my: 580 },
  { id: "supa", name: "Supabase", cat: "Backend", x: 820, y: 515, mx: 310, my: 1050 },
  { id: "html", name: "HTML / CSS", cat: "Web", x: 340, y: 180, mx: 230, my: 150 },
];

const links: [string, string][] = [
  ["python", "scraping"],
  ["python", "rag"],
  ["python", "dataiku"],
  ["python", "sql"],
  ["js", "html"],
  ["js", "ts"],
  ["js", "next"],
  ["openai", "dust"],
  ["openai", "n8n"],
  ["openai", "agents"],
  ["openai", "rag"],
  ["tableau", "powerbi"],
  ["tableau", "dataviz"],
  ["powerbi", "dataviz"],
  ["next", "supa"],
  ["next", "ts"],
  ["html", "next"],
  ["dataiku", "dataviz"],
  ["agents", "n8n"],
  ["make", "n8n"],
  ["make", "agents"],
  ["piano", "tagco"],
  ["piano", "dataviz"],
  ["tagco", "html"],
  ["piano", "powerbi"],
  ["sql", "dataiku"],
  ["sql", "powerbi"],
];

export function Stack() {
  const [active, setActive] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const isLinked = (a: string, b: string) => active != null && (a === active || b === active);

  const isNodeLit = (id: string) =>
    active === id ||
    (active != null &&
      links.some(([a, b]) => (a === active && b === id) || (b === active && a === id)));

  return (
    <section id="stack" className="relative py-10 md:py-8 px-4">
      <div className="max-w-[1180px] mx-auto">
        <SectionHeader
          number="01"
          title="Tableau d'investigation"
          subtitle="Arsenal · Compétences reliées"
        />

        {/* Wooden frame */}
        <div
          className="relative mt-6 p-4 md:p-4 rounded-lg overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.32 0.07 40) 0%, oklch(0.22 0.06 35) 45%, oklch(0.36 0.08 45) 100%)",
            boxShadow:
              "0 40px 80px -20px rgba(0,0,0,0.75), inset 0 3px 0 rgba(255,200,150,0.18), inset 0 -3px 0 rgba(0,0,0,0.5), inset 4px 0 6px rgba(0,0,0,0.35), inset -4px 0 6px rgba(0,0,0,0.35)",
          }}
        >
          {/* Wood grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-70 mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(91deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(89deg, rgba(255,210,160,0.1) 0px, rgba(255,210,160,0.1) 2px, transparent 2px, transparent 11px), radial-gradient(ellipse at 20% 30%, rgba(0,0,0,0.3), transparent 60%)",
            }}
          />

          {/* Cork board inside the frame */}
          <div
            className="relative rounded-sm overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.58 0.16 28) 0%, oklch(0.42 0.15 25) 45%, oklch(0.32 0.12 22) 100%)",
              boxShadow:
                "inset 0 0 100px rgba(0,0,0,0.7), inset 0 3px 12px rgba(0,0,0,0.5), inset 0 -3px 12px rgba(0,0,0,0.55)",
            }}
          >
            {/* Cork speckle */}
            <div
              className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(30,10,5,0.65) 1px, transparent 1.6px), radial-gradient(rgba(20,8,4,0.5) 1px, transparent 1.4px), radial-gradient(rgba(90,40,20,0.35) 1px, transparent 1.2px)",
                backgroundSize: "9px 9px, 14px 14px, 22px 22px",
                backgroundPosition: "0 0, 4px 6px, 11px 3px",
              }}
            />
            {/* Top spotlight */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 70% at 50% -10%, rgba(255,235,200,0.28) 0%, rgba(255,220,180,0.12) 30%, transparent 65%)",
                mixBlendMode: "screen",
              }}
            />
            {/* Dust particles */}
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,240,210,0.8) 0.5px, transparent 1px), radial-gradient(circle, rgba(255,240,210,0.6) 0.5px, transparent 1px)",
                backgroundSize: "120px 140px, 200px 180px",
                backgroundPosition: "20px 30px, 80px 60px",
              }}
            />
            <CornerStamps />

            {isMobile ? (
              <div className="relative w-full" style={{ aspectRatio: "600 / 1140" }}>
                <svg
                  viewBox="0 0 600 1140"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="threadShadowM" x="-10%" y="-10%" width="120%" height="120%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                      <feOffset dx="0.5" dy="1.2" result="off" />
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.55" />
                      </feComponentTransfer>
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
                        x1={na.mx}
                        y1={na.my}
                        x2={nb.mx}
                        y2={nb.my}
                        className={`thread ${lit ? "thread-on" : ""}`}
                        stroke="#e63946"
                        strokeOpacity={lit ? 1 : 0.85}
                        strokeWidth={lit ? 3 : 2}
                        strokeLinecap="round"
                        filter="url(#threadShadowM)"
                      />
                    );
                  })}
                </svg>

                {nodes.map((n, i) => {
                  const lit = isNodeLit(n.id);
                  const dim = active != null && !lit;
                  const rot = ((i % 5) - 2) * 1.4;
                  return (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setActive((p) => (p === n.id ? null : n.id))}
                      className={`pin absolute paper-bg paper-shadow px-2 py-1.5 pt-3 text-left transition-all duration-300 ${
                        dim ? "opacity-50" : "opacity-100"
                      } ${lit ? "scale-110 z-20 ring-2 ring-evidence" : "z-10"}`}
                      style={{
                        left: `${(n.mx / 600) * 100}%`,
                        top: `${(n.my / 1140) * 100}%`,
                        transform: `translate(-50%, -50%) rotate(${rot}deg)`,
                        minWidth: 80,
                      }}
                    >
                      <span
                        aria-hidden
                        className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, #ff8a8a 0%, #d62b2b 45%, #7a1313 100%)",
                          boxShadow:
                            "0 1px 2px rgba(0,0,0,0.5), inset -1px -1px 2px rgba(0,0,0,0.4), inset 1px 1px 1.5px rgba(255,255,255,0.55)",
                        }}
                      />
                      <div className="font-serif-display text-[13px] leading-none text-paper-foreground">
                        {n.name}
                      </div>
                      <div className="font-stamp text-[8px] tracking-[0.18em] text-evidence uppercase mt-0.5">
                        {n.cat}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="relative w-full" style={{ aspectRatio: "1000 / 560" }}>
                {/* Red thread */}
                <svg
                  viewBox="0 0 1000 560"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="threadShadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" />
                      <feOffset dx="0.6" dy="1.4" result="off" />
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.55" />
                      </feComponentTransfer>
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
                        stroke="#e63946"
                        strokeOpacity={lit ? 1 : 0.9}
                        strokeWidth={lit ? 4 : 2.6}
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
                      className={`pin absolute paper-bg paper-shadow px-1.5 py-1 pt-2.5 text-left transition-all duration-300 ${
                        dim ? "opacity-40" : "opacity-100"
                      } ${lit ? "scale-110 z-20 ring-2 ring-evidence" : "z-10 hover:-translate-y-0.5"}`}
                      style={{
                        left: `${(n.x / 1000) * 100}%`,
                        top: `${(n.y / 560) * 100}%`,
                        transform: `translate(-50%, -50%) rotate(${rot}deg)`,
                        minWidth: 66,
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
                      <div className="font-serif-display text-[11px] md:text-xs leading-none text-paper-foreground">
                        {n.name}
                      </div>
                      <div className="font-stamp text-[7px] tracking-[0.14em] text-evidence uppercase mt-0.5">
                        {n.cat}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
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
