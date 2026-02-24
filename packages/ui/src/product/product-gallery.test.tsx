import { render, screen, fireEvent } from "@testing-library/react";
import { ProductGallery } from "./product-gallery";

describe("ProductGallery", () => {
  it("should render primary image when thumbs is empty", () => {
    render(<ProductGallery title="My product" primary="https://example.com/p.png" thumbs={[]} />);

    // active -> primary
    expect(screen.getByAltText("My product")).toBeInTheDocument();
    // no thumbs row
    expect(screen.queryByRole("button", { name: /Show image for/i })).toBeNull();
  });

  it("should default active image to first thumb when provided", () => {
    render(
      <ProductGallery
        title="My product"
        primary="https://example.com/p.png"
        thumbs={["https://example.com/t1.png", "https://example.com/t2.png"]}
      />,
    );

    const main = screen.getByAltText("My product") as HTMLImageElement;
    expect(main.getAttribute("src")).toContain(encodeURIComponent("https://example.com/t1.png"));
  });

  it("should change active image when clicking a thumbnail", () => {
    render(
      <ProductGallery
        title="My product"
        primary="https://example.com/p.png"
        thumbs={["https://example.com/t1.png", "https://example.com/t2.png"]}
      />,
    );

    // click second thumb button
    const buttons = screen.getAllByRole("button", { name: /Show image for/i });
    expect(buttons[1]).toBeDefined();
    fireEvent.click(buttons[1]!);

    const main = screen.getByAltText("My product") as HTMLImageElement;
    expect(main.getAttribute("src")).toContain(encodeURIComponent("https://example.com/t2.png"));
  });

  it("should set aria-pressed true on active thumbnail", () => {
    render(
      <ProductGallery
        title="My product"
        primary="https://example.com/p.png"
        thumbs={["https://example.com/t1.png", "https://example.com/t2.png"]}
      />,
    );

    const buttons = screen.getAllByRole("button", { name: /Show image for/i });

    // initially first is active
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");

    expect(buttons[1]).toBeDefined();
    fireEvent.click(buttons[1]!);

    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
  });
});
