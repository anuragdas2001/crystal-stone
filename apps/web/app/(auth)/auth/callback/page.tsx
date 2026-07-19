"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "../../../../store/use-app-store";
import toast from "react-hot-toast";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next");
  const loadAuthSession = useAppStore((state) => state.loadAuthSession);
  
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    async function processCallback() {
      // 1. Ensure session is loaded after OAuth redirect
      const sessionResult = await loadAuthSession();
      
      if (!sessionResult.ok) {
        toast.error("Authentication failed. Please try again.");
        router.push("/login");
        return;
      }

      // 2. Get user ID and check profiling status
      const userId = useAppStore.getState().authUser?.id;
      if (!userId) {
        router.push("/login");
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${apiUrl}/profiling/status?userId=${userId}`);
        const data = await res.json();

        toast.success("Welcome back to Crystal Stone Private Portal.");

        if (data.hasProfile) {
          router.push(next || "/dashboard");
        } else {
          router.push(`/onboarding${next ? `?next=${encodeURIComponent(next)}` : ""}`);
        }
      } catch (e) {
        console.error("Failed to fetch profiling status", e);
        // Fallback to onboarding if status check fails just in case
        router.push(`/onboarding${next ? `?next=${encodeURIComponent(next)}` : ""}`);
      }
    }

    processCallback();
  }, [router, next, loadAuthSession]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="font-label-md text-sm uppercase tracking-widest text-on-surface-variant">
          Verifying Account...
        </p>
      </div>
    </div>
  );
}
