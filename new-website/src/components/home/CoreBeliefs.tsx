"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

const BELIEFS = [
  { num: "01", title: "Stress into Assets",              blurb: "We see opportunity where others see crisis." },
  { num: "02", title: "Risk into Returns",               blurb: "Calibrated risk-taking with deep operational insight." },
  { num: "03", title: "NPA into ROI",                    blurb: "Turning non-performing assets into value generators." },
  { num: "04", title: "Distress into Wealth",            blurb: "Restructuring unlocks hidden enterprise value." },
  { num: "05", title: "Protecting Core Capital",         blurb: "Preservation of principal is non-negotiable." },
  { num: "06", title: "Integrated Portfolio Ecosystem",  blurb: "Portfolio companies grow stronger together." },
  { num: "07", title: "Active Value Partners",           blurb: "We roll up our sleeves alongside founders." },
  { num: "08", title: "Invested Alongside Founders",     blurb: "Skin in the game at every stage." },
  { num: "09", title: "Beyond Foie Gras",                blurb: "No force-feeding capital — quality over volume." },
  { num: "10", title: "Great Teams Matter",              blurb: "People execute strategy, not spreadsheets." },
];

export function CoreBeliefs() {
  return (
    <section className="bg-svp-bg-light py-16">
      <div className="svp-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="svp-label">What We Stand For</p>
          <h2 className="mt-3 text-3xl font-bold text-svp-navy-dark sm:text-[35px]">
            Our Core Beliefs
          </h2>
        </div>

        <div className="mt-12 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {BELIEFS.map((b, i) => (
            <motion.div
              key={b.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 5) * 0.07 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col rounded-lg border border-svp-border bg-svp-bg-card p-5 shadow-sm transition-shadow hover:shadow-[var(--svp-shadow)]"
            >
              <span className="text-xs font-bold text-svp-coral">{b.num}</span>
              <h3 className="mt-2 text-sm font-bold leading-snug text-svp-navy-dark">
                {b.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-svp-slate">{b.blurb}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <MagneticButton href="/about" variant="primary" size="md">
            Learn More
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
