import { useState, useRef, useEffect } from "react";
import elena from "@/assets/elena-avatar.jpg";

type Msg = { role: "user" | "bot"; text: string };

const intro: Msg = {
  role: "bot",
  text: "Bonjour, ici Elena 👋 Je peux vous parler de mon parcours, mes compétences, mes projets, mon alternance à la FDJ, le hackathon Mirakl, ou comment me contacter. Que voulez-vous explorer ?",
};

function reply(q: string): string {
  const t = q.toLowerCase();
  if (/présent|qui|parcours|toi|formation/.test(t))
    return "Je suis Elena Kervennic, étudiante en data et IA. Je construis des projets concrets mêlant analyse de données, automatisation et intelligence artificielle.";
  if (/compétence|stack|skill|outil/.test(t))
    return "Mon arsenal : Python, SQL, Tableau, Power BI, Dataiku pour la data ; OpenAI, RAG, Dust pour l'IA ; Make, n8n, Airtable pour l'automatisation ; Next.js, Supabase, TypeScript pour le web.";
  if (/projet|case|enquête|dossier/.test(t))
    return "Cinq dossiers ouverts : Together (app sociale), Mood Film Finder (RAG cinéma), Chatbot Paroles, Plateforme Scolaire, et le Hackathon Mirakl 🏆. Cliquez sur un dossier pour ouvrir l'enquête.";
  if (/fdj|altern|stage|entreprise/.test(t))
    return "J'effectue mon alternance à la FDJ dans le service data. J'y apprends à collecter, structurer et valoriser la donnée pour la prise de décision.";
  if (/hackathon|mirakl|gagn/.test(t))
    return "Le Hackathon Mirakl ? Enquête résolue 🏆. Une solution combinant scraping, IA et automatisation no-code livrée en moins de 48h.";
  if (/contact|mail|email|join|écri/.test(t))
    return "Rendez-vous dans la section Contact en bas de page — email ou LinkedIn, à votre convenance.";
  if (/merci|thanks/.test(t)) return "Avec plaisir. Dossier toujours ouvert si besoin.";
  return "Bonne piste. Posez-moi une question sur mon profil, ma stack, mes projets, mon alternance FDJ, le hackathon Mirakl ou le contact.";
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

  const suggestions = ["Ton parcours ?", "Tes projets ?", "L'alternance FDJ ?", "Le hackathon ?"];

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