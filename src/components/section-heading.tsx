type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => {
  return (
    <div className="space-y-2 text-center sm:text-left">
      {eyebrow && (
        <p className="text-xs uppercase tracking-widest text-accent/80">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{title}</h2>
      {description && <p className="text-sm text-muted">{description}</p>}
    </div>
  );
};

export default SectionHeading;
