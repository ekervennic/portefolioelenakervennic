import { useState, useEffect } from "react";

const items = [
  { id: "moi", label: "MOI" },
  { id: "stack", label: "STACK" },
  { id: "enquetes", label: "ENQUÊTES" },
  { id: "dataviz", label: "DATAVIZ" },
  { id: "contact", label: "CONTACT" },
];

export function Nav() {
  const [active, setActive] = useState("moi");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 hidden md:flex gap-2 px-3 py-2 rounded-full backdrop-blur-md bg-background/60 border border-border/60 noir-shadow">
      {items.map((it, idx) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={`relative px-4 py-1.5 text-[11px] tracking-[0.18em] font-stamp transition-all rounded-sm ${
            active === it.id
              ? "bg-evidence text-evidence-foreground"
              : "text-foreground/70 hover:text-foreground"
          }`}
          style={{ transform: `rotate(${(idx % 2 ? 1 : -1) * 1.2}deg)` }}
        >
          {it.label}
        </a>
      ))}
    </nav>
  );
}