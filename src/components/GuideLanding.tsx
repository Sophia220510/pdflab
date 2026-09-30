import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
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
    use: "Use para revisar o fluxo antes de acompanhar as explicações da rotina.",
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
    use: "Use na semana anterior ao estágio para evitar uma revisão sem direção.",
  },
] as const;

const benefits = [
  {
    title: "Saiba por onde começar sua revisão",
    text: "Checklists e um plano de sete dias ajudam a distribuir os assuntos antes do primeiro dia.",
    icon: CalendarDays,
  },
  {
    title: "Entenda o caminho da amostra",
    text: "Uma visão inicial das fases do exame facilita acompanhar as explicações da rotina.",
    icon: Route,
  },
  {
    title: "Reconheça a linguagem do laboratório",
    text: "Glossário e apresentação dos setores ajudam você a se familiarizar com termos recorrentes.",
    icon: BookOpen,
  },
  {
    title: "Saiba o que observar e perguntar",
    text: "Orientações de postura ajudam a levar dúvidas mais claras ao supervisor nos primeiros dias.",
    icon: MessageCircle,
  },
  {
    title: "Revise conceitos essenciais",
    text: "Conteúdos introdutórios de biossegurança e fase pré-analítica reforçam cuidados importantes.",
    icon: ShieldCheck,
  },
  {
    title: "Confira o que entendeu",
    text: "Teste de revisão e respostas comentadas ajudam a identificar o que merece ser retomado.",
    icon: ClipboardCheck,
  },
] as const;

const reviews = [
  "Amei o guia! Muito prático e fácil de entender. Sem ele, acho que eu ia ficar meio perdida nos meus primeiros dias de estágio, kkkkkk.",
  "Realmente é um PDF simples e fácil de entender, mas, além de tudo isso, é prático. Tem coisas que são realmente importantes saber, mas que a maioria de quem vai fazer o primeiro estágio não sabe.",
] as const;

const faqs = [
  [
    "Para quem este guia é indicado?",
    "Para estudantes de Biomedicina, Farmácia, Ciências Biológicas e áreas relacionadas que vão iniciar ou começaram recentemente um estágio com contato com Análises Clínicas.",
  ],
  [
    "Como recebo e acesso o material?",
    "A entrega é digital após a confirmação do pagamento, conforme informado no checkout. Cadastre um e-mail válido durante a compra para receber as comunicações da plataforma.",
  ],
  ["Posso ler pelo celular?", "Sim. O PDF pode ser lido no celular, tablet ou computador."],
  [
    "O guia serve para quem já começou o estágio?",
    "Sim. Ele também pode ajudar quem começou recentemente e quer organizar a revisão, consultar termos e retomar pontos básicos da rotina.",
  ],
  [
    "É curso, treinamento prático ou PDF?",
    "É um PDF de preparação teórica com 47 páginas. Não é curso, estágio ou treinamento prático e não autoriza a execução de procedimentos. A orientação do supervisor e os POPs do local sempre têm prioridade.",
  ],
  ["Há certificado?", "Não. A compra corresponde somente ao guia digital."],
  [
    "Como funciona o reembolso?",
    "A política e o procedimento de reembolso não foram informados nos materiais disponibilizados para esta página. Consulte as condições apresentadas no checkout antes de concluir a compra.",
  ],
] as const;

type CtaPosition = "hero" | "authority" | "offer" | "floating";

function CTA({
  label,
  position,
  className = "",
}: {
  label: string;
  position: CtaPosition;
  className?: string;
}) {
  return (
    <a
      className={`cta ${className}`}
      href={siteConfig.checkoutUrl}
      onClick={(event) => {
        event.preventDefault();
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    trackEvent("page_view");
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
              <span className="eyebrow">PARA O SEU PRIMEIRO ESTÁGIO EM ANÁLISES CLÍNICAS</span>
              <h1>Seu primeiro estágio em Análises Clínicas está chegando?</h1>
              <p className="hero-heading-complement">Saiba o que revisar antes de começar.</p>
              <p className="hero-lead">
                Organize sua revisão, entenda o caminho das amostras e saiba o que observar e
                perguntar nos primeiros dias — com um guia digital para consultar antes e durante o
                estágio.
              </p>
              <ul className="hero-benefits">
                <li>
                  <Check /> Organize o que revisar antes do primeiro dia.
                </li>
                <li>
                  <Check /> Entenda os termos e as etapas da rotina.
                </li>
                <li>
                  <Check /> Leve dúvidas mais claras para o seu supervisor.
                </li>
              </ul>
              <div className="hero-meta" aria-label="Informações do produto">
                <span>PDF digital • 47 páginas</span>
                <span>R$ 27 • pagamento único</span>
              </div>
              <CTA label="QUERO ME PREPARAR PARA O ESTÁGIO" position="hero" />
              <div className="hero-actions-note">
                <span>
                  <LockKeyhole /> Acesso digital após a confirmação do pagamento.
                </span>
                <a href="#previas">Ver páginas do guia</a>
              </div>
            </div>
            <div className="hero-product" aria-label="Capa real do Guia do Primeiro Estágio">
              <div className="book-shell">
                <img
                  src="/images/guide-preview/p01-capa.jpg"
                  alt="Capa do Guia do Primeiro Estágio em Análises Clínicas"
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
              <span className="section-label">SE O ESTÁGIO ESTÁ PRÓXIMO</span>
              <h2 id="situations-title">
                Você não precisa chegar sabendo tudo. Pode chegar sabendo por onde começar.
              </h2>
            </header>
            <div className="situations-grid">
              <p>
                <span>01</span> O estágio está chegando, mas você ainda não sabe o que revisar.
              </p>
              <p>
                <span>02</span> Você conhece a teoria, mas ainda não visualiza a rotina do
                laboratório.
              </p>
              <p>
                <span>03</span> Você quer entender melhor as orientações e levar dúvidas ao
                supervisor.
              </p>
            </div>
            <p className="situations-close">
              O guia reúne uma preparação inicial em uma sequência organizada, para você revisar com
              mais direção.
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
              <h2 id="benefits-title">Conteúdo organizado para ser útil no seu momento.</h2>
              <p>
                Em vez de procurar assuntos soltos, você encontra uma sequência inicial para
                revisar, consultar e transformar em perguntas para o supervisor.
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
              <span className="section-label">EXPERIÊNCIA APLICADA À REVISÃO</span>
              <h2 id="authority-title">
                Preparação com revisão de quem conhece a rotina do laboratório.
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
                Conteúdo revisado pelo Dr. Paulo Brandão, biólogo, farmacêutico-bioquímico e
                especialista em Análises Clínicas pelo TEAC/SBAC. Sua trajetória inclui rotina
                laboratorial, docência e contato com estudantes.
              </p>
              <p>
                O Laboratório Santa Helena atua desde 1988 em Análises Clínicas e Medicina
                Ocupacional. Essa experiência ajuda a contextualizar o que merece atenção antes dos
                primeiros dias de estágio.
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
              <CTA label="QUERO ME PREPARAR PARA O ESTÁGIO" position="authority" />
            </div>
            <div className="video-column">
              <p>Assista à mensagem do Dr. Paulo sobre a preparação.</p>
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
                src="/images/guide-preview/p01-capa.jpg"
                alt="Capa do Guia do Primeiro Estágio em Análises Clínicas"
                width="1340"
                height="1895"
                loading="lazy"
              />
            </div>
            <div className="offer-copy">
              <span className="section-label">PAGAMENTO ÚNICO · ACESSO DIGITAL</span>
              <h2>Guia do Primeiro Estágio em Análises Clínicas</h2>
              <p>
                Uma preparação inicial para organizar sua revisão e entender melhor o ambiente
                laboratorial.
              </p>
              <ul>
                <li>
                  <Check /> PDF digital com 47 páginas
                </li>
                <li>
                  <Check /> Checklists e plano de preparação
                </li>
                <li>
                  <Check /> Glossário, teste e respostas comentadas
                </li>
              </ul>
              <div className="offer-price">
                <strong>R$ 27</strong>
                <span>Pagamento único.</span>
              </div>
              <CTA label="QUERO ACESSAR O GUIA" position="offer" />
              <p className="checkout-note">
                <LockKeyhole /> Acesso digital após a confirmação do pagamento.
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

      <aside className="floating-buy" aria-label="Comprar o guia">
        <span>
          <b>R$ 27</b>
          <small>pagamento único</small>
        </span>
        <CTA label="COMPRAR GUIA" position="floating" />
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
