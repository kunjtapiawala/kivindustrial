import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";
import CategorySection from "@/components/category-section";
import { catalogCategories } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Catalog | KIV Industrial Parts",
  description:
    "Browse every electrical, industrial, and automation category KIV Industrial Parts sources with blind shipping and easy payment options.",
};

const CatalogPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="Catalog"
            title="Every electrical, industrial, and automation part"
            description="No-pressure sourcing, blind shipping, and easy payment backed by a $5B+ supplier network with 3M+ parts on hand and 10 logistics partners ready to move."
          />
          <p className="mt-6 text-sm text-muted">
            Need help picking the right item? Call <a href="tel:+14693168517" className="text-primary underline-offset-2 hover:underline">469-316-8517</a> or send a request—experts are available 24/7/365 with direct supplier lines to eliminate lead time.
          </p>
        </section>

        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 sm:px-6">
          {catalogCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>

        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16 text-center sm:px-6">
            <SectionHeading
              eyebrow="Ready when you are"
              title="Send the list—large or small"
              description="Whether you need a single replacement or a full bill of materials, we will blind ship directly to your customer with zero hassle."
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/#contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Submit sourcing request
              </Link>
              <a
                href="tel:+14693168517"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-primary transition hover:border-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Call 469-316-8517
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
