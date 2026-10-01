import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const ref = useRef<HTMLElement | null>(null);
  // Content is visible in the server render; motion progressively enhances it
  // after hydration instead of making the page depend on JavaScript to appear.
  const [visible, setVisible] = useState(true);
  const [dir, setDir] = useState<"up" | "down">("up");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setDir(entry.boundingClientRect.top > window.innerHeight / 2 ? "up" : "down");
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: "-3% 0px -5%" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag;
  return (
    <Component
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-visible={visible}
      data-dir={dir}
      style={{ transitionDelay: `${visible ? delay : 0}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Component>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p
        className={cn(
          "flex items-center gap-3 text-[.65rem] font-bold tracking-[.24em] uppercase",
          align === "center" && "justify-center",
          tone === "dark" ? "text-gold" : "text-accent",
        )}
      >
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-5 text-[2.65rem] leading-[.98] sm:text-5xl lg:text-[4rem]",
          tone === "dark" ? "text-primary-foreground" : "text-primary",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-6 max-w-2xl text-sm leading-7 sm:text-base",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-primary-foreground/62" : "text-muted-foreground",
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const pale = tone === "dark";
  return (
    <span className="flex items-center gap-3">
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-full border",
          pale ? "border-primary-foreground/25 text-gold" : "border-primary/20 text-accent",
        )}
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
          <path
            d="M8.5 5.5C11.2 2.8 14 5 16 5s4.8-2.2 7.5.5c4 4 0 10-1 14.5-.8 3.7-1.6 7-3.2 7-1.8 0-1.7-6.4-3.3-6.4S14.5 27 12.7 27c-1.6 0-2.4-3.3-3.2-7-1-4.5-5-10-1-14.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M11 9c2 1.2 3.6 1.7 5 1.7S19 10.2 21 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-[1.28rem] tracking-[-.03em]",
            pale ? "text-primary-foreground" : "text-primary",
          )}
        >
          Odonto Aurora
        </span>
        <span
          className={cn(
            "mt-1 block text-[.48rem] font-bold tracking-[.31em] uppercase",
            pale ? "text-primary-foreground/45" : "text-muted-foreground",
          )}
        >
          Clínica odontológica
        </span>
      </span>
    </span>
  );
}

export function WhatsButton({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "gold";
  className?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-xs font-bold tracking-[.08em] uppercase transition-all duration-500",
        variant === "solid" &&
          "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-accent",
        variant === "outline" && "border border-current/25 text-current hover:border-current/60",
        variant === "gold" &&
          "bg-gold text-gold-foreground hover:-translate-y-0.5 hover:bg-primary-foreground",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}
