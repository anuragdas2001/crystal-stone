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
    question: "How do you verify the properties listed on your platform?",
    answer: (
      <p>
        Every property undergoes an initial review of ownership records, available title documents,
        tax receipts, and other relevant information before being presented to prospective buyers.
        We also encourage buyers to conduct independent legal due diligence before completing any
        transaction.
      </p>
    ),
  },
  {
    question: "Do you offer properties that are not publicly advertised?",
    answer: (
      <p>
        Yes. Some opportunities are sourced through our private network of landowners, investors,
        developers, and industry contacts. These properties may not be publicly listed and are
        shared with qualified buyers based on their requirements.
      </p>
    ),
  },
  {
    question: "Can you help me find investment properties with high growth potential?",
    answer: (
      <p>
        Yes. We focus on identifying opportunities based on location growth, infrastructure
        development, market demand, future development plans, and overall investment potential —
        rather than simply listing available properties.
      </p>
    ),
  },
  {
    question: "I live outside Bangalore or India. Can you help me purchase property remotely?",
    answer: (
      <p>
        Yes. We regularly assist buyers, NRIs, and investors who are unable to visit properties
        frequently. Our team can coordinate property inspections, documentation support, virtual
        walkthroughs, and transaction guidance throughout the process.
      </p>
    ),
  },
  {
    question: "How do I know if a property is priced fairly?",
    answer: (
      <p>
        Property values are assessed using market trends, comparable transactions, location
        advantages, development potential, infrastructure growth, and current demand conditions.
        Buyers receive transparent information to help them make informed decisions.
      </p>
    ),
  },
  {
    question: "Do you only deal with residential properties?",
    answer: (
      <p>
        No. We work across multiple property categories including residential plots, villas,
        apartments, commercial properties, development sites, and large land parcels suitable for
        investors and developers.
      </p>
    ),
  },
  {
    question: "What information should I have ready before enquiring about a property?",
    answer: (
      <p>
        Useful details include budget range, preferred location, property type, investment or
        end-use objective, financing requirements, and expected purchase timeline.
      </p>
    ),
  },
  {
    question: "Why are some properties available below market value?",
    answer: (
      <p>
        Certain opportunities may be attractively priced due to urgent sales, investor exits,
        settlement situations, redevelopment opportunities, or specific transaction requirements.
        Each opportunity should be evaluated based on its individual circumstances and potential
        risks.
      </p>
    ),
  },
  {
    question: "What happens after I submit an enquiry?",
    answer: (
      <p>
        Our team reviews your requirements, contacts you for an initial discussion, understands
        your objectives, and recommends suitable opportunities based on your budget, preferences,
        and investment goals.
      </p>
    ),
  },
  {
    question: "Why should I work with Crystal Stone Properties instead of searching on property portals?",
    answer: (
      <p>
        Property portals provide listings. We focus on helping clients evaluate opportunities,
        verify information, identify potential risks, access off-market opportunities, and make
        informed real estate decisions through a more personalised approach.
      </p>
    ),
  },
  {
    question: "Do you work directly with landowners, developers, and investors?",
    answer: (
      <p>
        Yes. Our network includes landowners, developers, investors, channel partners, and industry
        professionals — allowing us to source opportunities that may not always be available through
        traditional property listing platforms.
      </p>
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
