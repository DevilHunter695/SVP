import type { Metadata } from "next";
import { Mail, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/reveal";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "The SVP Dispatch — field notes on distressed investing, MSME turnarounds, and building durable value.",
};

const ISSUES = [
  { no: "012", date: "May 2026", title: "The 90-day cash cycle: what we fix first", read: "6 min" },
  { no: "011", date: "Apr 2026", title: "Why most NPAs are mispriced, not broken", read: "5 min" },
  { no: "010", date: "Mar 2026", title: "Operating partners > board observers", read: "7 min" },
  { no: "009", date: "Feb 2026", title: "GIFT City, explained for founders", read: "4 min" },
  { no: "008", date: "Jan 2026", title: "Restructuring a tangled cap table", read: "8 min" },
];

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="The SVP Dispatch"
        title={
          <>
            Field notes from the <span className="text-svp-coral">turnaround</span>
          </>
        }
        subtitle="A monthly read on distressed investing, MSME operations, and the unglamorous work of building durable value. No fluff, no spam."
        compact
      >
        <div className="w-full max-w-lg">
          <NewsletterSignup compact />
        </div>
      </PageHero>

      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container max-w-3xl">
          <Reveal>
            <p className="svp-label">Past editions</p>
            <h2 className="mt-3 text-3xl font-bold text-svp-navy-dark sm:text-[35px]">
              Catch up on the archive
            </h2>
          </Reveal>

          <div className="mt-10 space-y-3">
            {ISSUES.map((it, i) => (
              <Reveal key={it.no} delay={i * 0.05}>
                <a
                  href="#"
                  className="group flex items-center gap-5 rounded-2xl border border-svp-border bg-svp-bg-card p-5 transition-all hover:border-svp-coral/50 hover:shadow-[var(--svp-shadow)]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-svp-bg-light text-sm font-black text-svp-coral">
                    {it.no}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold text-svp-navy-dark group-hover:text-svp-coral">
                      {it.title}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-svp-slate">
                      {it.date} · {it.read} read
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-svp-slate transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-svp-coral" />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="svp-surface mt-12 flex flex-col items-center gap-5 p-9 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-svp-coral/12 text-svp-coral">
                <Mail className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold text-svp-navy-dark">
                Never miss an edition
              </h3>
              <div className="w-full max-w-md">
                <NewsletterSignup compact />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
