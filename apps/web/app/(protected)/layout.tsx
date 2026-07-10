"use client";

import React from "react";
import SidebarLayout from "../../components/SidebarLayout";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
