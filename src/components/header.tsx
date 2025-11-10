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
              className="rounded-full bg-accent px-4 py-2 font-medium text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Request a Part
            </Link>
          </nav>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-muted transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={handleToggleMenu}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="block h-0.5 w-6 bg-current" aria-hidden="true" />
            <span className="mt-1 block h-0.5 w-6 bg-current" aria-hidden="true" />
            <span className="mt-1 block h-0.5 w-6 bg-current" aria-hidden="true" />
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
        <div id="mobile-navigation" className="border-t border-white/5 bg-surface sm:hidden">
          <div className="space-y-4 px-4 py-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileCatalogOpen((previous) => !previous);
                  if (isMobileCatalogOpen) {
                    setExpandedMobileCategoryId(null);
                  }
                }}
                aria-expanded={isMobileCatalogOpen}
                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-semibold text-primary"
              >
                Catalog
                <span className="text-xs text-muted">{isMobileCatalogOpen ? "Close" : "Expand"}</span>
              </button>
              {isMobileCatalogOpen && (
                <ul className="mt-3 space-y-2">
                  {catalogCategories.map((category) => {
                    const isExpanded = expandedMobileCategoryId === category.id;
                    return (
                      <li key={category.id} className="rounded-xl border border-white/5 bg-surface/70">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-primary"
                          onClick={() => toggleMobileCategory(category.id)}
                          aria-expanded={expandedMobileCategoryId === category.id}
                        >
                          {category.name}
                          <span className="text-xs text-muted">
                            {expandedMobileCategoryId === category.id ? "Hide" : "Show"}
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="space-y-3 px-4 pb-3 text-xs text-muted">
                            {category.subcategories ? (
                              category.subcategories.map((group) => (
                                <div key={group.title} className="space-y-1">
                                  <p className="text-[11px] font-semibold text-primary">{group.title}</p>
                                  <ul className="space-y-1">
                                    {group.items.slice(0, 5).map((item, index) => (
                                      <li key={`${group.title}-${index}`} className="flex items-start gap-2">
                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <Link
                                    href={`/catalog#${category.id}-${slugify(group.title)}`}
                                    className="text-[11px] font-semibold text-primary underline-offset-2 hover:underline"
                                    onClick={handleCloseMenu}
                                  >
                                    View all subcategories
                                  </Link>
                                </div>
                              ))
                            ) : (
                              <ul className="space-y-2">
                                {category.items.slice(0, 6).map((item, index) => (
                                  <li key={`${category.id}-mobile-${index}`} className="flex items-start gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={handleCloseMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="block rounded-md bg-accent px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
