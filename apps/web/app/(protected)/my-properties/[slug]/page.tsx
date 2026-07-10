"use client";

import React, { Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import PropertyResearchTerminal from "@repo/ui/property/PropertyResearchTerminal";

function ProtectedPropertyAnalysisContent() {
  const router = useRouter();
  const routeParams = useParams();
  const slug = (routeParams?.slug as string) || "airport-growth-belt";

  const handleUnlockRequest = () => {
    toast("Redirecting to secure investor portal sign-in...", { icon: "🔒" });
    router.push("/login");
  };

  return (
    <div className="bg-background min-h-screen">
      <PropertyResearchTerminal
        isUnlocked={true}
        slug={slug}
        onUnlockRequest={handleUnlockRequest}
      />
    </div>
  );
}

export default function ProtectedPropertyAnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <ProtectedPropertyAnalysisContent />
    </Suspense>
  );
}
