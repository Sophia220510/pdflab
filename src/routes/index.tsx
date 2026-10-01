import { createFileRoute } from "@tanstack/react-router";
import { GuideLanding } from "@/components/GuideLanding";
import { siteConfig } from "@/lib/guide-config";

const title = `${siteConfig.productName} | Laboratório Santa Helena`;
const description =
  "Vai começar ou começou recentemente o estágio em Análises Clínicas? Revise a rotina do laboratório, biossegurança e os principais setores com um guia digital prático.";

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
