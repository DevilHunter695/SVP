"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

type Stat = { numeric: number; suffix: string; label: string };

const STATS: Stat[] = [
  { numeric: 40, suffix: "+", label: "Portfolio Companies" },
  { numeric: 6,  suffix: "",  label: "Specialised Funds" },
  { numeric: 2,  suffix: "",  label: "Cities" },
  { numeric: 2024, suffix: "", label: "Established" },
];

function useCountUp(target: number, duration = 1.4, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    setCount(0);
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / 1000 / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCell({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(stat.numeric, 1.4, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="px-4 py-8 text-center"
    >
      <div className="text-3xl font-bold tabular-nums text-svp-navy sm:text-4xl">
        {count}{stat.suffix}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-svp-slate">
        {stat.label}
      </div>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <>
      <section className="relative bg-gradient-to-b from-svp-bg-light to-svp-bg-page pt-[88px]">
        <div className="svp-container py-14 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left: prosperity image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/svp-prosperity.webp"
                alt="Sri — Lakshmi, the goddess of prosperity and wealth"
                width={1000}
                height={534}
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                className="h-auto w-full max-w-md mx-auto lg:mx-0 rounded-lg"
              />
            </motion.div>

            {/* Right: headline + CTAs */}
            <div>
              <motion.p
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="svp-label"
              >
                MSME&nbsp;::&nbsp;Capital&nbsp;::&nbsp;Propel
              </motion.p>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-4 text-4xl font-bold leading-tight text-svp-navy-dark sm:text-5xl lg:text-[52px]"
              >
                We Fix What Others{" "}
                <span className="text-svp-coral">Fear To Touch</span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-6 text-lg leading-relaxed text-svp-slate"
              >
                An MSME distressed-asset investment firm transforming Non
                Performing Assets into Performing Assets through patient
                capital, restructuring, and operational execution.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-4"
              >
                <MagneticButton href="/pitch" variant="primary" size="lg">
                  Pitch
                </MagneticButton>
                <MagneticButton href="/portfolio" variant="outline" size="lg">
                  Our Portfolio
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-svp-border bg-svp-bg-card">
        <div className="svp-container grid grid-cols-2 divide-x divide-svp-border md:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </>
  );
}
