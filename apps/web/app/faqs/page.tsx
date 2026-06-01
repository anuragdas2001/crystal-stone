import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@repo/ui/layout/ContactSection";
import FaqAccordion, { type FaqItem } from "@repo/ui/faq/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQs — Crystal Stone Properties",
  description:
    "Frequently asked questions about Aspire, Signature, and Capital Series homes, legal verification, rental income, financing, and buying with Crystal Stone Properties.",
};

const legalChecks = [
  "Property title checks",
  "DC office & BBMP/BDA/Revenue status",
  "Owner verification & criminal history screening",
  "Final legal review by a certified lawyer",
];

const faqs: FaqItem[] = [
  {
    question: "What types of homes do you offer?",
    answer: (
      <div className="space-y-3">
        <p>We offer three distinct residential categories:</p>
        <ul className="space-y-2 list-none">
          <li>
            <strong className="text-on-surface">Aspire Series:</strong> Affordable independent homes.
          </li>
          <li>
            <strong className="text-on-surface">Signature Series:</strong> Premium luxury homes.
          </li>
          <li>
            <strong className="text-on-surface">Capital Series:</strong> High-demand homes ideal for investment.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "Are these gated community projects or apartments?",
    answer: (
      <p>
        No. Our homes are independent units — they offer privacy, freedom to customise, and greater
        long-term value compared to gated apartments or villa projects.
      </p>
    ),
  },
  {
    question: "Can I live in the home and still earn rental income?",
    answer: (
      <p>
        Yes, many of our buyers choose to live in the property and rent out a portion, especially in
        larger or duplex layouts. It&apos;s a great way to offset homeownership costs.
      </p>
    ),
  },
  {
    question: "Are these homes ready to move in?",
    answer: (
      <p>
        Some properties are move-in ready, while others are in development. We&apos;ll share options
        based on your timeline and preferences.
      </p>
    ),
  },
  {
    question: "What makes your projects different from traditional homes?",
    answer: (
      <p>
        Our homes are backed by <strong className="text-on-surface">strong due diligence</strong> and
        are curated for better resale demand. We verify ownership, conduct criminal checks, and
        validate with BBMP, BDA, and DC offices — all with supporting legal vetting.
      </p>
    ),
  },
  {
    question: "Do you offer home customization or modification options?",
    answer: (
      <p>
        Yes. Depending on the stage of the project, we can offer customisation in layout, interiors,
        and design finishes.
      </p>
    ),
  },
  {
    question: "Do your homes come with amenities like a gym or clubhouse?",
    answer: (
      <p>
        No. These are independent homes, not part of apartment or gated community complexes. But they
        offer the advantage of personal space, garden area, and flexibility.
      </p>
    ),
  },
  {
    question: "How do I know the project is legally clear?",
    answer: (
      <div className="space-y-3">
        <p>
          We follow a strict <strong className="text-on-surface">multi-stage approval process</strong>{" "}
          that includes:
        </p>
        <ul className="space-y-2">
          {legalChecks.map((check) => (
            <li key={check} className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-lg shrink-0">check</span>
              {check}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    question: "Can I buy a home as an investment and not live in it?",
    answer: (
      <p>
        Absolutely. Many buyers purchase to generate rental income and benefit from appreciation. You
        don&apos;t have to occupy the home to profit from it.
      </p>
    ),
  },
  {
    question: "What kind of rental income can I expect?",
    answer: (
      <p>
        While returns vary by location, property size, and market conditions, independent homes
        typically offer better rental yields than apartments in similar price brackets.
      </p>
    ),
  },
  {
    question: "Can you help me find tenants if I buy a home for rental income?",
    answer: (
      <p>
        Yes, we offer post-purchase support, including assistance with tenant sourcing and property
        management services.
      </p>
    ),
  },
  {
    question: "Do I need to be in Bangalore to purchase a home with you?",
    answer: (
      <p>
        No, we work with clients across India and abroad. All documentation and processes can be
        handled remotely with our team.
      </p>
    ),
  },
  {
    question: "Are these homes loan-eligible?",
    answer: (
      <p>
        Yes, our projects are approved by leading banks. We can help connect you with financing
        partners based on your eligibility.
      </p>
    ),
  },
  {
    question: "How do I know which category is right for me?",
    answer: (
      <p>
        Our team will understand your living or investment goals and suggest options from Aspire,
        Signature, or Capital Series accordingly.
      </p>
    ),
  },
  {
    question: "What if I want to exit the investment in a few years?",
    answer: (
      <p>
        We help homeowners with resale through our active buyer network and market advisory. Our homes
        are positioned for strong resale demand due to location, legal clarity, and structure.
      </p>
    ),
  },
  {
    question: "Are there any hidden costs or unclear charges?",
    answer: (
      <p>
        No. All costs, approvals, and details are shared transparently once you choose a property.
        Our goal is to build trust through complete clarity.
      </p>
    ),
  },
  {
    question: "What documents will I get during the purchase?",
    answer: (
      <p>
        You&apos;ll receive the sale deed, approved building plan, legal verification summary, tax
        documents, and ownership proof — everything needed for a clean transfer.
      </p>
    ),
  },
  {
    question: "Who are these homes ideal for?",
    answer: (
      <p>
        Our homes suit a wide range of buyers — first-time homeowners, families upgrading to larger
        spaces, and long-term investors looking for a tangible, appreciating asset.
      </p>
    ),
  },
  {
    question: "Is buying an independent home risky?",
    answer: (
      <p>
        Not when you buy from a team that puts{" "}
        <strong className="text-on-surface">legal, structural, and financial due diligence</strong>{" "}
        first. Our projects are thoroughly verified, so you don&apos;t get stuck with a problematic
        property.
      </p>
    ),
  },
  {
    question: "How do I get started?",
    answer: (
      <div className="space-y-4">
        <p>
          Just fill out our quick Smart Buyer Survey and our team will reach out with curated options
          tailored to your needs.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 font-label-md text-primary uppercase tracking-widest border-b border-primary/40 hover:border-primary pb-1 transition-colors"
        >
          Link to Survey
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    ),
  },
];

function SectionDivider() {
  return <div className="gold-divider w-full" />;
}

export default function FaqsPage() {
  return (
    <>
        {/* Hero */}
        <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <span className="section-eyebrow block mb-4">Support</span>
          <h1 className="font-display-xl text-display-xl text-on-surface mb-6">
            Frequently asked questions
          </h1>
          <div className="gold-divider w-24 mx-auto mb-8" />
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Quick answers to questions you may have. Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="text-primary hover:text-primary-fixed transition-colors">
              Get in touch
            </Link>{" "}
            and our team will help.
          </p>
        </section>

        <SectionDivider />

        {/* FAQ list */}
        <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <FaqAccordion items={faqs} />
        </section>

        <SectionDivider />

        {/* CTA */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container-low text-center">
          <div className="max-w-container-max mx-auto max-w-2xl">
            <h2 className="section-title mb-4">Still have questions?</h2>
            <p className="section-body mb-8">
              Our advisory team is ready to walk you through Aspire, Signature, and Capital Series
              options based on your goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button"
            >
              Contact Us
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        <SectionDivider />
        <ContactSection />
    </>
  );
}
