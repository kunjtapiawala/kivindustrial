import Header from "@/components/header";
import Footer from "@/components/footer";
import SectionHeading from "@/components/section-heading";

export const metadata = {
  title: "About Us | KIV Industrial Parts",
  description: "Learn about KIV Industrial Parts and our founder's journey from building a 35,000 SKU inventory to becoming a trusted sourcing partner.",
};

const AboutPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="space-y-6 text-center">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Our Story
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-5xl">
              Built on Trust, Reliability, and the Best Prices
            </h1>
            <p className="mx-auto text-base text-muted sm:max-w-2xl">
              KIV Industrial Parts was born from a simple realization: customers come back not just for the parts, but for the trust, reliability, and value we deliver every single time.
            </p>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="The Beginning"
                title="A Passion That Started Right Out of College"
                description="Our founder began this journey immediately after graduating college, driven by a genuine passion for industrial parts and helping businesses get what they need, when they need it."
              />
              
              <div className="space-y-6 text-base text-muted">
                <p>
                  Starting right after college, our founder built KIV Industrial Parts from the ground up with one clear goal: to make industrial parts sourcing as straightforward and reliable as possible. What began as a personal venture quickly grew into something much bigger.
                </p>
                
                <p>
                  The journey started by building an extensive inventory of 35,000 different part numbers and SKUs. Every item was carefully selected, cataloged, and made ready to ship. It was a massive undertaking, but it laid the foundation for what was to come.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Realization Section */}
        <section className="border-t border-white/5 bg-surface/50">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="The Turning Point"
                title="Trust Beyond Inventory"
                description="Our clients began coming to us not just for the parts we had in stock, but for something more valuable: trust, reliability, and the best prices."
              />
              
              <div className="space-y-6 text-base text-muted">
                <p>
                  Something interesting started happening. Clients began reaching out for parts we didn't have in our inventory. At first, it seemed counterintuitive—why would they come to us if we didn't have the exact part they needed?
                </p>
                
                <p>
                  The answer became clear: they came because they could trust us. They knew we were reliable. They knew we had the best prices. And they knew that even if we didn't have it in stock, we would find a way to get it for them.
                </p>
                
                <div className="rounded-xl border border-accent/30 bg-accent/10 px-6 py-5">
                  <p className="text-sm font-semibold text-primary">
                    Trust, reliability, and the best prices—these were the values that brought customers back, time and time again, regardless of what we had on our shelves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evolution Section */}
        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="The Evolution"
                title="From Inventory to Sourcing Expertise"
                description="As these occurrences happened more and more, we evolved from a parts supplier to a trusted sourcing partner."
              />
              
              <div className="space-y-6 text-base text-muted">
                <p>
                  Little by little, these occurrences became more frequent. Clients would call with parts we didn't have, and we would source them. They would come back with more requests. The pattern was clear: our relationships and expertise were becoming more valuable than any inventory we could stock.
                </p>
                
                <p>
                  We began helping people source items through the extensive relationships we had built with distributors, manufacturers, and suppliers across the globe. What started as a side service quickly became our core strength.
                </p>
                
                <p>
                  Today, we leverage a $5B+ supplier network spanning more than 3 million ready-to-ship items. We work with hundreds of manufacturers and maintain relationships with over 10 logistics partners worldwide. But the foundation remains the same: trust, reliability, and the best prices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="border-t border-white/5 bg-surface/50">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <SectionHeading
              eyebrow="Our Values"
              title="What Drives Us Every Day"
              description="The principles that guide every interaction, every quote, and every shipment."
            />
            
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary">Trust</h3>
                <p className="mt-2 text-sm text-muted">
                  Built through consistent delivery, transparent communication, and honest pricing. Your trust is our most valuable asset.
                </p>
              </div>
              
              <div className="rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary">Reliability</h3>
                <p className="mt-2 text-sm text-muted">
                  99%+ on-time delivery, real-time updates, and direct supplier communication. When we say we'll deliver, we deliver.
                </p>
              </div>
              
              <div className="rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary">Best Prices</h3>
                <p className="mt-2 text-sm text-muted">
                  We will beat all quotes from reputable companies. Our extensive network and relationships ensure you get the best value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t border-white/5 bg-surface/80">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <SectionHeading
              eyebrow="By The Numbers"
              title="Built Through Relationships"
              description="Our growth reflects the trust and reliability we deliver to every customer."
            />
            
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center">
                <div className="text-3xl font-bold text-accent sm:text-4xl">35,000+</div>
                <div className="mt-2 text-sm font-semibold text-primary">Original SKUs</div>
                <div className="mt-1 text-xs text-muted">Foundation inventory built from the start</div>
              </div>
              
              <div className="rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center">
                <div className="text-3xl font-bold text-accent sm:text-4xl">3M+</div>
                <div className="mt-2 text-sm font-semibold text-primary">Parts Available</div>
                <div className="mt-1 text-xs text-muted">Through our supplier network</div>
              </div>
              
              <div className="rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center">
                <div className="text-3xl font-bold text-accent sm:text-4xl">5,000+</div>
                <div className="mt-2 text-sm font-semibold text-primary">Orders Per Year</div>
                <div className="mt-1 text-xs text-muted">Trusted by businesses worldwide</div>
              </div>
              
              <div className="rounded-xl border border-white/10 bg-surface/60 px-6 py-8 text-center">
                <div className="text-3xl font-bold text-accent sm:text-4xl">120+</div>
                <div className="mt-2 text-sm font-semibold text-primary">Countries Served</div>
                <div className="mt-1 text-xs text-muted">Global reach, local reliability</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-white/5 bg-surface/50">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
              Experience the Difference
            </h2>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Join thousands of businesses that trust KIV Industrial Parts for their sourcing needs. We will beat all quotes from reputable companies—send us your quote and we will prove it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/#contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:bg-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Get a Quote
              </a>
              <a
                href="tel:+14693168517"
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-primary transition hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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

export default AboutPage;

