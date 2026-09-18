export const siteConfig = {
  checkoutUrl: "",
  price: "Preço a definir",
  originalPrice: "",
  videoUrl: "",
  videoPoster: "",
  productPdfPreviewImages: [] as string[],
  logoUrl: "/images/santa-helena/logo.svg",
  drPauloPhoto: "/images/santa-helena/dr-paulo.webp",
  laboratoryPhoto: "/images/santa-helena/equipe.webp",
  supportEmail: "",
  legal: { cnpj: "", companyName: "" },
  links: {
    laboratory: "https://laboratoriosantahelena.vercel.app",
    drPaulo: "https://laboratoriosantahelena.vercel.app/paulo-brandao",
    privacy: "",
    terms: "",
    refund: "",
    contact: "",
  },
  analytics: { gaId: "", metaPixelId: "" },
} as const;

export type AnalyticsEvent =
  | "page_view"
  | "video_play"
  | "video_25"
  | "video_50"
  | "video_75"
  | "video_complete"
  | "cta_click"
  | "checkout_start";

export function trackEvent(event: AnalyticsEvent, data: Record<string, unknown> = {}) {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("santahelena:analytics", { detail: { event, ...data } }));
}

export function checkoutWithUtm() {
  if (!siteConfig.checkoutUrl || typeof window === "undefined") return "#oferta";
  const destination = new URL(siteConfig.checkoutUrl, window.location.origin);
  new URLSearchParams(window.location.search).forEach((value, key) => {
    if (key.toLowerCase().startsWith("utm_")) destination.searchParams.set(key, value);
  });
  return destination.toString();
}
