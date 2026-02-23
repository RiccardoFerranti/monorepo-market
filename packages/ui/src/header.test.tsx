import { render, screen } from "@testing-library/react";
import { Header, type THeaderLink } from "./header";

function makeLinks(): THeaderLink[] {
  return [
    { key: "home", label: "Home", href: "/en" },
    { key: "products", label: "Products", href: "/en/products" },
    { key: "login", label: "Login", href: "/en/login" },
  ];
}

describe("Header", () => {
  it("should render title and links", () => {
    render(<Header title="Project" links={makeLinks()} />);

    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/en",
    );
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/en/products",
    );
  });

  it("should set aria-current on the active link", () => {
    render(<Header title="Project" links={makeLinks()} activeKey="products" />);

    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("should render rightSlot", () => {
    render(
      <Header
        title="Project"
        links={makeLinks()}
        rightSlot={<button>Logout</button>}
      />,
    );

    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });
});
