const SupportBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-accent via-accent to-[var(--accent-light)] text-background shadow-md">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDQuNDE4LTMuNTgyIDgtOCA4cy04LTMuNTgyLTgtOCAzLjU4Mi04IDgtOCA4IDMuNTgyIDggOHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+')] bg-repeat" />
      </div>
      
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between sm:gap-6 sm:px-6 sm:py-4">
        {/* Left: Experts Available */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm">
            <svg
              className="h-5 w-5 text-background"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-background">Experts available</p>
            <p className="text-xs text-background/90">24/7/365 support</p>
          </div>
        </div>

        {/* Center: Main Message */}
        <div className="relative flex-1 text-center sm:max-w-md">
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full bg-background/30 blur-sm" />
            <p className="relative rounded-full border-2 border-background/40 bg-background/25 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-background shadow-xl backdrop-blur-md">
              If you need it, we have it
            </p>
          </div>
        </div>

        {/* Right: Call Button */}
        <a
          href="tel:+14693168517"
          className="group flex shrink-0 items-center gap-2 rounded-full border-2 border-background/40 bg-background/25 px-5 py-2.5 text-sm font-bold text-background shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-background hover:text-accent hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>Call 469-316-8517</span>
        </a>
      </div>
    </div>
  );
};

export default SupportBanner;
