import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Stack } from "@/components/site/Stack";
import { Cases } from "@/components/site/Cases";
import { Dataviz } from "@/components/site/Dataviz";
import { Contact } from "@/components/site/Contact";
import { Chatbot } from "@/components/site/Chatbot";
import { LoadingScreen } from "@/components/site/LoadingScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elena Kervennic — Bureau d'enquête Data & IA" },
      { name: "description", content: "Portfolio d'Elena Kervennic, enquêtrice data et intelligence artificielle. Dossiers, projets et investigations résolues." },
      { property: "og:title", content: "Elena Kervennic — Bureau d'enquête Data & IA" },
      { property: "og:description", content: "Je transforme les données en décisions et les problèmes en enquêtes résolues." },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);
  return (
    <>
      {!entered && <LoadingScreen onEnter={() => setEntered(true)} />}
      <main
        className={`relative overflow-x-hidden transition-all duration-700 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero />
        <About />
        <Stack />
        <Cases />
        <Dataviz />
        <Contact />
        <Chatbot />
      </main>
    </>
  );
}
