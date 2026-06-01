import ContactForm from "@repo/ui/about/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-5">
          <span className="section-eyebrow block mb-4">Contact us</span>
          <h2 className="section-title mb-8">Get in touch</h2>
          <div className="space-y-8">
            <div>
              <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                Call us
              </p>
              <a
                href="tel:+919900093002"
                className="font-headline-lg text-xl text-primary hover:text-primary-fixed transition-colors"
              >
                +91 99000 93002
              </a>
            </div>
            <div>
              <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                Email
              </p>
              <a
                href="mailto:info@crystalstoneproperties.com"
                className="font-body-lg text-body-lg text-on-surface hover:text-primary transition-colors break-all"
              >
                info@crystalstoneproperties.com
              </a>
            </div>
            <div>
              <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                Office address
              </p>
              <p className="section-body">Bangalore, India</p>
            </div>
            <div className="glass-panel p-6">
              <p className="font-label-md text-primary uppercase tracking-widest text-xs mb-3">
                Head office
              </p>
              <p className="section-body text-sm leading-relaxed">
                Cherry Hills, Embassy Golf Links Business Park, Intermediate Ring Road, Domlur,
                Karnataka, Bangalore — 560071
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
