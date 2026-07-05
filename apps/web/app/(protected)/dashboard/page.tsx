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
    badgeColor: "bg-gradient-to-r from-primary to-amber-500 text-on-primary font-bold shadow-md shadow-primary/20",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    isWishlisted: false,
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
    badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-400/40 font-semibold",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    isWishlisted: false,
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
    badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-semibold",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    isWishlisted: false,
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
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const nextState = !prev[id];
      toast.success(nextState ? "Added to your saved investment wishlist" : "Removed from wishlist");
      return { ...prev, [id]: nextState };
    });
  };

  const handleNavClick = (label: string) => {
    setActiveNav(label);
    if (label !== "Dashboard" && label !== "Investment Opportunities") {
      toast(`Viewing ${label} (Phase 1 Preview Module)`, { icon: "✨" });
    }
  };

  const scrollToOpportunities = () => {
    const el = document.getElementById("recommended-opportunities");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-on-surface selection:bg-primary selection:text-on-primary">
      {/* Sleek Sidebar Navigation */}
      <aside className="hidden w-64 flex-col border-r border-outline-variant/30 bg-surface-container-lowest lg:flex">
        {/* Brand Header */}
        <div className="flex h-20 items-center gap-3 border-b border-outline-variant/30 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 border border-primary/40 text-primary shadow-sm shadow-primary/10">
            <span className="material-symbols-outlined text-[24px]">diamond</span>
          </div>
          <div>
            <span className="block font-serif text-base font-bold tracking-tight text-on-surface">
              CRYSTAL STONE
            </span>
            <span className="block font-sans text-[10px] uppercase tracking-widest text-primary font-semibold">
              Private Portal
            </span>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 space-y-7 overflow-y-auto p-5">
          {/* Group 1: Command Centre */}
          <div>
            <p className="section-eyebrow mb-2.5 px-3 text-[10px]">Command Centre</p>
            <nav className="space-y-1">
              <button
                onClick={() => handleNavClick("Dashboard")}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 ${
                  activeNav === "Dashboard"
                    ? "bg-primary/15 font-semibold text-primary border border-primary/40 shadow-sm shadow-primary/5"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                Dashboard
              </button>
            </nav>
          </div>

          {/* Group 2: My Investments */}
          <div>
            <p className="section-eyebrow mb-2.5 px-3 text-[10px]">My Investments</p>
            <nav className="space-y-1">
              {[
                { label: "Properties", icon: "real_estate_agent" },
                { label: "Documents", icon: "description" },
                { label: "Transactions", icon: "receipt_long" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 ${
                    activeNav === item.label
                      ? "bg-primary/15 font-semibold text-primary border border-primary/40"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Group 3: Discover */}
          <div>
            <p className="section-eyebrow mb-2.5 px-3 text-[10px]">Discover</p>
            <nav className="space-y-1">
              {[
                { label: "Investment Opportunities", icon: "travel_explore" },
                { label: "Market Insights", icon: "trending_up" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 ${
                    activeNav === item.label
                      ? "bg-primary/15 font-semibold text-primary border border-primary/40"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Group 4: Services */}
          <div>
            <p className="section-eyebrow mb-2.5 px-3 text-[10px]">Services</p>
            <nav className="space-y-1">
              {[
                { label: "Consultation", icon: "support_agent" },
                { label: "Legal & Compliance", icon: "gavel" },
                { label: "Property Management", icon: "home_work" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 ${
                    activeNav === item.label
                      ? "bg-primary/15 font-semibold text-primary border border-primary/40"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Group 5: Reports & Analytics */}
          <div>
            <p className="section-eyebrow mb-2.5 px-3 text-[10px]">Reports & Analytics</p>
            <nav className="space-y-1">
              {[
                { label: "Performance", icon: "leaderboard" },
                { label: "Analytics & Reports", icon: "analytics" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 ${
                    activeNav === item.label
                      ? "bg-primary/15 font-semibold text-primary border border-primary/40"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* User Footer Card */}
        <div className="border-t border-outline-variant/30 p-4">
          <div className="flex items-center justify-between rounded-xl bg-surface-container/80 p-3 border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-600 text-xs font-bold text-on-primary shadow-sm">
                JK
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-semibold text-on-surface">Joseph Kiran</p>
                <p className="truncate text-[10px] text-primary font-medium">Premium Investor</p>
              </div>
            </div>
            <Link
              href="/"
              title="Return to home"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-highest hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-20 items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-xl md:text-2xl tracking-tight text-on-surface font-semibold">
              {activeNav === "Dashboard" && "Private Investor Command Centre"}
              {activeNav !== "Dashboard" && activeNav}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
                search
              </span>
              <input
                type="text"
                placeholder="Search by location, project or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 rounded-full border border-outline-variant/40 bg-surface-container py-2 pl-10 pr-4 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => toast("You have 3 new investment updates and document verifications.", { icon: "🔔" })}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/40 bg-surface-container text-on-surface-variant hover:border-primary hover:text-primary transition-all"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">
                3
              </span>
            </button>

            {/* Support/Message Icon */}
            <button
              onClick={() => toast("Connecting to your dedicated advisor inbox...", { icon: "💬" })}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/40 bg-surface-container text-on-surface-variant hover:border-primary hover:text-primary transition-all"
              title="Advisor Messages"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </button>

            {/* Mobile Profile Trigger */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-600 text-xs font-bold text-on-primary lg:hidden">
              JK
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10">
          {/* Welcome Hero Banner (Command Centre Vibe) */}
          <section className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high p-8 md:p-10 shadow-2xl">
            {/* Subtle Gold Glow Background Effect */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute right-1/4 bottom-0 h-48 w-72 rounded-full bg-amber-600/10 blur-2xl" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                Verified HNI Investor Account
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-on-surface">
                Welcome Back, Joseph
              </h2>
              <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                Smart land investments. Stronger tomorrow. Find your next high-growth land investment in North Bangalore with verified legal clearance and institutional alpha.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToOpportunities}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-amber-500 px-6 py-3 text-sm font-semibold text-on-primary shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Explore Investment Opportunities
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => toast("Opening property valuation & exit advisory mandate...", { icon: "🏢" })}
                  className="flex items-center gap-2 rounded-xl border border-outline-variant/50 bg-surface/50 px-5 py-3 text-sm font-medium text-on-surface hover:border-primary hover:text-primary transition-all backdrop-blur-sm"
                >
                  Sell My Property
                </button>
              </div>
            </div>
          </section>

          {/* Answer Q1: Your Portfolio – At a Glance */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-on-surface">
                  Your Portfolio – At a Glance
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Key performance metrics across your verified real estate holdings.
                </p>
              </div>
              <button
                onClick={() => handleNavClick("Properties")}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                View Full Portfolio
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Metric 1: Portfolio Value */}
              <div className="glass-panel relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                    Total Portfolio Value
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary border border-primary/30">
                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                  </div>
                </div>
                <p className="mt-4 font-serif text-3xl font-bold text-on-surface">₹2.48 Cr</p>
                <p className="mt-2 text-xs text-on-surface-variant">
                  Across <span className="text-on-surface font-medium">7 Properties</span>
                </p>
              </div>

              {/* Metric 2: Value Appreciation */}
              <div className="glass-panel relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                    Profit Since Purchase
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="material-symbols-outlined text-[20px]">trending_up</span>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <p className="font-serif text-3xl font-bold text-emerald-400">+18.6%</p>
                </div>
                <p className="mt-2 text-xs text-on-surface-variant">
                  <span className="text-emerald-400 font-semibold">₹3.87 Cr</span> Value Appreciation
                </p>
              </div>

              {/* Metric 3: Properties Owned */}
              <div className="glass-panel relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                    Properties Owned
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary border border-primary/30">
                    <span className="material-symbols-outlined text-[20px]">real_estate_agent</span>
                  </div>
                </div>
                <p className="mt-4 font-serif text-3xl font-bold text-on-surface">7</p>
                <p className="mt-2 text-xs text-on-surface-variant">
                  Across <span className="text-on-surface font-medium">3 Growth Cities</span>
                </p>
              </div>

              {/* Metric 4: Documents Status */}
              <div className="glass-panel relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                    Documents Status
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary border border-primary/30">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <p className="font-serif text-3xl font-bold text-on-surface">Verified</p>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    ✓
                  </span>
                </div>
                <p className="mt-2 text-xs text-on-surface-variant">
                  <span className="text-primary font-medium">100%</span> All Clear & Compliant
                </p>
              </div>
            </div>
          </section>

          {/* Answer Q2: Recommended Investment Opportunities (PRIMARY FOCUS) */}
          <section id="recommended-opportunities" className="space-y-6 pt-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-outline-variant/20 pb-4">
              <div>
                <span className="section-eyebrow text-[11px]">Curated For You</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-on-surface mt-1">
                  Recommended Investment Opportunities
                </h3>
                <p className="text-xs md:text-sm text-on-surface-variant mt-1">
                  Handpicked land opportunities in North Bangalore matching your investment profile and strategy.
                </p>
              </div>
              <button
                onClick={() => handleNavClick("Investment Opportunities")}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
              >
                View All Opportunities
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {RECOMMENDED_OPPORTUNITIES.map((opp) => (
                <div
                  key={opp.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-low transition-all duration-500 hover:-translate-y-1 hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Image Header & Badges */}
                  <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={opp.image}
                      alt={opp.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-black/30 to-transparent" />

                    {/* Top Left Badge */}
                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] tracking-wider uppercase backdrop-blur-md ${opp.badgeColor}`}
                    >
                      {opp.badge}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(opp.id, e)}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-on-surface hover:bg-black/80 hover:text-primary transition-all backdrop-blur-md border border-white/10"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${wishlist[opp.id] ? "text-primary fill-icon" : ""}`}>
                        favorite
                      </span>
                    </button>

                    {/* Bottom Floating Stats in Image */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                      <div className="rounded-lg bg-black/70 px-2.5 py-1 text-on-surface backdrop-blur-md border border-white/10">
                        <span className="text-on-surface-variant text-[10px] block">Expected Growth</span>
                        <span className="font-bold text-emerald-400">{opp.expectedGrowth}</span>
                      </div>
                      <div className="rounded-lg bg-black/70 px-2.5 py-1 text-right text-on-surface backdrop-blur-md border border-white/10">
                        <span className="text-on-surface-variant text-[10px] block">Investment Score</span>
                        <span className="font-bold text-primary">{opp.score}/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-6 space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-serif text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                        {opp.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
                        {opp.location}
                      </p>

                      {/* Specs Pill List */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {opp.specs.map((spec, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-surface-container px-2.5 py-1 text-[11px] font-medium text-on-surface-variant border border-outline-variant/30"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action Button Footer */}
                    <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4">
                      <div>
                        <span className="text-[10px] uppercase text-on-surface-variant block">Price</span>
                        <p className="font-serif text-xl font-bold text-primary">
                          {opp.price}{" "}
                          <span className="text-xs font-sans font-normal text-on-surface-variant">
                            {opp.priceLabel}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => toast.success(`Viewing dossier for ${opp.title}`)}
                        className="flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary hover:bg-primary hover:text-on-primary transition-all shadow-sm"
                      >
                        View Details
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why We Recommend These - Fundamentals Grid */}
            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-outline-variant/20 pb-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-on-surface">
                    Why We Recommend These
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Strong macro fundamentals driving long-term capital appreciation in North Bangalore.
                  </p>
                </div>
                <button
                  onClick={() => handleNavClick("Market Insights")}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  Read Full Market Report
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {MARKET_FUNDAMENTALS.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 rounded-xl p-3.5 hover:bg-surface-container/60 transition-colors border border-transparent hover:border-outline-variant/20"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/30">
                      <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-serif text-sm font-semibold text-on-surface">
                        {item.title}
                      </h5>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Answer Q3 & Q4: Action & Market Intelligence Grid */}
          <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 pt-4">
            {/* Left Column: Answer Q3 - Your Next Step */}
            <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/40 bg-surface-container-low p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <span className="section-eyebrow text-[11px]">Action Oriented</span>
                <h3 className="font-serif text-xl font-bold text-on-surface">
                  Your Next Step
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  We recommend scheduling an investment consultation or booking a private site visit before finalizing your property selection.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => toast.success("Opening VIP site visit scheduling portal...")}
                  className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-primary to-amber-500 p-4 text-sm font-semibold text-on-primary shadow-lg shadow-primary/15 hover:brightness-110 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                    <span>Book a Site Visit</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>

                <button
                  onClick={() => toast("Connecting to Senior Investment Advisor...")}
                  className="flex w-full items-center justify-between rounded-xl border border-outline-variant/50 bg-surface-container p-4 text-sm font-semibold text-on-surface hover:border-primary hover:text-primary transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px] text-primary">support_agent</span>
                    <span>Speak to Investment Advisor</span>
                  </div>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>

              {/* Trust Badges Footer */}
              <div className="grid grid-cols-2 gap-3 border-t border-outline-variant/20 pt-5 text-xs text-on-surface-variant sm:grid-cols-4">
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

            {/* Right Column: Answer Q4 - Latest Market Updates */}
            <div className="flex flex-col justify-between rounded-2xl border border-outline-variant/40 bg-surface-container-low p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-on-surface">
                    Latest Investment Updates
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Real-time developments impacting your North Bangalore portfolio.
                  </p>
                </div>
                <button
                  onClick={() => handleNavClick("Market Insights")}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  View All Updates
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              <div className="space-y-4 divide-y divide-outline-variant/15">
                {MARKET_UPDATES.map((update) => (
                  <div
                    key={update.id}
                    onClick={() => toast(`Reading brief: ${update.title}`)}
                    className="group flex items-start justify-between gap-4 pt-3.5 first:pt-0 cursor-pointer hover:bg-surface-container/40 p-2 rounded-lg transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-serif text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                        {update.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {update.summary}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-medium text-on-surface block">{update.date}</span>
                      <span className="text-[10px] text-primary">{update.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Answer Q5: Relationship Manager Footer */}
          <section className="rounded-2xl border border-primary/40 bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container p-6 md:p-8 shadow-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* Advisor Identity */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-600 text-lg font-bold text-on-primary shadow-lg">
                    PN
                  </div>
                  <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 border-2 border-surface-container text-[8px] font-bold text-white">
                    ✓
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                    Your Relationship Manager
                  </span>
                  <h3 className="font-serif text-xl font-bold text-on-surface">Priya Nair</h3>
                  <p className="text-xs text-on-surface-variant">Senior Investment Advisor</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-amber-400">
                    <span>★★★★★</span>
                    <span className="text-on-surface font-semibold">4.9</span>
                    <span className="text-on-surface-variant">(128 Reviews)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => toast("Initiating secure call to Priya Nair (+91 98765 43210)...", { icon: "📞" })}
                  className="flex items-center gap-2 rounded-xl border border-outline-variant/50 bg-surface px-4 py-2.5 text-xs font-semibold text-on-surface hover:border-primary hover:text-primary transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                  Call Priya
                </button>

                <button
                  onClick={() => toast("Opening WhatsApp conversation with Priya Nair...", { icon: "💬" })}
                  className="flex items-center gap-2 rounded-xl border border-outline-variant/50 bg-surface px-4 py-2.5 text-xs font-semibold text-on-surface hover:border-emerald-400 hover:text-emerald-400 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px] text-emerald-400">chat</span>
                  WhatsApp
                </button>

                <button
                  onClick={() => toast.success("Opening calendar to book a meeting with Priya Nair...")}
                  className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-on-primary hover:brightness-110 transition-all shadow-md shadow-primary/20"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  Schedule Meeting
                </button>
              </div>
            </div>
          </section>

          {/* Bottom Copyright & Legal Links */}
          <footer className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/20 pt-8 pb-4 text-xs text-on-surface-variant sm:flex-row">
            <p>© 2026 Crystal Stone Properties & Investments. All Rights Reserved.</p>
            <div className="flex flex-wrap gap-6">
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
        </main>
      </div>
    </div>
  );
}