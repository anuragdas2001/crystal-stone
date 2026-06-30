"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  "All Insights",
  "Investment Research",
  "Infrastructure Intelligence",
  "Legal & Due Diligence",
  "Market Reports",
  "Investor Education",
  "Crystal Stone Perspective",
];

const INSIGHTS_ARTICLES = [
  {
    id: "res-101",
    category: "Infrastructure Intelligence",
    title: "Bangalore North Peripheral Ring Road: Land Valuation Impact Analysis 2026–2030",
    summary:
      "A comprehensive geospatial and economic assessment of how upcoming orbital transport corridors are shifting institutional land pricing across Devanahalli and Doddaballapur.",
    readTime: "8 min read",
    date: "June 2026",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    highlight: "Featured Intelligence",
  },
  {
    id: "res-102",
    category: "Legal & Due Diligence",
    title: "Anatomy of Title Verification: Why 30-Year Encumbrance Checks Are No Longer Enough",
    summary:
      "Our legal advisory board examines recent Karnataka High Court precedents regarding ancestral inheritance rights and revenue land conversions in peri-urban belts.",
    readTime: "11 min read",
    date: "June 2026",
    image:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "res-103",
    category: "Investment Research",
    title: "Cap Rates vs Capital Appreciation: Structuring Land Portfolios in High-Inflation Eras",
    summary:
      "Quantitative comparison between prime residential plots and raw development land parcels across economic cycles over the past 25 years.",
    readTime: "9 min read",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "res-104",
    category: "Market Reports",
    title: "Q2 2026 Greater Bangalore Land Market Index & Liquidity Report",
    summary:
      "Analysis of transaction volumes, institutional absorption rates, and regulatory zone adjustments in Sarjapur and Whitefield extension zones.",
    readTime: "14 min read",
    date: "May 2026",
    image:
      "https://images.unsplash.com/photo-1542744094-3a3e220f83ae?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "res-105",
    category: "Investor Education",
    title: "Understanding STRR & BDA Master Plan 2031: A Strategic Guide for Private Equity",
    summary:
      "Demystifying zoning classifications, green belt buffers, and floor space index (FSI) calculations for multi-acre land acquisition mandates.",
    readTime: "7 min read",
    date: "April 2026",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "res-106",
    category: "Crystal Stone Perspective",
    title: "Why We Walk Away: The Discipline of Rejecting Flawed Land Parcels",
    summary:
      "Our senior acquisition committee shares case studies of apparently lucrative parcels rejected due to subtle hydrological risks and road widening overlays.",
    readTime: "6 min read",
    date: "April 2026",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
];

export default function MarketInsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Insights");

  const filteredArticles =
    selectedCategory === "All Insights"
      ? INSIGHTS_ARTICLES
      : INSIGHTS_ARTICLES.filter((item) => item.category === selectedCategory);

  const featuredArticle = INSIGHTS_ARTICLES[0];

  return (
    <main className="min-h-screen bg-background text-on-surface pt-28 pb-24 md:pb-32">
      {/* Header Banner */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16 md:mb-20">
        <div className="max-w-3xl">
          <span className="font-label-md text-primary text-xs uppercase tracking-widest block mb-3">
            Institutional Research & Perspectives
          </span>
          <h1 className="font-display-lg text-4xl md:text-6xl text-on-surface leading-tight mb-6">
            Market Insights
          </h1>
          <p className="font-body-md text-on-surface-variant text-base md:text-lg leading-relaxed">
            Independent research, infrastructure intelligence, and disciplined analysis designed to empower evidence-based land investment decisions.
          </p>
        </div>
      </section>

      {/* Featured Intelligence Card */}
      {selectedCategory === "All Insights" && featuredArticle && (
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-xl border border-primary/30 bg-surface-container-low grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[360px] overflow-hidden">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background/90 via-transparent to-transparent" />
              <span className="absolute top-6 left-6 rounded-full border border-primary/40 bg-black/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-primary uppercase tracking-widest">
                {featuredArticle.highlight}
              </span>
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-on-surface-variant uppercase tracking-wider font-medium">
                  <span className="text-primary">{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant/70">{featuredArticle.date}</span>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:underline"
                >
                  Read Intelligence Brief →
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Category Filter Tabs */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 border-b border-outline-variant/30 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/15"
                  : "border border-outline-variant/40 bg-surface-container text-on-surface-variant hover:border-primary/50 hover:text-on-surface"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredArticles.map((article, i) => (
              <article
                key={article.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full border border-primary/30 bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-primary uppercase tracking-widest">
                    {article.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-on-surface-variant/80 font-medium">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline"
                    >
                      Explore Research →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredArticles.length === 0 && (
          <div className="py-20 text-center glass-panel rounded-xl p-12">
            <span className="material-symbols-outlined text-4xl text-primary mb-3">folder_open</span>
            <p className="font-serif text-lg text-on-surface">No reports published in this category yet.</p>
            <p className="text-xs text-on-surface-variant mt-1">Our research desk is actively compiling upcoming intelligence briefs.</p>
          </div>
        )}
      </section>
    </main>
  );
}
