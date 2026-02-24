import { render, screen } from "@testing-library/react";

import { ProductStat } from "./product-stat";

describe("ProductStat", () => {
  it("should render label and value", () => {
    render(<ProductStat label="Brand" value="Apple" />);

    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("should render fallback dash when value is null/undefined", () => {
    render(<ProductStat label="Stock" value={undefined} />);

    expect(screen.getByText("Stock")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("should merge custom className", () => {
    const { container } = render(
      <ProductStat label="Category" value="Phones" className="test-class" />,
    );

    // root wrapper is the first div rendered
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("rounded-xl");
    expect(root.className).toContain("test-class");
  });
});
