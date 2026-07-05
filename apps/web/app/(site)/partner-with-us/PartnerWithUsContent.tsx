"use client";

import React, { useState } from "react";
import PartnerEnquiryForm, { type AudienceType } from "@repo/ui/sections/PartnerEnquiryForm";
import FaqAccordion, { type FaqItem } from "@repo/ui/faq/FaqAccordion";
import ContactSection from "@repo/ui/layout/ContactSection";
import PartnersStrip from "@repo/ui/layout/PartnersStrip";

const partnershipCards = [
  {
    id: "individual" as AudienceType,
    title: "Individual Landowners",
    subtitle: "Sell Your Property",
    icon: "real_estate_agent",
    description:
      "Unlock the true market potential of your land asset with structured legal due diligence and direct access to qualified buyers.",
    points: [
      "Independent Sites & Layouts",
      "Premium Residential Land",
      "Agricultural & Farm Sanctuary Land",
      "Strategic Commercial Land Corridors",
    ],
    ctaText: "Sell My Property",
  },
  {
    id: "developer" as AudienceType,
    title: "Developers & Builders",
    subtitle: "Marketing & Channel Partner Services",
    icon: "apartment",
    description:
      "Accelerate project absorption and elevate brand prestige through data-driven marketing and institutional investor outreach.",
    points: [
      "Channel Partner Sales & Distribution",
      "Targeted Digital & Performance Marketing",
      "HNI & NRI Investor Outreach",
      "Micro-Market Intelligence & Pricing Strategy",
      "Dedicated Sales Support & Site Tours",
    ],
    ctaText: "Partner As A Developer",
  },
  {
    id: "investor" as AudienceType,
    title: "Investors",
    subtitle: "Strategic Investment Opportunities",
    icon: "diamond",
    description:
      "Participate in vetted, high-growth real estate opportunities backed by rigorous research, legal clarity, and transparent SPV governance.",
    points: [
      "Curated Land Investment Deals",
      "Exclusive Off-Market Acquisitions",
      "Project-Based SPV & Joint Ventures",
      "Institutional Portfolio Advisory",
    ],
    ctaText: "Speak With Our Investment Team",
  },
];

const whyPartnerPillars = [
  {
    icon: "analytics",
    title: "Market Research",
    description:
      "In-depth micro-market analysis, infrastructure forecasting, and pricing intelligence to ensure data-backed valuation and timing.",
  },
  {
    icon: "gavel",
    title: "Legal Due Diligence",
    description:
      "100% title verification, encumbrance screening, and compliance audits by seasoned real estate legal experts before any deal is presented.",
  },
  {
    icon: "groups_2",
    title: "Qualified Investor Network",
    description:
      "Direct institutional access to verified High-Net-Worth Individuals (HNIs), NRIs, family offices, and active real estate buyers.",
  },
  {
    icon: "handshake",
    title: "Long-Term Relationships",
    description:
      "We prioritize sustainable value creation and transparent governance over short-term transactional volume, building generational trust.",
  },
];

const partnershipProcess = [
  { step: "01", icon: "assignment", title: "Submit Enquiry", desc: "Share your property details, project mandate, or investment criteria via our secure portal." },
  { step: "02", icon: "saved_search", title: "Initial Review", desc: "Our institutional advisory team evaluates the preliminary parameters against market demand." },
  { step: "03", icon: "phone_in_talk", title: "Discovery Call", desc: "A dedicated advisor connects with you to align on goals, pricing expectations, and timelines." },
  { step: "04", icon: "verified_user", title: "Document Review", desc: "Rigorous verification of legal title, katha, project approvals, or financial capability." },
  { step: "05", icon: "description", title: "Proposal", desc: "We structure a formal engagement model, SPV term sheet, or marketing strategy tailored to you." },
  { step: "06", icon: "handshake", title: "Partnership Begins", desc: "Execution starts with full transparency, milestone tracking, and dedicated reporting." },
];

const faqItems: FaqItem[] = [
  {
    question: "Who can partner with Crystal Stone Properties?",
    answer: (
      <p className="section-body">
        We partner with three distinct groups: <strong>Individual Landowners</strong> looking to sell or monetize independent sites, agricultural land, or commercial plots; <strong>Developers &amp; Builders</strong> seeking institutional marketing, channel sales, and investor outreach; and <strong>Private &amp; Institutional Investors</strong> seeking vetted co-investment opportunities or off-market land acquisitions.
      </p>
    ),
  },
  {
    question: "Do you work outside Bangalore?",
    answer: (
      <p className="section-body">
        Our primary focus is on <strong>Bangalore and its surrounding high-growth corridors</strong> — including Devanahalli, North Bangalore, Yelahanka, Sarjapur, and areas along the Satellite Town Ring Road (STRR). Deep micro-market specialization allows us to provide unmatched legal due diligence and pricing accuracy. For exceptional institutional mandates, we also evaluate strategic corridors across South India.
      </p>
    ),
  },
  {
    question: "Do you charge upfront fees for partnership or listing?",
    answer: (
      <p className="section-body">
        Our fee structure depends entirely on the engagement type and partnership model. For standard channel partner sales and landowner brokerage, we operate on a success-fee basis upon deal closure. For dedicated digital marketing mandates, joint venture structuring, or bespoke legal due diligence, a structured professional advisory fee or retainer may apply as outlined in our formal proposal.
      </p>
    ),
  },
  {
    question: "What is the typical response time after submitting an inquiry?",
    answer: (
      <p className="section-body">
        Our institutional advisory team reviews all submitted mandates promptly. You can expect a personalized response from a Senior Partner or Investment Advisor within <strong>one business day</strong> to schedule an initial discovery call.
      </p>
    ),
  },
];

function SectionDivider() {
  return <div className="gold-divider w-full" />;
}

export default function PartnerWithUsContent() {
  const [selectedAudience, setSelectedAudience] = useState<AudienceType>("individual");

  const handleCardClick = (audience: AudienceType) => {
    setSelectedAudience(audience);
    const formElement = document.getElementById("enquiry-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-15 flex justify-center items-center">
          <div className="w-[600px] h-[600px] border border-primary/30 rounded-full absolute -top-40 -left-32" />
          <div className="w-[400px] h-[400px] border border-primary/20 rounded-full absolute -bottom-20 -right-20" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="section-eyebrow block mb-4">Institutional Partnership Mandate</span>
          <h1 className="font-display-xl text-display-xl text-on-surface mb-6">
            Grow With Crystal Stone
          </h1>
          <div className="gold-divider w-24 mx-auto mb-8" />
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            Whether you&apos;re a landowner looking to sell, a developer seeking qualified buyers, or an investor interested in strategic opportunities — we build partnerships based on transparency, research, and long-term value.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleCardClick("individual")}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button"
            >
              Become a Partner
            </button>
            <a
              href="#why-partner"
              className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-label-md uppercase tracking-widest hover:bg-primary/10 transition-colors"
            >
              Explore Our Model
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 2. Three Partnership Cards */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="section-eyebrow block mb-4">Tailored collaboration</span>
          <h2 className="section-title mb-4">Choose Your Partnership Path</h2>
          <p className="section-body">
            We deliver specialized execution models designed specifically around your asset class and strategic goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {partnershipCards.map((card) => {
            const isSelected = selectedAudience === card.id;
            return (
              <div
                key={card.id}
                className={`glass-panel p-8 flex flex-col justify-between transition-all duration-300 ${
                  isSelected ? "border-primary bg-surface-container-low" : "hover:border-primary/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="material-symbols-outlined text-primary text-4xl block">
                      {card.icon}
                    </span>
                    {isSelected && (
                      <span className="font-label-md text-primary uppercase tracking-widest text-[10px] bg-primary/10 border border-primary/30 px-3 py-1">
                        Selected
                      </span>
                    )}
                  </div>

                  <span className="font-label-md text-primary uppercase tracking-widest text-xs mb-2 block">
                    {card.subtitle}
                  </span>
                  <h3 className="font-headline-lg text-xl text-on-surface mb-4">
                    {card.title}
                  </h3>
                  <p className="section-body mb-6">
                    {card.description}
                  </p>

                  <div className="space-y-4 pt-4 border-t border-outline-variant/20 mb-8">
                    <p className="font-label-md text-on-surface uppercase tracking-widest text-xs">
                      Key Capabilities
                    </p>
                    <ul className="space-y-3">
                      {card.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 section-body text-sm">
                          <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                            check
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCardClick(card.id)}
                  className={`w-full py-4 font-label-md uppercase tracking-widest text-xs transition-colors ${
                    isSelected
                      ? "bg-primary text-on-primary luxury-button"
                      : "border border-primary text-primary hover:bg-primary/10 bg-transparent"
                  }`}
                >
                  {card.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <SectionDivider />

      {/* 3. Why Partner With Crystal Stone */}
      <section id="why-partner" className="py-24 md:py-32 bg-surface-container-low px-margin-mobile md:px-margin-desktop scroll-mt-24">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="section-eyebrow block mb-4">The Crystal Stone difference</span>
            <h2 className="section-title mb-4">Why Partner With Us</h2>
            <p className="section-body">
              We operate as strategic advisors rather than transactional brokers, protecting your downside while maximizing long-term asset value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {whyPartnerPillars.map((pillar) => (
              <div key={pillar.title} className="glass-panel p-8">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block">
                  {pillar.icon}
                </span>
                <h3 className="font-headline-lg text-lg text-on-surface mb-3">
                  {pillar.title}
                </h3>
                <p className="section-body text-sm">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 4. Partnership Process */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="section-eyebrow block mb-4">Process</span>
          <h2 className="section-title mb-4">Our Partnership Process</h2>
          <p className="section-body">
            A seamless, transparent roadmap from preliminary mandate submission to institutional execution and value realization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {partnershipProcess.map((step) => (
            <div key={step.title} className="glass-panel p-8 relative">
              <span className="font-label-md text-primary/40 text-xs absolute top-6 right-6">
                {step.step}
              </span>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">
                {step.icon}
              </span>
              <h3 className="font-headline-lg text-lg text-on-surface mb-3">
                {step.title}
              </h3>
              <p className="section-body text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* 5. Dynamic Enquiry Form Section */}
      <section id="enquiry-form" className="py-24 md:py-32 bg-surface-container-lowest px-margin-mobile md:px-margin-desktop scroll-mt-28">
        <div className="max-w-container-max mx-auto">
          <PartnerEnquiryForm
            selectedAudience={selectedAudience}
            onAudienceChange={setSelectedAudience}
          />
        </div>
      </section>

      <SectionDivider />

      {/* 6. FAQ Section */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="section-eyebrow block mb-4">Clarity &amp; governance</span>
          <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          <p className="section-body">
            Everything you need to know about our partnership criteria, due diligence standards, and engagement models.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <SectionDivider />

      {/* 7. Final Consultation CTA Section */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container text-center">
        <div className="max-w-container-max mx-auto max-w-3xl">
          <h2 className="section-title mb-6">Let&apos;s Build Something Valuable Together</h2>
          <p className="section-body mb-8">
            Whether you are monetizing a prime land parcel, launching an ambitious residential development, or allocating capital into high-growth real estate — let us discuss how we can collaborate.
          </p>
          <button
            type="button"
            onClick={() => {
              const formElem = document.getElementById("enquiry-form");
              if (formElem) formElem.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button"
          >
            Schedule a Consultation
          </button>
        </div>
      </section>

      <SectionDivider />
      <PartnersStrip />
      <SectionDivider />
      {/* <ContactSection /> */}
    </>
  );
}
