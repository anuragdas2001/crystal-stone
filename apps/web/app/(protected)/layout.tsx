"use client";

import React from "react";
import CommandCentreLayout from "../../components/CommandCentreLayout";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <CommandCentreLayout>{children}</CommandCentreLayout>;
}
