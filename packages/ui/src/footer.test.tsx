import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Footer", () => {
  it("should render default text when children not provided", () => {
    render(<Footer />);
    expect(screen.getByText("Monorepo demo")).toBeInTheDocument();
  });

  it("should render children when provided", () => {
    render(<Footer>Custom footer</Footer>);
    expect(screen.getByText("Custom footer")).toBeInTheDocument();
  });

  it("should apply align=right by default", () => {
    const { container } = render(<Footer>Text</Footer>);
    const inner = container.querySelector("footer > div") as HTMLElement;
    expect(inner.className).toContain("text-right");
  });

  it("should apply align=center", () => {
    const { container } = render(<Footer align="center">Text</Footer>);
    const inner = container.querySelector("footer > div") as HTMLElement;
    expect(inner.className).toContain("text-center");
  });

  it("should merge className", () => {
    const { container } = render(<Footer className="my-footer">Text</Footer>);
    const footer = container.querySelector("footer") as HTMLElement;
    expect(footer.className).toContain("my-footer");
  });
});
