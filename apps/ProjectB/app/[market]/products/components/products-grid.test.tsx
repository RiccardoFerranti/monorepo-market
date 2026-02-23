import { render, screen } from "@testing-library/react";
import { BRANDS } from "@repo/constants";
import { ProductCard, makeProduct } from "@repo/ui";
import { BRAND } from "@/consts/brand";

describe("Brand layout - ProjectB", () => {
  it("should render ProductCard in horizontal layout for this brand", () => {
    const config = BRANDS[BRAND].productCard;

    expect(config.layout).toBe("horizontal");

    render(<ProductCard product={makeProduct()} config={config} />);

    const titleEl = screen.getByText("Test Product");
    const article = titleEl.closest("article");
    expect(article).toBeTruthy();

    // Horizontal uses grid layout
    expect(article!.className).toContain("grid");
    expect(article!.className).toContain("grid-cols-[140px_1fr]");
  });
});
