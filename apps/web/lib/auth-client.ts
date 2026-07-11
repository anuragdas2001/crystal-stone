import { createAuthClient } from "better-auth/react";
import { phoneNumberClient } from "better-auth/client/plugins";

const getBaseUrl = () => {
  return (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  fetchOptions: {
    credentials: "include",
  },
  plugins: [phoneNumberClient()],
});
