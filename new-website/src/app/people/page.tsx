import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PeopleCarousel } from "@/components/people/PeopleCarousel";
import { PeopleRoster } from "@/components/people/PeopleRoster";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "People",
  description:
    "The operators, investors and advisors behind Sri Venture Partners — the minds that convert distress into durable value.",
};

export default function PeoplePage() {
  return (
    <>
      <PageHero
        eyebrow="The People"
        title={
          <>
            The minds behind the <span className="text-svp-coral">mandate</span>
          </>
        }
        subtitle="Investors, operators and advisors who don't just write cheques — they roll up their sleeves alongside founders to rebuild what others walked away from."
        compact
      />

      {/* Big-photo carousel */}
      <section className="bg-svp-bg-page pb-6">
        <PeopleCarousel />
      </section>

      {/* Sorted roster */}
      <section className="svp-section bg-svp-bg-light">
        <div className="svp-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="svp-label">Browse by team</p>
            <h2 className="mt-3 text-3xl font-bold text-svp-navy-dark sm:text-[35px]">
              Every name, in order of mandate
            </h2>
            <p className="mt-4 text-svp-slate">
              From leadership to the advisory board — click anyone to open their full profile.
            </p>
          </div>
          <div className="mt-6">
            <PeopleRoster />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container">
          <div className="svp-surface relative overflow-hidden px-6 py-8 text-center sm:px-10 sm:py-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--svp-coral) 12%, transparent), transparent 70%)",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold text-svp-navy-dark sm:text-4xl">
                Want to build alongside this team?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-svp-slate">
                Whether you&apos;re a founder in a tight spot or an operator who loves the
                hard problems — there&apos;s a seat at the table.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <MagneticButton href="/pitch" variant="primary" size="lg">
                  Pitch
                </MagneticButton>
                <MagneticButton href="/careers" variant="outline" size="lg">
                  Join the Team
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
