import { useState } from "react";
import { SectionHeader } from "./About";
import { CaseInvestigation } from "./CaseInvestigation";
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
  teaser: string;
  question: string;
  mystery?: string;
  built: string[];
  results?: string[];
  verdict?: string;
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
    subtitle: "⭐ Projet phare · 📱 Produit social",
    teaser: "Organiser des sorties entre amis sans en perdre une miette → App sociale",
    question:
      "Comment créer une application sociale qui simplifie réellement l'organisation de sorties entre amis ?",
    mystery:
      "Organiser une sortie entre amis implique des dizaines d'échanges sur WhatsApp, des sondages dispersés, des plans qui tombent. Comment centraliser tout ça dans une seule app fluide et moderne ?",
    built: [
      "Chat temps réel avec fil de discussion par sortie",
      "Système de votes et RSVP pour valider les plans",
      "Carte interactive avec suggestions de lieux via OpenAI",
      "Feed social, stories et système de follow entre amis",
      "Interface mobile-first, déployée via Vercel",
    ],
    verdict:
      "Architecture full-stack maîtrisée de A à Z. Vibe coding avec Cursor = vélocité maximale pour un rendu production-ready.",
    stack: ["Next.js", "Supabase", "OpenAI", "TypeScript", "Cursor"],
    accent: "oklch(0.6 0.18 25)",
    proofs: ["Démo", "Dashboard", "Capture écran", "Résultat obtenu"],
    images: [together1, together2, together3, together4],
  },
  {
    id: "mood",
    num: "02",
    title: "Mood Film Finder",
    subtitle: "🎬 Data IA · RAG · 6 500+ titres",
    teaser: "Recommander un film par humeur, pas par genre → Moteur IA",
    question:
      "Peut-on recommander un film en fonction de l'humeur d'un utilisateur plutôt que d'un simple genre ?",
    mystery:
      "Les plateformes de streaming recommandent par genre ou popularité. Mais l'humeur du moment — envie de frissons, de rires, de réflexion — transcende ces catégories. Comment créer un moteur qui pense comme un humain ?",
    built: [
      "Scraping de 6 500+ films depuis JustWatch (Python, ~15h de run)",
      "Vectorisation complète des données et architecture RAG from scratch",
      "Pipeline : humeur → vecteur → similarité cosinus → recommandation",
      "Interface interactive pour tester en live (démo intégrée)",
    ],
    verdict:
      "Recommandation émotionnelle fonctionnelle — bien au-delà du filtre par genre classique. La démo est disponible dans le portfolio.",
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
    subtitle: "🎵 NLP · RAG LLM · FAISS · 1 872 chansons",
    teaser: "Trouver une chanson depuis un extrait flou → Recherche sémantique",
    question:
      "Un agent peut-il identifier une musique depuis un extrait approximatif, partiel ou mal orthographié de paroles ?",
    mystery:
      "Musixmatch · Démo RAG. Exemples : « j'ai demandé à la lune, elle n'a rien voulu savoir » → Indochine — J'ai demandé à la lune (similarité 97%). « les chamz elyse » → Joe Dassin — Les Champs-Élysées (similarité 94%, tolérance orthographique).",
    built: [
      "Vectorisation de 1 872 chansons françaises avec OpenAI Embeddings (text-embedding-3-large)",
      "Architecture RAG : extrait flou → K voisins FAISS → réponse LLM contextuelle",
      "Interface chatbot Flask avec gestion des paroles imprécises, mal orthographiées ou partielles",
      "Recherche vectorielle via FAISS — bien plus robuste que le mot-clé classique",
    ],
    verdict:
      "La recherche sémantique surpasse le mot-clé classique. Identification réussie même avec des paroles très approximatives ou incomplètes.",
    stack: ["Python", "FAISS", "Embeddings", "OpenAI"],
    accent: "oklch(0.55 0.15 280)",
    proofs: ["Dataset", "Démo", "GitHub", "Résultat obtenu"],
    images: [lyrics1],
  },
  {
    id: "ecole",
    num: "04",
    title: "Plateforme Scolaire",
    subtitle: "Interface · UX",
    teaser: "Tout l'outillage étudiant éparpillé → Plateforme centralisée",
    question:
      "Comment centraliser tous les outils utiles aux étudiants dans une seule plateforme cohérente ?",
    mystery:
      "Les étudiants jonglent entre plusieurs outils : un agenda ici, un espace cours là, les événements de l'école ailleurs. Comment concevoir une interface unique, fluide, qui centralise tout ?",
    built: [
      "Messagerie intégrée entre élèves et professeurs",
      "Emploi du temps interactif et agenda glisser-déposer",
      "Quiz d'entraînement avec suivi des scores",
      "Événements proposés par l'école avec inscription en ligne",
      "Espace cours : PDF par matière, ressources téléchargeables",
    ],
    verdict:
      "Une plateforme unique pensée pour le quotidien étudiant, qui remplace une dizaine d'outils dispersés par un seul espace cohérent.",
    stack: ["Next.js", "Supabase", "TypeScript"],
    accent: "oklch(0.55 0.18 200)",
    proofs: ["Dashboard", "Capture écran", "Démo"],
    images: [ecole1, ecole2, ecole3, ecole4],
  },
  {
    id: "mirakl",
    num: "05",
    title: "Hackathon Mirakl",
    subtitle: "🏆 Winner · Data · Scraping IA",
    teaser: "Sourcing RH manuel et chronophage → Pipeline IA automatisé",
    question:
      "Comment automatiser la recherche de futurs candidats à partir d'une offre d'emploi ?",
    mystery:
      "Le sourcing RH est un casse-tête : parcourir LinkedIn à la main, fouiller GitHub, croiser les profils des concurrents… des heures perdues pour chaque poste. Comment transformer ce travail manuel en un pipeline data + IA capable de sortir une shortlist de candidats pertinents en quelques minutes ?",
    built: [
      "Scraping LinkedIn & GitHub pour identifier les profils pertinents selon le poste",
      "Scoring IA des candidats en fonction des compétences clés de l'offre",
      "Scraping des concurrents pour détecter les talents à recruter",
      "Interface centralisée avec profils filtrables, scorés et triés",
    ],
    results: [
      "Automatisation complète du sourcing — gain de temps majeur",
      "Visualisation claire des candidats potentiels en un coup d'œil",
    ],
    verdict:
      "🏆 Projet vainqueur du Hackathon Mirakl. Parmi toutes les équipes en lice, notre solution a été élue par le jury comme la réponse la plus pertinente et la plus aboutie au problème posé — saluée pour la qualité du pipeline data, la pertinence du scoring IA et l'exécution produit de bout en bout en moins d'une semaine.",
    stack: ["Python", "Scraping", "IA", "Dust", "n8n"],
    won: true,
    link: { label: "🔗 Voir la démo Talent AI Sage", url: "https://talent-ai-sage.vercel.app" },
    accent: "oklch(0.62 0.22 18)",
    proofs: ["🏆 1er prix", "Démo", "Dashboard", "Capture écran", "Résultat obtenu"],
    images: [mirakl1],
  },
];

export function Cases() {
  const [open, setOpen] = useState<CaseT | null>(null);
  const [investigating, setInvestigating] = useState<CaseT | null>(null);

  return (
    <section id="enquetes" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="02" title="Dossiers d'enquête" subtitle="Investigations · Cas résolus" />

        <p className="mt-8 max-w-2xl text-muted-foreground font-serif-display italic text-lg">
          Cinq dossiers. Cinq enquêtes. Chacune commence par un problème — et se termine par une solution mesurable.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {cases.map((c, i) => (
            <CaseFolder key={c.id} c={c} index={i} onOpen={() => setInvestigating(c)} />
          ))}
        </div>
      </div>

      {investigating && (
        <CaseInvestigation
          caseId={investigating.id}
          caseTitle={investigating.title}
          onClose={() => setInvestigating(null)}
          onSolved={() => {
            const c = investigating;
            setInvestigating(null);
            setOpen(c);
          }}
        />
      )}

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
      <div className="absolute -top-2 left-4 right-4 h-4 bg-paper paper-shadow rotate-[1deg]" />
      <div className="absolute -top-1 left-6 right-6 h-4 bg-[oklch(0.88_0.03_80)] paper-shadow rotate-[-1.5deg]" />

      <div className="relative kraft-bg paper-shadow p-6 pt-10 min-h-[280px] transition-all duration-500 group-hover:-translate-y-3 group-hover:rotate-[-1deg]">
        <div className="absolute -top-4 left-6 px-6 py-2 kraft-bg font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/80">
          CASE FILE
        </div>

        {c.won && (
          <div
            className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-evidence text-evidence-foreground flex items-center justify-center text-3xl paper-shadow rotate-[8deg]"
            title="Hackathon vainqueur"
          >
            🏆
          </div>
        )}

        <div className="font-stamp text-[11px] tracking-[0.3em] text-evidence mb-2">
          CASE #{c.num}
        </div>
        <h3 className="font-serif-display text-3xl text-paper-foreground leading-tight mb-2">
          {c.title}
        </h3>
        <p className="text-xs text-paper-foreground/60 mb-3 font-stamp tracking-wider">
          {c.subtitle}
        </p>

        <p className="text-sm text-paper-foreground/80 mb-4 leading-snug italic font-serif-display">
          {c.teaser}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {c.stack.slice(0, 4).map((s) => (
            <span key={s} className="px-2 py-0.5 bg-paper-foreground/10 border border-paper-foreground/20 text-paper-foreground text-[10px] font-stamp tracking-wider">
              {s}
            </span>
          ))}
        </div>

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
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-paper-foreground/10 hover:bg-evidence hover:text-evidence-foreground text-paper-foreground text-xl transition-colors z-10"
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
        <p className="text-paper-foreground/60 font-stamp text-xs tracking-[0.2em] mb-8">
          {c.subtitle}
        </p>

        {/* Question d'ouverture */}
        <div className="mb-8 border-l-4 border-evidence pl-5">
          <p className="font-serif-display italic text-xl md:text-2xl text-paper-foreground leading-snug">
            « {c.question} »
          </p>
        </div>

        {/* Mystère */}
        {c.mystery && (
          <div className="mb-8">
            <div className="font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/60 mb-3">
              🔎 LE MYSTÈRE
            </div>
            <p className="text-paper-foreground/90 leading-relaxed">
              {c.mystery}
            </p>
          </div>
        )}

        {/* Images */}
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

        {/* Construit */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/60 mb-3">
              🔧 CE QUE J'AI CONSTRUIT
            </div>
            <ul className="space-y-2 mb-8">
              {c.built.map((b, i) => (
                <li key={i} className="flex gap-3 text-paper-foreground/90 leading-relaxed">
                  <span className="text-evidence mt-1.5 flex-shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {c.results && (
              <>
                <div className="font-stamp text-[10px] tracking-[0.3em] text-paper-foreground/60 mb-3">
                  📈 RÉSULTATS
                </div>
                <ul className="space-y-2 mb-8">
                  {c.results.map((r, i) => (
                    <li key={i} className="flex gap-3 text-paper-foreground/90 leading-relaxed">
                      <span className="text-evidence mt-1.5 flex-shrink-0">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

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

        {/* Full-width blocks */}
        {c.verdict && (
          <div className="mt-8 p-5 border-2 border-evidence/40 bg-evidence/5">
            <div className="font-stamp text-[10px] tracking-[0.3em] text-evidence mb-2">
              ✅ VERDICT
            </div>
            <p className="text-paper-foreground/90 leading-relaxed">
              {c.verdict}
            </p>
          </div>
        )}

        {c.won && (
          <div className="mt-6 p-4 border-2 border-evidence/40 bg-evidence/5">
            <div className="stamp text-xs mb-2 inline-block">🏆 ENQUÊTE RÉSOLUE</div>
            <p className="text-paper-foreground/80 text-sm">
              Projet récompensé lors du Hackathon Mirakl.
            </p>
          </div>
        )}

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
