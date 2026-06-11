import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sri Venture Partners collects, uses and protects your information.",
};

const SECTIONS = [
  {
    h: "1. Information we collect",
    p: "We collect information you provide directly — such as your name, email, company and any materials you submit through our pitch or contact forms — as well as standard technical data (IP address, browser type, pages visited) gathered automatically when you use this site.",
  },
  {
    h: "2. How we use your information",
    p: "We use your information to respond to enquiries, evaluate investment opportunities, send communications you have requested (such as our newsletter), operate and improve the website, and comply with legal obligations. We do not sell your personal data.",
  },
  {
    h: "3. Sharing & disclosure",
    p: "We may share information with service providers who help us operate the site and our business (under confidentiality obligations), with professional advisors, and where required by law or to protect our rights. Portfolio and investment information is handled under strict confidentiality.",
  },
  {
    h: "4. Data security",
    p: "We apply reasonable technical and organisational measures to protect your information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    h: "5. Your rights",
    p: "Subject to applicable law, you may request access to, correction of, or deletion of your personal information, and may opt out of marketing communications at any time. To exercise these rights, contact us at contact@svp.fund.",
  },
  {
    h: "6. Cookies",
    p: "This site may use cookies and similar technologies to remember preferences and understand usage. You can control cookies through your browser settings; disabling them may affect site functionality.",
  },
  {
    h: "7. Changes to this policy",
    p: "We may update this policy from time to time. Material changes will be reflected by updating the effective date below. Continued use of the site constitutes acceptance of the revised policy.",
  },
  {
    h: "8. Contact",
    p: "For any questions about this Privacy Policy or our data practices, write to contact@svp.fund.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Your trust matters. This explains what we collect and how we use it."
        compact
      />

      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-svp-slate">
            Effective date: 1 June 2026
          </p>
          <div className="mt-8 space-y-8">
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
