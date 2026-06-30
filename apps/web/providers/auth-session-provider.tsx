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
    void loadAuthSession();
  }, [loadAuthSession]);

  return children;
}
