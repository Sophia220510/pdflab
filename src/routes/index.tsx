import { createFileRoute } from "@tanstack/react-router";
import { GuideLanding } from "@/components/GuideLanding";

const title = "Guia do Primeiro Estágio em Análises Clínicas | Laboratório Santa Helena";
const description =
  "Prepare-se antes do seu primeiro dia no laboratório com uma visão clara da rotina, biossegurança, setores e postura esperada.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: GuideLanding,
});
