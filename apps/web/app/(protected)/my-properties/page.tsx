"use client";

import React, { Suspense } from "react";
import ProtectedPropertiesView from "./_components/ProtectedPropertiesView";

export default function MyPropertiesPage() {
  return (
    <Suspense fallback={null}>
      <ProtectedPropertiesView />
    </Suspense>
  );
}
