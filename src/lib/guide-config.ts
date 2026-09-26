export const siteConfig = {
  checkoutUrl: "https://pay.kiwify.com.br/B6lYPgn",
  price: "R$ 27,00",
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
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("santahelena:analytics", { detail: { event, ...data } }));
  }
}

export function checkoutWithUtm() {
  if (!siteConfig.checkoutUrl || typeof window === "undefined") return "#oferta";
  const destination = new URL(siteConfig.checkoutUrl, window.location.origin);
  new URLSearchParams(window.location.search).forEach((value, key) => {
    if (key.toLowerCase().startsWith("utm_")) destination.searchParams.set(key, value);
  });
  return destination.toString();
}
