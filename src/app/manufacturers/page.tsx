import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import ManufacturerCard from "@/components/manufacturer-card";
import { manufacturers } from "@/data/manufacturers";

export const metadata: Metadata = {
  title: "Manufacturers | KIV Industrial",
  description:
    "Explore popular and extended manufacturers sourced by KIV Industrial with blind shipping, no-pressure quotes, and easy payment options.",
};

const ManufacturersPage = () => {
  const popular = manufacturers.filter((manufacturer) => manufacturer.popular);
  const moreBrands = manufacturers.filter((manufacturer) => !manufacturer.popular);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Manufacturers"
            title="Trusted network, blind-ship ready"
            description="These popular brands are just the beginning. We partner with hundreds of manufacturers and coordinate directly with them—backed by $5B+ in available inventory, 3M+ part numbers, and over 10 logistics partners to deliver faster and cheaper than the competition."
          />
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li>✔ Blind ship to your customer or job site with neutral paperwork.</li>
            <li>✔ Hassle-free payment—cards, ACH, and terms available.</li>
            <li>✔ Experts available 24/7/365 at <a href="tel:+14693168517" className="text-primary underline-offset-2 hover:underline">469-316-8517</a>.</li>
          </ul>
        </section>

        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-sm uppercase tracking-[0.3em] text-accent/80">Most requested brands</h2>
            <p className="mt-2 text-sm text-muted">Logos shown represent our most popular manufacturers—ask about any other brand, we likely already source it.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((manufacturer) => (
                <ManufacturerCard key={manufacturer.name} manufacturer={manufacturer} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="More manufacturers"
            title="Hundreds more in our network"
            description="Here are just a few additional names. Send us the BOM or SKU list and we will handle cross references, availability, and blind shipping for you."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {moreBrands.map((manufacturer) => (
              <ManufacturerCard key={manufacturer.name} manufacturer={manufacturer} />
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 text-center sm:px-6">
            <SectionHeading
              eyebrow="Need a quote?"
              title="No-pressure sourcing starts here"
              description="Call, email, or submit the form—our team will confirm availability, price, and lead time within 12 hours or sooner. Do not believe it is possible? Ask for a quote and we will prove it."
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="tel:+14693168517"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Call 469-316-8517
              </a>
              <Link
                href="/#contact"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-primary transition hover:border-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Submit sourcing form
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ManufacturersPage;
