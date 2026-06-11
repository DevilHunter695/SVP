import type { Metadata } from "next";
import { TrendingUp, Lock, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "How Sri Venture Partners turns distressed MSMEs into Performing Assets — anonymised turnaround case studies.",
};

const CASES = [
  {
    sector: "Infra EPC",
    fund: "Haigreeva",
    title: "A second chance runway for a business trapped in litigation, NPAs, political pressure, and locked receivables.",
    summary: "Password protected. Request for unlocking.",
    href: "https://drive.google.com/file/d/1ueJ1rJmvRV0XDz8PlsTuIwnXdVoluUyY/view?usp=sharing",
    accent: "#1d4496",
  },
  {
    sector: "Cement",
    fund: "Bheema Cements",
    title: "A story of failed institutional processes, contested realities, and the pursuit of recovery.",
    summary: "Password protected. Request for unlocking.",
    href: "https://www.bheemacements.in/",
    accent: "#c94fa0",
  },
  {
    sector: "Security Printing",
    fund: "Rasik Group",
    title: "When a single delayed export order disrupted the rise of a high end security printing company and triggered a spiral into distress.",
    summary: "Password protected. Request for unlocking.",
    href: "https://drive.google.com/file/d/16EnZqnR9tS28nJcOaAZIrh5LxJo1m97R/view?usp=sharing",
    accent: "#f0504f",
  },
  {
    sector: "Steel Industry",
    fund: "Confidential",
    title: "A story of revival where conviction, capital, and execution came together to rebuild a distressed integrated steel plant from the depths of NCLT.",
    summary: "Password protected. Request for unlocking.",
    href: "https://drive.google.com/file/d/1wzutr3JQQMUkJA5MIcYLtIc76awuvNiz/view?usp=sharing",
    accent: "#6b4fbb",
  },
  {
    sector: "Fintech",
    fund: "moolya",
    title: "How a successful entrepreneur spent crores building a sophisticated fintech platform only to realize that capital, not technology, was the real fulcrum.",
    summary: "Password protected. Request for unlocking.",
    href: "https://www.moolya.global/",
    accent: "#2872fa",
  },
  {
    sector: "Technology Incubator",
    fund: "raksan",
    title: "When a billionaire’s unfulfilled promise pushed an entire business ecosystem and 250 families toward uncertainty and distress.",
    summary: "Password protected. Request for unlocking.",
    href: "https://www.raksan.in/",
    accent: "#0d6b5e",
  },
  {
    sector: "Vertical Mobility",
    fund: "Multiple Entities",
    title: "When private equity begins thinking like entrepreneurs, portfolios evolve into ecosystems of ambition, execution, and long term value creation.",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#f0504f",
  },
  {
    sector: "EV Platform",
    fund: "Gravton",
    title: "In one of the world’s toughest emerging sectors, a promoter from humble beginnings dared to dream big and build against the odds.",
    summary: "Password protected. Request for unlocking.",
    href: "https://www.gravton.com/",
    accent: "#1d4496",
  },
  {
    sector: "Realty",
    fund: "Saket",
    title: "A story that proves honest and committed developers still exist in an industry often overshadowed by mistrust.",
    summary: "Password protected. Request for unlocking.",
    href: "https://www.saketgroup.com/",
    accent: "#c94fa0",
  },
  {
    sector: "Litigation",
    fund: "Fight with an ex-MP",
    title: "In judicial process",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#6b4fbb",
  },
  {
    sector: "Litigation",
    fund: "Employment Issues",
    title: "In judicial process",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#2872fa",
  },
  {
    sector: "Sugar Industry",
    fund: "Sri Gajanan Maharaj",
    title: "Revival of Integrated Sugar Plant",
    summary: "Password protected. Request for unlocking.",
    href: "https://drive.google.com/file/d/1VP_wxxZn3laKkRiz9YK_hajkB2N3rJws/view?usp=sharing",
    accent: "#0d6b5e",
  },
  {
    sector: "M&A",
    fund: "Confidential",
    title: "Solution exploration",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#f0504f",
  },
  {
    sector: "Litigation",
    fund: "Confidential",
    title: "In judicial process",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#1d4496",
  },
  {
    sector: "Litigation",
    fund: "Confidential",
    title: "In judicial process",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#c94fa0",
  },
  {
    sector: "Litigation",
    fund: "Confidential",
    title: "In judicial process",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#6b4fbb",
  },
  {
    sector: "Litigation",
    fund: "Confidential",
    title: "In judicial process",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#2872fa",
  },
  {
    sector: "Litigation",
    fund: "Confidential",
    title: "In judicial process",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#0d6b5e",
  },
  {
    sector: "Litigation",
    fund: "Confidential",
    title: "In judicial process",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#f0504f",
  },
  {
    sector: "Litigation",
    fund: "Confidential",
    title: "In judicial process",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#1d4496",
  },
  {
    sector: "Litigation",
    fund: "Confidential",
    title: "In judicial process",
    summary: "Password protected. Request for unlocking.",
    href: "https://triple-r-india.com/",
    accent: "#c94fa0",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={
          <>
            Distress in. <span className="text-svp-coral">Durable value</span> out.
          </>
        }
        subtitle="Anonymised stories from the SVP portfolio — the same playbook, applied to very different problems."
      />

      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container grid gap-7 lg:grid-cols-2">
          {CASES.map((c, i) => (
            <Reveal key={`${c.fund}-${i}`} delay={(i % 2) * 0.1}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-svp-border bg-svp-bg-card p-7 transition-all hover:-translate-y-1 hover:border-svp-coral/40 hover:shadow-[var(--svp-shadow)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-15 transition-opacity group-hover:opacity-25"
                  style={{ background: `radial-gradient(circle, ${c.accent}, transparent 70%)` }}
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <span style={{ color: c.accent }}>{c.sector}</span>
                    <span className="text-svp-slate/50">·</span>
                    <span className="text-svp-slate">{c.fund}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-svp-navy-dark sm:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-svp-slate">{c.summary}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-svp-border pt-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-svp-slate">
                      <Lock className="h-3.5 w-3.5" /> Password protected
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-svp-coral">
                      Open <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="svp-container mt-14 text-center">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 text-svp-coral">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Your business could be next</span>
            </span>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton href="/pitch" variant="primary" size="lg">
                Pitch
              </MagneticButton>
              <MagneticButton href="/portfolio" variant="outline" size="lg">
                See the Portfolio
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
