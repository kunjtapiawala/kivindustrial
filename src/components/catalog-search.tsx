"use client";

type CatalogSearchProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCount?: number;
};

const CatalogSearch = ({ searchQuery, onSearchChange, filteredCount }: CatalogSearchProps) => {
  const handleClear = () => {
    onSearchChange("");
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search categories, parts, or items..."
          className="w-full rounded-xl border border-white/10 bg-surface/70 px-4 py-3 pl-12 pr-12 text-sm text-primary placeholder:text-muted outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          aria-label="Search catalog"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted hover:text-primary transition"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {searchQuery && filteredCount !== undefined && (
        <p className="mt-2 text-sm text-muted">
          {filteredCount === 0
            ? "No results found"
            : filteredCount === 1
              ? "1 category found"
              : `${filteredCount} categories found`}
        </p>
      )}
    </div>
  );
};

export default CatalogSearch;

