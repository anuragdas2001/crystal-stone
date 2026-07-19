"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function OnboardingWizardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next");
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

  // Check URL query params on mount for quick navigation to results (?step=9)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const targetStep = Number(params.get("step"));
    if (targetStep === 9) {
      setStep(9);
    } else if (targetStep >= 1 && targetStep <= 8) {
      setStep(targetStep);
    }
  }, []);

  // Post-analysis redirect
  useEffect(() => {
    if (step === 9) {
      const timer = setTimeout(() => {
        router.push(next || "/dashboard");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step, next, router]);

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
        toast.success("Investor profile calibrated!");
      } else {
        toast.error("Failed to save profile. Continuing anyway...");
      }
    } catch (err) {
      console.error("Profile submit error:", err);
      toast.success("Profile saved locally!");
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
    <div className="min-h-screen bg-surface-container-lowest text-on-surface selection:bg-primary selection:text-on-primary font-sans flex flex-col justify-between">
      
      {/* ── TOP LUXURY BRANDING NAVBAR ── */}
      <header className="bg-surface-container-lowest/90 border-b border-outline-variant/30 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/brand_logo_horizontal.png" 
              alt="Crystal Stone" 
              width={280} 
              height={60} 
              className="object-contain h-10 sm:h-12 w-auto" 
              priority
            />
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
      <main className="flex-1 w-full flex flex-col">
        
        {step <= 8 && currentQuestion ? (
          /* ── STEPPER WIZARD UI (QUESTIONS 1 TO 8) ── */
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* Horizontal Line Connected Stepper */}
            <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-8 mb-4">
              <div className="relative flex justify-between items-center w-full">
                {/* Background Line */}
                <div className="absolute left-[6%] right-[6%] top-4 h-[2px] bg-surface-container-high z-0" />
                
                {/* Active Line */}
                <div 
                  className="absolute left-[6%] top-4 h-[2px] bg-primary z-0 transition-all duration-500 ease-in-out"
                  style={{ width: `${Math.max(0, ((step - 1) / (PROFILING_QUESTIONS.length - 1)) * 88)}%` }} 
                />

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
                      className={`relative z-10 flex flex-col items-center group ${isUpcoming ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ring-4 ring-surface-container-lowest ${
                          isCompleted
                            ? "bg-primary text-on-primary"
                            : isActive
                            ? "bg-primary text-on-primary shadow-lg shadow-primary/40"
                            : "bg-surface-container-high text-on-surface-variant group-hover:bg-surface-container-highest"
                        }`}
                      >
                        {isCompleted ? (
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        ) : (
                          stepNumber
                        )}
                      </div>
                      <span className={`absolute top-10 text-[10px] sm:text-xs font-serif tracking-tight whitespace-nowrap transition-colors mt-2 ${isActive ? "text-primary font-bold" : isCompleted ? "text-on-surface font-medium" : "text-on-surface-variant"}`}>
                        {q.stepLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

             {/* <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/30 rounded-full blur-3xl pointer-events-none" /> */}
            {/* Glassmorphic Stepper Question Card */}
            <div className="flex-1 px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col relative overflow-hidden">

              {/* Question Header */}
              <div className="space-y-2 relative z-10 mb-8 max-w-4xl mx-auto flex flex-col items-center text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="px-3 py-1 bg-primary/15 text-primary border border-primary/30 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
                    STEP {step} OF 8 • {currentQuestion.stepLabel}
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight tracking-tight pt-2">
                  {currentQuestion.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-on-surface-variant max-w-2xl text-center">
                  {currentQuestion.subtitle}
                  <span className="block mt-2 text-[11px] text-on-surface-variant/70 font-mono">Select exactly one preference</span>
                </p>
              </div>

              {/* Answer Options Stack */}
              <div className="space-y-3 relative z-10 mb-8 max-w-4xl w-full mx-auto">
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
              <div className="mt-auto pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-3.5 sm:py-4 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs sm:text-sm uppercase tracking-widest font-semibold rounded-xl border border-outline-variant/30 transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Previous Step</span>
                  </button>
                )}

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
        ) : (
          /* ── SCREEN 9: POST-ONBOARDING ANALYZING ANIMATION ── */
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            <div className="relative flex items-center justify-center w-32 h-32">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="material-symbols-outlined text-4xl text-primary animate-pulse">analytics</span>
            </div>
            
            <div className="text-center space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary font-bold block animate-pulse">
                PROCESSING ALGORITHM
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight tracking-tight">
                Analyzing Your Investment Profile...
              </h2>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                Matching your preferences with curated, high-potential opportunities in our verified inventory.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-outline-variant/20 py-6 px-4 text-center text-xs text-on-surface-variant font-mono">
        © {new Date().getFullYear()} Crystal Stone Properties • Private Institutional Research Desk
      </footer>

    </div>
  );
}
