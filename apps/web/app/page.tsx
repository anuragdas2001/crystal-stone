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
  useAnimationFrame,
} from "framer-motion";

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
const HERO_IMAGE =
  "/villa_image.jpg";

const advantages = [
  {
    icon: "verified",
    title: "Complete Legal Verification",
    desc: "Every property undergoes comprehensive legal due diligence before being offered to investors.",
  },
  {
    icon: "monitoring",
    title: "High-Growth Locations",
    desc: "Focused on emerging Bangalore investment corridors with strong appreciation potential.",
  },
  {
    icon: "key",
    title: "End-to-End Advisory",
    desc: "Support from selection through registration and investment assistance.",
  },
];

const whyChooseUs = [
  {
    icon: "monitoring",
    title: "Starting ₹40 Lakhs",
    desc: "Affordable entry into Bangalore's fastest-growing investment corridors.",
  },
  {
    icon: "handshake",
    title: "Expected 2X Growth",
    desc: "Projected appreciation potential within 4 years.",
  },
  {
    icon: "verified_user",
    title: "30 Minutes from Airport",
    desc: "Strategically located near Bangalore Airport growth corridor.",
  },
];

const assetClasses = [
  { icon: "corporate_fare", label: "Residential" },
  { icon: "warehouse", label: "Commercial" },
  { icon: "domain", label: "Development Land" },
];

const heroStats = [
  { label: "ROI 25%", delay: 0 },
  { label: "Starting ₹40 Lakhs", delay: 0.05 },
  { label: "2.2X–2.5X Growth", delay: 0.1 },
  { label: "30 Min Airport", delay: 0.15 },
  { label: "5 Min Schools", delay: 0.2 },
  { label: "Only 30 Plots Left", delay: 0.25 },
];

// ─── Lenis smooth scroll init ────────────────────────────────
function useLenis() {
  useEffect(() => {
    let lenis: any;
    // Dynamically import Lenis so it only runs client-side
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

    return () => {
      lenis?.destroy();
    };
  }, []);
}

// ─── Animated counter ────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = { start: 0, end: value, duration: 1500 };
    const startTime = performance.now();

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / controls.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * controls.end));
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Magnetic button ─────────────────────────────────────────
function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// ─── Cursor follower ─────────────────────────────────────────
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
        )
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
      {/* dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/60 z-[9998] pointer-events-none"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovered ? 48 : 24, height: hovered ? 48 : 24, opacity: hovered ? 0.8 : 0.4 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

// ─── Parallax image wrapper ───────────────────────────────────
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

// ─── Reveal text animation ────────────────────────────────────
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

// ─── Fade-in section ──────────────────────────────────────────
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

// ─── Gold line divider ────────────────────────────────────────
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
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.08]);

  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["All", "Signature Series", "Commercial"];

  return (
    <>
      <CustomCursor />

      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden">
        {/* Parallax bg */}
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
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 100%)"
          }} />
        </motion.div>

        {/* Animated grain overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }} />

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
              High-Growth Real Estate Investments with Complete Legal Verification
            </motion.h1>
          </div>

          <motion.p
            className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Invest in premium residential, commercial, and development land opportunities
            with verified documentation and exceptional growth potential.
          </motion.p>

          {/* Stats grid with staggered entrance */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 w-full max-w-5xl">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + stat.delay, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, borderColor: "rgba(var(--color-primary-rgb), 0.6)" }}
                className="glass-panel p-4 cursor-default"
                data-cursor-expand
              >
                <p className="text-primary font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Search bar fade in */}
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
          >
            {/* SearchBar placeholder if not available */}
            <div className="glass-panel p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">search</span>
              <input
                type="text"
                placeholder="Search properties, locations…"
                className="bg-transparent flex-1 outline-none text-on-surface placeholder-on-surface-variant font-body-lg"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="font-label-md text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
            Scroll
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-on-surface-variant/60 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      <SectionDivider />

      {/* ── 2. Featured Properties ────────────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center mb-16 md:mb-24">
          <div className="md:col-span-5">
            <SectionHeader
              eyebrow="Featured Properties"
              title="Featured Investment Opportunities"
              description="Carefully selected high-growth investment opportunities in Bangalore's fastest developing corridors."
            />
          </div>
          <FadeIn delay={0.2} direction="left" className="md:col-span-6 md:col-start-7 relative h-72 md:h-80 overflow-hidden rounded-lg">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              data-cursor-expand
            >
              <ParallaxImage
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHy6YZS-SXAxJTZgntTjNDkzMLMTx7D2CLkJDkA1eWN3qszVnZdFAFLZoDxn0ObNkzI0bAYBITXynOEJwE1UYeXs71Dgs_HQKFpQRlyRVOetct0kWIVzC6dvfXmOr2EhLqANoesXMfs381ltLJYqMQLYKEFELbDCrORRuvF6ShGUsNcC_vhj9JDMKzyOk-xGIxvSSooZWYAD70ty46PlQLSg0cfkwp3eW4LKRIf8Uuw1OFH-EhC4BHr7HIudTm-kMT2yF917jKTfI"
                alt="Architectural detail"
                speed={0.15}
              />
            </motion.div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {whyChooseUs.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.12} direction="up">
              <motion.div
                className="group"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-6"
                  whileHover={{ borderColor: "var(--color-primary)", rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="material-symbols-outlined text-primary text-3xl">{f.icon}</span>
                </motion.div>
                <h3 className="font-headline-lg text-xl text-on-surface mb-3">{f.title}</h3>
                <p className="section-body leading-relaxed">{f.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── 3. Property Listings ──────────────────────────── */}
      <section className="py-24 md:py-32 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

        {/* Floating orb */}
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

            {/* Animated tab switcher */}
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

            {/* Off-market */}
            <FadeIn delay={0.15} className="md:col-span-12">
              <motion.div
                className="glass-panel p-8 md:p-10 flex flex-col justify-center"
                whileHover={{ borderColor: "rgba(var(--color-primary-rgb), 0.3)" }}
                data-cursor-expand
              >
                <span className="material-symbols-outlined text-primary text-4xl mb-6 inline-block">
                  diamond
                </span>
                <h3 className="font-headline-lg text-2xl text-on-surface mb-4">Off-Market Exclusives</h3>
                <p className="section-body mb-8 max-w-lg">
                  Our most coveted assets are never publicly listed. Access our private vault of
                  architectural masterpieces available strictly to registered principals.
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

      {/* ── 4. Crystal Stone Advantage ────────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          style={{ translateX: "33%", translateY: "-50%" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center relative z-10">
          <div>
            <SectionHeader
              eyebrow="Our Edge"
              title="Why Investors Choose Crystal Stone"
              description="Unparalleled access to premium real estate markets, combining analytical rigour with discrete, white-glove service."
            />
            <div className="space-y-8">
              {advantages.map((adv, i) => (
                <FadeIn key={adv.title} delay={i * 0.1} direction="left">
                  <motion.div
                    className="flex items-start gap-5 group"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0"
                      whileHover={{ borderColor: "var(--color-primary)", scale: 1.1, rotate: 8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="material-symbols-outlined text-primary">{adv.icon}</span>
                    </motion.div>
                    <div>
                      <h4 className="font-headline-lg text-xl text-on-surface mb-2">{adv.title}</h4>
                      <p className="section-body">{adv.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.2} direction="right" className="relative h-[480px] md:h-[560px] w-full">
            <div className="absolute inset-0 glass-panel p-4 overflow-hidden rounded-lg" data-cursor-expand>
              <ParallaxImage
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHy6YZS-SXAxJTZgntTjNDkzMLMTx7D2CLkJDkA1eWN3qszVnZdFAFLZoDxn0ObNkzI0bAYBITXynOEJwE1UYeXs71Dgs_HQKFpQRlyRVOetct0kWIVzC6dvfXmOr2EhLqANoesXMfs381ltLJYqMQLYKEFELbDCrORRuvF6ShGUsNcC_vhj9JDMKzyOk-xGIxvSSooZWYAD70ty46PlQLSg0cfkwp3eW4LKRIf8Uuw1OFH-EhC4BHr7HIudTm-kMT2yF917jKTfI"
                alt="Luxury architectural detail"
                speed={0.1}
              />
              <div className="absolute inset-0 opacity-60" />
            </div>
            {/* Yield card */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-md p-8 border border-outline-variant/30 max-w-sm w-full"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs">
                  Portfolio Yield
                </span>
                <motion.span
                  className="material-symbols-outlined text-primary"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  trending_up
                </motion.span>
              </div>
              <p className="font-display-lg text-display-lg text-primary mb-2">
                <AnimatedCounter value={84} suffix="%" />
              </p>
              <div className="w-full bg-surface-container h-1 mb-4 rounded-full overflow-hidden">
                <motion.div
                  className="bg-primary h-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "84%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="section-body text-sm">
                Projected annual return based on current market analytics.
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ── 5. Why Invest in Bangalore ────────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="order-2 md:order-1">
            <SectionHeader
              eyebrow="Private Equity"
              title="Why Invest in Bangalore"
              description="Specialised SPVs focusing on high-yield, risk-adjusted returns in tier-one global cities. Institutional-grade underwriting ensures capital preservation while targeting aggressive growth."
            />
            <div className="grid grid-cols-2 gap-8 mb-10">
              {[
                { label: "Target IRR", value: "18.5%" },
                { label: "Fund III Status", value: "Actively Deploying" },
              ].map((stat, i) => (
                <FadeIn key={stat.label} delay={i * 0.1}>
                  <div className="border-l-2 border-primary/40 pl-6">
                    <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                      {stat.label}
                    </p>
                    <p className="font-headline-lg text-xl text-primary">{stat.value}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mb-10">
              <h5 className="font-headline-lg text-lg text-on-surface border-b border-outline-variant/30 pb-3 mb-4">
                Target Asset Classes
              </h5>
              <ul className="space-y-3">
                {assetClasses.map((a, i) => (
                  <FadeIn key={a.label} delay={i * 0.08}>
                    <motion.li
                      className="flex items-center gap-3 section-body cursor-default"
                      whileHover={{ x: 8, color: "var(--color-primary)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="material-symbols-outlined text-primary text-xl">{a.icon}</span>
                      {a.label}
                    </motion.li>
                  </FadeIn>
                ))}
              </ul>
            </div>

            <MagneticWrapper>
              <Link
                href="/private-equity"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button overflow-hidden relative group"
              >
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                Explore Investment Services
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </MagneticWrapper>
          </div>

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
                alt="Investment architecture"
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

      {/* ── 6. CTA ────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-surface-container-low text-center relative overflow-hidden">
        {/* Animated background rings */}
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
              Engage with our senior advisory team to discuss your portfolio strategy in strict
              confidence.
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

        {/* Shimmer on hover */}
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