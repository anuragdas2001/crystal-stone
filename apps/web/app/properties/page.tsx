"use client";

import React from "react";
import { useAppStore } from "../../store/use-app-store";
import ProtectedPropertiesView from "./_components/ProtectedPropertiesView";
import PublicPropertiesView from "./_components/PublicPropertiesView";

export default function PropertiesPage() {
  const authStatus = useAppStore((state) => state.authStatus);

  if (authStatus === "loading" || authStatus === "idle") {
    return null;
  }

  if (authStatus === "authenticated") {
    return <ProtectedPropertiesView />;
  }

  return <PublicPropertiesView />;
}
