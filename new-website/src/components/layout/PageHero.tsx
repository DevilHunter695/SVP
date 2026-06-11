"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  /** Compact removes the lower padding for pages with dense content below. */
  compact?: boolean;
}

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function PageHero({ eyebrow, title, subtitle, children, compact }: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-b from-svp-bg-light to-svp-bg-page pt-[120px] ${
        compact ? "pb-10" : "pb-16 md:pb-20"
      }`}
    >
      {/* Ambient grid + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundSize: "56px 56px",
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--svp-navy) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--svp-navy) 7%, transparent) 1px, transparent 1px)",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 30%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 30%, black, transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, color-mix(in srgb, var(--svp-coral) 14%, transparent) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="svp-container relative z-10 text-center">
        <motion.p custom={0} initial="hidden" animate="show" variants={fade} className="svp-label">
          {eyebrow}
        </motion.p>
        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-svp-navy-dark sm:text-5xl lg:text-[56px]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-svp-slate"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
