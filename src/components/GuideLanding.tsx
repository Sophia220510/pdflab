import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ExternalLink,
  Instagram,
  LockKeyhole,
  Maximize2,
  MessageCircle,
  Play,
  Quote,
  Route,
  ShieldCheck,
  X,
} from "lucide-react";
import { checkoutWithUtm, siteConfig, trackEvent } from "@/lib/guide-config";

const previews = [
  {
    page: 9,
    title: "As três fases do exame",
    src: "/images/guide-preview/p09-tres-fases-do-exame.jpg",
    helps: "Ajuda a visualizar onde cada etapa do exame acontece.",
    use: "Consulte antes de começar ou enquanto acompanha as explicações da rotina.",
  },
  {
    page: 16,
    title: "Checklist do primeiro dia",
    src: "/images/guide-preview/p16-checklist-primeiro-dia.jpg",
    helps: "Organiza chegada, orientação inicial, rotina e fechamento do dia.",
    use: "Use como lembrete do que observar, confirmar e registrar.",
  },
  {
    page: 42,
    title: "Plano de preparação em 7 dias",
    src: "/images/guide-preview/p42-plano-sete-dias.jpg",
    helps: "Divide a revisão em uma sequência curta e possível de acompanhar.",
    use: "Organize a revisão antes de começar ou durante as primeiras semanas.",
  },
] as const;

const benefits = [
  {
    title: "Entenda como a rotina se organiza",
    text: "Veja o caminho da amostra e as fases do exame para acompanhar melhor as explicações.",
    icon: Route,
  },
  {
    title: "Revise cuidados essenciais",
    text: "Retome biossegurança e fase pré-analítica sem confundir teoria com autorização para executar técnicas.",
    icon: ShieldCheck,
  },
  {
    title: "Reconheça termos e setores",
    text: "Use o glossário e o panorama dos setores para entender melhor o que acontece ao seu redor.",
    icon: BookOpen,
  },
  {
    title: "Tenha uma consulta organizada",
    text: "Checklist, plano de sete dias e revisão final ajudam a retomar pontos importantes no início do estágio.",
    icon: MessageCircle,
  },
] as const;

const reviews = [
  "Amei o guia! Muito prático e fácil de entender. Sem ele, acho que eu ia ficar meio perdida nos meus primeiros dias de estágio, kkkkkk.",
  "Realmente é um PDF simples e fácil de entender, mas, além de tudo isso, é prático. Tem coisas que são realmente importantes saber, mas que a maioria de quem vai fazer o primeiro estágio não sabe.",
] as const;

const faqs = [
  [
    "Serve para quem ainda não começou o estágio?",
    "Sim. O guia ajuda a organizar o que revisar e o que observar antes do primeiro dia.",
  ],
  [
    "Serve para quem já começou recentemente?",
    "Sim. Você pode consultar o material nas primeiras semanas para retomar termos, setores e pontos básicos da rotina.",
  ],
  [
    "Para quais estudantes o guia é indicado?",
    "Para estudantes de Biomedicina, Farmácia, Ciências Biológicas e áreas relacionadas que vão iniciar ou começaram recentemente um estágio com contato com Análises Clínicas.",
  ],
  [
    "Como recebo o material?",
    "A entrega é digital após a confirmação do pagamento, conforme informado no checkout. Cadastre um e-mail válido durante a compra para receber as comunicações da plataforma.",
  ],
  [
    "O material é digital? Posso ler no celular?",
    "Sim. É um PDF digital que pode ser lido no celular, tablet ou computador.",
  ],
  [
    "O guia substitui treinamento ou orientação do laboratório?",
    "Não. É preparação teórica, não um curso ou estágio prático. Não autoriza procedimentos; a orientação do supervisor e os POPs do local sempre têm prioridade.",
  ],
] as const;

type CtaPosition = "hero" | "authority" | "offer" | "floating" | "final";

function CTA({
  label,
  position,
  className = "",
}: {
  label: string;
  position: CtaPosition;
  className?: string;
}) {
  const clickedRef = useRef(false);
  return (
    <a
      className={`cta ${className}`}
      href={siteConfig.checkoutUrl}
      onClick={(event) => {
        event.preventDefault();
        if (clickedRef.current) return;
        clickedRef.current = true;
        trackEvent("cta_click", { label, position });
        trackEvent("checkout_start", { position });
        window.location.assign(checkoutWithUtm());
      }}
    >
      {label} <ArrowRight aria-hidden="true" />
    </a>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href={siteConfig.links.laboratory}
      target="_blank"
      rel="noreferrer"
      aria-label="Visitar o site do Laboratório Santa Helena"
    >
      <span className="brand-logo">
        <img src={siteConfig.logoUrl} alt="" width="27" height="35" />
      </span>
      <span>
        <b>Laboratório</b>
        <strong>Santa Helena</strong>
      </span>
    </a>
  );
}

export function GuideLanding() {
  const [openPreview, setOpenPreview] = useState<(typeof previews)[number] | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [showFloatingBuy, setShowFloatingBuy] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    trackEvent("page_view");
  }, []);

  useEffect(() => {
    const heroCta = document.querySelector(".hero-copy .cta");
    if (!heroCta) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      setShowFloatingBuy(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    });
    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!openPreview) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenPreview(null);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleDialogKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleDialogKeys);
      requestAnimationFrame(() => previewTriggerRef.current?.focus());
    };
  }, [openPreview]);

  return (
    <div className="landing">
      <header className="topbar">
        <div className="container topbar-inner">
          <Brand />
          <span className="topbar-proof">Experiência laboratorial desde 1988</span>
          <a className="topbar-link" href="#previas">
            Ver conteúdo
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">PARA QUEM VAI COMEÇAR OU COMEÇOU HÁ POUCO</span>
              <h1>Começando seu estágio em Análises Clínicas e ainda se sente perdido?</h1>
              <p className="hero-heading-complement">{siteConfig.productName}</p>
              <p className="hero-lead">
                Uma direção clara para revisar a rotina do laboratório, entender o que acontece ao
                seu redor e saber o que observar nos primeiros dias e semanas.
              </p>
              <div className="hero-meta" aria-label="Informações do produto">
                <span>
                  PDF digital · {siteConfig.productPages} páginas · edição{" "}
                  {siteConfig.productEdition}
                </span>
                <span>Celular, tablet ou computador</span>
              </div>
              <div className="hero-purchase">
                <strong>{siteConfig.productPrice}</strong>
                <span>pagamento único</span>
              </div>
              <CTA label={siteConfig.ctaLabel} position="hero" />
              <ul className="hero-benefits">
                <li>
                  <Check /> Entenda o fluxo e os principais setores do laboratório.
                </li>
                <li>
                  <Check /> Revise biossegurança e fase pré-analítica.
                </li>
                <li>
                  <Check /> Saiba o que observar, perguntar e retomar com o supervisor.
                </li>
              </ul>
              <div className="hero-actions-note">
                <span>
                  <LockKeyhole /> Acesso digital conforme o checkout da Kiwify.
                </span>
                <a href="#previas">Ver páginas do guia</a>
              </div>
            </div>
            <div className="hero-product" aria-label="Capa da edição atual do guia">
              <div className="book-shell">
                <img
                  src={siteConfig.coverImage}
                  alt="Capa da edição atual do guia em PDF"
                  width="1340"
                  height="1895"
                />
              </div>
              <div className="hero-seal">
                <b>Edição 2026</b>
                <span>arquivo em PDF</span>
              </div>
            </div>
          </div>
        </section>

        <section className="situations-section" aria-labelledby="situations-title">
          <div className="container situations-wrap">
            <header>
              <span className="section-label">SE VOCÊ ESTÁ COMEÇANDO ESSA FASE</span>
              <h2 id="situations-title">
                Antes de começar ou já nos primeiros dias, é normal ter dúvidas.
              </h2>
            </header>
            <div className="situations-grid">
              <p>
                <span>ANTES DE COMEÇAR</span> O estágio está chegando e você não sabe o que revisar.
              </p>
              <p>
                <span>PRIMEIROS DIAS</span> Você começou e ainda se perde nos termos, setores e
                etapas da rotina.
              </p>
              <p>
                <span>TEORIA X PRÁTICA</span> Você estudou a matéria, mas não visualiza como ela
                aparece no laboratório.
              </p>
            </div>
            <p className="situations-close">
              O guia organiza os pontos essenciais para revisar antes do estágio e consultar nas
              primeiras semanas.
            </p>
          </div>
        </section>

        <section className="section preview-section" id="previas">
          <div className="container">
            <header className="section-heading">
              <div>
                <span className="section-label">PÁGINAS REAIS DO MATERIAL</span>
                <h2>Veja uma parte do que você vai encontrar no guia.</h2>
              </div>
              <p>Abra as páginas e confira o conteúdo antes de decidir.</p>
            </header>
            <div className="preview-grid">
              {previews.map((preview) => (
                <article className="preview-item" key={preview.page}>
                  <button
                    className="preview-card"
                    type="button"
                    onClick={(event) => {
                      previewTriggerRef.current = event.currentTarget;
                      setOpenPreview(preview);
                    }}
                    aria-label={`Ampliar página ${preview.page}: ${preview.title}`}
                  >
                    <span className="preview-image">
                      <img src={preview.src} alt="" loading="lazy" width="1340" height="1895" />
                    </span>
                    <span className="preview-caption">
                      <span>
                        <small>PÁGINA {preview.page}</small>
                        <b>{preview.title}</b>
                      </span>
                      <Maximize2 aria-hidden="true" />
                    </span>
                  </button>
                  <div className="preview-explanation">
                    <p>
                      <b>O que esclarece:</b> {preview.helps}
                    </p>
                    <p>
                      <b>Como usar:</b> {preview.use}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="preview-disclaimer">
              São páginas integrais do PDF final. Na prática, siga sempre a orientação do
              supervisor, os POPs e as regras da instituição.
            </p>
          </div>
        </section>

        <section className="section benefits-section" aria-labelledby="benefits-title">
          <div className="container benefits-layout">
            <header>
              <span className="section-label">O QUE MUDA NA SUA PREPARAÇÃO</span>
              <h2 id="benefits-title">O que você consegue revisar com o guia.</h2>
              <p>
                Uma sequência prática para entender melhor a rotina e levar perguntas mais claras ao
                supervisor.
              </p>
            </header>
            <div className="benefits-list">
              {benefits.map(({ title, text, icon: Icon }) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section authority-section" aria-labelledby="authority-title">
          <div className="container authority-grid">
            <div className="authority-copy">
              <span className="section-label">QUEM ESTÁ POR TRÁS DO MATERIAL</span>
              <h2 id="authority-title">
                Orientação de quem acompanha estudantes e a rotina laboratorial há décadas.
              </h2>
              <div className="authority-person">
                <img
                  src={siteConfig.drPauloPhoto}
                  alt="Dr. Paulo Brandão"
                  width="170"
                  height="170"
                  loading="lazy"
                />
                <div>
                  <b>Dr. Paulo Brandão</b>
                  <span>Responsável técnico do Laboratório Santa Helena</span>
                </div>
              </div>
              <p>
                Dr. Paulo Brandão é biólogo, farmacêutico-bioquímico e especialista em Análises
                Clínicas pelo TEAC/SBAC. Sua trajetória inclui rotina laboratorial, docência e
                contato com estudantes.
              </p>
              <p>
                O Laboratório Santa Helena atua desde 1988 em Análises Clínicas e Medicina
                Ocupacional. O guia foi desenvolvido a partir dessa experiência institucional.
              </p>
              <div className="authority-links">
                <a href={siteConfig.links.drPaulo} target="_blank" rel="noreferrer">
                  Trajetória do Dr. Paulo <ExternalLink />
                </a>
                <a href={siteConfig.links.laboratory} target="_blank" rel="noreferrer">
                  Site do laboratório <ExternalLink />
                </a>
                <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
                  <Instagram /> Instagram oficial
                </a>
              </div>
              <CTA label={siteConfig.ctaLabel} position="authority" />
            </div>
            <div className="video-column">
              <p>Conheça a orientação do Dr. Paulo sobre o guia e o início do estágio.</p>
              <div className="video-frame">
                <div className="video-media">
                  <video
                    ref={videoRef}
                    controls
                    playsInline
                    preload="none"
                    poster={siteConfig.videoPoster}
                    aria-label="Mensagem do Dr. Paulo Brandão sobre o guia"
                  >
                    <source src={siteConfig.videoUrl} type="video/mp4" />
                    Seu navegador não consegue reproduzir este vídeo.
                  </video>
                  {!videoStarted && (
                    <button
                      className="video-poster"
                      type="button"
                      aria-label="Assistir à mensagem do Dr. Paulo Brandão"
                      onClick={() => {
                        setVideoStarted(true);
                        trackEvent("video_play");
                        void videoRef.current?.play().catch(() => undefined);
                      }}
                    >
                      <img
                        src={siteConfig.videoPoster}
                        alt="Dr. Paulo Brandão no Laboratório Santa Helena"
                        width="478"
                        height="850"
                        loading="lazy"
                      />
                      <span className="video-overlay" aria-hidden="true">
                        <span className="play-button">
                          <Play />
                        </span>
                        <b>Assistir à mensagem</b>
                        <small>1min10s · com legendas</small>
                      </span>
                    </button>
                  )}
                </div>
                <div className="video-signature">
                  <b>Dr. Paulo Brandão</b>
                  <span>Responsável técnico · Laboratório Santa Helena</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section reviews-section" aria-labelledby="reviews-title">
          <div className="container reviews-wrap">
            <header>
              <span className="section-label">OPINIÕES SOBRE O GUIA</span>
              <h2 id="reviews-title">Relatos de quem leu o material.</h2>
              <p>Opiniões anônimas recebidas sobre o guia.</p>
            </header>
            <div className="review-grid">
              {reviews.map((review) => (
                <blockquote key={review}>
                  <Quote aria-hidden="true" />
                  <p>“{review}”</p>
                  <footer>Leitora do guia</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="section offer-section" id="oferta">
          <div className="container offer-card">
            <div className="offer-cover">
              <img
                src={siteConfig.coverImage}
                alt="Capa da edição atual do guia em PDF"
                width="1340"
                height="1895"
                loading="lazy"
              />
            </div>
            <div className="offer-copy">
              <span className="section-label">PAGAMENTO ÚNICO · ACESSO DIGITAL</span>
              <h2>{siteConfig.productName}</h2>
              <p>
                Para revisar antes de começar e consultar durante as primeiras semanas no
                laboratório.
              </p>
              <ul>
                <li>
                  <Check /> PDF digital com {siteConfig.productPages} páginas, edição{" "}
                  {siteConfig.productEdition}
                </li>
                <li>
                  <Check /> Checklists e plano de preparação
                </li>
                <li>
                  <Check /> Glossário, teste e respostas comentadas
                </li>
              </ul>
              <div className="offer-price">
                <strong>{siteConfig.productPrice}</strong>
                <span>Pagamento único.</span>
              </div>
              <CTA label={siteConfig.ctaLabel} position="offer" />
              <p className="checkout-note">
                <LockKeyhole /> Compra pela Kiwify; entrega digital conforme o checkout.
              </p>
            </div>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="container faq-wrap">
            <header>
              <span className="section-label">DÚVIDAS FREQUENTES</span>
              <h2 id="faq-title">Antes de decidir, vale saber.</h2>
            </header>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <ChevronDown aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-section" aria-labelledby="final-title">
          <div className="container final-inner">
            <div>
              <span className="section-label">ANTES OU DURANTE O COMEÇO DO ESTÁGIO</span>
              <h2 id="final-title">Tenha uma direção para revisar e aprender com supervisão.</h2>
              <p>
                PDF digital · {siteConfig.productPages} páginas · {siteConfig.productPrice} em
                pagamento único
              </p>
            </div>
            <CTA label={siteConfig.ctaLabel} position="final" />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <Brand light />
          <p>
            Material educacional de preparação teórica. Não substitui treinamento prático,
            supervisão, POPs, avaliação de competência ou decisão do responsável técnico.
          </p>
          <span>
            São Paulo — SP
            <br />© {new Date().getFullYear()} Laboratório Santa Helena
          </span>
        </div>
      </footer>

      <aside
        className={`floating-buy ${showFloatingBuy ? "is-visible" : ""}`}
        aria-label="Comprar o guia"
        aria-hidden={!showFloatingBuy}
        inert={!showFloatingBuy}
      >
        <span>
          <b>{siteConfig.productPrice}</b>
          <small>pagamento único</small>
        </span>
        <CTA label="ACESSAR O GUIA" position="floating" />
      </aside>

      {openPreview && (
        <div
          className="preview-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpenPreview(null);
          }}
        >
          <div
            className="preview-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-modal-title"
            ref={dialogRef}
          >
            <div className="preview-modal-head">
              <span>
                <small>PÁGINA {openPreview.page}</small>
                <b id="preview-modal-title">{openPreview.title}</b>
              </span>
              <button
                ref={closeButtonRef}
                onClick={() => setOpenPreview(null)}
                aria-label="Fechar prévia"
              >
                <X />
              </button>
            </div>
            <div className="preview-modal-scroll" tabIndex={0}>
              <img
                src={openPreview.src}
                alt={`Página ${openPreview.page} do guia: ${openPreview.title}`}
                width="1340"
                height="1895"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
