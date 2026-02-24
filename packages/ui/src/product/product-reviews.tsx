import type { ReactNode } from "react";

import clsx from "clsx";

import type { IProductRecordReview } from "@repo/types";

type TProductReviewsProps = {
  reviews?: IProductRecordReview[];
  max?: number;
  title?: ReactNode;
  className?: string;
};

export function ProductReviews({
  reviews = [],
  max = 5,
  title = "Reviews",
  className,
}: TProductReviewsProps) {
  if (!reviews.length) return null;

  return (
    <div className={clsx("mt-6", className)}>
      <h2 className="text-card-foreground text-sm font-semibold">{title}</h2>

      <div className="mt-3 space-y-3">
        {reviews.slice(0, max).map((review, idx) => (
          <div
            key={`${review.reviewerName ?? "review"}-${idx}`}
            className="border-border/50 bg-background/30 rounded-xl border p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-card-foreground text-sm font-medium">
                  {review.reviewerName || "Anonymous"}
                </p>

                {review.date ? (
                  <p data-testid="review-date" className="text-card-foreground/60 text-xs">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                ) : null}
              </div>

              {typeof review.rating === "number" ? (
                <span className="text-card-foreground/70 text-xs">
                  ★ {review.rating.toFixed(1)}
                </span>
              ) : null}
            </div>

            {review.comment ? (
              <p className="text-card-foreground/70 mt-2 text-sm">{review.comment}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
