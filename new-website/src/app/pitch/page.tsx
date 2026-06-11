import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/reveal";
import { PitchForm } from "@/components/forms/PitchForm";

export const metadata: Metadata = {
  title: "Pitch",
  description:
    "Pitch Sri Venture Partners. We back MSMEs in distress, restructuring, or ready to scale after the storm.",
};

const LOOK_FOR = [
  { title: "A real business underneath", body: "Stress doesn't mean broken. We look for genuine demand, a working product, and a team that hasn't given up." },
  { title: "A path to performing", body: "We need to see how capital + restructuring + operating muscle converts this into a Performing Asset." },
  { title: "Founders worth backing", body: "Great teams matter more than spreadsheets. We invest alongside people who run toward hard problems." },
];

export default function PitchPage() {
  return (
    <>
      <PageHero
        eyebrow="Pitch"
        title={
          <>
            Tell us what others <span className="text-svp-coral">walked away from</span>
          </>
        }
        subtitle="If there's a business worth saving, we want to hear it. No buzzwords required — just the honest version."
        compact
      />

      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* What we look for */}
          <div>
            <Reveal>
              <p className="svp-label">What we look for</p>
              <h2 className="mt-3 text-2xl font-bold text-svp-navy-dark sm:text-3xl">
                Three things, in order
              </h2>
            </Reveal>
            <div className="mt-8 flex flex-col gap-5">
              {LOOK_FOR.map((l, i) => (
                <Reveal key={l.title} delay={i * 0.1}>
                  <div className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-svp-coral/12 text-sm font-black text-svp-coral">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-svp-navy-dark">{l.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-svp-slate">{l.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-2xl border border-svp-border bg-svp-bg-light p-6">
                <p className="text-sm leading-relaxed text-svp-slate">
                  <span className="font-bold text-svp-navy-dark">Prefer email?</span> Send
                  your deck to{" "}
                  <a href="mailto:pitch@svp.fund" className="font-semibold text-svp-coral hover:underline">
                    pitch@svp.fund
                  </a>
                  . We read every one.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <PitchForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
