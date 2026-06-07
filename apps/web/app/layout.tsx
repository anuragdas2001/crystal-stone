import type { Metadata } from "next";
import { Libre_Caslon_Text, Manrope } from "next/font/google";
import Navbar from "@repo/ui/layout/Navbar";
import Footer from "@repo/ui/layout/Footer";
import brandLogo from "../public/brand_logo.png";
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
    <html lang="en" className={`dark ${libreCaslon.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0..1,0&display=swap"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar logo={brandLogo} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
