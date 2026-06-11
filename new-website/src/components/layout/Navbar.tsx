"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, X, Sun, Moon, SunMoon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useTheme } from "@/components/providers/ThemeProvider";

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_LINKS: NavLink[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  { label: "People", href: "/people" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Blogs", href: "/blogs" },
];

/* Compact icon theme toggle that cycles light → dark → auto */
function NavThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "light" ? "dark" : theme === "dark" ? "auto" : "light";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : SunMoon;
  return (
    <motion.button
      type="button"
      onClick={() => setTheme(next)}
      whileTap={{ scale: 0.88 }}
      aria-label={`Theme: ${theme}. Switch to ${next}.`}
      title={`Theme: ${theme}`}
      className="grid h-9 w-9 place-items-center rounded-full border border-svp-border bg-svp-bg-card/60 text-svp-slate backdrop-blur transition-colors hover:text-svp-coral"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, theme, setTheme } = useTheme();

  // Correct logo for the resolved theme (covers auto-resolved dark)
  const logoSrc =
    resolvedTheme === "dark" ? "/images/svp-dark-logo.svg" : "/images/SVP_Tagline_Logo.svg";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-svp-border bg-svp-bg-card/90 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="svp-container flex h-[76px] items-center justify-between md:h-[84px]">
          {/* Logo — theme-correct source */}
          <Link href="/" aria-label="Sri Venture Partners home" className="shrink-0">
            <Image
              src={logoSrc}
              alt="Sri Venture Partners"
              width={200}
              height={72}
              priority
              className="h-[48px] w-auto md:h-[64px]"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-7 xl:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-1 pb-1 text-[14px] font-bold uppercase tracking-wide transition-colors",
                      active ? "text-svp-coral" : "text-svp-navy hover:text-svp-coral"
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                        aria-hidden
                      />
                    )}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-svp-coral"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>

                  {link.children && (
                    // pt-3 is a transparent "bridge" so the menu doesn't close
                    // when the cursor crosses the gap between trigger and panel
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <ul className="min-w-[190px] overflow-hidden rounded-xl border border-svp-border bg-svp-bg-card p-1.5 shadow-[var(--svp-shadow)]">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-lg px-3.5 py-2.5 text-sm font-semibold tracking-wide text-svp-navy-dark transition-colors hover:bg-svp-coral/10 hover:text-svp-coral"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop CTAs — magnetic */}
          <div className="hidden items-center gap-3 xl:flex">
            <NavThemeToggle />
            <MagneticButton href="/pitch" variant="primary" size="sm">
              Pitch
            </MagneticButton>
            <MagneticButton href="/login" variant="glass" size="sm">
              Login
            </MagneticButton>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <NavThemeToggle />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-svp-navy transition-colors hover:text-svp-coral"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — sibling of header so `fixed` anchors to the viewport
          (a backdrop-filtered header would otherwise become its containing block) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[rgba(7,10,18,0.98)] backdrop-blur-xl xl:hidden"
          >
            {/* Ambient texture + glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-60"
              style={{
                backgroundSize: "48px 48px",
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 75%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 z-0 h-[40%] w-[80%] -translate-x-1/2"
              style={{ background: "radial-gradient(ellipse at center, rgba(240,80,79,0.16), transparent 70%)", filter: "blur(50px)" }}
            />

            <div className="relative z-10 svp-container flex h-[76px] shrink-0 items-center justify-between">
              <Image src="/images/svp-dark-logo.svg" alt="Sri Venture Partners" width={170} height={60} className="h-[46px] w-auto" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:text-svp-coral"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              className="relative z-10 svp-container mt-3 flex flex-col gap-1.5"
            >
              {NAV_LINKS.map((link, idx) => (
                <motion.li key={link.href} variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "group flex items-center justify-between rounded-2xl border px-4 py-3.5 transition-colors",
                      isActive(link.href)
                        ? "border-transparent bg-svp-coral text-white"
                        : "border-white/[0.07] bg-white/[0.04] text-white/90 hover:bg-white/[0.09]"
                    )}
                  >
                    <span className="flex items-center gap-3 text-lg font-bold uppercase tracking-wide">
                      <span className={cn("text-[11px] font-mono", isActive(link.href) ? "text-white/70" : "text-svp-coral/70")}>
                        0{idx + 1}
                      </span>
                      {link.label}
                    </span>
                    <ChevronRight className="h-5 w-5 opacity-50 transition-transform group-hover:translate-x-1" />
                  </Link>
                  {link.children && (
                    <ul className="ml-7 mt-1.5 flex flex-col gap-1.5">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white/55 transition-colors hover:text-white"
                          >
                            <span className="h-1 w-1 rounded-full bg-svp-coral" /> {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </motion.ul>

            {/* Theme row */}
            <div className="relative z-10 svp-container mt-5 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Appearance</span>
              <div className="flex items-center gap-0.5 rounded-full p-0.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {([
                  { value: "light", Icon: Sun, label: "Light" },
                  { value: "auto", Icon: SunMoon, label: "Auto" },
                  { value: "dark", Icon: Moon, label: "Dark" },
                ] as const).map(({ value, Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-all"
                    style={{
                      background: theme === value ? "rgba(255,255,255,0.14)" : "transparent",
                      color: theme === value ? "white" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    <Icon size={13} strokeWidth={2.4} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative z-10 svp-container mt-auto flex flex-col gap-3 border-t border-white/10 py-6">
              <div className="flex gap-3">
                <Link
                  href="/pitch"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full px-5 text-sm font-bold uppercase tracking-wide text-white [background:linear-gradient(135deg,#f0504f_0%,#c94fa0_100%)]"
                >
                  Pitch
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-bold uppercase tracking-wide text-white"
                >
                  Login
                </Link>
              </div>
              <div className="flex justify-center gap-5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-white/45">
                <a href="https://www.linkedin.com/company/sriventurepartners/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
                <a href="https://x.com/svpifsc" target="_blank" rel="noopener noreferrer" className="hover:text-white">X</a>
                <a href="https://www.instagram.com/svp.fund/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
