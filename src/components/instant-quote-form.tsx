"use client";

import { useState, FormEvent } from "react";

type Condition = "New" | "New (Other)" | "Manufacturer Refurbished" | "Seller Refurbished" | "Used" | "For Parts or Not Working";

const CONDITIONS: Condition[] = [
  "New",
  "New (Other)",
  "Manufacturer Refurbished",
  "Seller Refurbished",
  "Used",
  "For Parts or Not Working",
];

const InstantQuoteForm = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [condition, setCondition] = useState<Condition>("New");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    lowestPrice?: number;
    currency?: string;
    itemTitle?: string;
    itemUrl?: string;
    shippingCost?: number;
    totalPrice?: number;
    error?: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/instant-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          manufacturer,
          partNumber,
          condition,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: "Failed to fetch quote. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-sm sm:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="manufacturer" className="block text-sm font-medium text-primary mb-2">
            Manufacturer <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
            className="w-full rounded-xl border border-white/20 bg-surface px-4 py-3 text-base text-primary placeholder:text-muted/70 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/30 focus:bg-surface shadow-sm"
            placeholder="e.g., Allen-Bradley, Siemens, ABB"
          />
        </div>

        <div>
          <label htmlFor="partNumber" className="block text-sm font-medium text-primary mb-2">
            Part Number <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="partNumber"
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            required
            className="w-full rounded-xl border border-white/20 bg-surface px-4 py-3 text-base text-primary placeholder:text-muted/70 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/30 focus:bg-surface shadow-sm"
            placeholder="e.g., 1756-L61, 6ES7 315-2EH14-0AB0"
          />
        </div>

        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-primary mb-2">
            Condition <span className="text-accent">*</span>
          </label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value as Condition)}
            required
            className="w-full rounded-xl border border-white/20 bg-surface px-4 py-3 text-base text-primary outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/30 focus:bg-surface shadow-sm"
          >
            {CONDITIONS.map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Searching..." : "Get Instant Quote"}
        </button>
      </form>

      {result && (
        <div className="mt-8">
          {result.success && result.lowestPrice ? (
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Quote Results</h3>
              <div className="space-y-3">
                {result.itemTitle && (
                  <div>
                    <p className="text-sm font-medium text-muted mb-1">Item</p>
                    <p className="text-base text-primary">{result.itemTitle}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted mb-1">Item Price</p>
                    <p className="text-2xl font-bold text-accent">
                      {result.currency || "$"}
                      {result.lowestPrice.toFixed(2)}
                    </p>
                  </div>
                  {result.shippingCost !== undefined && (
                    <div>
                      <p className="text-sm font-medium text-muted mb-1">Shipping</p>
                      <p className="text-2xl font-bold text-accent">
                        {result.currency || "$"}
                        {result.shippingCost.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
                {result.totalPrice !== undefined && (
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-sm font-medium text-muted mb-1">Total Price</p>
                    <p className="text-3xl font-bold text-accent">
                      {result.currency || "$"}
                      {result.totalPrice.toFixed(2)}
                    </p>
                  </div>
                )}
                {result.itemUrl && (
                  <div className="pt-3">
                    <a
                      href={result.itemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      View on eBay
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">No Results Found</h3>
              <p className="text-sm text-muted">
                {result.error || "No items found matching your criteria. Please try different search terms or conditions."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstantQuoteForm;

