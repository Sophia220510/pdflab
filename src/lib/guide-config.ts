export const siteConfig = {
  productName: "Guia Prático para o Início do Estágio em Análises Clínicas",
  productShortName: "Guia Prático para o Início do Estágio",
  productDescription:
    "Um guia digital para estudantes que vão começar ou começaram recentemente o estágio em Análises Clínicas.",
  productPages: 47,
  productEdition: 2026,
  productPrice: "R$ 27,00",
  productPriceNumber: 27,
  productContentId: "guia-primeiro-estagio-analises-clinicas",
  ctaLabel: "QUERO COMEÇAR MAIS PREPARADO",
  coverImage: "/images/guide-preview/p01-capa.jpg",
  checkoutUrl: "https://pay.kiwify.com.br/B6lYPgn",
  originalPrice: "",
  videoUrl: "/videos/dr-paulo-mensagem-guia.mp4",
  videoPoster: "/images/santa-helena/dr-paulo-video-poster.jpg",
  productPdfPreviewImages: [
    "/images/guide-preview/p09-tres-fases-do-exame.jpg",
    "/images/guide-preview/p16-checklist-primeiro-dia.jpg",
    "/images/guide-preview/p26-mapa-tubos-coleta.jpg",
    "/images/guide-preview/p42-plano-sete-dias.jpg",
    "/images/guide-preview/p45-respostas-comentadas.jpg",
  ],
  logoUrl: "/images/santa-helena/logo.svg",
  drPauloPhoto: "/images/santa-helena/dr-paulo.webp",
  laboratoryPhoto: "/images/santa-helena/alunos-grupo.webp",
  supportEmail: "",
  legal: { cnpj: "", companyName: "" },
  links: {
    laboratory: "https://laboratoriosantahelena.vercel.app",
    drPaulo: "https://laboratoriosantahelena.vercel.app/paulo-brandao",
    internship: "https://laboratoriosantahelena.vercel.app/estagio",
    instagram: "https://www.instagram.com/laboratoriosantahelena81/",
    privacy: "",
    terms: "",
    refund: "",
    contact: "",
  },
  analytics: { gaId: "", metaPixelId: "1124080746655021" },
} as const;

export type AnalyticsEvent = "page_view" | "cta_click" | "checkout_start" | "video_play";

export function trackEvent(event: AnalyticsEvent, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("santahelena:analytics", { detail: { event, ...data } }));

  // PageView and ViewContent are emitted by the bootstrap in __root.tsx, once per page load.
  // Purchase must only be emitted by Kiwify after a confirmed transaction.
  if (!siteConfig.analytics.metaPixelId || typeof window.fbq !== "function") return;
  if (event === "cta_click") {
    window.fbq("trackCustom", "GuideCtaClick", {
      content_ids: [siteConfig.productContentId],
      content_name: siteConfig.productName,
      cta_position: data["position"],
    });
  } else if (event === "checkout_start") {
    window.fbq("track", "InitiateCheckout", {
      content_ids: [siteConfig.productContentId],
      content_name: siteConfig.productName,
      content_type: "product",
      currency: "BRL",
      value: siteConfig.productPriceNumber,
      num_items: 1,
      cta_position: data["position"],
    });
  } else if (event === "video_play") {
    window.fbq("trackCustom", "GuideVideoPlay", {
      content_ids: [siteConfig.productContentId],
      content_name: siteConfig.productName,
    });
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function checkoutWithUtm() {
  if (!siteConfig.checkoutUrl || typeof window === "undefined") return "#oferta";
  const destination = new URL(siteConfig.checkoutUrl, window.location.origin);
  new URLSearchParams(window.location.search).forEach((value, key) => {
    if (
      key.toLowerCase().startsWith("utm_") ||
      ["fbclid", "gclid", "ttclid"].includes(key.toLowerCase())
    ) {
      destination.searchParams.set(key, value);
    }
  });
  return destination.toString();
}
