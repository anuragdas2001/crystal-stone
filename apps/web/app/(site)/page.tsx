"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type Lenis from "@studio-freight/lenis";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@repo/ui/chart";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  Clock,
  IndianRupee,
  Landmark,
  Layers,
  MapPin,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
  User,
  Users,
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
  { title: "Legal Score", icon: Scale },
  { title: "Infrastructure Score", icon: Building2 },
  { title: "Growth Score", icon: TrendingUp },
  { title: "Investment Score", icon: Landmark },
  { title: "Risk Score", icon: ShieldCheck },
];

const investorBenefits = [
  {
    icon: "account_balance",
    title: "Investment-Focused",
    desc: "Built exclusively for investors seeking long-term wealth creation through land.",
  },
  {
    icon: "insights",
    title: "Market Intelligence",
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
  { metric: "Legal", rating: "Strong", score: 95 },
  { metric: "Infrastructure", rating: "High", score: 88 },
  { metric: "Growth", rating: "High", score: 90 },
  { metric: "Demand", rating: "Moderate", score: 75 },
  { metric: "Risk", rating: "Low", score: 92 },
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
    let lenis: Lenis | undefined;
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      const instance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis = instance;
      function raf(time: number) {
        instance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });
    return () => {
      lenis?.destroy();
    };
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
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
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
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(
        !!(
          t.closest("a") ||
          t.closest("button") ||
          t.closest("[data-cursor-expand]")
        ),
      );
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/60 z-[9998] pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 48 : 24,
          height: hovered ? 48 : 24,
          opacity: hovered ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

// ─── Parallax image ───────────────────────────────────────────
function ParallaxImage({
  src,
  alt,
  speed = 0.3,
}: {
  src: string;
  alt: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-speed * 100}px`, `${speed * 100}px`],
  );
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-[-15%] w-[130%] h-[130%]"
      >
        <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      </motion.div>
    </div>
  );
}

// ─── Reveal text ──────────────────────────────────────────────
function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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
function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const dirMap = {
    up: { y: 40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
    none: { y: 0, x: 0 },
  };
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
function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-12 md:mb-16 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
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
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.08]);

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
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroBgY, scale: heroScale }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Modern luxury villa at dusk"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 100%)",
            }}
          />
        </motion.div>

        <div
          className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

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
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
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
            We evaluate and curate Bangalore's most compelling land investment opportunities through legal
            due diligence, infrastructure research, and market intelligence—so you can invest with greater
            confidence.
          </motion.p>
        </motion.div>
      </section>

      <SectionDivider />

      {/* ── 1.5 WHY CRYSTAL STONE EXISTS ──────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <FadeIn delay={0.1}>
          <div className="glass-panel p-8 md:p-14 relative overflow-hidden border border-primary/20">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <span className="section-eyebrow block mb-4">
              WHY CRYSTAL STONE EXISTS
            </span>
            <h3 className="font-display-lg text-2xl md:text-3xl text-on-surface mb-6 leading-snug max-w-3xl">
              Crystal Stone was founded on a simple belief: investors deserve more than property listings.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-on-surface-variant text-base leading-relaxed font-body-md">
              <div>
                <p className="mb-4">
                  Every land investment deserves careful evaluation, legal due diligence, infrastructure research, and a disciplined understanding of long-term market fundamentals.
                </p>
                <p>
                  Our role isn&apos;t to convince investors to buy. Our responsibility is to evaluate opportunities with rigor, present them with transparency, and help investors make informed decisions based on evidence rather than speculation.
                </p>
              </div>
              <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-primary/20 pt-6 md:pt-0 md:pl-8">
                <p className="font-serif text-lg md:text-xl text-primary italic leading-relaxed">
                  &ldquo;Because better research leads to better decisions—and better decisions build lasting wealth.&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-px bg-primary" />
                  <span className="text-xs uppercase tracking-widest text-on-surface font-semibold">
                    The Crystal Stone Mandate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
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
                  whileHover={{
                    borderColor: "rgba(212,175,55,0.4)",
                    backgroundColor: "rgba(212,175,55,0.03)",
                  }}
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
                      <span className="text-[10px] text-primary/40 tracking-[0.25em] font-medium tabular-nums shrink-0">
                        0{i + 1}
                      </span>
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
                        whileHover={{
                          borderColor: "var(--color-primary)",
                          rotate: 6,
                          scale: 1.08,
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          {item.icon}
                        </span>
                      </motion.div>
                    </div>

                    <h4 className="font-headline-lg text-lg text-on-surface mb-4 tracking-wide">
                      {item.title}
                    </h4>
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
            title="While Others Speculate, Our Investors Decide With Evidence."
            description="Independent research, structured due diligence, and carefully evaluated land investment
opportunities—helping investors make informed decisions with confidence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {investorBenefits.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="glass-panel p-8 h-full">
                  <span className="material-symbols-outlined text-primary text-4xl mb-6 block">
                    {item.icon}
                  </span>
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
              <ChartContainer
                config={chartConfig}
                className="w-full"
                style={{ height: 420 }}
              >
                <RadarChart
                  data={frameworkData}
                  margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                >
                  <PolarGrid
                    stroke="rgba(212,175,55,0.12)"
                    gridType="polygon"
                  />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{
                      fill: "rgba(212,175,55,0.7)",
                      fontSize: 12,
                      fontFamily: "inherit",
                      letterSpacing: "0.08em",
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
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
                      <motion.div
                        className="mb-3 mt-1"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ duration: 0.25 }}
                      >
                        <IconComponent
                          size={18}
                          strokeWidth={1.25}
                          className="text-primary/60 group-hover:text-primary transition-colors duration-200"
                        />
                      </motion.div>
                    )}
                    <p className="text-[9px] uppercase tracking-[0.3em] text-on-surface-variant mb-2 text-center">
                      {item.metric}
                    </p>
                    <p className="text-primary text-2xl font-bold">
                      {item.rating}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Disclaimer beneath Investment Framework */}
            <div className="mt-8 text-center px-4 max-w-3xl mx-auto">
              <p className="text-on-surface-variant/60 text-xs italic leading-relaxed">
                * Every opportunity is evaluated using Crystal Stone&apos;s internal due diligence framework. Investors should consider their own objectives and seek independent professional advice where appropriate.
              </p>
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
              eyebrow="Investment Opportunities"
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
                  style={{
                    color:
                      activeTab === i
                        ? "var(--color-primary)"
                        : "var(--color-on-surface-variant)",
                  }}
                >
                  {tab}
                  {activeTab === i && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              <FeaturedOpportunityLayout key="main-featured-layout" />
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
                  transition={{
                    repeat: Infinity,
                    duration: 1.4,
                    ease: "easeInOut",
                  }}
                >
                  arrow_forward
                </motion.span>
              </Link>
            </MagneticWrapper>
          </div>
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
            <span className="material-symbols-outlined text-primary text-4xl mb-6 inline-block">
              diamond
            </span>
            <h3 className="font-headline-lg text-2xl text-on-surface mb-4">
              Off-Market Exclusives
            </h3>
            <p className="section-body mb-8 max-w-lg">
              Our most coveted assets are never publicly listed. Access our
              private vault of opportunities available strictly to registered
              investors.
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
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
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
            animate={{
              scale: [0.8 + i * 0.2, 1.4 + i * 0.2],
              opacity: [0.4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i,
              delay: i * 1,
              ease: "easeOut",
            }}
            initial={{ width: 200, height: 200 }}
          />
        ))}

        <div className="max-w-container-max mx-auto relative z-10">
          <RevealText>
            <h2 className="section-title mb-6">
              Let&apos;s Evaluate Your Investment Goals
            </h2>
          </RevealText>
          <FadeIn delay={0.15}>
            <p className="section-body max-w-xl mx-auto mb-10">
              Schedule a confidential consultation to discuss your objectives, investment horizon, and suitable opportunities.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <MagneticWrapper>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/about#contact"
                    className="inline-flex justify-center items-center bg-primary text-on-primary font-label-md uppercase tracking-widest px-8 py-4 luxury-button relative overflow-hidden group"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    Book Free Consultation
                  </Link>
                </motion.div>
              </MagneticWrapper>

              <MagneticWrapper>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* <Link
                    href="#"
                    className="inline-flex justify-center items-center border border-primary text-primary font-label-md uppercase tracking-widest px-8 py-4 hover:bg-primary/10 transition-colors"
                  >
                    <span className="material-symbols-outlined mr-2 text-[18px]">
                      lock
                    </span>
                    WhatsApp Us
                  </Link> */}
                </motion.div>
              </MagneticWrapper>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ─── Featured Opportunity Layout (With Spotlight Masking & Image Shimmer) ───
function FeaturedOpportunityLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* ── Main Split Card ── */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(-1000);
          mouseY.set(-1000);
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-lg bg-surface-container-low border border-primary/25 overflow-hidden shadow-2xl shadow-black group/card"
      >
        {/* Interactive Spotlight Masking on Card Surface */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl md:rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(600px circle at ${x}px ${y}px, color-mix(in srgb, var(--color-primary) 15%, transparent), transparent 40%)`
            ),
          }}
        />
        {/* Glowing border spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20 border border-primary/60"
          style={{
            maskImage: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(400px circle at ${x}px ${y}px, black, transparent)`
            ),
            WebkitMaskImage: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(400px circle at ${x}px ${y}px, black, transparent)`
            ),
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
          {/* Left Column: Image with Masking + Overlay Info */}
          <div className="lg:col-span-7 relative min-h-[440px] md:min-h-[540px] flex flex-col justify-between p-6 md:p-10 overflow-hidden">
            {/* Background Image with Smooth Alpha Blend Masking */}
            <div
              className="absolute inset-0 z-0 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Image
                src="/Rajanukunte_Premium_Layout.png"
                alt="Airport Growth Belt"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                unoptimized
              />
              {/* Dark Gradient Overlays for Readability & Seamless Masking */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/50 to-transparent opacity-95" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-container-low/20 to-surface-container-low opacity-80" />
            </div>

            {/* Top Badges with Animated Shimmer Mask */}
            <div className="relative z-10 flex flex-wrap items-center gap-3">
              <div className="relative overflow-hidden rounded-full bg-primary/15 border border-primary/40 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-black/40">
                <div className="flex items-center gap-2 text-primary font-label-md text-xs font-semibold uppercase tracking-wider">
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                  <span>Capital Appreciation</span>
                </div>
                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                  animate={{ translateX: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                />
              </div>

              <div className="relative overflow-hidden rounded-full bg-black/80 border border-primary/60 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-black/40">
                <div className="flex items-center gap-2 text-white font-label-md text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-primary text-[14px]">diamond</span>
                  <span>Crystal Stone Score — <strong className="text-primary font-mono">92 / 100</strong></span>
                </div>
              </div>
            </div>

            {/* Bottom Property Info */}
            <div className="relative z-10 mt-auto pt-16">
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight mb-3 drop-shadow-md">
                Airport Growth Belt
              </h3>
              <div className="flex items-center gap-2 text-primary text-sm md:text-base font-medium mb-4">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Rajanukunte | North Bengaluru</span>
              </div>
              <p className="text-on-surface-variant/90 text-sm md:text-base leading-relaxed max-w-xl font-light">
                Located within one of North Bengaluru&apos;s expanding growth corridors with improving connectivity and increasing residential demand.
              </p>
            </div>
          </div>

          {/* Right Column: Key Investment Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-10 bg-surface-container/95 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-primary/15 relative z-10">
            <div className="space-y-6 md:space-y-8 flex-1 flex flex-col justify-center py-2">
              {/* Item 1: Investment Objective */}
              <div className="flex items-start gap-4 pb-6 border-b border-primary/10 group/item">
                <div className="w-12 h-12 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:scale-11 group-hover/item:border-primary group-hover/item:shadow-[0_0_15px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-semibold mb-1.5">
                    Investment Objective
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-on-surface tracking-wide">
                    Capital Appreciation
                  </p>
                </div>
              </div>

              {/* Item 2: Entry Price */}
              <div className="flex items-start gap-4 pb-6 border-b border-primary/10 group/item">
                <div className="w-12 h-12 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:scale-11 group-hover/item:border-primary group-hover/item:shadow-[0_0_15px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]">
                  <IndianRupee className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-semibold mb-1.5">
                    Entry Price
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-on-surface tracking-wide">
                    ₹40 Lakhs
                  </p>
                  <p className="text-xs text-on-surface-variant/70 mt-0.5">Onwards</p>
                </div>
              </div>

              {/* Item 3: Investment Horizon */}
              <div className="flex items-start gap-4 group/item">
                <div className="w-12 h-12 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:scale-11 group-hover/item:border-primary group-hover/item:shadow-[0_0_15px_color-mix(in_srgb,var(--color-primary)_25%,transparent)]">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-semibold mb-1.5">
                    Investment Horizon
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-on-surface tracking-wide">
                    3 – 7 Years
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 pt-4">
              <MagneticWrapper>
                <Link
                  href="/properties/airport-growth-belt"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary via-primary-fixed to-primary bg-[length:200%_auto] text-on-primary font-label-md font-bold text-xs md:text-sm tracking-widest uppercase flex items-center justify-between group/btn shadow-lg shadow-primary/20 hover:bg-[position:right_center] transition-all duration-500 hover:shadow-primary/40 relative overflow-hidden"
                >
                  <span className="relative z-10">Explore Opportunity</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </MagneticWrapper>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Suitable For Strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="p-6 md:p-8 rounded-lg bg-surface-container-low border border-primary/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden group/strip"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover/strip:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-center gap-3 shrink-0">
          <span className="font-label-md text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-semibold">
            Suitable For
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 w-full lg:w-auto lg:flex-1 lg:border-l lg:border-primary/20 lg:pl-8 relative z-10">
          <div className="flex items-center gap-3.5 group/item">
            <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center shrink-0 text-primary transition-transform duration-300 group-hover/item:scale-11">
              <User className="w-4 h-4" />
            </div>
            <span className="text-on-surface font-body-md text-sm md:text-base leading-snug">
              First-Time<br className="hidden sm:inline" /> Investors
            </span>
          </div>

          <div className="flex items-center gap-3.5 group/item sm:border-l sm:border-primary/15 sm:pl-6 lg:border-none lg:pl-0">
            <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center shrink-0 text-primary transition-transform duration-300 group-hover/item:scale-11">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-on-surface font-body-md text-sm md:text-base leading-snug">
              Long-Term<br className="hidden sm:inline" /> Investors
            </span>
          </div>

          <div className="flex items-center gap-3.5 group/item sm:border-l sm:border-primary/15 sm:pl-6 lg:border-none lg:pl-0">
            <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center shrink-0 text-primary transition-transform duration-300 group-hover/item:scale-11">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-on-surface font-body-md text-sm md:text-base leading-snug">
              Professionals Building<br className="hidden sm:inline" /> Wealth Through Land
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── No Brokerage Strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="p-5 md:p-6 rounded-lg bg-surface-container-low border border-primary/15 flex items-center gap-4 relative overflow-hidden group/strip2"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover/strip2:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="w-11 h-11 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center shrink-0 text-primary shadow-inner shadow-primary/20 relative z-10">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <p className="text-on-surface-variant text-sm md:text-base leading-relaxed relative z-10">
          <span className="text-on-surface font-medium">No brokerage. No hidden charges.</span>{" "}
          We are paid by our partners, not by you.
        </p>
      </motion.div>
    </div>
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
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
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

        <div
          className={`absolute bottom-0 left-0 w-full z-10 flex justify-between items-end ${compact ? "p-6" : "p-8"}`}
        >
          <div>
            <motion.span
              className="inline-block px-3 py-1 border border-primary/40 text-primary font-label-md text-[10px] uppercase tracking-widest mb-3"
              animate={{
                borderColor: hovered
                  ? "var(--color-primary)"
                  : "rgba(var(--color-primary-rgb), 0.4)",
              }}
            >
              {badge}
            </motion.span>
            <h3
              className={`font-headline-lg text-on-surface mb-2 ${compact ? "text-xl" : "text-2xl"}`}
            >
              {title}
            </h3>
            <div className="flex items-center gap-3 text-on-surface-variant text-sm">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  location_on
                </span>
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
                  <p className="font-label-md text-primary/80 uppercase tracking-widest text-[10px] mb-1">
                    {statLabel}
                  </p>
                )}
                <p
                  className={`font-headline-lg text-primary ${compact ? "text-lg" : "text-2xl"}`}
                >
                  {statValue}
                </p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}
