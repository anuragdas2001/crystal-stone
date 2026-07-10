"use client";

import { useEffect } from "react";
import { useAppStore } from "../store/use-app-store";

export function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadAuthSession = useAppStore((state) => state.loadAuthSession);

  useEffect(() => {
    console.log("[AuthSessionProvider] ⚡ Provider mounted. Triggering initial loadAuthSession()...");
    void loadAuthSession();
  }, [loadAuthSession]);

  return children;
}
