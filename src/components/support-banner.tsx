const SupportBanner = () => {
  return (
    <div className="bg-accent text-xs text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-2 sm:flex-row sm:px-6">
        <p className="font-medium">Experts available 24/7/365</p>
        <a
          href="tel:+14693168517"
          className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
        >
          Call 469-316-8517
        </a>
      </div>
    </div>
  );
};

export default SupportBanner;
