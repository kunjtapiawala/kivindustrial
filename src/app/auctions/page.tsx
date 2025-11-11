import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "KIV Industrial Auctions | KIV Industrial Parts",
  description:
    "Browse industrial equipment auctions from KIV Industrial Auctions. Find quality industrial parts, machinery, and equipment at competitive prices.",
};

const AuctionsPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="KIV Industrial Auctions"
            title="Industrial equipment auctions"
            description="Browse quality industrial parts, machinery, and equipment at competitive auction prices. All items are inspected and ready for immediate purchase."
          />
          <p className="mt-6 text-sm text-muted">
            Looking for specific equipment? Call <a href="tel:+14693168517" className="text-primary underline-offset-2 hover:underline">469-316-8517</a> to speak with our auction specialists or submit a request below.
          </p>
        </section>

        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Upcoming Auctions</h3>
                <p className="text-sm text-muted mb-4">
                  View our scheduled auction events featuring industrial equipment, machinery, and parts.
                </p>
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Regular weekly auctions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Specialty equipment events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Bulk lot auctions</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Live Bidding</h3>
                <p className="text-sm text-muted mb-4">
                  Participate in real-time auctions with transparent bidding and instant updates.
                </p>
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Real-time bid tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Automatic bid notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Equipment Categories</h3>
                <p className="text-sm text-muted mb-4">
                  Browse auctions by category including motors, controllers, machinery, and more.
                </p>
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Industrial machinery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Electrical components</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Automation equipment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Simple auction process"
            description="From registration to winning, our auction process is straightforward and transparent."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background text-lg font-semibold">
                1
              </div>
              <h4 className="text-base font-semibold text-primary">Register</h4>
              <p className="text-sm text-muted">
                Create your account and verify your information to start bidding.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background text-lg font-semibold">
                2
              </div>
              <h4 className="text-base font-semibold text-primary">Browse</h4>
              <p className="text-sm text-muted">
                Explore upcoming auctions and view detailed item descriptions and photos.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background text-lg font-semibold">
                3
              </div>
              <h4 className="text-base font-semibold text-primary">Bid</h4>
              <p className="text-sm text-muted">
                Place your bids during live auctions or set maximum bids in advance.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background text-lg font-semibold">
                4
              </div>
              <h4 className="text-base font-semibold text-primary">Win & Pay</h4>
              <p className="text-sm text-muted">
                Complete your purchase with secure payment and arrange pickup or shipping.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-10">
              <SectionHeading
                eyebrow="Coming soon"
                title="Auctions platform launching soon"
                description="KIV Industrial Auctions is currently under development. Sign up below to be notified when we launch, or contact us to learn more about our auction services."
              />
              <div className="mt-8 space-y-4">
                <div className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3">
                  <p className="text-sm text-primary font-medium mb-1">Notify me when auctions launch</p>
                  <p className="text-xs text-muted">
                    Get early access and notifications about upcoming auctions and special events.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/#contact"
                    className="rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    Get notified
                  </Link>
                  <a
                    href="tel:+14693168517"
                    className="rounded-full border border-white/10 px-6 py-3 text-center text-sm font-semibold text-primary transition hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    Call 469-316-8517
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AuctionsPage;

