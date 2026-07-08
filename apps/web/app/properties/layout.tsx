"use client";

import React from "react";
import Navbar from "@repo/ui/layout/Navbar";
import Footer from "@repo/ui/layout/Footer";
import brandLogo from "../../public/brand_logo.png";
import { useAppStore } from "../../store/use-app-store";
import CommandCentreLayout from "../../components/CommandCentreLayout";

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authStatus = useAppStore((state) => state.authStatus);

  if (authStatus === "loading" || authStatus === "idle") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">
            Verifying Access...
          </span>
        </div>
      </div>
    );
  }

  if (authStatus === "authenticated") {
    return <CommandCentreLayout>{children}</CommandCentreLayout>;
  }

  return (
    <>
      <Navbar logo={brandLogo} />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
