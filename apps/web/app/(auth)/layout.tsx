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
