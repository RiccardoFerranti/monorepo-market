import { render, screen } from "@testing-library/react";

import { ProductCard } from "./product-card";
import { makeProductCardConfig } from "../test-utils/make-config";
import { makeProduct } from "../test-utils/product-fixtures";

describe("ProductCard", () => {
  it("should render title, description, and price", () => {
    render(<ProductCard config={makeProductCardConfig()} product={makeProduct()} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("should render tags when showCategories is true and product has tags", () => {
    render(
      <ProductCard
        config={makeProductCardConfig({ showCategories: true })}
        product={makeProduct()}
      />,
    );

    // ProductCard limits tags to 2
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
    expect(screen.queryByText("extra")).toBeNull();
  });

  it("should hide tags when showCategories is false", () => {
    render(
      <ProductCard
        config={makeProductCardConfig({ showCategories: false })}
        product={makeProduct()}
      />,
    );

    expect(screen.queryByText("phone")).toBeNull();
  });

  it("should render primary image using thumbnail (or first image fallback)", () => {
    render(<ProductCard config={makeProductCardConfig()} product={makeProduct()} />);

    // main image uses product.title as alt
    const main = screen.getByAltText("Test Product") as HTMLImageElement;
    expect(main).toBeInTheDocument();
    expect(main.getAttribute("src")).toContain(encodeURIComponent("https://example.com/thumb.png"));
  });

  it("should render thumbnails excluding the primary image and respecting config.thumbnails", () => {
    render(
      <ProductCard config={makeProductCardConfig({ thumbnails: 2 })} product={makeProduct()} />,
    );

    // thumbs alt is `${title} thumbnail`
    const thumbs = screen.getAllByAltText("Test Product thumbnail") as HTMLImageElement[];
    expect(thumbs).toHaveLength(2);

    // ensure primary is excluded
    const thumbSrcs = thumbs.map((t) => t.getAttribute("src"));

    expect(thumbSrcs[0]).toContain(encodeURIComponent("https://example.com/img1.png"));
    expect(thumbSrcs[1]).toContain(encodeURIComponent("https://example.com/img2.png"));
  });

  it("should not render thumbnails row when config.thumbnails is 0", () => {
    render(
      <ProductCard config={makeProductCardConfig({ thumbnails: 0 })} product={makeProduct()} />,
    );

    expect(screen.queryByAltText("Test Product thumbnail")).toBeNull();
  });

  it("should use footerRight when provided (instead of default 'View →')", () => {
    render(
      <ProductCard
        config={makeProductCardConfig()}
        product={makeProduct()}
        footerRight={<span>Custom CTA</span>}
      />,
    );

    expect(screen.getByText("Custom CTA")).toBeInTheDocument();
    expect(screen.queryByText("View →")).toBeNull();
  });

  it("should render default footerRight ('View →') when footerRight is not provided", () => {
    render(<ProductCard config={makeProductCardConfig()} product={makeProduct()} />);
    expect(screen.getByText("View →")).toBeInTheDocument();
  });

  it("should render horizontal layout when config.layout is 'horizontal'", () => {
    const { container } = render(
      <ProductCard
        config={makeProductCardConfig({ layout: "horizontal" })}
        product={makeProduct()}
      />,
    );

    // horizontal root has grid columns class
    // (we check container for the article root)
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
    expect(article?.className).toContain("grid");
    expect(article?.className).toContain("grid-cols-[140px_1fr]");
  });

  it("should place title on top when titlePlacement starts with 'top'", () => {
    const { container } = render(
      <ProductCard
        config={makeProductCardConfig({ titlePlacement: "top-left" })}
        product={makeProduct()}
      />,
    );

    const title = screen.getByText("Test Product");

    const topWrapper = container.querySelector(".pt-4");
    expect(topWrapper).toBeTruthy();

    // title should be rendered inside that wrapper
    expect(topWrapper).toContainElement(title);
  });

  it("should not render tags when product.tags is empty even if showCategories is true", () => {
    render(
      <ProductCard
        config={makeProductCardConfig({ showCategories: true })}
        product={makeProduct({ tags: [] })}
      />,
    );

    expect(screen.queryByText("phone")).toBeNull();
  });
});
