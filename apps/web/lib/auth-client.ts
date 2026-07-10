import { createAuthClient } from "better-auth/react";
import { phoneNumberClient } from "better-auth/client/plugins";

const getBaseUrl = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    return window.location.origin;
  }
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  fetchOptions: {
    credentials: "include",
  },
  plugins: [phoneNumberClient()],
});
