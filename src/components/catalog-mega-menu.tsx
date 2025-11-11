"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { catalogCategories } from "@/data/catalog";

type CatalogMegaMenuProps = {
  onClose: () => void;
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  headerHeight?: number;
};

const PREVIEW_LIMIT = 10;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const chunkItems = (items: string[], chunkSize: number) => {
  const chunks: string[][] = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
};

const CatalogMegaMenu = ({ onClose, activeCategoryId, onSelectCategory, headerHeight = 100 }: CatalogMegaMenuProps) => {
  const activeCategory = useMemo(
    () => catalogCategories.find((category) => category.id === activeCategoryId) ?? catalogCategories[0],
    [activeCategoryId],
  );

  const itemColumns = useMemo(() => chunkItems(activeCategory.items, 5), [activeCategory.items]);
  const hasSubcategories = Array.isArray(activeCategory.subcategories) && activeCategory.subcategories.length > 0;

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const handleToggleGroup = (title: string) => {
    setExpandedGroups((previous) => ({
      ...previous,
      [title]: !previous[title],
    }));
  };

  return (
    <div 
      className="fixed left-0 right-0 z-[46] hidden sm:block px-4 sm:px-6 pointer-events-auto" 
      style={{ top: `${headerHeight + 4}px` }}
    >
      <div className="mx-auto flex max-w-6xl rounded-3xl border border-white/20 bg-surface/95 backdrop-blur-xl text-primary shadow-2xl shadow-black/70 ring-1 ring-white/10 mega-menu-enter">
        <aside
          className="relative w-72 overflow-y-auto border-r border-white/5 bg-surface/80 p-6 backdrop-blur"
          style={{ maxHeight: "70vh" }}
        >
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/catalog"
              onClick={onClose}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface flex-1 text-center"
            >
              View Full Catalog
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-muted transition hover:bg-accent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              aria-label="Close catalog menu"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-muted mb-4">
            Categories
          </div>
          <ul className="space-y-1 text-sm">
            {catalogCategories.map((category) => {
              const isActive = category.id === activeCategory.id;
              return (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(category.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive ? "bg-white/10 text-primary shadow-sm" : "text-muted hover:bg-white/5 hover:text-primary"}`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${isActive ? "bg-accent text-background" : "bg-white/10 text-muted"}`}
                    >
                      {category.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
        <div className="relative flex-1 overflow-y-auto p-8" style={{ maxHeight: "70vh" }}>
          <header className="border-b border-white/10 pb-4">
            <h3 className="text-2xl font-semibold text-primary">{activeCategory.name}</h3>
            <p className="mt-1 text-sm text-muted">{activeCategory.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-muted">
              {activeCategory.highlights.map((highlight) => (
                <span key={highlight} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {highlight}
                </span>
              ))}
            </div>
          </header>
          {hasSubcategories ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeCategory.subcategories?.map((group) => {
                const isExpanded = expandedGroups[group.title] ?? false;
                const previewItems = isExpanded ? group.items : group.items.slice(0, PREVIEW_LIMIT);
                const groupAnchor = `/catalog#${activeCategory.id}-${slugify(group.title)}`;
                return (
                    <div key={group.title} className="space-y-3 rounded-2xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">
                        {group.title}
                      </h4>
                      <Link
                        href={groupAnchor}
                        onClick={onClose}
                          className="text-xs font-semibold text-muted underline-offset-2 hover:text-primary hover:underline"
                      >
                        View All
                      </Link>
                    </div>
                    <ul className="space-y-2 text-sm text-muted">
                      {previewItems.map((item, index) => (
                        <li key={`${group.title}-${item}-${index}`} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {group.items.length > PREVIEW_LIMIT && (
                      <button
                        type="button"
                        onClick={() => handleToggleGroup(group.title)}
                        className="text-xs font-semibold text-muted underline-offset-2 hover:text-primary hover:underline"
                      >
                        {isExpanded ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {itemColumns.map((column, columnIndex) => (
                <ul key={`column-${columnIndex}`} className="space-y-2 text-sm text-muted">
                  {column.slice(0, PREVIEW_LIMIT).map((item, index) => (
                    <li key={`fallback-${item}-${index}`} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          )}
          <div className="mt-8 border-t border-white/10 pt-6">
            <Link
              href={`/catalog#${activeCategory.id}`}
              onClick={onClose}
              className="block rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-center text-sm font-semibold text-primary transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              View all {activeCategory.name} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogMegaMenu;
