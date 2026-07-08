"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppStore } from "../store/use-app-store";

export default function CommandCentreLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const authStatus = useAppStore((state) => state.authStatus);
  const signOut = useAppStore((state) => state.signOut);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (authStatus === "loading" || authStatus === "idle") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant">
            Verifying Portal Access...
          </span>
        </div>
      </div>
    );
  }

  if (authStatus === "unauthenticated") {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }

    const handleLogout = async () => {
      toast.loading("Signing out of private portal...", { id: "logout-toast" });
      const res = await signOut();
      if (res.ok) {
        toast.success("Successfully logged out. Switching to public preview mode.", { id: "logout-toast" });
        router.push("/properties");
      } else {
        toast.error(res.error || "Failed to sign out.", { id: "logout-toast" });
      }
    };

    const getPageTitle = () => {
      if (pathname === "/dashboard") return "Private Investor Command Centre";
      if (pathname.startsWith("/properties/")) return "Private Investment Research Terminal";
      if (pathname === "/properties") return "Investment Portfolio & Opportunities";
      if (pathname === "/dashboard/documents") return "Institutional Due Diligence & Documents";
      if (pathname === "/dashboard/transactions") return "Transaction History & Ledger";
      if (pathname === "/dashboard/insights") return "Market Intelligence & Insights";
      if (pathname === "/dashboard/consultation") return "Private Advisory & Consultation";
      if (pathname === "/dashboard/legal") return "Legal & Compliance Audit";
      if (pathname === "/dashboard/management") return "Property Management & Asset Care";
      if (pathname === "/dashboard/performance") return "Portfolio Performance Tracking";
      if (pathname === "/dashboard/reports") return "Institutional Reports & Analytics";
      return "Private Investor Command Centre";
    };

    const isLinkActive = (href: string, exact = false) => {
      if (exact) return pathname === href;
      return pathname === href || pathname.startsWith(href + "/");
    };

    const navItems = [
      { label: "Dashboard", icon: "dashboard", href: "/dashboard", exact: true },
      { label: "Properties", icon: "real_estate_agent", href: "/properties" },
      { label: "Documents", icon: "description", href: "/dashboard/documents" },
      { label: "Transactions", icon: "receipt_long", href: "/dashboard/transactions" },
      { label: "Market Insights", icon: "trending_up", href: "/dashboard/insights" },
      { label: "Consultation", icon: "support_agent", href: "/dashboard/consultation" },
      { label: "Legal & Compliance", icon: "gavel", href: "/dashboard/legal" },
      { label: "Property Management", icon: "home_work", href: "/dashboard/management" },
      { label: "Performance", icon: "leaderboard", href: "/dashboard/performance" },
      { label: "Analytics & Reports", icon: "analytics", href: "/dashboard/reports" },
    ];

    return (
      <div className="flex min-h-screen bg-background text-on-surface selection:bg-primary selection:text-on-primary">
        {/* Sleek Institutional Fixed Sidebar Navigation */}
        <aside
          className={`fixed top-0 left-0 z-40 hidden h-screen flex-col border-r border-outline-variant/30 bg-surface-container-lowest transition-all duration-300 lg:flex shrink-0 overflow-x-hidden ${isCollapsed ? "w-20" : "w-72"
            }`}
        >
          {/* Brand Header */}
          <div className={`flex h-20 items-center border-b border-outline-variant/30 shrink-0 transition-all ${isCollapsed ? "justify-center px-2" : "justify-between px-6"
            }`}>
            {!isCollapsed ? (
              <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden py-1">
                <Image
                  src="/brand_logo.png"
                  alt="Crystal Stone Logo"
                  width={210}
                  height={56}
                  className="h-14 w-auto object-contain"
                  unoptimized
                />
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center justify-center p-1 rounded-lg transition-transform hover:scale-105"
                title="Crystal Stone Private Portal"
              >
                <Image
                  src="/brand_logo_vertical.png"
                  alt="Crystal Stone Vertical Logo"
                  width={64}
                  height={64}
                  className="h-14 w-auto object-contain"
                  unoptimized
                />
              </Link>
            )}
          </div>

          {/* Flat Navigation List without Category Headers */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto overflow-x-hidden px-3 py-6 no-scrollbar">
            {navItems.map((item) => {
              const active = isLinkActive(item.href, item.exact);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    if (item.href !== "/properties" && item.href !== "/dashboard") {
                      toast(`Viewing ${item.label} (Phase 1 Institutional Module)`, { icon: "✨" });
                    }
                  }}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex w-full items-center gap-3.5 px-3.5 py-3 font-label-md text-xs uppercase tracking-widest transition-all duration-200 rounded-lg ${active
                      ? "bg-primary text-on-primary luxury-button shadow-lg shadow-primary/20 font-bold"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    } ${isCollapsed ? "justify-center px-0" : ""}`}
                >
                  <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Footer Card */}
          <div className="border-t border-outline-variant/30 p-3 shrink-0">
            {!isCollapsed ? (
              <div className="flex items-center justify-between bg-surface-container/80 p-3 rounded-xl border border-outline-variant/20">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-xs font-bold text-on-primary rounded-full shadow-inner">
                    JK
                  </div>
                  <div className="overflow-hidden">
                    <p className="truncate text-xs font-semibold text-on-surface">Joseph Kiran</p>
                    <p className="truncate font-label-md text-[10px] text-primary uppercase tracking-widest">
                      Premium Investor
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sign Out of Private Portal"
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-on-surface-variant hover:bg-red-500/10 hover:text-red-400 transition-colors rounded-md"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-1">
                <div
                  title="Joseph Kiran — Premium Investor"
                  className="flex h-9 w-9 items-center justify-center bg-primary text-xs font-bold text-on-primary rounded-full cursor-pointer shadow-inner"
                >
                  JK
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sign Out of Private Portal"
                  className="flex h-9 w-9 items-center justify-center text-on-surface-variant hover:bg-red-500/10 hover:text-red-400 transition-colors rounded-lg"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area (padded left to offset fixed sidebar on desktop) */}
        <div
          className={`flex flex-1 flex-col min-h-screen transition-all duration-300 ${isCollapsed ? "lg:pl-20" : "lg:pl-72"
            }`}
        >
          {/* Top Header */}
          <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest/90 px-4 md:px-8 backdrop-blur-md shrink-0 shadow-sm">
            <div className="flex items-center gap-4 min-w-0">
              {/* Collapse Toggle Button */}
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex h-10 w-10 shrink-0 items-center justify-center border border-outline-variant/40 bg-surface-container text-on-surface-variant hover:border-primary hover:text-primary transition-all rounded-lg"
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isCollapsed ? "menu" : "menu_open"}
                </span>
              </button>

              <h1 className="font-headline-lg text-lg md:text-2xl text-on-surface font-bold tracking-tight truncate">
                {getPageTitle()}
              </h1>
            </div>

            <div className="flex items-center gap-3 md:gap-4 shrink-0">
              {/* Search Input */}
              <div className="relative hidden xl:block">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by location, project or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 border border-outline-variant/40 bg-surface-container py-2 pl-10 pr-4 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all rounded-md"
                />
              </div>

              {/* Notification Bell */}
              <button
                type="button"
                onClick={() => toast("You have 3 new investment updates and document verifications.", { icon: "🔔" })}
                className="relative flex h-10 w-10 items-center justify-center border border-outline-variant/40 bg-surface-container text-on-surface-variant hover:border-primary hover:text-primary transition-all rounded-lg"
                title="Notifications"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-bold text-on-primary rounded-full">
                  3
                </span>
              </button>

              {/* Messages */}
              <button
                type="button"
                onClick={() => toast("Opening institutional advisor direct line...", { icon: "💬" })}
                className="hidden sm:flex h-10 w-10 items-center justify-center border border-outline-variant/40 bg-surface-container text-on-surface-variant hover:border-primary hover:text-primary transition-all rounded-lg"
                title="Messages"
              >
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </button>

              {/* Top Bar Sign Out Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3.5 py-2 border border-outline-variant/40 bg-surface-container text-xs font-label-md uppercase tracking-widest text-on-surface-variant hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10 transition-all rounded-lg"
                title="Sign Out of Institutional Portal"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span className="hidden md:inline">Sign Out</span>
              </button>

              {/* Mobile Profile Trigger */}
              <div className="flex h-9 w-9 items-center justify-center bg-primary text-xs font-bold text-on-primary lg:hidden rounded-full shadow-md">
                JK
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    );
  }
