import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sri Venture Partners — Hyderabad & GIFT City.",
};

const DETAILS = [
  { Icon: Mail, label: "Email", value: "contact@svp.fund", href: "mailto:contact@svp.fund" },
  { Icon: Phone, label: "Phone", value: "+91 99664 08213", href: "tel:+919966408213" },
  { Icon: MapPin, label: "Offices", value: "Hyderabad · GIFT City", href: undefined },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Let's start a <span className="text-svp-coral">conversation</span>
          </>
        }
        subtitle="Founders, lenders, partners, press — whatever brings you here, we'd love to hear from you."
        compact
      />

      <section className="svp-section bg-svp-bg-page">
        <div className="svp-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Details */}
          <Reveal>
            <div className="flex flex-col gap-4">
              {DETAILS.map(({ Icon, label, value, href }) => {
                const inner = (
                  <div className="flex items-center gap-4 rounded-2xl border border-svp-border bg-svp-bg-card p-5 transition-shadow hover:shadow-[var(--svp-shadow)]">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-svp-coral/12 text-svp-coral">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-svp-slate">
                        {label}
                      </div>
                      <div className="mt-0.5 font-semibold text-svp-navy-dark">{value}</div>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href}>{inner}</a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}

              <div className="mt-2 rounded-2xl border border-svp-border bg-svp-bg-light p-6">
                <h3 className="font-bold text-svp-navy-dark">Office hours</h3>
                <p className="mt-2 text-sm leading-relaxed text-svp-slate">
                  Monday – Friday, 9:30am – 6:30pm IST. We aim to respond to every
                  message within two business days.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
