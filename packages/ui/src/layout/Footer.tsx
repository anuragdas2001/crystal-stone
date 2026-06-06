import Image from "next/image";
import Link from "next/link";

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Investment Disclosure", href: "#" },
  { label: "Legal Notices", href: "#" },
];

const officeLinks = [
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "Private Equity", href: "/private-equity" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-section-gap border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
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
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs opacity-80">
            Curating the world's most exceptional real estate for those who demand the extraordinary.
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
          {legalLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Offices */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h5 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-2">Offices</h5>
          <span className="font-body-md text-body-md text-on-surface-variant opacity-80">
            Bangalore, India
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant opacity-80 text-sm leading-relaxed">
            Cherry Hills, Embassy Golf Links Business Park, Domlur — 560071
          </span>
        </div>

        {/* Connect */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h5 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-2">Company</h5>
          {officeLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:info@crystalstoneproperties.com"
            className="font-body-md text-sm text-on-surface-variant opacity-70 hover:text-primary transition-colors flex items-center gap-1.5 mt-2"
          >
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "16px" }}>mail</span>
            info@crystalstoneproperties.com
          </a>
          <a
            href="tel:+919900093002"
            className="font-body-md text-sm text-on-surface-variant opacity-70 hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-primary" style={{ fontSize: "16px" }}>call</span>
            +91 99000 93002
          </a>
        </div>
      </div>
    </footer>
  );
}
