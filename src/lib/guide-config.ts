export const siteConfig = {
  productName: "Guia Prático para o Início do Estágio em Análises Clínicas",
  productShortName: "Guia Prático para o Início do Estágio",
  productDescription:
    "Paulo Brandão apresenta o guia que criou para organizar sua revisão antes do estágio e apoiar as primeiras semanas em Análises Clínicas.",
  productPages: 47,
  productEdition: 2026,
  productPrice: "R$ 27,00",
  productPriceNumber: 27,
  productContentId: "guia-primeiro-estagio-analises-clinicas",
  ctaLabel: "Quero começar mais preparado",
  coverImage: "/images/guide-preview/p01-capa.jpg",
  checkoutUrl: "https://pay.kiwify.com.br/B6lYPgn?split=1",
  originalPrice: "",
  videoUrl: "/videos/dr-paulo-mensagem-guia.mp4",
  videoPoster: "/images/santa-helena/dr-paulo-video-poster.jpg",
  productPdfPreviewImages: ["/images/guide-preview/p26-tubos-previa.webp"],
  logoUrl: "/images/santa-helena/logo.svg",
  drPauloPhoto: "/images/santa-helena/dr-paulo.webp",
  heroAuthorPhoto: "/images/santa-helena/dr-paulo.webp",
  studentPhotos: [
    {
      src: "/images/santa-helena/paulo-alunos-laboratorio.webp",
      alt: "Paulo Brandão com cinco alunas no laboratório",
      caption: "Com alunos, dentro do Laboratório Santa Helena.",
      width: 1200,
      height: 675,
    },
    {
      src: "/images/santa-helena/paulo-turma-laboratorio.webp",
      alt: "Paulo Brandão ao centro de um grupo de alunos de jaleco no laboratório",
      caption: "O contato com estudantes faz parte da minha rotina.",
      width: 1200,
      height: 675,
    },
    {
      src: "/images/santa-helena/paulo-grupo-estudantes.webp",
      alt: "Paulo Brandão com um grupo de estudantes no ambiente do laboratório",
      caption: "Formação e convivência no ambiente laboratorial.",
      width: 1200,
      height: 715,
    },
    {
      src: "/images/santa-helena/alunos-microscopia.webp",
      alt: "Estudantes de jaleco diante de microscópios no laboratório",
      caption: "Alunos em atividade com microscópios no laboratório.",
      width: 960,
      height: 1280,
    },
  ],
  laboratoryPhoto: "/images/santa-helena/alunos-grupo.webp",
  studentActivityPhoto: "/images/santa-helena/alunos-pratica.webp",
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
  metaPixelId: "2369590133808698",
} as const;

export function checkoutWithUtm(
  search = typeof window === "undefined" ? "" : window.location.search,
) {
  const destination = new URL(siteConfig.checkoutUrl);
  new URLSearchParams(search).forEach((value, key) => {
    if (
      key.toLowerCase().startsWith("utm_") ||
      ["fbclid", "gclid", "ttclid", "sck", "src"].includes(key.toLowerCase())
    ) {
      destination.searchParams.set(key, value);
    }
  });
  destination.searchParams.set("split", "1");
  return destination.toString();
}
