"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@repo/ui/chart";
import {
  ArrowRight,
  Building2,
  Clock,
  IndianRupee,
  Landmark,
  Layers,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────
interface PropertyCardProps {
  className?: string;
  image: string;
  badge: string;
  title: string;
  location: string;
  meta?: string;
  metrics?: string[];
  statLabel?: string;
  statValue: string;
  compact?: boolean;
  index?: number;
}

// ─── Constants ───────────────────────────────────────────────
const HERO_IMAGE = "/villa_image.jpg";

const opportunitySelection = [
  {
    icon: "gavel",
    title: "Legal Due Diligence",
    points: [
      "Ownership verification",
      "Encumbrance review",
      "Approval validation",
      "Litigation screening",
    ],
  },
  {
    icon: "foundation",
    title: "Infrastructure Intelligence",
    points: [
      "Metro expansion",
      "STRR development",
      "Airport growth",
      "Industrial corridors",
    ],
  },
  {
    icon: "analytics",
    title: "Investment Analysis",
    points: [
      "Market value",
      "Guidance value",
      "Growth projections",
      "Exit potential",
    ],
  },
  {
    icon: "location_on",
    title: "Location Scoring",
    points: [
      "Accessibility",
      "Employment hubs",
      "Population growth",
      "Future demand",
    ],
  },
];

const filters = [
  { title: "Legal Score",          icon: Scale       },
  { title: "Infrastructure Score", icon: Building2   },
  { title: "Growth Score",         icon: TrendingUp  },
  { title: "Investment Score",     icon: Landmark    },
  { title: "Risk Score",           icon: ShieldCheck },
];

const investorBenefits = [
  {
    icon: "account_balance",
    title: "Investment-Focused",
    desc: "Built exclusively for investors seeking long-term wealth creation through land.",
  },
  {
    icon: "insights",
    title: "Opportunity Intelligence",
    desc: "We continuously track infrastructure, market movements, and growth corridors.",
  },
  {
    icon: "handshake",
    title: "End-To-End Execution",
    desc: "From opportunity identification to registration and asset management.",
  },
  {
    icon: "diamond",
    title: "Off-Market Access",
    desc: "Access opportunities unavailable on public portals.",
  },
];

const frameworkData = [
  { metric: "Legal",          score: 94 },
  { metric: "Infrastructure", score: 91 },
  { metric: "Growth",         score: 88 },
  { metric: "Demand",         score: 85 },
  { metric: "Risk",           score: 92 },
];

const chartConfig = {
  score: {
    label: "Investment Score",
    color: "#D4AF37",
  },
} satisfies ChartConfig;

// ─── Lenis smooth scroll ──────────────────────────────────────
function useLenis() {
  useEffect(() => {
    let lenis: any;
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });
    return () => { lenis?.destroy(); };
  }, []);
}

// ─── Magnetic button ─────────────────────────────────────────
function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// ─── Custom cursor ────────────────────────────────────────────
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 18 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!(t.closest("a") || t.closest("button") || t.closest("[data-cursor-expand]")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/60 z-[9998] pointer-events-none"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovered ? 48 : 24, height: hovered ? 48 : 24, opacity: hovered ? 0.8 : 0.4 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

// ─── Parallax image ───────────────────────────────────────────
function ParallaxImage({ src, alt, speed = 0.3 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-15%] w-[130%] h-[130%]">
        <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      </motion.div>
    </div>
  );
}

// ─── Reveal text ──────────────────────────────────────────────
function RevealText({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Fade-in ──────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up", className = "" }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none"; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const dirMap = { up: { y: 40, x: 0 }, left: { y: 0, x: -40 }, right: { y: 0, x: 40 }, none: { y: 0, x: 0 } };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section divider ──────────────────────────────────────────
function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="w-full overflow-hidden" style={{ height: "1px" }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left", height: "1px" }}
        className="w-full bg-primary/40"
      />
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────
function SectionHeader({ eyebrow, title, description, align = "left" }: {
  eyebrow: string; title: string; description?: string; align?: "left" | "center";
}) {
  return (
    <div className={`mb-12 md:mb-16 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <FadeIn delay={0}>
        <span className="section-eyebrow block mb-4">{eyebrow}</span>
      </FadeIn>
      <RevealText delay={0.1}>
        <h2 className="section-title mb-4">{title}</h2>
      </RevealText>
      {description && (
        <FadeIn delay={0.2}>
          <p className="section-body">{description}</p>
        </FadeIn>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────
export default function HomePage() {
  useLenis();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY    = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale  = useTransform(heroScroll, [0, 1], [1, 1.08]);

  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["All", "Residential", "Commercial"];

  return (
    <>
      <CustomCursor />

      {/* ── 1. HERO ───────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroBgY, scale: heroScale }}>
          <Image src={HERO_IMAGE} alt="Modern luxury villa at dusk" fill className="object-cover object-center" priority unoptimized />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 100%)" }} />
        </motion.div>

        <div className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center py-36"
        >
          <motion.p
            className="section-eyebrow mb-6"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Bangalore Real Estate Investments
          </motion.p>

          <div className="overflow-hidden mb-6 max-w-5xl">
            <motion.h1
              className="font-display-xl text-display-xl text-on-surface drop-shadow-lg"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Built For Those Who Think Bigger.
            </motion.h1>
          </div>

          <motion.p
            className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Discover high-growth land opportunities positioned along Bangalore's emerging growth
            corridors, selected through legal due diligence, infrastructure intelligence, and market
            analysis.
          </motion.p>
        </motion.div>
      </section>

      <SectionDivider />

      {/* ── 2. HOW WE SELECT OPPORTUNITIES ───────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          style={{ translateX: "33%", translateY: "-50%" }}
        />

        <div className="relative z-10">
          <SectionHeader
            eyebrow="HOW WE SELECT OPPORTUNITIES"
            title="We Don't List Everything. We Select What Matters."
            description="Every opportunity undergoes legal, infrastructure, and investment analysis before being presented to investors."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunitySelection.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1} direction="up">
                <motion.div
                  className="relative group border border-primary/15 bg-black/40 backdrop-blur-sm overflow-hidden cursor-default"
                  whileHover={{ borderColor: "rgba(212,175,55,0.4)", backgroundColor: "rgba(212,175,55,0.03)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary/50 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary/50 pointer-events-none" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 pointer-events-none"
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="relative z-10 p-7">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-[10px] text-primary/40 tracking-[0.25em] font-medium tabular-nums shrink-0">0{i + 1}</span>
                      <motion.div
                        className="h-px bg-primary/20 flex-1"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        style={{ transformOrigin: "left" }}
                        transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                      />
                      <motion.div
                        className="w-10 h-10 border border-primary/25 flex items-center justify-center shrink-0"
                        whileHover={{ borderColor: "var(--color-primary)", rotate: 6, scale: 1.08 }}
                        transition={{ duration: 0.25 }}
                      >
                        <span className="material-symbols-outlined text-primary text-[18px]">{item.icon}</span>
                      </motion.div>
                    </div>

                    <h4 className="font-headline-lg text-lg text-on-surface mb-4 tracking-wide">{item.title}</h4>
                    <div className="w-8 h-px bg-primary/40 mb-4" />

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {item.points.map((point) => (
                        <motion.div
                          key={point}
                          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-on-surface-variant"
                          whileHover={{ color: "rgba(212,175,55,0.8)", x: 2 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                          {point}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 3. WHY INVESTORS WORK WITH US ────────────────── */}
      <section className="py-24 md:py-32 bg-surface-container-low">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <SectionHeader
            eyebrow="WHY INVESTORS WORK WITH US"
            title="Built Exclusively For Serious Land Investors"
            description="Institutional-grade sourcing, underwriting, acquisition and management."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {investorBenefits.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="glass-panel p-8 h-full">
                  <span className="material-symbols-outlined text-primary text-4xl mb-6 block">{item.icon}</span>
                  <h3 className="text-xl mb-4">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 4. INVESTMENT FRAMEWORK (SPIDER CHART) ───────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <FadeIn delay={0.1} direction="up" className="w-full">
          <div className="relative border border-primary/20 bg-black overflow-hidden p-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/8 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[60px] pointer-events-none" />

            <SectionHeader
              eyebrow="OUR INVESTMENT FRAMEWORK"
              title="Every Opportunity Is Evaluated Across Five Dimensions"
              description=""
            />

            <div className="relative z-10 px-10 py-8">
              <ChartContainer config={chartConfig} className="w-full" style={{ height: 420 }}>
                <RadarChart data={frameworkData} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                  <PolarGrid stroke="rgba(212,175,55,0.12)" gridType="polygon" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{ fill: "rgba(212,175,55,0.7)", fontSize: 12, fontFamily: "inherit", letterSpacing: "0.08em" }}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Radar
                    dataKey="score"
                    fill="#D4AF37"
                    fillOpacity={0.18}
                    stroke="#D4AF37"
                    strokeWidth={1.5}
                    dot={{ fill: "#D4AF37", r: 4, strokeWidth: 0 }}
                  />
                </RadarChart>
              </ChartContainer>
            </div>

            <div className="relative z-10 grid grid-cols-5 border-t border-primary/10">
              {frameworkData.map((item, i) => {
                const IconComponent = filters[i]?.icon;
                return (
                  <motion.div
                    key={item.metric}
                    className="flex flex-col items-center py-6 px-4 border-r border-primary/10 last:border-r-0 group cursor-default relative overflow-hidden"
                    whileHover={{ backgroundColor: "rgba(212,175,55,0.04)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 h-px bg-primary/40"
                      initial={{ width: "2rem" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ left: "50%", transform: "translateX(-50%)" }}
                    />
                    {IconComponent && (
                      <motion.div className="mb-3 mt-1" whileHover={{ scale: 1.15, rotate: 5 }} transition={{ duration: 0.25 }}>
                        <IconComponent size={18} strokeWidth={1.25} className="text-primary/60 group-hover:text-primary transition-colors duration-200" />
                      </motion.div>
                    )}
                    <p className="text-[9px] uppercase tracking-[0.3em] text-on-surface-variant mb-2 text-center">{item.metric}</p>
                    <p className="text-primary text-2xl font-bold tabular-nums">{item.score}</p>
                    <p className="text-on-surface-variant/40 text-[10px] mt-0.5">/100</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      

      <SectionDivider />

      {/* ── 6. FEATURED INVESTMENT OPPORTUNITIES ─────────── */}
      <section className="py-24 md:py-32 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />

        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-16">
            <SectionHeader
              eyebrow="Featured Properties"
              title="Featured Investment Opportunities"
              description="Curated properties representing the pinnacle of architectural design and investment potential."
            />

            <div className="flex gap-6 border-b border-outline-variant/30 pb-2 shrink-0">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className="relative font-label-md text-xs uppercase tracking-widest pb-2 px-2 transition-colors"
                  style={{ color: activeTab === i ? "var(--color-primary)" : "var(--color-on-surface-variant)" }}
                >
                  {tab}
                  {activeTab === i && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(320px,400px)]">
            <AnimatePresence mode="wait">
              <PropertyCard
                key="main-card"
                className="md:col-span-12"
                image="/Rajanukunte_Premium_Layout.png"
                badge="Residential Land"
                title="Airport Growth Belt"
                location="Rajanukunte | North Bengaluru Growth Corridor"
                statValue=""
                compact
                metrics={["25% ROI Potential", "₹40 Lakhs Onwards", "20 Mins to Airport"]}
                index={0}
              />
            </AnimatePresence>
          </div>

          <div className="mt-12 text-center">
            <MagneticWrapper>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 font-label-md text-primary uppercase tracking-widest border-b border-primary pb-1 hover:text-primary-fixed transition-colors"
              >
                View All Properties
                <motion.span
                  className="material-symbols-outlined text-[18px]"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                >
                  arrow_forward
                </motion.span>
              </Link>
            </MagneticWrapper>
          </div>
        </div>
      </section>

      <SectionDivider />

     

      {/* ── 5. BANGALORE INVESTMENT THESIS (NEW) ─────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          {/* Left */}
          <div className="order-2 md:order-1">
            <FadeIn delay={0}>
              <span className="section-eyebrow block mb-4">Land Investment</span>
            </FadeIn>
            <div className="overflow-hidden mb-5">
              <RevealText delay={0.1}>
                <h2 className="section-title">
                  Build Wealth Through Bangalore's Growth Corridors
                </h2>
              </RevealText>
            </div>
            <FadeIn delay={0.2}>
              <p className="section-body mb-10 max-w-lg">
                Access legally verified land opportunities selected through infrastructure
                intelligence, market analysis, and investment due diligence.
              </p>
            </FadeIn>

            {/* Metric blocks */}
            <div className="grid grid-cols-3 border border-primary/10 mb-10 overflow-hidden">
              {[
                {
                  icon: IndianRupee,
                  label: "Entry Investment",
                  value: "₹40 Lakhs+",
                  sub: "Accessible opportunities across Bangalore's emerging growth corridors.",
                },
                {
                  icon: Clock,
                  label: "Investment Horizon",
                  value: "3–7 Years",
                  sub: "Designed for long-term capital appreciation.",
                },
                {
                  icon: Layers,
                  label: "Asset Classes",
                  value: "3",
                  sub: "Residential Layouts, Commercial Land, Development Land.",
                },
              ].map((metric, i) => (
                <FadeIn key={metric.label} delay={0.25 + i * 0.08}>
                  <div className="relative flex flex-col gap-3 px-6 py-6 bg-black border-r border-primary/10 last:border-r-0 h-full">
                    <div className="absolute top-0 left-0 w-full h-px bg-primary/20" />
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 border border-primary/15 flex items-center justify-center shrink-0">
                        <metric.icon size={20} strokeWidth={1} className="text-primary/90" />
                      </div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-on-surface-variant">{metric.label}</p>
                    </div>
                    <p className="text-primary text-2xl font-bold tabular-nums">{metric.value}</p>
                    <p className="text-on-surface-variant text-xs leading-relaxed">{metric.sub}</p>
                    <span className="absolute top-3 right-4 text-[10px] text-primary/20 tracking-[0.2em] tabular-nums">0{i + 1}</span>
                  </div>
                </FadeIn>
              ))}
            </div>

            <MagneticWrapper>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button overflow-hidden relative group"
              >
                <motion.span className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5 }} />
                Explore Investment Opportunities
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </MagneticWrapper>
          </div>

          {/* Right — parallax image */}
          <FadeIn delay={0.15} direction="right" className="order-1 md:order-2 relative h-[480px] md:h-[600px] w-full">
            <div className="absolute inset-0 border border-primary/20 translate-x-3 translate-y-3 pointer-events-none" />
            <motion.div
              className="w-full h-full overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              data-cursor-expand
            >
              <ParallaxImage
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBogkD5T6UIdzpwCN4XuZv7oG-sz0yfL-hcNYCGJgSPpH1fREz60dtUFV3GXuShqY9zBob7Bejsd0OqxYWuquc85Ojl9fjySZrDZzvT5eyuNvjMpwDXNcV7rFKfbJfTur8sEDodBoZ5bm_9O502ebEBkMDYlXASIk5gUuG1cWaN9cZK9UnHjMQhLKIYESBkcKxOLJATRY8HKeCiireKGXFCgYHlaGiG_s5u3-wR4oilG5olK-cGRAAlEVdeFzWLQglz9E-1XU42vHQ"
                alt="Bangalore growth corridor"
                speed={0.2}
              />
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-0 glass-panel p-6 hidden md:block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-label-md text-primary uppercase tracking-widest text-xs mb-1">AUM</p>
              <p className="font-display-lg text-headline-lg-mobile text-on-surface">$2.4B+</p>
            </motion.div>
          </FadeIn>
        </div>
      </section>
      <SectionDivider />
      {/* ── 7. OFF-MARKET EXCLUSIVES ──────────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <FadeIn delay={0.1}>
          <motion.div
            className="glass-panel p-8 md:p-10 flex flex-col justify-center"
            whileHover={{ borderColor: "rgba(var(--color-primary-rgb), 0.3)" }}
            data-cursor-expand
          >
            <span className="material-symbols-outlined text-primary text-4xl mb-6 inline-block">diamond</span>
            <h3 className="font-headline-lg text-2xl text-on-surface mb-4">Off-Market Exclusives</h3>
            <p className="section-body mb-8 max-w-lg">
              Our most coveted assets are never publicly listed. Access our private vault of
              opportunities available strictly to registered investors.
            </p>
            <MagneticWrapper>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 font-label-md text-primary uppercase tracking-widest border-b border-primary/40 hover:border-primary pb-1 w-fit transition-colors"
              >
                Request Vault Access
                <motion.span
                  className="material-symbols-outlined text-sm"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  lock_open
                </motion.span>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </FadeIn>
      </section>

      <SectionDivider />

      {/* ── 8. CTA ────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-surface-container-low text-center relative overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border border-primary/10 pointer-events-none"
            style={{ translateX: "-50%", translateY: "-50%" }}
            animate={{ scale: [0.8 + i * 0.2, 1.4 + i * 0.2], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 3 + i, delay: i * 1, ease: "easeOut" }}
            initial={{ width: 200, height: 200 }}
          />
        ))}

        <div className="max-w-container-max mx-auto relative z-10">
          <RevealText>
            <h2 className="section-title mb-6">Ready to Start Your Investment Journey?</h2>
          </RevealText>
          <FadeIn delay={0.15}>
            <p className="section-body max-w-xl mx-auto mb-10">
              Engage with our senior advisory team to discuss your portfolio strategy in strict confidence.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <MagneticWrapper>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/about#contact"
                    className="inline-flex justify-center items-center bg-primary text-on-primary font-label-md uppercase tracking-widest px-8 py-4 luxury-button relative overflow-hidden group"
                  >
                    <motion.span className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5 }} />
                    Book Free Consultation
                  </Link>
                </motion.div>
              </MagneticWrapper>

              <MagneticWrapper>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="#"
                    className="inline-flex justify-center items-center border border-primary text-primary font-label-md uppercase tracking-widest px-8 py-4 hover:bg-primary/10 transition-colors"
                  >
                    <span className="material-symbols-outlined mr-2 text-[18px]">lock</span>
                    WhatsApp Us
                  </Link>
                </motion.div>
              </MagneticWrapper>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ─── Property card ────────────────────────────────────────────
function PropertyCard({
  className = "",
  image,
  badge,
  title,
  location,
  meta,
  metrics,
  statLabel,
  statValue,
  compact = false,
  index = 0,
}: PropertyCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.12} className={className}>
      <motion.div
        className="relative group cursor-pointer overflow-hidden rounded-lg card-hover h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        data-cursor-expand
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={image} alt={title} fill className="object-cover" unoptimized />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            />
          )}
        </AnimatePresence>

        <div className={`absolute bottom-0 left-0 w-full z-10 flex justify-between items-end ${compact ? "p-6" : "p-8"}`}>
          <div>
            <motion.span
              className="inline-block px-3 py-1 border border-primary/40 text-primary font-label-md text-[10px] uppercase tracking-widest mb-3"
              animate={{ borderColor: hovered ? "var(--color-primary)" : "rgba(var(--color-primary-rgb), 0.4)" }}
            >
              {badge}
            </motion.span>
            <h3 className={`font-headline-lg text-on-surface mb-2 ${compact ? "text-xl" : "text-2xl"}`}>{title}</h3>
            <div className="flex items-center gap-3 text-on-surface-variant text-sm">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {location}
              </span>
              {meta && (
                <>
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  <span>{meta}</span>
                </>
              )}
            </div>
          </div>

          <div className="text-right shrink-0 ml-4">
            {metrics?.length ? (
              <div className="space-y-2">
                {metrics.map((metric, mi) => (
                  <motion.div
                    key={metric}
                    className="px-3 py-1 bg-black/50 backdrop-blur-sm border border-primary/30 rounded text-primary text-xs uppercase tracking-wider"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + mi * 0.08 }}
                    whileHover={{ borderColor: "var(--color-primary)", x: -3 }}
                  >
                    {metric}
                  </motion.div>
                ))}
              </div>
            ) : (
              <>
                {statLabel && (
                  <p className="font-label-md text-primary/80 uppercase tracking-widest text-[10px] mb-1">{statLabel}</p>
                )}
                <p className={`font-headline-lg text-primary ${compact ? "text-lg" : "text-2xl"}`}>{statValue}</p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}