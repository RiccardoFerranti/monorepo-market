import { render, screen } from "@testing-library/react";

import { Card } from "./card";

describe("Card", () => {
  it("should render children", () => {
    render(
      <Card>
        <div>Child</div>
      </Card>,
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("should default to solid variant styles", () => {
    const { container } = render(<Card>Solid</Card>);
    const root = container.firstChild as HTMLElement;

    expect(root.className).toContain("rounded-2xl");
    expect(root.className).toContain("border-border");
    expect(root.className).toContain("bg-card");
  });

  it("should apply soft variant styles", () => {
    const { container } = render(<Card variant="soft">Soft</Card>);
    const root = container.firstChild as HTMLElement;

    expect(root.className).toContain("border-border/60");
    expect(root.className).toContain("bg-card/70");
  });

  it("should merge className", () => {
    const { container } = render(<Card className="my-card">C</Card>);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("my-card");
  });

  it("should render Card.Content with default padding classes", () => {
    render(
      <Card>
        <Card.Content>Content</Card.Content>
      </Card>,
    );

    const el = screen.getByText("Content");
    expect(el.className).toContain("px-6");
    expect(el.className).toContain("py-6");
  });

  it("should render Card.Header and Card.Footer", () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
