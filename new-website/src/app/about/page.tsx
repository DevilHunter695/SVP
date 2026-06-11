import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sri Venture Partners is an MSME distressed-asset fund turning Non-Performing Assets into Performing Assets through patient capital, restructuring capability and operational execution.",
};

const PILLARS = [
  {
    tag: "MSME",
    title: "We back the backbone",
    body: "Micro, small and medium enterprises are the engine of the economy — and the most under-served when stress hits. We specialise where others retreat.",
  },
  {
    tag: "Capital",
    title: "Patient, protective capital",
    body: "Preservation of principal is non-negotiable. We deploy calibrated, downside-aware capital structured to survive the turnaround, not just fund it.",
  },
  {
    tag: "Propel",
    title: "We propel, not just fund",
    body: "We embed operators inside portfolio companies to rebuild operations, finance and growth — converting restructuring on paper into recovery on the ground.",
  },
];

const APPROACH = [
  { num: "01", title: "Originate", body: "Source stressed MSME exposure others have written off — through banks, ARCs, IBC processes and direct relationships." },
  { num: "02", title: "Underwrite", body: "Rigorous, downside-first diligence governed by an independent Investment Committee. Protect capital before chasing upside." },
  { num: "03", title: "Restructure", body: "Re-engineer the balance sheet, the cap table and the security structure into something fundable and enforceable." },
  { num: "04", title: "Operate", body: "Deploy operating partners into the business to stabilise cash, fix supply chains and reinstall financial discipline." },
  { num: "05", title: "Propel", body: "Once stable, re-ignite growth via the Acceleration Program — GTM, talent and capital for the second act." },
  { num: "06", title: "Realise", body: "Exit into strength: a Performing Asset, an institution built to outlast the distress that created the opportunity." },
];

const PURPOSE = [
  {
    tag: "Vision",
    body: "To build a proprietary investment and operating platform that converts complexity and distress into enduring institutions — using patient capital and deep restructuring expertise.",
  },
  {
    tag: "Mission",
    body: "To unlock trapped economic value and transform Non-Performing Assets into Performing Assets, and ultimately into institutions built to last.",
  },
];

const STATS = [
  { v: "40+", l: "Portfolio companies" },
  { v: "6", l: "Specialised funds" },
  { v: "2", l: "Cities — Hyderabad & GIFT City" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SVP"
        title={
          <>
            We fix what others <span className="text-svp-coral">fear to touch</span>
          </>
        }
        subtitle="An MSME distressed-asset investment firm transforming Non-Performing Assets into Performing Assets — through patient capital, restructuring capability and operational execution."
      >
        <MagneticButton href="/pitch" variant="primary" size="lg">
          Pitch
        </MagneticButton>
        <MagneticButton href="/people" variant="outline" size="lg">
          Meet the Team
        </MagneticButton>
      </PageHero>

      {/* Brand story */}
      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Image
              src="/images/svp-prosperity.webp"
              alt="Sri — Lakshmi, goddess of prosperity and wealth"
              width={1000}
              height={534}
              className="h-auto w-full rounded-2xl border border-svp-border"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="svp-label">Our name, our mission</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug text-svp-navy-dark sm:text-4xl">
              <span className="text-svp-coral">Sri</span> means prosperity. We exist to create it.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-svp-slate">
              <span className="font-bold text-svp-navy-dark">Sri</span> is a Sanskrit term
              denoting resplendence, wealth and prosperity — and refers to Lakshmi, the
              goddess of prosperity. <span className="font-bold text-svp-navy-dark">Sri
              Venture Partners</span> aspires to participate in wealth-creating ventures
              that usher prosperity around them.
            </p>
            <p className="mt-4 leading-relaxed text-svp-slate">
              Where the market sees a non-performing asset, we see a mispriced
              enterprise — a team, a market and a machine that simply ran out of runway.
              Our work is to give it a second, stronger life.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The model: MSME :: Capital :: Propel */}
      <section className="svp-section bg-svp-bg-light">
        <div className="svp-container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="svp-label">The model</p>
            <h2 className="mt-3 text-3xl font-bold text-svp-navy-dark sm:text-[35px]">
              MSME&nbsp;::&nbsp;Capital&nbsp;::&nbsp;Propel
            </h2>
            <p className="mt-4 text-svp-slate">
              Three words that describe exactly what we do — and in what order.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.tag} delay={i * 0.1}>
                <div className="svp-surface h-full p-7">
                  <span className="svp-text-gradient text-2xl font-black uppercase tracking-tight">
                    {p.tag}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-svp-navy-dark">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-svp-slate">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="svp-label">How we work</p>
            <h2 className="mt-3 text-3xl font-bold text-svp-navy-dark sm:text-[35px]">
              From distress to durable value
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {APPROACH.map((a, i) => (
              <Reveal key={a.num} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl border border-svp-border bg-svp-bg-card p-6 transition-shadow hover:shadow-[var(--svp-shadow)]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-svp-coral/12 text-sm font-black text-svp-coral">
                      {a.num}
                    </span>
                    <h3 className="text-lg font-bold text-svp-navy-dark">{a.title}</h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-svp-slate">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="svp-section bg-svp-bg-light">
        <div className="svp-container">
          <div className="grid gap-6 md:grid-cols-2">
            {PURPOSE.map((p, i) => (
              <Reveal key={p.tag} delay={i * 0.1}>
                <div className="svp-surface h-full p-8">
                  <span className="svp-label">{p.tag}</span>
                  <p className="mt-4 text-xl font-semibold leading-relaxed text-svp-navy-dark">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Philosophy line */}
          <Reveal delay={0.15}>
            <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-relaxed text-svp-slate">
              We believe in offering a{" "}
              <span className="font-bold text-svp-navy-dark">second-chance runway</span> to
              struggling assets and the founders behind them — backing promoters who show{" "}
              <span className="font-bold text-svp-navy-dark">skin in the game</span> and the
              determination to fight back.
            </p>
          </Reveal>

          {/* Real stat strip */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-svp-border pt-10">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.08} className="text-center">
                <div className="text-3xl font-black text-svp-navy-dark sm:text-4xl">{s.v}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-svp-slate">
                  {s.l}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container">
          <div className="svp-surface relative overflow-hidden px-6 py-8 text-center sm:px-10 sm:py-10">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold text-svp-navy-dark sm:text-4xl">
              Have a hard problem worth solving?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-svp-slate">
              We read every pitch. If there's a business worth saving, we want to hear it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/pitch" variant="primary" size="lg">
                Pitch
              </MagneticButton>
              <MagneticButton href="/portfolio" variant="outline" size="lg">
                See the Portfolio
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
