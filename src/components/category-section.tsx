"use client";

import { useState } from "react";
import type { CatalogCategory } from "@/data/catalog";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const PREVIEW_LIMIT = 10;

type CategorySectionProps = {
  category: CatalogCategory;
};

const CategorySection = ({ category }: CategorySectionProps) => {
  const [showAllItems, setShowAllItems] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const displayedItems = showAllItems ? category.items : category.items.slice(0, PREVIEW_LIMIT);

  const handleToggleGroup = (title: string) => {
    setExpandedGroups((previous) => ({
      ...previous,
      [title]: !previous[title],
    }));
  };

  return (
    <section id={category.id} className="scroll-mt-24 space-y-6 rounded-3xl border border-white/10 bg-surface/80 p-6 shadow-sm sm:p-10">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{category.name}</h2>
        <p className="text-sm text-muted sm:max-w-3xl">{category.description}</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <h3 className="text-xs uppercase tracking-widest text-accent/80">What we supply</h3>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-muted sm:grid-cols-2">
            {displayedItems.map((item, index) => (
              <li key={`${category.id}-item-${index}`} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {category.items.length > PREVIEW_LIMIT && (
            <button
              type="button"
              onClick={() => setShowAllItems((previous) => !previous)}
              className="mt-3 text-sm font-semibold text-accent underline-offset-2 hover:underline"
            >
              {showAllItems ? "Show fewer" : "Show more"}
            </button>
          )}
        </div>
        <div className="space-y-4 rounded-2xl border border-accent/30 bg-accent/10 p-5 text-sm text-primary">
          <h3 className="text-sm font-semibold text-primary">Why teams use KIV Industrial Parts</h3>
          <ul className="space-y-2">
            {category.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-muted">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
            <li className="flex items-start gap-2 text-muted">
              <span className="mt-2 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span>
                No pressure quotes, blind shipping, and easy payment options. Call <a href="tel:+14693168517" className="text-primary underline-offset-2 hover:underline">469-316-8517</a> for immediate help.
              </span>
            </li>
          </ul>
        </div>
      </div>
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="mt-6 space-y-8">
          <h3 className="text-xs uppercase tracking-[0.35em] text-accent/80">Subcategories</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.subcategories.map((group) => {
              const isExpanded = expandedGroups[group.title] ?? false;
              const itemsToDisplay = isExpanded ? group.items : group.items.slice(0, PREVIEW_LIMIT);

              return (
                <div
                  key={group.title}
                  id={`${category.id}-${slugify(group.title)}`}
                  className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <h4 className="text-sm font-semibold text-primary">{group.title}</h4>
                  <ul className="space-y-2 text-sm text-muted">
                    {itemsToDisplay.map((item, index) => (
                      <li key={`${group.title}-${index}`} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {group.items.length > PREVIEW_LIMIT && (
                    <button
                      type="button"
                      onClick={() => handleToggleGroup(group.title)}
                      className="text-sm font-semibold text-accent underline-offset-2 hover:underline"
                    >
                      {isExpanded ? "Show fewer" : "Show more"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default CategorySection;
