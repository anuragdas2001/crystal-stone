"use client";

import React, { Suspense } from "react";
import PublicPropertiesView from "./_components/PublicPropertiesView";

export default function PropertiesPage() {
  return (
    <Suspense fallback={null}>
      <PublicPropertiesView />
    </Suspense>
  );
}
