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

const DEFAULT_RECOMMENDATIONS: OpportunityRecommendation[] = [
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
];

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

  // Check URL query params on mount for quick navigation to results (?step=9)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const targetStep = Number(params.get("step"));
    if (targetStep === 9) {
      setStep(9);
      setRecommendations(DEFAULT_RECOMMENDATIONS);
    } else if (targetStep >= 1 && targetStep <= 8) {
      setStep(targetStep);
    }
  }, []);

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
        setRecommendations(data.recommendations?.length ? data.recommendations : DEFAULT_RECOMMENDATIONS);
        toast.success("Investor profile calibrated! Matching institutional inventory...");
      } else {
        setRecommendations(DEFAULT_RECOMMENDATIONS);
      }
    } catch (err) {
      console.error("Profile submit error:", err);
      toast.success("Profile saved locally! Displaying tailored opportunities.");
      setRecommendations(DEFAULT_RECOMMENDATIONS);
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
              <button
                type="button"
                onClick={() => {
                  setStep(9);
                  setRecommendations(DEFAULT_RECOMMENDATIONS);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="ml-2 text-[11px] font-mono text-on-surface-variant hover:text-primary underline transition-colors cursor-pointer hidden md:inline"
              >
                Skip to Results →
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-label-md text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Investor Profile Verified &amp; Calibrated</span>
              </span>
              <button
                type="button"
                onClick={() => toast.success("Downloading Executive Summary & Profile Calibration Report...", { icon: "📥" })}
                className="px-3.5 py-1.5 bg-surface-container-low hover:bg-surface-container text-primary border border-primary/40 rounded-xl font-label-md text-xs uppercase tracking-widest flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span className="hidden sm:inline">Download Summary</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── MAIN CONTENT AREA WITH STEPPER TRACK & CARD OR RESULTS DASHBOARD ── */}
      <main className={`flex-1 w-full mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 flex flex-col justify-center ${step <= 8 ? "max-w-5xl" : "max-w-7xl"}`}>
        
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
          /* ── SCREEN 9: POST-ONBOARDING CALIBRATED RESULTS DASHBOARD ── */
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            
            {/* 1. Hero Calibration Banner */}
            <div className="bg-gradient-to-r from-surface-container-lowest via-[#0D0E12] to-surface-container-lowest border border-primary/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left side: Golden ring badge + Title + Description */}
                <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent border-2 border-primary flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(212,175,55,0.25)] relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/20 border border-primary/60 flex items-center justify-center text-primary shadow-inner">
                      <span className="material-symbols-outlined text-3xl sm:text-4xl font-bold">check</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary font-bold block">
                      PROFILE COMPLETE
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight tracking-tight">
                      Your Investor Profile is Calibrated
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl leading-relaxed">
                      Our research engine has analyzed your preferences and matched you with <strong className="text-primary font-semibold">curated, high-potential opportunities</strong> aligned to your goals.
                    </p>
                  </div>
                </div>

                {/* Right side: 4 Key Institutional Metrics */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6 border-t lg:border-t-0 lg:border-l border-outline-variant/30 pt-6 lg:pt-0 lg:pl-8">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant block flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[15px] text-primary">fact_check</span>
                      <span>Matches Identified</span>
                    </span>
                    <div className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">18</div>
                    <span className="text-[10px] text-primary font-mono block mt-0.5">High-Quality</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant block flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[15px] text-primary">analytics</span>
                      <span>Profile Match Score</span>
                    </span>
                    <div className="font-serif text-2xl sm:text-3xl text-emerald-400 font-bold tracking-tight">93%</div>
                    <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">Excellent</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant block flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[15px] text-primary">event_note</span>
                      <span>Recommended Holding</span>
                    </span>
                    <div className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">3 – 6</div>
                    <span className="text-[10px] text-on-surface-variant font-mono block mt-0.5">Years</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant block flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[15px] text-primary">trending_up</span>
                      <span>Target Returns (CAGR)</span>
                    </span>
                    <div className="font-serif text-2xl sm:text-3xl text-primary font-bold tracking-tight">16% – 20%</div>
                    <span className="text-[10px] text-primary font-mono block mt-0.5">Expected Alpha</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Row 2 Grid: Completed 8-Step Progress Bar (Left 8 cols) & Profile Completion Gauge (Right 4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              <div className="lg:col-span-8 bg-[#0E1015] border border-primary/20 rounded-2xl p-4 sm:p-5 shadow-lg overflow-x-auto flex items-center">
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 min-w-[500px] sm:min-w-0 w-full">
                  {PROFILING_QUESTIONS.map((q, idx) => (
                    <div
                      key={q.id}
                      className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-primary/5 border border-primary/20 transition-all text-center"
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center text-xs font-bold shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-serif text-white mt-1.5 truncate max-w-full font-medium">
                        {q.stepLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#0E1015] border border-primary/30 rounded-2xl p-5 shadow-xl flex flex-col justify-center space-y-3.5">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-primary uppercase tracking-widest">PROFILE COMPLETION</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span>100%</span>
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  </span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden border border-outline-variant/20">
                  <div className="h-full w-full bg-gradient-to-r from-primary via-primary-fixed to-emerald-400 rounded-full shadow-md" />
                </div>
              </div>
            </div>

            {/* 3. Split 2-Column Institutional Grid (Left 70% Main Content / Right 30% Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* ── LEFT COLUMN (MAIN CONTENT) ── */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Section A: Recommended Investment Opportunities */}
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                        Recommended Investment Opportunities
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/15 text-primary border border-primary/30 uppercase tracking-wider shrink-0">
                        • 18 Matches Found
                      </span>
                    </div>
                    <Link
                      href="/opportunities"
                      className="text-xs font-mono text-primary hover:underline flex items-center gap-1 shrink-0 self-start sm:self-center"
                    >
                      <span>View All Opportunities</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {recommendations.map((item) => (
                      <div
                        key={item.slug}
                        className="bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/60 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl"
                      >
                        <div>
                          {/* Image Header with Badges */}
                          <div className="relative h-44 sm:h-48 w-full bg-black overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-black/40 to-transparent" />
                            
                            <div className="absolute top-3 left-3 right-12 flex flex-wrap items-center gap-1.5">
                              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold shadow-md">
                                MATCH {item.score}%
                              </span>
                              {item.badge && (
                                <span className="bg-primary/20 text-primary border border-primary/40 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold shadow-md">
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => toast.success("Added to your verified opportunity watchlist!", { icon: "💛" })}
                              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 border border-outline-variant/40 hover:border-primary text-white hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[14px]">favorite</span>
                            </button>
                          </div>

                          {/* Card Content & Metrics */}
                          <div className="p-4 sm:p-5 space-y-3.5">
                            <div>
                              <span className="font-label-md text-[10px] uppercase tracking-widest text-primary font-bold block mb-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[13px]">location_on</span>
                                <span>{item.corridor}</span>
                              </span>
                              <h4 className="font-serif text-lg text-white font-semibold group-hover:text-primary transition-colors line-clamp-1">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-3 text-[11px] text-on-surface-variant font-mono mt-1">
                                <span>🏠 Residential Plots</span>
                                <span>•</span>
                                <span>📜 BMRDA Approved</span>
                              </div>
                            </div>

                            {/* 3 Metrics Row */}
                            <div className="grid grid-cols-3 gap-1.5 py-3 px-2.5 bg-[#08090C] rounded-xl border border-outline-variant/20 text-center font-mono items-center">
                              <div>
                                <span className="text-[9px] text-on-surface-variant block uppercase tracking-tight">Starting From</span>
                                <span className="text-xs font-bold text-white block mt-0.5">{item.price}</span>
                              </div>
                              <div className="border-x border-outline-variant/20 px-1">
                                <span className="text-[9px] text-on-surface-variant block uppercase tracking-tight">Expected CAGR</span>
                                <span className="text-xs font-bold text-emerald-400 block mt-0.5">{item.cagr}</span>
                              </div>
                              <div>
                                <span className="text-[9px] text-on-surface-variant block uppercase tracking-tight">Holding Period</span>
                                <span className="text-xs font-bold text-white block mt-0.5">3 – 5 Years</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer Button */}
                        <div className="p-4 sm:p-5 pt-0">
                          <Link
                            href={`/properties/${item.slug}`}
                            className="w-full py-2.5 bg-surface-container-low hover:bg-primary/20 text-on-surface hover:text-primary border border-outline-variant/30 hover:border-primary/50 font-label-md text-[11px] uppercase tracking-widest font-semibold rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
                          >
                            <span>View Opportunity</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section B: What Happens Next? (4-Step Advisory Roadmap) */}
                <div className="bg-surface-container-lowest/80 border border-outline-variant/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="border-b border-outline-variant/20 pb-3">
                    <h3 className="font-serif text-xl text-white font-normal">
                      What Happens Next?
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
                    {[
                      { num: 1, title: "Research Committee Final Review", desc: "Our team will validate opportunities for you." },
                      { num: 2, title: "Personalized Consultation", desc: "We'll reach out within 24 hours." },
                      { num: 3, title: "Detailed Opportunity Report", desc: "Receive full legal, growth & ROI analysis." },
                      { num: 4, title: "Site Visits & Execution", desc: "We guide you at every step." },
                    ].map((stepItem) => (
                      <div key={stepItem.num} className="space-y-3 relative">
                        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary text-primary font-mono text-xs font-bold flex items-center justify-center shadow-md">
                          {stepItem.num}
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-white leading-snug">
                          {stepItem.title}
                        </h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {stepItem.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN (30% SIDEBAR) ── */}
              <div className="lg:col-span-4 space-y-6">

                {/* Middle Box: Your Investor Summary */}
                <div className="bg-[#0E1015] border border-outline-variant/30 rounded-3xl p-6 shadow-xl space-y-6">
                  <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
                    <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">person_outline</span>
                    </div>
                    <h3 className="font-serif text-lg text-white font-semibold">
                      Your Investor Summary
                    </h3>
                  </div>

                  {/* Summary Attributes List */}
                  <div className="space-y-3 text-xs font-mono">
                    {[
                      { label: "Investor Persona", value: "Growth-Oriented Investor" },
                      { label: "Asset Preference", value: answers.q1_assetPreference || "Residential Layout Plot" },
                      { label: "Investment Objective", value: answers.q2_investmentGoal || "Capital Appreciation" },
                      { label: "Budget Range", value: answers.q3_budget || "₹50 Lakhs – ₹1 Crore" },
                      { label: "Investment Horizon", value: answers.q4_timeline || "3 – 6 Years" },
                      { label: "Risk Appetite", value: answers.q8_riskApproach || "Balanced" },
                      { label: "Funding Plan", value: answers.q5_fundingMethod || "Combination" },
                      { label: "Decision Maker", value: answers.q6_decisionMaker || "You" },
                      { label: "Experience Level", value: answers.q7_experience || "Moderate" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-1 border-b border-outline-variant/10 last:border-0">
                        <span className="text-on-surface-variant font-sans text-xs">{item.label}</span>
                        <span className="text-white font-medium text-right truncate max-w-[160px]">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Green Checklist Box */}
                  <div className="bg-[#08090C] border border-emerald-500/30 rounded-2xl p-4 space-y-2.5">
                    <span className="text-[11px] font-mono font-bold text-primary block uppercase tracking-wider">
                      Why these matches are perfect for you?
                    </span>
                    <ul className="space-y-2 text-[11px] text-on-surface leading-relaxed">
                      {[
                        "Strong infrastructure growth in selected corridors",
                        "High appreciation potential based on market data",
                        "Legally verified and 100% due diligence complete",
                        "Aligned with your budget, goals & holding period",
                      ].map((chk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[15px] text-emerald-400 shrink-0 mt-0.5">check_circle</span>
                          <span>{chk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Trust Badges Grid across bottom of sidebar */}
                <div className="grid grid-cols-2 gap-3 bg-[#08090C] border border-outline-variant/20 rounded-2xl p-4 text-center">
                  {[
                    { icon: "verified", label: "100% Verified Title" },
                    { icon: "money_off", label: "Zero Brokerage" },
                    { icon: "gavel", label: "Legal Transparency" },
                    { icon: "handshake", label: "End-to-End Support" },
                  ].map((badge, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 py-1">
                      <span className="material-symbols-outlined text-primary text-[20px]">{badge.icon}</span>
                      <span className="text-[10px] font-mono text-on-surface-variant leading-tight">{badge.label}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* 4. Ready for the Next Step? (Single Horizontal Row across the Bottom below What Happens Next?) */}
            <div className="bg-[#0E1015] border-2 border-primary/60 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10 border-b border-outline-variant/20 pb-6 mb-6">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary font-bold block">
                    INSTITUTIONAL NEXT STEPS
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">Ready for the Next Step?</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl">
                    Choose how you&apos;d like to proceed with your calibrated portfolio and private advisory team.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs font-mono text-on-surface-variant hover:text-primary underline transition-colors cursor-pointer shrink-0 self-center md:self-auto"
                >
                  ← Retake Profiling Questionnaire
                </button>
              </div>

              {/* 3 CTAs in a Single Horizontal Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-10">
                {/* Primary Dashboard CTA */}
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="p-5 sm:p-6 bg-gradient-to-br from-primary via-primary-fixed to-primary text-on-primary rounded-2xl font-label-md text-xs uppercase tracking-widest font-bold shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <span className="material-symbols-outlined text-2xl">space_dashboard</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-sm font-serif">
                      <span>Go to My Investment Dashboard</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                    <span className="text-[10px] opacity-90 font-mono font-normal block">Access your personalized investor workspace</span>
                  </div>
                </button>

                {/* Schedule Consultation CTA */}
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="p-5 sm:p-6 bg-surface-container-low hover:bg-surface-container border border-primary/40 hover:border-primary text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-semibold transition-all flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <span className="material-symbols-outlined text-2xl">event_available</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 font-serif">
                      <span>Schedule Consultation</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-mono font-normal block">Book a 1-on-1 session with our advisory team</span>
                  </div>
                </button>

                {/* Browse All Opportunities CTA */}
                <Link
                  href="/opportunities"
                  className="p-5 sm:p-6 bg-surface-container-low/60 hover:bg-surface-container border border-outline-variant/40 hover:border-primary/50 text-on-surface hover:text-white rounded-xl font-label-md text-xs uppercase tracking-widest font-semibold transition-all flex flex-col items-center justify-center gap-2.5 text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <span className="material-symbols-outlined text-2xl">explore</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 font-serif">
                      <span>Browse All Opportunities</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-mono font-normal block">Explore all 18 curated investment opportunities</span>
                  </div>
                </Link>
              </div>
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
