import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@repo/ui/about/ContactForm";

export const metadata: Metadata = {
  title: "About — Crystal Stone Properties",
  description:
    "Your trusted partner in Bangalore real estate investment. Residential, commercial, and rural property solutions with legal verification and technology-driven service.",
};

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "150+", label: "Major Company Partners" },
];

const services = [
  {
    icon: "home_work",
    title: "Property Management",
    desc: "Residential, commercial, and rural property solutions for buyers and sellers — managed with care from acquisition through handover.",
  },
  {
    icon: "support_agent",
    title: "Consulting Service",
    desc: "Expert guidance on land acquisition, investment strategy, and market positioning tailored to your financial goals.",
  },
  {
    icon: "real_estate_agent",
    title: "Buy and Sell Real Estate",
    desc: "End-to-end support for purchasing and selling verified plots, commercial land, and long-term investment opportunities.",
  },
];

const whyChooseUs = [
  {
    icon: "insights",
    title: "Market Insights & Investment Advice",
    desc: "We stay ahead of market trends and provide data-driven insights to maximise your investment returns, with strategic advice aligned to your financial goals.",
  },
  {
    icon: "handshake",
    title: "End-to-End Support",
    desc: "Our dedicated team guides you through property discovery, site visits, legal assistance, and negotiations — making your experience hassle-free and rewarding.",
  },
  {
    icon: "verified_user",
    title: "Transparent and Honest",
    desc: "Integrity is at the core of what we do. We provide clear, unbiased advice and maintain transparency in every transaction.",
  },
];

const platformFeatures = [
  {
    icon: "update",
    title: "Thousands of posts every day",
    desc: "Lists are refreshed and updated constantly so you never miss an opportunity.",
    cta: "See all listings",
    href: "/properties",
  },
  {
    icon: "tune",
    title: "Smart filter",
    desc: "Find the right property in the shortest amount of time with precision search tools.",
    cta: "See all listings",
    href: "/properties",
  },
  {
    icon: "support",
    title: "Great support",
    desc: "After-sales care, helpful advice, and dedicated guidance to avoid scams and delays.",
    cta: "See all listings",
    href: "/properties",
  },
];

const partners = [
  "Max Estates",
  "Brigade",
  "Sattva",
  "Cushman & Wakefield",
];

const storyParagraphs = [
  "At Crystal Stone Properties, we understand that real estate investments are one of the most significant decisions you'll make, and we are here to ensure that you make the best one.",
  "Our portfolio is specifically curated to provide our customers with opportunities that have the potential for exponential growth, whether you're looking for residential plots, commercial land, or long-term investment opportunities.",
  "What sets us apart is our unique blend of experience in both real estate and technology. For the last 10 years, we have continuously refined our processes to ensure a smooth and transparent buying experience for our clients.",
  "We leverage advanced technology to streamline everything from property searches to legal paperwork, making the acquisition process faster, more efficient, and easier for you. Our goal is to minimise the hassles that traditionally come with real estate transactions so that you can focus on what matters most: securing a high-value asset.",
  "Each property we offer is thoroughly verified through all legal channels before being presented to you, giving you peace of mind in your investment journey.",
];

function SectionDivider() {
  return <div className="gold-divider w-full" />;
}

export default function AboutPage() {
  return (
    <>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-15 flex justify-center items-center">
            <div className="w-[600px] h-[600px] border border-primary/30 rounded-full absolute -top-48 -right-24" />
            <div className="w-[400px] h-[400px] border border-primary/20 rounded-full absolute bottom-0 -left-32" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="section-eyebrow block mb-4">About</span>
            <h1 className="font-display-xl text-display-xl text-on-surface mb-6">
              Your Trusted Partner in Real Estate Investment
            </h1>
            <div className="gold-divider w-24 mx-auto mb-8" />
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Built on integrity, trust, and customer-first service — specialising in Bangalore&apos;s
              high-growth real estate market.
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* ── Story ────────────────────────────────────────── */}
        <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-7 space-y-6">
              {storyParagraphs.map((p) => (
                <p key={p.slice(0, 40)} className="section-body leading-relaxed">
                  {p}
                </p>
              ))}
              <p className="section-body leading-relaxed">
                Specialising in the vibrant Bangalore real estate market, we bring you prime land
                assets located in high-growth areas of the city. Bangalore, known for its rapid
                urbanisation and booming tech industry, is a goldmine for real estate investors. By
                partnering with Crystal Stone Properties, you gain access to exclusive properties
                that are set to appreciate in value over time.
              </p>
              <p className="section-body leading-relaxed">
                Our core values — integrity, trust, and customer-first service — are the foundation
                of everything we do. We believe in transparency and work diligently to ensure that
                our clients are fully informed and confident in every step of the buying process.
              </p>
              <p className="section-body leading-relaxed">
                Choosing Crystal Stone Properties means choosing a partner that is invested in your
                success. With expert guidance, legally vetted properties, and a focus on customer
                satisfaction, we ensure your investment is secure, strategic, and poised for future
                gains.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-gutter">
                {stats.map((s) => (
                  <div key={s.label} className="glass-panel p-8 text-center">
                    <p className="font-display-lg text-display-lg text-primary mb-2">{s.value}</p>
                    <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="glass-panel p-8">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">location_city</span>
                <h3 className="font-headline-lg text-xl text-on-surface mb-3">Bangalore Focus</h3>
                <p className="section-body text-sm">
                  Prime land assets in high-growth corridors — residential plots, commercial land,
                  and portfolio-building opportunities across the city.
                </p>
              </div>
              <div className="glass-panel p-8 border-l-4 border-l-primary">
                <p className="font-label-md text-primary uppercase tracking-widest text-xs mb-2">
                  Legal assurance
                </p>
                <p className="section-body text-sm">
                  Every listing is thoroughly verified through all legal channels before it reaches
                  you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ── Our Services ─────────────────────────────────── */}
        <section id="services" className="py-24 md:py-32 bg-surface-container-lowest px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="section-eyebrow block mb-4">What we offer</span>
              <h2 className="section-title mb-4">Our Services</h2>
              <p className="section-body">
                We provide residential, commercial, and rural property solutions for buyers &amp;
                sellers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="glass-panel p-8 md:p-10 group hover:border-primary/30 transition-colors duration-300"
                >
                  <span className="material-symbols-outlined text-primary text-4xl mb-6 block">
                    {s.icon}
                  </span>
                  <h3 className="font-headline-lg text-xl text-on-surface mb-4">{s.title}</h3>
                  <p className="section-body">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ── Trusted by ───────────────────────────────────── */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <span className="section-eyebrow block mb-4">Partnerships</span>
          <h2 className="section-title mb-12">Trusted by over 150+ major companies</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            {partners.map((name) => (
              <span
                key={name}
                className="font-label-md text-on-surface-variant uppercase tracking-widest text-sm border border-outline-variant/30 px-6 py-3"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ── Why choose us (platform) ─────────────────────── */}
        <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="section-eyebrow block mb-4">Why choose us</span>
            <h2 className="section-title mb-4">The best deal on every property</h2>
            <p className="section-body">
              It&apos;s our job to make sure that you get the best possible deal on the property.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {platformFeatures.map((f) => (
              <div key={f.title} className="glass-panel p-8 flex flex-col">
                <span className="material-symbols-outlined text-primary text-3xl mb-4">{f.icon}</span>
                <h3 className="font-headline-lg text-lg text-on-surface mb-3">{f.title}</h3>
                <p className="section-body mb-6 flex-grow">{f.desc}</p>
                <Link
                  href={f.href}
                  className="inline-flex items-center gap-2 font-label-md text-primary uppercase tracking-widest text-xs border-b border-primary/40 hover:border-primary pb-1 w-fit transition-colors"
                >
                  {f.cta}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ── Why choose us (values) ───────────────────────── */}
        <section className="py-24 md:py-32 bg-surface-container-low px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="section-eyebrow block mb-4">Why choose us</span>
              <h2 className="section-title mb-4">Committed to your success</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="font-headline-lg text-lg text-on-surface mb-3">{item.title}</h3>
                  <p className="section-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ── CTA banner ───────────────────────────────────── */}
        <section className="py-20 px-margin-mobile md:px-margin-desktop text-center bg-surface-container">
          <div className="max-w-container-max mx-auto">
            <h2 className="section-title mb-4">
              Search for your dream home or increase your investment opportunity today
            </h2>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button"
            >
              Browse Properties
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        <SectionDivider />

        {/* ── Contact ──────────────────────────────────────── */}
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
    </>
  );
}
