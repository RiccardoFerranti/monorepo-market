import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("should render children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("should forward html props to the outer span", () => {
    render(
      <Badge data-testid="badge" title="hello">
        New
      </Badge>,
    );

    const el = screen.getByTestId("badge");
    expect(el).toHaveAttribute("title", "hello");
  });

  it("should not apply truncate classes by default", () => {
    render(<Badge>Long text</Badge>);

    const inner = screen.getByText("Long text"); // inner span
    const outer = inner.parentElement as HTMLElement; // outer span

    expect(outer).not.toHaveClass("max-w-20");
    expect(inner).not.toHaveClass("truncate");
    expect(inner).not.toHaveClass("whitespace-nowrap");
  });

  it("should apply truncate classes when truncate=true", () => {
    render(<Badge truncate>Long text</Badge>);

    const inner = screen.getByText("Long text");
    const outer = inner.parentElement as HTMLElement;

    expect(outer).toHaveClass("max-w-20");
    expect(inner).toHaveClass("block");
    expect(inner).toHaveClass("truncate");
    expect(inner).toHaveClass("whitespace-nowrap");
  });

  it("should merge className with base classes", () => {
    render(<Badge className="custom-class">New</Badge>);

    const inner = screen.getByText("New");
    const outer = inner.parentElement as HTMLElement;

    expect(outer).toHaveClass("custom-class");
    expect(outer).toHaveClass("rounded-full"); // sanity: base classes still present
  });
});
