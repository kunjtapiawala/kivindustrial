const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-surface/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-medium text-primary">KIV Industrial</p>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <a
            href="mailto:kunj8989@gmail.com"
            className="transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            kunj8989@gmail.com
          </a>
          <a
            href="tel:+14693168517"
            className="transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            469-316-8517
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
