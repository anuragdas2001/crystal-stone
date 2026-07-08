"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const PROTECTED_OPPORTUNITIES = [
  {
    id: "airport-growth-belt",
    title: "Airport Growth Belt",
    location: "Rajanukunte • North Bengaluru Investment Corridor",
    specs: ["1,200 Sq.ft Plots", "BMRDA Approved", "A-Khata Clear Title"],
    price: "₹40.0 Lakhs",
    priceLabel: "Onwards",
    expectedGrowth: "18.6% CAGR",
    growthLabel: "5-Year CAGR",
    score: 92,
    badge: "RECOMMENDED ALPHA",
    image: "/Rajanukunte_Premium_Layout.png",
    featured: true,
  },
  {
    id: "devanahalli-aero-city",
    title: "Devanahalli Aero City Enclave",
    location: "Airport Growth Corridor, Bangalore",
    specs: ["1,200 Sq.ft Plots", "BMRDA Approved", "70% Bank Loan"],
    price: "₹64.0 Lakhs",
    priceLabel: "Onwards",
    expectedGrowth: "18% - 22%",
    growthLabel: "Expected Growth",
    score: 91,
    badge: "CRYSTAL STONE PICK",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    id: "yelahanka-green-county",
    title: "Yelahanka Green County",
    location: "High Growth Residential Zone, Bangalore",
    specs: ["1,200 Sq.ft Plots", "A-Khata Property", "Ready to Register"],
    price: "₹56.0 Lakhs",
    priceLabel: "Onwards",
    expectedGrowth: "16% - 20%",
    growthLabel: "Expected Growth",
    score: 88,
    badge: "HIGH POTENTIAL",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    id: "hennur-luxury-layout",
    title: "Hennur Luxury Layout",
    location: "Premium Residential Corridor, Bangalore",
    specs: ["1,200 Sq.ft Plots", "RERA Registered", "Wide Asphalt Roads"],
    price: "₹82.0 Lakhs",
    priceLabel: "Onwards",
    expectedGrowth: "17% - 21%",
    growthLabel: "Expected Growth",
    score: 85,
    badge: "VERIFIED SANCTUARY",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
];

export default function ProtectedPropertiesView() {
  const [filter, setFilter] = useState("All");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setWishlist((prev) => {
      const next = !prev[id];
      toast.success(next ? "Added to your portfolio watchlist" : "Removed from watchlist");
      return { ...prev, [id]: next };
    });
  };

  const filteredOpps = PROTECTED_OPPORTUNITIES.filter((opp) => {
    if (filter === "Recommended") return opp.score >= 90;
    if (filter === "High Growth") return opp.expectedGrowth.includes("18");
    if (filter === "Watchlist") return wishlist[opp.id];
    return true;
  });

  return (
    <div className="p-6 md:p-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6">
        <div>
          <span className="section-eyebrow block mb-1 text-[10px] text-primary font-bold">Institutional Portfolio</span>
          <h2 className="font-serif text-3xl md:text-4xl text-on-surface font-normal">
            Investment Portfolio &amp; Opportunities
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Browse our curated selection of legally clear land investment opportunities in North Bengaluru.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {["All", "Recommended", "High Growth", "Watchlist"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-label-md text-xs uppercase tracking-widest transition-all ${
                filter === tab
                  ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                  : "bg-surface-container text-on-surface-variant hover:text-white border border-outline-variant/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Opportunity Banner (Airport Growth Belt) */}
      {filter === "All" && (
        <div className="glass-panel p-8 md:p-10 bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low border-2 border-primary/60 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-primary text-on-primary font-label-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                  ★ FEATURED ALPHA
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-label-md text-[10px] uppercase tracking-widest px-3 py-1 rounded">
                  100% CLEAR TITLE
                </span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl text-white font-semibold">
                Airport Growth Belt — Rajanukunte
              </h3>

              <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                Our #1 institutional recommendation this quarter. Trading at 12% below surrounding market prices with an expected 5-Year CAGR of 18.6%. Directly benefiting from Airport Terminal 2 and Metro Phase 2B.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2 border-y border-outline-variant/20 py-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase block">Entry Price</span>
                  <strong className="text-primary text-base">₹40.0 Lakhs</strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase block">5-Year CAGR</span>
                  <strong className="text-emerald-400 text-base">18.6%</strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase block">Crystal Stone Score</span>
                  <strong className="text-white text-base">92 / 100</strong>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/properties/airport-growth-belt"
                  className="px-8 py-4 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded-xl luxury-button shadow-lg shadow-primary/30 flex items-center gap-2"
                >
                  <span>Launch Research Terminal</span>
                  <span className="material-symbols-outlined text-[18px]">launch</span>
                </Link>
                <span className="text-xs text-primary font-mono hidden sm:inline">
                  🔒 DRM Legal Dossier Ready
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 sm:h-72 relative rounded-xl overflow-hidden border border-outline-variant/30 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Rajanukunte_Premium_Layout.png"
                alt="Airport Growth Belt"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-label-md uppercase tracking-widest text-[10px] text-primary">Master Layout</span>
                <span className="font-mono">1,200 Sq.ft Plots</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredOpps.map((opp) => (
          <div
            key={opp.id}
            className="glass-panel flex flex-col justify-between group transition-all duration-500 hover:border-primary/80 overflow-hidden shadow-xl"
          >
            {/* Image Header */}
            <Link href={`/properties/${opp.id}`} className="relative h-64 w-full overflow-hidden bg-surface-container block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={opp.image}
                alt={opp.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Badge */}
              <span className="absolute left-4 top-4 bg-primary text-on-primary font-label-md uppercase tracking-widest text-[10px] px-3 py-1 font-bold rounded">
                {opp.badge}
              </span>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={(e) => toggleWishlist(opp.id, e)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-black/60 text-on-surface hover:bg-primary hover:text-on-primary transition-all border border-white/10 z-10 rounded-full"
              >
                <span className={`material-symbols-outlined text-[18px] ${wishlist[opp.id] ? "text-primary fill-icon" : ""}`}>
                  favorite
                </span>
              </button>

              {/* Bottom Stats in Image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <div className="bg-black/80 px-3 py-1.5 border border-white/10 rounded">
                  <span className="font-label-md text-[9px] uppercase tracking-widest text-on-surface-variant block">{opp.growthLabel}</span>
                  <span className="font-bold text-emerald-400 font-mono">{opp.expectedGrowth}</span>
                </div>
                <div className="bg-black/80 px-3 py-1.5 text-right border border-white/10 rounded">
                  <span className="font-label-md text-[9px] uppercase tracking-widest text-primary block">Crystal Stone Score</span>
                  <span className="font-bold text-white font-mono">{opp.score}/100</span>
                </div>
              </div>
            </Link>

            {/* Card Content */}
            <div className="flex flex-1 flex-col justify-between p-6 space-y-6">
              <div className="space-y-4">
                <Link href={`/properties/${opp.id}`}>
                  <h4 className="font-serif text-xl text-on-surface group-hover:text-primary transition-colors leading-snug font-semibold">
                    {opp.title}
                  </h4>
                </Link>
                <p className="section-body text-xs flex items-center gap-1.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  {opp.location}
                </p>

                {/* Specs Pill List */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {opp.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="bg-surface-container px-3 py-1 font-label-md text-[10px] uppercase tracking-wider text-on-surface-variant border border-outline-variant/30 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action Button Footer */}
              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-6">
                <div>
                  <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant block">Price</span>
                  <p className="font-display-xl text-2xl font-bold text-primary font-mono">
                    {opp.price}{" "}
                    <span className="text-xs font-sans font-normal text-on-surface-variant">
                      {opp.priceLabel}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/properties/${opp.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-label-md uppercase tracking-widest text-xs luxury-button font-bold rounded"
                >
                  <span>Open Terminal</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Our Research Team Curates These */}
      <div className="glass-panel p-8 md:p-10 bg-surface-container-low border-primary/30 space-y-6">
        <div className="border-b border-outline-variant/20 pb-4">
          <span className="section-eyebrow block mb-1 text-[10px] text-primary">Due Diligence Standards</span>
          <h3 className="font-serif text-2xl text-on-surface font-normal">
            Why Our Research Team Curates These
          </h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Every property listed in your Command Centre undergoes our mandatory 6-pillar verification:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {[
            { title: "30-Year Title Search", desc: "Parent deeds, Tippan records, and high court counsel sign-off." },
            { title: "BMRDA & Town Planning", desc: "100% sanctioned layout plans with clean conversion orders." },
            { title: "Corridor Alpha", desc: "Located within 20 mins of airport terminal and upcoming metro line." },
            { title: "Below Market Value", desc: "Negotiated entry pricing giving our investors immediate equity." },
            { title: "Bank Loan Approved", desc: "Up to 70% financing approved by leading nationalized banks." },
            { title: "Dedicated Exit Support", desc: "In-house resale and realization network when your horizon matures." },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-black/40 border border-outline-variant/20 rounded-xl space-y-1">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>{item.title}</span>
              </h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
