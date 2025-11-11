"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import CategorySection from "@/components/category-section";
import CatalogSearch from "@/components/catalog-search";
import { catalogCategories } from "@/data/catalog";
import Footer from "@/components/footer";

const CatalogPageClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return catalogCategories;
    }

    const query = searchQuery.toLowerCase().trim();

    return catalogCategories.filter((category) => {
      // Search in category name
      if (category.name.toLowerCase().includes(query)) {
        return true;
      }

      // Search in description
      if (category.description.toLowerCase().includes(query)) {
        return true;
      }

      // Search in items
      if (category.items.some((item) => item.toLowerCase().includes(query))) {
        return true;
      }

      // Search in subcategories
      if (
        category.subcategories?.some(
          (subcategory) =>
            subcategory.title.toLowerCase().includes(query) ||
            subcategory.items.some((item) => item.toLowerCase().includes(query))
        )
      ) {
        return true;
      }

      return false;
    });
  }, [searchQuery]);

  // Scroll to results when search changes
  useEffect(() => {
    if (searchQuery.trim() && filteredCategories.length > 0 && resultsRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [searchQuery, filteredCategories.length]);

  return (
    <>
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Catalog"
            title="Every electrical, industrial, and automation part"
            description="No-pressure sourcing, blind shipping, and easy payment backed by a $5B+ supplier network with 3M+ parts on hand and 10 logistics partners ready to move."
          />
          <p className="mt-6 text-sm text-muted">
            Need help picking the right item? Call <a href="tel:+14693168517" className="text-primary underline-offset-2 hover:underline">469-316-8517</a> or send a request - experts are available 24/7/365 with direct supplier lines to eliminate lead time.
          </p>
        </section>

        <section className="border-t border-white/5 bg-surface/50 py-8 sticky top-[72px] z-40 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <CatalogSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} filteredCount={filteredCategories.length} />
          </div>
        </section>

        <div ref={resultsRef} className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 sm:px-6 pt-8">
          {searchQuery.trim() && filteredCategories.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-surface/80 p-12 text-center">
              <p className="text-lg font-semibold text-primary mb-2">No results found</p>
              <p className="text-sm text-muted mb-6">
                Try searching with different keywords or browse all categories.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Clear search
              </button>
            </div>
          ) : (
            <>
              {filteredCategories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
            </>
          )}
        </div>

        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 text-center sm:px-6">
            <SectionHeading
              eyebrow="Ready when you are"
              title="Send the list - large or small"
              description="Whether you need a single replacement or a full bill of materials, we will blind ship directly to your customer with zero hassle."
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/#contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Submit sourcing request
              </Link>
              <a
                href="tel:+14693168517"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-primary transition hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Call 469-316-8517
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CatalogPageClient;

