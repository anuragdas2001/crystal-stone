"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export interface PropertyResearchTerminalProps {
  isUnlocked?: boolean;
  slug?: string;
  onUnlockRequest?: () => void;
}

// Radar Chart Data for Evaluation Framework (Percentage-based scoring)
const RADAR_DATA = [
  { subject: "Legal Title", A: 96, fullMark: 100 },
  { subject: "Infrastructure", A: 90, fullMark: 100 },
  { subject: "Growth Outlook", A: 93, fullMark: 100 },
  { subject: "Demand", A: 92, fullMark: 100 },
  { subject: "Exit Liquidity", A: 88, fullMark: 100 },
  { subject: "Pricing Advantage", A: 94, fullMark: 100 },
];

// Wealth Projection Scenarios
const PROJECTION_SCENARIOS: Record<string, {
  title: string;
  subtitle: string;
  cagrLabel: string;
  data: Array<{ year: string; value: number; avgValue: number }>;
}> = {
  "Capital Appreciation": {
    title: "WEALTH PROJECTION™",
    subtitle: "Illustrative projection based on 18.6% Alpha CAGR vs 12% Area Benchmark",
    cagrLabel: "18.6% Alpha CAGR",
    data: [
      { year: "Year 0 (Today)", value: 40.0, avgValue: 40.0 },
      { year: "Year 1", value: 47.4, avgValue: 44.8 },
      { year: "Year 2", value: 56.2, avgValue: 50.2 },
      { year: "Year 3", value: 66.7, avgValue: 56.2 },
      { year: "Year 4", value: 79.1, avgValue: 62.9 },
      { year: "Year 5", value: 93.8, avgValue: 70.5 },
    ],
  },
  "Balanced": {
    title: "WEALTH PROJECTION™",
    subtitle: "Illustrative projection based on 14.5% blended capital & infrastructure appreciation",
    cagrLabel: "14.5% Blended CAGR",
    data: [
      { year: "Year 0 (Today)", value: 40.0, avgValue: 40.0 },
      { year: "Year 1", value: 45.8, avgValue: 44.0 },
      { year: "Year 2", value: 52.4, avgValue: 48.4 },
      { year: "Year 3", value: 60.0, avgValue: 53.2 },
      { year: "Year 4", value: 68.7, avgValue: 58.5 },
      { year: "Year 5", value: 78.7, avgValue: 64.4 },
    ],
  },
  "Rental Yield": {
    title: "WEALTH PROJECTION™",
    subtitle: "Illustrative projection based on commercial ground lease & build-to-suit yield model",
    cagrLabel: "12.0% Compounded Yield + Value",
    data: [
      { year: "Year 0 (Today)", value: 40.0, avgValue: 40.0 },
      { year: "Year 1", value: 44.8, avgValue: 43.6 },
      { year: "Year 2", value: 50.2, avgValue: 47.5 },
      { year: "Year 3", value: 56.2, avgValue: 51.8 },
      { year: "Year 4", value: 62.9, avgValue: 56.5 },
      { year: "Year 5", value: 70.5, avgValue: 61.6 },
    ],
  },
};

// Location Comparison Table Data
const COMPARISON_DATA = [
  { location: "Airport Growth Belt (This Property)", score: "92%", cagr: "18.6%", priceSqFt: "₹3,333", risk: "Low", status: "Recommended" },
  { location: "Whitefield Extension", score: "81%", cagr: "12.4%", priceSqFt: "₹6,800", risk: "Moderate", status: "Overheated" },
  { location: "Sarjapur Road Corridor", score: "84%", cagr: "14.1%", priceSqFt: "₹7,200", risk: "Moderate", status: "Saturated" },
  { location: "Devanahalli Town", score: "87%", cagr: "16.2%", priceSqFt: "₹4,500", risk: "Low-Mod", status: "High Growth" },
];

// Comparable Sales (Last 12 Months)
const COMPARABLE_SALES = [
  { name: "Prestige Gardenia Estate", location: "2.1 km away", priceSqFt: "₹6,750", date: "Jan 2026", status: "Verified Sale" },
  { name: "Sattva Antara Enclave", location: "2.8 km away", priceSqFt: "₹6,920", date: "Nov 2025", status: "Verified Sale" },
  { name: "Century Eden Enclave", location: "3.2 km away", priceSqFt: "₹6,810", date: "Dec 2025", status: "Verified Sale" },
  { name: "Airport Growth Belt (Our Price)", location: "Immediate Layout", priceSqFt: "₹6,120", date: "Current Offering", status: "Institutional Price" },
];

// Location Intelligence Impact Items
const LOCATION_IMPACT_ITEMS = [
  { level: "HIGH IMPACT", title: "Kempegowda International Airport", dist: "18 km ~ 20 min", icon: "flight_takeoff", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  { level: "HIGH IMPACT", title: "Upcoming Metro (Blue Line)", dist: "4 km ~ 8 min", icon: "train", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  { level: "HIGH IMPACT", title: "Manyata Tech Park", dist: "18 km ~ 25 min", icon: "business_center", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  { level: "MODERATE IMPACT", title: "Columbia Asia Hospital", dist: "3 km ~ 7 min", icon: "local_hospital", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  { level: "MODERATE IMPACT", title: "Delhi Public School", dist: "2.2 km ~ 6 min", icon: "school", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  { level: "LOW IMPACT", title: "Oasis Public School", dist: "2.5 km ~ 7 min", icon: "school", color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
];

// Market Intelligence Timeline
const TIMELINE_DATA = [
  { year: "2020", title: "Airport Terminal 2 Approved", desc: "Government sanctioned massive ₹5,000 Cr airport infrastructure expansion, initiating regional appreciation." },
  { year: "2022", title: "STRR Tender Awarded", desc: "Satellite Town Ring Road construction initiated to bypass core city traffic and link aerospace hubs." },
  { year: "2023", title: "Metro Phase 2B Finalized", desc: "Blue Line airport connection confirmed with stations scheduled within 4 km of Rajanukunte corridor." },
  { year: "2024", title: "KIADB Aerospace Park Phase 2", desc: "Over 40+ multinational aerospace, defence, and semiconductor giants set up active operational campuses." },
  { year: "2025", title: "Surge in Institutional Absorption", desc: "Land values appreciated by 19.4% YoY due to massive IT workforce migration and institutional capital influx." },
];

// Property Data Map
const PROPERTY_DATA_MAP: Record<string, {
  title: string;
  corridor: string;
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
    corridor: "NORTH BANGALORE",
    location: "Rajanukunte • North Bengaluru Investment Corridor",
    price: "₹40 Lakhs",
    priceSqFt: "₹3,333 / sq.ft",
    score: 92,
    cagr: "18.6%",
    image: "/Rajanukunte_Premium_Layout.png",
    badge: "RECOMMENDED ALPHA",
  },
  "devanahalli-aero-city": {
    title: "Devanahalli Aero City Enclave",
    corridor: "NORTH BANGALORE",
    location: "Airport Growth Corridor, North Bengaluru",
    price: "₹64 Lakhs",
    priceSqFt: "₹5,333 / sq.ft",
    score: 91,
    cagr: "18.2%",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    badge: "CRYSTAL STONE PICK",
  },
  "yelahanka-green-county": {
    title: "Yelahanka Green County",
    corridor: "NORTH BANGALORE",
    location: "High Growth Residential Zone, Bengaluru",
    price: "₹56 Lakhs",
    priceSqFt: "₹4,666 / sq.ft",
    score: 88,
    cagr: "17.8%",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    badge: "HIGH POTENTIAL",
  },
  "hennur-luxury-layout": {
    title: "Hennur Luxury Layout",
    corridor: "EAST-NORTH BANGALORE",
    location: "Premium Residential Corridor, Bengaluru",
    price: "₹82 Lakhs",
    priceSqFt: "₹6,833 / sq.ft",
    score: 85,
    cagr: "16.9%",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    badge: "VERIFIED SANCTUARY",
  },
  "sarjapur-tech-corridor": {
    title: "Sarjapur Tech Corridor",
    corridor: "EAST BANGALORE",
    location: "IT Growth Belt, East Bengaluru",
    price: "₹75 Lakhs",
    priceSqFt: "₹6,250 / sq.ft",
    score: 89,
    cagr: "17.5%",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    badge: "STRONG DEMAND",
  },
  "strr-logistics-park": {
    title: "STRR Industrial & Logistics Park",
    corridor: "STRR CORRIDOR",
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
    corridor: "EAST BANGALORE",
    location: "Emerging Corridor, East Bengaluru",
    price: "₹45 Lakhs",
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
  
  // Interactive State
  const [activePhotoCategory, setActivePhotoCategory] = useState("Aerial Site Assessment");
  const [activeGalleryTab, setActiveGalleryTab] = useState("All");
  const [activeProjectionTab, setActiveProjectionTab] = useState<"Capital Appreciation" | "Balanced" | "Rental Yield">("Capital Appreciation");
  const [simAmount, setSimAmount] = useState<number>(40); // ₹40,00,000 default
  const [simYears, setSimYears] = useState<number>(5); // 5 Years default
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

  // Calculate simulated returns based on selected holding period
  const calculateSimulatedReturn = () => {
    const cagr = 0.186; // 18.6% compounding
    const futureVal = simAmount * Math.pow(1 + cagr, simYears);
    const profit = futureVal - simAmount;
    const percentage = Math.round((profit / simAmount) * 100);
    return {
      futureVal: futureVal.toFixed(1),
      profit: profit.toFixed(1),
      percentage: `${percentage}%`,
      multiple: (futureVal / simAmount).toFixed(1) + "x"
    };
  };

  const simResult = calculateSimulatedReturn();
  const currentScenario = (PROJECTION_SCENARIOS[activeProjectionTab] || PROJECTION_SCENARIOS["Capital Appreciation"])!;

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary selection:text-on-primary font-sans">
      
      {/* ── 0. INSTITUTIONAL HEADER & STICKY TOP NAVIGATION TABS ── */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/30 py-3 px-4 md:px-8">
        <div className="max-w-container-max mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-base md:text-lg text-white font-bold tracking-tight">
              CRYSTAL STONE <span className="text-primary font-normal text-xs uppercase tracking-widest hidden sm:inline">| Private Investment Research Terminal</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-label-md text-[10px] uppercase tracking-widest rounded-full ${
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

      {/* Navigation Anchor Strip */}
      <div className={`sticky ${isUnlocked ? "top-0" : "top-20"} z-30 bg-surface-container-lowest/95 border-b border-outline-variant/30 backdrop-blur-md px-4 md:px-8 py-3 shadow-md transition-all`}>
        <div className="max-w-container-max mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-6 font-label-md text-[11px] uppercase tracking-widest whitespace-nowrap">
            <a href="#overview" className="hover:text-primary transition-colors text-primary font-bold">Overview</a>
            <a href="#verdict" className="hover:text-primary transition-colors text-on-surface-variant">Verdict</a>
            <a href="#diligence-visual" className="hover:text-primary transition-colors text-on-surface-variant">Due Diligence</a>
            <a href="#thesis" className="hover:text-primary transition-colors text-on-surface-variant">Thesis</a>
            <a href="#location" className="hover:text-primary transition-colors text-on-surface-variant">Location &amp; Map</a>
            <a href="#comparables" className="hover:text-primary transition-colors text-on-surface-variant">Comparables</a>
            <a href="#wealth" className="hover:text-primary transition-colors text-on-surface-variant">Wealth Creation</a>
            <a href="#intelligence" className="hover:text-primary transition-colors text-on-surface-variant">Intelligence Centre</a>
            <a href="#consultation" className="hover:text-primary transition-colors text-on-surface-variant">Consultation</a>
          </nav>
          <span className="text-xs font-mono text-on-surface-variant hidden lg:inline">Ref ID: CS-ALPHA-8849</span>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-4 md:px-8 py-8 md:py-12 space-y-16">
        
        {/* ── 1. HERO SECTION & DOCKED YOUR INVESTMENT SNAPSHOT ── */}
        <section id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Title, Corridor, Trust Badges, Investment Verdict Summary */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <a
                href="/opportunities"
                className="inline-flex items-center gap-1.5 text-xs font-label-md uppercase tracking-widest text-primary hover:underline mb-4"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Back to Opportunities</span>
              </a>

              <div className="flex items-center gap-3 mb-2">
                <span className="bg-primary/20 text-primary border border-primary/40 font-label-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                  {propInfo.corridor}
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>100% PRE-VETTED ASSET</span>
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight leading-tight">
                {propInfo.title}
              </h1>
              <p className="flex items-center gap-2 text-on-surface-variant text-sm md:text-base font-medium mt-1">
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <span>{propInfo.location}</span>
              </p>
            </div>

            {/* Golden Trust Badges Strip */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-black/60 border border-primary/40 rounded-lg text-xs font-medium text-white shadow-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                <span>BMRDA Approved</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 bg-black/60 border border-primary/40 rounded-lg text-xs font-medium text-white shadow-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">assignment</span>
                <span>A-Khata Title</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 bg-black/60 border border-primary/40 rounded-lg text-xs font-medium text-white shadow-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">fact_check</span>
                <span>Vetted by Crystal Stone</span>
              </div>
            </div>

            {/* Investment Verdict Summary Box */}
            <div className="p-6 bg-surface-container-low border-l-4 border-primary rounded-r-xl space-y-3">
              <span className="font-label-md text-[10px] uppercase tracking-[0.2em] text-primary block font-bold">
                INVESTMENT VERDICT
              </span>
              <p className="font-serif text-base md:text-lg text-white leading-relaxed font-light">
                This property sits directly in the path of Bangalore&apos;s primary northern growth corridor. With 100% pre-vetted legal clarity, it offers a secure, hands-off asset positioned for maximum wealth generation over the next 5 years.
              </p>
            </div>
          </div>

          {/* Right: Docked YOUR INVESTMENT SNAPSHOT Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 md:p-8 bg-black/90 border-2 border-primary/60 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

              <div className="border-b border-outline-variant/30 pb-4 flex items-center justify-between">
                <h3 className="font-label-md text-xs uppercase tracking-[0.2em] text-primary font-bold">
                  YOUR INVESTMENT SNAPSHOT
                </h3>
                <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
              </div>

              <div className="space-y-5">
                {/* Metric 1 */}
                <div className="flex items-center justify-between p-3.5 bg-surface-container/60 rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
                      <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                    </div>
                    <div>
                      <span className="text-xs text-on-surface-variant font-medium block">Investment Entry</span>
                      <span className="text-[10px] text-on-surface-variant/70 font-mono">Immediate Allocation</span>
                    </div>
                  </div>
                  <span className="font-mono text-xl md:text-2xl font-bold text-primary">{propInfo.price}</span>
                </div>

                {/* Metric 2 */}
                <div className="flex items-center justify-between p-3.5 bg-surface-container/60 rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <span className="material-symbols-outlined text-[20px]">trending_up</span>
                    </div>
                    <div>
                      <span className="text-xs text-on-surface-variant font-medium block">Projected Net Profit</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Over 5 Years Horizon</span>
                    </div>
                  </div>
                  <span className="font-mono text-xl md:text-2xl font-bold text-emerald-400">+₹30.5 Lakhs</span>
                </div>

                {/* Metric 3 */}
                <div className="flex items-center justify-between p-3.5 bg-surface-container/60 rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                      <span className="material-symbols-outlined text-[20px]">percent</span>
                    </div>
                    <div>
                      <span className="text-xs text-on-surface-variant font-medium block">Target IRR</span>
                      <span className="text-[10px] text-on-surface-variant/70 font-mono">Internal Rate of Return</span>
                    </div>
                  </div>
                  <span className="font-mono text-xl md:text-2xl font-bold text-white">14.2%</span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="w-full py-4 bg-gradient-to-r from-primary via-primary-fixed to-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded-xl shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">event_available</span>
                  <span>Schedule Consultation</span>
                </button>
                <div className="text-center">
                  <span className="text-[11px] text-on-surface-variant font-mono flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">lock</span>
                    <span>100% Private. No Obligation.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ── 2. CRYSTAL STONE VERDICT & PERCENTAGE BREAKDOWN CARD ── */}
        <section id="verdict" className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/50 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Score & Recommendation Banner */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-outline-variant/30 pb-6 lg:pb-0 lg:pr-8">
              <span className="section-eyebrow text-[10px] block mb-1">Institutional Rating &amp; Methodology</span>
              <h2 className="font-serif text-3xl text-white font-normal">
                Crystal Stone Verdict
              </h2>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="font-serif text-6xl font-bold text-primary">{propInfo.score}</span>
                <span className="text-sm font-mono text-on-surface-variant">/ 100</span>
              </div>
              
              <div className="pt-2">
                <span className="inline-block bg-primary text-on-primary font-label-md text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded shadow-md">
                  {propInfo.badge} — INSTITUTIONAL RECOMMENDATION
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Evaluated across 6 dimensional parameters combining High Court legal clearance, spatial infrastructure trajectory, and capital gain realization velocity.
              </p>
            </div>

            {/* Right: Confidence Breakdown with Exact Percentages */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="font-label-md text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4">
                Confidence Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                {[
                  { label: "Legal Title Confidence", val: 96, color: "bg-emerald-400" },
                  { label: "Infrastructure Growth", val: 90, color: "bg-primary" },
                  { label: "Pricing Advantage", val: 94, color: "bg-emerald-400" },
                  { label: "Growth Outlook", val: 93, color: "bg-primary" },
                  { label: "Exit Potential / Liquidity", val: 88, color: "bg-blue-400" },
                  { label: "End-User Demand Absorption", val: 92, color: "bg-primary" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5 p-3 bg-black/40 rounded-lg border border-outline-variant/20">
                    <div className="flex items-center justify-between text-on-surface font-medium">
                      <span>{item.label}</span>
                      <span className="font-mono text-primary font-bold text-sm">{item.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── 3. VISUAL DUE DILIGENCE™ (IMAGE GRID WITH CATEGORY FOOTER) ── */}
        <section id="diligence-visual" className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-serif text-2xl md:text-3xl text-white font-normal">
                  VISUAL DUE DILIGENCE™
                </h2>
                <span className="text-[10px] bg-primary/20 text-primary border border-primary/40 px-2 py-0.5 rounded font-mono font-bold">
                  PROPRIETARY
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Evidence collected by Crystal Stone Research Team during field audits and aerial survey mapping.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
                <span>Last Field Inspection: <strong className="text-white">12 June 2026</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">folder_special</span>
                <span>Evidence Collected: <strong className="text-white">42 Items</strong></span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Verified</span>
              </div>
            </div>
          </div>

          {/* Media Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Featured Left Photo Box */}
            <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-black border border-outline-variant/30 group shadow-2xl">
              <Image
                src={propInfo.image}
                alt="Main Verified View"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-4 right-4 bg-black/80 border border-primary/50 text-white font-label-md text-[11px] uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]">photo_camera</span>
                <span>32 Verified Images</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-label-md text-[10px] uppercase tracking-widest text-primary block mb-1">
                  Primary Corridor Inspection
                </span>
                <h4 className="font-serif text-xl md:text-2xl text-white font-semibold">
                  Main Asphalt Boulevard &amp; Landscaped Green Belt
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 max-w-md">
                  High-specification 40ft wide internal spine road with underground cabling, stormwater drains, and BMRDA demarcation.
                </p>
              </div>
            </div>

            {/* Right Side 3x2 Grid + Review More Card */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Roads", count: "6 Images", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80" },
                { label: "Entrance", count: "4 Images", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
                { label: "Amenities", count: "3 Images", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" },
                { label: "Drone Survey", count: "8 Images", img: "https://images.unsplash.com/photo-1508873696983-2df529a3c882?auto=format&fit=crop&w=600&q=80" },
                { label: "Layout Map", count: "2 Images", img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" },
                { label: "Street View", count: "9 Images", img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAction(`Opening inspection folder: ${item.label} (${item.count})`)}
                  className="relative h-40 sm:h-44 rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30 group cursor-pointer shadow-md"
                >
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="font-serif text-sm font-semibold block group-hover:text-primary transition-colors">{item.label}</span>
                    <span className="font-mono text-[10px] text-on-surface-variant block">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Category Selector Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
            {[
              { id: "Aerial Site Assessment", label: "Aerial Site Assessment", icon: "flight" },
              { id: "Field Walkthrough", label: "Field Walkthrough", icon: "directions_walk" },
              { id: "Virtual Site Inspection", label: "Virtual Site Inspection", icon: "view_in_ar" },
              { id: "Infrastructure Progress", label: "Infrastructure Progress", icon: "engineering" },
              { id: "Surroundings & Landmarks", label: "Surroundings & Landmarks", icon: "explore" },
              { id: "Utilities & Connectivity", label: "Utilities & Connectivity", icon: "power" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActivePhotoCategory(cat.id);
                  handleAction(`Switching due diligence view to: ${cat.label}`);
                }}
                className={`p-3 rounded-xl border font-label-md text-[10px] uppercase tracking-wider flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                  activePhotoCategory === cat.id
                    ? "bg-primary text-on-primary font-bold border-primary shadow-lg shadow-primary/20 scale-105"
                    : "bg-black/60 text-on-surface-variant border-outline-variant/30 hover:bg-surface-container hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── 4. INVESTMENT THESIS (CONCISE INSIGHTS) & EVALUATION FRAMEWORK RADAR ── */}
        <section id="thesis" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Concise Bulleted Investment Insights (Replaces long paragraphs) */}
          <div className="lg:col-span-7 glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between space-y-6">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Analytical Conviction</span>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-normal mb-2">
                Investment Thesis &amp; Macro Catalysts
              </h3>
              <p className="text-xs text-on-surface-variant mb-6">
                Why our institutional committee selected this opportunity for aggressive capital allocation:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Airport & Aerospace Convergence",
                    percentage: "98% Impact",
                    desc: "Direct beneficiary of Kempegowda T2 capacity expansion and 40+ corporate campuses inside KIADB Aerospace Park Phase 2.",
                  },
                  {
                    title: "Structural Bypass Advantage",
                    percentage: "94% Impact",
                    desc: "Satellite Town Ring Road (STRR) and Metro Phase 2B Blue Line stations coming within 4 km compress transit times to major tech corridors.",
                  },
                  {
                    title: "Severe Plot Supply Scarcity",
                    percentage: "96% Impact",
                    desc: "Strict BMRDA residential green belt zoning prevents ad-hoc layout development, driving immediate scarcity value for clear-title plots.",
                  },
                  {
                    title: "12% Valuation Entry Advantage",
                    percentage: "94% Impact",
                    desc: "Current offering enters at ₹3,333/sq.ft vs surrounding residential layout transactions averaging ₹4,063/sq.ft to ₹6,750/sq.ft.",
                  },
                ].map((insight, idx) => (
                  <div key={idx} className="p-4 bg-black/50 border border-outline-variant/30 rounded-xl space-y-2 hover:border-primary/50 transition-all">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white text-sm">{insight.title}</h4>
                      <span className="font-mono text-xs font-bold text-primary bg-primary/15 px-2 py-0.5 rounded">{insight.percentage}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{insight.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl flex items-center justify-between text-xs">
              <span className="text-on-surface font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
                <span>Audit Conclusion: <strong className="text-emerald-400">High Conviction Alpha Asset</strong></span>
              </span>
              <span className="font-mono text-emerald-400 font-bold">100% Legal Clearance</span>
            </div>
          </div>

          {/* Right: Evaluation Framework Radar Chart with Percentage Supporting Scores */}
          <div className="lg:col-span-5 glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Dimensional Matrix</span>
              <h3 className="font-serif text-2xl text-white font-normal mb-2">Evaluation Framework</h3>
              <p className="text-xs text-on-surface-variant mb-4">
                Six-vector radar assessment with explicit percentage scoring.
              </p>

              {/* Radar Chart */}
              <div className="h-48 w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={RADAR_DATA}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" stroke="#aaa" fontSize={10} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#444" fontSize={9} />
                    <Radar name="Confidence Percentage" dataKey="A" stroke="#d4af37" fill="#d4af37" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Percentage Breakdown List */}
              <div className="space-y-2 text-xs">
                {RADAR_DATA.map((dim) => (
                  <div key={dim.subject} className="flex items-center justify-between p-2 bg-black/40 rounded border border-outline-variant/20">
                    <span className="font-label-md uppercase tracking-widest text-on-surface">{dim.subject}</span>
                    <span className="font-mono text-primary font-bold">{dim.A}% Rating</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-outline-variant/20 text-center">
              <span className="text-[10px] text-on-surface-variant font-mono">
                Methodology: Institutional multi-factor risk weighting model.
              </span>
            </div>
          </div>

        </section>

        {/* ── 5. LOCATION INTELLIGENCE (IMPACT-CLASSIFIED LIST & INTERACTIVE MAP) ── */}
        <section id="location" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Impact-Classified Location Intelligence */}
          <div className="lg:col-span-7 glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
                <div>
                  <span className="section-eyebrow text-[10px] block mb-1">Spatial Proximity Matrix</span>
                  <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
                    Location Intelligence
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleAction("Opening full interactive regional master map")}
                  className="px-4 py-2 bg-primary/20 text-primary border border-primary/40 font-label-md text-[10px] uppercase tracking-widest rounded hover:bg-primary hover:text-on-primary transition-all flex items-center gap-1.5"
                >
                  <span>Explore Full Map</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>

              {/* Impact Items Grid */}
              <div className="space-y-3">
                {LOCATION_IMPACT_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-black/50 border border-outline-variant/20 rounded-xl flex items-center justify-between hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-xs sm:text-sm">{item.title}</h4>
                        <span className="text-[11px] text-on-surface-variant font-mono">{item.dist}</span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded font-label-md text-[9px] uppercase tracking-widest font-bold border ${item.color}`}>
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-black/60 rounded-xl border border-outline-variant/30 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-on-surface-variant">Connectivity Score: <strong className="text-white font-mono">94% Superb</strong></span>
              <span className="text-on-surface-variant">Social Infrastructure: <strong className="text-white font-mono">91% Established</strong></span>
            </div>
          </div>

          {/* Right: Map Preview & Legend Pins */}
          <div className="lg:col-span-5 glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between space-y-6">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">GIS Demarcation Map</span>
              <h4 className="font-serif text-xl text-white font-semibold mb-4">Corridor Positioning</h4>

              {/* Map Preview Card */}
              <div className="relative h-64 sm:h-72 w-full bg-surface-container rounded-xl overflow-hidden border border-outline-variant/30 group">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                  alt="GIS Map"
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-2xl mb-2 animate-bounce">
                    <span className="material-symbols-outlined text-[24px]">location_on</span>
                  </div>
                  <span className="font-serif text-lg font-bold text-white bg-black/80 px-4 py-1.5 rounded-full border border-primary/50 shadow-lg">
                    {propInfo.title} Pin
                  </span>
                  <span className="text-[11px] font-mono text-primary bg-black/90 px-3 py-1 rounded mt-2 border border-outline-variant/30">
                    Lat: 13.1672° N, Long: 77.5645° E
                  </span>
                </div>
              </div>
            </div>

            {/* Map Legend Dots */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-outline-variant/20 text-[11px] font-mono text-on-surface">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" /> Airport</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-400 inline-block" /> Metro Line</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block" /> Hospitals</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-purple-400 inline-block" /> Schools</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary inline-block" /> IT Parks</span>
            </div>
          </div>

        </section>

        {/* ── 6. CRYSTAL STONE SEAL (SHIELD BANNER WITH GREEN CHECKMARKS) ── */}
        <section className="glass-panel p-6 md:p-8 bg-black/90 border-2 border-primary/60 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary via-primary-fixed to-primary text-on-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-[36px]">shield_lock</span>
            </div>
            <div>
              <span className="font-label-md text-[10px] uppercase tracking-[0.2em] text-primary font-bold block mb-1">
                CRYSTAL STONE SEAL
              </span>
              <h3 className="font-serif text-2xl text-white font-semibold">
                Verified Institutional Integrity
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Every asset under goes rigorous 4-tier legal screening before private research release.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white">
            {[
              "30 Year Legal Audit",
              "Encumbrance Checked",
              "Parent Documents Verified",
              "Litigation Screened",
            ].map((check, i) => (
              <div key={i} className="flex items-center gap-2 bg-surface-container-low px-3.5 py-2 rounded-lg border border-outline-variant/30">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[12px] border border-emerald-500/40">✔</span>
                <span>{check}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openReportViewer("Crystal Stone Institutional Seal Audit", "Verified High Court Legal Certificate & 30-Year Encumbrance Review Record", 14)}
            className="w-full md:w-auto px-6 py-3.5 bg-primary/20 text-primary hover:bg-primary hover:text-on-primary border border-primary/50 font-label-md text-xs uppercase tracking-widest font-bold rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>View Seal Document (Preview)</span>
          </button>
        </section>

        {/* ── 7. COMPARABLE SALES (SAVING ₹730 / SQ.FT BANNER) ── */}
        <section id="comparables" className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Valuation Advantage</span>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
                Comparable Sales (Last 12 Months)
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Objective benchmark analysis against verified land registrations within 4 km of this layout.
              </p>
            </div>
            <a
              href="/market-insights"
              onClick={() => toast("Opening full transaction history register")}
              className="text-xs font-mono text-primary uppercase tracking-widest hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View All Transactions</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Table of Comparables */}
            <div className="lg:col-span-8 overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/40 bg-black/50 text-on-surface-variant font-label-md uppercase tracking-widest text-[11px]">
                    <th className="py-4 px-4">Project / Layout</th>
                    <th className="py-4 px-4">Sale Price (Avg/sq.ft)</th>
                    <th className="py-4 px-4">Distance</th>
                    <th className="py-4 px-4 text-right">Transaction Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {COMPARABLE_SALES.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        idx === 3 ? "bg-primary/15 font-medium text-white border-l-4 border-primary" : "hover:bg-surface-container/40 text-on-surface-variant"
                      }`}
                    >
                      <td className="py-4 px-4 font-semibold text-white flex items-center gap-2">
                        {idx === 3 && <span className="material-symbols-outlined text-primary text-[18px]">star</span>}
                        <span>{row.name}</span>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-primary">{row.priceSqFt}</td>
                      <td className="py-4 px-4 font-mono">{row.location}</td>
                      <td className="py-4 px-4 text-right font-semibold">
                        <span className={idx === 3 ? "text-primary font-bold" : "text-emerald-400"}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right Highlight Box: You Save ₹730 / sq.ft */}
            <div className="lg:col-span-4 p-6 bg-black/80 border-2 border-emerald-500/60 rounded-2xl text-center space-y-3 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant block">
                Immediate Pricing Alpha
              </span>
              <div className="py-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-emerald-400 block tracking-tight">
                  YOU SAVE ₹730 / sq.ft
                </span>
                <span className="text-[11px] text-on-surface-variant block mt-1">
                  Compared to avg. corridor market price
                </span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                Entering at <strong className="text-primary font-mono">₹3,333/sq.ft</strong> locks in instant equity before Phase 2 infrastructure completion.
              </p>
            </div>

          </div>
        </section>

        {/* ── 8. WEALTH PROJECTION™ (CAGR CURVE CHART WITH TOGGLES) ── */}
        <section id="wealth" className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/40 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-serif text-2xl md:text-3xl text-white font-normal">
                  {currentScenario.title}
                </h2>
                <span className="text-[10px] bg-primary/20 text-primary border border-primary/40 px-2 py-0.5 rounded font-mono font-bold">
                  {currentScenario.cagrLabel}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                {currentScenario.subtitle}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block">Estimated Value (Year 5)</span>
              <span className="font-serif text-3xl md:text-4xl font-bold text-primary font-mono">₹70.5 Lakhs</span>
            </div>
          </div>

          {/* Area/Line Chart Area */}
          <div className="p-4 sm:p-6 bg-black/70 border border-outline-variant/30 rounded-2xl relative">
            <div className={`h-72 sm:h-80 w-full ${!isUnlocked ? "filter blur-md select-none pointer-events-none opacity-40" : ""}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentScenario.data} margin={{ top: 15, right: 25, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="wealthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#d4af37" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <XAxis dataKey="year" stroke="#888" fontSize={11} />
                  <YAxis stroke="#888" fontSize={11} unit="L" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", borderColor: "#d4af37", borderRadius: "8px", fontSize: "12px" }}
                    formatter={(val) => [`₹${val} Lakhs`, "Projected Valuation"]}
                  />
                  <Area type="monotone" dataKey="value" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#wealthGradient)" name="This Property (18.6% CAGR)" />
                  <Area type="monotone" dataKey="avgValue" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#avgGradient)" name="Corridor Benchmark" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Lock Overlay for Public Visitors */}
            {!isUnlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/75 backdrop-blur-sm rounded-2xl z-10">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                </div>
                <h4 className="font-serif text-lg text-white font-semibold mb-1">
                  Unlock Complete Wealth Creation &amp; CAGR Projection
                </h4>
                <p className="text-xs text-on-surface-variant max-w-md mb-4">
                  Sign in to your verified investor account to inspect full sensitivity tables, tax realization strategies, and bank loan amortization schedules.
                </p>
                <button
                  type="button"
                  onClick={() => handleAction("Redirecting to Investor Login...", true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary via-primary-fixed to-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded-xl shadow-lg shadow-primary/30"
                >
                  Sign In To View Analysis
                </button>
              </div>
            )}
          </div>

          {/* Bottom Toggles: Capital Appreciation | Balanced | Rental Yield */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex gap-3">
              {(["Capital Appreciation", "Balanced", "Rental Yield"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveProjectionTab(tab);
                    handleAction(`Switching financial projection model to: ${tab}`);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-label-md text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                    activeProjectionTab === tab
                      ? "bg-primary text-on-primary font-bold shadow-lg shadow-primary/25 scale-105"
                      : "bg-black/60 text-on-surface-variant hover:text-white border border-outline-variant/30"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {tab === "Capital Appreciation" ? "trending_up" : tab === "Balanced" ? "balance" : "home_work"}
                  </span>
                  <span>{tab}</span>
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Audited by Financial Modeling Team</span>
            </div>
          </div>
        </section>

        {/* ── 9. INVESTMENT SCENARIO SIMULATOR ── */}
        <section className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Interactive Decision Engine</span>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
                INVESTMENT SCENARIO SIMULATOR
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Model your potential wealth creation across various holding horizons and principal allocations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleAction("Opening Advanced Multi-Factor Scenario Simulator")}
              className="text-xs font-mono text-primary uppercase tracking-widest hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Explore Advanced Scenarios</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Controls (Amount Slider + Holding Horizon Buttons) */}
            <div className="lg:col-span-6 space-y-6 bg-black/60 p-6 rounded-2xl border border-outline-variant/30">
              {/* Slider: Investment Amount */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-white font-medium">Investment Amount</span>
                  <span className="font-mono text-primary font-bold text-lg">₹{simAmount.toLocaleString("en-IN")} Lakhs</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={200}
                  step={5}
                  value={simAmount}
                  onChange={(e) => setSimAmount(Number(e.target.value))}
                  className="w-full accent-primary bg-surface-container h-2.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>₹20 Lakhs</span>
                  <span>₹100 Lakhs</span>
                  <span>₹200 Lakhs</span>
                </div>
              </div>

              {/* Selector: Holding Period (3 Yrs | 5 Yrs | 7 Yrs | 10 Yrs) */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-white font-medium">Holding Period</span>
                  <span className="font-mono text-primary font-bold text-lg">{simYears} Years</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[3, 5, 7, 10].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setSimYears(yr)}
                      className={`py-3 rounded-xl font-label-md text-xs uppercase tracking-widest transition-all ${
                        simYears === yr
                          ? "bg-primary text-on-primary font-bold shadow-lg shadow-primary/25 scale-105"
                          : "bg-surface-container text-on-surface-variant hover:text-white border border-outline-variant/30"
                      }`}
                    >
                      {yr} Yrs
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Simulator Results Output Card */}
            <div className="lg:col-span-6 p-6 sm:p-8 bg-black/90 border-2 border-primary/60 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="grid grid-cols-2 gap-6 text-center border-b border-outline-variant/30 pb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Projected Value</span>
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-primary font-mono block">₹{simResult.futureVal} Lakhs</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Total Appreciation</span>
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-emerald-400 font-mono block">+₹{simResult.profit} Lakhs</span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">({simResult.percentage})</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase">Multiple on Capital</span>
                  <span className="font-mono text-white font-bold text-base">{simResult.multiple} Return</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="px-5 py-2.5 bg-primary text-on-primary font-label-md text-[11px] uppercase tracking-widest font-bold rounded-xl luxury-button shadow-md"
                >
                  Lock This Scenario
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ── 10. DUE DILIGENCE CENTRE (INTERACTIVE DOCUMENT CARDS & DRM VIEWER) ── */}
        <section id="diligence" className="glass-panel p-8 md:p-10 bg-black/90 border-2 border-primary/50 space-y-6 rounded-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
            <div>
              <span className="section-eyebrow block mb-1 text-[10px]">30-Year Legal Audit Dossier</span>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
                Due Diligence Centre
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Click any verified certificate card below to open the secure in-platform DRM document reader.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/40">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              <span>100% TITLE CLEARANCE VERIFIED</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Legal Opinion", subtitle: "Adv. Rajeshwari & Associates", icon: "gavel", pages: 14 },
              { title: "Encumbrance Certificate", subtitle: "30-Year Clean EC Audit Record", icon: "verified_user", pages: 8 },
              { title: "Ownership Verification", subtitle: "Parent Title Deeds Inspected", icon: "assignment", pages: 12 },
              { title: "Layout Approval Plan", subtitle: "BMRDA Sanctioned Demarcation Map", icon: "map", pages: 6 },
              { title: "Survey Sketch (Tippan)", subtitle: "Hissa Records & Boundary Check", icon: "architecture", pages: 4 },
              { title: "Tax Records (A-Khata)", subtitle: "Up-to-Date Municipal Receipts", icon: "receipt_long", pages: 5 },
            ].map((doc, i) => (
              <div
                key={i}
                onClick={() => openReportViewer(doc.title, doc.subtitle, doc.pages)}
                className="p-5 bg-surface-container-low border border-outline-variant/30 hover:border-primary/80 rounded-xl cursor-pointer transition-all group flex flex-col justify-between space-y-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">{doc.icon}</span>
                  <span className="text-[10px] font-mono text-on-surface-variant bg-black/80 px-2.5 py-1 rounded border border-outline-variant/20">
                    {isUnlocked ? `${doc.pages} Pages` : "🔒 Locked"}
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-lg text-white font-semibold group-hover:text-primary transition-colors">{doc.title}</h4>
                  <p className="text-xs text-on-surface-variant/80 mt-1">{doc.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 11–13. PRICING INTELLIGENCE, INFRASTRUCTURE INTELLIGENCE, & EXIT STRATEGY ── */}
        <section id="intelligence" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Pricing Intelligence */}
          <div className="glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between space-y-6">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Valuation Assessment</span>
              <h3 className="font-serif text-xl text-white font-semibold mb-3">Pricing Intelligence</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Analytical comparison against prevailing land transaction values in the immediate Rajanukunte corridor.
              </p>

              <div className="p-6 bg-black/60 border border-primary/40 rounded-xl text-center my-4 relative overflow-hidden">
                <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">
                  Pricing Advantage
                </span>
                <p className="font-serif text-4xl md:text-5xl font-bold text-emerald-400 tracking-tight my-2">
                  12% Below
                </p>
                <p className="font-label-md text-xs uppercase tracking-widest text-white font-semibold">
                  Surrounding Market Average
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openReportViewer("Detailed Pricing Analysis Report", "Comprehensive valuation benchmark against 15 nearby residential layouts")}
              className="w-full py-3.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded-xl luxury-button flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">{isUnlocked ? "description" : "lock"}</span>
              <span>{isUnlocked ? "View Pricing Report" : "Unlock Pricing Report"}</span>
            </button>
          </div>

          {/* Card 2: Infrastructure Intelligence */}
          <div className="glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between space-y-6">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Milestone Tracker</span>
              <h3 className="font-serif text-xl text-white font-semibold mb-3">Infrastructure Intelligence</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Key civic catalysts driving corridor land value appreciation:
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  { label: "Airport Terminal 2", status: "Approved", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
                  { label: "Metro Phase 2B Blue Line", status: "Construction", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                  { label: "STRR Satellite Ring Road", status: "Tender Awarded", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
                  { label: "KIADB Aerospace Park", status: "Operational", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
                ].map((infra, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-black/40 border border-outline-variant/20 rounded-lg text-xs">
                    <span className="text-white font-medium">{infra.label}</span>
                    <span className={`px-2 py-0.5 rounded font-label-md text-[9px] uppercase tracking-widest font-bold border ${infra.color}`}>
                      {infra.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => openReportViewer("Infrastructure Intelligence Report", "Master civic notification records & government timeline projections")}
              className="w-full py-3.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded-xl luxury-button flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">{isUnlocked ? "description" : "lock"}</span>
              <span>{isUnlocked ? "View Infrastructure Report" : "Unlock Infrastructure Report"}</span>
            </button>
          </div>

          {/* Card 3: Exit Strategy */}
          <div className="glass-panel p-6 md:p-8 bg-surface-container-low border-primary/30 flex flex-col justify-between space-y-6">
            <div>
              <span className="section-eyebrow text-[10px] block mb-1">Liquidity &amp; Realization</span>
              <h3 className="font-serif text-xl text-white font-semibold mb-3">Exit Strategy</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Structured holding horizons designed to maximize tax efficiency and capital gain realization velocity.
              </p>

              <div className="p-5 bg-black/60 border border-primary/40 rounded-xl text-center my-4">
                <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">
                  Optimal Holding Horizon
                </span>
                <p className="font-serif text-3xl font-bold text-primary my-1">
                  3 – 7 Years
                </p>
                <span className="text-[11px] text-on-surface-variant/80">
                  Targeting post-Metro capital spike
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-label-md text-[10px] uppercase tracking-widest text-on-surface block">Target Buyer Network:</span>
                <div className="flex flex-wrap gap-1.5">
                  {["IT Professionals", "NRIs & Repatriates", "Tier-1 Builders", "Portfolio Funds"].map((buyer, i) => (
                    <span key={i} className="bg-surface-container px-2.5 py-1 rounded text-[11px] border border-outline-variant/30 text-on-surface-variant">
                      {buyer}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openReportViewer("Strategic Exit & Realization Mandate", "Tax-efficient exit timeline and institutional liquidity network analysis")}
              className="w-full py-3.5 bg-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded-xl luxury-button flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">{isUnlocked ? "description" : "lock"}</span>
              <span>{isUnlocked ? "View Exit Strategy Mandate" : "Unlock Exit Mandate"}</span>
            </button>
          </div>

        </section>

        {/* ── 14. MARKET INTELLIGENCE TIMELINE ── */}
        <section className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/30 space-y-8">
          <div>
            <span className="section-eyebrow block mb-1 text-[10px]">Corridor Catalyst History</span>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
              Market Intelligence Timeline
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              How macroeconomic developments have driven land appreciation in North Bengaluru from 2020 to present.
            </p>
          </div>

          <div className="relative border-l-2 border-primary/40 ml-4 pl-6 space-y-8">
            {TIMELINE_DATA.map((item, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-primary border-2 border-surface-container group-hover:scale-125 transition-transform" />
                <div className="space-y-1">
                  <span className="font-mono text-xs text-primary font-bold">{item.year}</span>
                  <h4 className="font-serif text-base font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 15. THINGS TO KNOW (TRANSPARENT RISKS) ── */}
        <section className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/30 space-y-6">
          <div>
            <span className="section-eyebrow block mb-1 text-[10px]">Institutional Transparency</span>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
              Things To Know
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              We believe in complete disclosure. Here are the honest risks and considerations for this asset class:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-black/50 border border-outline-variant/30 rounded-xl space-y-2">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-[20px]">schedule</span>
                <span>Long Holding Horizon</span>
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Land requires a minimum 3 to 7 year holding window to capture full infrastructure compounding cycles. Short-term speculation is discouraged.
              </p>
            </div>

            <div className="p-5 bg-black/50 border border-outline-variant/30 rounded-xl space-y-2">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-[20px]">water_drop</span>
                <span>Low Immediate Rental Yield</span>
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Unlike commercial lease assets, vacant residential land generates zero monthly rental yield during the holding period prior to development.
              </p>
            </div>

            <div className="p-5 bg-black/50 border border-outline-variant/30 rounded-xl space-y-2">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-[20px]">construction</span>
                <span>Timeline Dependency</span>
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Value spikes are correlated with civic completion dates of Metro Phase 2B and STRR ring road, which are subject to government execution milestones.
              </p>
            </div>
          </div>
        </section>

        {/* ── 16. PROJECT GALLERY ── */}
        <section className="glass-panel p-6 md:p-10 bg-surface-container-low border-primary/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="section-eyebrow block mb-1 text-[10px]">Visual Inspection Archive</span>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
                Project Gallery
              </h3>
            </div>
            <div className="flex gap-4 text-xs font-label-md uppercase tracking-widest">
              {["All", "Layout Plan", "Site Development", "Surroundings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveGalleryTab(tab)}
                  className={`pb-1 transition-colors ${activeGalleryTab === tab ? "text-primary border-b-2 border-primary font-bold" : "text-on-surface-variant hover:text-white"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Main Boulevard Spine", img: "/Rajanukunte_Premium_Layout.png" },
              { title: "40ft Asphalt Roadway", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" },
              { title: "Landscaped Green Zones", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" },
              { title: "Drone Survey Overview", img: "https://images.unsplash.com/photo-1508873696983-2df529a3c882?auto=format&fit=crop&w=800&q=80" },
            ].map((photo, i) => (
              <div
                key={i}
                onClick={() => handleAction(`Opening full resolution gallery image: ${photo.title}`)}
                className="relative h-64 rounded-xl overflow-hidden group border border-outline-variant/30 cursor-pointer shadow-lg"
              >
                <Image
                  src={photo.img}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-label-md uppercase tracking-widest text-white font-bold">
                  {photo.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 17–18. RELATIONSHIP MANAGER CARD & CONSULTATION CTA BANNER ── */}
        <section id="consultation" className="glass-panel p-8 md:p-12 border-2 border-primary/60 bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low shadow-2xl relative overflow-hidden rounded-2xl">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left: Dedicated Advisor Profile Card */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center bg-primary text-2xl font-bold text-on-primary rounded-2xl shadow-lg shadow-primary/30">
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
                <h3 className="font-serif text-3xl text-white font-semibold">Priya Nair</h3>
                <p className="text-sm text-on-surface-variant">Senior Investment Advisor • North Bengaluru Portfolio</p>
                <div className="mt-2 flex items-center gap-2 text-xs font-mono">
                  <span className="text-primary font-bold">4.9 ★★★★★</span>
                  <span className="text-on-surface-variant">(127+ Verified HNI Investors Assisted)</span>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => toast("Initiating direct priority line with Priya Nair (+91 98765 43210)...", { icon: "📞" })}
                className="w-full sm:w-auto px-6 py-4 border border-outline-variant/60 bg-surface text-white font-label-md uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-all font-bold rounded-xl flex items-center justify-center gap-2 shadow-md"
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

          {/* Bottom Banner inside CTA section: Want to go deeper? */}
          <div className="mt-8 pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-black/60 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">folder_zip</span>
              </div>
              <div>
                <h4 className="font-semibold text-white text-xs sm:text-sm">Want to go deeper?</h4>
                <p className="text-[11px] text-on-surface-variant">Access raw documents, legal certificates, approvals, and technical reports in your secure drawer.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openReportViewer("Raw Due Diligence & Technical Reports Package", "Full 42-item legal, survey, and municipal certificate bundle")}
              className="text-xs font-mono text-primary uppercase tracking-widest hover:underline flex items-center gap-1.5 shrink-0 bg-black/50 px-4 py-2.5 rounded-lg border border-outline-variant/30"
            >
              <span>View Raw Due Diligence &amp; Reports</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </section>

      </div>

      {/* ── EMBEDDED DRM REPORT VIEWER MODAL ── */}
      {activeReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-4xl h-[85vh] bg-surface-container-lowest border-2 border-primary rounded-2xl flex flex-col overflow-hidden shadow-2xl select-none"
            onContextMenu={(e) => { e.preventDefault(); toast.error("Right-click is disabled for document security."); }}
          >
            {/* Header */}
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

            {/* Viewer Body with Translucent Watermark */}
            <div className="relative flex-1 overflow-y-auto p-8 md:p-16 bg-[#1a1a1a] flex flex-col items-center justify-center font-serif text-on-surface select-none print:hidden">
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-15 select-none overflow-hidden rotate-[-25deg] z-10">
                <div className="text-center space-y-16">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="whitespace-nowrap font-mono text-xl sm:text-2xl font-bold tracking-widest text-primary">
                      CRYSTAL STONE INVESTOR PORTAL • JOSEPH KIRAN • ID: CS-INV-8849 • {new Date().toISOString().split("T")[0]} • CONFIDENTIAL &amp; PROPRIETARY
                    </div>
                  ))}
                </div>
              </div>

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

            {/* Footer Pagination Controls */}
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
                  defaultValue="2026-07-12T11:00"
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
