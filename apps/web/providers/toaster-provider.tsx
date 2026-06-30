"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "rgba(17, 17, 17, 0.85)",
          color: "#f5f5f5",
          border: "1px solid rgba(230, 193, 131, 0.25)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          fontFamily: "var(--font-manrope), system-ui, sans-serif",
          fontSize: "0.875rem",
          padding: "14px 18px",
          borderRadius: "0.5rem",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 15px rgba(230, 193, 131, 0.05)",
        },
        success: {
          iconTheme: {
            primary: "#e6c183",
            secondary: "#111111",
          },
          style: {
            border: "1px solid rgba(230, 193, 131, 0.45)",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#111111",
          },
          style: {
            border: "1px solid rgba(239, 68, 68, 0.4)",
          },
        },
        loading: {
          iconTheme: {
            primary: "#e6c183",
            secondary: "#111111",
          },
        },
      }}
    />
  );
}
