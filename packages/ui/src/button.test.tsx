import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("should render children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("should default to primary variant styles", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button", { name: "Primary" });
    expect(btn.className).toContain("bg-primary");
    expect(btn.className).toContain("text-primary-foreground");
  });

  it("should apply variant styles (outline)", () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole("button", { name: "Outline" });
    expect(btn.className).toContain("border");
    expect(btn.className).toContain("bg-transparent");
  });

  it("should merge custom className with base classes", () => {
    render(<Button className="my-custom-class">X</Button>);
    const btn = screen.getByRole("button", { name: "X" });
    expect(btn.className).toContain("my-custom-class");
    expect(btn.className).toContain("inline-flex"); // base class present
  });

  it("should forward html props (onClick)", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Tap</Button>);
    await user.click(screen.getByRole("button", { name: "Tap" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should respect disabled", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );

    const btn = screen.getByRole("button", { name: "Disabled" });
    expect(btn).toBeDisabled();

    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
