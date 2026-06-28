import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@repo/ui/layout/ContactSection";
import PartnersStrip from "@repo/ui/layout/PartnersStrip";

export const metadata: Metadata = {
  title: "Crystal Stone Private Equity — Crystal Stone Properties",
  description:
    "Private equity-led real estate development through invitation-based SPV and LLP co-investment opportunities for HNIs, NRIs, and strategic partners in India.",
};

const modelPoints = [
  "Land acquisition and legal due diligence",
  "Construction planning using PMP methodology",
  "Escrow-based fund management",
  "Phased profit distribution",
  "Sales and exit strategy",
];

const howItWorks = [
  {
    step: "01",
    icon: "groups",
    title: "Investor Briefing & NDA",
    desc: "We begin with a one-on-one discussion under a Non-Disclosure Agreement (NDA) to explore suitability and interest.",
  },
  {
    step: "02",
    icon: "apartment",
    title: "Project Introduction",
    desc: "Qualified partners are introduced to curated real estate development opportunities, based on risk appetite and timeline preferences (1–2.5 years).",
  },
  {
    step: "03",
    icon: "gavel",
    title: "Legal & Financial Structuring",
    desc: "Upon alignment, the project is formalised via a Special Purpose Vehicle (SPV) or LLP, with defined roles, equity contributions, and profit-sharing terms targeting 16–20% ROI.",
  },
  {
    step: "04",
    icon: "engineering",
    title: "Execution & Oversight",
    desc: "Crystal Stone manages all operational aspects — from land registration to construction and marketing — while keeping investors updated via progress dashboards and periodic audits.",
  },
  {
    step: "05",
    icon: "payments",
    title: "Exit or Rental Monetisation",
    desc: "Post-construction, investors receive profit distributions from sale proceeds or benefit from structured rental monetisation.",
  },
];

const governance = [
  { icon: "description", title: "MoUs & legal contracts" },
  { icon: "account_balance", title: "Chartered accounting and project auditing" },
  { icon: "lock", title: "Escrow-managed capital flow" },
  { icon: "policy", title: "Real estate law compliance" },
  { icon: "monitoring", title: "Performance reports" },
];

function SectionDivider() {
  return <div className="gold-divider w-full" />;
}

export default function PrivateEquityPage() {
  return (
    <>
        {/* Hero */}
        <section className="relative py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <div className="w-[700px] h-[700px] border border-primary/25 rounded-full absolute -top-40 -right-32" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end">
            <div className="lg:col-span-8">
              <span className="section-eyebrow block mb-4">Private Equity – SPV</span>
              <h1 className="font-display-xl text-display-xl text-on-surface mb-6 leading-tight">
                Crystal Stone Private Equity
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-6">
                At Crystal Stone Properties LLP, we specialise in private equity-led real estate
                development. We operate through a closed, invitation-based model designed for High
                Net-Worth Individuals (HNIs), professionals, and strategic partners who wish to
                participate in project-based co-investment opportunities in India&apos;s real estate
                sector.
              </p>
              <p className="section-body max-w-3xl">
                With decades of experience in land acquisition, construction, legal resolution, and
                property management, our team delivers structured investment execution backed by
                performance, legal compliance, and transparent governance.
              </p>
            </div>
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 text-center">
                <p className="font-display-lg text-display-lg text-primary mb-1">16–20%</p>
                <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-[10px]">
                  Target ROI
                </p>
              </div>
              <div className="glass-panel p-6 text-center">
                <p className="font-display-lg text-display-lg text-primary mb-1">1–2.5</p>
                <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-[10px]">
                  Year Timeline
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Model */}
        <section id="strategy" className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-start">
            <div>
              <span className="section-eyebrow block mb-4">Investment structure</span>
              <h2 className="section-title mb-6">Our Private Equity Model</h2>
              <p className="section-body mb-8">
                We do not run a traditional fund. Instead, we follow a deal-by-deal joint venture
                model, where each project is structured with clear terms for:
              </p>
              <ul className="space-y-4">
                {modelPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 section-body">
                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">
                      check_circle
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel p-8 md:p-10 border-l-4 border-l-primary">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">verified_user</span>
              <h3 className="font-headline-lg text-xl text-on-surface mb-4">SPV &amp; LLP Structure</h3>
              <p className="section-body">
                Every investor is onboarded through an MoU, legal agreement, and project-specific SPV
                or LLP, ensuring clear ownership, traceability, and full transparency.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* How it works */}
        <section className="py-24 md:py-32 bg-surface-container-lowest px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="section-eyebrow block mb-4">Process</span>
              <h2 className="section-title mb-4">How It Works</h2>
              <p className="section-body">
                A structured path from initial briefing through execution to exit or rental
                monetisation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {howItWorks.map((step) => (
                <div key={step.title} className="glass-panel p-8 relative group hover:border-primary/30 transition-colors">
                  <span className="font-label-md text-primary/50 text-xs absolute top-6 right-6">
                    {step.step}
                  </span>
                  <span className="material-symbols-outlined text-primary text-4xl mb-6 block">
                    {step.icon}
                  </span>
                  <h3 className="font-headline-lg text-lg text-on-surface mb-3">{step.title}</h3>
                  <p className="section-body text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Governance */}
        <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="section-eyebrow block mb-4">Governance</span>
            <h2 className="section-title mb-4">Transparency &amp; Governance</h2>
            <p className="section-body">
              We pride ourselves on strict financial and legal governance. All projects are backed
              by:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-gutter">
            {governance.map((item) => (
              <div key={item.title} className="glass-panel p-6 text-center">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block">
                  {item.icon}
                </span>
                <h4 className="font-label-md text-on-surface text-sm leading-snug">{item.title}</h4>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* CTA */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container text-center">
          <div className="max-w-container-max mx-auto max-w-3xl">
            <h2 className="section-title mb-6">Let&apos;s Talk</h2>
            <p className="section-body mb-8">
              If you are an HNI, NRI, or a Professional Investor interested in long-term value
              creation through real estate development, we invite you to reach out for a private
              discussion.
            </p>
            <Link
              href="/private-equity#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button"
            >
              Request Private Discussion
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        <SectionDivider />

        <PartnersStrip />
        <SectionDivider />
        <ContactSection />
    </>
  );
}
