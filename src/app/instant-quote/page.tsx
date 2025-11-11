import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import InstantQuoteForm from "@/components/instant-quote-form";

export const metadata: Metadata = {
  title: "Instant Quote | KIV Industrial Parts",
  description:
    "Get an instant quote for industrial parts using real-time eBay pricing. Enter manufacturer and part number to see the lowest current price with shipping included.",
};

const InstantQuotePage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              Instant Quote
            </h1>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Get real-time pricing for industrial parts using eBay marketplace data. Enter the manufacturer and part number to find the lowest current price with shipping included.
            </p>
          </div>

          <InstantQuoteForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InstantQuotePage;

