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
    <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex gap-5 lg:gap-7">
      {items.map((it, idx) => {
        const rot = (idx % 2 ? 1 : -1) * 2.2;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`pin relative paper-bg paper-shadow px-5 py-2 text-[11px] tracking-[0.28em] font-stamp transition-all ${
              active === it.id
                ? "text-evidence"
                : "text-paper-foreground hover:text-evidence"
            }`}
            style={{ transform: `rotate(${rot}deg)` }}
          >
            {it.label}
          </a>
        );
      })}
    </nav>
  );
}