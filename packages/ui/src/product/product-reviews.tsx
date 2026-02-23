import { IProductRecordReview } from "@repo/types";
import clsx from "clsx";
import type { ReactNode } from "react";

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
      <h2 className="text-sm font-semibold text-card-foreground">{title}</h2>

      <div className="mt-3 space-y-3">
        {reviews.slice(0, max).map((review, idx) => (
          <div
            key={`${review.reviewerName ?? "review"}-${idx}`}
            className="rounded-xl border border-border/50 bg-background/30 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-card-foreground">
                  {review.reviewerName || "Anonymous"}
                </p>

                {review.date ? (
                  <p
                    data-testid="review-date"
                    className="text-xs text-card-foreground/60"
                  >
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                ) : null}
              </div>

              {typeof review.rating === "number" ? (
                <span className="text-xs text-card-foreground/70">
                  ★ {review.rating.toFixed(1)}
                </span>
              ) : null}
            </div>

            {review.comment ? (
              <p className="mt-2 text-sm text-card-foreground/70">
                {review.comment}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
