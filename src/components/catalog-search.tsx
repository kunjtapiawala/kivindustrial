"use client";

type CatalogSearchProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCount?: number;
  matchingItemsCount?: number;
};

const CatalogSearch = ({ searchQuery, onSearchChange, filteredCount, matchingItemsCount }: CatalogSearchProps) => {
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
          className="w-full rounded-xl border border-white/20 bg-surface px-4 py-3.5 pl-12 pr-12 text-base text-primary placeholder:text-muted/70 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/30 focus:bg-surface shadow-lg"
          aria-label="Search catalog"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted hover:text-primary transition-colors"
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
        <p className="mt-3 text-sm text-muted">
          {filteredCount === 0 ? (
            "No results found"
          ) : matchingItemsCount !== undefined && matchingItemsCount > 0 ? (
            <>
              {matchingItemsCount} item{matchingItemsCount !== 1 ? "s" : ""} found in {filteredCount} categor{filteredCount !== 1 ? "ies" : "y"}
            </>
          ) : (
            <>
              {filteredCount === 1
                ? "1 category found"
                : `${filteredCount} categories found`}
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default CatalogSearch;

