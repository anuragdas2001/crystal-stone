"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ContactSection from "@repo/ui/layout/ContactSection";
import PartnersStrip from "@repo/ui/layout/PartnersStrip";

const PUBLIC_PROPERTIES = [
  {
    id: "devanahalli-aero-city",
    slug: "devanahalli-aero-city",
    title: "Devanahalli Aero City Enclave",
    location: "Airport Growth Corridor, North Bengaluru",
    price: "₹64 Lakhs",
    priceLabel: "Onwards",
    score: 91,
    badge: "CRYSTAL STONE PICK",
    specs: ["1,200 - 2,400 Sq.ft", "BMRDA Approved", "70% Bank Loan"],
    horizon: "3 – 5 Years",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    desc: "Located strategically within 10 mins of Kempegowda International Airport with upcoming aerospace park proximity.",
  },
  {
    id: "yelahanka-green-county",
    slug: "yelahanka-green-county",
    title: "Yelahanka Green County",
    location: "High Growth Residential Zone, Bengaluru",
    price: "₹56 Lakhs",
    priceLabel: "Onwards",
    score: 88,
    badge: "HIGH POTENTIAL",
    specs: ["1,200 Sq.ft Plots", "A Katha Property", "Ready to Register"],
    horizon: "3 – 6 Years",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    desc: "A serene residential layout surrounded by existing social infrastructure and rapidly improving road connectivity.",
  },
  {
    id: "hennur-luxury-layout",
    slug: "hennur-luxury-layout",
    title: "Hennur Luxury Layout",
    location: "Premium Residential Corridor, Bengaluru",
    price: "₹82 Lakhs",
    priceLabel: "Onwards",
    score: 85,
    badge: "VERIFIED SANCTUARY",
    specs: ["1,500 Sq.ft Plots", "RERA Registered", "Wide Asphalt Roads"],
    horizon: "2 – 5 Years",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    desc: "Premium plotted development designed for luxury villa construction with immediate access to tech parks.",
  },
  {
    id: "sarjapur-tech-corridor",
    slug: "sarjapur-tech-corridor",
    title: "Sarjapur Tech Corridor",
    location: "IT Growth Belt, East Bengaluru",
    price: "₹75 Lakhs",
    priceLabel: "Onwards",
    score: 89,
    badge: "STRONG DEMAND",
    specs: ["1,200 Sq.ft Plots", "BDA Approved", "Gated Community"],
    horizon: "4 – 7 Years",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    desc: "Situated right in the heart of East Bengaluru's expanding IT corridor with strong rental and resale demand.",
  },
  {
    id: "strr-logistics-park",
    slug: "strr-logistics-park",
    title: "STRR Industrial & Logistics Park",
    location: "Satellite Town Ring Road, Bengaluru",
    price: "₹1.2 Cr",
    priceLabel: "Onwards",
    score: 90,
    badge: "INSTITUTIONAL GRADE",
    specs: ["5,000+ Sq.ft", "KIADB Allotted", "Commercial Zoning"],
    horizon: "5 – 8 Years",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    desc: "Prime industrial land situated along the Satellite Town Ring Road, ideal for warehousing and logistics.",
  },
  {
    id: "hoskote-biotech-hub",
    slug: "hoskote-biotech-hub",
    title: "Hoskote Bio-Tech Hub",
    location: "Emerging Corridor, East Bengaluru",
    price: "₹45 Lakhs",
    priceLabel: "Onwards",
    score: 87,
    badge: "VALUE ENTRY",
    specs: ["1,200 Sq.ft Plots", "Clean Title", "Rapid Appreciation"],
    horizon: "3 – 7 Years",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    desc: "An early-stage capital appreciation opportunity in Hoskote supported by upcoming expressway connectivity.",
  },
];

function SectionDivider() {
  return <div className="gold-divider w-full" />;
}

export default function PublicPropertiesView() {
  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="relative py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <div className="w-[600px] h-[600px] border border-primary/20 rounded-full absolute -top-32 -left-32 blur-2xl" />
          <div className="w-[400px] h-[400px] border border-primary/30 rounded-full absolute -bottom-20 -right-20 blur-xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="section-eyebrow block mb-4">Investment Portfolio</span>
          <h1 className="font-display-xl text-4xl md:text-6xl text-on-surface mb-6 leading-tight">
            Curated Land Investment Opportunities
          </h1>
          <div className="gold-divider w-24 mx-auto mb-8" />
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
            We don&apos;t list everything on the market. We evaluate and select opportunities in high-growth corridors backed by infrastructure expansion, legal due diligence, and institutional research.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-primary font-label-md uppercase tracking-widest">
            <span className="flex items-center gap-1.5 bg-primary/10 border border-primary/30 px-4 py-2">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              100% Legally Verified
            </span>
            <span className="flex items-center gap-1.5 bg-primary/10 border border-primary/30 px-4 py-2">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              High Appreciation Potential
            </span>
            <span className="flex items-center gap-1.5 bg-primary/10 border border-primary/30 px-4 py-2">
              <span className="material-symbols-outlined text-[16px]">shield</span>
              No Brokerage Fees
            </span>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── FEATURED OPPORTUNITY BANNER (AIRPORT GROWTH BELT) ── */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="mb-8">
          <span className="section-eyebrow block mb-2">Featured Investment Opportunity</span>
          <h2 className="section-title text-2xl md:text-4xl">Pinnacle Growth Corridor</h2>
        </div>

        <div className="relative rounded-2xl bg-surface-container-low border border-primary/40 overflow-hidden shadow-2xl shadow-black group">
          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            <div className="lg:col-span-7 relative min-h-[440px] md:min-h-[540px] flex flex-col justify-between p-6 md:p-10 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/Rajanukunte_Premium_Layout.png"
                  alt="Airport Growth Belt - Rajanukunte"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-surface-container-low opacity-90 hidden lg:block" />
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 bg-primary text-on-primary font-label-md text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded shadow-lg">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  Capital Appreciation Opportunity
                </span>
                <span className="inline-flex items-center gap-1.5 bg-black/80 border border-primary/60 text-primary font-label-md text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded shadow-lg backdrop-blur-md">
                  Crystal Stone Score — 92 / 100
                </span>
              </div>

              <div className="relative z-10 mt-auto pt-16">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight mb-3 drop-shadow-md">
                  Airport Growth Belt
                </h3>
                <div className="flex items-center gap-2 text-primary text-sm md:text-base font-medium mb-4">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>Rajanukunte | North Bengaluru</span>
                </div>
                <p className="text-on-surface-variant/90 text-sm md:text-base leading-relaxed max-w-xl font-light">
                  A legally verified land investment opportunity selected through infrastructure research, legal due diligence, and long-term market analysis. Designed for investors seeking capital appreciation over a 3–7 year horizon.
                </p>
                <div className="mt-4 inline-block text-[11px] text-primary/80 uppercase tracking-widest font-mono bg-black/60 px-3 py-1 border border-primary/20">
                  Based on Legal, Infrastructure, Growth, Pricing, Demand, Risk
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-10 bg-surface-container/95 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-primary/20 relative z-10">
              <div className="space-y-6 md:space-y-8 flex-1 flex flex-col justify-center py-2">
                <div className="border-b border-primary/15 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-semibold block mb-1">
                    Crystal Stone Score
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl text-primary font-bold">92</span>
                    <span className="text-on-surface-variant text-lg">/ 100</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant/70 mt-1">
                    Top-tier rating across all 6 evaluation dimensions.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-primary/15">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-1">
                      Entry Price
                    </span>
                    <p className="font-serif text-2xl text-on-surface font-semibold">₹40 Lakhs</p>
                    <span className="text-[11px] text-primary">Onwards</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-1">
                      Holding Period
                    </span>
                    <p className="font-serif text-2xl text-on-surface font-semibold">3 – 7 Years</p>
                    <span className="text-[11px] text-on-surface-variant">Recommended</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-1">
                      Asset Type
                    </span>
                    <p className="font-body-md text-base text-on-surface font-medium">Residential Plots</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-1">
                      Legal Status
                    </span>
                    <p className="font-body-md text-base text-emerald-400 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      100% Verified
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/properties/airport-growth-belt"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary via-primary-fixed to-primary bg-[length:200%_auto] text-on-primary font-label-md font-bold text-xs md:text-sm tracking-widest uppercase flex items-center justify-between shadow-lg shadow-primary/20 hover:bg-[position:right_center] transition-all duration-500 relative overflow-hidden group/btn"
                >
                  <span>Unlock Full Investment Analysis</span>
                  <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover/btn:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
                <p className="text-center text-[11px] text-on-surface-variant/60 mt-3">
                  No credit card required. Free institutional investor access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── PUBLIC PROPERTIES GRID ── */}
      <section className="py-20 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="section-eyebrow block mb-2">Available Portfolio</span>
            <h2 className="section-title text-3xl md:text-4xl">Explore Curated Land Opportunities</h2>
          </div>
          <p className="text-xs text-on-surface-variant max-w-md">
            Showing properties verified by our legal and research teams. Click into any opportunity to view the detailed dimensional analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PUBLIC_PROPERTIES.map((property) => (
            <div
              key={property.id}
              className="glass-panel flex flex-col justify-between group transition-all duration-500 hover:border-primary/80 overflow-hidden bg-surface-container-low"
            >
              <div className="relative h-64 w-full overflow-hidden bg-surface-container">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <span className="absolute left-4 top-4 bg-primary text-on-primary font-label-md uppercase tracking-widest text-[10px] px-3 py-1 font-bold">
                  {property.badge}
                </span>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <div className="bg-black/85 px-3 py-1.5 border border-white/15 backdrop-blur-md">
                    <span className="font-label-md text-[9px] uppercase tracking-widest text-on-surface-variant block">
                      Horizon
                    </span>
                    <span className="font-bold text-emerald-400 font-mono">{property.horizon}</span>
                  </div>
                  <div className="bg-black/85 px-3 py-1.5 text-right border border-primary/40 backdrop-blur-md">
                    <span className="font-label-md text-[9px] uppercase tracking-widest text-primary block">
                      Crystal Stone Score
                    </span>
                    <span className="font-bold text-white font-mono text-sm">{property.score} / 100</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-on-surface group-hover:text-primary transition-colors leading-snug">
                    {property.title}
                  </h3>
                  <p className="text-xs text-primary flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {property.location}
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                    {property.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {property.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="bg-surface-container px-2.5 py-1 font-label-md text-[9px] uppercase tracking-wider text-on-surface-variant border border-outline-variant/30"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-outline-variant/20 pt-6">
                  <div>
                    <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant block">
                      Entry Price
                    </span>
                    <p className="font-serif text-2xl font-bold text-primary">
                      {property.price}{" "}
                      <span className="text-xs font-sans font-normal text-on-surface-variant">
                        {property.priceLabel}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/properties/${property.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-on-primary font-label-md uppercase tracking-widest text-xs luxury-button"
                  >
                    <span>View Analysis</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Score Explainer Banner */}
        <div className="mt-16 p-6 md:p-8 rounded-xl bg-surface-container border border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[24px]">analytics</span>
            </div>
            <div>
              <h4 className="font-serif text-lg text-on-surface">What is the Crystal Stone Score?</h4>
              <p className="text-xs text-on-surface-variant mt-0.5 max-w-xl">
                Every property is evaluated across 6 rigorous dimensions: <strong className="text-primary font-normal">Legal, Infrastructure, Growth, Pricing, Demand, and Risk</strong>. Our research team assigns an institutional score out of 100 so you can compare opportunities objectively.
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="shrink-0 text-xs text-primary font-label-md uppercase tracking-widest border-b border-primary pb-1 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Learn About Our Research</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
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
