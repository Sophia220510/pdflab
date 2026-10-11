import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minus,
  Plus,
  Play,
  X,
} from "lucide-react";
import { checkoutWithUtm, siteConfig, trackEvent } from "@/lib/guide-config";

const previews = [
  {
    page: 9,
    title: "As três fases do exame",
    src: "/images/guide-preview/p09-tres-fases-do-exame.jpg",
    helps: "Onde entram solicitação, análise e laudo na jornada da amostra.",
    use: "Consulte para reconhecer as etapas que o supervisor apresenta na rotina.",
  },
  {
    page: 16,
    title: "Checklist do primeiro dia",
    src: "/images/guide-preview/p16-checklist-primeiro-dia.jpg",
    helps: "O que observar na chegada, na orientação inicial e no fechamento do dia.",
    use: "Leve como lembrete dos pontos que precisa confirmar com o supervisor.",
  },
  {
    page: 42,
    title: "Plano de preparação em sete dias",
    src: "/images/guide-preview/p42-plano-sete-dias.jpg",
    helps: "Uma sequência de revisão de fluxo, biossegurança, amostras, setores e qualidade.",
    use: "Distribua sua revisão antes de começar ou durante as primeiras semanas.",
  },
] as const;

const contents = [
  [
    "01",
    "Rotina e primeiro dia",
    "Jornada da amostra, três fases do exame, postura, supervisão e checklist do primeiro dia.",
  ],
  [
    "02",
    "Cuidados essenciais",
    "Biossegurança, fase pré-analítica, identificação, tubos, interferentes e transporte de amostras.",
  ],
  [
    "03",
    "Setores e qualidade",
    "Panorama dos principais setores, controles da qualidade, registros, sigilo e comunicação.",
  ],
  [
    "04",
    "Sua revisão organizada",
    "Plano de preparação em sete dias, glossário, teste rápido e respostas comentadas.",
  ],
] as const;

const faqs = [
  [
    "Serve para quem ainda não começou?",
    "Sim. Preparei o Guia para ajudar você a organizar o que revisar antes do primeiro dia e reconhecer melhor o ambiente que vai encontrar.",
  ],
  [
    "Serve para quem começou recentemente?",
    "Sim. Você pode consultar o material nas primeiras semanas, retomar conceitos e anotar dúvidas para conversar com o supervisor.",
  ],
  [
    "Para quais estudantes é indicado?",
    "Para estudantes de Biomedicina, Farmácia, Ciências Biológicas e áreas relacionadas que terão contato com Análises Clínicas, respeitando as atribuições e a grade de cada formação.",
  ],
  [
    "É PDF ou curso em vídeo?",
    `O produto é um Guia em PDF, com ${siteConfig.productPages} páginas. O vídeo desta página é uma apresentação minha; a compra não inclui um curso em vídeo nem treinamento presencial.`,
  ],
  [
    "Posso ler pelo celular?",
    "Sim. Você pode ler o PDF no celular, tablet ou computador e ampliar as páginas no leitor de sua preferência.",
  ],
  [
    "Como recebo o material?",
    "A compra é feita pela Kiwify e o acesso ao material é digital após a aprovação do pagamento. Cadastre um e-mail válido e siga as instruções de acesso informadas pela plataforma.",
  ],
  [
    `O que está incluído nos ${siteConfig.productPrice}?`,
    "O Guia digital, com rotina laboratorial, checklist do primeiro dia, biossegurança, fase pré-analítica, panorama dos setores, plano de sete dias, glossário, teste e respostas comentadas.",
  ],
  [
    "Os materiais complementares são opcionais?",
    "Sim. Os complementos oferecidos no checkout são opcionais, cobrados à parte e não fazem parte do preço do Guia. Você pode comprar somente o Guia.",
  ],
  [
    "Como falar com o suporte?",
    siteConfig.supportEmail
      ? "Para dúvidas sobre o Guia, use o e-mail de suporte abaixo. Para questões relacionadas ao pagamento, consulte também o atendimento da Kiwify."
      : "Você encontra os contatos do Laboratório Santa Helena no site oficial, no link abaixo. Para questões sobre pagamento ou acesso, consulte também o atendimento da Kiwify e tenha os dados da compra em mãos.",
  ],
  [
    "O Guia substitui a orientação do laboratório?",
    "Não. É material educacional de preparação e revisão. A execução de técnicas exige treinamento, autorização e supervisão. Os procedimentos e as orientações da instituição sempre têm prioridade.",
  ],
] as const;

type CtaPosition = "hero" | "students" | "authority" | "offer" | "floating" | "final";

function StudentGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [visiblePhotos, setVisiblePhotos] = useState(1);
  const photos = siteConfig.studentPhotos;
  const lastPhoto = photos.length - visiblePhotos;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updateLayout = () => {
      const count = window.matchMedia("(min-width: 768px)").matches ? 3 : 1;
      setVisiblePhotos(count);
      setActivePhoto((current) => Math.min(current, photos.length - count));
    };
    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    observer.observe(track);
    return () => observer.disconnect();
  }, [photos.length]);

  const goToPhoto = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(lastPhoto, index));
    const slide = track.children[next] as HTMLElement;
    track.scrollTo({
      left: slide.offsetLeft - (track.children[0] as HTMLElement).offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const updateActivePhoto = () => {
    const track = trackRef.current;
    if (!track) return;
    const start = (track.children[0] as HTMLElement).offsetLeft;
    let nearest = 0;
    let distance = Infinity;
    Array.from(track.children).forEach((child, index) => {
      if (index > lastPhoto) return;
      const currentDistance = Math.abs(
        (child as HTMLElement).offsetLeft - start - track.scrollLeft,
      );
      if (currentDistance < distance) {
        distance = currentDistance;
        nearest = index;
      }
    });
    setActivePhoto(nearest);
  };

  return (
    <section className="section students-section" aria-labelledby="students-title">
      <div className="container">
        <header className="section-heading">
          <span className="section-label">EXPERIÊNCIA REAL COM ESTUDANTES</span>
          <h2 id="students-title">Quem ensina na rotina conhece as dúvidas do começo.</h2>
          <p>
            No Santa Helena, acompanho a rotina do laboratório e a orientação de estudantes. Levei
            essa experiência para o Guia: uma direção para o que revisar, observar e perguntar.
          </p>
        </header>
        <p id="student-gallery-help" className="sr-only">
          Deslize para o lado ou use as setas para ver as fotos.
        </p>
        <div className="student-carousel">
          <div className="student-gallery-arrows">
            <button
              type="button"
              aria-label="Foto anterior"
              aria-controls="student-photo-track"
              disabled={activePhoto === 0}
              onClick={() => goToPhoto(activePhoto - 1)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Próxima foto"
              aria-controls="student-photo-track"
              disabled={activePhoto === lastPhoto}
              onClick={() => goToPhoto(activePhoto + 1)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <div
            id="student-photo-track"
            className="student-photo-track"
            ref={trackRef}
            role="region"
            aria-label="Fotos reais com alunos e atividades no laboratório"
            aria-roledescription="carrossel"
            aria-describedby="student-gallery-help"
            tabIndex={0}
            onScroll={updateActivePhoto}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                goToPhoto(activePhoto + (event.key === "ArrowRight" ? 1 : -1));
              } else if (event.key === "Home" || event.key === "End") {
                event.preventDefault();
                goToPhoto(event.key === "Home" ? 0 : lastPhoto);
              }
            }}
          >
            {photos.map((photo, index) => (
              <figure
                key={photo.src}
                className="student-photo-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`Foto ${index + 1} de ${photos.length}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="student-gallery-footer">
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            Foto {activePhoto + 1} de {photos.length}
          </span>
          <div className="student-gallery-dots" aria-label="Escolher foto">
            {photos.slice(0, lastPhoto + 1).map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                aria-label={`Ver foto ${index + 1}`}
                aria-current={activePhoto === index ? "true" : undefined}
                aria-controls="student-photo-track"
                onClick={() => goToPhoto(index)}
              >
                <span />
              </button>
            ))}
          </div>
        </div>
        <div className="student-gallery-purchase">
          <CTA position="students" label="Quero meu Guia por R$27" />
        </div>
        <p className="student-gallery-note">
          Registros reais da formação no laboratório. O Guia é uma preparação teórica e não inclui
          estágio ou aulas presenciais; a prática exige orientação e supervisão.
        </p>
      </div>
    </section>
  );
}

function CTA({
  label = siteConfig.ctaLabel,
  position,
  className = "",
}: {
  label?: string;
  position: CtaPosition;
  className?: string;
}) {
  const search = useLocation({ select: (location) => location.searchStr });
  const href = checkoutWithUtm(search);
  const lastClickRef = useRef(0);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.type === "auxclick" && event.button !== 1) return;
    const now = Date.now();
    if (now - lastClickRef.current < 800) {
      event.preventDefault();
      return;
    }
    lastClickRef.current = now;
    trackEvent("cta_click", { label, position });
    trackEvent("checkout_start", { position });
  };

  return (
    <a
      className={`cta ${className}`}
      href={href}
      data-cta-position={position}
      onClick={handleClick}
      onAuxClick={handleClick}
    >
      {label}
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

function Brand() {
  return (
    <a
      className="brand"
      href={siteConfig.links.laboratory}
      target="_blank"
      rel="noreferrer"
      aria-label="Visitar o site do Laboratório Santa Helena"
    >
      <img src={siteConfig.logoUrl} alt="" width="27" height="35" />
      <span>
        Laboratório<strong>Santa Helena</strong>
      </span>
    </a>
  );
}

export function GuideLanding() {
  const [openPreview, setOpenPreview] = useState<(typeof previews)[number] | null>(null);
  const [previewZoomed, setPreviewZoomed] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showFloatingBuy, setShowFloatingBuy] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoTrackedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    trackEvent("page_view");
  }, []);

  useEffect(() => {
    const heroCta = document.querySelector("[data-cta-position='hero']");
    const controls = document.querySelectorAll(
      ".video-media, [data-cta-position='students'], [data-cta-position='offer'], [data-cta-position='final']",
    );
    if (!heroCta) return;
    const update = () => {
      const heroPassed = heroCta.getBoundingClientRect().bottom < 0;
      const controlsVisible = Array.from(controls).some((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      setShowFloatingBuy(heroPassed && !controlsVisible);
    };
    const observer = new IntersectionObserver(update);
    observer.observe(heroCta);
    controls.forEach((element) => observer.observe(element));
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
        dialogRef.current.querySelectorAll<HTMLElement>("button, [tabindex='0']"),
      );
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

  const floatingVisible = showFloatingBuy && !openPreview;

  return (
    <div className="landing">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="topbar" inert={!!openPreview}>
        <div className="container topbar-inner">
          <Brand />
          <span className="topbar-proof">Experiência laboratorial desde 1988</span>
          <a className="topbar-link" href="#previas">
            Ver o Guia por dentro
          </a>
        </div>
      </header>

      <main id="conteudo" inert={!!openPreview}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="author-intro">
                <img src={siteConfig.heroAuthorPhoto} alt="Paulo Brandão" width="64" height="64" />
                <div>
                  <b>Paulo Brandão</b>
                  <span>Autor do Guia · Farmacêutico-Bioquímico</span>
                </div>
              </div>
              <h1 id="hero-title">
                Seu estágio está começando.<em>Quero ajudar você a chegar mais preparado.</em>
              </h1>
              <p className="hero-lead">
                Sou Paulo Brandão. Preparei este Guia para organizar sua revisão e ajudar você a
                entender melhor a rotina do laboratório, antes de começar e nas primeiras semanas.
              </p>
              <p className="hero-product-name">{siteConfig.productName}</p>
              <p className="hero-meta">
                PDF digital · {siteConfig.productPages} páginas · edição {siteConfig.productEdition}
              </p>
              <div className="hero-purchase">
                <strong>{siteConfig.productPrice}</strong>
                <span>pagamento único</span>
              </div>
              <CTA position="hero" />
              <p className="purchase-note">
                Leia no celular, tablet ou computador.
                <br />
                Acesso digital após a aprovação do pagamento.
              </p>
            </div>
            <div className="hero-visual">
              <figure className="author-portrait">
                <div className="author-photo-frame">
                  <img
                    src={siteConfig.heroAuthorPhoto}
                    alt="Paulo Brandão, autor do Guia"
                    width="838"
                    height="645"
                    fetchPriority="high"
                  />
                </div>
                <figcaption>
                  <b>Paulo Brandão</b>
                  <span>Autor do Guia · Responsável técnico do Santa Helena</span>
                </figcaption>
              </figure>
              <div className="hero-book">
                <img
                  src={siteConfig.coverImage}
                  alt="Capa da edição atual do Guia em PDF"
                  width="1340"
                  height="1895"
                />
                <span>Seu material de preparação e consulta</span>
              </div>
            </div>
          </div>
        </section>

        <StudentGallery />

        <section className="section doubts-section" aria-labelledby="doubts-title">
          <div className="container editorial-grid">
            <header>
              <span className="section-label">PARA QUEM ESTÁ COMEÇANDO</span>
              <h2 id="doubts-title">
                A teoria você já viu.
                <br />A rotina ainda é novidade.
              </h2>
            </header>
            <div className="editorial-copy">
              <p>
                É comum conhecer os termos da faculdade e ainda ter dúvidas sobre como eles aparecem
                no laboratório. Talvez você não saiba o que revisar, não reconheça alguns materiais
                ou fique em dúvida sobre o que perguntar.
              </p>
              <ul className="simple-list">
                <li>
                  <Check aria-hidden="true" />O que acontece entre o pedido do exame e o laudo?
                </li>
                <li>
                  <Check aria-hidden="true" />O que preciso observar nos setores?
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Quais cuidados devo revisar antes de acompanhar a rotina?
                </li>
              </ul>
              <p className="editorial-emphasis">
                Minha proposta é dar a você uma direção: o que revisar, o que observar e quais
                dúvidas levar ao supervisor.
              </p>
            </div>
          </div>
        </section>

        <section className="purpose-section" aria-labelledby="purpose-title">
          <div className="container purpose-inner">
            <span className="section-label">POR QUE PREPAREI ESTE GUIA</span>
            <h2 id="purpose-title">
              Para você ter um ponto de partida — e um material para voltar quando precisar.
            </h2>
            <p>
              Reuni os fundamentos da rotina laboratorial em uma sequência de leitura e consulta.
              Você pode estudar antes de começar, retomar um assunto nos primeiros dias e organizar
              sua revisão ao longo das primeiras semanas.
            </p>
            <p className="purpose-signoff">
              A ideia é chegar para aprender, com mais clareza sobre o que observar e quando pedir
              orientação.
            </p>
          </div>
        </section>

        <section className="section preview-section" id="previas" aria-labelledby="preview-title">
          <div className="container">
            <header className="section-heading">
              <span className="section-label">PÁGINAS REAIS DO PDF</span>
              <h2 id="preview-title">
                Veja como organizei
                <br />o material por dentro.
              </h2>
              <p>
                Selecione uma página para ampliar. Aqui estão três exemplos do conteúdo que você
                recebe.
              </p>
            </header>
            <div className="preview-grid">
              {previews.map((preview) => (
                <article className="preview-item" key={preview.page}>
                  <button
                    className="preview-card"
                    type="button"
                    onClick={(event) => {
                      previewTriggerRef.current = event.currentTarget;
                      setPreviewZoomed(false);
                      setOpenPreview(preview);
                    }}
                    aria-label={`Ampliar página ${preview.page}: ${preview.title}`}
                  >
                    <img
                      src={preview.src}
                      alt={`Prévia real: ${preview.title}`}
                      loading="lazy"
                      width="1340"
                      height="1895"
                    />
                    <span>
                      <Maximize2 aria-hidden="true" />
                      Ampliar página {preview.page}
                    </span>
                  </button>
                  <div className="preview-explanation">
                    <h3>{preview.title}</h3>
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
          </div>
        </section>

        <section className="section contents-section" aria-labelledby="contents-title">
          <div className="container editorial-grid">
            <header>
              <span className="section-label">O QUE VOCÊ RECEBE</span>
              <h2 id="contents-title">
                Um Guia organizado
                <br />
                para estudar e consultar.
              </h2>
              <p>
                {siteConfig.productPages} páginas em PDF, com leitura no celular, tablet ou
                computador.
              </p>
              <a className="text-link" href="#oferta">
                Ver a oferta
                <ArrowRight aria-hidden="true" />
              </a>
            </header>
            <div>
              <div className="contents-list">
                {contents.map(([number, title, text]) => (
                  <article key={number}>
                    <span aria-hidden="true">{number}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="complements-note">
                <Plus aria-hidden="true" />
                <p>
                  <b>Complementos opcionais</b>Após escolher o Guia, você também poderá adicionar
                  materiais complementares de revisão por um valor especial. Eles são cobrados à
                  parte e não estão incluídos no preço do Guia.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="section about-section" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-copy">
              <span className="section-label">SOBRE MIM</span>
              <h2 id="about-title">
                Sou Paulo Brandão.
                <br />
                Criei este Guia para acompanhar sua preparação.
              </h2>
              <p>
                Sou biólogo e farmacêutico-bioquímico, com título de Especialista em Análises
                Clínicas pelo TEAC/SBAC. Minha trajetória inclui rotina laboratorial, docência,
                palestras e contato com estudantes.
              </p>
              <p>
                Sou responsável técnico do Laboratório Santa Helena, que atua desde 1988 em Análises
                Clínicas e Medicina Ocupacional. Essa experiência dá contexto ao conteúdo que reuni
                aqui.
              </p>
              <div className="authority-links">
                <a href={siteConfig.links.drPaulo} target="_blank" rel="noreferrer">
                  Minha trajetória profissional
                  <ExternalLink aria-hidden="true" />
                </a>
                <a href={siteConfig.links.laboratory} target="_blank" rel="noreferrer">
                  Conheça o Santa Helena
                  <ExternalLink aria-hidden="true" />
                </a>
              </div>
              <CTA position="authority" />
            </div>
            {siteConfig.videoUrl && (
              <div className="video-column">
                <p>Também deixei uma mensagem para você.</p>
                <div className="video-frame">
                  <div className="video-media">
                    <video
                      ref={videoRef}
                      controls
                      playsInline
                      preload="none"
                      poster={siteConfig.videoPoster}
                      aria-label="Mensagem de Paulo Brandão sobre o Guia"
                      onPlay={() => {
                        if (!videoTrackedRef.current) {
                          videoTrackedRef.current = true;
                          trackEvent("video_play");
                        }
                      }}
                    >
                      <source src={siteConfig.videoUrl} type="video/mp4" />
                      Seu navegador não consegue reproduzir este vídeo.
                    </video>
                    {!videoStarted && (
                      <button
                        className="video-poster"
                        type="button"
                        aria-label="Assistir à mensagem de Paulo Brandão"
                        onClick={() => {
                          setVideoError(false);
                          setVideoStarted(true);
                          void videoRef.current?.play().catch(() => {
                            setVideoStarted(false);
                            setVideoError(true);
                          });
                        }}
                      >
                        <img
                          src={siteConfig.videoPoster}
                          alt="Paulo Brandão no laboratório"
                          width="478"
                          height="850"
                          loading="lazy"
                        />
                        <span className="video-overlay" aria-hidden="true">
                          <span className="play-button">
                            <Play />
                          </span>
                          <b>Assistir à minha mensagem</b>
                        </span>
                      </button>
                    )}
                  </div>
                  <p className="video-caption">Paulo Brandão · Autor do Guia</p>
                  {videoError && (
                    <p className="video-error" role="status">
                      Não foi possível iniciar o vídeo. Toque para tentar novamente ou continue
                      conhecendo o Guia.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="section offer-section" id="oferta" aria-labelledby="offer-title">
          <div className="container offer-card">
            <figure className="offer-cover">
              <img
                src={siteConfig.coverImage}
                alt="Capa da edição atual do Guia em PDF"
                width="1340"
                height="1895"
                loading="lazy"
              />
              <figcaption>PDF · edição {siteConfig.productEdition}</figcaption>
            </figure>
            <div className="offer-copy">
              <span className="section-label">SEU GUIA DE PREPARAÇÃO E REVISÃO</span>
              <h2 id="offer-title">{siteConfig.productName}</h2>
              <p>
                Preparei um material para você revisar antes de começar e consultar no início do
                estágio. Tudo em um único PDF.
              </p>
              <ul className="simple-list">
                <li>
                  <Check aria-hidden="true" />
                  {siteConfig.productPages} páginas: rotina, biossegurança, fase pré-analítica e
                  setores.
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Checklist, plano de sete dias, glossário e revisão final.
                </li>
                <li>
                  <Check aria-hidden="true" />
                  Leitura no celular, tablet ou computador.
                </li>
              </ul>
              <div className="offer-price">
                <strong>{siteConfig.productPrice}</strong>
                <span>pagamento único</span>
              </div>
              <CTA position="offer" />
              <p className="checkout-note">
                Compra pela Kiwify. Acesso digital após a aprovação do pagamento, seguindo as
                instruções da plataforma.
              </p>
              <p className="offer-limits">
                Material teórico. Na prática, siga o treinamento, a supervisão e os procedimentos do
                seu laboratório.
              </p>
            </div>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="container faq-wrap">
            <header className="section-heading">
              <span className="section-label">ANTES DE COMPRAR</span>
              <h2 id="faq-title">Talvez você queira saber.</h2>
            </header>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <ChevronDown aria-hidden="true" />
                  </summary>
                  <div className="faq-answer">
                    <p>{answer}</p>
                    {question === "Como falar com o suporte?" && (
                      <a
                        className="text-link"
                        href={
                          siteConfig.supportEmail
                            ? `mailto:${siteConfig.supportEmail}`
                            : siteConfig.links.laboratory
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {siteConfig.supportEmail || "Contatos do Laboratório Santa Helena"}
                        <ExternalLink aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-section" aria-labelledby="final-title">
          <div className="container final-inner">
            <div>
              <span className="section-label">ANTES OU DURANTE AS PRIMEIRAS SEMANAS</span>
              <h2 id="final-title">Quero ajudar você a aproveitar melhor esse começo.</h2>
              <p>{siteConfig.productPrice} · pagamento único · Guia digital em PDF</p>
            </div>
            <CTA position="final" />
          </div>
        </section>
      </main>

      <footer className="site-footer" inert={!!openPreview}>
        <div className="container footer-main">
          <Brand />
          <p>
            Material educacional de preparação e revisão. Não substitui treinamento prático,
            supervisão, POPs, avaliação de competência ou orientação do responsável técnico.
          </p>
          <div className="footer-links">
            <a href={siteConfig.links.laboratory} target="_blank" rel="noreferrer">
              Site do laboratório
            </a>
            <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
              Instagram oficial
            </a>
            <span>
              São Paulo — SP
              <br />© {new Date().getFullYear()} Laboratório Santa Helena
            </span>
          </div>
        </div>
      </footer>

      <aside
        className={`floating-buy ${floatingVisible ? "is-visible" : ""}`}
        aria-label="Comprar o Guia"
        aria-hidden={!floatingVisible}
        inert={!floatingVisible}
      >
        <span>
          <b>{siteConfig.productPrice}</b>
          <small>pagamento único</small>
        </span>
        <CTA label="Quero acessar o Guia" position="floating" />
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
            aria-describedby="preview-modal-help"
            ref={dialogRef}
          >
            <div className="preview-modal-head">
              <div>
                <small>PÁGINA {openPreview.page}</small>
                <b id="preview-modal-title">{openPreview.title}</b>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpenPreview(null)}
                aria-label="Fechar prévia"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="preview-modal-tools">
              <p id="preview-modal-help">Amplie para ler e deslize a página para navegar.</p>
              <button
                type="button"
                aria-pressed={previewZoomed}
                onClick={() => setPreviewZoomed(!previewZoomed)}
              >
                {previewZoomed ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
                {previewZoomed ? "Ajustar" : "Ampliar"}
              </button>
            </div>
            <div
              className={`preview-modal-scroll ${previewZoomed ? "is-zoomed" : ""}`}
              tabIndex={0}
              role="region"
              aria-label="Página do Guia ampliável"
            >
              <img
                src={openPreview.src}
                alt={`Página ${openPreview.page} do Guia: ${openPreview.title}`}
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
