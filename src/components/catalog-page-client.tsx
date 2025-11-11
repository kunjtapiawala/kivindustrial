"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import CategorySection from "@/components/category-section";
import CatalogSearch from "@/components/catalog-search";
import { catalogCategories } from "@/data/catalog";
import type { CatalogCategory } from "@/data/catalog";
import Footer from "@/components/footer";

const CatalogPageClient = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Find all matching items across categories
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return { categories: catalogCategories, matchingItems: [] };
    }

    const query = searchQuery.toLowerCase().trim();
    const matchingItems: Array<{
      item: string;
      categoryId: string;
      categoryName: string;
      subcategory?: string;
    }> = [];

    const filteredCategories: CatalogCategory[] = catalogCategories
      .map((category) => {
        const matchingCategoryItems: string[] = [];
        const matchingSubcategories: Array<{ title: string; items: string[] }> = [];

        // Check category name and description
        const categoryMatches = 
          category.name.toLowerCase().includes(query) ||
          category.description.toLowerCase().includes(query);

        // Check items in main category
        category.items.forEach((item) => {
          if (item.toLowerCase().includes(query)) {
            matchingCategoryItems.push(item);
            matchingItems.push({
              item,
              categoryId: category.id,
              categoryName: category.name,
            });
          }
        });

        // Check subcategories
        if (category.subcategories) {
          category.subcategories.forEach((subcategory) => {
            const matchingSubItems: string[] = [];
            const subcategoryMatches = subcategory.title.toLowerCase().includes(query);

            subcategory.items.forEach((item) => {
              if (item.toLowerCase().includes(query)) {
                matchingSubItems.push(item);
                matchingItems.push({
                  item,
                  categoryId: category.id,
                  categoryName: category.name,
                  subcategory: subcategory.title,
                });
              }
            });

            if (subcategoryMatches || matchingSubItems.length > 0) {
              matchingSubcategories.push({
                title: subcategory.title,
                items: subcategoryMatches ? subcategory.items : matchingSubItems,
              });
            }
          });
        }

        // Include category if it matches or has matching items
        if (categoryMatches || matchingCategoryItems.length > 0 || matchingSubcategories.length > 0) {
          // Build the filtered category ensuring it matches CatalogCategory type
          const filteredCategory: CatalogCategory = {
            id: category.id,
            name: category.name,
            description: category.description,
            highlights: category.highlights,
            items: categoryMatches ? category.items : (matchingCategoryItems.length > 0 ? matchingCategoryItems : category.items),
            ...(matchingSubcategories.length > 0
              ? { subcategories: matchingSubcategories }
              : categoryMatches && category.subcategories
                ? { subcategories: category.subcategories }
                : {}),
          };
          return filteredCategory;
        }

        return null;
      })
      .filter((category) => category !== null) as CatalogCategory[];

    return { categories: filteredCategories, matchingItems };
  }, [searchQuery]);

  // Removed auto-scroll - user stays at search bar to see all results

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
            {/* Category Navigation */}
            <div className="mb-8">
              <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Browse Categories</h2>
              <div className="flex flex-wrap gap-2.5">
                {catalogCategories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(category.id);
                      if (element) {
                        const headerOffset = 120;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="inline-flex items-center rounded-full border border-white/20 bg-surface/80 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:border-accent/60 hover:bg-accent/15 hover:text-accent hover:shadow-md hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-100"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
            <CatalogSearch 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
              filteredCount={searchResults.categories.length}
              matchingItemsCount={searchResults.matchingItems.length}
            />
          </div>
        </section>

        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 sm:px-6 pt-8">
          {searchQuery.trim() && searchResults.categories.length === 0 ? (
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
          ) : searchQuery.trim() && searchResults.matchingItems.length > 0 ? (
            <>
              {/* Search Results Summary */}
              <div className="rounded-3xl border border-accent/30 bg-accent/10 p-6 mb-4">
                <h2 className="text-lg font-semibold text-primary mb-2">
                  Search Results for &quot;{searchQuery}&quot;
                </h2>
                <p className="text-sm text-muted mb-4">
                  Found {searchResults.matchingItems.length} matching item{searchResults.matchingItems.length !== 1 ? "s" : ""} in {searchResults.categories.length} categor{searchResults.categories.length !== 1 ? "ies" : "y"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                  {searchResults.matchingItems.map((result, index) => (
                    <div
                      key={`${result.categoryId}-${result.item}-${index}`}
                      className="rounded-lg border border-white/10 bg-surface/50 p-3 text-sm text-primary hover:bg-surface hover:border-accent/30 transition flex flex-col gap-2"
                    >
                      <a
                        href={`#${result.categoryId}${result.subcategory ? `-${result.subcategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : ""}`}
                        className="flex-1"
                        onClick={(e) => {
                          e.preventDefault();
                          const targetId = `${result.categoryId}${result.subcategory ? `-${result.subcategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : ""}`;
                          const element = document.getElementById(targetId) || document.getElementById(result.categoryId);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth", block: "start" });
                            // Highlight the element briefly
                            element.classList.add("ring-2", "ring-accent");
                            setTimeout(() => {
                              element.classList.remove("ring-2", "ring-accent");
                            }, 2000);
                          }
                        }}
                      >
                        <div className="font-medium text-primary">{result.item}</div>
                        <div className="text-xs text-muted mt-1">
                          {result.categoryName}
                          {result.subcategory && ` • ${result.subcategory}`}
                        </div>
                      </a>
                      <Link
                        href={`/?part=${encodeURIComponent(result.item)}#contact`}
                        className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface text-center"
                      >
                        Get a quote now
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              {/* Category Sections with highlighted matches */}
              {searchResults.categories.map((category) => (
                <CategorySection 
                  key={category.id} 
                  category={category} 
                  searchQuery={searchQuery.trim()}
                />
              ))}
            </>
          ) : (
            <>
              {searchResults.categories.map((category) => (
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

