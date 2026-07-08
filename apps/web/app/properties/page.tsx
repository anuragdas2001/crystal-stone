"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAppStore } from "../../store/use-app-store";
import ProtectedPropertiesView from "./_components/ProtectedPropertiesView";
import PublicPropertiesView from "./_components/PublicPropertiesView";

function PropertiesPageContent() {
  const authStatus = useAppStore((state) => state.authStatus);
  const searchParams = useSearchParams();
  const isNoProfile = searchParams?.get("np") === "1";

  if (isNoProfile) {
    return <PublicPropertiesView />;
  }

  return <ProtectedPropertiesView />;
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={null}>
      <PropertiesPageContent />
    </Suspense>
  );
}
