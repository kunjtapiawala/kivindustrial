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
    item?: {
      title: string;
      description: string;
      manufacturer: string;
      partNumber: string;
      condition: string;
      price: number;
      shippingCost: number;
      totalPrice: number;
      currency: string;
      specifications: Record<string, string>;
      imageUrl?: string;
      availability: string;
      shipping: string;
    };
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
          {result.success && result.item ? (
            <div className="rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-lg sm:p-8">
              {/* Product Header */}
              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                    ✓ In Stock
                  </span>
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
                    Available Now
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2">{result.item.title}</h2>
                <p className="text-sm text-muted">{result.item.description}</p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Left Column - Image and Price */}
                <div>
                  {result.item.imageUrl ? (
                    <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-surface">
                      <img
                        src={result.item.imageUrl}
                        alt={result.item.title}
                        className="h-auto w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="mb-6 flex h-64 items-center justify-center rounded-xl border border-white/10 bg-surface/50">
                      <svg
                        className="h-16 w-16 text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Pricing Box */}
                  <div className="rounded-xl border border-accent/30 bg-accent/10 p-6">
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted mb-1">Our Price</p>
                      <p className="text-4xl font-bold text-accent">
                        {result.item.currency || "$"}
                        {result.item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="space-y-2 border-t border-white/10 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Shipping</span>
                        <span className="font-semibold text-primary">
                          {result.item.currency || "$"}
                          {result.item.shippingCost.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-bold">
                        <span className="text-primary">Total</span>
                        <span className="text-accent">
                          {result.item.currency || "$"}
                          {result.item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <a
                        href={`/#contact?part=${encodeURIComponent(result.item.partNumber)}&manufacturer=${encodeURIComponent(result.item.manufacturer)}`}
                        className="block w-full rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        Request Quote / Order Now
                      </a>
                      <a
                        href="tel:+14693168517"
                        className="block w-full rounded-full border border-white/10 px-6 py-3 text-center text-sm font-semibold text-primary transition hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        Call 469-316-8517
                      </a>
                    </div>
                    <p className="mt-4 text-xs text-muted text-center">
                      {result.item.shipping}
                    </p>
                  </div>
                </div>

                {/* Right Column - Specifications */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Product Specifications</h3>
                  <div className="space-y-3 mb-6">
                    {Object.entries(result.item.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-sm font-medium text-muted">{key}</span>
                        <span className="text-sm text-primary">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/10 bg-surface/50 p-4 mb-6">
                    <h4 className="text-sm font-semibold text-primary mb-2">Why Choose KIV Industrial?</h4>
                    <ul className="space-y-2 text-sm text-muted">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                        <span>Verified inventory from trusted suppliers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                        <span>Same-day or next-day shipping available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                        <span>Competitive pricing with no hidden fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                        <span>Expert support available 24/7/365</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                        <span>Blind shipping and easy payment options</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                    <p className="text-sm text-primary">
                      <span className="font-semibold">Need assistance?</span> Our experts can help you verify compatibility, discuss bulk pricing, or answer any questions about this part.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Part Not Found in Current Inventory</h3>
              <p className="text-sm text-muted mb-4">
                {result.error || "We couldn't find this exact part in our current inventory. However, we can still source it for you!"}
              </p>
              <a
                href={`/#contact?part=${encodeURIComponent(partNumber)}&manufacturer=${encodeURIComponent(manufacturer)}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Request a Quote
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstantQuoteForm;

