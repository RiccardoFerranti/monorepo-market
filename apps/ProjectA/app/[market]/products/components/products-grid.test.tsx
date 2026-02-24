import { render, screen } from "@testing-library/react";

import { BRANDS } from "@repo/constants";
import { makeProduct, ProductCard } from "@repo/ui";

import { BRAND } from "@/consts/brand";

describe("Brand layout - ProjectA", () => {
  it("should render ProductCard in vertical layout for this brand", () => {
    const config = BRANDS[BRAND].productCard;

    expect(config.layout).toBe("vertical");

    render(<ProductCard product={makeProduct()} config={config} />);

    // Root element is an <article>
    const titleEl = screen.getByText("Test Product");
    const article = titleEl.closest("article");
    expect(article).toBeTruthy();

    // Vertical uses "flex flex-col"
    expect(article!.className).toContain("flex");
    expect(article!.className).toContain("flex-col");
  });
});
