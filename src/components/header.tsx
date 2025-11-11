"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CatalogMegaMenu from "./catalog-mega-menu";
import SupportBanner from "./support-banner";
import { catalogCategories } from "@/data/catalog";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/manufacturers", label: "Manufacturers" },
  { href: "/auctions", label: "Auctions" },
  { href: "/#contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(catalogCategories[0]?.id ?? "");
  const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState(false);
  const [expandedMobileCategoryId, setExpandedMobileCategoryId] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isMegaOpen) {
        return;
      }
      const target = event.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsMegaOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMegaOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMegaOpen]);

  useEffect(() => {
    if (isMegaOpen || isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMegaOpen, isMenuOpen]);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMobileCategory = (categoryId: string) => {
    setExpandedMobileCategoryId((previous) => (previous === categoryId ? null : categoryId));
  };

  return (
    <header className="sticky top-0 z-50" ref={headerRef}>
      <SupportBanner />
      <div className="bg-surface shadow-md">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-semibold tracking-wide text-primary">
            KIV Industrial Parts
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-muted sm:flex">
            <button
              type="button"
              onClick={() => setIsMegaOpen((prev) => !prev)}
              aria-expanded={isMegaOpen}
              className="rounded-full px-4 py-2 text-sm font-medium transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Catalog
            </button>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="rounded-full bg-accent px-4 py-2 font-medium text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Request a Part
            </Link>
          </nav>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-3 text-muted transition hover:text-primary active:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:hidden min-w-[44px] min-h-[44px]"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={handleToggleMenu}
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <div className="flex flex-col gap-1.5">
              <span className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} aria-hidden="true" />
              <span className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : ""}`} aria-hidden="true" />
              <span className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} aria-hidden="true" />
            </div>
          </button>
          {isMegaOpen && (
            <CatalogMegaMenu
              onClose={() => setIsMegaOpen(false)}
              activeCategoryId={activeCategoryId}
              onSelectCategory={setActiveCategoryId}
            />
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div id="mobile-navigation" className="max-h-[calc(100vh-120px)] overflow-y-auto border-t border-white/5 bg-surface sm:hidden">
          <div className="space-y-3 px-4 py-4">
            <Link
              href="/catalog"
              className="flex items-center justify-between rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-left transition hover:bg-accent/20"
              onClick={handleCloseMenu}
            >
              <div>
                <div className="text-base font-semibold text-primary">Browse Full Catalog</div>
                <div className="text-xs text-muted mt-0.5">View all categories and products</div>
              </div>
              <span className="text-accent">→</span>
            </Link>
            
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileCatalogOpen((previous) => !previous);
                  if (isMobileCatalogOpen) {
                    setExpandedMobileCategoryId(null);
                  }
                }}
                aria-expanded={isMobileCatalogOpen}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
              >
                <span className="text-base font-semibold text-primary">Catalog Categories</span>
                <span className="text-sm text-muted">{isMobileCatalogOpen ? "−" : "+"}</span>
              </button>
              
              {isMobileCatalogOpen && (
                <div className="space-y-2 pl-2">
                  {catalogCategories.map((category) => {
                    const isExpanded = expandedMobileCategoryId === category.id;
                    return (
                      <div key={category.id} className="rounded-lg border border-white/5 bg-surface/70">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between px-4 py-3 text-left min-h-[48px] active:bg-white/10"
                          onClick={() => toggleMobileCategory(category.id)}
                          aria-expanded={expandedMobileCategoryId === category.id}
                        >
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-primary">{category.name}</div>
                            {category.description && (
                              <div className="text-xs text-muted mt-0.5 line-clamp-1">{category.description}</div>
                            )}
                          </div>
                          <span className="ml-2 text-sm text-muted flex-shrink-0">
                            {isExpanded ? "−" : "+"}
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="space-y-3 px-4 pb-4 border-t border-white/5 pt-3">
                            {category.highlights && category.highlights.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {category.highlights.slice(0, 3).map((highlight) => (
                                  <span key={highlight} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-primary">
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            )}
                            {category.subcategories ? (
                              <div className="space-y-3">
                                {category.subcategories.slice(0, 3).map((group) => (
                                  <div key={group.title} className="space-y-2">
                                    <Link
                                      href={`/catalog#${category.id}-${slugify(group.title)}`}
                                      className="block text-sm font-semibold text-primary underline-offset-2 hover:underline"
                                      onClick={handleCloseMenu}
                                    >
                                      {group.title} →
                                    </Link>
                                    <ul className="space-y-1.5 pl-2">
                                      {group.items.slice(0, 4).map((item, index) => (
                                        <li key={`${group.title}-${index}`} className="flex items-start gap-2">
                                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                                          <span className="text-xs text-muted">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                                <Link
                                  href={`/catalog#${category.id}`}
                                  className="block rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-center text-sm font-semibold text-primary transition hover:bg-accent/20"
                                  onClick={handleCloseMenu}
                                >
                                  View all {category.name} →
                                </Link>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <ul className="space-y-1.5">
                                  {category.items.slice(0, 6).map((item, index) => (
                                    <li key={`${category.id}-mobile-${index}`} className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                                      <span className="text-xs text-muted">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                                <Link
                                  href={`/catalog#${category.id}`}
                                  className="block rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-center text-sm font-semibold text-primary transition hover:bg-accent/20"
                                  onClick={handleCloseMenu}
                                >
                                  View all {category.name} →
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="border-t border-white/5 pt-3 space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base font-medium text-primary transition hover:bg-white/10 active:bg-white/15 min-h-[48px] flex items-center"
                  onClick={handleCloseMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <Link
              href="/#contact"
              className="block rounded-xl bg-accent px-4 py-3 text-center text-base font-semibold text-background transition hover:bg-[var(--accent-light)] active:opacity-90 min-h-[48px] flex items-center justify-center"
              onClick={handleCloseMenu}
            >
              Request a Part
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
