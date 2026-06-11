import type { Metadata } from "next";
import { MapPin, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build alongside Sri Venture Partners. Open roles across investments, operations and platform.",
};

const VALUES = [
  { title: "Run toward hard problems", body: "We do the work others avoid. If easy energised you, this isn't the place." },
  { title: "Operators, not spectators", body: "We don't lob advice from the sidelines — we get inside the business and build." },
  { title: "Protect the downside", body: "Disciplined, principal-first thinking is in our DNA, in deals and in decisions." },
  { title: "Great teams matter", body: "We hire for character and craft, then trust people with real ownership." },
];

const ROLES = [
  { title: "Investment Associate", team: "Investments", loc: "Hyderabad", type: "Full-time" },
  { title: "Operating Partner — Manufacturing", team: "Operations", loc: "Hyderabad", type: "Full-time" },
  { title: "Legal Counsel — Structuring", team: "Legal", loc: "GIFT City", type: "Full-time" },
  { title: "Financial Analyst", team: "Finance", loc: "Hyderabad", type: "Full-time" },
  { title: "Platform & Brand Lead", team: "Platform", loc: "Remote / Hyderabad", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build what others <span className="text-svp-coral">give up on</span>
          </>
        }
        subtitle="We're a small team doing outsized work. If you like rebuilding real businesses from the ground up, we should talk."
      >
        <MagneticButton href="#roles" variant="primary" size="lg">
          See Open Roles
        </MagneticButton>
      </PageHero>

      {/* Values */}
      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="svp-label">How we work</p>
            <h2 className="mt-3 text-3xl font-bold text-svp-navy-dark sm:text-[35px]">
              The kind of people who thrive here
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.1}>
                <div className="svp-surface h-full p-7">
                  <h3 className="text-lg font-bold text-svp-navy-dark">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-svp-slate">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="svp-section bg-svp-bg-light scroll-mt-24">
        <div className="svp-container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="svp-label">Open roles</p>
            <h2 className="mt-3 text-3xl font-bold text-svp-navy-dark sm:text-[35px]">
              Where we need you
            </h2>
          </Reveal>

          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {ROLES.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <a
                  href={`mailto:careers@svp.fund?subject=Application — ${encodeURIComponent(r.title)}`}
                  className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-svp-border bg-svp-bg-card p-6 transition-all hover:border-svp-coral/50 hover:shadow-[var(--svp-shadow)]"
                >
                  <div>
                    <h3 className="text-lg font-bold text-svp-navy-dark group-hover:text-svp-coral">
                      {r.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-svp-slate">
                      <span className="rounded-full bg-svp-bg-light px-3 py-1 text-xs font-semibold">{r.team}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-svp-coral" /> {r.loc}
                      </span>
                      <span>· {r.type}</span>
                    </div>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-svp-coral/12 text-svp-coral transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <p className="text-svp-slate">
              Don't see your role? Send a note to{" "}
              <a href="mailto:careers@svp.fund" className="font-semibold text-svp-coral hover:underline">
                careers@svp.fund
              </a>{" "}
              — we always make room for exceptional people.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
