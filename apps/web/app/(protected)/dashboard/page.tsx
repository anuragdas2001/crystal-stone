"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

// Mock Data for Luxury Properties
const PRIME_PROPERTIES = [
  {
    id: "prop-1",
    title: "Penthouse at The Obsidian Tower",
    location: "Tribeca, New York",
    price: "$18,500,000",
    yield: "5.8% Est. Cap",
    specs: { beds: 5, baths: 6.5, sqft: "6,200" },
    status: "Under Offer",
    statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    clientInterest: 14,
  },
  {
    id: "prop-2",
    title: "Villa Solarium Sanctuary Estate",
    location: "Beverly Hills, California",
    price: "$24,000,000",
    yield: "6.4% Est. Cap",
    specs: { beds: 7, baths: 9, sqft: "12,400" },
    status: "Active Listing",
    statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    clientInterest: 22,
  },
  {
    id: "prop-3",
    title: "The Glass Pavilion Waterfront",
    location: "Miami Beach, Florida",
    price: "$14,200,000",
    yield: "7.1% Est. Cap",
    specs: { beds: 4, baths: 5, sqft: "5,800" },
    status: "Active Listing",
    statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    clientInterest: 19,
  },
  {
    id: "prop-4",
    title: "Alpine Sanctuary Chalet & Estate",
    location: "Aspen, Colorado",
    price: "$31,000,000",
    yield: "4.9% Est. Cap",
    specs: { beds: 6, baths: 8, sqft: "9,500" },
    status: "Private Pocket",
    statusColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    clientInterest: 8,
  },
];

// Mock Data for High-Net-Worth Client Enquiries
const CLIENT_ENQUIRIES = [
  {
    id: "enq-101",
    client: "Lord Alexander Vance",
    email: "a.vance@vanceholdings.co.uk",
    property: "Penthouse at The Obsidian Tower",
    budget: "$18M - $22M",
    date: "Today, 10:42 AM",
    status: "Private Viewing Scheduled",
    statusStyle: "text-primary border-primary/30 bg-primary/10",
  },
  {
    id: "enq-102",
    client: "Elena Rostova (Family Office)",
    email: "e.rostova@rostovawealth.ch",
    property: "Villa Solarium Sanctuary Estate",
    budget: "$25M+",
    date: "Yesterday",
    status: "Background Verification",
    statusStyle: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  },
  {
    id: "enq-103",
    client: "Marcus Chen",
    email: "m.chen@apexcapital.sg",
    property: "The Glass Pavilion Waterfront",
    budget: "$15M Cash",
    date: "Jun 28, 2026",
    status: "Escrow Pending",
    statusStyle: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  },
  {
    id: "enq-104",
    client: "Sophia von Hohenstaufen",
    email: "s.hohenstaufen@private.de",
    property: "Alpine Sanctuary Chalet & Estate",
    budget: "$30M - $35M",
    date: "Jun 25, 2026",
    status: "NDA Signed",
    statusStyle: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  },
];

export default function RealEstateDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredProperties = PRIME_PROPERTIES.filter((p) => {
    const matchesFilter = selectedFilter === "All" || p.status.includes(selectedFilter);
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      {/* Sidebar Navigation */}
      <aside className="hidden w-64 flex-col border-r border-outline-variant/30 bg-surface-container-lowest lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-outline-variant/30 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 border border-primary/30 text-primary">
            <span className="material-symbols-outlined">diamond</span>
          </div>
          <div>
            <span className="block font-serif text-base font-bold tracking-tight text-on-surface">
              CRYSTAL STONE
            </span>
            <span className="block font-sans text-[10px] uppercase tracking-widest text-primary">
              Private Portal
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-6">
          <div>
            <p className="section-eyebrow mb-3">Portfolio Management</p>
            <nav className="space-y-1">
              {[
                { id: "overview", label: "Executive Overview", icon: "dashboard" },
                { id: "listings", label: "Exclusive Listings", icon: "villa" },
                { id: "enquiries", label: "Client Enquiries", icon: "handshake" },
                { id: "analytics", label: "Yield & Analytics", icon: "trending_up" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-all ${
                    activeTab === item.id
                      ? "bg-primary/15 font-medium text-primary border border-primary/30"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <p className="section-eyebrow mb-3">Institutional Advisory</p>
            <nav className="space-y-1">
              {[
                { label: "Market Intelligence", icon: "public" },
                { label: "Escrow & Vault", icon: "lock" },
                { label: "Co-Broker Network", icon: "groups" },
                { label: "Legal & Compliance", icon: "gavel" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm text-on-surface-variant transition-all hover:bg-surface-container hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* User Card */}
        <div className="border-t border-outline-variant/30 p-4">
          <div className="flex items-center justify-between rounded-xl bg-surface-container p-3 border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                AD
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-medium text-on-surface">Anurag Das</p>
                <p className="truncate text-[10px] text-on-surface-variant">Senior Partner</p>
              </div>
            </div>
            <Link
              href="/"
              title="Return to home"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-highest hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-20 items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-2xl tracking-tight text-on-surface">
              {activeTab === "overview" && "Executive Real Estate Overview"}
              {activeTab === "listings" && "Prime Exclusive Sanctuary Portfolio"}
              {activeTab === "enquiries" && "VIP Client Acquisition & Enquiries"}
              {activeTab === "analytics" && "Institutional Yield & Valuation Analytics"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
                search
              </span>
              <input
                type="text"
                placeholder="Search prime assets or clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 rounded-full border border-outline-variant/40 bg-surface-container py-2 pl-10 pr-4 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              onClick={() => toast("You have 4 new VIP client mandates pending review.", { icon: "🔔" })}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/40 bg-surface-container text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </button>

            <button
              onClick={() => toast.success("Exclusive listing intake mandate initialized.")}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-on-primary transition-all hover:brightness-110 shadow-lg shadow-primary/10"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add Exclusive Listing
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Key Performance Indicators (KPIs) */}
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="glass-panel relative overflow-hidden rounded-xl p-6 transition-all hover:border-primary/50">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-on-surface-variant">
                  Total Portfolio Value
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                </div>
              </div>
              <p className="mt-4 font-serif text-3xl font-bold text-on-surface">$87.7M</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+14.2% QoQ Valuation Growth</span>
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-xl p-6 transition-all hover:border-primary/50">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-on-surface-variant">
                  Active Sanctuary Assets
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[18px]">real_estate_agent</span>
                </div>
              </div>
              <p className="mt-4 font-serif text-3xl font-bold text-on-surface">24</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant">
                <span className="text-primary font-medium">8 Under Offer</span> • Avg $16.4M
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-xl p-6 transition-all hover:border-primary/50">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-on-surface-variant">
                  Average Cap Rate Yield
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[18px]">pie_chart</span>
                </div>
              </div>
              <p className="mt-4 font-serif text-3xl font-bold text-on-surface">6.84%</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                <span>+0.42% Institutional Alpha</span>
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-xl p-6 transition-all hover:border-primary/50">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-on-surface-variant">
                  Active VIP Enquiries
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                </div>
              </div>
              <p className="mt-4 font-serif text-3xl font-bold text-on-surface">18</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-primary">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>4 Private Viewings This Week</span>
              </div>
            </div>
          </section>

          {/* Filter Pills & Properties Section */}
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-xl text-on-surface">Prime Featured Listings</h2>
                <p className="text-xs text-on-surface-variant">
                  Curated trophy residences and institutional assets currently under mandate.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {["All", "Active", "Under Offer", "Pocket"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                      selectedFilter === filter
                        ? "bg-primary text-on-primary shadow-md shadow-primary/10"
                        : "border border-outline-variant/40 bg-surface-container text-on-surface-variant hover:border-primary/50 hover:text-on-surface"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Property Image Cover */}
                  <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    
                    <span
                      className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-md ${property.statusColor}`}
                    >
                      {property.status}
                    </span>

                    <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 font-mono text-xs font-bold text-primary backdrop-blur-md border border-primary/30">
                      {property.yield}
                    </span>
                  </div>

                  {/* Property Details */}
                  <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-on-surface-variant/80">
                        {property.location}
                      </p>
                      <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-on-surface group-hover:text-primary transition-colors">
                        {property.title}
                      </h3>
                      <p className="mt-2 font-serif text-lg font-bold text-primary">
                        {property.price}
                      </p>
                    </div>

                    {/* Specs Divider */}
                    <div className="flex items-center justify-between border-t border-outline-variant/20 pt-3 text-xs text-on-surface-variant">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bed</span>
                        <span>{property.specs.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">shower</span>
                        <span>{property.specs.baths} Baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">square_foot</span>
                        <span>{property.specs.sqft} sqft</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-on-surface-variant">
                        🔥 {property.clientInterest} active inquiries
                      </span>
                      <button className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-on-primary transition-all">
                        Manage Mandate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lower Grid: Client Enquiries Table & Yield Breakdown */}
          <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Enquiries Table (2 cols) */}
            <div className="lg:col-span-2 rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg text-on-surface">
                    Recent VIP Client Enquiries
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Private acquisition mandates and verified family office inquiries.
                  </p>
                </div>
                <button className="text-xs font-medium text-primary hover:underline">
                  View All Mandates →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-outline-variant/30 text-on-surface-variant uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Client Identity</th>
                      <th className="pb-3 font-semibold">Asset Mandate</th>
                      <th className="pb-3 font-semibold">Budget</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15">
                    {CLIENT_ENQUIRIES.map((enquiry) => (
                      <tr key={enquiry.id} className="group hover:bg-surface-container/50 transition-colors">
                        <td className="py-3.5 pr-4">
                          <p className="font-medium text-on-surface">{enquiry.client}</p>
                          <p className="text-[11px] text-on-surface-variant">{enquiry.email}</p>
                        </td>
                        <td className="py-3.5 pr-4">
                          <p className="text-on-surface font-medium">{enquiry.property}</p>
                          <p className="text-[10px] text-on-surface-variant">{enquiry.date}</p>
                        </td>
                        <td className="py-3.5 pr-4 font-mono font-semibold text-primary">
                          {enquiry.budget}
                        </td>
                        <td className="py-3.5 pr-4">
                          <span
                            className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${enquiry.statusStyle}`}
                          >
                            {enquiry.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <button className="rounded border border-outline-variant/40 bg-surface px-2.5 py-1 text-[11px] font-medium text-on-surface hover:border-primary hover:text-primary transition-all">
                            Review Dossier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Portfolio Allocation & Yield Summary Panel */}
            <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="font-serif text-lg text-on-surface">Institutional Yield Allocation</h2>
                <p className="text-xs text-on-surface-variant">
                  Current capital deployment across prime property sectors.
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-on-surface">Prime Residential Estates</span>
                      <span className="font-mono text-primary">62% • $54.3M</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="h-full w-[62%] rounded-full bg-primary" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-on-surface">Trophy Penthouses</span>
                      <span className="font-mono text-emerald-400">24% • $21.0M</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="h-full w-[24%] rounded-full bg-emerald-400" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-on-surface">Land & Sanctuary Developments</span>
                      <span className="font-mono text-amber-400">14% • $12.4M</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="h-full w-[14%] rounded-full bg-amber-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
                <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                <h3 className="mt-1 font-serif text-sm font-bold text-on-surface">
                  Escrow Vault Verified
                </h3>
                <p className="mt-1 text-[11px] text-on-surface-variant leading-relaxed">
                  All active transactions are protected by institutional grade cryptographic escrow & legal compliance.
                </p>
                <button className="mt-3 w-full rounded-lg bg-primary py-2 text-xs font-semibold text-on-primary transition-all hover:brightness-110">
                  Generate Q2 Audit Report
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}