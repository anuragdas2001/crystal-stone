"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
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

const SIDEBAR_LINKS = [
  { label: "Overview", icon: "home" },
  { label: "Investment Snapshot", icon: "analytics" },
  { label: "Growth Intelligence", icon: "trending_up" },
  { label: "Location Intelligence", icon: "location_on" },
  { label: "Due Diligence", icon: "verified_user" },
  { label: "Comparables", icon: "compare_arrows" },
  { label: "Wealth Simulator", icon: "calculate" },
  { label: "Documents", icon: "description" },
  { label: "Gallery", icon: "photo_library" },
  { label: "FAQs", icon: "help_outline" },
];

const RENTAL_INCOME_DATA = [
  { year: "Year 1", rent: 1.20, growth: 1.20 },
  { year: "Year 2", rent: 1.26, growth: 1.26 },
  { year: "Year 3", rent: 1.32, growth: 1.32 },
  { year: "Year 4", rent: 1.39, growth: 1.39 },
  { year: "Year 5", rent: 1.46, growth: 1.46 },
];

const WEALTH_PROJECTION_DATA = [
  { year: "Year 1", value: 1.25 },
  { year: "Year 2", value: 1.26 },
  { year: "Year 3", value: 1.27 },
  { year: "Year 4", value: 1.28 },
  { year: "Year 5", value: 1.29 },
];

export default function PropertyResearchTerminal({
  isUnlocked = false,
  slug = "airport-growth-belt",
  onUnlockRequest,
}: PropertyResearchTerminalProps) {
  const [activeTab, setActiveTab] = useState<"earn" | "live" | "land">("land");
  const [simAmount, setSimAmount] = useState<number>(55.5);

  const handleUnlockClick = () => {
    if (!isUnlocked && onUnlockRequest) {
      onUnlockRequest();
    }
  };

  return (
    <div className="flex bg-background min-h-screen text-on-surface font-sans selection:bg-primary selection:text-on-primary">
      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 min-h-screen overflow-y-auto w-full">
        <div className="p-6 md:p-10 space-y-10 w-full">
          
          {/* 1. PROPERTY HEADER (IMAGE AT TOP) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span className="hover:text-primary cursor-pointer">Back to Properties</span>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
                alt="Airport Growth Belt"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                 <div>
                    <span className="inline-block bg-primary/20 text-primary border border-primary/40 backdrop-blur-md font-label-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">
                      NORTH BENGALURU'S NEXT GROWTH CORRIDOR
                    </span>
                    <h1 className="font-display-xl text-display-xl text-white font-normal leading-tight tracking-tight drop-shadow-md">
                      AIRPORT GROWTH BELT
                    </h1>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm mt-2 drop-shadow-md">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span>Rajanekunte, North Bengaluru</span>
                    </div>
                 </div>

                 {/* Quick Stats Overlaid on Image */}
                 <div className="flex flex-wrap md:flex-nowrap gap-3">
                   <div className="bg-black/60 backdrop-blur-md px-4 py-3 rounded-xl border border-outline-variant/30 text-white min-w-[140px]">
                     <span className="material-symbols-outlined text-primary text-xl mb-1">flight_takeoff</span>
                     <div className="font-semibold text-sm">30 mins</div>
                     <div className="text-[10px] text-on-surface-variant">Kempegowda Airport</div>
                   </div>
                   <div className="bg-black/60 backdrop-blur-md px-4 py-3 rounded-xl border border-outline-variant/30 text-white min-w-[140px]">
                     <span className="material-symbols-outlined text-primary text-xl mb-1">train</span>
                     <div className="font-semibold text-sm">Phase 2 Blue Line</div>
                     <div className="text-[10px] text-on-surface-variant">Metro Connectivity</div>
                   </div>
                   <div className="bg-black/60 backdrop-blur-md px-4 py-3 rounded-xl border border-outline-variant/30 text-white min-w-[140px]">
                     <span className="material-symbols-outlined text-primary text-xl mb-1">sell</span>
                     <div className="font-semibold text-sm">₹49.9 Lakhs*</div>
                     <div className="text-[10px] text-on-surface-variant">Starting Price</div>
                   </div>
                 </div>
              </div>
            </div>

            {/* Overview / Badges */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20">
              <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
                A premium investment opportunity in North Bengaluru's fastest-growing corridor. Excellent connectivity, infrastructure growth, and high appreciation potential.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-lg border border-outline-variant/20 text-[11px] font-medium text-white">
                  <span className="material-symbols-outlined text-primary text-[16px]">verified</span> BMRDA Approved
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-lg border border-outline-variant/20 text-[11px] font-medium text-white">
                  <span className="material-symbols-outlined text-primary text-[16px]">assignment</span> A-Khata Title
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-lg border border-outline-variant/20 text-[11px] font-medium text-emerald-400">
                  <span className="material-symbols-outlined text-[16px]">shield_check</span> Legally Verified
                </span>
              </div>
            </div>
            
            {/* WEALTH PROJECTION GRAPH JUST BELOW OVERVIEW */}
            <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden flex flex-col h-[350px]">
              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                  <span className="material-symbols-outlined text-primary text-3xl mb-2">lock</span>
                  <h4 className="text-white font-bold mb-2">Unlock detailed projection</h4>
                  <p className="text-[11px] text-on-surface-variant mb-4">View exact wealth compounding curves and historical benchmarks.</p>
                  <button onClick={handleUnlockClick} className="bg-primary/20 text-primary border border-primary/40 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors">Sign In To View</button>
                </div>
              )}
              <div className="flex justify-between items-center mb-6">
                <h3 className="section-eyebrow text-white">WEALTH PROJECTION (5 YEARS)</h3>
                {!isUnlocked && <span className="text-[10px] text-primary flex items-center gap-1 cursor-pointer" onClick={handleUnlockClick}><span className="material-symbols-outlined text-[14px]">lock</span> Unlock for detailed projection</span>}
              </div>
              <div className="flex justify-between items-end mb-4">
                <div>
                    <div className="section-eyebrow !text-on-surface-variant mb-1">Potential Value in 5 Years</div>
                    <div className="font-display-lg text-headline-lg font-bold text-white">₹1.25 Cr - ₹1.29 Cr</div>
                </div>
                <div className="bg-surface-container border border-outline-variant/30 px-3 py-1 rounded text-[10px] text-white font-mono">₹1.25 Cr - ₹1.29 Cr</div>
              </div>
              <div className="flex-1 w-full min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={WEALTH_PROJECTION_DATA}>
                    <defs>
                      <linearGradient id="colorValueGlobal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="year" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#666" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val} Cr`} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                    <Tooltip cursor={{stroke: '#333'}} contentStyle={{backgroundColor: '#111', borderColor: '#333', fontSize: '12px'}} formatter={(val) => [`₹${val} Cr`, 'Value']} />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValueGlobal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

          </section>

          {/* 2. OBJECTIVE SELECTOR */}
          <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="section-eyebrow text-white">How would you like this property to work for you?</h3>
                <p className="text-xs text-on-surface-variant mt-1">Select your objective to view personalized insights and analysis.</p>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-primary hover:underline font-medium">
                <span className="material-symbols-outlined text-[16px]">info</span>
                How does this work?
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab("land")}
                className={`p-5 rounded-xl border text-left transition-all ${
                  activeTab === "land"
                    ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(212,175,55,0.15)] relative overflow-hidden"
                    : "bg-surface-container border-outline-variant/20 hover:border-primary/50"
                }`}
              >
                {activeTab === "land" && (
                  <span className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center bg-primary text-on-primary rounded-full text-[12px] font-bold">✔</span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <span className={`material-symbols-outlined text-2xl ${activeTab === "land" ? "text-primary" : "text-on-surface-variant"}`}>eco</span>
                  <span className={`font-display-lg text-body-lg font-semibold ${activeTab === "land" ? "text-primary" : "text-white"}`}>LAND INVESTMENT</span>
                </div>
                <div className="text-sm font-medium text-white mb-2">Buy. Hold. Grow.</div>
                <div className="text-[11px] text-on-surface-variant leading-relaxed">Maximise long-term capital appreciation.</div>
              </button>

              <button
                onClick={() => setActiveTab("live")}
                className={`p-5 rounded-xl border text-left transition-all ${
                  activeTab === "live"
                    ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(212,175,55,0.15)] relative overflow-hidden"
                    : "bg-surface-container border-outline-variant/20 hover:border-primary/50"
                }`}
              >
                {activeTab === "live" && (
                  <span className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center bg-primary text-on-primary rounded-full text-[12px] font-bold">✔</span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <span className={`material-symbols-outlined text-2xl ${activeTab === "live" ? "text-primary" : "text-on-surface-variant"}`}>home</span>
                  <span className={`font-display-lg text-body-lg font-semibold ${activeTab === "live" ? "text-primary" : "text-white"}`}>BUILD TO LIVE</span>
                </div>
                <div className="text-sm font-medium text-white mb-2">Build your dream home.</div>
                <div className="text-[11px] text-on-surface-variant leading-relaxed">Create your ideal lifestyle with a custom-built home.</div>
              </button>

              <button
                onClick={() => setActiveTab("earn")}
                className={`p-5 rounded-xl border text-left transition-all ${
                  activeTab === "earn"
                    ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(212,175,55,0.15)] relative overflow-hidden"
                    : "bg-surface-container border-outline-variant/20 hover:border-primary/50"
                }`}
              >
                {activeTab === "earn" && (
                  <span className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center bg-primary text-on-primary rounded-full text-[12px] font-bold">✔</span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <span className={`material-symbols-outlined text-2xl ${activeTab === "earn" ? "text-primary" : "text-on-surface-variant"}`}>apartment</span>
                  <span className={`font-display-lg text-body-lg font-semibold ${activeTab === "earn" ? "text-primary" : "text-white"}`}>BUILD TO EARN</span>
                </div>
                <div className="text-sm font-medium text-white mb-2">Build today. Earn tomorrow.</div>
                <div className="text-[11px] text-on-surface-variant leading-relaxed">Generate rental income and build lasting wealth.</div>
              </button>
            </div>

            <div className="text-center text-[11px] text-on-surface-variant mt-6">
              Your selected view will personalize all insights, projections and recommendations on this page.
            </div>
          </section>

          {/* 3. CONDITIONAL VIEWS */}
          {activeTab === "earn" && <BuildToEarnView />}
          {activeTab === "live" && <BuildToLiveView />}
          {activeTab === "land" && (
            <LandInvestmentView 
              isUnlocked={isUnlocked} 
              onUnlockClick={handleUnlockClick} 
              simAmount={simAmount} 
              setSimAmount={setSimAmount} 
            />
          )}

        </div>
      </main>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// BUILD TO EARN VIEW COMPONENTS
// ────────────────────────────────────────────────────────
function BuildToEarnView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* RENTAL INVESTMENT SUMMARY */}
      <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 md:p-8">
        <h3 className="section-eyebrow text-white mb-6">RENTAL INVESTMENT SUMMARY</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Total Project Cost</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-white">₹1.10 Cr*</div>
            <div className="text-[10px] text-on-surface-variant">Land + Construction</div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Built-up Area (Est.)</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-white">5000 sq.ft</div>
            <div className="text-[10px] text-on-surface-variant">G+2 Building</div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Unit Configuration</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-white">6 Units</div>
            <div className="text-[10px] text-on-surface-variant">2BHK (6 Nos.)</div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Estimated Monthly Rent</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-primary">₹1,20,000*</div>
            <div className="text-[10px] text-on-surface-variant">Total</div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Gross Rental Yield</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-white">5.2% - 5.8%</div>
            <div className="text-[10px] text-on-surface-variant">Annual</div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Expected Appreciation</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-white">2.3x - 2.8x</div>
            <div className="text-[10px] text-on-surface-variant">in 5 Years</div>
          </div>
        </div>
        <div className="text-[9px] text-on-surface-variant mt-6">*Prices are indicative and subject to change.</div>
      </section>

      {/* DESIGN & FLOOR PLAN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 flex flex-col">
          <h3 className="section-eyebrow text-white mb-4">BUILDING DESIGN CONCEPT</h3>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-3">
            <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" alt="Design" fill className="object-cover" unoptimized/>
          </div>
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-outline-variant/30 opacity-70 hover:opacity-100 cursor-pointer">
                <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&q=80" alt="thumb" fill className="object-cover" unoptimized/>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="section-eyebrow text-white">FLOOR PLAN <span className="text-on-surface-variant font-normal">(TYPICAL FLOOR - 1666 SQ.FT)</span></h3>
            <span className="text-[10px] text-primary uppercase hover:underline cursor-pointer">View All Plans</span>
          </div>
          <div className="flex-1 flex gap-6">
            <div className="relative flex-1 bg-surface-container rounded-xl p-4 flex items-center justify-center">
               <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Floor Plan" fill className="object-contain p-4 opacity-80 mix-blend-screen" unoptimized/>
               <div className="absolute bottom-2 inset-x-0 flex justify-around text-[9px] text-on-surface-variant uppercase font-bold tracking-widest">
                  <span>GROUND FLOOR (PARKING)</span>
                  <span>TYPICAL FLOOR PLAN</span>
               </div>
            </div>
            <div className="w-48 flex flex-col justify-center space-y-3">
              <h4 className="font-semibold text-white text-sm">2BHK Unit Layout</h4>
              <ul className="text-xs text-on-surface-variant space-y-2">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Living &amp; Dining</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> 2 Bedrooms</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> 2 Bathrooms</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Kitchen</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Utility</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"/> Balcony</li>
              </ul>
              <div className="mt-4 px-3 py-1.5 border border-primary/40 bg-primary/10 text-primary text-[10px] rounded text-center">
                6 Units per Building
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* RENTAL CHARTS & INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6">
          <h3 className="section-eyebrow text-white mb-1">RENTAL INCOME PROJECTION <span className="text-on-surface-variant font-normal">(5 YEARS)</span></h3>
          <div className="text-[10px] text-on-surface-variant mb-4">Monthly Rental Income (Total)</div>
          <div className="font-display-lg text-headline-lg-mobile text-white mb-6">₹1.20 Lakh*</div>
          
          <div className="h-40 w-full mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RENTAL_INCOME_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="year" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#666" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val} L`} />
                <Tooltip cursor={{fill: '#222'}} contentStyle={{backgroundColor: '#111', borderColor: '#333', fontSize: '12px'}} formatter={(val) => [`₹${val} Lakh`, 'Monthly Rent']} />
                <Bar dataKey="rent" fill="#9333ea" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center gap-4 text-[9px] text-on-surface-variant">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-[#9333ea]"/> Monthly Rent</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-on-surface-variant"/> Assumed Growth</span>
          </div>
          <div className="text-[9px] text-on-surface-variant mt-3">* Assumed rental escalation: 5% annually.</div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="section-eyebrow text-white mb-6">CASH FLOW SUMMARY <span className="text-on-surface-variant font-normal">(MONTHLY)</span></h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Total Monthly Rent</span>
                <span className="text-white font-mono">₹1,20,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Property Tax &amp; Maint.</span>
                <span className="text-red-400 font-mono">- ₹8,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Loan EMI (Est.)</span>
                <span className="text-red-400 font-mono">- ₹62,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Management (5%)</span>
                <span className="text-red-400 font-mono">- ₹6,000</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center py-4 border-y border-outline-variant/20 mb-4">
              <span className="text-sm font-semibold text-primary">Net Monthly Cash Flow</span>
              <span className="font-display-lg text-body-lg font-bold text-primary">₹44,000*</span>
            </div>
            <div className="flex items-center gap-3 bg-surface-container p-3 rounded-lg border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-2xl">home_work</span>
              <div>
                <div className="text-[9px] text-on-surface-variant uppercase">Annual Cash Flow</div>
                <div className="font-semibold text-white">₹5.28 Lakh*</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="section-eyebrow text-white mb-6">OCCUPANCY &amp; DEMAND INSIGHTS</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
                <span className="text-xs text-on-surface-variant">Average Occupancy</span>
                <span className="text-sm font-semibold text-white">92% - 96%</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs text-on-surface-variant mb-1">Rental Demand</div>
                  <div className="text-[10px] text-on-surface-variant/70">Consistent demand from professionals &amp; families</div>
                </div>
                <span className="text-sm font-semibold text-white">High</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-4">Key Demand Drivers</div>
            <div className="grid grid-cols-4 gap-2 text-center text-[9px] text-on-surface-variant">
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-primary">flight</span>
                <span>Airport &amp; Tech Parks</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-primary">school</span>
                <span>Educational Institutions</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-primary">train</span>
                <span>Upcoming Metro</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-primary">local_hospital</span>
                <span>Social Infrastructure</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* COST, ROI, FINANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6">
          <h3 className="section-eyebrow text-white mb-6">PROJECT COST BREAKDOWN <span className="text-on-surface-variant font-normal">(ESTIMATED)</span></h3>
          <div className="space-y-4 text-xs pb-4 border-b border-outline-variant/20">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Land Cost (1200 sq.ft)</span>
              <span className="text-white font-mono">₹49.9 L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Construction Cost (5000 sq.ft @ ₹2,200/sq.ft)</span>
              <span className="text-white font-mono">₹1.10 Cr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Approvals &amp; Documentation</span>
              <span className="text-white font-mono">₹3.5 L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Interiors &amp; Finishing (Common Areas)</span>
              <span className="text-white font-mono">₹8.0 L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Contingency (5%)</span>
              <span className="text-white font-mono">₹5.0 L</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-semibold text-white">Total Project Cost</span>
            <span className="font-display-lg text-body-lg font-bold text-primary">₹1.10 Cr*</span>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6">
          <h3 className="section-eyebrow text-white mb-6">ROI &amp; WEALTH PROJECTION</h3>
          <div className="space-y-4 text-xs pb-4 border-b border-outline-variant/20">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Total Investment</span>
              <span className="text-white font-mono">₹1.10 Cr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Total Rental Income (5 Yrs)</span>
              <span className="text-emerald-400 font-mono">₹72 L - ₹78 L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Total Appreciation (5 Yrs)</span>
              <span className="text-emerald-400 font-mono">₹1.35 Cr - ₹1.60 Cr</span>
            </div>
          </div>
          <div className="mt-4 p-3 border border-primary/40 bg-primary/10 rounded-lg">
            <div className="text-[9px] text-on-surface-variant uppercase">Total Estimated Wealth in 5 Years</div>
            <div className="font-display-lg text-body-lg font-bold text-primary mt-1">₹2.07 Cr - ₹2.38 Cr*</div>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6">
          <h3 className="section-eyebrow text-white mb-6">FINANCING ESTIMATE</h3>
          <div className="space-y-4 text-xs pb-4 border-b border-outline-variant/20">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Loan Amount (70%)</span>
              <span className="text-white font-mono">₹77.00 Lakh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Interest Rate (Est.)</span>
              <span className="text-white font-mono">8.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Loan Tenure</span>
              <span className="text-white font-mono">20 Years</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-surface-container rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-[#a855f7] text-2xl">calculate</span>
            <div>
              <div className="text-[9px] text-on-surface-variant uppercase">Estimated Monthly EMI</div>
              <div className="font-display-lg text-body-lg font-bold text-[#a855f7]">₹62,000*</div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA STRIP */}
      <section className="bg-surface-container-lowest border border-primary/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined">headset_mic</span>
          </div>
          <div>
            <h4 className="text-white font-semibold">Interested in this rental investment opportunity?</h4>
            <p className="text-xs text-on-surface-variant mt-1">Schedule a call with our expert to discuss returns, financing &amp; rental strategy.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-on-primary font-bold text-xs rounded-lg transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Schedule a Call
          </button>
          <button className="px-5 py-2.5 bg-surface-container border border-outline-variant/30 text-white hover:border-primary/50 font-bold text-xs rounded-lg transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Chat on WhatsApp
          </button>
        </div>
      </section>

      {/* RECOMMENDED STRIP */}
      <section>
        <div className="flex justify-between items-center mb-4 text-xs">
          <h3 className="font-label-md uppercase tracking-widest font-bold text-white">RECOMMENDED FOR YOU</h3>
          <span className="text-primary hover:underline cursor-pointer">View All Opportunities &rarr;</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {[
            { tag: "RENTAL HOTSPOT", title: "Devanahalli Rental Hub", price: "₹1.05 Cr*", yield: "5.4% - 6.1%", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80" },
            { tag: "HIGH CASH FLOW", title: "Yelahanka Prime", price: "₹88 Lakhs*", yield: "5.0% - 6.6%", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80" },
            { tag: "PREMIUM RENTAL", title: "Hebbal Growth Zone", price: "₹1.25 Cr*", yield: "5.2% - 6.0%", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" },
            { tag: "STUDENT RENTAL", title: "Jakkur Campus Belt", price: "₹1.08 Cr*", yield: "5.5% - 6.3%", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" }
          ].map((item, idx) => (
            <div key={idx} className="relative w-64 h-32 rounded-xl overflow-hidden shrink-0 group cursor-pointer border border-outline-variant/20">
              <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized/>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <span className="absolute top-2 left-2 bg-primary text-on-primary text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">{item.tag}</span>
              <div className="absolute bottom-2 left-3 right-3 text-white text-xs">
                <div className="font-semibold">{item.title}</div>
                <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                  <span>Starting {item.price}</span>
                  <span className="text-emerald-400">Yield {item.yield}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}

// ────────────────────────────────────────────────────────
// BUILD TO LIVE VIEW COMPONENTS
// ────────────────────────────────────────────────────────
function BuildToLiveView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* BUILD TO LIVE SUMMARY */}
      <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 md:p-8">
        <h3 className="section-eyebrow text-white mb-6">BUILD TO LIVE SUMMARY</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Total Project Cost</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-white">₹1.35 Cr*</div>
            <div className="text-[10px] text-on-surface-variant">Land + Construction</div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Constructed Area (Est.)</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-white">2200 sq.ft</div>
            <div className="text-[10px] text-on-surface-variant">Built-up Area</div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Construction Time</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-white">8 - 10 Months</div>
            <div className="text-[10px] text-on-surface-variant">From booking</div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Estimated Home Value</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-white">₹2.40 - ₹2.70 Cr</div>
            <div className="text-[10px] text-on-surface-variant">In 5 Years</div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="section-eyebrow !text-on-surface-variant mb-1">Monthly EMI (Est.)</div>
            <div className="font-display-lg text-headline-lg-mobile md:text-headline-lg font-semibold text-primary">₹78,000*</div>
            <div className="text-[10px] text-on-surface-variant">At 8.5% Interest</div>
          </div>
        </div>
        <div className="text-[9px] text-on-surface-variant mt-6">*Prices are indicative and subject to change.</div>
      </section>

      {/* DESIGN & FLOOR PLAN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="section-eyebrow text-white">DESIGN INSPIRATION</h3>
            <span className="text-[10px] text-primary uppercase hover:underline cursor-pointer">View More Designs</span>
          </div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-3">
            <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" alt="Design" fill className="object-cover" unoptimized/>
          </div>
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-outline-variant/30 opacity-70 hover:opacity-100 cursor-pointer">
                <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80" alt="thumb" fill className="object-cover" unoptimized/>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="section-eyebrow text-white">TYPICAL FLOOR PLAN <span className="text-on-surface-variant font-normal">(2200 SQ.FT)</span></h3>
            <span className="text-[10px] text-primary uppercase hover:underline cursor-pointer">View All Plans</span>
          </div>
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1 bg-surface-container rounded-xl p-4 flex flex-col items-center justify-center">
               <div className="relative w-full h-full min-h-[150px]">
                 <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Floor Plan" fill className="object-contain opacity-80 mix-blend-screen" unoptimized/>
               </div>
               <span className="text-[9px] text-on-surface-variant uppercase font-bold tracking-widest mt-2">GROUND FLOOR</span>
            </div>
            <div className="relative flex-1 bg-surface-container rounded-xl p-4 flex flex-col items-center justify-center">
               <div className="relative w-full h-full min-h-[150px]">
                 <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" alt="Floor Plan" fill className="object-contain opacity-80 mix-blend-screen" unoptimized/>
               </div>
               <span className="text-[9px] text-on-surface-variant uppercase font-bold tracking-widest mt-2">FIRST FLOOR</span>
            </div>
          </div>
        </section>
      </div>

      {/* COST, FINANCE, LIFESTYLE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6">
          <h3 className="section-eyebrow text-white mb-6">COST BREAKDOWN <span className="text-on-surface-variant font-normal">(ESTIMATED)</span></h3>
          <div className="space-y-4 text-xs pb-4 border-b border-outline-variant/20">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Land Cost (1200 sq.ft)</span>
              <span className="text-white font-mono">₹49.9 L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Construction Cost (2200 sq.ft @ ₹2,750/sq.ft)</span>
              <span className="text-white font-mono">₹60.5 L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Approvals &amp; Documentation</span>
              <span className="text-white font-mono">₹3.5 L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Interiors &amp; Finishing (Est.)</span>
              <span className="text-white font-mono">₹12.0 L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Contingency (5%)</span>
              <span className="text-white font-mono">₹6.5 L</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-semibold text-white">Total Project Cost</span>
            <span className="font-display-lg text-body-lg font-bold text-primary">₹1.35 Cr*</span>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6">
          <h3 className="section-eyebrow text-white mb-6">EMI &amp; FINANCING ESTIMATE</h3>
          <div className="space-y-4 text-xs pb-4 border-b border-outline-variant/20">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Loan Amount (80%)</span>
              <span className="text-white font-mono">₹1.08 Cr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Interest Rate (Est.)</span>
              <span className="text-white font-mono">8.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Loan Tenure</span>
              <span className="text-white font-mono">20 Years</span>
            </div>
          </div>
          <div className="mt-4 p-3 border border-primary/40 bg-primary/10 rounded-lg flex items-center gap-3">
             <span className="material-symbols-outlined text-primary text-2xl">calculate</span>
             <div>
              <div className="text-[9px] text-primary uppercase">Estimated Monthly EMI</div>
              <div className="font-display-lg text-body-lg font-bold text-primary mt-1">₹78,000*</div>
             </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-32 h-32 opacity-20 pointer-events-none">
             <Image src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80" alt="bg" fill className="object-cover" unoptimized/>
          </div>
          <h3 className="section-eyebrow text-white mb-6 relative z-10">LIFESTYLE ADVANTAGES</h3>
          <ul className="space-y-4 text-xs text-on-surface-variant relative z-10">
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-[18px]">school</span>
              <span>Proximity to top schools &amp; colleges</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-[18px]">business_center</span>
              <span>Easy access to IT Parks &amp; Business Hubs</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-[18px]">park</span>
              <span>Peaceful environment with green spaces</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-[18px]">local_hospital</span>
              <span>Well-developed social infrastructure</span>
            </li>
            <li className="flex gap-3">
              <span className="material-symbols-outlined text-primary text-[18px]">emoji_transportation</span>
              <span>Future-ready neighborhood</span>
            </li>
          </ul>
        </section>
      </div>

      {/* RECOMMENDED FOR YOU STRIP */}
      <section>
        <div className="flex justify-between items-center mb-4 text-xs">
          <h3 className="font-label-md uppercase tracking-widest font-bold text-white">RECOMMENDED FOR YOU</h3>
          <span className="text-primary hover:underline cursor-pointer">View All Recommendations &rarr;</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {[
            { tag: "ARCHITECT PARTNERS", title: "Top Architects", desc: "Design your dream home with trusted partners.", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80" },
            { tag: "CONSTRUCTION PARTNERS", title: "Premium Builders", desc: "Quality construction with on-time delivery.", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80" },
            { tag: "INTERIOR PARTNERS", title: "Interior Design", desc: "Turnkey interiors tailored to your taste.", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" },
            { tag: "HOME LOAN PARTNERS", title: "Best Home Loans", desc: "Get the best rates from leading banks & NBFCs.", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80" },
            { tag: "LEGAL SUPPORT", title: "End-to-End Support", desc: "Approvals, documentation & legal assistance.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80" }
          ].map((item, idx) => (
            <div key={idx} className="relative w-64 h-32 rounded-xl overflow-hidden shrink-0 group cursor-pointer border border-outline-variant/20">
              <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized/>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
              <span className="absolute top-2 left-2 bg-black/60 border border-primary/40 text-primary text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded backdrop-blur-md">{item.tag}</span>
              <div className="absolute bottom-2 left-3 right-3 text-white">
                <div className="font-semibold text-xs">{item.title}</div>
                <div className="text-[10px] text-on-surface-variant mt-1 leading-tight">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-surface-container-lowest border border-primary/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined">headset_mic</span>
          </div>
          <div>
            <h4 className="text-white font-semibold">Ready to build your dream home?</h4>
            <p className="text-xs text-on-surface-variant mt-1">Talk to our experts for a personalized plan and cost estimate.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-on-primary font-bold text-xs rounded-lg transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Schedule a Call
          </button>
          <button className="px-5 py-2.5 bg-surface-container border border-outline-variant/30 text-white hover:border-primary/50 font-bold text-xs rounded-lg transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Chat on WhatsApp
          </button>
        </div>
      </section>

    </div>
  );
}

// ────────────────────────────────────────────────────────
// LAND INVESTMENT VIEW COMPONENTS
// ────────────────────────────────────────────────────────
function LandInvestmentView({ isUnlocked, onUnlockClick, simAmount, setSimAmount }: any) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* SNAPSHOT */}
      <div className="grid grid-cols-1 gap-6">
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden">
          {!isUnlocked && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
               <span className="material-symbols-outlined text-primary text-3xl mb-2">lock</span>
               <h4 className="text-white font-bold mb-2">Unlock full insights</h4>
               <p className="text-[11px] text-on-surface-variant mb-4">Sign in to view institutional evaluation scores and exact returns.</p>
               <button onClick={onUnlockClick} className="bg-primary/20 text-primary border border-primary/40 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors">Sign In To View</button>
             </div>
          )}
          <div className="flex justify-between items-center mb-6">
             <h3 className="section-eyebrow text-white">INVESTMENT SNAPSHOT</h3>
             {!isUnlocked && <span className="text-[10px] text-primary flex items-center gap-1 cursor-pointer" onClick={onUnlockClick}><span className="material-symbols-outlined text-[14px]">lock</span> Unlock for full insights</span>}
          </div>
          <div className="grid grid-cols-3 gap-4 pb-6 border-b border-outline-variant/20">
            <div>
              <div className="section-eyebrow !text-on-surface-variant mb-1">Starting Price</div>
              <div className="font-display-lg text-headline-lg-mobile font-bold text-white">₹49.9 Lakhs*</div>
              <div className="text-[10px] text-on-surface-variant">Per 1200 sq.ft Plot</div>
            </div>
            <div>
              <div className="section-eyebrow !text-on-surface-variant mb-1">Expected Appreciation</div>
              <div className="font-display-lg text-headline-lg-mobile font-bold text-white">2.2x - 2.6x</div>
              <div className="text-[10px] text-on-surface-variant">in 5 Years</div>
            </div>
            <div>
              <div className="section-eyebrow !text-on-surface-variant mb-1">Projected CAGR</div>
              <div className="font-display-lg text-headline-lg-mobile font-bold text-white">22% - 26%</div>
              <div className="text-[10px] text-on-surface-variant">per annum</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div>
              <div className="section-eyebrow !text-on-surface-variant mb-1">Investment Horizon</div>
              <div className="text-sm font-bold text-white">3 - 5 Years</div>
            </div>
            <div>
              <div className="section-eyebrow !text-on-surface-variant mb-1">Risk Profile</div>
              <div className="text-sm font-bold text-amber-400 flex items-center gap-1">Medium <div className="flex gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"/><div className="w-1.5 h-1.5 rounded-full bg-amber-400"/><div className="w-1.5 h-1.5 rounded-full bg-surface-container"/></div></div>
            </div>
            <div>
              <div className="section-eyebrow !text-on-surface-variant mb-1">Liquidity Score</div>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">High <div className="flex gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/></div></div>
            </div>
            <div>
              <div className="section-eyebrow !text-on-surface-variant mb-1">Exit Potential</div>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">Very High <div className="flex gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/></div></div>
            </div>
          </div>
          <div className="text-[9px] text-on-surface-variant mt-6">*Prices are indicative and subject to change</div>
        </section>


      </div>

      {/* INTELLIGENCE, COMPARABLES, DILIGENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden flex flex-col">
          {!isUnlocked && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
               <span className="material-symbols-outlined text-primary text-3xl mb-2">lock</span>
               <button onClick={onUnlockClick} className="bg-primary/20 text-primary border border-primary/40 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors mt-2">Unlock Location Report</button>
             </div>
          )}
          <div className="flex justify-between items-center mb-6">
             <h3 className="section-eyebrow text-white">LOCATION INTELLIGENCE</h3>
             {!isUnlocked && <span className="text-[9px] text-primary flex items-center gap-1 cursor-pointer" onClick={onUnlockClick}><span className="material-symbols-outlined text-[12px]">lock</span> Unlock for full report</span>}
          </div>
          <div className="space-y-4 text-xs flex-1">
             <div className="flex justify-between">
                <span className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[16px]">flight</span> Kempegowda Airport</span>
                <span className="text-white font-mono">30 mins</span>
             </div>
             <div className="flex justify-between">
                <span className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[16px]">train</span> Metro (Phase 2 Blue Line)</span>
                <span className="text-white font-mono">20 mins</span>
             </div>
             <div className="flex justify-between">
                <span className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[16px]">train</span> Diesel Loco Shed Metro Station</span>
                <span className="text-white font-mono">15 mins</span>
             </div>
             <div className="flex justify-between">
                <span className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[16px]">business_center</span> KIADB Aerospace SEZ</span>
                <span className="text-white font-mono">25 mins</span>
             </div>
             <div className="flex justify-between">
                <span className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[16px]">school</span> Top International Schools</span>
                <span className="text-white font-mono">10 - 15 mins</span>
             </div>
             <div className="flex justify-between">
                <span className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[16px]">school</span> Colleges &amp; Universities</span>
                <span className="text-white font-mono">10 mins</span>
             </div>
          </div>
          <div className="text-center mt-6">
            <span className="text-primary text-xs font-label-md uppercase tracking-widest hover:underline cursor-pointer flex justify-center items-center gap-1">View Location Map &rarr;</span>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden flex flex-col">
          {!isUnlocked && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
               <span className="material-symbols-outlined text-primary text-3xl mb-2">lock</span>
               <button onClick={onUnlockClick} className="bg-primary/20 text-primary border border-primary/40 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors mt-2">Unlock Sales Data</button>
             </div>
          )}
          <div className="flex justify-between items-center mb-6">
             <h3 className="section-eyebrow text-white">COMPARABLE SALES</h3>
             {!isUnlocked && <span className="text-[9px] text-primary flex items-center gap-1 cursor-pointer" onClick={onUnlockClick}><span className="material-symbols-outlined text-[12px]">lock</span> Unlock for full data</span>}
          </div>
          <div className="flex-1 text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="section-eyebrow !text-on-surface-variant border-b border-outline-variant/30">
                  <th className="pb-3 font-normal">Project / Area</th>
                  <th className="pb-3 font-normal">Last 6 Months</th>
                  <th className="pb-3 font-normal text-right">Rate (₹/sq.ft)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr>
                  <td className="py-3 text-white">Same Corridor Avg.</td>
                  <td className="py-3 text-on-surface-variant font-mono">18 Sales</td>
                  <td className="py-3 text-right text-white font-mono">₹3,800</td>
                </tr>
                <tr>
                  <td className="py-3 text-white">Rajanekunte Layout</td>
                  <td className="py-3 text-on-surface-variant font-mono">12 Sales</td>
                  <td className="py-3 text-right text-white font-mono">₹3,950</td>
                </tr>
                <tr>
                  <td className="py-3 text-white">Yelahanka New Town</td>
                  <td className="py-3 text-on-surface-variant font-mono">25 Sales</td>
                  <td className="py-3 text-right text-white font-mono">₹4,250</td>
                </tr>
                <tr>
                  <td className="py-3 text-white">Devanahalli Zone</td>
                  <td className="py-3 text-on-surface-variant font-mono">20 Sales</td>
                  <td className="py-3 text-right text-white font-mono">₹3,600</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <span className="text-primary text-xs font-label-md uppercase tracking-widest hover:underline cursor-pointer flex justify-center items-center gap-1">View All Comparables &rarr;</span>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden flex flex-col">
          {!isUnlocked && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
               <span className="material-symbols-outlined text-primary text-3xl mb-2">lock</span>
               <button onClick={onUnlockClick} className="bg-primary/20 text-primary border border-primary/40 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors mt-2">Unlock Legal Docs</button>
             </div>
          )}
          <div className="flex justify-between items-center mb-6">
             <h3 className="section-eyebrow text-white">LEGAL &amp; DUE DILIGENCE</h3>
             {!isUnlocked && <span className="text-[9px] text-primary flex items-center gap-1 cursor-pointer" onClick={onUnlockClick}><span className="material-symbols-outlined text-[12px]">lock</span> Unlock for documents</span>}
          </div>
          <div className="space-y-4 text-xs flex-1">
             <div className="flex justify-between items-center bg-surface-container p-2.5 rounded-lg border border-outline-variant/20">
                <span className="flex items-center gap-2 text-white"><span className="material-symbols-outlined text-on-surface-variant text-[16px]">assignment</span> A-Khata Title</span>
                <span className="text-emerald-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Verified</span>
             </div>
             <div className="flex justify-between items-center bg-surface-container p-2.5 rounded-lg border border-outline-variant/20">
                <span className="flex items-center gap-2 text-white"><span className="material-symbols-outlined text-on-surface-variant text-[16px]">map</span> BMRDA Approved Layout</span>
                <span className="text-emerald-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Verified</span>
             </div>
             <div className="flex justify-between items-center bg-surface-container p-2.5 rounded-lg border border-outline-variant/20">
                <span className="flex items-center gap-2 text-white"><span className="material-symbols-outlined text-on-surface-variant text-[16px]">verified_user</span> Encumbrance Certificate</span>
                <span className="text-emerald-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Verified</span>
             </div>
             <div className="flex justify-between items-center bg-surface-container p-2.5 rounded-lg border border-outline-variant/20">
                <span className="flex items-center gap-2 text-white"><span className="material-symbols-outlined text-on-surface-variant text-[16px]">gavel</span> DC Conversion</span>
                <span className="text-emerald-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Verified</span>
             </div>
             <div className="flex justify-between items-center bg-surface-container p-2.5 rounded-lg border border-outline-variant/20">
                <span className="flex items-center gap-2 text-white"><span className="material-symbols-outlined text-on-surface-variant text-[16px]">receipt_long</span> Tax Paid Receipts</span>
                <span className="text-emerald-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Verified</span>
             </div>
          </div>
          <div className="text-center mt-4">
            <span className="text-primary text-xs font-label-md uppercase tracking-widest hover:underline cursor-pointer flex justify-center items-center gap-1">View All Documents &rarr;</span>
          </div>
        </section>
      </div>

      {/* SIMULATOR & CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          {!isUnlocked && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
               <span className="material-symbols-outlined text-primary text-3xl mb-2">lock</span>
               <button onClick={onUnlockClick} className="bg-primary/20 text-primary border border-primary/40 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors mt-2">Unlock to run scenarios</button>
             </div>
          )}
          <div className="flex justify-between items-center mb-6">
             <h3 className="section-eyebrow text-white">INVESTMENT SIMULATOR</h3>
             {!isUnlocked && <span className="text-[9px] text-primary flex items-center gap-1 cursor-pointer" onClick={onUnlockClick}><span className="material-symbols-outlined text-[12px]">lock</span> Unlock to run scenarios</span>}
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 w-full space-y-4">
               <div>
                  <div className="section-eyebrow !text-on-surface-variant mb-1">Estimated Investment (All Inclusive)</div>
                  <div className="font-display-lg text-headline-lg font-bold text-white">₹{simAmount.toFixed(1)} Lakhs</div>
               </div>
               <div>
                  <input
                    type="range"
                    min={40}
                    max={100}
                    step={1}
                    value={simAmount}
                    onChange={(e) => setSimAmount(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-surface-container rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant mt-2 font-mono">
                    <span>40L</span>
                    <span>{simAmount}L</span>
                    <span>1Cr+</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 w-full flex gap-4">
               <div className="flex-1 bg-surface-container p-4 rounded-xl border border-outline-variant/20">
                 <div className="section-eyebrow !text-on-surface-variant mb-1">Projected Returns</div>
                 <div className="font-display-lg text-body-lg font-bold text-white">₹70L - ₹74L</div>
                 <div className="text-[10px] text-on-surface-variant">in 5 Years</div>
               </div>
               <div className="w-24 bg-surface-container p-4 rounded-xl border border-outline-variant/20 flex flex-col justify-center">
                 <div className="section-eyebrow !text-on-surface-variant mb-1">IRR</div>
                 <div className="font-display-lg text-body-lg font-bold text-white">24% - 28%</div>
               </div>
            </div>
          </div>

          <button className="w-full mt-6 py-3 border border-primary/50 text-primary hover:bg-primary/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            Run Detailed Simulation
          </button>
        </section>

        <section className="bg-surface-container-lowest border border-primary/30 rounded-2xl p-6 flex flex-col justify-between">
          <div>
             <h3 className="section-eyebrow text-white mb-6">READY TO EXPLORE FURTHER?</h3>
             <ul className="space-y-3 text-xs text-on-surface-variant">
               <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[16px]">check_circle</span> Unlock detailed reports &amp; legal documents</li>
               <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[16px]">check_circle</span> Access full projection models</li>
               <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[16px]">check_circle</span> Save this property to your dashboard</li>
               <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[16px]">check_circle</span> Get expert guidance from our team</li>
             </ul>
          </div>
          <div className="mt-6">
             <button onClick={onUnlockClick} className="w-full py-3.5 bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-on-primary font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
               <span className="material-symbols-outlined text-[18px]">lock_open</span>
               Create Your Free Account
             </button>
             <div className="text-center text-[9px] text-on-surface-variant mt-2">It only takes 30 seconds.</div>
          </div>
        </section>
      </div>

    </div>
  );
}
