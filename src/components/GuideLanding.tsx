import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FlaskConical,
  GraduationCap,
  LockKeyhole,
  Microscope,
  Play,
  ShieldCheck,
  Sparkles,
  TestTubes,
  Users,
  X,
} from "lucide-react";
import { checkoutWithUtm, siteConfig, trackEvent } from "@/lib/guide-config";

const chapters = [
  [
    "01",
    "A rotina do laboratório",
    "Jornada da amostra, fases do exame, equipe, supervisão e rastreabilidade.",
    FlaskConical,
  ],
  [
    "02",
    "Seu primeiro dia",
    "Preparação, postura, pontualidade, boas perguntas e limites do estagiário.",
    GraduationCap,
  ],
  [
    "03",
    "Biossegurança",
    "Precauções padrão, EPI, higiene das mãos, exposições, resíduos e derramamentos.",
    ShieldCheck,
  ],
  [
    "04",
    "Fase pré-analítica",
    "Identificação, tubos, interferentes, transporte, triagem e rejeição.",
    TestTubes,
  ],
  [
    "05",
    "Principais setores",
    "Hematologia, Bioquímica, Urinálise, Parasitologia, Microbiologia e Imunologia.",
    Microscope,
  ],
  [
    "06",
    "Qualidade e conduta",
    "Controle da qualidade, não conformidades, sigilo, comunicação e LGPD.",
    ClipboardCheck,
  ],
  [
    "07",
    "Preparação final",
    "Plano de sete dias, glossário e teste com respostas comentadas.",
    BookOpen,
  ],
] as const;

const faqs = [
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
    "É especialmente útil para estudantes de Biomedicina, Farmácia e Ciências Biológicas que terão contato com Análises Clínicas, respeitando a grade e as atribuições de cada formação.",
  ],
  [
    "Como recebo o material?",
    "O acesso será digital, conforme o fluxo da plataforma de checkout. Esta informação será atualizada após a integração.",
  ],
  ["Consigo ler pelo celular?", "Sim. O PDF pode ser lido em celular, tablet ou computador."],
  [
    "O conteúdo vale mais do que o POP do meu estágio?",
    "Não. O procedimento vigente, a orientação do supervisor e as regras da instituição sempre têm prioridade.",
  ],
  ["Há certificado?", "Não há certificado informado para este material."],
];

function Logo({ light = false }: { light?: boolean }) {
  if (siteConfig.logoUrl)
    return <img src={siteConfig.logoUrl} alt="Laboratório Santa Helena" className="logo-image" />;
  return (
    <div className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-mark">SH</span>
      <span>
        <b>Laboratório</b>
        <strong>Santa Helena</strong>
      </span>
    </div>
  );
}

function CTA({
  label = "QUERO CHEGAR MAIS PREPARADO",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={checkoutWithUtm()}
      onClick={() => {
        trackEvent("cta_click", { label });
        if (siteConfig.checkoutUrl) trackEvent("checkout_start");
      }}
      className={`cta ${className}`}
    >
      {label}
      <ArrowRight size={18} />
    </a>
  );
}

function ProductMockup({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`mockup ${small ? "mockup-small" : ""}`}
      aria-label="Representação visual da capa do guia"
    >
      <div className="mockup-pages" />
      <div className="cover">
        <div className="cover-brand">LABORATÓRIO SANTA HELENA</div>
        <div className="cover-icon">
          <Microscope />
        </div>
        <span>GUIA DO</span>
        <h3>Primeiro Estágio</h3>
        <p>em Análises Clínicas</p>
        <i>Prepare-se antes do seu primeiro dia no laboratório</i>
        <div className="cover-year">EDIÇÃO 2026</div>
      </div>
      <span className="page-badge">
        47 páginas
        <br />
        acesso digital
      </span>
    </div>
  );
}

function Media({ kind, src }: { kind: "lab" | "paulo"; src: string }) {
  if (src)
    return (
      <img
        src={src}
        alt={kind === "lab" ? "Laboratório Santa Helena" : "Dr. Paulo Brandão"}
        loading="lazy"
      />
    );
  return (
    <div className="media-placeholder">
      <span>{kind === "lab" ? <FlaskConical /> : <Users />}</span>
      <b>{kind === "lab" ? "Foto real do laboratório" : "Retrato do Dr. Paulo"}</b>
      <small>Espaço reservado para o arquivo oficial</small>
    </div>
  );
}

function VideoCard() {
  return (
    <div className="video-wrap">
      <div className="video-heading">
        <span>Assista: uma mensagem de 2 minutos do Dr. Paulo Brandão</span>
        <b>
          <Clock3 size={15} /> 2 min
        </b>
      </div>
      <div className="video-box">
        {siteConfig.videoUrl ? (
          <iframe
            src={siteConfig.videoUrl}
            title="Mensagem do Dr. Paulo Brandão"
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="video-empty">
            <button type="button" aria-label="Vídeo ainda em preparação" disabled>
              <Play fill="currentColor" />
            </button>
            <strong>Vídeo em preparação</strong>
            <span>A mensagem do Dr. Paulo será publicada aqui em breve.</span>
          </div>
        )}
      </div>
      <p>
        Entenda por que este guia foi criado e como ele pode ajudar você a chegar mais preparado ao
        laboratório.
      </p>
    </div>
  );
}

export function GuideLanding() {
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    trackEvent("page_view");
    const onScroll = () => setShowSticky(window.scrollY > 760);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div>
      <header className="topbar">
        <div className="container">
          <Logo />
          <p>
            Material educacional desenvolvido com a experiência de um laboratório que atua desde
            1988.
          </p>
          <CTA label="Quero me preparar" className="cta-mini" />
        </div>
      </header>
      <main>
        <section className="hero">
          <div className="lab-pattern" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                PARA ESTUDANTES QUE ESTÃO SE PREPARANDO PARA O PRIMEIRO ESTÁGIO
              </span>
              <h1>
                Seu primeiro estágio está chegando?{" "}
                <em>Não entre no laboratório sem entender o básico.</em>
              </h1>
              <p className="hero-lead">
                Conheça o fluxo, os principais setores, os cuidados de biossegurança e a postura
                esperada para chegar ao primeiro dia mais preparado — sem promessas irreais e sem
                substituir o treinamento prático.
              </p>
              <ul className="checks">
                <li>
                  <Check /> Entenda como funciona a jornada de uma amostra.
                </li>
                <li>
                  <Check /> Reconheça os principais setores e termos da rotina.
                </li>
                <li>
                  <Check /> Saiba o que observar, perguntar e quando pedir ajuda.
                </li>
              </ul>
              <CTA />
              <span className="microcopy">
                <BookOpen size={15} /> Acesso digital • leitura no celular, tablet ou computador
              </span>
            </div>
            <div className="hero-product">
              <ProductMockup />
            </div>
          </div>
          <div className="container video-conversion">
            <VideoCard />
            <div className="video-side">
              <span className="kicker">PREPARE-SE COM RESPONSABILIDADE</span>
              <h2>Você não precisa chegar sabendo tudo.</h2>
              <p>
                Mas pode chegar entendendo o que vai encontrar, o que observar e quando pedir ajuda.
              </p>
              <CTA />
              <small>Preço e checkout serão exibidos assim que confirmados.</small>
            </div>
          </div>
        </section>

        <section className="pain section">
          <div className="container narrow">
            <span className="section-label">SE ISSO PARECE FAMILIAR...</span>
            <h2>
              O medo não é “não saber tudo”. É chegar sem entender nada do que está acontecendo.
            </h2>
            <div className="pain-grid">
              {[
                "Ouvir termos e siglas sem conseguir acompanhar",
                "Não entender o caminho entre pedido, coleta, análise e laudo",
                "Confundir iniciativa com fazer algo sem autorização",
                "Sentir vergonha de perguntar",
                "Não reconhecer riscos básicos de biossegurança",
                "Ter medo de errar logo no começo",
              ].map((x, i) => (
                <div key={x}>
                  <span>0{i + 1}</span>
                  <p>{x}</p>
                </div>
              ))}
            </div>
            <p className="bridge">
              O guia organiza o que você precisa revisar antes de entrar no laboratório — e mostra
              que responsabilidade também significa reconhecer limites e pedir orientação.
            </p>
          </div>
        </section>

        <section className="contents section">
          <div className="container">
            <Heading
              label="POR DENTRO DO GUIA"
              title="Um mapa para entender a rotina antes de vivê-la."
              side={
                <>
                  <b>47 páginas</b> organizadas para leitura completa e consulta rápida.
                </>
              }
            />
            <div className="chapter-grid">
              {chapters.map(([n, title, text, Icon]) => (
                <article key={n}>
                  <span className="chapter-number">{n}</span>
                  <Icon />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="transform section">
          <div className="container">
            <Heading
              light
              label="A TRANSFORMAÇÃO PROPOSTA"
              title="Da informação solta para uma visão organizada."
              side="Sem atalhos. Sem promessas de domínio profissional."
            />
            <div className="compare">
              <div>
                <span className="compare-tag">
                  <X /> Antes do guia
                </span>
                {[
                  "Conteúdos soltos e desorganizados",
                  "Sensação de não saber por onde começar",
                  "Termos que parecem completamente novos",
                  "Medo de perguntar ou agir errado",
                ].map((x) => (
                  <p key={x}>{x}</p>
                ))}
              </div>
              <div className="compare-after">
                <span className="compare-tag">
                  <Sparkles /> Depois de estudar
                </span>
                {[
                  "Visão mais clara do fluxo do laboratório",
                  "Noção inicial de setores e responsabilidades",
                  "Perguntas mais inteligentes para o supervisor",
                  "Segurança antes da pressa",
                  "Plano objetivo para a semana anterior",
                ].map((x) => (
                  <p key={x}>{x}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="authority section">
          <div className="container authority-row">
            <div className="authority-media">
              <Media kind="lab" src={siteConfig.laboratoryPhoto} />
            </div>
            <div>
              <span className="section-label">LABORATÓRIO SANTA HELENA</span>
              <h2>Experiência real de laboratório por trás do material</h2>
              <p>
                O Laboratório Santa Helena atua desde 1988 em Análises Clínicas e Medicina
                Ocupacional. Décadas de rotina técnica, atendimento, qualidade e contato com
                estudantes ajudam a contextualizar este material para quem está prestes a entrar no
                ambiente laboratorial.
              </p>
              <div className="facts">
                <div>
                  <b>Desde 1988</b>
                  <span>Análises Clínicas e Medicina Ocupacional</span>
                </div>
                <div>
                  <b>Experiência com estudantes</b>
                  <span>Formação, docência e palestras</span>
                </div>
                <div>
                  <b>Rotina real</b>
                  <span>Contexto de quem conhece o dia a dia</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="paulo section">
          <div className="container authority-row reverse">
            <div className="authority-media portrait">
              <Media kind="paulo" src={siteConfig.drPauloPhoto} />
            </div>
            <div>
              <span className="section-label">RESPONSABILIDADE TÉCNICA</span>
              <h2>Conheça o profissional que inspira esta preparação</h2>
              <p>
                Dr. Paulo Brandão é o responsável técnico pelo Laboratório Santa Helena. Biólogo,
                farmacêutico-bioquímico e especialista em Análises Clínicas pelo TEAC/SBAC,
                construiu sua trajetória entre a rotina laboratorial, a gestão da qualidade e a
                formação de estudantes.
              </p>
              <p>
                Sua experiência também se conecta ao{" "}
                <b>TEPAC — Programa de Treinamento Especializado Prático em Análises Clínicas</b>,
                iniciativa voltada ao contato supervisionado com a rotina da área. O guia permanece
                um material teórico e não substitui essa experiência prática.
              </p>
              <div className="review-note">
                <AlertTriangle />
                <span>
                  Área preparada para incluir a informação de revisão ou aprovação técnica após
                  confirmação formal.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="preview section">
          <div className="container">
            <Heading
              label="VEJA ANTES DE ACESSAR"
              title="Conteúdo direto, visual e organizado."
              side="Para você saber o que revisar primeiro."
            />
            <div className="preview-grid">
              {[
                "Capa do guia",
                "Jornada da amostra",
                "Checklist do primeiro dia",
                "Tubos de coleta",
                "Principais setores",
                "Plano de 7 dias",
              ].map((x, i) => (
                <div className="preview-page" key={x}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <FlaskConical />
                  <b>{x}</b>
                  <small>Prévia real será inserida quando o arquivo for fornecido</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="audience section">
          <div className="container audience-grid">
            <Audience
              yes
              title="Este guia é para você que..."
              items={[
                "está próximo do primeiro estágio em Análises Clínicas",
                "viu muita teoria, mas ainda não compreende o fluxo",
                "quer revisar biossegurança, fase pré-analítica e postura",
                "deseja chegar com perguntas melhores e limites mais claros",
              ]}
            />
            <Audience
              title="Este guia não é para quem..."
              items={[
                "procura habilitação profissional",
                "espera aprender coleta ou operação de equipamentos por PDF",
                "quer substituir aulas, supervisão, POPs ou estágio",
                "busca diagnóstico ou aconselhamento médico",
              ]}
            />
          </div>
        </section>

        <section id="oferta" className="offer section">
          <div className="container offer-card">
            <div className="offer-mock">
              <ProductMockup small />
            </div>
            <div className="offer-copy">
              <span className="section-label">ACESSO DIGITAL</span>
              <h2>Guia do Primeiro Estágio em Análises Clínicas</h2>
              <p>Um material objetivo para organizar sua preparação antes do primeiro dia.</p>
              <ul>
                {[
                  "47 páginas em formato digital",
                  "Leitura no celular, tablet ou computador",
                  "Plano de preparação em sete dias",
                  "Glossário essencial",
                  "Teste de revisão com respostas comentadas",
                ].map((x) => (
                  <li key={x}>
                    <Check />
                    {x}
                  </li>
                ))}
              </ul>
              <div className="price">
                <small>Investimento</small>
                <strong>{siteConfig.price}</strong>
              </div>
              <CTA label="QUERO ACESSAR O GUIA AGORA" />
              <span className="offer-note">
                <LockKeyhole /> Checkout será habilitado após a definição dos dados reais.
              </span>
            </div>
          </div>
        </section>

        <section className="faq section">
          <div className="container narrow">
            <span className="section-label">DÚVIDAS FREQUENTES</span>
            <h2>Informação clara também faz parte da preparação.</h2>
            <div className="faq-list">
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <ChevronDown />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="final-cta">
          <div className="lab-pattern" />
          <div className="container">
            <div>
              <span className="section-label">O PRIMEIRO PASSO É SE PREPARAR</span>
              <h2>Seu estágio começa antes do primeiro dia.</h2>
              <p>Chegue para aprender. Chegue para observar. Chegue com segurança.</p>
              <CTA />
              <span className="microcopy">
                <BookOpen /> 47 páginas • acesso digital • edição 2026
              </span>
            </div>
            <ProductMockup small />
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-main">
          <Logo light />
          <p>
            Material educacional de preparação teórica. Não substitui treinamento prático,
            supervisão, POPs, avaliação de competência ou decisão do responsável técnico.
          </p>
          <div>
            <b>São Paulo — SP</b>
            {siteConfig.supportEmail && (
              <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>
            )}
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Laboratório Santa Helena. Todos os direitos reservados.
          </span>
        </div>
      </footer>
      <div className={`mobile-sticky ${showSticky ? "visible" : ""}`}>
        <div>
          <b>Guia do Primeiro Estágio</b>
          <span>47 páginas • acesso digital</span>
        </div>
        <CTA label="QUERO ME PREPARAR" />
      </div>
    </div>
  );
}

function Heading({
  label,
  title,
  side,
  light = false,
}: {
  label: string;
  title: string;
  side: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <div>
        <span className="section-label">{label}</span>
        <h2>{title}</h2>
      </div>
      <p>{side}</p>
    </div>
  );
}
function Audience({
  yes = false,
  title,
  items,
}: {
  yes?: boolean;
  title: string;
  items: string[];
}) {
  const Icon = yes ? Check : X;
  return (
    <div>
      <span className={`audience-icon ${yes ? "yes" : "no"}`}>
        <Icon />
      </span>
      <h2>{title}</h2>
      {items.map((x) => (
        <p key={x}>
          <Icon />
          {x}
        </p>
      ))}
    </div>
  );
}
