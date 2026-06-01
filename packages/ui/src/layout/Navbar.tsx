"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Private Equity – SPV", href: "/private-equity" },
  { label: "Services", href: "/services" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 w-full z-50 border-b border-outline-variant/30 transition-all duration-300
        ${scrolled ? "bg-background/95 shadow-lg shadow-black/20" : "bg-background/80 backdrop-blur-md"}`}
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <span
            className="material-symbols-outlined text-primary fill-icon shrink-0"
            style={{ fontSize: "28px" }}
          >
            domain
          </span>
          <span className="font-display-lg text-headline-lg-mobile md:text-[26px] text-primary tracking-tight truncate">
            Crystal Stone Properties
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const hrefPath = link.href.split("#")[0] || "/";
            const isActive =
              hrefPath === "/"
                ? pathname === "/"
                : pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-label-md text-label-md uppercase tracking-widest transition-colors duration-300 whitespace-nowrap
                  ${isActive
                    ? "text-primary border-b-2 border-primary pb-0.5"
                    : "text-on-surface-variant hover:text-primary"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        {/* <Link
          href="/contact"
          className="hidden lg:inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary font-label-md uppercase tracking-widest luxury-button text-sm"
        >
          Talk to an Expert
        </Link> */}

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-primary transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span className={`block h-px w-6 bg-primary transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <span
            className={`block h-px w-6 bg-primary transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 border-t border-outline-variant/20 py-6 px-margin-mobile flex flex-col gap-5 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary font-label-md uppercase tracking-widest text-sm"
            onClick={() => setMobileOpen(false)}
          >
            Talk to an Expert
          </Link>
        </div>
      )} */}
    </nav>
  );
}
