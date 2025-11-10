import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import TrustGrid from "@/components/trust-grid";
import ContactForm from "@/components/contact-form";
import CategoryCard from "@/components/category-card";
import { catalogCategories } from "@/data/catalog";
import { manufacturers } from "@/data/manufacturers";

const Home = () => {
  const featuredCategories = catalogCategories.slice(0, 6);
  const popularManufacturers = manufacturers.filter((manufacturer) => manufacturer.popular);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-24" id="hero">
          <div className="space-y-6 text-center sm:text-left">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Kunj's Industrial Vault
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-5xl">
              Source the industrial parts you need without the wait.
          </h1>
            <p className="text-base text-muted sm:max-w-xl">
              KIV Industrial Parts connects you with a $5B+ supplier network spanning more than 3 million ready-to-ship items. Same-day or next-day fulfillment is the norm—and we keep lead times near zero for most requests.
            </p>
            <p className="rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-primary sm:max-w-lg">
              Due to demand, we are currently accepting sourcing orders of $2,500 USD or greater. Need support on a smaller project? Reach out and we will queue you as capacity opens.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Request a Part
              </a>
              <a
                href="#about"
                className="rounded-full border border-white/10 px-6 py-3 text-center text-sm font-semibold text-primary transition hover:border-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Why KIV Industrial Parts
              </a>
            </div>
            <p className="text-sm text-muted">
              Blind ship to your customer, no-pressure quotes, easy payment terms, and direct access to over 10 logistics partners. Call <a href="tel:+14693168517" className="text-primary underline-offset-2 hover:underline">469-316-8517</a> anytime.
            </p>
        </div>
          <TrustGrid />
        </section>

        <section className="border-t border-white/5 bg-surface/80" id="about">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16 sm:grid sm:grid-cols-5 sm:gap-10 sm:px-6">
            <div className="sm:col-span-2">
              <SectionHeading
                eyebrow="About"
                title="A sourcing desk tuned for speed"
                description="Your build schedule depends on fast answers. We keep components moving with real-time supplier outreach and transparent updates."
              />
            </div>
            <div className="space-y-6 text-sm text-muted sm:col-span-3">
              <p>
                Whether you need a single replacement part or a recurring order, Kunj's Industrial Vault keeps the process simple. We coordinate specifications, availability, and logistics so you can stay focused on production.
              </p>
              <ul className="space-y-3">
                <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                  <span className="font-medium text-primary">Transparent updates:</span> we keep you informed on sourcing status and lead times.
                </li>
                <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                  <span className="font-medium text-primary">Quality partners:</span> vetted suppliers with the certifications and documentation you require.
                </li>
                <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                  <span className="font-medium text-primary">Direct supplier communication:</span> our team sits on the phone with factories and distributors to lock in the part you need without delays.
                </li>
                <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                  <span className="font-medium text-primary">99%+ on-time delivery:</span> backed by a logistics network of more than 10 carriers to hit your deadline every time.
                </li>
                <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                  <span className="font-medium text-primary">Flexible logistics:</span> expedited, consolidated, or scheduled deliveries based on urgency.
                </li>
              </ul>
              <p>
                Do not take our word for it—send the quote request and we will prove it with pricing and turnaround that beats the competition.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Catalog"
            title="Every electrical, industrial, and automation part"
            description="These featured categories are a small sample. Visit the full catalog to explore everything we blind ship with hassle-free payment options."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted">
              Need something not listed? Chances are we have it ready to source.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                View full catalog
              </Link>
              <a
                href="tel:+14693168517"
                className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-primary transition hover:border-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Call 469-316-8517
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="Manufacturers"
              title="Popular brands we source every day"
              description="These are just a few of the most requested manufacturers. We work with hundreds more and can blind ship directly to your customer with no pressure and easy payment options."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popularManufacturers.map((manufacturer) => (
                <div key={manufacturer.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                  <p className="text-lg font-semibold text-primary">{manufacturer.name}</p>
                  <p className="mt-2 text-sm text-muted">{manufacturer.focus.join(" • ")}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted">Looking for another brand? Send the request—we will track it down.</p>
              <Link
                href="/manufacturers"
                className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Explore manufacturers
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-sm sm:p-10">
            <SectionHeading
              eyebrow="Request"
              title="Tell us what you need"
              description="Share the part, quantity, urgency, contact email, and phone—include the part number if you have it. We will reply within 12 hours; for urgent requests call 469-316-8517."
            />
            <ContactForm />
        </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
