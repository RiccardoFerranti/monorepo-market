import { render, screen } from "@testing-library/react";

import { Input } from "./input";

describe("Input", () => {
  it("should render input with id and name", () => {
    render(<Input id="username" name="username" />);
    const el = screen.getByRole("textbox");
    expect(el).toHaveAttribute("id", "username");
    expect(el).toHaveAttribute("name", "username");
  });

  it("should merge className with base classes", () => {
    render(<Input className="my-input" aria-label="x" />);
    const el = screen.getByLabelText("x");
    expect(el.className).toContain("my-input");
    expect(el.className).toContain("rounded-xl");
  });

  it("should forward html props", () => {
    render(<Input aria-label="email" required autoComplete="email" />);
    const el = screen.getByLabelText("email");
    expect(el).toBeRequired();
    expect(el).toHaveAttribute("autocomplete", "email");
  });
});
