"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@repo/ui/layout/Navbar";
import Footer from "@repo/ui/layout/Footer";
import brandLogo from "../../public/brand_logo.png";
import { useAppStore } from "../../store/use-app-store";
import CommandCentreLayout from "../../components/CommandCentreLayout";

function PropertiesLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const authStatus = useAppStore((state) => state.authStatus);
  const searchParams = useSearchParams();
  const isNoProfile = searchParams?.get("np") === "1";

  if (isNoProfile) {
    return (
      <>
        <Navbar logo={brandLogo} />
        <main className="grow">{children}</main>
        <Footer />
      </>
    );
  }

  return <CommandCentreLayout>{children}</CommandCentreLayout>;
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <PropertiesLayoutContent>{children}</PropertiesLayoutContent>
    </Suspense>
  );
}
