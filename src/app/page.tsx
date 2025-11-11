import Link from "next/link";
import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import TrustGrid from "@/components/trust-grid";
import ContactForm from "@/components/contact-form";
import CategoryCard from "@/components/category-card";
import SmoothScrollHandler from "@/components/smooth-scroll-handler";
import ReviewsSection from "@/components/reviews-section";
import { catalogCategories } from "@/data/catalog";
import { manufacturers } from "@/data/manufacturers";

const Home = () => {
  const featuredCategories = catalogCategories.slice(0, 6);
  const popularManufacturers = manufacturers.filter((manufacturer) => manufacturer.popular);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SmoothScrollHandler />
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
              KIV Industrial connects you to a nationwide network of verified distributors and suppliers, giving you access to over 3 million in-stock industrial parts. Most orders ship the same day and arrive as soon as the next day—because we know every hour of downtime costs productivity. Our lead times set the industry standard, ensuring your operations never stop.
            </p>
            <p className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-primary sm:max-w-lg">
              Due to demand, we are currently accepting sourcing orders of $2,500 USD or greater. Need support on a smaller project? Reach out and we will queue you as capacity opens.
            </p>
            <p className="rounded-xl border border-accent/50 bg-accent/15 px-4 py-3 text-sm font-semibold text-accent sm:max-w-lg">
              We will beat all quotes from reputable companies. Send us your quote and we will prove it.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Request a Part
              </a>
              <a
                href="#about"
                className="rounded-full border border-white/10 px-6 py-3 text-center text-sm font-semibold text-primary transition hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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

        <section className="border-t border-white/5 bg-surface/50">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center shadow-sm transition-all duration-200 hover:border-accent/30 hover:bg-surface/80 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent transition-colors group-hover:bg-accent/30">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-accent sm:text-4xl">5,000+</div>
                <div className="mt-2 text-sm font-semibold text-primary">Orders Fulfilled Per Year</div>
                <div className="mt-1 text-xs text-muted">Consistent delivery excellence</div>
              </div>
              <div className="group rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center shadow-sm transition-all duration-200 hover:border-accent/30 hover:bg-surface/80 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent transition-colors group-hover:bg-accent/30">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-accent sm:text-4xl">11,000+</div>
                <div className="mt-2 text-sm font-semibold text-primary">Positive Reviews</div>
                <div className="mt-1 text-xs text-muted">Trusted by thousands</div>
              </div>
              <div className="group rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center shadow-sm transition-all duration-200 hover:border-accent/30 hover:bg-surface/80 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent transition-colors group-hover:bg-accent/30">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-accent sm:text-4xl">120+</div>
                <div className="mt-2 text-sm font-semibold text-primary">Countries Served</div>
                <div className="mt-1 text-xs text-muted">Global shipping network</div>
              </div>
              <div className="group rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center shadow-sm transition-all duration-200 hover:border-accent/30 hover:bg-surface/80 hover:shadow-md">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent transition-colors group-hover:bg-accent/30">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-accent sm:text-4xl">Loyal</div>
                <div className="mt-2 text-sm font-semibold text-primary">Customer Base</div>
                <div className="mt-1 text-xs text-muted">Long-term partnerships</div>
              </div>
            </div>
          </div>
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
                We will beat all quotes from reputable companies. Send us your quote request and we will prove it with pricing and turnaround that beats the competition.
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
                className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                View full catalog
              </Link>
              <a
                href="tel:+14693168517"
                className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-primary transition hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
              <p className="text-muted">Looking for another brand? Send the request, we will track it down.</p>
              <Link
                href="/manufacturers"
                className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Explore manufacturers
              </Link>
            </div>
          </div>
        </section>

        <ReviewsSection />

        <section id="contact" className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-sm sm:p-10">
            <SectionHeading
              eyebrow="Request"
              title="Tell us what you need"
              description="Share the part, quantity, urgency, contact email, and phone - include the part number if you have it. We will reply within 12 hours; for urgent requests call 469-316-8517."
            />
            <Suspense fallback={<div className="text-muted">Loading form...</div>}>
              <ContactForm />
            </Suspense>
        </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
