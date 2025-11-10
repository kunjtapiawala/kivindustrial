type TrustPoint = {
  label: string;
  value: string;
};

const TRUST_POINTS: TrustPoint[] = [
  { label: "On-Time Fulfillment", value: "99%+" },
  { label: "Parts In Network", value: "3M+" },
  { label: "Direct Supplier Inventory", value: "$5B+" },
];

const TrustGrid = () => {
  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {TRUST_POINTS.map((point) => (
        <div
          key={point.label}
          className="rounded-xl border border-white/10 bg-surface/60 px-4 py-5 text-center shadow-sm"
        >
          <dt className="text-xs font-medium uppercase tracking-widest text-muted">
            {point.label}
          </dt>
          <dd className="mt-2 text-2xl font-semibold text-primary">{point.value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default TrustGrid;
