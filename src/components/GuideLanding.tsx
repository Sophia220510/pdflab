import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Instagram,
  LockKeyhole,
  Maximize2,
  Microscope,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  TestTubes,
  X,
} from "lucide-react";
import { checkoutWithUtm, siteConfig, trackEvent } from "@/lib/guide-config";

const previews = [
  {
    page: 9,
    title: "As três fases do exame",
    src: "/images/guide-preview/p09-tres-fases-do-exame.jpg",
  },
  {
    page: 16,
    title: "Checklist do primeiro dia",
    src: "/images/guide-preview/p16-checklist-primeiro-dia.jpg",
  },
  {
    page: 26,
    title: "Mapa inicial dos tubos",
    src: "/images/guide-preview/p26-mapa-tubos-coleta.jpg",
  },
  {
    page: 42,
    title: "Plano de preparação em 7 dias",
    src: "/images/guide-preview/p42-plano-sete-dias.jpg",
  },
  {
    page: 45,
    title: "Respostas comentadas",
    src: "/images/guide-preview/p45-respostas-comentadas.jpg",
  },
] as const;

const learningItems = [
  [
    "Rotina e fluxo",
    "A jornada da amostra e as fases pré-analítica, analítica e pós-analítica.",
    Microscope,
  ],
  [
    "Primeiro dia",
    "Postura, limites do estagiário, boas perguntas e um checklist para se orientar.",
    GraduationCap,
  ],
  [
    "Biossegurança",
    "EPI, higiene das mãos, exposições, perfurocortantes, resíduos e condutas essenciais.",
    ShieldCheck,
  ],
  [
    "Fase pré-analítica",
    "Identificação, tubos, ordem de coleta, interferentes, transporte e critérios de rejeição.",
    TestTubes,
  ],
  [
    "Setores do laboratório",
    "Hematologia, Bioquímica, Urinálise, Parasitologia, Microbiologia e Imunologia.",
    BookOpen,
  ],
  ["Revisão guiada", "Plano de sete dias, glossário, teste rápido e respostas comentadas.", Check],
] as const;

const reviews = [
  "Amei o guia! Muito prático e fácil de entender. Sem ele, acho que eu ia ficar meio perdida nos meus primeiros dias de estágio, kkkkkk.",
  "Realmente é um PDF simples e fácil de entender, mas, além de tudo isso, é prático. Tem coisas que são realmente importantes saber, mas que a maioria de quem vai fazer o primeiro estágio não sabe.",
] as const;

const faqs = [
  [
    "Como recebo o material?",
    "A entrega é digital e instantânea após o pagamento, conforme informado no checkout. Use um e-mail válido na compra para receber as orientações de acesso.",
  ],
  [
    "O guia substitui o estágio ou o treinamento prático?",
    "Não. É um material de preparação teórica. A execução de técnicas exige capacitação, autorização e supervisão no local.",
  ],
  [
    "O guia ensina a coletar sangue?",
    "Não ensina venopunção nem autoriza coleta. Ele apresenta conceitos da fase pré-analítica, cuidados e o papel da supervisão.",
  ],
  [
    "Para quais cursos ele serve?",
    "É especialmente útil para estudantes de Biomedicina, Farmácia, Ciências Biológicas e áreas relacionadas que terão contato com Análises Clínicas.",
  ],
  ["Consigo ler pelo celular?", "Sim. O PDF pode ser lido no celular, tablet ou computador."],
  [
    "O conteúdo substitui o POP do meu estágio?",
    "Não. O procedimento vigente, a orientação do supervisor e as regras da instituição sempre têm prioridade.",
  ],
  ["Há certificado?", "Não. A compra corresponde ao guia digital de 47 páginas."],
] as const;

function CTA({ label = "QUERO ACESSAR O GUIA" }: { label?: string }) {
  return (
    <a
      className="cta"
      href={siteConfig.checkoutUrl}
      onClick={(event) => {
        event.preventDefault();
        trackEvent("cta_click", { label });
        trackEvent("checkout_start");
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
        <img src={siteConfig.logoUrl} alt="" />
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

  useEffect(() => {
    trackEvent("page_view");
  }, []);

  useEffect(() => {
    if (!openPreview) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPreview(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [openPreview]);

  return (
    <div className="landing">
      <header className="topbar">
        <div className="container topbar-inner">
          <Brand />
          <span className="topbar-proof">Experiência laboratorial desde 1988</span>
          <a className="topbar-link" href="#oferta">
            Ver o guia
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">GUIA DIGITAL · EDIÇÃO 2026</span>
              <h1>Vai começar o estágio e tem medo de chegar perdido?</h1>
              <p className="hero-lead">
                Entenda o fluxo do laboratório, reconheça termos e setores e saiba o que observar e
                perguntar para chegar mais preparado para aprender sob supervisão.
              </p>
              <div className="hero-facts" aria-label="Informações do produto">
                <span>
                  <b>PDF digital</b>47 páginas
                </span>
                <span>
                  <b>Leitura fácil</b>celular, tablet ou computador
                </span>
                <span>
                  <b>Uso prático</b>checklists, plano e revisão
                </span>
              </div>
              <div className="hero-buy">
                <div className="hero-price">
                  <small>Guia completo por</small>
                  <strong>R$ 27,00</strong>
                </div>
                <CTA label="COMPRAR O GUIA POR R$ 27" />
              </div>
              <p className="checkout-note">
                <LockKeyhole /> Você será direcionado ao checkout da Kiwify.
              </p>
            </div>
            <div className="hero-product" aria-label="Capa real do Guia do Primeiro Estágio">
              <div className="book-shell">
                <img
                  src="/images/guide-preview/p01-capa.jpg"
                  alt="Capa do Guia do Primeiro Estágio em Análises Clínicas"
                />
              </div>
              <div className="hero-seal">
                <b>47 páginas</b>
                <span>acesso digital</span>
              </div>
              <div className="reviewed-card">
                <img src={siteConfig.drPauloPhoto} alt="Dr. Paulo Brandão" />
                <span>
                  <small>REVISÃO TÉCNICA CONFIRMADA NO GUIA</small>
                  <b>Dr. Paulo Brandão</b>
                  <em>Responsável técnico · TEAC/SBAC</em>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="quick-proof" aria-label="Destaques do guia">
          <div className="container">
            <span>Checklist do primeiro dia</span>
            <span>Biossegurança</span>
            <span>Fase pré-analítica</span>
            <span>Plano de 7 dias</span>
          </div>
        </section>

        <section className="section video-section" aria-labelledby="video-title">
          <div className="container video-grid">
            <div className="video-copy">
              <span className="section-label">UMA MENSAGEM DO DR. PAULO</span>
              <h2 id="video-title">Conheça quem está por trás desta preparação.</h2>
              <p>
                Dr. Paulo Brandão é o responsável técnico pelo Laboratório Santa Helena e acompanha
                há décadas a rotina laboratorial e a formação de estudantes. Neste vídeo, ele
                apresenta a experiência e o cuidado técnico que orientam o material.
              </p>
              <ul>
                <li>
                  <Check /> Responsável técnico pelo laboratório.
                </li>
                <li>
                  <Check /> Especialista em Análises Clínicas pelo TEAC/SBAC.
                </li>
                <li>
                  <Check /> Experiência com estudantes, docência e rotina real.
                </li>
              </ul>
              <CTA label="QUERO ME PREPARAR POR R$ 27" />
              <span className="video-note">Vídeo de 1min10s · com legendas</span>
            </div>
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
                      <small>1min10s</small>
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
        </section>

        <section className="section preview-section" id="previas">
          <div className="container">
            <header className="section-heading">
              <div>
                <span className="section-label">PÁGINAS REAIS DO MATERIAL</span>
                <h2>Veja como o conteúdo foi organizado.</h2>
              </div>
              <p>
                Toque em qualquer página para ampliar e conferir a legibilidade antes de comprar.
              </p>
            </header>
            <div className="preview-grid">
              {previews.map((preview) => (
                <button
                  className="preview-card"
                  key={preview.page}
                  onClick={() => setOpenPreview(preview)}
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
              ))}
            </div>
            <p className="preview-disclaimer">
              A seleção mostra páginas integrais do PDF final. O restante do material é liberado
              após a compra.
            </p>
          </div>
        </section>

        <section className="section learning-section">
          <div className="container">
            <header className="section-heading compact-heading">
              <div>
                <span className="section-label">O QUE VOCÊ RECEBE</span>
                <h2>Uma preparação objetiva para o que você vai encontrar.</h2>
              </div>
            </header>
            <div className="learning-grid">
              {learningItems.map(([title, text, Icon]) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="use-note">
              <Sparkles aria-hidden="true" />
              <p>
                <b>Como usar:</b> leia por completo ou siga o plano de sete dias na semana anterior
                ao estágio. Depois, volte aos checklists e ao glossário quando precisar revisar.
              </p>
            </div>
          </div>
        </section>

        <section className="section reviews-section">
          <div className="container reviews-wrap">
            <header>
              <span className="section-label">OPINIÕES SOBRE O GUIA</span>
              <h2>Relatos de quem leu o material.</h2>
              <p>
                Comentários apresentados de forma anônima, sem criar nomes, fotos, notas ou cargos.
              </p>
            </header>
            <div className="review-grid">
              {reviews.map((review, index) => (
                <blockquote key={review}>
                  <Quote aria-hidden="true" />
                  <p>“{review}”</p>
                  <footer>Leitora {index + 1} · opinião sobre o guia</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="section authority-section">
          <div className="container authority-grid">
            <div className="authority-photos">
              <img
                className="paulo-photo"
                src={siteConfig.drPauloPhoto}
                alt="Dr. Paulo Brandão"
                loading="lazy"
              />
              <img
                className="students-photo"
                src={siteConfig.laboratoryPhoto}
                alt="Dr. Paulo Brandão com estudantes no Laboratório Santa Helena"
                loading="lazy"
              />
            </div>
            <div className="authority-copy">
              <span className="section-label">CREDIBILIDADE VERIFICÁVEL</span>
              <h2>Experiência real por trás do material.</h2>
              <p>
                O Laboratório Santa Helena atua desde 1988 em Análises Clínicas e Medicina
                Ocupacional. O guia foi revisado pelo responsável técnico da instituição, Dr. Paulo
                Brandão.
              </p>
              <ul>
                <li>
                  <Check /> Biólogo e farmacêutico-bioquímico.
                </li>
                <li>
                  <Check /> Especialista em Análises Clínicas pelo TEAC/SBAC.
                </li>
                <li>
                  <Check /> Trajetória em laboratório, docência e formação de estudantes.
                </li>
              </ul>
              <p className="authority-note">
                O TEPAC — Programa de Treinamento Especializado Prático em Análises Clínicas é uma
                iniciativa presencial separada. O produto desta página é somente o guia digital de
                preparação teórica.
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
            </div>
          </div>
        </section>

        <section className="section offer-section" id="oferta">
          <div className="container offer-card">
            <div className="offer-cover">
              <img src="/images/guide-preview/p01-capa.jpg" alt="Capa do guia" loading="lazy" />
            </div>
            <div className="offer-copy">
              <span className="section-label">ACESSO DIGITAL</span>
              <h2>Guia do Primeiro Estágio em Análises Clínicas</h2>
              <p>47 páginas · edição 2026 · leitura no celular, tablet ou computador.</p>
              <ul>
                <li>
                  <Check /> Checklist do primeiro dia e postura do estagiário
                </li>
                <li>
                  <Check /> Biossegurança, fase pré-analítica e principais setores
                </li>
                <li>
                  <Check /> Plano de sete dias, glossário e revisão comentada
                </li>
              </ul>
              <div className="offer-extra">
                <Sparkles />
                <span>
                  Após escolher o guia, você também poderá adicionar materiais complementares de
                  revisão por um valor especial.
                </span>
              </div>
              <div className="offer-price">
                <small>Pagamento único</small>
                <strong>R$ 27,00</strong>
              </div>
              <CTA label="QUERO ACESSAR O GUIA AGORA" />
              <p className="checkout-note">
                <LockKeyhole /> Entrega digital instantânea após o pagamento, conforme o checkout.
              </p>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-wrap">
            <header>
              <span className="section-label">DÚVIDAS FREQUENTES</span>
              <h2>Antes de comprar, vale saber.</h2>
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
          <small>Guia digital</small>
          <b>R$ 27,00</b>
        </span>
        <CTA label="COMPRAR AGORA" />
      </aside>

      {openPreview && (
        <div
          className="preview-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Página ${openPreview.page}: ${openPreview.title}`}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpenPreview(null);
          }}
        >
          <div className="preview-modal-card">
            <div className="preview-modal-head">
              <span>
                <small>PÁGINA {openPreview.page}</small>
                <b>{openPreview.title}</b>
              </span>
              <button autoFocus onClick={() => setOpenPreview(null)} aria-label="Fechar prévia">
                <X />
              </button>
            </div>
            <div className="preview-modal-scroll">
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
