import type { CatalogCategory } from "@/data/catalog";

type CategoryCardProps = {
  category: CatalogCategory;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-surface/70 p-5 text-left transition hover:border-accent/60 hover:shadow-lg focus-within:border-accent/60">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-primary">{category.name}</h3>
        <p className="text-sm text-muted">{category.description}</p>
      </div>
      <ul className="mt-6 space-y-2 text-xs text-muted">
        {category.highlights.slice(0, 3).map((highlight) => (
          <li key={highlight} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default CategoryCard;
