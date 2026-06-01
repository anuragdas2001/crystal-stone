import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@repo/ui/layout/ContactSection";
import PartnersStrip from "@repo/ui/layout/PartnersStrip";

export const metadata: Metadata = {
  title: "Services — Crystal Stone Properties",
  description:
    "PropertyGuard Plus, PropertyCare Plus, and SettleEasy — expert property management for farm land, gated community land, and independent land in Bangalore.",
};

const coreServices = [
  {
    icon: "shield",
    title: "PropertyGuard Plus",
    tagline: "Your Partner in Safeguarding Your Land",
    desc: "A comprehensive solution designed to protect your land from potential risks and challenges. Our dedicated team offers unmatched vigilance and care — whether it's monitoring or boundary inspections, PropertyGuard Plus is your trusted ally in property protection.",
    benefits: [
      "Regular property surveillance to prevent unauthorized use.",
      "Resolution of boundary disputes with expert guidance.",
      "Timely reports and updates for complete transparency.",
    ],
  },
  {
    icon: "yard",
    title: "PropertyCare Plus",
    tagline: "Hassle-Free Maintenance for Value Appreciation",
    desc: "A tailored service for landowners who want a worry-free solution for maintaining their property. From cleanliness and landscaping to ensuring your land is primed for market value appreciation, we handle it all.",
    benefits: [
      "Regular property upkeep, including debris clearance and landscaping.",
      "Coordination with trusted vendors for repairs and enhancements.",
      "Preservation of property value through proactive care.",
    ],
  },
  {
    icon: "handshake",
    title: "SettleEasy",
    tagline: "Simplifying Settlements for Landowners",
    desc: "Our specialised service that helps you unlock the full potential of your property by managing settlements with precision. Expert negotiators and legal partners work seamlessly to turn challenges into opportunities.",
    benefits: [
      "Professional support in resolving property settlements.",
      "Assistance from legal experts for hassle-free documentation.",
      "Maximised value through expert negotiation strategies.",
    ],
  },
];

const whyChoose = [
  {
    icon: "workspace_premium",
    title: "Expertise You Can Trust",
    desc: "With years of experience in property management, our team understands the unique needs of landowners.",
  },
  {
    icon: "all_inclusive",
    title: "Comprehensive Solutions",
    desc: "From security to maintenance and settlements, we provide end-to-end property management services.",
  },
  {
    icon: "tune",
    title: "Tailored Approach",
    desc: "Our services are designed to cater specifically to your property's needs, ensuring optimal care and value.",
  },
  {
    icon: "forum",
    title: "Transparency and Communication",
    desc: "We keep you informed every step of the way with detailed updates and reports.",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: "calendar_month",
    title: "Initial Consultation",
    desc: "Schedule a meeting with our property experts to discuss your needs and concerns.",
  },
  {
    step: "02",
    icon: "design_services",
    title: "Customised Service",
    desc: "We create a tailored plan that aligns with your property's requirements and your goals.",
  },
  {
    step: "03",
    icon: "precision_manufacturing",
    title: "Seamless Execution",
    desc: "Our team executes the plan with precision, ensuring consistent care and regular updates.",
  },
  {
    step: "04",
    icon: "support_agent",
    title: "Ongoing Support",
    desc: "Enjoy peace of mind with our continuous support and expertise.",
  },
];

function SectionDivider() {
  return <div className="gold-divider w-full" />;
}

export default function ServicesPage() {
  return (
    <>
        {/* Hero */}
        <section className="relative py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <div className="w-[500px] h-[500px] border border-primary/30 rounded-full absolute -bottom-32 -left-24" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="section-eyebrow block mb-4">Services</span>
            <h1 className="font-display-xl text-display-xl text-on-surface mb-6">
              Unlock the Full Potential of Your Property
            </h1>
            <div className="gold-divider w-24 mx-auto mb-8" />
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              At Crystal Stone Properties, we understand the value of your land and the importance
              of keeping it secure, well-maintained, and optimised for future opportunities.
            </p>
            <p className="section-body mb-10">
              Our range of expert property management services ensures that your property is always
              in the best hands, giving you peace of mind and confidence in your investment.
            </p>
            <Link
              href="/services#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button"
            >
              Sign Up Now
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        <SectionDivider />

        {/* Core services intro */}
        <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <span className="section-eyebrow block mb-4">What we offer</span>
          <h2 className="section-title mb-4">Our Core Services</h2>
          <p className="section-body max-w-2xl mx-auto">
            We provide Farm Land, Gated Community Land and Independent Land property solutions for
            buyers &amp; sellers.
          </p>
        </section>

        {/* Service cards */}
        <section className="pb-24 md:pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-gutter">
          {coreServices.map((service, index) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center glass-panel p-8 md:p-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`lg:col-span-5 ${index % 2 === 1 ? "lg:col-start-8" : ""}`}>
                <span className="material-symbols-outlined text-primary text-5xl mb-6 block">
                  {service.icon}
                </span>
                <p className="font-label-md text-primary uppercase tracking-widest text-xs mb-2">
                  {service.tagline}
                </p>
                <h3 className="font-display-lg text-headline-lg-mobile text-on-surface mb-4">
                  {service.title}
                </h3>
                <p className="section-body mb-6">{service.desc}</p>
                <Link
                  href="/services#contact"
                  className="inline-flex items-center gap-2 font-label-md text-primary uppercase tracking-widest text-xs border-b border-primary/40 hover:border-primary pb-1 transition-colors"
                >
                  Sign Up Now
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"}`}>
                <h4 className="font-label-md text-on-surface uppercase tracking-widest text-xs mb-4">
                  Key Benefits
                </h4>
                <ul className="space-y-4">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 section-body">
                      <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">
                        check
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <SectionDivider />

        {/* Why choose */}
        <section className="py-24 md:py-32 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="section-eyebrow block mb-4">Our promise</span>
              <h2 className="section-title mb-4">Why Choose Crystal Stone Properties?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {whyChoose.map((item) => (
                <div key={item.title} className="glass-panel p-8">
                  <span className="material-symbols-outlined text-primary text-3xl mb-4 block">
                    {item.icon}
                  </span>
                  <h3 className="font-headline-lg text-lg text-on-surface mb-3">{item.title}</h3>
                  <p className="section-body text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/services#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button"
              >
                Sign Up Now
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* How it works */}
        <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="section-eyebrow block mb-4">Process</span>
            <h2 className="section-title mb-4">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {howItWorks.map((step) => (
              <div key={step.title} className="glass-panel p-8 relative">
                <span className="font-label-md text-primary/40 text-xs absolute top-6 right-6">
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
        </section>

        <SectionDivider />

        {/* CTA */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container text-center">
          <div className="max-w-container-max mx-auto max-w-3xl">
            <h2 className="section-title mb-6">Contact Us Today</h2>
            <p className="section-body mb-8">
              Ready to take the stress out of property management? Reach out to Crystal Stone
              Properties to learn more about our services and how we can help you secure, maintain,
              and optimise your land. Let us handle the hard work while you enjoy the rewards of
              owning a well-managed property.
            </p>
            <Link
              href="/services#contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-label-md uppercase tracking-widest hover:bg-primary/10 transition-colors"
            >
              Get in Touch
              <span className="material-symbols-outlined text-[18px]">mail</span>
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
