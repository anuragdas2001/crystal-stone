"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export interface PropertyResearchTerminalProps {
  isUnlocked?: boolean;
  slug?: string;
  onUnlockRequest?: () => void;
}

// Radar Chart Data for Evaluation Framework
const RADAR_DATA = [
  { subject: "Legal Title", A: 100, fullMark: 100 },
  { subject: "Infrastructure", A: 95, fullMark: 100 },
  { subject: "Growth Outlook", A: 90, fullMark: 100 },
  { subject: "Demand", A: 92, fullMark: 100 },
  { subject: "Exit Liquidity", A: 88, fullMark: 100 },
  { subject: "Pricing Advantage", A: 94, fullMark: 100 },
];

// CAGR Wealth Projection Data
const WEALTH_DATA = [
  { year: "Year 0 (Today)", value: 40.0, avgValue: 40.0 },
  { year: "Year 1", value: 47.4, avgValue: 46.0 },
  { year: "Year 2", value: 56.2, avgValue: 52.9 },
  { year: "Year 3", value: 66.7, avgValue: 60.8 },
  { year: "Year 4", value: 79.1, avgValue: 69.9 },
  { year: "Year 5", value: 93.8, avgValue: 80.3 },
];

// Location Comparison Table Data
const COMPARISON_DATA = [
  { location: "Airport Growth Belt (This Property)", score: "92/100", cagr: "18.6%", priceSqFt: "₹3,333", risk: "Low", status: "Recommended" },
  { location: "Whitefield Extension", score: "81/100", cagr: "12.4%", priceSqFt: "₹6,800", risk: "Moderate", status: "Overheated" },
  { location: "Sarjapur Road Corridor", score: "84/100", cagr: "14.1%", priceSqFt: "₹7,200", risk: "Moderate", status: "Saturated" },
  { location: "Devanahalli Town", score: "87/100", cagr: "16.2%", priceSqFt: "₹4,500", risk: "Low-Mod", status: "High Growth" },
];

// Comparable Sales (Last 12 Months)
const COMPARABLE_SALES = [
  { name: "Prestige Gardenia Estate", location: "2.1 km away", priceSqFt: "₹6,750", date: "Jan 2026", status: "Verified Sale" },
  { name: "Sattva Antara Enclave", location: "3.4 km away", priceSqFt: "₹6,920", date: "Nov 2025", status: "Verified Sale" },
  { name: "Godrej Woodscape North", location: "4.0 km away", priceSqFt: "₹7,100", date: "Dec 2025", status: "Verified Sale" },
  { name: "Brigade Oasis Extension", location: "1.8 km away", priceSqFt: "₹6,400", date: "Feb 2026", status: "Verified Sale" },
];

// Market Intelligence Timeline
const TIMELINE_DATA = [
  { year: "2020", title: "Airport Terminal 2 Approved", desc: "Government sanctioned massive ₹5,000 Cr airport infrastructure expansion." },
  { year: "2022", title: "STRR Tender Awarded", desc: "Satellite Town Ring Road construction initiated to bypass core city traffic." },
  { year: "2023", title: "Metro Phase 2B Finalized", desc: "Blue Line airport connection confirmed with stations within 4 km of Rajanukunte." },
  { year: "2024", title: "KIADB Aerospace Park Phase 2", desc: "Over 40+ multinational aerospace and defence giants set up operational hubs." },
  { year: "2025", title: "Surge in Institutional Absorption", desc: "Land values appreciated by 19.4% YoY due to massive IT workforce migration." },
];

const PROPERTY_DATA_MAP: Record<string, {
  title: string;
  location: string;
  price: string;
  priceSqFt: string;
  score: number;
  cagr: string;
  image: string;
  badge: string;
}> = {
  "airport-growth-belt": {
    title: "Airport Growth Belt",
    location: "Rajanukunte • North Bengaluru Investment Corridor",
    price: "₹40.0 Lakhs",
    priceSqFt: "₹3,333 / sq.ft",
    score: 92,
    cagr: "18.6%",
    image: "/Rajanukunte_Premium_Layout.png",
    badge: "RECOMMENDED ALPHA",
  },
  "devanahalli-aero-city": {
    title: "Devanahalli Aero City Enclave",
    location: "Airport Growth Corridor, North Bengaluru",
    price: "₹64.0 Lakhs",
    priceSqFt: "₹5,333 / sq.ft",
    score: 91,
    cagr: "18.2%",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    badge: "CRYSTAL STONE PICK",
  },
  "yelahanka-green-county": {
    title: "Yelahanka Green County",
    location: "High Growth Residential Zone, Bengaluru",
    price: "₹56.0 Lakhs",
    priceSqFt: "₹4,666 / sq.ft",
    score: 88,
    cagr: "17.8%",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    badge: "HIGH POTENTIAL",
  },
  "hennur-luxury-layout": {
    title: "Hennur Luxury Layout",
    location: "Premium Residential Corridor, Bengaluru",
    price: "₹82.0 Lakhs",
    priceSqFt: "₹6,833 / sq.ft",
    score: 85,
    cagr: "16.9%",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    badge: "VERIFIED SANCTUARY",
  },
  "sarjapur-tech-corridor": {
    title: "Sarjapur Tech Corridor",
    location: "IT Growth Belt, East Bengaluru",
    price: "₹75.0 Lakhs",
    priceSqFt: "₹6,250 / sq.ft",
    score: 89,
    cagr: "17.5%",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    badge: "STRONG DEMAND",
  },
  "strr-logistics-park": {
    title: "STRR Industrial & Logistics Park",
    location: "Satellite Town Ring Road, Bengaluru",
    price: "₹1.2 Cr",
    priceSqFt: "₹2,400 / sq.ft",
    score: 90,
    cagr: "19.1%",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    badge: "INSTITUTIONAL GRADE",
  },
  "hoskote-biotech-hub": {
    title: "Hoskote Bio-Tech Hub",
    location: "Emerging Corridor, East Bengaluru",
    price: "₹45.0 Lakhs",
    priceSqFt: "₹3,750 / sq.ft",
    score: 87,
    cagr: "17.2%",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
    badge: "VALUE ENTRY",
  },
};

export default function PropertyResearchTerminal({
  isUnlocked = false,
  slug = "airport-growth-belt",
  onUnlockRequest,
}: PropertyResearchTerminalProps) {
  const propInfo = (PROPERTY_DATA_MAP[slug] || PROPERTY_DATA_MAP["airport-growth-belt"])!;
  const [activePhotoTab, setActivePhotoTab] = useState("Actual Site");
  const [activeGalleryTab, setActiveGalleryTab] = useState("All");
  const [simAmount, setSimAmount] = useState<number>(40); // 40 Lakhs
  const [simYears, setSimYears] = useState<number>(5); // 5 Years
  const [activeReport, setActiveReport] = useState<{ title: string; subtitle: string; pages: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const handleAction = (msg: string, requireAuth = false) => {
    if (requireAuth && !isUnlocked) {
      if (onUnlockRequest) {
        onUnlockRequest();
      } else {
        toast("Investor Sign-In Required to unlock this proprietary dossier.", { icon: "🔒" });
      }
      return;
    }
    toast.success(msg);
  };

  const openReportViewer = (title: string, subtitle: string, pages = 14) => {
    if (!isUnlocked) {
      if (onUnlockRequest) onUnlockRequest();
      else toast("Sign in to your Investor Account to view this legal document.", { icon: "🔒" });
      return;
    }
    setActiveReport({ title, subtitle, pages });
    setCurrentPage(1);
    toast.success(`Opening embedded DRM viewer: ${title}`);
  };

  // Calculate simulated returns based on 18.6% CAGR
  const calculateSimulatedReturn = () => {
    const cagr = 0.186;
    const futureVal = simAmount * Math.pow(1 + cagr, simYears);
    const profit = futureVal - simAmount;
    return {
      futureVal: futureVal.toFixed(1),
      profit: profit.toFixed(1),
      multiple: (futureVal / simAmount).toFixed(1) + "x"
    };
  };

  const simResult = calculateSimulatedReturn();

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary selection:text-on-primary">
      {/* ── 1. TOP BAR & NAVIGATION ANCHOR STRIP ── */}
      <div className={`sticky ${isUnlocked ? "top-0" : "top-20"} z-30 bg-surface-container-lowest/95 border-b border-outline-variant/30 backdrop-blur-md px-4 md:px-8 py-3 shadow-md transition-all`}>
        <div className="max-w-container-max mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-6 font-label-md text-[11px] uppercase tracking-widest whitespace-nowrap">
            <a href="#overview" className="hover:text-primary transition-colors text-primary font-bold">Overview</a>
            <a href="#verdict" className="hover:text-primary transition-colors text-on-surface-variant">Verdict</a>
            <a href="#wealth" className="hover:text-primary transition-colors text-on-surface-variant">Wealth Creation</a>
            <a href="#thesis" className="hover:text-primary transition-colors text-on-surface-variant">Thesis</a>
            <a href="#intelligence" className="hover:text-primary transition-colors text-on-surface-variant">Intelligence Centre</a>
            <a href="#diligence" className="hover:text-primary transition-colors text-on-surface-variant">Due Diligence</a>
            <a href="#location" className="hover:text-primary transition-colors text-on-surface-variant">Location &amp; Map</a>
            <a href="#comparables" className="hover:text-primary transition-colors text-on-surface-variant">Comps</a>
            <a href="#consultation" className="hover:text-primary transition-colors text-on-surface-variant">Consultation</a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-label-md text-[10px] uppercase tracking-widest rounded ${
              isUnlocked ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-primary/20 text-primary border border-primary/40"
            }`}>
              <span className="material-symbols-outlined text-[14px]">
                {isUnlocked ? "verified_user" : "lock"}
              </span>
              <span>{isUnlocked ? "Institutional Portal Mode" : "Public Preview Mode"}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-4 md:px-8 py-8 md:py-12 space-y-16">
        
        {/* ── 2. HERO & KEY INVESTMENT SNAPSHOT ── */}
        <section id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Property Visuals & Photo Tabs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Badges Strip */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-primary text-on-primary font-label-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                  {propInfo.badge}
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-label-md text-[10px] uppercase tracking-widest px-3 py-1 rounded">
                  A-KHATA CLEAR TITLE
                </span>
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 font-label-md text-[10px] uppercase tracking-widest px-3 py-1 rounded">
                  READY FOR REGISTRATION
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight leading-tight">
                {propInfo.title}
              </h1>
              <p className="flex items-center gap-2 text-primary text-sm md:text-base font-medium mt-1">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                <span>{propInfo.location}</span>
              </p>
            </div>

            {/* Main Visual Showcase */}
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/30 group shadow-2xl">
              <Image
                src={
                  activePhotoTab === "Drone View"
                    ? "https://images.unsplash.com/photo-1508873696983-2df529a3c882?auto=format&fit=crop&w=1200&q=80"
                    : activePhotoTab === "Entrance Road"
                    ? "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                    : activePhotoTab === "Infrastructure"
                    ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                    : propInfo.image
                }
                alt={activePhotoTab}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="font-label-md text-[10px] uppercase tracking-widest text-primary block">Active View</span>
                  <p className="font-serif text-lg font-semibold">{activePhotoTab} — Verified Inspection</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAction("Opening full high-resolution media gallery")}
                  className="px-4 py-2 bg-black/70 hover:bg-primary hover:text-on-primary border border-white/20 font-label-md text-[10px] uppercase tracking-widest rounded transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">photo_library</span>
                  <span>View All 21 Photos</span>
                </button>
              </div>
            </div>

            {/* Photo Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {["Actual Site", "Entrance Road", "Drone View", "Infrastructure", "Nearby Layout"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActivePhotoTab(tab)}
                  className={`px-4 py-2 rounded-lg font-label-md text-xs uppercase tracking-widest transition-all ${
                    activePhotoTab === tab
                      ? "bg-primary text-on-primary font-bold shadow-md shadow-primary/20"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-white border border-outline-variant/30"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Crystal Stone Verdict & Key Snapshot */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Card 1: Verdict & Confidence Breakdown */}
            <div id="verdict" className="glass-panel p-6 md:p-8 bg-surface-container-low border-primary/50 relative overflow-hidden shadow-xl">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-outline-variant/20">
                <div>
                  <span className="section-eyebrow text-[10px] block mb-1">Proprietary Evaluation</span>
                  <h3 className="font-serif text-2xl text-white font-normal">
                    Crystal Stone Verdict
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1 font-bold flex items-center gap-1">
                    <span>★★★★★ INSTITUTIONAL RECOMMENDATION</span>
                  </p>
                </div>
                <div className="flex items-baseline gap-1.5 bg-black/80 px-4 py-2.5 border border-primary/60 rounded-xl shrink-0 shadow-inner">
                  <span className="font-serif text-4xl font-bold text-primary">{propInfo.score}</span>
                  <span className="text-xs text-on-surface-variant font-mono">/100</span>
                </div>
              </div>

              {/* Confidence Breakdown Bars */}
              <div className="space-y-3 pt-6 text-xs">
                {[
                  { label: "Legal Title Verification", val: 96, color: "bg-emerald-400" },
                  { label: "Infrastructure Growth", val: 90, color: "bg-primary" },
                  { label: "Pricing Advantage", val: 94, color: "bg-emerald-400" },
                  { label: "End-User Demand", val: 93, color: "bg-primary" },
                  { label: "Exit Liquidity", val: 88, color: "bg-blue-400" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-on-surface font-medium">
                      <span>{item.label}</span>
                      <span className="font-mono text-primary font-bold">{item.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Key Investment Snapshot */}
            <div className="glass-panel p-6 md:p-8 bg-black/80 border border-primary/30 shadow-xl">
              <h4 className="font-label-md text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4 pb-2 border-b border-primary/20 flex items-center justify-between">
                <span>Key Investment Snapshot</span>
                <span className="material-symbols-outlined text-[18px]">assessment</span>
              </h4>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Plot Size</span>
                  <span className="font-mono text-base font-bold text-white">1,200 Sq.ft</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Entry Price</span>
                  <span className="font-mono text-base font-bold text-primary">{propInfo.price}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Price / Sq.ft</span>
                  <span className="font-mono text-base font-bold text-emerald-400">{propInfo.priceSqFt}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Bank Loan</span>
                  <span className="font-mono text-base font-bold text-white">Up to 70%</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Holding Horizon</span>
                  <span className="font-mono text-base font-bold text-white">3 – 7 Years</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase tracking-wider">Expected Return</span>
                  <span className="font-mono text-base font-bold text-emerald-400">2.2x – 2.5x</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant">Risk Classification: <strong className="text-emerald-400">Low to Moderate</strong></span>
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="px-4 py-2 bg-primary text-on-primary font-label-md text-[10px] uppercase tracking-widest font-bold rounded luxury-button"
                >
                  Consult Advisor
                </button>
              </div>
            </div>

          </div>

        </section>

        {/* ── 3. MIDDLE ROW: WHY WE RECOMMEND THIS & CAGR WEALTH CREATION ── */}
        <section id="wealth" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 6 Core Institutional Pillars */}
          <div className="lg:col-span-5 glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Institutional Conviction</span>
              <h3 className="font-serif text-2xl text-on-surface mb-4">
                Why We Recommend This
              </h3>
              <p className="text-xs text-on-surface-variant mb-6">
                Our research team selected this opportunity based on six undeniable market fundamentals:
              </p>

              <div className="space-y-4 text-xs">
                {[
                  { title: "12% Below Market Entry", desc: "Trading significantly below surrounding residential layout prices in Rajanukunte." },
                  { title: "Airport Growth Corridor", desc: "Direct beneficiary of Devanahalli Airport Terminal 2 & Aerospace Park expansion." },
                  { title: "Metro Expansion Nearby", desc: "Phase 2B Blue Line stations coming up within 4 km, ensuring rapid transport." },
                  { title: "Strong End-User Demand", desc: "High absorption from IT, Aerospace, and Defence sector professionals." },
                  { title: "Limited Plot Supply", desc: "Strict BMRDA zoning limits new residential layouts in this specific green belt." },
                  { title: "Clear Legal History", desc: "100% clean title verified through 30-year parent document audit by High Court counsel." },
                ].map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-black/40 border border-outline-variant/20 rounded">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-on-primary text-[10px] font-bold shrink-0 mt-0.5">✔</span>
                    <div>
                      <h4 className="font-semibold text-on-surface">{pillar.title}</h4>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-center text-[11px] text-primary font-mono">
              ★ INSTITUTIONAL ALPHA: HIGH CONFIDENCE RATING ★
            </div>
          </div>

          {/* Right: Potential Wealth Creation & CAGR Projection */}
          <div className="lg:col-span-7 glass-panel p-6 md:p-8 bg-surface-container-low border-primary/40 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <span className="section-eyebrow text-[10px] block mb-1">Financial Modeling</span>
                  <h3 className="font-serif text-2xl text-on-surface">
                    Potential Wealth Creation &amp; CAGR
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Projected land value appreciation based on historical corridor growth (18.6% 5Y CAGR).
                  </p>
                </div>
                {!isUnlocked && (
                  <span className="inline-flex items-center gap-1.5 bg-primary/20 text-primary border border-primary/40 px-3 py-1 font-label-md text-[10px] uppercase tracking-widest rounded shrink-0">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    <span>Investor Access Required</span>
                  </span>
                )}
              </div>

              {/* Chart Area (Blurred when locked) */}
              <div className="relative p-4 bg-black/60 border border-outline-variant/30 rounded-xl mb-6">
                <div className={`h-64 w-full ${!isUnlocked ? "filter blur-md select-none pointer-events-none opacity-40" : ""}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={WEALTH_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="year" stroke="#888" fontSize={11} />
                      <YAxis stroke="#888" fontSize={11} unit="L" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#111", borderColor: "#d4af37", borderRadius: "8px", fontSize: "12px" }}
                        formatter={(val) => [`₹${val} Lakhs`, "Projected Value"]}
                      />
                      <Line type="monotone" dataKey="value" stroke="#d4af37" strokeWidth={3} dot={{ r: 5, fill: "#d4af37" }} name="This Opportunity (18.6% CAGR)" />
                      <Line type="monotone" dataKey="avgValue" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: "#10b981" }} name="Area Average (14.9% CAGR)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Lock Overlay for Public Visitors */}
                {!isUnlocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/70 backdrop-blur-sm rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                    </div>
                    <h4 className="font-serif text-lg text-white font-semibold mb-1">
                      Unlock Wealth Creation &amp; CAGR Projection
                    </h4>
                    <p className="text-xs text-on-surface-variant max-w-md mb-4">
                      Sign in to your verified investor account to view full 5-year and 10-year financial models, sensitivity analysis, and tax-efficient realization strategies.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleAction("Redirecting to Investor Login...", true)}
                      className="px-6 py-3 bg-gradient-to-r from-primary via-primary-fixed to-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded shadow-lg shadow-primary/30"
                    >
                      Sign In To View Analysis
                    </button>
                  </div>
                )}
              </div>

              {/* Outperformance & Market Trend Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-surface-container border border-outline-variant/30 rounded">
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block">5-Year CAGR</span>
                  <span className="font-mono text-lg font-bold text-primary">{propInfo.cagr}</span>
                </div>
                <div className="p-3 bg-surface-container border border-outline-variant/30 rounded">
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block">Area Average</span>
                  <span className="font-mono text-lg font-bold text-on-surface">14.9%</span>
                </div>
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 block font-bold">Outperformance</span>
                  <span className="font-mono text-lg font-bold text-emerald-400">+3.7%</span>
                </div>
                <div className="p-3 bg-surface-container border border-outline-variant/30 rounded">
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block">Market Trend</span>
                  <span className="font-mono text-lg font-bold text-emerald-400">Bullish</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-[11px] text-on-surface-variant/70 italic">
              * Disclaimer: Historical appreciation is provided for market context only. Past performance does not guarantee future returns.
            </div>
          </div>

        </section>

        {/* ── 4. HOW THIS LOCATION COMPARES ── */}
        <section id="comparables" className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="section-eyebrow block mb-1 text-[10px]">Comparative Intelligence</span>
              <h3 className="font-serif text-2xl md:text-3xl text-on-surface font-normal">
                How This Location Compares
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Objective benchmark analysis against other prominent Bengaluru residential corridors.
              </p>
            </div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest">
              Quarterly Benchmark Q1 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs md:text-sm">
              <thead>
                <tr className="border-b border-outline-variant/40 bg-black/50 text-on-surface-variant font-label-md uppercase tracking-widest text-[11px]">
                  <th className="py-4 px-4">Location / Corridor</th>
                  <th className="py-4 px-4">Crystal Stone Score</th>
                  <th className="py-4 px-4">5Y CAGR</th>
                  <th className="py-4 px-4">Entry Price / Sq.ft</th>
                  <th className="py-4 px-4">Risk Level</th>
                  <th className="py-4 px-4 text-right">Market Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      idx === 0 ? "bg-primary/10 font-medium text-white border-l-4 border-primary" : "hover:bg-surface-container/40 text-on-surface-variant"
                    }`}
                  >
                    <td className="py-4 px-4 font-semibold text-on-surface flex items-center gap-2">
                      {idx === 0 && <span className="material-symbols-outlined text-primary text-[18px]">star</span>}
                      <span>{row.location}</span>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-primary">{row.score}</td>
                    <td className="py-4 px-4 font-mono text-emerald-400 font-bold">{row.cagr}</td>
                    <td className="py-4 px-4 font-mono">{row.priceSqFt}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-label-md uppercase tracking-wider ${
                        row.risk === "Low" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                      }`}>
                        {row.risk}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold">
                      <span className={idx === 0 ? "text-primary font-bold" : "text-on-surface-variant"}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 5. GROWTH DRIVERS & RESEARCH TEAM THESIS & EVALUATION FRAMEWORK ── */}
        <section id="thesis" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Growth Drivers (Renamed from Why This Opportunity) */}
          <div className="lg:col-span-4 glass-panel p-6 md:p-8 flex flex-col justify-between bg-surface-container-low border-primary/25">
            <div>
              <span className="section-eyebrow text-[10px] block mb-2">Macro Fundamentals</span>
              <h3 className="font-serif text-2xl text-on-surface mb-2">Growth Drivers</h3>
              <p className="text-xs text-on-surface-variant mb-6">
                This location meets key growth and investment parameters that drive long-term capital appreciation.
              </p>

              <div className="space-y-3.5">
                {[
                  { label: "Airport Expansion", stars: "★★★★★" },
                  { label: "Metro Phase 2B", stars: "★★★★★" },
                  { label: "STRR Connectivity", stars: "★★★★☆" },
                  { label: "Industrial Corridor", stars: "★★★★☆" },
                  { label: "Employment Growth", stars: "★★★★☆" },
                  { label: "Educational Institutions", stars: "★★★☆☆" },
                ].map((driver) => (
                  <div key={driver.label} className="flex items-center justify-between p-3 bg-black/40 border border-outline-variant/20 rounded hover:border-primary/40 transition-colors">
                    <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-medium">
                      {driver.label}
                    </span>
                    <span className="font-mono text-primary text-sm tracking-widest font-bold">
                      {driver.stars}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-[11px] text-on-surface-variant/70 italic">
              * Evaluated by Crystal Stone Infrastructure Intelligence team.
            </div>
          </div>

          {/* Research Team Thesis (Renamed from Investment Thesis) */}
          <div className="lg:col-span-4 glass-panel p-6 md:p-8 flex flex-col justify-between bg-surface-container-low border-primary/25 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="section-eyebrow text-[10px] block mb-2">Investment Thesis</span>
              <h3 className="font-serif text-2xl text-on-surface mb-4 leading-snug">
                Why Our Research Team Selected This Opportunity
              </h3>
              <div className="w-12 h-0.5 bg-primary mb-6" />

              <div className="space-y-4 text-xs md:text-sm text-on-surface-variant leading-relaxed font-light">
                <p>
                  North Bengaluru is transforming into a major economic hub driven by massive government infrastructure investments, airport expansion, and rapidly rising residential demand.
                </p>
                <p>
                  <strong className="text-on-surface font-medium">Kempegowda International Airport</strong> expansion is acting as a primary catalyst, attracting aerospace, tech, and logistics conglomerates to the immediate vicinity.
                </p>
                <p>
                  The <strong className="text-on-surface font-medium">STRR (Satellite Town Ring Road)</strong> and Peripheral Ring Road are drastically improving regional connectivity, creating a seamless bypass corridor that enhances land values across Rajanukunte and Devanahalli.
                </p>
                <p>
                  With limited supply of quality, legally clear land parcels in this specific belt, early investors stand to benefit from compounding capital appreciation over a 3 to 7 year horizon.
                </p>
              </div>
            </div>

            <div className="mt-8 p-3.5 bg-primary/10 border border-primary/30 rounded flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl shrink-0">workspace_premium</span>
              <p className="text-[11px] text-primary font-medium">
                Selected from over 40+ evaluated land parcels in North Bengaluru this quarter.
              </p>
            </div>
          </div>

          {/* Crystal Stone Evaluation Framework (Radar Chart + Supporting Ratings) */}
          <div className="lg:col-span-4 glass-panel p-6 md:p-8 flex flex-col justify-between bg-surface-container-low border-primary/25">
            <div>
              <span className="section-eyebrow text-[10px] block mb-2">Due Diligence Matrix</span>
              <h3 className="font-serif text-2xl text-on-surface mb-2">Evaluation Framework</h3>
              <p className="text-xs text-on-surface-variant mb-4">
                Dimensional ratings supported by institutional radar analysis.
              </p>

              {/* Radar Chart Supporting Ratings */}
              <div className="h-44 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={RADAR_DATA}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" stroke="#aaa" fontSize={10} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#444" fontSize={9} />
                    <Radar name="Score" dataKey="A" stroke="#d4af37" fill="#d4af37" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Explicit Ratings Summary */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-black/40 rounded border border-outline-variant/20">
                  <span className="font-label-md uppercase tracking-widest text-on-surface">Legal Title</span>
                  <span className="font-mono text-primary font-bold">★★★★★</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-black/40 rounded border border-outline-variant/20">
                  <span className="font-label-md uppercase tracking-widest text-on-surface">Infrastructure</span>
                  <span className="font-mono text-primary font-bold">★★★★★</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-black/40 rounded border border-outline-variant/20">
                  <span className="font-label-md uppercase tracking-widest text-on-surface">Growth Outlook</span>
                  <span className="font-mono text-primary font-bold">★★★★☆</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-black/40 rounded border border-outline-variant/20">
                  <span className="font-label-md uppercase tracking-widest text-on-surface">Demand</span>
                  <span className="font-mono text-primary font-bold">★★★★☆</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-emerald-950/40 rounded border border-emerald-500/40">
                  <span className="font-label-md uppercase tracking-widest text-emerald-400 font-bold">Risk Level</span>
                  <span className="bg-emerald-500 text-black font-label-md text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Low Risk</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-[10px] uppercase tracking-widest text-primary/80 font-mono">
                The radar chart supports concrete dimensional ratings.
              </span>
            </div>
          </div>

        </section>

        {/* ── 6. INVESTMENT INTELLIGENCE CENTRE & DUE DILIGENCE CENTRE ── */}
        <section id="intelligence" className="space-y-8">
          <div className="border-b border-outline-variant/20 pb-4">
            <span className="section-eyebrow block mb-1 text-[10px]">Deep Dive Analysis</span>
            <h2 className="font-serif text-3xl md:text-4xl text-on-surface">
              Investment Intelligence &amp; Due Diligence Centre
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Access comprehensive pricing models, infrastructure milestones, exit strategies, and verified legal certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1: Pricing Assessment */}
            <div className="glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between">
              <div>
                <span className="section-eyebrow text-[10px] block mb-1">Valuation Analysis</span>
                <h3 className="font-serif text-xl text-on-surface mb-4">Pricing Assessment</h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  Our analytical comparison against prevailing land transaction values in the Rajanukunte corridor.
                </p>

                <div className="p-6 bg-black/60 border border-primary/40 rounded-xl text-center my-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                  <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                    Pricing Advantage
                  </span>
                  <p className="font-serif text-4xl md:text-5xl font-bold text-emerald-400 tracking-tight my-2">
                    12% Below
                  </p>
                  <p className="font-label-md text-xs uppercase tracking-widest text-on-surface">
                    Surrounding Market Value
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => openReportViewer("Detailed Pricing Analysis Report", "Comprehensive valuation benchmark against 15 nearby residential layouts")}
                  className="w-full py-3 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded luxury-button flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">{isUnlocked ? "description" : "lock"}</span>
                  <span>{isUnlocked ? "View Detailed Pricing Analysis" : "Unlock Pricing Analysis"}</span>
                </button>
              </div>
            </div>

            {/* Box 2: Infrastructure Intelligence */}
            <div className="glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between">
              <div>
                <span className="section-eyebrow text-[10px] block mb-1">Development Matrix</span>
                <h3 className="font-serif text-xl text-on-surface mb-4">Infrastructure Intelligence</h3>
                <p className="text-xs text-on-surface-variant mb-4">
                  Key government and civic infrastructure catalysts driving land value appreciation:
                </p>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 bg-black/40 border border-outline-variant/20 rounded">
                    <span className="text-xs text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-primary">flight_takeoff</span>
                      Airport Terminal 2
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-label-md font-bold px-2 py-0.5 rounded uppercase">
                      Approved
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-black/40 border border-outline-variant/20 rounded">
                    <span className="text-xs text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-primary">train</span>
                      Metro Phase 2B
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-label-md font-bold px-2 py-0.5 rounded uppercase">
                      Construction
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-black/40 border border-outline-variant/20 rounded">
                    <span className="text-xs text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-primary">add_road</span>
                      STRR Ring Road
                    </span>
                    <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-label-md font-bold px-2 py-0.5 rounded uppercase">
                      Tender Awarded
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-black/40 border border-outline-variant/20 rounded">
                    <span className="text-xs text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-primary">factory</span>
                      Industrial Park
                    </span>
                    <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-label-md font-bold px-2 py-0.5 rounded uppercase">
                      Operational
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => openReportViewer("Infrastructure Intelligence Report", "Master civic master plan review & government notification records")}
                  className="w-full py-3 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded luxury-button flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">{isUnlocked ? "description" : "lock"}</span>
                  <span>{isUnlocked ? "View Infrastructure Report" : "Unlock Infrastructure Report"}</span>
                </button>
              </div>
            </div>

            {/* Box 3: Exit Strategy */}
            <div className="glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between relative overflow-hidden">
              <div>
                <span className="section-eyebrow text-[10px] block mb-1">Liquidity &amp; Realization</span>
                <h3 className="font-serif text-xl text-on-surface mb-4">Exit Strategy</h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  We design structured holding horizons to maximize tax efficiency and capital gain realization.
                </p>

                <div className="p-5 bg-black/50 border border-primary/40 rounded-xl text-center mb-6">
                  <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">
                    Recommended Holding Period
                  </span>
                  <p className="font-serif text-3xl font-bold text-primary my-1">
                    3 – 7 Years
                  </p>
                  <span className="text-[11px] text-on-surface-variant/80">
                    Optimal compounding window
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-label-md uppercase tracking-widest text-on-surface block text-[10px]">Likely Exit Buyers:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["IT Professionals", "NRIs", "Tier-1 Builders", "Rental Investors"].map((buyer, i) => (
                      <span key={i} className="bg-surface-container px-2.5 py-1 rounded text-[11px] border border-outline-variant/30 text-on-surface-variant">
                        {buyer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => openReportViewer("Strategic Exit & Realization Mandate", "Tax-efficient exit timeline and buyer liquidity network analysis")}
                  className="w-full py-3 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded luxury-button flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">{isUnlocked ? "description" : "lock"}</span>
                  <span>{isUnlocked ? "View Exit Strategy Report" : "Unlock Exit Strategy"}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Due Diligence Centre Pills */}
          <div id="diligence" className="glass-panel p-8 md:p-10 bg-black/80 border border-primary/40 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="section-eyebrow block mb-1 text-[10px]">30-Year Legal Audit</span>
                <h3 className="font-serif text-2xl text-white">Due Diligence Centre</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Click any verified legal certificate to inspect the in-platform dossier.
                </p>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>100% TITLE CLEARANCE VERIFIED</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Legal Opinion", subtitle: "Adv. Rajeshwari & Associates", icon: "gavel", pages: 14, locked: false },
                { title: "Encumbrance Certificate", subtitle: "30-Year EC Audit Clean", icon: "verified_user", pages: 8, locked: false },
                { title: "Ownership Verification", subtitle: "Parent Title Deeds Reviewed", icon: "assignment", pages: 12, locked: false },
                { title: "BMRDA Approvals", subtitle: "Sanctioned Master Plan", icon: "domain", pages: 6, locked: false },
                { title: "Layout Approval Plan", subtitle: "Survey & Demarcation Map", icon: "map", pages: 4, locked: false },
                { title: "Tax Records (Khata)", subtitle: "A-Khata Up to Date", icon: "receipt_long", pages: 5, locked: false },
                { title: "Survey Sketch", subtitle: "Tippan & Hissa Records", icon: "architecture", pages: 3, locked: false },
              ].map((doc, i) => (
                <div
                  key={i}
                  onClick={() => openReportViewer(doc.title, doc.subtitle, doc.pages)}
                  className="p-4 bg-surface-container-low border border-outline-variant/30 hover:border-primary/80 rounded-xl cursor-pointer transition-all group flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">{doc.icon}</span>
                    <span className="text-[10px] font-mono text-on-surface-variant bg-black/60 px-2 py-0.5 rounded">
                      {isUnlocked ? `${doc.pages} Pages` : "🔒 Locked"}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-white font-medium group-hover:text-primary transition-colors">{doc.title}</h4>
                    <p className="text-[11px] text-on-surface-variant/80 truncate mt-0.5">{doc.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. IN-PLATFORM EMBEDDED REPORT VIEWER (MODAL / DRAWER) ── */}
        {activeReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-200">
            <div
              className="relative w-full max-w-4xl h-[85vh] bg-surface-container-lowest border-2 border-primary rounded-2xl flex flex-col overflow-hidden shadow-2xl select-none"
              onContextMenu={(e) => { e.preventDefault(); toast.error("Right-click is disabled for document security."); }}
            >
              {/* Viewer Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-surface-container border-b border-outline-variant/30 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-primary/20 text-primary rounded-lg border border-primary/40">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                      <span>{activeReport.title}</span>
                      <span className="bg-primary text-on-primary font-mono text-[9px] px-2 py-0.5 rounded uppercase font-bold">DRM Protected</span>
                    </h3>
                    <p className="text-xs text-on-surface-variant">{activeReport.subtitle} • Reviewed by Adv. Rajeshwari &amp; Associates</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Print & Download Disabled Notice */}
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded">
                    <span className="material-symbols-outlined text-[14px]">block</span>
                    <span>Downloads &amp; Printing Disabled</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveReport(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
              </div>

              {/* Viewer Body with Simulated Pages and DRM Watermark */}
              <div className="relative flex-1 overflow-y-auto p-8 md:p-16 bg-[#1a1a1a] flex flex-col items-center justify-center font-serif text-on-surface select-none print:hidden">
                
                {/* Dynamic Translucent Security Watermark */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-15 select-none overflow-hidden rotate-[-25deg] z-10">
                  <div className="text-center space-y-16">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="whitespace-nowrap font-mono text-xl sm:text-2xl font-bold tracking-widest text-primary">
                        CRYSTAL STONE INVESTOR PORTAL • JOSEPH KIRAN • ID: CS-INV-8849 • {new Date().toISOString().split("T")[0]} • CONFIDENTIAL &amp; PROPRIETARY
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Document Page Paper */}
                <div className="relative z-20 w-full max-w-2xl bg-[#fdfaf2] text-[#1a1a1a] p-8 md:p-12 rounded shadow-2xl min-h-[500px] flex flex-col justify-between border border-[#e5dec9]">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b-2 border-[#1a1a1a] pb-4">
                      <div>
                        <span className="font-sans font-bold text-xs tracking-widest uppercase text-[#8b7322] block">High Court Advocate &amp; Legal Counsel</span>
                        <h4 className="font-serif text-xl font-bold">Adv. Rajeshwari &amp; Associates</h4>
                      </div>
                      <div className="text-right font-mono text-xs text-[#555]">
                        <div>Ref: CS/LEGAL/2026/884</div>
                        <div>Date: {new Date().toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="space-y-4 font-serif text-sm md:text-base leading-relaxed text-[#222]">
                      <h5 className="font-bold text-lg text-center underline uppercase tracking-wide my-4">
                        {activeReport.title} — Page {currentPage} of {activeReport.pages}
                      </h5>
                      <p>
                        This is to certify that we have conducted a comprehensive and rigorous legal title investigation for the schedule property comprising residential land parcels situated at Rajanukunte, North Bengaluru.
                      </p>
                      <p>
                        Our legal audit included an examination of parent deeds spanning over thirty (30) years, encumbrance certificates from the Sub-Registrar Office, mutation entries, Tippan records, and BMRDA conversion orders.
                      </p>
                      <p className="p-4 bg-[#f4ebd0] border-l-4 border-[#8b7322] font-sans text-xs text-[#333] italic font-semibold">
                        &quot;Upon detailed verification, we confirm that the title is absolute, marketable, and free from all encumbrances, liens, litigation, or statutory attachments. The layout conforms to all municipal zoning regulations.&quot;
                      </p>
                      <p>
                        {currentPage === 1
                          ? "This document is generated exclusively for registered HNI investor Joseph Kiran (ID: CS-INV-8849) for private evaluation purposes. Unauthorized reproduction, transmission, or dissemination is strictly prohibited under intellectual property laws."
                          : `Continued legal findings and survey demarcation analysis for Page ${currentPage}. All survey boundaries match exact municipal revenue records without discrepancy.`}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-[#ccc] flex items-center justify-between font-sans text-xs text-[#666]">
                    <span>Crystal Stone Proprietary Legal Dossier</span>
                    <span className="font-mono font-bold text-[#8b7322]">Page {currentPage} / {activeReport.pages}</span>
                  </div>
                </div>

              </div>

              {/* Viewer Footer & Pagination Controls */}
              <div className="flex items-center justify-between px-6 py-4 bg-surface-container border-t border-outline-variant/30 shrink-0">
                <div className="text-xs text-on-surface-variant font-mono">
                  <span>Security Status: </span>
                  <strong className="text-emerald-400">Encrypted Session • DRM Active</strong>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-4 py-2 bg-surface-container-highest hover:bg-primary hover:text-on-primary disabled:opacity-40 disabled:pointer-events-none font-label-md text-xs uppercase tracking-widest rounded transition-colors"
                  >
                    Previous Page
                  </button>
                  <span className="font-mono text-sm text-white font-bold">
                    {currentPage} / {activeReport.pages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage === activeReport.pages}
                    onClick={() => setCurrentPage((p) => Math.min(activeReport.pages, p + 1))}
                    className="px-4 py-2 bg-surface-container-highest hover:bg-primary hover:text-on-primary disabled:opacity-40 disabled:pointer-events-none font-label-md text-xs uppercase tracking-widest rounded transition-colors"
                  >
                    Next Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 8. LOCATION INTELLIGENCE MAP, COMPARABLE SALES, & SIMULATOR ── */}
        <section id="location" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Location Intelligence & Map Preview */}
          <div className="lg:col-span-7 glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Spatial Analysis</span>
              <h3 className="font-serif text-2xl text-on-surface mb-4">Location Intelligence</h3>
              <p className="text-xs text-on-surface-variant mb-6">
                Strategic positioning within the high-growth North Bengaluru Airport Corridor.
              </p>

              {/* Map Preview Box */}
              <div className="relative h-64 w-full bg-surface-container rounded-xl overflow-hidden border border-outline-variant/30 group mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                  alt="Location Map"
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg mb-2 animate-bounce">
                    <span className="material-symbols-outlined text-[24px]">location_on</span>
                  </div>
                  <span className="font-serif text-lg font-bold text-white">Rajanukunte Growth Belt</span>
                  <span className="text-xs font-mono text-primary bg-black/80 px-3 py-1 rounded mt-1">
                    18 km to Airport • 4 km to Metro Station
                  </span>
                </div>
              </div>

              {/* Distance Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-black/40 rounded border border-outline-variant/20">
                  <span className="text-[10px] uppercase text-on-surface-variant block">Airport T2</span>
                  <strong className="text-primary font-mono">18 mins (18 km)</strong>
                </div>
                <div className="p-3 bg-black/40 rounded border border-outline-variant/20">
                  <span className="text-[10px] uppercase text-on-surface-variant block">Metro Station</span>
                  <strong className="text-primary font-mono">8 mins (4 km)</strong>
                </div>
                <div className="p-3 bg-black/40 rounded border border-outline-variant/20">
                  <span className="text-[10px] uppercase text-on-surface-variant block">Manyata Tech Park</span>
                  <strong className="text-primary font-mono">25 mins (18 km)</strong>
                </div>
                <div className="p-3 bg-black/40 rounded border border-outline-variant/20">
                  <span className="text-[10px] uppercase text-on-surface-variant block">Hospitals &amp; Care</span>
                  <strong className="text-primary font-mono">10 mins (5 km)</strong>
                </div>
                <div className="p-3 bg-black/40 rounded border border-outline-variant/20">
                  <span className="text-[10px] uppercase text-on-surface-variant block">Stonehill School</span>
                  <strong className="text-primary font-mono">12 mins (7 km)</strong>
                </div>
                <div className="p-3 bg-black/40 rounded border border-outline-variant/20">
                  <span className="text-[10px] uppercase text-on-surface-variant block">KIADB Aerospace</span>
                  <strong className="text-primary font-mono">20 mins (15 km)</strong>
                </div>
              </div>
            </div>

            {/* Crystal Stone Seal */}
            <div className="mt-6 p-4 bg-primary/10 border border-primary/40 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                <div>
                  <h5 className="font-bold text-on-surface">Crystal Stone Institutional Seal</h5>
                  <p className="text-[11px] text-on-surface-variant">✔ 30-Yr Audit ✔ EC Checked ✔ Litigation Screened</p>
                </div>
              </div>
              <span className="font-mono font-bold text-primary text-xs uppercase">100% CLEAR</span>
            </div>
          </div>

          {/* Right: Comparable Sales (Saving ₹730/sq.ft) */}
          <div className="lg:col-span-5 glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-4">
                <div>
                  <span className="section-eyebrow text-[10px] block mb-1">Market Proof</span>
                  <h3 className="font-serif text-xl text-on-surface">Comparable Sales</h3>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] px-2.5 py-1 rounded font-bold">
                  SAVE ₹730 / SQ.FT
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">
                Recent verified transactions within 4 km of this layout over the last 12 months:
              </p>

              <div className="space-y-3">
                {COMPARABLE_SALES.map((comp, idx) => (
                  <div key={idx} className="p-3.5 bg-black/50 border border-outline-variant/20 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-semibold text-white">
                        {isUnlocked ? comp.name : <span className="filter blur-sm select-none opacity-80">{comp.name.toUpperCase()}</span>}
                      </h5>
                      <span className="text-[10px] text-on-surface-variant">{comp.location} • {comp.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-sm font-bold text-emerald-400 block">{comp.priceSqFt}</span>
                      <span className="text-[9px] text-primary uppercase font-mono">{comp.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 p-3 bg-emerald-950/30 border border-emerald-500/30 rounded text-center text-xs text-emerald-400 font-medium">
              You enter at ₹3,333 / sq.ft — an immediate ₹730/sq.ft valuation discount!
            </div>
          </div>

        </section>

        {/* ── 9. INVESTMENT SCENARIO SIMULATOR & RISKS ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Investment Scenario Simulator */}
          <div className="lg:col-span-7 glass-panel p-6 md:p-8 bg-surface-container-low border-primary/40 flex flex-col justify-between">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Interactive Financial Modeling</span>
              <h3 className="font-serif text-2xl text-on-surface mb-2">Investment Scenario Simulator</h3>
              <p className="text-xs text-on-surface-variant mb-6">
                Simulate your potential wealth creation based on historical area outperformance (18.6% CAGR).
              </p>

              <div className="space-y-6">
                {/* Slider 1: Investment Amount */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface font-medium">Investment Amount</span>
                    <span className="font-mono text-primary font-bold text-base">₹{simAmount} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={200}
                    step={5}
                    value={simAmount}
                    onChange={(e) => setSimAmount(Number(e.target.value))}
                    className="w-full accent-primary bg-surface-container h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                    <span>₹20 Lakhs</span>
                    <span>₹100 Lakhs</span>
                    <span>₹200 Lakhs</span>
                  </div>
                </div>

                {/* Slider 2: Holding Horizon */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface font-medium">Holding Horizon</span>
                    <span className="font-mono text-primary font-bold text-base">{simYears} Years</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {[3, 5, 7, 10].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setSimYears(yr)}
                        className={`py-2 rounded font-label-md text-xs uppercase tracking-widest transition-all ${
                          simYears === yr
                            ? "bg-primary text-on-primary font-bold shadow-md"
                            : "bg-black/50 text-on-surface-variant hover:text-white border border-outline-variant/30"
                        }`}
                      >
                        {yr} Years
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulator Results Output Card */}
                <div className="p-6 bg-black/80 border-2 border-primary/60 rounded-xl grid grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Projected Value</span>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-primary font-mono">₹{simResult.futureVal}L</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Net Profit</span>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">+₹{simResult.profit}L</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Total Multiple</span>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-white font-mono">{simResult.multiple}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-on-surface-variant/70 italic text-center">
              * Based on compounding model. Taxes and registration costs excluded.
            </div>
          </div>

          {/* Right: Things To Know (Honest Appraisal of Risks) */}
          <div className="lg:col-span-5 glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Institutional Transparency</span>
              <h3 className="font-serif text-2xl text-on-surface mb-4">Things To Know</h3>
              <p className="text-xs text-on-surface-variant mb-6">
                We believe in complete transparency. Here are the key risks and considerations for this asset class:
              </p>

              <div className="space-y-3.5 text-xs">
                <div className="p-3 bg-black/40 border border-outline-variant/20 rounded">
                  <h4 className="font-semibold text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-400 text-[16px]">schedule</span>
                    <span>Long Holding Horizon</span>
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Land requires a minimum 3 to 7 year holding window to capture full infrastructure appreciation cycles.
                  </p>
                </div>

                <div className="p-3 bg-black/40 border border-outline-variant/20 rounded">
                  <h4 className="font-semibold text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-400 text-[16px]">water_drop</span>
                    <span>Low Immediate Rental Yield</span>
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Unlike commercial buildings, vacant residential land generates zero monthly rental income during the holding period.
                  </p>
                </div>

                <div className="p-3 bg-black/40 border border-outline-variant/20 rounded">
                  <h4 className="font-semibold text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-400 text-[16px]">construction</span>
                    <span>Infrastructure Timeline Dependency</span>
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Value spikes are correlated with civic completion dates of Metro Phase 2B and STRR ring road.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/20 text-center text-xs text-primary font-medium">
              Our legal and advisory team mitigates these through strict curation.
            </div>
          </div>

        </section>

        {/* ── 10. MARKET INTELLIGENCE TIMELINE ── */}
        <section className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/30 space-y-8">
          <div>
            <span className="section-eyebrow block mb-1 text-[10px]">Corridor Catalyst History</span>
            <h3 className="font-serif text-2xl md:text-3xl text-on-surface">
              Market Intelligence Timeline
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              How macroeconomic milestones have driven land appreciation in North Bengaluru from 2020 to present.
            </p>
          </div>

          <div className="relative border-l-2 border-primary/40 ml-4 pl-6 space-y-8">
            {TIMELINE_DATA.map((item, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-primary border-2 border-surface-container group-hover:scale-125 transition-transform" />
                <div className="space-y-1">
                  <span className="font-mono text-xs text-primary font-bold">{item.year}</span>
                  <h4 className="font-serif text-base font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 11. PROJECT GALLERY (ALL PHOTOS UNLOCKED IN TERMINAL MODE) ── */}
        <section className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="section-eyebrow block mb-1 text-[10px]">Visual Due Diligence</span>
              <h3 className="font-serif text-2xl md:text-3xl text-on-surface">
                Project Gallery
              </h3>
            </div>
            <div className="flex gap-4">
              {["All", "Layout Plan", "Site Development", "Surroundings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveGalleryTab(tab)}
                  className={`font-label-md text-xs uppercase tracking-widest pb-1 transition-colors ${activeGalleryTab === tab ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-white"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Main Boulevard", img: "/Rajanukunte_Premium_Layout.png" },
              { title: "40ft Asphalt Road", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
              { title: "Landscaped Parks", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
              { title: "Drone Aerial View", img: "https://images.unsplash.com/photo-1508873696983-2df529a3c882?auto=format&fit=crop&w=800&q=80" },
            ].map((photo, i) => (
              <div key={i} className="relative h-64 rounded-xl overflow-hidden group border border-outline-variant/20">
                <Image
                  src={photo.img}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-label-md uppercase tracking-widest text-white font-bold">
                  {photo.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 12. FINAL CTA & DEDICATED ADVISOR BANNER ── */}
        <section id="consultation" className="glass-panel p-8 md:p-12 border-primary/60 bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left: Advisor Profile */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center bg-primary text-2xl font-bold text-on-primary rounded-2xl shadow-lg shadow-primary/20">
                  PN
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center bg-emerald-500 border-2 border-surface-container text-xs font-bold text-white rounded-full">
                  ✓
                </span>
              </div>
              <div className="space-y-1">
                <span className="section-eyebrow text-[10px] block text-primary font-bold">
                  Your Dedicated Relationship Manager
                </span>
                <h3 className="font-serif text-3xl text-on-surface font-semibold">Priya Nair</h3>
                <p className="text-sm text-on-surface-variant">Senior Investment Advisor • North Bengaluru Portfolio</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-primary font-mono">
                  <span>★★★★★</span>
                  <span className="text-white font-bold">4.9 ★</span>
                  <span className="text-on-surface-variant">(127+ HNI Investors Assisted)</span>
                </div>
              </div>
            </div>

            {/* Right: CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => toast("Initiating secure phone call with Priya Nair (+91 98765 43210)...", { icon: "📞" })}
                className="w-full sm:w-auto px-6 py-4 border border-outline-variant/60 bg-surface text-on-surface font-label-md uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-all font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                <span>Speak To Advisor</span>
              </button>

              <button
                type="button"
                onClick={() => setIsConsultationModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary via-primary-fixed to-primary text-on-primary font-label-md uppercase tracking-widest text-xs font-bold rounded-xl shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                <span>{isUnlocked ? "Schedule Private Consultation" : "Unlock Analysis & Schedule Consultation"}</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* ── CONSULTATION BOOKING MODAL ── */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border-2 border-primary rounded-2xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsConsultationModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-white"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="text-center space-y-2">
              <span className="section-eyebrow text-[10px] block text-primary font-bold">1-on-1 Advisory Session</span>
              <h3 className="font-serif text-2xl text-white font-bold">Book Private Consultation</h3>
              <p className="text-xs text-on-surface-variant">
                Schedule a 30-minute confidential discussion with Senior Investment Advisor Priya Nair.
              </p>
            </div>

            <div className="space-y-4 text-xs bg-black/50 p-4 rounded-xl border border-outline-variant/20">
              <h4 className="font-semibold text-primary uppercase tracking-wider font-label-md text-[10px]">Discussion Agenda:</h4>
              <ul className="space-y-2 text-on-surface">
                <li className="flex items-center gap-2">✔ <span>Detailed 3–7 Year Exit Strategy &amp; Tax Planning</span></li>
                <li className="flex items-center gap-2">✔ <span>Custom Financing &amp; Bank Loan Structuring (Up to 70%)</span></li>
                <li className="flex items-center gap-2">✔ <span>In-person verification of original High Court legal opinions</span></li>
                <li className="flex items-center gap-2">✔ <span>VIP Site Visit scheduling with chauffeur service</span></li>
              </ul>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsConsultationModalOpen(false);
                toast.success("Consultation request confirmed! Priya Nair will reach out within 2 hours.", { duration: 5000 });
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-on-surface-variant mb-1 font-medium">Preferred Date &amp; Time</label>
                <input
                  type="datetime-local"
                  required
                  defaultValue="2026-07-10T11:00"
                  className="w-full bg-surface-container border border-outline-variant/40 rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-on-surface-variant mb-1 font-medium">Special Notes / Questions (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="E.g., Interested in corner plot or NRI repatriation details..."
                  className="w-full bg-surface-container border border-outline-variant/40 rounded px-3 py-2 text-white focus:border-primary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all"
              >
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
