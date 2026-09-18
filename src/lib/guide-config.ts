export const siteConfig = {
  checkoutUrl: "https://pay.kiwify.com.br/B6lYPgn",
  price: "R$ 27,00",
  originalPrice: "",
  productPdfPreviewImages: [] as string[],
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
  analytics: { gaId: "", metaPixelId: "2009500913098478" },
} as const;

export type AnalyticsEvent = "page_view" | "cta_click" | "checkout_start";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, data: Record<string, unknown> = {}) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("santahelena:analytics", { detail: { event, ...data } }));
    if (event === "checkout_start" && window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_ids: ["guia-primeiro-estagio-analises-clinicas"],
        content_name: "Guia do Primeiro Estágio em Análises Clínicas",
        content_type: "product",
        currency: "BRL",
        num_items: 1,
        value: 27,
      });
    }
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
