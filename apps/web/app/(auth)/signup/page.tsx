"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, KeyRound, ArrowLeft, Mail, User } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import toast from "react-hot-toast";
import { useAppStore } from "../../../store/use-app-store";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "otp">("details");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const authError = useAppStore((state) => state.authError);
  const authOperation = useAppStore((state) => state.authOperation);
  const sendPhoneOtp = useAppStore((state) => state.sendPhoneOtp);
  const verifyPhoneSignUp = useAppStore((state) => state.verifyPhoneSignUp);
  const continueWithGoogle = useAppStore((state) => state.continueWithGoogle);
  const continueWithLinkedIn = useAppStore((state) => state.continueWithLinkedIn);
  const clearAuthError = useAppStore((state) => state.clearAuthError);

  const isSendingOtp = authOperation === "send-otp";
  const isVerifying = authOperation === "verify-otp";
  const isGoogleLoading = authOperation === "google";
  const isLinkedInLoading = authOperation === "linkedin";

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim()) {
      toast.error("Please enter your first name.");
      return;
    }
    if (!lastName.trim()) {
      toast.error("Please enter your last name.");
      return;
    }
    if (!phoneNumber.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber.trim()}`;
    const loadingToast = toast.loading("Sending verification code...");
    const result = await sendPhoneOtp(fullPhoneNumber);
    toast.dismiss(loadingToast);

    if (result.ok) {
      toast.success("Verification code sent via SMS!");
      setStep("otp");
    } else {
      toast.error(result.error || "Failed to send verification code.");
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || code.trim().length < 4) {
      toast.error("Please enter a valid verification code.");
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber.trim()}`;
    const loadingToast = toast.loading("Verifying code & creating account...");
    const result = await verifyPhoneSignUp({
      phoneNumber: fullPhoneNumber,
      code: code.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim() || undefined,
    });
    toast.dismiss(loadingToast);

    if (result.ok) {
      toast.success("Account created successfully! Welcome to Crystal Stone.");
      router.push("/onboarding");
      router.refresh();
    } else {
      toast.error(result.error || "Registration failed. Please check the code.");
    }
  }

  async function handleGoogleSignIn() {
    await continueWithGoogle("/onboarding");
  }

  async function handleLinkedInSignIn() {
    await continueWithLinkedIn("/onboarding");
  }

  return (
    <div className="flex h-screen bg-background text-on-surface">
      {/* Brand panel */}
      <section className="relative hidden h-full w-1/2 overflow-hidden border-r border-outline-variant/30 lg:flex">
        {/* Background Image */}
        <Image
          src="/signup.jpg"
          alt="Luxury estate at dusk"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/0" />

        {/* Content */}
        <div className="relative z-10 flex h-full w-full items-center px-16">
          <div className="max-w-md">
            <h2 className="section-title">
              Join Our
              <span className="text-primary italic"> Exclusive </span>
              Network
            </h2>

            <p className="section-body mt-4 text-on-surface/80">
              Create your private account to unlock confidential luxury assets,
              AI valuation insights, and tailored advisory.
            </p>
          </div>
        </div>
      </section>

      {/* Form panel */}
      <section className="flex h-screen flex-1 items-center justify-center overflow-y-auto px-6 py-12 lg:px-16">
        <div className="w-full max-w-md my-auto">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="font-display-lg text-3xl text-on-surface">
            Create Account
          </h1>
          <p className="mt-2 section-body">
            {step === "details"
              ? "Join Crystal Stone with passwordless verification."
              : `Enter the 6-digit code sent to ${countryCode} ${phoneNumber}.`}
          </p>

          <div id="recaptcha-container"></div>

          {step === "details" ? (
            <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="mb-2 block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant"
                  >
                    First Name <span className="text-primary">*</span>
                  </Label>
                  <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low px-3 transition-colors focus-within:border-primary/60">
                    <User className="mr-2 h-4 w-4 shrink-0 text-outline" />
                    <Input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(e) => {
                        clearAuthError();
                        setFirstName(e.target.value);
                      }}
                      required
                      className="h-13 flex-1 border-0 bg-transparent px-0 shadow-none font-body-md text-on-surface placeholder:text-outline focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="John"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="lastName"
                    className="mb-2 block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant"
                  >
                    Last Name <span className="text-primary">*</span>
                  </Label>
                  <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low px-3 transition-colors focus-within:border-primary/60">
                    <Input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => {
                        clearAuthError();
                        setLastName(e.target.value);
                      }}
                      required
                      className="h-13 flex-1 border-0 bg-transparent px-0 shadow-none font-body-md text-on-surface placeholder:text-outline focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className="mb-2 block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant"
                >
                  Phone Number <span className="text-primary">*</span>
                </Label>
                <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low transition-colors focus-within:border-primary/60">
                  <select
                    aria-label="Country Code"
                    value={countryCode}
                    onChange={(e) => {
                      clearAuthError();
                      setCountryCode(e.target.value);
                    }}
                    className="h-13 rounded-l-lg border-r border-outline-variant bg-transparent px-3 font-body-md text-on-surface focus:outline-none"
                  >
                    <option value="+1" className="bg-surface text-on-surface">+1 (US/CA)</option>
                    <option value="+91" className="bg-surface text-on-surface">+91 (IN)</option>
                    <option value="+44" className="bg-surface text-on-surface">+44 (UK)</option>
                    <option value="+971" className="bg-surface text-on-surface">+971 (UAE)</option>
                    <option value="+65" className="bg-surface text-on-surface">+65 (SG)</option>
                    <option value="+61" className="bg-surface text-on-surface">+61 (AU)</option>
                  </select>
                  <Phone className="mx-3 h-4 w-4 shrink-0 text-outline" />
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      clearAuthError();
                      setPhoneNumber(e.target.value);
                    }}
                    required
                    className="h-13 flex-1 border-0 bg-transparent pr-4 shadow-none font-body-md text-on-surface placeholder:text-outline focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="555-0199"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="mb-2 block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant"
                >
                  Email Address <span className="text-outline-variant">(Optional)</span>
                </Label>
                <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low px-4 transition-colors focus-within:border-primary/60">
                  <Mail className="mr-3 h-4 w-4 shrink-0 text-outline" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      clearAuthError();
                      setEmail(e.target.value);
                    }}
                    className="h-13 flex-1 border-0 bg-transparent px-0 shadow-none font-body-md text-on-surface placeholder:text-outline focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {authError ? (
                <p className="font-body-md text-sm text-red-400" role="alert">
                  {authError}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={isSendingOtp}
                className="luxury-button h-14 w-full rounded-lg bg-primary font-label-md text-label-md uppercase tracking-widest text-on-primary"
              >
                {isSendingOtp ? "Sending Code..." : "Send Verification Code"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
              <div>
                <Label
                  htmlFor="otp"
                  className="mb-2 block font-label-md text-label-md uppercase tracking-widest text-on-surface-variant"
                >
                  One-Time Password (OTP)
                </Label>
                <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low px-4 transition-colors focus-within:border-primary/60">
                  <KeyRound className="mr-3 h-4 w-4 shrink-0 text-outline" />
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(e) => {
                      clearAuthError();
                      setCode(e.target.value);
                    }}
                    required
                    maxLength={6}
                    className="h-14 flex-1 border-0 bg-transparent px-0 tracking-widest shadow-none font-body-md text-on-surface placeholder:text-outline focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="123456"
                  />
                </div>
              </div>

              {authError ? (
                <p className="font-body-md text-sm text-red-400" role="alert">
                  {authError}
                </p>
              ) : null}

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={isVerifying}
                  className="luxury-button h-14 w-full rounded-lg bg-primary font-label-md text-label-md uppercase tracking-widest text-on-primary"
                >
                  {isVerifying ? "Creating Account..." : "Verify & Create Account"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setCode("");
                    clearAuthError();
                    setStep("details");
                  }}
                  className="h-12 w-full font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
                >
                  Change Details
                </Button>
              </div>
            </form>
          )}

          <div className="my-6 flex items-center gap-4">
            <div className="gold-divider flex-1" />
            <span className="font-label-md text-label-md text-on-surface-variant">
              OR
            </span>
            <div className="gold-divider flex-1" />
          </div>

          <div className="flex flex-col gap-3.5">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isLinkedInLoading}
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
              {isGoogleLoading ? "Opening Google..." : "Continue with Google"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleLinkedInSignIn}
              disabled={isGoogleLoading || isLinkedInLoading}
              className="luxury-button flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-outline-variant bg-transparent font-label-md text-label-md uppercase tracking-widest text-on-surface transition-colors hover:border-primary/40 hover:bg-surface-container-low"
            >
              <svg
                className="h-5 w-5 fill-[#0A66C2]"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.75a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
              </svg>
              {isLinkedInLoading ? "Opening LinkedIn..." : "Continue with LinkedIn"}
            </Button>
          </div>

          <p className="mt-6 text-center text-body-md text-on-surface-variant">
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
