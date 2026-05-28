import { useState, useRef, useEffect } from "react";
import elena from "@/assets/elena-avatar.jpg";

type Msg = { role: "user" | "bot"; text: string };

const intro: Msg = {
  role: "bot",
  text: "Bonjour, ici Elena 👋 Je peux vous parler de mon parcours, mes compétences, mes projets, mon alternance à la FDJ, le hackathon Mirakl, ou comment me contacter. Que voulez-vous explorer ?",
};

type Intent = { keywords: RegExp; answer: string; weight?: number };

const intents: Intent[] = [
  {
    keywords: /(qui (es|est)|présent|toi(-| )même|parle.*toi|ton parcours|c'est qui|about ?you)/,
    answer:
      "Je suis Elena Kervennic, étudiante en Data & Intelligence Artificielle. Je construis des projets concrets qui mêlent analyse de données, IA et produit, parce que j'aime comprendre un problème puis le transformer en solution utile. En parallèle, je suis en alternance à la FDJ dans le service data.",
  },
  {
    keywords: /(fdj|alternance|alternant|entreprise|boulot|travail actuel|service data)/,
    answer:
      "Je réalise mon alternance à la FDJ au sein du service data. Cela me permet de découvrir comment les données sont collectées, structurées et analysées dans un environnement professionnel, tout en développant mes compétences sur des problématiques réelles. C'est un terrain idéal pour relier la théorie de mes études à des cas concrets.",
  },
  {
    keywords: /(pourquoi.*data|aimes.*data|choisi.*data|attire.*données|passion.*data)/,
    answer:
      "La data me fascine parce qu'elle raconte des histoires concrètes. Derrière chaque tableau, il y a un comportement, une tendance, une décision à éclairer. J'aime ce moment où une donnée brute devient une information utile qui change la façon de voir un problème.",
    weight: 2,
  },
  {
    keywords: /(pourquoi.*ia|pourquoi.*intelligence|aimes.*ia|choisi.*ia|passion.*ia)/,
    answer:
      "L'IA m'attire parce qu'elle prolonge naturellement la data : on passe de l'analyse à la création d'outils qui interagissent avec l'utilisateur. Ce qui me motive, c'est de concevoir des systèmes capables d'apporter une vraie valeur, comme un chatbot, un moteur de recommandation ou un assistant intelligent.",
    weight: 2,
  },
  {
    keywords: /(qu'aimes|ce que tu aimes|ce qui te plaît|ce qui te motive|passion|hobbie)/,
    answer:
      "J'aime particulièrement travailler sur des projets qui mélangent data, IA et produit. Ce qui me motive, c'est comprendre un problème, explorer les données puis construire une solution concrète qui apporte de la valeur. J'aime aussi apprendre en faisant : chaque projet est une nouvelle excuse pour tester une techno ou une approche.",
  },
  {
    keywords: /(projet préféré|préfères|favori|meilleur projet|projet que tu aimes)/,
    answer:
      "Probablement Together. C'est le projet le plus complet que j'ai réalisé car il combine réflexion produit, développement, expérience utilisateur et intelligence artificielle dans une seule application. C'est celui où j'ai le plus appris à arbitrer entre vision, design et contraintes techniques.",
    weight: 3,
  },
  {
    keywords: /(plus appris|appris le plus|projet formateur|formé|enseigné)/,
    answer:
      "Le projet qui m'a le plus appris, c'est Mood Film Finder. J'y ai construit une architecture RAG complète, du scraping de plus de 6500 titres jusqu'à la recommandation par émotion. Il m'a obligée à comprendre chaque brique : données, modèles, prompt, interface — et à les faire tenir ensemble.",
    weight: 3,
  },
  {
    keywords: /(comment.*appris|autodidacte|formation|étudié|apprentissage|école|cursus)/,
    answer:
      "Beaucoup en pratiquant. Mes études m'ont donné les fondations, mais la majorité de ce que je sais vient de projets personnels, de hackathons et de mon alternance. J'apprends mieux quand j'ai un objectif concret à atteindre, donc je choisis souvent une nouvelle techno en démarrant un projet autour.",
  },
  {
    keywords: /(pourquoi.*portfolio|but.*portfolio|ce site|raison.*portfolio)/,
    answer:
      "Ce portfolio sert à rassembler mes projets, mon parcours et ma manière de penser au même endroit. Je voulais quelque chose qui me ressemble — propre, lisible, avec une vraie identité — plutôt qu'un simple CV. C'est aussi un projet en soi, qui montre comment je conçois une expérience de bout en bout.",
  },
  {
    keywords: /(défi|challenge|difficile|plus dur|obstacle)/,
    answer:
      "Mon plus gros défi a sans doute été le hackathon Mirakl : moins d'une semaine pour livrer une solution complète, dans une équipe qu'on découvre, avec une vraie pression de résultat. Il a fallu arbitrer vite, déléguer, et accepter de ne pas tout faire parfaitement. Au final, c'est cette intensité qui rend l'apprentissage si fort.",
  },
  {
    keywords: /(opportunité|recherche|cherche|stage|alternance future|poste|cdi|emploi|job)/,
    answer:
      "Je suis ouverte à des opportunités autour de la data, de l'IA et du produit, dans des environnements où l'on cherche à créer de la valeur concrète avec la donnée. J'aime les équipes où l'on peut à la fois analyser, prototyper et discuter avec les utilisateurs. La meilleure façon d'en parler reste la section Contact en bas de page.",
  },
  {
    keywords: /(objectif|ambition|long terme|projection|carrière|professionnel)/,
    answer:
      "Mon objectif est de devenir une professionnelle capable de relier la data, l'IA et le produit. Je veux pouvoir analyser un sujet, concevoir une solution intelligente et la transformer en outil utilisable. À terme, j'aimerais piloter des projets qui ont un vrai impact, à la croisée de la technique et du métier.",
  },
  {
    keywords: /(hackathon|mirakl|semaine|gagné|gagnée|première place)/,
    answer:
      "J'ai participé au hackathon Mirakl parce que j'aime les formats intenses où l'on doit transformer une idée en solution concrète en très peu de temps. Avec mon équipe, on a livré une plateforme de sourcing de candidats mêlant scraping, IA et automatisation no-code — ce qui nous a valu la première place. C'est l'expérience qui m'a le plus appris sur le travail d'équipe sous contrainte.",
    weight: 2,
  },
  {
    keywords: /(compétence|stack|skill|outil|techno|technique|maîtrise|langage)/,
    answer:
      "Côté data : Python, SQL, Tableau, Power BI, Dataiku. Côté IA : OpenAI, RAG, Dust. Côté automatisation : Make, n8n, Airtable. Et pour le web : Next.js, Supabase, TypeScript. Plus que les outils, ce qui compte pour moi c'est de choisir le bon pour chaque problème.",
  },
  {
    keywords: /(projet|case|enquête|dossier|réalisation|portfolio)/,
    answer:
      "Mes projets principaux sont Together, Mood Film Finder, Chatbot Paroles, la Plateforme Scolaire et le Hackathon Mirakl. Chacun explore un angle différent : produit, IA, RAG, expérience utilisateur ou intensité d'équipe. Tu peux cliquer sur chaque dossier pour ouvrir le détail.",
  },
  {
    keywords: /(contact|mail|email|joindre|écrire|linkedin|reach)/,
    answer:
      "Le plus simple est la section Contact en bas de page : email ou LinkedIn, comme tu préfères. Je réponds toujours avec plaisir, que ce soit pour discuter d'un projet, d'une opportunité ou simplement échanger.",
  },
  {
    keywords: /(together)/,
    answer:
      "Together est une plateforme pour centraliser l'organisation d'événements entre amis : sondages, lieux, dates, dépenses partagées. C'est mon projet le plus complet, avec une vraie réflexion produit, UX et technique. C'est aussi celui que je préfère.",
  },
  {
    keywords: /(mood|film|cinéma|movie)/,
    answer:
      "Mood Film Finder recommande des films à partir de ton émotion du moment. J'ai scrapé plus de 6500 titres et construit une architecture RAG complète pour matcher l'envie avec le bon film. C'est le projet qui m'a fait toucher chaque brique d'une vraie chaîne IA.",
  },
  {
    keywords: /(parole|lyrics|chanson|musique|son)/,
    answer:
      "Le Chatbot Paroles aide à retrouver une chanson à partir de paroles incomplètes ou approximatives. Il combine recherche sémantique et génération par LLM pour proposer la bonne piste même quand on se souvient mal. C'est un projet né d'un vrai besoin perso.",
  },
  {
    keywords: /(merci|thanks|super|génial|cool)/,
    answer: "Avec plaisir 🙏 N'hésite pas si tu veux qu'on creuse un projet ou un sujet en particulier.",
  },
  {
    keywords: /(bonjour|salut|hello|hi |coucou|hey)/,
    answer: "Bonjour 👋 Ravie de te lire. Tu veux que je te parle de mon parcours, de mes projets, ou de quelque chose en particulier ?",
  },
];

function reply(q: string): string {
  const t = q.toLowerCase();
  let best: { score: number; answer: string } | null = null;
  for (const intent of intents) {
    const match = t.match(intent.keywords);
    if (match) {
      const score = (match[0]?.length ?? 1) * (intent.weight ?? 1);
      if (!best || score > best.score) best = { score, answer: intent.answer };
    }
  }
  if (best) return best.answer;
  return "Bonne question. Je peux te parler de mon parcours, de mon alternance à la FDJ, de mes projets (Together, Mood Film Finder, Chatbot Paroles, Plateforme Scolaire, Hackathon Mirakl), de ma vision sur la data et l'IA, ou de ce que je recherche en ce moment. Sur quoi veux-tu qu'on s'attarde ?";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([intro]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: reply(q) }]);
    }, 500);
  }

  const suggestions = ["Qui es-tu ?", "Pourquoi la data ?", "Ton projet préféré ?", "Que cherches-tu ?"];

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 pr-5 pl-2 py-2 bg-card border border-border noir-shadow rounded-full hover:border-evidence transition-colors"
        aria-label="Ouvrir le chat avec Elena"
      >
        <img
          src={elena}
          alt="Elena"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover border-2 border-evidence"
        />
        <span className="hidden sm:flex flex-col items-start">
          <span className="font-stamp text-[9px] tracking-[0.25em] text-evidence">EN LIGNE</span>
          <span className="font-serif-display text-sm text-foreground">Parler à Elena</span>
        </span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] flex flex-col bg-card border border-border noir-shadow rounded-lg overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-secondary/50">
            <img src={elena} alt="Elena" width={40} height={40} className="w-10 h-10 rounded-full object-cover border border-evidence" />
            <div className="flex-1">
              <div className="font-serif-display text-foreground">Elena Kervennic</div>
              <div className="flex items-center gap-1.5 text-[10px] font-stamp tracking-wider text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                ENQUÊTRICE · DISPONIBLE
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground text-xl" aria-label="Fermer">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-evidence text-evidence-foreground rounded-2xl rounded-br-sm"
                      : "bg-secondary text-foreground rounded-2xl rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          {msgs.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-2.5 py-1 text-[11px] font-stamp tracking-wider border border-border text-muted-foreground hover:border-evidence hover:text-evidence transition-colors rounded-full"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2 p-3 border-t border-border"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question…"
              className="flex-1 bg-input/40 border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-evidence rounded"
            />
            <button
              type="submit"
              className="px-4 bg-evidence text-evidence-foreground font-stamp text-xs tracking-wider rounded"
            >
              ENVOYER
            </button>
          </form>
        </div>
      )}
    </>
  );
}