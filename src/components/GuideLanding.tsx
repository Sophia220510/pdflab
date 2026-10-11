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
import { checkoutWithUtm, siteConfig } from "@/lib/guide-config";

const previews = [
  {
    page: 26,
    title: "Tubos de coleta: mapa visual",
    src: "/images/guide-preview/p26-tubos-previa.webp",
    helps: "Cores, aditivos e o que conferir no rótulo, sempre seguindo o procedimento local.",
  },
] as const;

const contents = [
  "Rotina laboratorial e principais setores.",
  "Biossegurança e fase pré-analítica.",
  "Checklist do primeiro dia.",
  "Plano de preparação em sete dias.",
  "Glossário, teste e respostas comentadas.",
] as const;

const faqs = [
  [
    "Para quem é e em que momento usar?",
    "Para estudantes de Biomedicina, Farmácia, Ciências Biológicas e áreas relacionadas. Preparei o Guia para quem vai começar ou começou recentemente o estágio em Análises Clínicas. É material educacional: não autoriza técnicas nem substitui treinamento, supervisão e procedimentos da instituição.",
  ],
  [
    "É PDF ou curso em vídeo? Posso ler no celular?",
    "É um Guia digital em PDF, com 47 páginas, edição 2026. Você pode ler e ampliar as páginas no celular, tablet ou computador. O vídeo desta página apresenta o material; a compra não inclui curso em vídeo ou aulas presenciais.",
  ],
  [
    "Como recebo e acesso?",
    "A compra é feita pela Kiwify. Após a aprovação do pagamento, siga as instruções de acesso digital da plataforma. Use um e-mail válido e confira os dados cadastrados na compra.",
  ],
  [
    "O que está incluído? Os complementos são opcionais?",
    "Os R$27 incluem o Guia completo: rotina, setores, biossegurança, fase pré-analítica, checklist, plano de sete dias, glossário, teste e respostas comentadas. Complementos oferecidos no checkout são opcionais e pagos à parte. Você pode comprar somente o Guia.",
  ],
  [
    "Como falar com o suporte?",
    siteConfig.supportEmail
      ? "Use o e-mail abaixo para dúvidas sobre o Guia. Para questões de pagamento ou acesso, consulte também o atendimento da Kiwify."
      : "Consulte os contatos públicos do Laboratório Santa Helena no link abaixo. Para questões de pagamento ou acesso, procure também o atendimento da Kiwify com os dados da compra.",
  ],
] as const;

type CtaPosition = "hero" | "offer" | "floating";

function StudentGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    lastX: number;
    startScroll: number;
    startPhoto: number;
  } | null>(null);
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

  const finishDrag = (cancelled = false) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag) return;
    dragRef.current = null;
    const distance = drag.startX - drag.lastX;
    const step =
      (track.children[1] as HTMLElement).offsetLeft - (track.children[0] as HTMLElement).offsetLeft;
    let next = Math.round(track.scrollLeft / step);
    if (!cancelled && Math.abs(distance) > 40 && next === drag.startPhoto) {
      next += Math.sign(distance);
    }
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(drag.pointerId)) track.releasePointerCapture(drag.pointerId);
    goToPhoto(next);
  };

  return (
    <section className="section students-section" aria-labelledby="students-title">
      <div className="container">
        <header className="section-heading">
          <span className="section-label">EXPERIÊNCIA REAL COM ESTUDANTES</span>
          <h2 id="students-title">Ensinar faz parte da minha rotina.</h2>
          <p>
            Sou biólogo, farmacêutico-bioquímico e especialista em Análises Clínicas pelo TEAC/SBAC.
            Como responsável técnico do Santa Helena, acompanho a rotina e a orientação de
            estudantes.
          </p>
        </header>
        <p id="student-gallery-help" className="sr-only">
          Deslize com o dedo, arraste com o mouse ou use as setas para ver as fotos.
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
            onPointerDown={(event) => {
              // Touch keeps native horizontal swipe and vertical page scrolling.
              if (event.pointerType !== "mouse" || event.button !== 0) return;
              event.preventDefault();
              const track = event.currentTarget;
              track.focus({ preventScroll: true });
              dragRef.current = {
                pointerId: event.pointerId,
                startX: event.clientX,
                lastX: event.clientX,
                startScroll: track.scrollLeft,
                startPhoto: activePhoto,
              };
              track.classList.add("is-dragging");
              track.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              const drag = dragRef.current;
              if (!drag || drag.pointerId !== event.pointerId) return;
              drag.lastX = event.clientX;
              event.currentTarget.scrollLeft = drag.startScroll + drag.startX - event.clientX;
            }}
            onPointerUp={() => finishDrag()}
            onPointerCancel={() => finishDrag(true)}
            onLostPointerCapture={() => finishDrag(true)}
            onDragStart={(event) => event.preventDefault()}
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
                  draggable={false}
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const heroCta = document.querySelector("[data-cta-position='hero']");
    const controls = document.querySelectorAll(".video-media, [data-cta-position='offer']");
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
        <section className="hero compact-hero" aria-labelledby="hero-title">
          <div className="container compact-hero-grid">
            <div className="compact-hero-intro">
              <p className="section-label">PAULO BRANDÃO · AUTOR DO GUIA</p>
              <h1 id="hero-title">
                Seu estágio está começando.<em>Quero ajudar você a chegar mais preparado.</em>
              </h1>
              <p className="hero-lead">
                Preparei este Guia para organizar sua revisão e ajudar você a acompanhar a rotina do
                laboratório — antes de começar ou nas primeiras semanas.
              </p>
              <p className="hero-meta">
                O produto é um Guia digital em PDF, não um curso em vídeo.
              </p>
            </div>
            <div className="hero-vsl">
              {siteConfig.videoUrl && (
                <div className="video-column">
                  <div className="video-frame">
                    <div className="video-media">
                      <video
                        ref={videoRef}
                        controls
                        playsInline
                        preload="none"
                        poster={siteConfig.videoPoster}
                        aria-label="Mensagem de Paulo Brandão sobre o Guia"
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
                            fetchPriority="high"
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
            <div className="compact-hero-purchase">
              <p className="hero-product-name">{siteConfig.productName}</p>
              <div className="hero-purchase">
                <strong>{siteConfig.productPrice}</strong>
                <span>pagamento único</span>
              </div>
              <CTA position="hero" />
              <p className="purchase-note">
                PDF · 47 páginas · edição 2026
                <br />
                Leia no celular, tablet ou computador. Acesso digital após aprovação do pagamento.
              </p>
            </div>
          </div>
        </section>

        <StudentGallery />

        <section className="section preview-section" id="previas" aria-labelledby="preview-title">
          <div className="container">
            <header className="section-heading">
              <span className="section-label">PRÉVIA DO GUIA · PÁGINA 26</span>
              <h2 id="preview-title">Veja o Guia por dentro.</h2>
              <p>
                Um exemplo do conteúdo visual do material. Toque ou clique na página para ampliar e
                ler.
              </p>
            </header>
            <div className="single-preview">
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
                      width="2067"
                      height="2924"
                    />
                    <span>
                      <Maximize2 aria-hidden="true" />
                      Ampliar página {preview.page}
                    </span>
                  </button>
                  <div className="preview-explanation">
                    <h3>{preview.title}</h3>
                    <p>{preview.helps}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contents-section" aria-labelledby="contents-title">
          <div className="container compact-contents">
            <header>
              <span className="section-label">O QUE VOCÊ RECEBE</span>
              <h2 id="contents-title">Uma direção para estudar e consultar.</h2>
              <p>
                Reuni os fundamentos para você reconhecer o fluxo do laboratório, entender termos e
                setores e levar dúvidas mais claras ao supervisor.
              </p>
              <p>
                Você pode seguir a leitura antes do primeiro dia ou retomar os assuntos conforme
                eles aparecem nas primeiras semanas. O checklist e o plano de sete dias ajudam a
                organizar essa preparação.
              </p>
            </header>
            <div>
              <ul className="simple-list compact-content-list">
                {contents.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <aside className="complements-note">
                <Plus aria-hidden="true" />
                <p>
                  Complementos no checkout são opcionais e pagos à parte. O Guia de R$27 pode ser
                  comprado sozinho.
                </p>
              </aside>
            </div>
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
              <span className="section-label">SEU MATERIAL DE PREPARAÇÃO E CONSULTA</span>
              <h2 id="offer-title">{siteConfig.productName}</h2>
              <p>
                Um PDF de 47 páginas para estudar no seu ritmo, antes ou durante o início do
                estágio. Tenha os fundamentos reunidos em um material que você pode voltar a
                consultar.
              </p>
              <div className="offer-price">
                <strong>{siteConfig.productPrice}</strong>
                <span>pagamento único</span>
              </div>
              <CTA position="offer" />
              <p className="checkout-note">
                Compra pela Kiwify. Acesso digital após aprovação do pagamento, seguindo as
                instruções da plataforma.
              </p>
            </div>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="container faq-wrap">
            <header className="section-heading">
              <span className="section-label">ANTES DE COMPRAR</span>
              <h2 id="faq-title">Dúvidas rápidas.</h2>
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
      </main>

      <footer className="site-footer" inert={!!openPreview}>
        <div className="container footer-main">
          <Brand />
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
                width="2067"
                height="2924"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
