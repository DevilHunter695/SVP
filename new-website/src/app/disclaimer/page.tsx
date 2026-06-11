import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important legal disclaimer regarding information provided by Sri Venture Partners.",
};

const SECTIONS = [
  {
    h: "No investment advice",
    p: "The content on this website is provided for general informational purposes only and does not constitute investment, legal, tax or financial advice, nor an offer or solicitation to buy or sell any security or financial instrument. Nothing here should be relied upon as the basis for any investment decision.",
  },
  {
    h: "No offer or solicitation",
    p: "Sri Venture Partners' funds are offered only to eligible investors pursuant to confidential offering documents and applicable law. Information on this site is not directed at, and is not intended for, any person in any jurisdiction where such distribution would be unlawful.",
  },
  {
    h: "Forward-looking statements",
    p: "Certain statements may be forward-looking and involve known and unknown risks and uncertainties. Actual results may differ materially. Past performance and case studies are not indicative of, and do not guarantee, future results.",
  },
  {
    h: "Risk of loss",
    p: "Investing in distressed and private assets involves a high degree of risk, including the possible loss of the entire amount invested. Such investments are illiquid and suitable only for sophisticated investors who can bear that risk.",
  },
  {
    h: "Confidentiality & accuracy",
    p: "Case studies and portfolio references may be anonymised or illustrative. While we strive for accuracy, we make no representation or warranty as to the completeness or reliability of any information on this site and accept no liability for any loss arising from its use.",
  },
  {
    h: "Third-party content",
    p: "This site may contain links to third-party websites. We are not responsible for the content, accuracy or practices of any third-party sites, and such links do not imply endorsement.",
  },
  {
    h: "Governing terms",
    p: "Your use of this website is subject to applicable law. For questions regarding this disclaimer, please contact contact@svp.fund.",
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        subtitle="Please read this carefully before relying on any information presented here."
        compact
      />

      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container max-w-3xl">
          <div className="rounded-2xl border border-svp-coral/30 bg-svp-coral/5 p-6">
            <p className="text-sm leading-relaxed text-svp-slate">
              This website does not constitute an offer to sell or a solicitation of an
              offer to buy any interest in any fund managed by Sri Venture Partners. Any
              such offer is made solely through confidential offering materials.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.h} delay={Math.min(i * 0.04, 0.2)} y={16}>
                <h2 className="text-xl font-bold text-svp-navy-dark">{s.h}</h2>
                <p className="mt-3 leading-relaxed text-svp-slate">{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
