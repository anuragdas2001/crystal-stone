import type { Metadata } from "next";
import PartnerWithUsContent from "./PartnerWithUsContent";

export const metadata: Metadata = {
  title: "Partner With Us — Crystal Stone Properties",
  description:
    "Institutional partnerships for landowners, developers, and investors in Bangalore. Sell land, accelerate project marketing, and explore strategic co-investment opportunities.",
};

export default function PartnerWithUsPage() {
  return <PartnerWithUsContent />;
}

