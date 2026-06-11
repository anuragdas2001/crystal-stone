"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const facets = [
  {
    title: "HOW WE SELECT OPPORTUNITIES",
    subtitle: "Thousands reviewed. Exceptional opportunities only.",
    points: [
      "Legal Due Diligence",
      "Infrastructure Intelligence",
      "Growth Corridors",
      "Demand Forecasting",
    ],
  },
  {
    title: "OUR INVESTMENT FRAMEWORK",
    subtitle: "Every asset is scored across multiple intelligence layers.",
    points: [
      "Legal Score",
      "Growth Score",
      "Risk Analysis",
      "Exit Potential",
    ],
  },
  {
    title: "WHY INVESTORS WORK WITH US",
    subtitle: "Access, verification, and execution under one roof.",
    points: [
      "Off-Market Access",
      "Verified Assets",
      "End-to-End Advisory",
      "Growth Intelligence",
    ],
  },
] as const;

export default function CrystalIntelligenceEngine() {
  const [active, setActive] = useState(0);

  const currentFacet = facets[active] ?? facets[0];

  return (
    <section className="relative overflow-hidden bg-black py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,161,92,.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs tracking-[0.4em] text-[#C9A15C]">
            CRYSTAL INTELLIGENCE ENGINE
          </p>

          <h2 className="font-serif text-5xl text-white md:text-7xl">
            Investment Intelligence,
            <br />
            Refined Like A Crystal
          </h2>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-[1fr_600px_1fr]">
          {/* LEFT PANEL */}
          <div className="space-y-6">
            {facets.map((item, i) => (
              <button
                key={item.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`w-full border p-6 text-left transition-all duration-500 ${
                  active === i
                    ? "border-[#C9A15C] bg-[#C9A15C]/10 shadow-[0_0_40px_rgba(201,161,92,.15)]"
                    : "border-[#C9A15C]/20 hover:border-[#C9A15C]/40"
                }`}
              >
                <h3 className="mb-2 text-xl text-white">{item.title}</h3>

                <p className="text-sm text-white/60">{item.subtitle}</p>
              </button>
            ))}
          </div>

          {/* CRYSTAL */}
          <div className="relative flex items-center justify-center">
            <div className="absolute h-[520px] w-[520px] rounded-full border border-[#C9A15C]/10" />

            <motion.div
              animate={{
                rotateY: 360,
                rotateX: [0, 10, -10, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative h-[420px] w-[420px]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  clipPath:
                    "polygon(50% 0%, 85% 12%, 100% 50%, 85% 88%, 50% 100%, 15% 88%, 0% 50%, 15% 12%)",
                  background:
                    "linear-gradient(135deg, rgba(201,161,92,.9), rgba(30,20,10,.15), rgba(201,161,92,.35))",
                  boxShadow:
                    "0 0 80px rgba(201,161,92,.25), inset 0 0 40px rgba(255,255,255,.08)",
                }}
              />

              <motion.div
                key={active}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <span className="mb-4 text-xs tracking-[0.35em] text-[#E7C98A]">
                  ACTIVE FACET
                </span>

                <h3 className="max-w-xs text-3xl text-[#E7C98A]">
                  {currentFacet.title}
                </h3>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT PANEL */}
          <div className="border border-[#C9A15C]/20 p-8">
            <div className="mb-6 text-sm tracking-[0.3em] text-[#C9A15C]">
              CRYSTAL ANALYSIS
            </div>

            <div className="space-y-4">
              {currentFacet.points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-4 border-b border-[#C9A15C]/10 pb-4"
                >
                  <div className="h-2 w-2 rounded-full bg-[#C9A15C]" />

                  <span className="text-white/80">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}