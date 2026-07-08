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
