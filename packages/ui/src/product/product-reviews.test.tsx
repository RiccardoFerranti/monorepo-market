import { render, screen } from "@testing-library/react";

import type { IProductRecordReview } from "@repo/types";

import { ProductReviews } from "./product-reviews";

describe("ProductReviews", () => {
  const reviews: IProductRecordReview[] = [
    {
      rating: 4.2,
      comment: "Great product",
      date: "2024-01-15T10:00:00.000Z",
      reviewerName: "Alice",
      reviewerEmail: "alice@example.com",
    },
    {
      rating: 3.0,
      comment: "Ok",
      date: "2024-02-01T10:00:00.000Z",
      reviewerName: "Bob",
      reviewerEmail: "bob@example.com",
    },
  ];

  it("should return null when reviews is empty", () => {
    const { container } = render(<ProductReviews reviews={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render default title and reviewer name", () => {
    render(<ProductReviews reviews={reviews} />);

    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("should render custom title", () => {
    render(<ProductReviews reviews={reviews} title="Customer feedback" />);
    expect(screen.getByText("Customer feedback")).toBeInTheDocument();
  });

  it("should respect max", () => {
    render(<ProductReviews reviews={reviews} max={1} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).toBeNull();
  });

  it("should show rating formatted to 1 decimal", () => {
    render(<ProductReviews reviews={reviews} />);

    // "★ 4.2" exists (4.2.toFixed(1) -> "4.2")
    expect(screen.getByText("★ 4.2")).toBeInTheDocument();
    expect(screen.getByText("★ 3.0")).toBeInTheDocument();
  });

  it("should show Anonymous when reviewerName is missing", () => {
    render(
      <ProductReviews
        reviews={[
          {
            rating: 5,
            comment: "Nice",
            date: "2024-01-01T00:00:00.000Z",
            reviewerName: "",
            reviewerEmail: "x@example.com",
          },
        ]}
      />,
    );

    expect(screen.getByText("Anonymous")).toBeInTheDocument();
  });

  it("should render a date element for each review when date is provided", () => {
    render(<ProductReviews reviews={reviews} />);
    expect(screen.getAllByTestId("review-date")).toHaveLength(2);
  });
});
