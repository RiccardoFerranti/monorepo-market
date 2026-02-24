import { render } from "@testing-library/react";

import { ProductCardSkeleton } from "./product-card-skeleton";
import { makeProductCardConfig } from "../test-utils/make-config";

describe("ProductCardSkeleton", () => {
  it("should render vertical layout by default", () => {
    const { container } = render(
      <ProductCardSkeleton config={makeProductCardConfig({ layout: "vertical" })} />,
    );

    const root = container.firstElementChild as HTMLElement | null;
    expect(root).toBeTruthy();
    expect(root!.className).toContain("flex");
    expect(root!.className).toContain("flex-col");
  });

  it("should render horizontal layout when config.layout is horizontal", () => {
    const { container } = render(
      <ProductCardSkeleton config={makeProductCardConfig({ layout: "horizontal" })} />,
    );

    const root = container.firstElementChild as HTMLElement | null;
    expect(root).toBeTruthy();
    expect(root!.className).toContain("grid");
    expect(root!.className).toContain("grid-cols-[140px_1fr]");
  });

  it("should render the correct number of thumbnail skeleton blocks (vertical)", () => {
    const { container } = render(
      <ProductCardSkeleton config={makeProductCardConfig({ layout: "vertical", thumbnails: 2 })} />,
    );

    // In vertical: thumbs use h-12 w-12
    const thumbs = container.querySelectorAll(".h-12.w-12");
    expect(thumbs).toHaveLength(2);
  });

  it("should not render thumbnail skeleton blocks when thumbnails is 0 (vertical)", () => {
    const { container } = render(
      <ProductCardSkeleton config={makeProductCardConfig({ layout: "vertical", thumbnails: 0 })} />,
    );

    const thumbs = container.querySelectorAll(".h-12.w-12");
    expect(thumbs).toHaveLength(0);
  });

  it("should render the correct number of thumbnail skeleton blocks (horizontal)", () => {
    const { container } = render(
      <ProductCardSkeleton
        config={makeProductCardConfig({ layout: "horizontal", thumbnails: 2 })}
      />,
    );

    // In horizontal: thumbs use h-10 w-10
    const thumbs = container.querySelectorAll(".h-10.w-10");
    expect(thumbs).toHaveLength(2);
  });

  it("should render tags skeleton when showCategories is true", () => {
    const { container } = render(
      <ProductCardSkeleton config={makeProductCardConfig({ showCategories: true })} />,
    );

    // Tags block uses rounded-full blocks with h-5
    const tagPills = container.querySelectorAll(".h-5.rounded-full");
    expect(tagPills.length).toBeGreaterThan(0);
  });

  it("should not render tags skeleton when showCategories is false", () => {
    const { container } = render(
      <ProductCardSkeleton config={makeProductCardConfig({ showCategories: false })} />,
    );

    const tagPills = container.querySelectorAll(".h-5.rounded-full");
    expect(tagPills).toHaveLength(0);
  });

  it("should render title at top when titlePlacement starts with 'top' (vertical)", () => {
    const { container } = render(
      <ProductCardSkeleton
        config={makeProductCardConfig({
          layout: "vertical",
          titlePlacement: "top-left",
        })}
      />,
    );

    // top title wrapper in vertical is "px-4 pt-4"
    expect(container.querySelector(".px-4.pt-4")).toBeTruthy();
  });

  it("should render title below media when titlePlacement is not 'top*' (vertical)", () => {
    const { container } = render(
      <ProductCardSkeleton
        config={makeProductCardConfig({
          layout: "vertical",
          titlePlacement: "bottom-left",
        })}
      />,
    );

    // top title wrapper should not exist
    expect(container.querySelector(".px-4.pt-4")).toBeNull();

    // bottom title wrapper exists in vertical as "mt-1"
    expect(container.querySelector(".mt-1")).toBeTruthy();
  });
});
