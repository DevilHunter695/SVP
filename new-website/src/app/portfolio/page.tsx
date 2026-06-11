"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioCard, PortfolioCompany } from "@/components/ui/pixel-logo-grid";
import { SVPPortfolioLayouts } from "@/components/portfolio/svp-portfolio-layouts";

/* ── Color palettes per fund ── */
const COLORS: Record<string, string[]> = {
  stress:       ["#1d4496", "#2872fa", "#192a3d"],
  acceleration: ["#f0504f", "#f1665d", "#c94fa0"],
  torque:       ["#c94fa0", "#6b4fbb", "#f0504f"],
  science:      ["#6b4fbb", "#2872fa", "#1d4496"],
  growth:       ["#192a3d", "#3a4f66", "#1d4496"],
  thematic:     ["#192a3d", "#6b4fbb", "#3a4f66"],
  default:      ["#1d4496", "#f0504f", "#c94fa0"],
};

function palette(fund: string): string[] {
  const f = fund.toLowerCase();
  if (f.includes("stress")) return COLORS.stress;
  if (f.includes("torque")) return COLORS.torque;
  if (f.includes("acceleration")) return COLORS.acceleration;
  if (f.includes("science")) return COLORS.science;
  if (f.includes("growth")) return COLORS.growth;
  if (f.includes("thematic") || f.includes("restructuring")) return COLORS.thematic;
  return COLORS.default;
}

const COMPANIES: PortfolioCompany[] = [
  { name: "Triple R India", industry: "Oil & Gas", description: "Oil Filtration Technology", stage: "Disbursement stage", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Haigreeva Infra", industry: "Engg, Procurement & Construction", description: "Engineering & Procurement Company", stage: "Post disbursement", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "FenoPlast India", industry: "Manufacturing", description: "Leatherette & Poly Films", stage: "DD completed & awaiting NCLT", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Matrika Masalas", industry: "Food", description: "Hand pounded Masala Maker", stage: "Disbursement stage", fund: "Torque Acceleration Program", colors: palette("Torque Acceleration Program") },
  { name: "RDP Workstations", industry: "Manufacturing", description: "IT OEM & ODM", stage: "Disbursement stage", fund: "Acceleration Program", colors: palette("Acceleration Program") },
  { name: "Yalavarti Group", industry: "MEP", description: "Engineering & Technical Infra Solutions", stage: "Detailed DD in progress", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Vertex Holdings", industry: "Vertical Mobility", description: "Integrated Vertical & Horizontal Mobility", stage: "Under DD", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Raksan", industry: "Technology Services", description: "Technology Incubation & Acceleration", stage: "EiR Program", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Moolya", industry: "Financial Services", description: "Startup infrastructure and platform", stage: "EiR Program", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "360ExTech", industry: "Technology Services", description: "People, Talent, Product and Services", stage: "EiR Program", fund: "Acceleration Program", colors: palette("Acceleration Program") },
  { name: "FoodnI", industry: "Food & Beverage", description: "B2B aggregation platform and services", stage: "EiR Program", fund: "Acceleration Program", colors: palette("Acceleration Program") },
  { name: "Green Gold Animation", industry: "AVGC-XR", description: "Animation, Visual Effects, Gaming, Comics, and Extended Reality firm in Hyd", stage: "Disbursement stage", fund: "Restructuring Fund", colors: palette("Restructuring Fund") },
  { name: "OmDhar Engineering", industry: "Engineering, Procurement & Construction", description: "Infrastructure Projects for Govt and Private Sector", stage: "Detailed DD", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Indo Shell Moulds", industry: "Engineering", description: "Ethnic western wear and designer services", stage: "Disbursement stage", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "SVP Science Fund", industry: "Biotech & DeepTech", description: "Integrated Incubation & Acceleration Platform", stage: "Under setup", fund: "SVP Science Fund", colors: palette("SVP Science Fund") },
  { name: "Reagene Biosciences", industry: "Biotech", description: "New age Life Science Venture", stage: "Disbursement stage", fund: "SVP Science Fund", colors: palette("SVP Science Fund") },
  { name: "Multiple Litigations", industry: "Litigation", description: "Various litigations", stage: "", fund: "Litigation Finance", colors: COLORS.default },
  { name: "Rasik Products", industry: "Printing", description: "High-tech & security printing and products", stage: "Under detailed DD", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Tanu Shree Cotton", industry: "Textile Manufacturing", description: "Cotton process and textile unit", stage: "Advance stage of discussion", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Bheema Cements", industry: "Manufacturing", description: "Integrated 10MTA Cement M&A Plan", stage: "In NCLT & Discussions", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Uber Luxury Villas", industry: "Realty", description: "Uber premium managed villa development", stage: "Currently at TS level", fund: "SVP Stressed SME Fund", colors: palette("Stress Funding") },
  { name: "Gravton Motors", industry: "Automotive", description: "2 wheelers EV platform under Make in India", stage: "Post DD", fund: "Acceleration Program", colors: palette("Acceleration Program") },
  { name: "Amritapur Tea Estate", industry: "Plantation & Processing", description: "Pre Independence Era Plantation & Processing", stage: "Disbursement stage", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Sixth Sense", industry: "Pet Food & Grooming", description: "Wiggles and other brands", stage: "Disbursement stage", fund: "Torque Acceleration Program", colors: palette("Torque Acceleration Program") },
  { name: "Livpalm Resources", industry: "Agritech", description: "Oil Palm Development Zones, Medak", stage: "Disbursement stage", fund: "Growth Funding", colors: palette("Growth Funding") },
  { name: "Ashwamedha Energy", industry: "Renewable Energy", description: "Solar EPC Technical Provider", stage: "Disbursement stage", fund: "Torque Acceleration Program", colors: palette("Torque Acceleration Program") },
  { name: "Integrated Steel Plant", industry: "Manufacturing", description: "NCLT recovered sponge, billet and TMT scaleup", stage: "Under discussions", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Defunct Mine in AP", industry: "Mining", description: "Magnetite, Hematite, Goethite, Limonite, and Siderite", stage: "Locked and DD", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Saket", industry: "Realty", description: "Restructuring fund for a 35+ year old firm", stage: "Disbursement stage", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Sri Gajanan Maharaj", industry: "Agri Industry", description: "Integrated Sugar Plant", stage: "Disbursement stage", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "MAYA", industry: "AVGC-XR Fund", description: "An AVGC-XR focussed fund", stage: "Setup stage", fund: "Growth Funding", colors: palette("Growth Funding") },
  { name: "Popcorn Maker", industry: "AgriTech", description: "Revival of a top player in this sector", stage: "Negotiation stage", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Capital, Construction, Carbon & Customer – 4C Framework", industry: "Solution", description: "PE-Led Integrated Solutioning Platform", stage: "In Planning", fund: "Thematic Funding", colors: palette("Thematic Funding") },
  { name: "Integrated RACE Model", industry: "Solution", description: "Right Asset + Aligned Execution + Controlled Capital + Engineered Exit", stage: "In Planning", fund: "Thematic Funding", colors: palette("Thematic Funding") },
  { name: "Cement Consulting Center – 3C Framework", industry: "Solution", description: "Sector focused execution platform for micro & mid scale cement industry", stage: "", fund: "Stress Funding", colors: palette("Stress Funding") },
  { name: "Integrated Vertical Mobility & Infra", industry: "Solution", description: "Focus on innovation, testing, validation, certification, safety engineering & standards", stage: "", fund: "Thematic Funding", colors: palette("Thematic Funding") },
  { name: "Oneomics", industry: "Genomics", description: "Sequencing, molecular diagnostics, bioinformatics, and ambient biological sample preservation", stage: "", fund: "SVP Science Fund", colors: palette("SVP Science Fund") },
  { name: "Luxury Hospice", industry: "Luxury Hospital", description: "Hospital on the lines of Cleveland Clinic", stage: "", fund: "Thematic Funding", colors: palette("Thematic Funding") },
  { name: "Confidential", industry: "LegalTech", description: "AI based Court DB", stage: "", fund: "Torque Acceleration Program", colors: palette("Torque Acceleration Program"), isConfidential: true },
  { name: "Confidential", industry: "Pharmaceutical", description: "Manufacturing of Vaccines", stage: "", fund: "Torque Acceleration Program", colors: palette("Torque Acceleration Program"), isConfidential: true },
  { name: "Confidential", industry: "Hatcheries", description: "Restructuring and Turnaround", stage: "", fund: "Stress Funding", colors: palette("Stress Funding"), isConfidential: true },
  { name: "Acasta Health", industry: "Longevity & Oncology", description: "Healthcare Biotech", stage: "", fund: "Growth Fund", colors: palette("Growth Fund") },
];

const TABS = [
  { value: "all",         label: "All",            match: () => true },
  { value: "stress",      label: "Stress Funding", match: (f: string) => f.toLowerCase().includes("stress") },
  { value: "acceleration",label: "Acceleration",   match: (f: string) => f.toLowerCase().includes("acceleration") },
  { value: "science",     label: "Science Fund",   match: (f: string) => f.toLowerCase().includes("science") },
  { value: "growth",      label: "Growth",         match: (f: string) => f.toLowerCase().includes("growth") },
  { value: "thematic",    label: "Thematic",       match: (f: string) => f.toLowerCase().includes("thematic") || f.toLowerCase().includes("restructuring") },
  { value: "other",       label: "Other",          match: (f: string) => {
    const l = f.toLowerCase();
    return !l.includes("stress") && !l.includes("acceleration") && !l.includes("science") && !l.includes("growth") && !l.includes("thematic") && !l.includes("restructuring");
  }},
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as const } }),
};

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("all");
  const tab = TABS.find(t => t.value === activeTab)!;
  const filtered = useMemo(() => COMPANIES.filter(c => tab.match(c.fund)), [activeTab]);

  return (
    <main className="min-h-screen bg-svp-bg-page pt-[88px]">
      {/* Hero bar */}
      <section className="bg-gradient-to-b from-svp-bg-light to-svp-bg-card border-b border-svp-border">
        <div className="svp-container py-10 sm:py-14">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="svp-label">
            MSME&nbsp;::&nbsp;Capital&nbsp;::&nbsp;Propel
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="mt-3 text-4xl font-bold text-svp-navy-dark sm:text-5xl">
            Our Portfolio
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }} className="mt-4 max-w-2xl text-base text-svp-slate">
            Transforming distressed and underserved businesses into performing assets through patient capital, operational execution, and integrated support.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }} className="mt-8 flex flex-wrap gap-8">
            {[{ value: "40+", label: "Portfolio Companies" }, { value: "6", label: "Active Funds" }, { value: "2", label: "Cities" }].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-svp-navy">{s.value}</div>
                <div className="mt-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-svp-slate">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive layouts section */}
      <section className="svp-container py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SVPPortfolioLayouts />
        </motion.div>
      </section>

      {/* Full company grid */}
      <section className="bg-svp-bg-light py-12 sm:py-14">
        <div className="svp-container">
          <div className="mb-8">
            <p className="svp-label">Full Portfolio</p>
            <h2 className="mt-2 text-2xl font-bold text-svp-navy-dark sm:text-3xl">All Companies</h2>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex h-auto flex-wrap gap-2 bg-transparent p-0">
              {TABS.map(t => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="rounded-full border border-svp-border bg-svp-bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-svp-slate transition-colors data-[state=active]:border-svp-coral data-[state=active]:bg-svp-coral data-[state=active]:text-white"
                >
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((company, i) => (
                <motion.div key={`${company.name}-${i}`} custom={i % 8} initial="hidden" animate="show" variants={fadeUp}>
                  <PortfolioCard company={company} />
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="py-20 text-center text-svp-slate">No companies in this category yet.</p>
            )}
          </Tabs>
        </div>
      </section>
    </main>
  );
}
