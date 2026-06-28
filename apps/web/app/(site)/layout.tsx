import Navbar from "@repo/ui/layout/Navbar";
import Footer from "@repo/ui/layout/Footer";
import brandLogo from "../../public/brand_logo.png";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar logo={brandLogo} />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
}
