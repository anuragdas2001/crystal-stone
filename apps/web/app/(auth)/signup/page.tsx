"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Gem,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
} from "lucide-react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

const BENEFITS = [
  "Early Access to Listings",
  "Dedicated Expert Advisor",
  "Detailed Market Analytics",
  "Priority Property Viewings",
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up registration
  }

  return (
    <div className="flex h-screen bg-background text-on-surface">
      {/* Brand panel */}
      <section className="relative hidden h-full w-1/2 overflow-hidden border-r border-outline-variant/30 lg:flex">
        {/* Background Image */}
        <Image
          src="/signup.jpg" // Update to your image path
          alt="Luxury estate at dusk"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/0" />


        {/* Content */}
        <div className="relative z-10 flex h-full w-full items-center px-16">
          <div className="max-w-md">
            {/* Logo Section */}
            {/* <div className="mb-10 flex items-center gap-4">
              <div className="rounded-lg border border-primary/25 bg-primary/5 p-3">
                <Gem className="h-7 w-7 text-primary" strokeWidth={1.25} />
              </div>

              <div>
                <h1 className="font-display-lg text-3xl text-on-surface">
                  Crystal Stone
                </h1>
                <p className="section-eyebrow mt-1">Premium Real Estate</p>
              </div>
            </div> */}

            <h2 className="section-title">
              Join Our
              <br />
              <span className="text-primary italic"> Exclusive </span>
              Network
            </h2>

            <p className="section-body mt-6 leading-relaxed">
              Create an account to unlock highly coveted properties, off-market
              listings, and bespoke investment advisory.
            </p>

            <ul className="mt-12 space-y-4">
              {BENEFITS.map((label) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="section-body">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Signup panel */}
      <section className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-12 md:px-12">
        <div className="w-full max-w-md py-8">
          <Link
            href="/login"
            className="mb-10 inline-flex items-center gap-2 font-label-md text-label-md uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <h1 className="font-display-lg text-headline-lg-mobile text-on-surface">
            Create an Account
          </h1>
          <p className="mt-2 section-body">
            Enter your details to request access to the portal.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {/* Full Name Input */}
            <div>
              <Label
                htmlFor="fullName"
                className="mb-2 block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant"
              >
                Full Name
              </Label>
              <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low px-4 transition-colors focus-within:border-primary/60">
                <User className="mr-3 h-4 w-4 shrink-0 text-outline" />
                <Input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="h-14 flex-1 border-0 bg-transparent px-0 font-body-md text-on-surface shadow-none placeholder:text-outline focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <Label
                htmlFor="email"
                className="mb-2 block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant"
              >
                Email Address
              </Label>
              <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low px-4 transition-colors focus-within:border-primary/60">
                <Mail className="mr-3 h-4 w-4 shrink-0 text-outline" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-14 flex-1 border-0 bg-transparent px-0 font-body-md text-on-surface shadow-none placeholder:text-outline focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <Label
                htmlFor="phone"
                className="mb-2 block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant"
              >
                Phone Number
              </Label>
              <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low px-4 transition-colors focus-within:border-primary/60">
                <Phone className="mr-3 h-4 w-4 shrink-0 text-outline" />
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="h-14 flex-1 border-0 bg-transparent px-0 font-body-md text-on-surface shadow-none placeholder:text-outline focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <Label
                htmlFor="password"
                className="mb-2 block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant"
              >
                Password
              </Label>
              <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low px-4 transition-colors focus-within:border-primary/60">
                <Lock className="mr-3 h-4 w-4 shrink-0 text-outline" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="h-14 flex-1 border-0 bg-transparent px-0 font-body-md text-on-surface shadow-none placeholder:text-outline focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-outline transition-colors hover:text-primary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="luxury-button h-14 w-full rounded-lg bg-primary font-label-md text-label-md uppercase tracking-widest text-on-primary"
              >
                Sign Up
              </Button>
            </div>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="gold-divider flex-1" />
            <span className="font-label-md text-label-md text-on-surface-variant">
              OR
            </span>
            <div className="gold-divider flex-1" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="luxury-button flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-outline-variant bg-transparent font-label-md text-label-md uppercase tracking-widest text-on-surface transition-colors hover:border-primary/40 hover:bg-surface-container-low"
          >
            <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.4-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l6-6C34.5 6.1 29.6 4 24 4c-7.8 0-14.4 4.4-17.7 10.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.5 0 10.4-1.8 14.1-5l-6.5-5.5C29.6 35.4 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.4 39.6 16.1 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-2.9 5.3-5.4 6.9l6.5 5.5C39.9 37.1 44 31.5 44 24c0-1.2-.1-2.4-.4-3.5z"
              />
            </svg>
            Continue with Google
          </Button>

          <p className="mt-8 text-center font-body-md text-on-surface-variant">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-label-md text-primary transition-colors hover:text-primary-fixed"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}