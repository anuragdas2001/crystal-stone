import Image from "next/image";
import Link from "next/link";

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Investment Disclosure", href: "#" },
  { label: "Legal Notices", href: "#" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "Private Equity", href: "/private-equity" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden w-full py-section-gap border-t border-outline-variant/20">
      {/* Background Image */}
      <Image
        src="/footer_image.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/brand_logo_horizontal.png"
              alt="Crystal Stone Properties"
              width={320}
              height={80}
              priority
              className="h-16 md:h-24 w-auto object-contain"
            />
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs opacity-90">
            Curating exceptional land investment opportunities for investors
            seeking long-term wealth creation through strategic real estate.
          </p>

          <p className="font-body-md text-sm text-on-surface-variant opacity-60 mt-auto">
            © 2024 Crystal Stone Properties. All rights reserved.
          </p>
        </div>

        {/* Legal */}
        <div className="md:col-span-2 md:col-start-7 flex flex-col gap-4">
          <h5 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-2">
            Legal & Trust
          </h5>

          {legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Office */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h5 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-2">
            Office
          </h5>

          <span className="font-body-md text-body-md text-on-surface-variant opacity-80">
            Bangalore, India
          </span>

          <span className="font-body-md text-sm text-on-surface-variant opacity-80 leading-relaxed">
            Cherry Hills,
            <br />
            Embassy Golf Links Business Park,
            <br />
            Domlur, Bengaluru - 560071
          </span>
        </div>

        {/* Company */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h5 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-2">
            Company
          </h5>

          {companyLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="mailto:info@crystalstoneproperties.com"
            className="font-body-md text-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors flex items-center gap-2 mt-3"
          >
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontSize: "16px" }}
            >
              mail
            </span>
            info@crystalstoneproperties.com
          </a>

          <a
            href="tel:+919900093002"
            className="font-body-md text-sm text-on-surface-variant opacity-80 hover:text-primary transition-colors flex items-center gap-2"
          >
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontSize: "16px" }}
            >
              call
            </span>
            +91 99000 93002
          </a>
        </div>
      </div>
    </footer>
  );
}