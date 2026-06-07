import Image from "next/image";
import Link from "next/link";
import SearchBar from "@repo/ui/search/SearchBar";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDDkN1o7xEONX2m6TQqSN9pFq77QVZMUehcPJgVUZ7fBYHyDSR6R0srvdowv49Isc_7wsCZEF5mE2wpWj9VUxqX7ZN2KphfApC7d2L6nvzkl1cBxIMdidztAYnbsY2yNFVLOKva9W8pbcErNlQYRr36RLvy9g5OvDkrnG2goRJ3lAboKLPwaoQX4ditrCMSJiijvyhsOL9kxmDMhYbT-cUEY16pHCv_dWwVThoZnOAjThPa6gIR1Os0lZjg6LzNug9q_GyqCuQ6diI";

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
    desc: "Affordable entry into Bangalore’s fastest-growing investment corridors.",
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

const projects = [{
  name: "Rajanukunte Premium Layout",
  location: "Rajanukunte, Bengaluru",
  image: ""
}]

function SectionDivider() {
  return <div className="gold-divider w-full" />;
}

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
      <span className="section-eyebrow block mb-4">{eyebrow}</span>
      <h2 className="section-title mb-4">{title}</h2>
      {description && <p className="section-body">{description}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="Modern luxury villa at dusk"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center py-16">
          <p className="section-eyebrow mb-6">Bangalore Real Estate Investments</p>

          <h1 className="font-display-xl text-display-xl text-on-surface mb-6 drop-shadow-lg max-w-5xl">
            High-Growth Real Estate Investments with Complete Legal Verification
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-12">
            Invest in premium residential, commercial, and development land opportunities
            with verified documentation and exceptional growth potential.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 w-full max-w-5xl">
            <div className="glass-panel p-4">
              <p className="text-primary font-bold">ROI 25%</p>
            </div>

            <div className="glass-panel p-4">
              <p className="text-primary font-bold">Starting ₹40 Lakhs</p>
            </div>

            <div className="glass-panel p-4">
              <p className="text-primary font-bold">2.2X–2.5X Growth</p>
            </div>

            <div className="glass-panel p-4">
              <p className="text-primary font-bold">30 Min Airport</p>
            </div>

            <div className="glass-panel p-4">
              <p className="text-primary font-bold">5 Min Schools</p>
            </div>

            <div className="glass-panel p-4">
              <p className="text-primary font-bold">Only 30 Plots Left</p>
            </div>
          </div>
          <div className="w-full max-w-4xl">
            <SearchBar />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
          <span className="font-label-md text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-on-surface-variant/60 to-transparent" />
        </div>
      </section>

      <SectionDivider />

      {/* ── 2. Crystal Stone Standard ─────────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center mb-16 md:mb-24">
          <div className="md:col-span-5">
            <SectionHeader
              eyebrow="Featured Properties"
              title="Featured Investment Opportunities"
              description="Carefully selected high-growth investment opportunities in Bangalore's fastest developing corridors."
            />
          </div>
          <div className="md:col-span-6 md:col-start-7 relative h-72 md:h-80 overflow-hidden rounded-lg">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHy6YZS-SXAxJTZgntTjNDkzMLMTx7D2CLkJDkA1eWN3qszVnZdFAFLZoDxn0ObNkzI0bAYBITXynOEJwE1UYeXs71Dgs_HQKFpQRlyRVOetct0kWIVzC6dvfXmOr2EhLqANoesXMfs381ltLJYqMQLYKEFELbDCrORRuvF6ShGUsNcC_vhj9JDMKzyOk-xGIxvSSooZWYAD70ty46PlQLSg0cfkwp3eW4LKRIf8Uuw1OFH-EhC4BHr7HIudTm-kMT2yF917jKTfI"
              alt="Architectural detail"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {whyChooseUs.map((f) => (
            <div key={f.title} className="group">
              <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl">{f.icon}</span>
              </div>
              <h3 className="font-headline-lg text-xl text-on-surface mb-3">{f.title}</h3>
              <p className="section-body leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── 3. Featured Investment Opportunities ───────────────────────── */}
      <section className="py-24 md:py-32 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-16">
            <SectionHeader
              eyebrow="Featured Properties"
              title="Featured Investment Opportunities"
              description="Curated properties representing the pinnacle of architectural design and investment potential."
            />
            <div className="flex gap-6 border-b border-outline-variant/30 pb-2 shrink-0">
              {["All", "Signature Series", "Commercial"].map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  className={`font-label-md text-xs uppercase tracking-widest pb-2 px-2 transition-colors ${i === 0
                    ? "text-primary border-b-2 border-primary"
                    : "text-on-surface-variant hover:text-primary"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(320px,400px)]">
            {/* Belvedere — large */}
            <PropertyCard
              className="md:col-span-12"
              image="/Rajanukunte_Premium_Layout.png"
              badge="Residential Land"
              title="Airport Growth Belt"
              location="Rajanukunte | North Bengaluru Growth Corridor"
              statValue=""
              compact
              metrics={[
                "25% ROI Potential",
                "₹40 Lakhs Onwards",
                "20 Mins to Airport",
              ]}
            />

            {/* Aetherion — small */}
            {/* <PropertyCard
              className="md:col-span-4"
              image="/Rajanukunte_Premium_Layout.png"
              badge="Prime Commercial"
              title="Rajanukunte Premium Layout"
              location="Rajanukunte, Bengaluru"
              statValue="Est. $120M"
              compact
            /> */}

            {/* Whispering Pines */}
            {/* <PropertyCard
              className="md:col-span-5"
              image="/P2.png"
              badge="Residential Land"
              title="Whispering Pines Parcel"
              location="Aspen"
              statValue="45 Acres"
              compact
            /> */}

            {/* Off-market card */}
            <div className="md:col-span-12 glass-panel p-8 md:p-10 flex flex-col justify-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">diamond</span>
              <h3 className="font-headline-lg text-2xl text-on-surface mb-4">Off-Market Exclusives</h3>
              <p className="section-body mb-8 max-w-lg">
                Our most coveted assets are never publicly listed. Access our private vault of
                architectural masterpieces available strictly to registered principals.
              </p>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 font-label-md text-primary uppercase tracking-widest border-b border-primary/40 hover:border-primary pb-1 w-fit transition-colors"
              >
                Request Vault Access
                <span className="material-symbols-outlined text-sm">lock_open</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 font-label-md text-primary uppercase tracking-widest border-b border-primary pb-1 hover:text-primary-fixed transition-colors"
            >
              View All Properties
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 4. Crystal Stone Advantage ────────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center relative z-10">
          <div>
            <SectionHeader
              eyebrow="Our Edge"
              title="Why Investors Choose Crystal Stone"
              description="Unparalleled access to premium real estate markets, combining analytical rigour with discrete, white-glove service."
            />
            <div className="space-y-8">
              {advantages.map((adv) => (
                <div key={adv.title} className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-primary">{adv.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-headline-lg text-xl text-on-surface mb-2">{adv.title}</h4>
                    <p className="section-body">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[480px] md:h-[560px] w-full glass-panel p-4 flex items-center justify-center overflow-hidden rounded-lg">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHy6YZS-SXAxJTZgntTjNDkzMLMTx7D2CLkJDkA1eWN3qszVnZdFAFLZoDxn0ObNkzI0bAYBITXynOEJwE1UYeXs71Dgs_HQKFpQRlyRVOetct0kWIVzC6dvfXmOr2EhLqANoesXMfs381ltLJYqMQLYKEFELbDCrORRuvF6ShGUsNcC_vhj9JDMKzyOk-xGIxvSSooZWYAD70ty46PlQLSg0cfkwp3eW4LKRIf8Uuw1OFH-EhC4BHr7HIudTm-kMT2yF917jKTfI"
              alt="Luxury architectural detail"
              fill
              className="object-cover opacity-60"
              unoptimized
            />
            <div className="relative z-10 bg-background/90 backdrop-blur-md p-8 border border-outline-variant/30 max-w-sm w-full">
              <div className="flex justify-between items-center mb-6">
                <span className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs">
                  Portfolio Yield
                </span>
                <span className="material-symbols-outlined text-primary">trending_up</span>
              </div>
              <p className="font-display-lg text-display-lg text-primary mb-2">8.4%</p>
              <div className="w-full bg-surface-container h-1 mb-4 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[84%]" />
              </div>
              <p className="section-body text-sm">
                Projected annual return based on current market analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 5. Investment Preview ───────────────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="order-2 md:order-1">
            <SectionHeader
              eyebrow="Private Equity"
              title="Why Invest in Bangalore"
              description="Specialised SPVs focusing on high-yield, risk-adjusted returns in tier-one global cities. Institutional-grade underwriting ensures capital preservation while targeting aggressive growth."
            />
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="border-l-2 border-primary/40 pl-6">
                <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Target IRR
                </p>
                <p className="font-display-lg text-headline-lg-mobile text-primary">18.5%</p>
              </div>
              <div className="border-l-2 border-primary/40 pl-6">
                <p className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs mb-2">
                  Fund III Status
                </p>
                <p className="font-headline-lg text-xl text-on-surface">Actively Deploying</p>
              </div>
            </div>
            <div className="mb-10">
              <h5 className="font-headline-lg text-lg text-on-surface border-b border-outline-variant/30 pb-3 mb-4">
                Target Asset Classes
              </h5>
              <ul className="space-y-3">
                {assetClasses.map((a) => (
                  <li key={a.label} className="flex items-center gap-3 section-body">
                    <span className="material-symbols-outlined text-primary text-xl">{a.icon}</span>
                    {a.label}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/private-equity"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button"
            >
              Explore Investment Services
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="order-1 md:order-2 relative h-[480px] md:h-[600px] w-full">
            <div className="absolute inset-0 border border-primary/20 translate-x-3 translate-y-3 pointer-events-none" />
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBogkD5T6UIdzpwCN4XuZv7oG-sz0yfL-hcNYCGJgSPpH1fREz60dtUFV3GXuShqY9zBob7Bejsd0OqxYWuquc85Ojl9fjySZrDZzvT5eyuNvjMpwDXNcV7rFKfbJfTur8sEDodBoZ5bm_9O502ebEBkMDYlXASIk5gUuG1cWaN9cZK9UnHjMQhLKIYESBkcKxOLJATRY8HKeCiireKGXFCgYHlaGiG_s5u3-wR4oilG5olK-cGRAAlEVdeFzWLQglz9E-1XU42vHQ"
              alt="Investment architecture"
              fill
              className="object-cover grayscale contrast-125"
              unoptimized
            />
            <div className="absolute bottom-8 left-0 glass-panel p-6 hidden md:block">
              <p className="font-label-md text-primary uppercase tracking-widest text-xs mb-1">AUM</p>
              <p className="font-display-lg text-headline-lg-mobile text-on-surface">$2.4B+</p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 6. CTA ────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-surface-container-low text-center">
        <div className="max-w-container-max mx-auto">
          <h2 className="section-title mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="section-body max-w-xl mx-auto mb-10">
            Engage with our senior advisory team to discuss your portfolio strategy in strict
            confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/about#contact"
              className="inline-flex justify-center items-center bg-primary text-on-primary font-label-md uppercase tracking-widest px-8 py-4 luxury-button"
            >
              Book Free Consultation
            </Link>
            <Link
              href="#"
              className="inline-flex justify-center items-center border border-primary text-primary font-label-md uppercase tracking-widest px-8 py-4 hover:bg-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined mr-2 text-[18px]">lock</span>
              WhatsApp Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Property card sub-component ───────────────────────────── */
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
}: {
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
}) {
  return (
    <div
      className={`relative group cursor-pointer overflow-hidden rounded-lg card-hover ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div
        className={`absolute bottom-0 left-0 w-full z-10 flex justify-between items-end ${compact ? "p-6" : "p-8"
          }`}
      >
        <div>
          <span className="inline-block px-3 py-1 border border-primary/40 text-primary font-label-md text-[10px] uppercase tracking-widest mb-3">
            {badge}
          </span>
          <h3 className={`font-headline-lg text-on-surface mb-2 ${compact ? "text-xl" : "text-2xl"}`}>
            {title}
          </h3>
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
              {metrics.map((metric) => (
                <div
                  key={metric}
                  className="px-3 py-1 bg-black/50 backdrop-blur-sm border border-primary/30 rounded text-primary text-xs uppercase tracking-wider"
                >
                  {metric}
                </div>
              ))}
            </div>
          ) : (
            <>
              {statLabel && (
                <p className="font-label-md text-primary/80 uppercase tracking-widest text-[10px] mb-1">
                  {statLabel}
                </p>
              )}
              <p className={`font-headline-lg text-primary ${compact ? "text-lg" : "text-2xl"}`}>
                {statValue}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
