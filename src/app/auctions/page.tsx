import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "KIV Industrial Auctions | Monthly Timed Auctions Starting February 2026",
  description:
    "AI-powered monthly timed industrial equipment auctions by KIV Industrial Auctions. Powered by ObjectFinder.ai technology. Launching February 2026 with automated lot generation, data extraction, pricing estimation, and comprehensive buyer information.",
};

const AuctionsPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading
            eyebrow="KIV Industrial Auctions"
            title="AI-powered timed industrial equipment auctions"
            description="Powered by ObjectFinder.ai technology, our monthly timed auctions automatically generate comprehensive lots, extract critical data from online sources, estimate competitive pricing, and provide buyers with more detailed information than any other auctioneer."
          />
          <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-primary sm:max-w-2xl">
            <p className="font-medium mb-1">📅 Monthly Timed Auctions Starting February 2026</p>
            <p className="text-muted">
              Join us for monthly timed auctions featuring industrial equipment, machinery, and parts. Each auction runs for a set duration with competitive bidding. Our AI-powered platform ensures every lot has complete, accurate information for confident bidding.
            </p>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3">
              <p className="text-sm font-semibold text-primary mb-1">⏱️ Timed Auction Format</p>
              <p className="text-xs text-muted">
                Each auction runs for a set duration. Place your bids during the auction window, with automatic extensions for last-minute bids.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3">
              <p className="text-sm font-semibold text-primary mb-1">📅 Monthly Schedule</p>
              <p className="text-xs text-muted">
                New auctions launch once per month starting February 2026. Register to be notified when each auction goes live.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted">
            Looking for specific equipment? Call <a href="tel:+14693168517" className="text-primary underline-offset-2 hover:underline">469-316-8517</a> to speak with our auction specialists or submit a request below.
          </p>
        </section>

        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-primary mb-3">Powered by ObjectFinder.ai</h2>
              <p className="text-sm text-muted max-w-2xl mx-auto">
                Our AI-powered platform automatically generates comprehensive auction lots, extracts critical data from online sources, estimates competitive pricing, and provides buyers with detailed information that exceeds industry standards.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-2xl mb-3">🧠</div>
                <h3 className="text-lg font-semibold text-primary mb-3">AI-Powered Lot Generation</h3>
                <p className="text-sm text-muted mb-4">
                  Automatically groups similar items and creates optimized lots with intelligent categorization, pulling part numbers, specifications, and serial numbers from online sources.
                </p>
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Automatic item grouping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Part number extraction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Specification detection</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-2xl mb-3">💸</div>
                <h3 className="text-lg font-semibold text-primary mb-3">Market-Matched Pricing</h3>
                <p className="text-sm text-muted mb-4">
                  Real-time market data analysis ensures every lot is priced competitively using live market trends and comparable sales data from online sources.
                </p>
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Live market data analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Competitive pricing estimates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Market trend insights</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-2xl mb-3">📈</div>
                <h3 className="text-lg font-semibold text-primary mb-3">Comprehensive Buyer Information</h3>
                <p className="text-sm text-muted mb-4">
                  Detailed listings with accurate specifications, condition analysis, and comprehensive data that gives buyers more confidence and information than any other auctioneer.
                </p>
                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Complete specifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Condition analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Enhanced buyer confidence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="AI Technology Benefits"
            title="Why ObjectFinder.ai makes a difference"
            description="Our AI-powered platform transforms the timed auction experience with automatic data extraction, intelligent pricing, and comprehensive lot information. Monthly auctions starting February 2026."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl">⚡</div>
              <h4 className="text-base font-semibold text-primary">Automatic Data Extraction</h4>
              <p className="text-sm text-muted">
                AI automatically pulls part numbers, serial numbers, specifications, and market data from online sources, eliminating manual research.
              </p>
            </div>
            <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl">💰</div>
              <h4 className="text-base font-semibold text-primary">Intelligent Pricing</h4>
              <p className="text-sm text-muted">
                Real-time market analysis and comparable sales data ensure competitive pricing estimates that maximize value for both buyers and sellers.
              </p>
            </div>
            <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl">📋</div>
              <h4 className="text-base font-semibold text-primary">Comprehensive Listings</h4>
              <p className="text-sm text-muted">
                Every lot includes detailed specifications, condition analysis, and complete information that gives buyers more confidence than traditional auctions.
              </p>
            </div>
            <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl">🤖</div>
              <h4 className="text-base font-semibold text-primary">Automated Lot Creation</h4>
              <p className="text-sm text-muted">
                AI intelligently groups items into optimized lots, reducing manual work and ensuring logical, valuable groupings.
              </p>
            </div>
            <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl">🔍</div>
              <h4 className="text-base font-semibold text-primary">Smart Research</h4>
              <p className="text-sm text-muted">
                Advanced AI research identifies product details, market trends, and pricing data from multiple online sources automatically.
              </p>
            </div>
            <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl">📊</div>
              <h4 className="text-base font-semibold text-primary">Higher Accuracy</h4>
              <p className="text-sm text-muted">
                90%+ data accuracy in descriptions and pricing, with automated compliance and export-ready listings for all platforms.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-10">
              <SectionHeading
                eyebrow="Powered by ObjectFinder.ai"
                title="Monthly timed auctions launching February 2026"
                description="KIV Industrial Auctions, powered by ObjectFinder.ai technology, launches in February 2026. Our monthly timed auctions automatically generate lots, extract data from online sources, estimate pricing, and provide comprehensive buyer information that exceeds industry standards."
              />
              <div className="mt-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3">
                    <p className="text-sm text-primary font-medium mb-1">🤖 AI-Powered Technology</p>
                    <p className="text-xs text-muted">
                      Automatic lot generation, data extraction, and intelligent pricing powered by ObjectFinder.ai
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3">
                    <p className="text-sm text-primary font-medium mb-1">📊 Market Data Integration</p>
                    <p className="text-xs text-muted">
                      Real-time pricing estimates and market analysis from online sources
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3">
                    <p className="text-sm text-primary font-medium mb-1">📋 Comprehensive Listings</p>
                    <p className="text-xs text-muted">
                      More detailed information than any other auctioneer for confident bidding
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-surface/70 px-4 py-3">
                    <p className="text-sm text-primary font-medium mb-1">⚡ Faster Processing</p>
                    <p className="text-xs text-muted">
                      Reduced listing time by 70% with automated research and lot creation
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3">
                  <p className="text-sm text-primary font-medium mb-1">📅 Launching February 2026 - Monthly Timed Auctions</p>
                  <p className="text-xs text-muted">
                    Be the first to know when our AI-powered timed auction platform launches. Get early access and monthly notifications about upcoming auctions. Each auction runs for a set duration with competitive bidding on industrial equipment, machinery, and parts.
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
                  <a
                    href="https://objectfinder.ai/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/10 px-6 py-3 text-center text-sm font-semibold text-primary transition hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    Learn about ObjectFinder.ai
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

