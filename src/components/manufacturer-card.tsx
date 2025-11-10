import type { Manufacturer } from "@/data/manufacturers";

type ManufacturerCardProps = {
  manufacturer: Manufacturer;
};

const ManufacturerCard = ({ manufacturer }: ManufacturerCardProps) => {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-surface/70 p-6 transition hover:border-accent/60 hover:shadow-lg">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-primary">{manufacturer.name}</h3>
          {manufacturer.popular && (
            <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
              Popular
            </span>
          )}
        </div>
        <p className="text-sm text-muted">{manufacturer.summary}</p>
      </header>
      <div className="mt-4 space-y-3 text-sm text-muted">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent/80">Focus Areas</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {manufacturer.focus.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        {manufacturer.blindShip && (
          <p className="rounded-xl border border-accent/20 bg-accent/10 px-3 py-2 text-xs text-primary">
            Blind-ship ready with easy payment handling.
          </p>
        )}
      </div>
    </article>
  );
};

export default ManufacturerCard;
