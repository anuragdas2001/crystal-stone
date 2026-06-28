import Navbar from "@repo/ui/layout/Navbar";
import brandLogo from "../../public/brand_logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar logo={brandLogo} /> */}
      <main className="min-h-screen grow ">{children}</main>
    </>
  );
}
