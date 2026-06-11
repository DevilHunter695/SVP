"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUp, Sun, Moon, SunMoon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMagnetic } from "@/components/ui/magnetic-button";

/* ── Inline styles ───────────────────────────────────────────────────────── */
const FOOTER_CSS = `
  @keyframes footer-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes footer-breathe {
    0%   { transform: translate(-50%, 0) scale(0.98); opacity: 0.45; }
    100% { transform: translate(-50%, 0) scale(1.04); opacity: 0.8; }
  }
  .footer-grid-bg {
    background-size: 46px 46px;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    mask-image: linear-gradient(to bottom, transparent, black 35%, black 85%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 35%, black 85%, transparent);
  }
  .footer-glass {
    background: rgba(255,255,255,0.055);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: background 0.25s, border-color 0.25s, transform 0.22s;
  }
  .footer-glass:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(240,80,79,0.42);
    transform: translateY(-2px);
  }
  .footer-ghost {
    font-size: clamp(64px, 14vw, 150px);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 0.7;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.05);
    user-select: none;
    pointer-events: none;
    animation: footer-breathe 9s ease-in-out infinite alternate;
  }
`;

/* ── Brand icons ─────────────────────────────────────────────────────────── */
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.16a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/sriventurepartners/", Icon: LinkedinIcon },
  { label: "X",         href: "https://x.com/svpifsc",                                 Icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/svp.fund/",                   Icon: InstagramIcon },
];

const THEME_OPTS: { value: "light" | "auto" | "dark"; Icon: typeof Sun; label: string }[] = [
  { value: "light", Icon: Sun,     label: "Light" },
  { value: "auto",  Icon: SunMoon, label: "Auto"  },
  { value: "dark",  Icon: Moon,    label: "Dark"  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="flex items-center gap-0.5 rounded-full p-0.5"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      {THEME_OPTS.map(({ value, Icon, label }) => {
        const active = theme === value;
        return (
          <motion.button
            key={value}
            onClick={() => setTheme(value)}
            whileTap={{ scale: 0.92 }}
            title={`${label} mode`}
            className="flex items-center gap-1.5 rounded-full px-2 py-1.5 transition-all duration-200"
            style={{
              background: active ? "rgba(255,255,255,0.14)" : "transparent",
              color: active ? "white" : "rgba(255,255,255,0.4)",
            }}
          >
            <Icon size={12} strokeWidth={2.4} />
            <span className="hidden text-[10px] font-bold uppercase tracking-wider sm:inline">{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

function MarqueeStrip() {
  const items = ["MSME", "Capital", "Propel", "Special Situations", "GIFT City", "Hyderabad", "Sri Venture Partners"];
  const tiles = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-white/[0.06] py-1.5">
      <div className="flex w-max whitespace-nowrap" style={{ animation: "footer-marquee 36s linear infinite" }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 whitespace-nowrap" aria-hidden={dup === 1}>
            {tiles.map((item, i) => (
              <span key={i} className="flex shrink-0 items-center gap-4 px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">
                {item}<span className="text-[#f0504f]/35">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Footer (compact ~half height, symmetric, magnetic arrow) ────────────── */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const arrowRef = useMagnetic<HTMLButtonElement>(0.5);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ background: "var(--svp-bg-footer,#28282a)" }}>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_CSS }} />

      <div className="footer-grid-bg absolute inset-0 z-0 pointer-events-none" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{ width: "55%", height: "70%", background: "radial-gradient(ellipse at center,rgba(240,80,79,0.06),transparent 70%)", filter: "blur(46px)" }}
      />
      <div className="footer-ghost absolute bottom-[-0.16em] left-1/2 z-0" aria-hidden>SVP</div>

      <MarqueeStrip />

      {/* Single compact centered row */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 svp-container flex flex-col items-center gap-3.5 py-5"
      >
        <Image src="/images/svp-dark-logo.svg" alt="Sri Venture Partners" width={160} height={56} className="h-10 w-auto" />

        <div className="flex flex-wrap items-center justify-center gap-2">
          {SOCIALS.map(({ label, href, Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 360, damping: 20 }}
              className="footer-glass grid h-9 w-9 place-items-center rounded-full text-white/65 hover:text-white"
            >
              <Icon className="h-[15px] w-[15px]" />
            </motion.a>
          ))}
          <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />
          <a href="mailto:contact@svp.fund" className="footer-glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-white/60 hover:text-white">
            <Mail size={12} style={{ color: "#f0504f" }} /> contact@svp.fund
          </a>
          <a href="tel:+919966408213" className="footer-glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-white/60 hover:text-white">
            <Phone size={12} style={{ color: "#f0504f" }} /> +91 99664 08213
          </a>
          <div className="footer-glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-white/45">
            <MapPin size={12} style={{ color: "#f0504f" }} /> Hyd &amp; GIFT City
          </div>
        </div>
      </motion.div>

      {/* Slim bottom bar */}
      <div className="relative z-10 border-t border-white/[0.07]">
        <div className="svp-container flex items-center justify-between gap-4 py-2.5">
          <p className="text-[10px] text-white/30">© {new Date().getFullYear()} Sri Venture Partners</p>
          <ThemeToggle />
          <button
            ref={arrowRef}
            onClick={scrollToTop}
            className="footer-glass grid h-9 w-9 place-items-center rounded-full text-white/60 will-change-transform hover:text-white"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
