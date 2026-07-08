"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

// Recommended Land Opportunities (North Bangalore Focus)
const RECOMMENDED_OPPORTUNITIES = [
  {
    id: "opp-1",
    title: "Devanahalli Aero City Enclave",
    location: "Airport Growth Corridor, Bangalore",
    specs: ["1,200 Sq.ft Plots", "BMRDA Approved", "70% Bank Loan"],
    price: "₹64 Lakhs",
    priceLabel: "Onwards",
    expectedGrowth: "18% - 22%",
    growthLabel: "Expected Growth",
    score: 91,
    badge: "CRYSTAL STONE PICK",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "opp-2",
    title: "Yelahanka Green County",
    location: "High Growth Residential Zone, Bangalore",
    specs: ["1,200 Sq.ft Plots", "A Katha Property", "Ready to Register"],
    price: "₹56 Lakhs",
    priceLabel: "Onwards",
    expectedGrowth: "16% - 20%",
    growthLabel: "Expected Growth",
    score: 88,
    badge: "HIGH POTENTIAL",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "opp-3",
    title: "Hennur Luxury Layout",
    location: "Premium Residential Corridor, Bangalore",
    specs: ["1,200 Sq.ft Plots", "RERA Registered", "Wide Asphalt Roads"],
    price: "₹82 Lakhs",
    priceLabel: "Onwards",
    expectedGrowth: "17% - 21%",
    growthLabel: "Expected Growth",
    score: 85,
    badge: "VERIFIED SANCTUARY",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
];

// Why We Recommend These Fundamentals
const MARKET_FUNDAMENTALS = [
  {
    icon: "flight_takeoff",
    title: "Airport Expansion",
    description: "Devanahalli Airport expansion to boost regional real estate demand & connectivity.",
  },
  {
    icon: "train",
    title: "Metro Connectivity",
    description: "Metro Phase 2B & 3 connecting key growth corridors directly to tech hubs.",
  },
  {
    icon: "factory",
    title: "Industrial Growth",
    description: "KIADB & Aerospace parks driving massive job creation and capital influx.",
  },
  {
    icon: "add_road",
    title: "Infrastructure Projects",
    description: "Widening arterial roads, STRR & Satellite Town Ring Road completion.",
  },
  {
    icon: "apartment",
    title: "High Rental Demand",
    description: "Strong housing demand from IT, Aerospace & Defence sector professionals.",
  },
  {
    icon: "verified_user",
    title: "100% Title Verification",
    description: "Every plot undergoes rigorous 30-year legal audit by in-house real estate counsel.",
  },
];

// Latest Market Updates
const MARKET_UPDATES = [
  {
    id: "upd-1",
    title: "Metro Phase 2B Progress Update",
    summary: "Work on the North Bangalore airport corridor is running 3 months ahead of schedule.",
    date: "24 May 2024",
    time: "2h ago",
  },
  {
    id: "upd-2",
    title: "Devanahalli Airport Expansion Approved",
    summary: "Terminal 3 expansion will increase passenger capacity to 60M annually by 2030.",
    date: "22 May 2024",
    time: "1d ago",
  },
  {
    id: "upd-3",
    title: "KIADB Announces New Industrial Park",
    summary: "1,000-acre Aerospace & Defence park coming up near Hoskote growth corridor.",
    date: "20 May 2024",
    time: "2d ago",
  },
  {
    id: "upd-4",
    title: "STRR Phase 1 Nears Completion",
    summary: "Satellite Town Ring Road will drastically improve connectivity across North Bangalore.",
    date: "18 May 2024",
    time: "3d ago",
  },
];

export default function RealEstateDashboardPage() {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setWishlist((prev) => {
      const nextState = !prev[id];
      toast.success(nextState ? "Added to your saved investment wishlist" : "Removed from wishlist");
      return { ...prev, [id]: nextState };
    });
  };

  const scrollToOpportunities = () => {
    const el = document.getElementById("recommended-opportunities");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-12">
      {/* Welcome Hero Banner */}
      <section className="glass-panel p-8 md:p-12 relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 font-label-md text-xs text-primary uppercase tracking-widest border border-primary/30 bg-primary/10 px-3 py-1">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Verified HNI Investor Account
          </span>
          
          <h2 className="font-display-xl text-3xl md:text-5xl text-on-surface leading-tight font-serif">
            Welcome Back, Joseph
          </h2>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed font-light">
            Smart land investments. Stronger tomorrow. Find your next high-growth land investment in North Bangalore with verified legal clearance and institutional alpha.
          </p>
          
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={scrollToOpportunities}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button text-xs font-bold shadow-lg shadow-primary/20"
            >
              Explore Investment Opportunities
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={() => toast("Opening property valuation & exit advisory mandate...", { icon: "🏢" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary text-primary font-label-md uppercase tracking-widest hover:bg-primary/10 transition-colors bg-transparent text-xs font-bold"
            >
              Sell My Property
            </button>
          </div>
        </div>
      </section>

      {/* Your Portfolio – At a Glance */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div>
            <span className="section-eyebrow block mb-1 text-[10px]">Performance tracking</span>
            <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-serif">
              Your Portfolio – At a Glance
            </h3>
            <p className="section-body text-sm mt-1 text-on-surface-variant">
              Key performance metrics across your verified real estate holdings.
            </p>
          </div>
          <Link
            href="/properties"
            className="flex items-center gap-1 font-label-md text-xs text-primary uppercase tracking-widest hover:underline"
          >
            View Full Portfolio
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Metric 1: Portfolio Value */}
          <div className="glass-panel p-6 md:p-8 transition-all duration-300 hover:border-primary/60 group">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
                Total Portfolio Value
              </span>
              <div className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary border border-primary/30">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              </div>
            </div>
            <p className="mt-6 font-display-xl text-3xl font-bold text-on-surface font-mono">₹2.48 Cr</p>
            <p className="mt-2 section-body text-xs text-on-surface-variant">
              Across <span className="text-on-surface font-semibold">7 Properties</span>
            </p>
          </div>

          {/* Metric 2: Value Appreciation */}
          <div className="glass-panel p-6 md:p-8 transition-all duration-300 hover:border-primary/60 group">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
                Profit Since Purchase
              </span>
              <div className="flex h-10 w-10 items-center justify-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="material-symbols-outlined text-[20px]">trending_up</span>
              </div>
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              <p className="font-display-xl text-3xl font-bold text-emerald-400 font-mono">+18.6%</p>
            </div>
            <p className="mt-2 section-body text-xs text-on-surface-variant">
              <span className="text-emerald-400 font-semibold font-mono">₹3.87 Cr</span> Value Appreciation
            </p>
          </div>

          {/* Metric 3: Properties Owned */}
          <div className="glass-panel p-6 md:p-8 transition-all duration-300 hover:border-primary/60 group">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
                Properties Owned
              </span>
              <div className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary border border-primary/30">
                <span className="material-symbols-outlined text-[20px]">real_estate_agent</span>
              </div>
            </div>
            <p className="mt-6 font-display-xl text-3xl font-bold text-on-surface font-mono">7</p>
            <p className="mt-2 section-body text-xs text-on-surface-variant">
              Across <span className="text-on-surface font-semibold">3 Growth Cities</span>
            </p>
          </div>

          {/* Metric 4: Documents Status */}
          <div className="glass-panel p-6 md:p-8 transition-all duration-300 hover:border-primary/60 group">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-[11px] uppercase tracking-widest text-on-surface-variant">
                Documents Status
              </span>
              <div className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary border border-primary/30">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <p className="font-display-xl text-3xl font-bold text-on-surface font-serif">Verified</p>
              <span className="flex h-5 w-5 items-center justify-center bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                ✓
              </span>
            </div>
            <p className="mt-2 section-body text-xs text-on-surface-variant">
              <span className="text-primary font-semibold font-mono">100%</span> All Clear & Compliant
            </p>
          </div>
        </div>
      </section>

      {/* Recommended Investment Opportunities */}
      <section id="recommended-opportunities" className="space-y-8 pt-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-outline-variant/20 pb-4">
          <div>
            <span className="section-eyebrow block mb-1 text-[10px]">Curated For You</span>
            <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-serif">
              Recommended Investment Opportunities
            </h3>
            <p className="section-body text-sm mt-1 text-on-surface-variant">
              Institutional-grade land parcels in high-growth corridors with 100% legal verification.
            </p>
          </div>
          <Link
            href="/properties"
            className="flex items-center gap-1 font-label-md text-xs text-primary uppercase tracking-widest hover:underline self-start sm:self-auto"
          >
            View All Opportunities
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RECOMMENDED_OPPORTUNITIES.map((opp) => {
            const slug = opp.id === "opp-1" ? "airport-growth-belt" : opp.id;
            return (
              <div
                key={opp.id}
                className="glass-panel flex flex-col justify-between group transition-all duration-500 hover:border-primary/80 overflow-hidden"
              >
                {/* Image Header */}
                <Link href={`/properties/${slug}`} className="relative h-64 w-full overflow-hidden bg-surface-container block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={opp.image}
                    alt={opp.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Badge */}
                  <span className="absolute left-4 top-4 bg-primary text-on-primary font-label-md uppercase tracking-widest text-[10px] px-3 py-1 font-bold">
                    {opp.badge}
                  </span>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(opp.id, e)}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-black/60 text-on-surface hover:bg-primary hover:text-on-primary transition-all border border-white/10 z-10"
                  >
                    <span className={`material-symbols-outlined text-[18px] ${wishlist[opp.id] ? "text-primary fill-icon" : ""}`}>
                      favorite
                    </span>
                  </button>

                  {/* Bottom Stats in Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <div className="bg-black/80 px-3 py-1.5 border border-white/10">
                      <span className="font-label-md text-[9px] uppercase tracking-widest text-on-surface-variant block">Expected Growth</span>
                      <span className="font-bold text-emerald-400 font-mono">{opp.expectedGrowth}</span>
                    </div>
                    <div className="bg-black/80 px-3 py-1.5 text-right border border-white/10">
                      <span className="font-label-md text-[9px] uppercase tracking-widest text-primary block">Crystal Stone Score</span>
                      <span className="font-bold text-white font-mono">{opp.score}/100</span>
                    </div>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-6 space-y-6">
                  <div className="space-y-4">
                    <Link href={`/properties/${slug}`}>
                      <h4 className="font-headline-lg text-xl text-on-surface group-hover:text-primary transition-colors leading-snug font-serif font-semibold">
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
                          className="bg-surface-container px-3 py-1 font-label-md text-[10px] uppercase tracking-wider text-on-surface-variant border border-outline-variant/30"
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
                      href={`/properties/${slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-label-md uppercase tracking-widest text-xs luxury-button font-bold"
                    >
                      View Details
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why We Recommend These - Fundamentals Grid */}
        <div className="glass-panel p-8 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="section-eyebrow block mb-1 text-[10px]">Macro Intelligence</span>
              <h4 className="font-headline-lg text-xl md:text-2xl text-on-surface font-serif">
                Why We Recommend These
              </h4>
              <p className="section-body text-sm mt-1 text-on-surface-variant">
                Strong macro fundamentals driving long-term capital appreciation in North Bangalore.
              </p>
            </div>
            <Link
              href="/dashboard/insights"
              className="font-label-md text-xs text-primary uppercase tracking-widest hover:underline flex items-center gap-1"
            >
              Read Full Market Report
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MARKET_FUNDAMENTALS.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-4 hover:bg-surface-container/60 transition-colors border border-outline-variant/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary/10 text-primary border border-primary/30">
                  <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                </div>
                <div className="space-y-1">
                  <h5 className="font-headline-lg text-base font-semibold text-on-surface">
                    {item.title}
                  </h5>
                  <p className="section-body text-xs leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action & Market Intelligence Grid */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2 pt-4">
        {/* Left Column: Your Next Step */}
        <div className="glass-panel p-8 md:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-3">
            <span className="section-eyebrow block text-[10px]">Action Oriented</span>
            <h3 className="font-headline-lg text-2xl text-on-surface font-serif">
              Your Next Step
            </h3>
            <p className="section-body text-sm leading-relaxed text-on-surface-variant">
              We recommend scheduling an investment consultation or booking a private site visit before finalizing your property selection.
            </p>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => toast.success("Opening VIP site visit scheduling portal...")}
              className="flex w-full items-center justify-between p-5 bg-primary text-on-primary font-label-md uppercase tracking-widest text-xs luxury-button font-bold"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                <span>Book a Site Visit</span>
              </div>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              type="button"
              onClick={() => toast("Connecting to Senior Investment Advisor...")}
              className="flex w-full items-center justify-between p-5 border border-primary text-primary font-label-md uppercase tracking-widest text-xs hover:bg-primary/10 transition-colors bg-transparent font-bold"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                <span>Speak to Investment Advisor</span>
              </div>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Trust Badges Footer */}
          <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/20 pt-6 font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant sm:grid-cols-4">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
              <span>Legally Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
              <span>Due Diligence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-amber-400">trending_up</span>
              <span>Growth Corridors</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-400">workspace_premium</span>
              <span>Expert Curated</span>
            </div>
          </div>
        </div>

        {/* Right Column: Latest Market Updates */}
        <div className="glass-panel p-8 md:p-10 flex flex-col justify-between space-y-8">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
            <div>
              <span className="section-eyebrow block mb-1 text-[10px]">Intelligence Feed</span>
              <h3 className="font-headline-lg text-2xl text-on-surface font-serif">
                Latest Investment Updates
              </h3>
              <p className="section-body text-sm mt-1 text-on-surface-variant">
                Real-time developments impacting your North Bangalore portfolio.
              </p>
            </div>
            <Link
              href="/dashboard/insights"
              className="font-label-md text-xs text-primary uppercase tracking-widest hover:underline flex items-center gap-1"
            >
              View All Updates
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="space-y-6 divide-y divide-outline-variant/20">
            {MARKET_UPDATES.map((update) => (
              <div
                key={update.id}
                onClick={() => toast(`Reading brief: ${update.title}`)}
                className="group flex items-start justify-between gap-4 pt-4 first:pt-0 cursor-pointer hover:bg-surface-container/40 p-3 transition-colors"
              >
                <div className="space-y-1.5">
                  <h4 className="font-headline-lg text-base text-on-surface group-hover:text-primary transition-colors font-semibold">
                    {update.title}
                  </h4>
                  <p className="section-body text-xs leading-relaxed text-on-surface-variant">
                    {update.summary}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-label-md text-[10px] text-on-surface block font-mono">{update.date}</span>
                  <span className="font-label-md text-[9px] text-primary uppercase tracking-widest font-mono">{update.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relationship Manager Footer */}
      <section className="glass-panel p-8 md:p-10 border-primary/50 bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Advisor Identity */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center bg-primary text-lg font-bold text-on-primary">
                PN
              </div>
              <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center bg-emerald-500 border-2 border-surface-container text-[10px] font-bold text-white">
                ✓
              </span>
            </div>
            <div className="space-y-1">
              <span className="section-eyebrow text-[10px] block">
                Your Relationship Manager
              </span>
              <h3 className="font-headline-lg text-2xl text-on-surface font-serif">Priya Nair</h3>
              <p className="section-body text-xs text-on-surface-variant">Senior Investment Advisor</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-primary font-mono">
                <span>★★★★★</span>
                <span className="text-on-surface font-semibold">4.9</span>
                <span className="section-body text-xs text-on-surface-variant">(128 Reviews)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => toast("Initiating secure call to Priya Nair (+91 98765 43210)...", { icon: "📞" })}
              className="flex items-center gap-2 px-6 py-3 border border-outline-variant/50 bg-surface text-on-surface font-label-md uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-all font-bold"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">call</span>
              Call Priya
            </button>

            <button
              type="button"
              onClick={() => toast("Opening WhatsApp conversation with Priya Nair...", { icon: "💬" })}
              className="flex items-center gap-2 px-6 py-3 border border-outline-variant/50 bg-surface text-on-surface font-label-md uppercase tracking-widest text-xs hover:border-emerald-400 hover:text-emerald-400 transition-all font-bold"
            >
              <span className="material-symbols-outlined text-[18px] text-emerald-400">chat</span>
              WhatsApp
            </button>

            <button
              type="button"
              onClick={() => toast.success("Opening calendar to book a meeting with Priya Nair...")}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-label-md uppercase tracking-widest text-xs luxury-button font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
              Schedule Meeting
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Copyright & Legal Links */}
      <footer className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/20 pt-8 pb-4 section-body text-xs sm:flex-row text-on-surface-variant">
        <p>© 2026 Crystal Stone Properties & Investments. All Rights Reserved.</p>
        <div className="flex flex-wrap gap-6 font-label-md uppercase tracking-widest text-[11px]">
          <a href="#" onClick={(e) => { e.preventDefault(); toast("Viewing Privacy Policy"); }} className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); toast("Viewing Terms & Conditions"); }} className="hover:text-primary transition-colors">
            Terms & Conditions
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); toast("Viewing Disclaimer"); }} className="hover:text-primary transition-colors">
            Disclaimer
          </a>
        </div>
      </footer>
    </div>
  );
}