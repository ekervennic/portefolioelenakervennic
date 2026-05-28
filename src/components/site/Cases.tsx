import { useState, type ReactNode } from "react";
import { SectionHeader } from "./About";
import together1 from "@/assets/cases/together-1.png";
import together2 from "@/assets/cases/together-2.png";
import together3 from "@/assets/cases/together-3.png";
import together4 from "@/assets/cases/together-4.png";
import mood1 from "@/assets/cases/mood-1.png";
import mood2 from "@/assets/cases/mood-2.png";
import lyrics1 from "@/assets/cases/lyrics-1.png";
import ecole1 from "@/assets/cases/ecole-1.png";
import ecole2 from "@/assets/cases/ecole-2.png";
import ecole3 from "@/assets/cases/ecole-3.png";
import ecole4 from "@/assets/cases/ecole-4.png";
import mirakl1 from "@/assets/cases/mirakl-1.png";

type CaseT = {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: ReactNode;
  stack: string[];
  won?: boolean;
  link?: { label: string; url: string };
  accent: string;
  proofs: string[];
  images?: string[];
};

const cases: CaseT[] = [
  {
    id: "together",
    num: "01",
    title: "Together",
    subtitle: "Application sociale de sorties entre amis",
    description: (
      <>
        <p>
          Organiser une sortie entre amis paraît simple, mais la réalité est souvent différente :
          discussions dispersées sur plusieurs applications, sondages improvisés, lieux partagés dans
          différents groupes et décisions qui prennent du temps à être validées.
        </p>
        <p>
          <strong>Together</strong> est né de cette problématique. L'objectif était de concevoir
          une plateforme unique permettant de centraliser toute l'organisation d'une sortie :
          proposition d'activités, votes, confirmation des participants, discussions et
          recommandations de lieux.
        </p>
        <p>
          Au-delà de l'aspect technique, ce projet m'a permis de travailler sur la conception
          d'un véritable produit, en réfléchissant autant à l'expérience utilisateur qu'aux
          fonctionnalités proposées. Il représente aujourd'hui l'un de mes projets les plus complets.
        </p>
      </>
    ),
    stack: ["Next.js", "Supabase", "OpenAI", "TypeScript", "Cursor"],
    accent: "oklch(0.6 0.18 25)",
    proofs: ["Démo", "Dashboard", "Capture écran", "Résultat obtenu"],
    images: [together1, together2, together3, together4],
  },
  {
    id: "mood",
    num: "02",
    title: "Mood Film Finder",
    subtitle: "Plus de 6 500 films et séries scrapés, recommandation par l'humeur",
    description: (
      <>
        <p>
          La plupart des plateformes recommandent des films selon un genre ou des habitudes de
          visionnage. Pourtant, lorsque l'on cherche quelque chose à regarder, on recherche souvent
          avant tout une <strong>émotion</strong> : rire, réfléchir, être surpris ou simplement
          se détendre.
        </p>
        <p>
          C'est cette idée qui a donné naissance à <strong>Mood Film Finder</strong>. Pour construire
          cet outil, j'ai collecté plus de 6 500 films et séries via un important travail de scraping,
          puis mis en place une logique de recommandation reposant sur une architecture RAG et une
          base vectorielle.
        </p>
        <p>
          L'objectif n'était pas simplement de proposer des films, mais de créer une expérience capable
          de comprendre une intention ou un ressenti exprimé naturellement par un utilisateur et de
          transformer cette émotion en recommandation pertinente.
        </p>
      </>
    ),
    stack: ["Python", "Scraping", "RAG", "IA"],
    link: { label: "🎬 Tester l'expérience Mood Match", url: "https://vibe-select-recs.lovable.app/match" },
    accent: "oklch(0.55 0.2 320)",
    proofs: ["Dataset (6 500+ titres)", "Démo", "Capture écran", "Résultat obtenu"],
    images: [mood1, mood2],
  },
  {
    id: "lyrics",
    num: "03",
    title: "Chatbot Paroles",
    subtitle: "Retrouver une chanson à partir de paroles approximatives",
    description: (
      <>
        <p>
          Il nous est tous déjà arrivé de nous souvenir d'une chanson sans parvenir à retrouver
          son titre. Souvent, seules quelques paroles approximatives restent en mémoire, parfois
          avec des erreurs ou des oublis.
        </p>
        <p>
          Ce projet répond à cette problématique grâce à une architecture <strong>RAG</strong>{" "}
          combinant embeddings, recherche vectorielle et génération assistée par LLM. L'utilisateur
          peut saisir un fragment de paroles, même imprécis, et le système identifie la chanson
          la plus probable.
        </p>
        <p>
          L'enjeu principal était de dépasser la simple recherche par mots-clés pour permettre
          une véritable <strong>compréhension sémantique</strong> des requêtes et améliorer
          considérablement la qualité des résultats.
        </p>
      </>
    ),
    stack: ["Python", "FAISS", "Embeddings", "OpenAI"],
    accent: "oklch(0.55 0.15 280)",
    proofs: ["Dataset", "Démo", "GitHub", "Résultat obtenu"],
    images: [lyrics1],
  },
  {
    id: "ecole",
    num: "04",
    title: "Plateforme Scolaire",
    subtitle: "Centraliser cours, agenda, quiz, événements et messagerie",
    description: (
      <>
        <p>
          Les étudiants utilisent aujourd'hui une multitude d'outils différents pour accéder à
          leurs cours, consulter leur emploi du temps, échanger avec leurs enseignants ou suivre
          leurs évaluations.
        </p>
        <p>
          Cette dispersion nuit souvent à la lisibilité et à l'expérience utilisateur. J'ai donc
          imaginé une <strong>plateforme</strong> capable de centraliser l'ensemble de ces
          fonctionnalités au sein d'un espace unique, cohérent et simple à utiliser.
        </p>
        <p>
          Ce projet m'a permis de travailler sur la réflexion produit et l'expérience utilisateur,
          en cherchant à répondre à un <strong>besoin réel</strong> observé dans le quotidien
          étudiant plutôt qu'à un simple exercice technique.
        </p>
      </>
    ),
    stack: ["Next.js", "Supabase", "TypeScript"],
    accent: "oklch(0.55 0.18 200)",
    proofs: ["Dashboard", "Capture écran", "Démo"],
    images: [ecole1, ecole2, ecole3, ecole4],
  },
  {
    id: "mirakl",
    num: "05",
    title: "Hackathon Mirakl",
    subtitle: "Projet gagnant — pipeline IA de bout en bout",
    description: (
      <>
        <p>
          Dans le cadre du Hackathon Mirakl, notre équipe disposait de <strong>moins de 48 heures</strong>{" "}
          pour analyser une problématique métier, imaginer une solution et développer un prototype
          fonctionnel.
        </p>
        <p>
          Nous avons choisi de travailler sur l'<strong>automatisation du sourcing de candidats</strong>{" "}
          en combinant scraping, intelligence artificielle et automatisation no-code. L'objectif était
          de réduire le temps nécessaire à l'identification de profils pertinents tout en améliorant
          la qualité des résultats proposés.
        </p>
        <p>
          Ce projet m'a particulièrement marqué car il a demandé de prendre des décisions rapidement,
          de collaborer efficacement en équipe et de transformer une idée en solution concrète sous
          une forte contrainte de temps. Notre approche a finalement été récompensée par la{" "}
          <strong>première place</strong> du hackathon.
        </p>
      </>
    ),
    stack: ["Python", "Scraping", "IA", "Dust", "n8n"],
    won: true,
    accent: "oklch(0.62 0.22 18)",
    proofs: ["🏆 1er prix", "Démo", "Dashboard", "Capture écran", "Résultat obtenu"],
    images: [mirakl1],
  },
];

export function Cases() {
  const [open, setOpen] = useState<CaseT | null>(null);

  return (
    <section id="enquetes" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="02" title="Dossiers d'enquête" subtitle="Investigations · Cas résolus" />

        <p className="mt-8 max-w-2xl text-muted-foreground font-serif-display italic text-lg">
          Cinq dossiers. Cinq enquêtes. Chacune commence par un problème — et se termine par une solution mesurable.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {cases.map((c, i) => (
            <CaseFolder key={c.id} c={c} index={i} onOpen={() => setOpen(c)} />
          ))}
        </div>
      </div>

      {open && <CaseModal c={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function CaseFolder({ c, index, onOpen }: { c: CaseT; index: number; onOpen: () => void }) {
  const rotate = ((index % 3) - 1) * 1.5;
  return (
    <button
      onClick={onOpen}
      className="group relative text-left"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Papers peeking */}
      <div className="absolute -top-2 left-4 right-4 h-4 bg-paper paper-shadow rotate-[1deg]" />
      <div className="absolute -top-1 left-6 right-6 h-4 bg-[oklch(0.88_0.03_80)] paper-shadow rotate-[-1.5deg]" />

      {/* Folder body */}
      <div className="relative kraft-bg paper-shadow p-6 pt-10 min-h-[280px] transition-all duration-500 group-hover:-translate-y-3 group-hover:rotate-[-1deg]">
        {/* Tab */}
        <div className="absolute -top-4 left-6 px-6 py-2 kraft-bg font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/80">
          CASE FILE
        </div>

        <div className="font-stamp text-[11px] tracking-[0.3em] text-evidence mb-2">
          CASE #{c.num}
        </div>
        <h3 className="font-serif-display text-3xl text-paper-foreground leading-tight mb-3">
          {c.title}
        </h3>
        <p className="text-sm text-paper-foreground/75 mb-5 leading-relaxed">
          {c.subtitle}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {c.stack.slice(0, 4).map((s) => (
            <span key={s} className="px-2 py-0.5 bg-paper-foreground/10 border border-paper-foreground/20 text-paper-foreground text-[10px] font-stamp tracking-wider">
              {s}
            </span>
          ))}
        </div>

        {/* Stamps */}
        <div className="absolute bottom-4 right-4 stamp text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
          Ouvrir →
        </div>
      </div>
    </button>
  );
}

function CaseModal({ c, onClose }: { c: CaseT; onClose: () => void }) {
  const [zoom, setZoom] = useState<string | null>(null);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto paper-bg paper-shadow p-8 md:p-12 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-paper-foreground/10 hover:bg-evidence hover:text-evidence-foreground text-paper-foreground text-xl transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="font-stamp text-[11px] tracking-[0.3em] text-evidence mb-3">
          CASE #{c.num} — DOSSIER COMPLET
        </div>
        <h2 className="font-serif-display text-5xl text-paper-foreground leading-tight mb-2">
          {c.title}
        </h2>
        <p className="text-paper-foreground/70 italic font-serif-display text-lg mb-8">
          {c.subtitle}
        </p>

        {c.images && c.images.length > 0 && (
          <div className="mb-8">
            <div className="font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/60 mb-3">
              PIÈCES VISUELLES
            </div>
            <div className={`grid gap-3 ${c.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
              {c.images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setZoom(src)}
                  className="group relative bg-paper-foreground/5 border border-paper-foreground/20 p-2 paper-shadow hover:border-evidence transition-colors cursor-zoom-in"
                  style={{ transform: `rotate(${((i % 2) - 0.5) * 0.6}deg)` }}
                >
                  <img
                    src={src}
                    alt={`${c.title} — pièce ${i + 1}`}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute bottom-3 right-3 font-stamp text-[9px] tracking-[0.25em] bg-paper-foreground/80 text-paper px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗ AGRANDIR
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/60 mb-3">
              RAPPORT
            </div>
            <p className="text-paper-foreground/90 leading-relaxed mb-6">{c.description}</p>

            {c.link && (
              <a
                href={c.link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-6 py-3 bg-evidence text-evidence-foreground font-stamp text-sm tracking-[0.2em] noir-shadow hover:translate-y-[-2px] transition-transform"
              >
                {c.link.label}
              </a>
            )}

            {c.won && (
              <div className="mt-6 p-4 border-2 border-evidence/40 bg-evidence/5">
                <div className="stamp text-xs mb-2 inline-block">🏆 ENQUÊTE RÉSOLUE</div>
                <p className="text-paper-foreground/80 text-sm">
                  Projet récompensé lors du Hackathon Mirakl. Photo de l'équipe gagnante archivée au dossier.
                </p>
              </div>
            )}

            {/* Preuves collectées */}
            <div className="mt-8 pt-6 border-t border-dashed border-paper-foreground/25">
              <div className="flex items-center gap-3 mb-4">
                <div className="stamp text-[10px]">PREUVES COLLECTÉES</div>
                <div className="flex-1 h-px bg-paper-foreground/15" />
                <span className="font-stamp text-[9px] tracking-[0.25em] text-paper-foreground/50">
                  {c.proofs.length} pièces
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.proofs.map((p, i) => (
                  <span
                    key={p}
                    className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper-foreground/5 border border-evidence/40 text-paper-foreground text-xs font-stamp tracking-[0.1em]"
                    style={{ transform: `rotate(${((i % 3) - 1) * 0.8}deg)` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-evidence" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/60 mb-3">
              ARSENAL
            </div>
            <ul className="space-y-2">
              {c.stack.map((s) => (
                <li key={s} className="flex items-baseline gap-2 text-paper-foreground text-sm">
                  <span className="text-evidence">▸</span>
                  <span className="font-stamp tracking-wider">{s}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="absolute bottom-6 right-12 stamp text-sm">
          Confidentiel
        </div>
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-background/95 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            e.stopPropagation();
            setZoom(null);
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoom(null);
            }}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-paper-foreground/10 hover:bg-evidence hover:text-evidence-foreground text-paper text-xl transition-colors z-10"
            aria-label="Fermer"
          >
            ✕
          </button>
          <img
            src={zoom}
            alt="Pièce agrandie"
            className="max-w-full max-h-full object-contain paper-shadow animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}