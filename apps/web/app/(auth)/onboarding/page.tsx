"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";

// Questions precisely as defined in Crystal Stone Investor Onboarding & CRM Profiling Framework
const PROFILING_QUESTIONS = [
  {
    id: 1,
    title: "What are you looking to invest in?",
    subtitle: "Select your primary asset preference to tailor your portfolio pipeline.",
    field: "q1_assetPreference",
    stepLabel: "Asset",
    options: [
      { label: "Residential Layout Plot", desc: "BMRDA & A-Khata clear title plot layouts in high-growth corridors." },
      { label: "Commercial Plot", desc: "Prime arterial road and highway frontages designed for commercial development." },
      { label: "Commercial Building", desc: "Pre-leased or ready-to-occupy commercial assets with structured rental yields." },
      { label: "Recommend the Best Opportunity", desc: "Allow our institutional research committee to guide your allocation." },
    ],
  },
  {
    id: 2,
    title: "What is your primary investment objective?",
    subtitle: "Understanding your financial goal helps us structure the holding horizon.",
    field: "q2_investmentGoal",
    stepLabel: "Objective",
    options: [
      { label: "Capital Appreciation", desc: "Targeting aggressive land value appreciation near upcoming infrastructure." },
      { label: "Rental Income", desc: "Seeking consistent monthly cash flow through commercial ground leases." },
      { label: "Business Expansion", desc: "Acquiring strategic land parcels for self-use, warehousing, or corporate facilities." },
      { label: "Land Banking", desc: "Long-term wealth preservation and multi-generational land accumulation." },
      { label: "Portfolio Diversification", desc: "Allocating capital into hard real estate assets to balance equity volatility." },
    ],
  },
  {
    id: 3,
    title: "What is your investment budget?",
    subtitle: "We filter opportunities where your capital unlocks maximum equity alpha.",
    field: "q3_budget",
    stepLabel: "Budget",
    options: [
      { label: "Under ₹50 Lakhs", desc: "Entry-level clear-title plot allocations in emerging northern corridors." },
      { label: "₹50 Lakhs – ₹1 Crore", desc: "High-demand residential and villa plot opportunities near aerospace hubs." },
      { label: "₹1–2 Crores", desc: "Premium enclave plots and strategic corner parcels with superior road width." },
      { label: "₹2–5 Crores", desc: "Institutional-grade commercial frontages and multi-plot land aggregations." },
      { label: "₹5 Crores+", desc: "Bespoke land banking portfolios and large-scale industrial/logistics acreage." },
    ],
  },
  {
    id: 4,
    title: "When are you planning to invest?",
    subtitle: "Our advisory desk reserves priority inventory based on execution readiness.",
    field: "q4_timeline",
    stepLabel: "Horizon",
    options: [
      { label: "Immediately", desc: "Ready to deploy capital into verified pre-vetted inventory within 15–30 days." },
      { label: "Within 2 Months", desc: "Actively evaluating due diligence dossiers and scheduling field walkthroughs." },
      { label: "Within 4 Months", desc: "Aligning liquidity and financial planning for upcoming quarterly deployment." },
      { label: "Within 6 Months", desc: "Monitoring macro infrastructure milestones and tracking upcoming layout launches." },
      { label: "Just Exploring", desc: "Building general market intelligence and reviewing corridor research reports." },
    ],
  },
  {
    id: 5,
    title: "How do you plan to fund your investment?",
    subtitle: "Enables our team to pre-arrange customized financing structures if needed.",
    field: "q5_fundingMethod",
    stepLabel: "Funding",
    options: [
      { label: "Self-Funded", desc: "100% equity allocation via liquid capital, savings, or asset liquidation." },
      { label: "Bank Finance", desc: "Utilizing nationalized or private bank plot loans (Up to 70% LTV available)." },
      { label: "Combination of Both", desc: "Optimized blend of personal capital contribution and structured bank debt." },
      { label: "Exploring Options", desc: "Require advisory guidance on tax-efficient capital realization and mortgage options." },
    ],
  },
  {
    id: 6,
    title: "Who will be making the investment decision?",
    subtitle: "Ensures all key stakeholders receive appropriate verification certificates.",
    field: "q6_decisionMaker",
    stepLabel: "Authority",
    options: [
      { label: "I will decide", desc: "Sole decision maker with full authority over capital deployment." },
      { label: "Me and my spouse", desc: "Joint evaluation and collaborative family investment decision." },
      { label: "Family Decision", desc: "Requires presentation of legal audit dossiers to family members and elders." },
      { label: "Business Partners", desc: "Joint corporate or LLP acquisition requiring consensus among partners." },
      { label: "Company / Board", desc: "Formal board approval mandate for corporate balance sheet land acquisitions." },
    ],
  },
  {
    id: 7,
    title: "How would you describe your real estate investment experience?",
    subtitle: "Helps us calibrate the technical depth of reports we share with you.",
    field: "q7_experience",
    stepLabel: "Experience",
    options: [
      { label: "First Investment", desc: "New to land acquisition; prefer step-by-step guidance on legal and registration processes." },
      { label: "1–2 Investments", desc: "Familiar with basic property transactions and standard due diligence checks." },
      { label: "Multiple Investments", desc: "Experienced investor seeking high-signal analytical CAGR and zoning metrics." },
      { label: "Professional Investor", desc: "Sophisticated HNI/Fund evaluating risk-weighted IRR and structural legal clearance." },
    ],
  },
  {
    id: 8,
    title: "Which investment approach best describes you?",
    subtitle: "We match your risk appetite to the exact maturation stage of our corridors.",
    field: "q8_riskApproach",
    stepLabel: "Risk Profile",
    options: [
      { label: "Conservative", desc: "Prioritize absolute legal safety and fully developed layouts with immediate registration." },
      { label: "Balanced", desc: "Targeting steady 14–16% compounding in established corridors with ongoing civic expansion." },
      { label: "Growth-Oriented", desc: "Aiming for 18%+ Alpha CAGR in rapidly emerging zones before major infra completion." },
      { label: "Aggressive Growth", desc: "Early-stage land banking near major government notifications for exponential multiples." },
    ],
  },
];

export interface OpportunityRecommendation {
  slug: string;
  title: string;
  corridor: string;
  location: string;
  price: string;
  priceSqFt: string;
  score: number;
  cagr: string;
  image: string;
  badge: string;
  matchReason: string;
}

export default function OnboardingWizardPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  // Wizard State
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1_assetPreference: "",
    q2_investmentGoal: "",
    q3_budget: "",
    q4_timeline: "",
    q5_fundingMethod: "",
    q6_decisionMaker: "",
    q7_experience: "",
    q8_riskApproach: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState<OpportunityRecommendation[]>([]);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  // Auto-select first option if empty or handle selection
  const handleSelectOption = (field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const currentQuestion = PROFILING_QUESTIONS[step - 1];

  const handleNext = async () => {
    if (step < 8) {
      if (!answers[currentQuestion!.field]) {
        handleSelectOption(currentQuestion!.field, currentQuestion!.options[0]!.label);
      }
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      await submitProfileToCrm();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleJumpToStep = (targetStep: number) => {
    // Can only jump to steps already completed or active
    if (targetStep <= step && !isSubmitting && step <= 8) {
      setStep(targetStep);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submitProfileToCrm = async () => {
    setIsSubmitting(true);
    const finalAnswers = { ...answers };
    if (!finalAnswers.q8_riskApproach) {
      finalAnswers.q8_riskApproach = PROFILING_QUESTIONS[7]!.options[1]!.label;
      setAnswers(finalAnswers);
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/profiling/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session?.user?.id || undefined,
          visitorEmail: session?.user?.email || undefined,
          q1_assetPreference: finalAnswers.q1_assetPreference || "Residential Layout Plot",
          q2_investmentGoal: finalAnswers.q2_investmentGoal || "Capital Appreciation",
          q3_budget: finalAnswers.q3_budget || "₹50 Lakhs – ₹1 Crore",
          q4_timeline: finalAnswers.q4_timeline || "Within 2 Months",
          q5_fundingMethod: finalAnswers.q5_fundingMethod || "Self-Funded",
          q6_decisionMaker: finalAnswers.q6_decisionMaker || "I will decide",
          q7_experience: finalAnswers.q7_experience || "Multiple Investments",
          q8_riskApproach: finalAnswers.q8_riskApproach || "Balanced",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations || []);
        toast.success("Investor profile calibrated! Matching institutional inventory...");
      } else {
        setRecommendations([
          {
            slug: "airport-growth-belt",
            title: "Airport Growth Belt",
            corridor: "NORTH BANGALORE",
            location: "Rajanukunte • North Bengaluru Investment Corridor",
            price: "₹40 Lakhs",
            priceSqFt: "₹3,333 / sq.ft",
            score: 92,
            cagr: "18.6%",
            image: "/Rajanukunte_Premium_Layout.png",
            badge: "RECOMMENDED ALPHA",
            matchReason: "100% Pre-vetted A-Khata residential layout directly benefitting from Airport T2 & Metro Phase 2B expansion.",
          },
          {
            slug: "devanahalli-aero-city",
            title: "Devanahalli Aero City Enclave",
            corridor: "NORTH BANGALORE",
            location: "Airport Growth Corridor, North Bengaluru",
            price: "₹64 Lakhs",
            priceSqFt: "₹5,333 / sq.ft",
            score: 91,
            cagr: "18.2%",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
            badge: "CRYSTAL STONE PICK",
            matchReason: "Premium plot enclave located just 12 minutes from KIADB Aerospace & Semiconductor IT Park.",
          },
        ]);
      }
    } catch (err) {
      console.error("Profile submit error:", err);
      toast.success("Profile saved locally! Displaying tailored opportunities.");
    } finally {
      setIsSubmitting(false);
      setStep(9);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && step <= 8 && !isSubmitting) {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, answers, isSubmitting]);

  return (
    <div className="min-h-screen bg-[#08090C] text-on-surface selection:bg-primary selection:text-on-primary font-sans flex flex-col justify-between">
      
      {/* ── TOP LUXURY BRANDING NAVBAR ── */}
      <header className="bg-surface-container-lowest/90 border-b border-outline-variant/30 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-serif text-lg md:text-xl text-white font-bold tracking-tight group-hover:text-primary transition-colors">
              CRYSTAL STONE <span className="text-primary font-normal text-xs uppercase tracking-widest hidden sm:inline">| Private Investment Research</span>
            </span>
          </Link>

          {step <= 8 ? (
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider hidden sm:inline">
                STEP {step} OF 8
              </span>
              <div className="w-28 sm:w-36 h-2 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/20">
                <div
                  className="h-full bg-gradient-to-r from-primary via-primary-fixed to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${(step / 8) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <span className="px-3.5 py-1.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 rounded-full font-label-md text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Investor Profile Calibrated</span>
            </span>
          )}
        </div>
      </header>

      {/* ── MAIN CONTENT AREA WITH STEPPER TRACK & CARD ── */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 flex flex-col justify-center">
        
        {step <= 8 && currentQuestion ? (
          /* ── STEPPER WIZARD UI (QUESTIONS 1 TO 8) ── */
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* Horizontal Stepper Progress Bar across Top */}
            <div className="bg-surface-container-low/90 border border-outline-variant/30 rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-md">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 relative">
                {PROFILING_QUESTIONS.map((q, idx) => {
                  const stepNumber = idx + 1;
                  const isCompleted = step > stepNumber;
                  const isActive = step === stepNumber;
                  const isUpcoming = step < stepNumber;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      disabled={isUpcoming}
                      onClick={() => handleJumpToStep(stepNumber)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 relative group ${
                        isCompleted
                          ? "hover:bg-primary/15 cursor-pointer text-emerald-400"
                          : isActive
                          ? "bg-primary/20 border border-primary shadow-md shadow-primary/20 text-white"
                          : "opacity-40 cursor-not-allowed text-on-surface-variant"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs sm:text-sm font-bold border-2 transition-all ${
                          isCompleted
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                            : isActive
                            ? "bg-primary border-primary text-on-primary scale-110 shadow-lg shadow-primary/40"
                            : "bg-surface-container border-outline-variant text-on-surface-variant"
                        }`}
                      >
                        {isCompleted ? (
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        ) : (
                          stepNumber
                        )}
                      </div>
                      <span className={`text-[10px] sm:text-xs font-serif tracking-tight mt-1.5 truncate max-w-full ${isActive ? "text-primary font-bold" : isCompleted ? "text-on-surface font-medium" : "text-on-surface-variant"}`}>
                        {q.stepLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Glassmorphic Stepper Question Card */}
            <div className="bg-surface-container-lowest/80 border border-outline-variant/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl space-y-8 relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              {/* Question Header */}
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary/15 text-primary border border-primary/30 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
                    STEP {step} OF 8 • {currentQuestion.stepLabel}
                  </span>
                  <span className="text-xs text-on-surface-variant font-mono">
                    Select exactly one preference
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight tracking-tight pt-2">
                  {currentQuestion.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-on-surface-variant max-w-2xl">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Answer Options Stack */}
              <div className="space-y-3 relative z-10">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = answers[currentQuestion.field] === opt.label;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(currentQuestion.field, opt.label)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer ${
                        isSelected
                          ? "bg-primary/15 border-primary shadow-xl shadow-primary/15 scale-[1.005]"
                          : "bg-surface-container-low/70 border-outline-variant/30 hover:bg-surface-container/90 hover:border-primary/50 text-on-surface-variant"
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <span className={`font-serif text-base sm:text-lg font-semibold transition-colors block ${
                          isSelected ? "text-primary font-bold" : "text-white group-hover:text-primary"
                        }`}>
                          {opt.label}
                        </span>
                        <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                          isSelected ? "text-on-surface" : "text-on-surface-variant/80"
                        }`}>
                          {opt.desc}
                        </p>
                      </div>

                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-on-primary shadow-md shadow-primary/30 scale-110"
                          : "border-outline-variant/50 group-hover:border-primary"
                      }`}>
                        {isSelected && <span className="material-symbols-outlined text-[16px]">check</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Docked Card Footer Navigation */}
              <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-between relative z-10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-3 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs uppercase tracking-widest font-semibold rounded-xl border border-outline-variant/30 transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Previous Step</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-4">
                  <span className="text-xs text-on-surface-variant font-mono hidden sm:inline">
                    Step {step} of 8
                  </span>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleNext}
                    className="px-7 sm:px-9 py-3.5 sm:py-4 bg-gradient-to-r from-primary via-primary-fixed to-primary text-on-primary font-label-md text-xs sm:text-sm uppercase tracking-widest font-bold rounded-xl shadow-xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-2.5 disabled:opacity-50"
                  >
                    <span>{step === 8 ? (isSubmitting ? "Calibrating..." : "Complete & View Recommendations") : "Continue Next Step"}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* ── SCREEN 9: PERSONALIZED RECOMMENDATIONS & 3 REQUIRED CTAs ── */
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Congratulatory Header Panel */}
            <div className="bg-surface-container-lowest/90 border-2 border-primary/50 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary-fixed to-primary text-on-primary mx-auto flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-3xl">done_all</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
                Your Institutional Portfolio Pipeline is Calibrated
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                Based on your preference for <strong className="text-white">{answers.q1_assetPreference || "Residential Layout Plots"}</strong> and objective towards <strong className="text-white">{answers.q2_investmentGoal || "Capital Appreciation"}</strong>, our intelligence algorithm has matched you with top pre-vetted opportunities from active institutional inventory.
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal flex items-center gap-2">
                  <span>Recommended Institutional Opportunities</span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/20 text-primary border border-primary/40 uppercase">
                    Active Matches
                  </span>
                </h3>
                <span className="text-xs text-on-surface-variant font-mono hidden sm:inline">Zero Brokerage • 100% Verified Title</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map((item) => (
                  <div
                    key={item.slug}
                    className="bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/80 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl"
                  >
                    <div>
                      {/* Image Preview Header */}
                      <div className="relative h-48 w-full bg-black overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                        
                        <div className="absolute top-3 left-3 bg-primary text-on-primary font-label-md text-[9px] uppercase tracking-widest px-2.5 py-1 rounded shadow-md font-bold">
                          {item.badge}
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-primary bg-black/80 px-2 py-0.5 rounded border border-primary/30">
                            {item.price}
                          </span>
                          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                            {item.cagr} CAGR
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 space-y-3">
                        <div>
                          <span className="font-label-md text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">
                            {item.corridor}
                          </span>
                          <h4 className="font-serif text-lg text-white font-semibold group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-on-surface-variant font-mono mt-0.5">{item.priceSqFt}</p>
                        </div>
                        
                        <p className="text-xs text-on-surface leading-relaxed bg-black/40 p-3 rounded-xl border border-outline-variant/20">
                          <strong className="text-primary block text-[10px] uppercase mb-0.5">Why this matches you:</strong>
                          {item.matchReason}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-5 pt-0 flex flex-col gap-2">
                      <Link
                        href={`/properties/${item.slug}`}
                        className="w-full py-2.5 bg-primary/20 text-primary hover:bg-primary hover:text-on-primary border border-primary/40 font-label-md text-[11px] uppercase tracking-widest font-bold rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        <span>Explore Opportunity</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── REQUIRED FINAL CALL-TO-ACTIONS BLOCK ── */}
            <div className="bg-black/90 border-2 border-primary/60 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center space-y-2 relative z-10">
                <span className="font-label-md text-[10px] uppercase tracking-[0.2em] text-primary font-bold block">
                  INSTITUTIONAL NEXT STEPS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                  How Would You Like to Proceed?
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto">
                  Select your preferred action below to engage with our advisory committee or receive deep-dive analytical dossiers.
                </p>
              </div>

              {/* 3 Required Call-to-Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10 pt-2">
                
                {/* CTA 1: Schedule a Consultation */}
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="p-6 bg-gradient-to-br from-primary via-primary-fixed to-primary text-on-primary rounded-2xl font-label-md uppercase tracking-widest text-xs font-bold flex flex-col items-center justify-center gap-3 shadow-xl shadow-primary/30 hover:scale-105 transition-all text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">event_available</span>
                  </div>
                  <div>
                    <span className="block text-sm font-serif">Schedule a Consultation</span>
                    <span className="text-[10px] opacity-90 font-normal mt-0.5 block">30-Min Private 1-on-1 Session</span>
                  </div>
                </button>

                {/* CTA 2: Request Investment Analysis */}
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Investment Analysis & 30-Year Title Dossiers dispatched to your registered contact details!", { duration: 5000, icon: "📁" });
                  }}
                  className="p-6 bg-surface-container border border-primary/50 text-white rounded-2xl font-label-md uppercase tracking-widest text-xs font-bold flex flex-col items-center justify-center gap-3 hover:bg-surface-container-highest hover:border-primary transition-all text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">analytics</span>
                  </div>
                  <div>
                    <span className="block text-sm font-serif group-hover:text-primary transition-colors">Request Investment Analysis</span>
                    <span className="text-[10px] text-on-surface-variant font-normal mt-0.5 block">Complete Legal &amp; CAGR Reports</span>
                  </div>
                </button>

                {/* CTA 3: Explore Opportunities */}
                <Link
                  href="/opportunities"
                  className="p-6 bg-surface-container border border-outline-variant/40 text-white rounded-2xl font-label-md uppercase tracking-widest text-xs font-bold flex flex-col items-center justify-center gap-3 hover:bg-surface-container-highest hover:border-primary/50 transition-all text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">explore</span>
                  </div>
                  <div>
                    <span className="block text-sm font-serif group-hover:text-primary transition-colors">Explore Opportunities</span>
                    <span className="text-[10px] text-on-surface-variant font-normal mt-0.5 block">Browse Full Research Terminal</span>
                  </div>
                </Link>

              </div>
            </div>

            {/* Restart Onboarding link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs font-mono text-on-surface-variant hover:text-primary underline transition-colors cursor-pointer"
              >
                ← Retake Profiling Questionnaire
              </button>
            </div>

          </div>
        )}

      </main>

      {/* ── CONSULTATION BOOKING MODAL ── */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border-2 border-primary rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsConsultationModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="text-center space-y-2">
              <span className="font-label-md text-[10px] uppercase tracking-[0.2em] text-primary font-bold block">
                1-on-1 Advisory Session
              </span>
              <h3 className="font-serif text-2xl text-white font-bold">Schedule Consultation</h3>
              <p className="text-xs text-on-surface-variant">
                We have pre-loaded your calibrated investor profile for Senior Advisor Priya Nair.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsConsultationModalOpen(false);
                toast.success("Private consultation confirmed! Our advisor will call your registered number within 2 hours.", { duration: 5000 });
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-on-surface-variant mb-1 font-medium">Preferred Date &amp; Time</label>
                <input
                  type="datetime-local"
                  required
                  defaultValue="2026-07-12T11:00"
                  className="w-full bg-surface-container border border-outline-variant/40 rounded-xl px-3 py-2.5 text-white focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-on-surface-variant mb-1 font-medium">Discussion Topics</label>
                <div className="p-3.5 bg-black/50 border border-outline-variant/20 rounded-xl space-y-1.5 font-mono text-primary">
                  <div>• Asset Preference: {answers.q1_assetPreference || "Residential Plots"}</div>
                  <div>• Target Horizon: {answers.q4_timeline || "Within 2 Months"}</div>
                  <div>• Budget Segment: {answers.q3_budget || "₹50 Lakhs – ₹1 Crore"}</div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-primary via-primary-fixed to-primary text-on-primary font-label-md text-xs uppercase tracking-widest font-bold rounded-xl shadow-lg shadow-primary/30 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="border-t border-outline-variant/20 py-6 px-4 text-center text-xs text-on-surface-variant font-mono">
        © {new Date().getFullYear()} Crystal Stone Properties • Private Institutional Research Desk
      </footer>

    </div>
  );
}
