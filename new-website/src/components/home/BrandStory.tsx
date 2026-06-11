"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function BrandStory() {
  return (
    <section className="bg-svp-bg-page py-16">
      <div className="svp-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: prosperity image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/svp-prosperity.webp"
              alt="Sri — Lakshmi, the goddess of prosperity and wealth"
              width={1000}
              height={534}
              className="h-auto w-full rounded-lg"
            />
          </motion.div>

          {/* Right: brand story text */}
          <div>
            <motion.p
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="svp-label"
            >
              Our Name, Our Mission
            </motion.p>

            <motion.p
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mt-4 text-xl leading-relaxed text-svp-navy-dark sm:text-2xl"
            >
              <mark className="bg-transparent font-bold" style={{ color: "#f0504f" }}>
                Sri
              </mark>{" "}
              is a Sanskrit term denoting resplendence, wealth and prosperity.
              Sri also refers to Lakshmi the Goddess of prosperity and wealth.{" "}
              <mark className="bg-transparent font-bold" style={{ color: "#f0504f" }}>
                Sri Venture Partners
              </mark>{" "}
              hence aspires to participate in wealth creating ventures that usher
              prosperity around them.
            </motion.p>

            <motion.div
              custom={2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mt-8"
            >
              <MagneticButton href="/about" variant="primary" size="md">
                Learn More
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
