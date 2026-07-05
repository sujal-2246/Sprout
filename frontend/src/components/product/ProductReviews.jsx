import { getReviewsForProduct } from "../../data/reviews.mock";
import Rating from "../ui/Rating";

// Stands in for GET /api/products/:id/reviews — see reviews.mock.js and
// docs/PHASE1.md §12 for the product_reviews table this replaces.
export default function ProductReviews({ productId }) {
  const { reviews, average, total } = getReviewsForProduct(productId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-base-border bg-base-surface p-5">
        <span className="font-display text-3xl font-semibold text-ink">
          {average}
        </span>
        <div>
          <Rating value={average} size="md" />
          <p className="mt-1 text-xs text-ink-muted">
            Based on {total} review{total === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="rounded-xl border border-base-border bg-base-surface p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink">{review.author}</p>
              <Rating value={review.rating} size="sm" />
            </div>
            <p className="mt-2 text-sm text-ink-muted">{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
