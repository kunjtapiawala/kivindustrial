"use client";

const ReviewsSection = () => {
  return (
    <section className="border-t border-white/5 bg-surface/80">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">Customer Reviews & Ratings</h2>
          <p className="mt-2 text-sm text-muted">See what our customers say about us</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Feedback Ratings */}
          <div className="rounded-xl border border-white/10 bg-surface/60 p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <h3 className="text-lg font-semibold text-primary">Feedback Ratings</h3>
              <svg
                className="h-5 w-5 text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-muted"></th>
                    <th className="pb-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">
                      1 month
                    </th>
                    <th className="pb-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">
                      6 months
                    </th>
                    <th className="pb-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">
                      12 months
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                          <span className="text-xs font-bold text-white">+</span>
                        </div>
                        <span className="text-primary">Positive</span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-semibold text-accent">443</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-semibold text-accent">1,258</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-semibold text-accent">1,635</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400">
                          <span className="text-xs font-bold text-white">□</span>
                        </div>
                        <span className="text-primary">Neutral</span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-semibold text-accent">0</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-semibold text-accent">5</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-semibold text-accent">10</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                          <span className="text-xs font-bold text-white">-</span>
                        </div>
                        <span className="text-primary">Negative</span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-semibold text-accent">0</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-semibold text-accent">6</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-semibold text-accent">9</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Seller Ratings */}
          <div className="rounded-xl border border-white/10 bg-surface/60 p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-lg font-semibold text-primary">Detailed Seller Ratings</h3>
              <svg
                className="h-5 w-5 text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mb-6 text-xs text-muted">Average for the last 12 months</p>
            <div className="space-y-6">
              {/* Accurate Description */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">Accurate description</span>
                  <span className="text-sm font-semibold text-accent">(606)</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-accent text-accent"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Reasonable Shipping Cost */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">Reasonable shipping cost</span>
                  <span className="text-sm font-semibold text-accent">(646)</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-accent text-accent"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Shipping Speed */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">Shipping speed</span>
                  <span className="text-sm font-semibold text-accent">(736)</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-accent text-accent"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Communication */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">Communication</span>
                  <span className="text-sm font-semibold text-accent">(729)</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-accent text-accent"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Positive Feedback Banner */}
        <div className="mt-8 rounded-xl border border-accent/30 bg-accent/10 px-6 py-4 text-center">
          <p className="text-lg font-bold text-primary">
            Positive Feedback (last 12 months): <span className="text-accent">99.4%</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

