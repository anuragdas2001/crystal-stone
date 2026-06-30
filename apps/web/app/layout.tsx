/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Libre_Caslon_Text, Manrope } from "next/font/google";
import { AuthSessionProvider } from "../providers/auth-session-provider";
import { ToasterProvider } from "../providers/toaster-provider";
import "./globals.css";

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crystal Stone Properties — Find Your Sanctuary",
  description:
    "Luxury real estate and institutional investment advisory for discerning clients worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${libreCaslon.variable} ${manrope.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0..1,0&display=swap"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <AuthSessionProvider>
          <ToasterProvider />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
