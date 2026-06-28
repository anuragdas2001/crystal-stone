import type { Metadata } from "next";
import ContactForm from "@repo/ui/about/ContactForm";
import PartnersStrip from "@repo/ui/layout/PartnersStrip";

export const metadata: Metadata = {
  title: "Contact — Crystal Stone Properties",
  description:
    "Contact Crystal Stone Properties in Bangalore. Call +91 99000 93002 or email info@crystalstoneproperties.com for real estate enquiries.",
};

function SectionDivider() {
  return <div className="gold-divider w-full" />;
}

export default function ContactPage() {
  return (
    <>
        {/* Hero */}
        <section className="relative py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <div className="w-[600px] h-[600px] border border-primary/25 rounded-full absolute -top-48 right-0" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="section-eyebrow block mb-4">Contact</span>
            <h1 className="font-display-xl text-display-xl text-on-surface mb-6">
              We provide the most suitable and quality real estate.
            </h1>
            <div className="gold-divider w-24 mx-auto mb-8" />
            <p className="section-body max-w-xl mx-auto">
              Reach out to our Bangalore team for property enquiries, investment discussions, or
              property management services.
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* Contact details + form */}
        <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="section-eyebrow block mb-6">Contact us</span>
                <h2 className="section-title mb-2">Get in touch</h2>
              </div>

              <div className="glass-panel p-6 md:p-8">
                <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-3">
                  Office address
                </p>
                <p className="section-body leading-relaxed">
                  Cherry Hills, Embassy Golf Links Business Park, Intermediate Ring Road, Domlur,
                  Karnataka, Bangalore — 560071
                </p>
              </div>

              <div>
                <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Call us
                </p>
                <a
                  href="tel:+919900093002"
                  className="font-headline-lg text-2xl text-primary hover:text-primary-fixed transition-colors"
                >
                  +91 99000 93002
                </a>
              </div>

              <div>
                <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Email us
                </p>
                <a
                  href="mailto:info@crystalstoneproperties.com"
                  className="font-body-lg text-body-lg text-on-surface hover:text-primary transition-colors break-all"
                >
                  info@crystalstoneproperties.com
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                {[
                  { icon: "call", label: "Hotline", value: "+91 99000 93002", href: "tel:+919900093002" },
                  {
                    icon: "mail",
                    label: "Email",
                    value: "info@crystalstoneproperties.com",
                    href: "mailto:info@crystalstoneproperties.com",
                  },
                  { icon: "location_on", label: "City", value: "Bangalore, India", href: undefined },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 border border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                    <div>
                      <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-[10px] mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="section-body text-sm hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="section-body text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mb-8">
                <h3 className="font-headline-lg text-xl text-on-surface mb-2">Contact form</h3>
                <p className="section-body text-sm">
                  Share your details and our team will respond with curated options tailored to your
                  needs.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        <SectionDivider />
        <PartnersStrip />
    </>
  );
}
