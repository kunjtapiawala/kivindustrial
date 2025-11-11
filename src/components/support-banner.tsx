const SupportBanner = () => {
  return (
    <div className="bg-accent text-xs text-background shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-2 sm:flex-row sm:px-6">
        <p className="font-medium">Experts available 24/7/365</p>
        <p className="text-sm font-semibold">If you need it, we have it</p>
        <a
          href="tel:+14693168517"
          className="rounded-full border border-background/20 bg-background/10 px-4 py-1 text-sm font-semibold text-background transition hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
        >
          Call 469-316-8517
        </a>
      </div>
    </div>
  );
};

export default SupportBanner;
