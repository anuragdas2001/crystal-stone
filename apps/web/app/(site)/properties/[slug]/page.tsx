"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import PropertyResearchTerminal from "@repo/ui/property/PropertyResearchTerminal";
import { useAppStore } from "../../../../store/use-app-store";

function PropertyAnalysisPageContent() {
  const router = useRouter();
  const routeParams = useParams();
  const slug = (routeParams?.slug as string) || "airport-growth-belt";
  const authStatus = useAppStore((state) => state.authStatus);
  const isUnlocked = authStatus === "authenticated";

  const handleUnlockRequest = () => {
    toast("Redirecting to secure investor portal sign-in...", { icon: "🔒" });
    router.push(`/login?next=/properties/${slug}`);
  };

  return (
    <div className={`bg-background min-h-screen ${!isUnlocked ? "pt-20" : ""}`}>
      {!isUnlocked && (
        <div className="bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border-b border-primary/40 px-4 py-2.5 text-center relative z-20">
          <div className="max-w-container-max mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-label-md uppercase tracking-widest text-on-surface">
            <span className="flex items-center gap-1.5 text-primary font-bold">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>Already a Registered Investor?</span>
            </span>
            <span className="text-on-surface-variant hidden sm:inline">•</span>
            <Link
              href={`/login?next=/properties/${slug}`}
              onClick={() => toast("Redirecting to sign in...")}
              className="text-white font-bold underline hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>Sign In to Unlock Research Terminal &amp; DRM Reports</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}

      <PropertyResearchTerminal
        isUnlocked={isUnlocked}
        slug={slug}
        onUnlockRequest={handleUnlockRequest}
      />
    </div>
  );
}

export default function PropertyAnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <PropertyAnalysisPageContent />
    </Suspense>
  );
}
