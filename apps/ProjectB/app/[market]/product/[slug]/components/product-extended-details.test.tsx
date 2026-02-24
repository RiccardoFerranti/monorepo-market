import { render, screen } from "@testing-library/react";

import type { IProductPageConfig } from "@repo/types";
import { makeProduct, makeReview } from "@repo/ui";

import ProductExtendedDetails from "./product-extended-details";

describe("ProductExtendedDetails", () => {
  const pageConfig: IProductPageConfig = {
    layout: "image-left",
    galleryThumbs: 1,
    showReviews: true,
    showTags: true,
    maxTags: 8,
    maxReviews: 5,
  };

  it("should render extended stats", () => {
    const product = makeProduct({
      sku: "SKU-123",
      warrantyInformation: "1 year warranty",
      shippingInformation: "Ships in 2-3 days",
      returnPolicy: "30-day returns",
      minimumOrderQuantity: 2,
    });

    render(<ProductExtendedDetails product={product} pageConfig={pageConfig} />);

    expect(screen.getByText("SKU")).toBeInTheDocument();
    expect(screen.getByText("SKU-123")).toBeInTheDocument();

    expect(screen.getByText("Warranty")).toBeInTheDocument();
    expect(screen.getByText("1 year warranty")).toBeInTheDocument();

    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Ships in 2-3 days")).toBeInTheDocument();

    expect(screen.getByText("Return policy")).toBeInTheDocument();
    expect(screen.getByText("30-day returns")).toBeInTheDocument();

    expect(screen.getByText("Min order qty")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should render reviews when enabled and present", () => {
    const product = makeProduct({
      reviews: [makeReview({ reviewerName: "Alice", rating: 4.2 })],
    });

    render(<ProductExtendedDetails product={product} pageConfig={pageConfig} />);

    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("★ 4.2")).toBeInTheDocument();
  });

  it("should hide reviews when showReviews=false", () => {
    const product = makeProduct({
      reviews: [makeReview({ reviewerName: "Alice" })],
    });

    render(
      <ProductExtendedDetails
        product={product}
        pageConfig={{ ...pageConfig, showReviews: false }}
      />,
    );

    expect(screen.queryByText("Reviews")).toBeNull();
  });
});
