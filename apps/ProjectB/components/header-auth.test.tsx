import { render, screen } from "@testing-library/react";
import HeaderAuth from "./header-auth";
import type { THeaderLink } from "@repo/ui/header";
import { isLoggedIn } from "../utils/is-logged-in";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useSelectedLayoutSegments: () => ["products"],
}));

jest.mock("../app/[market]/logout/components/logout-button", () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => <button>{label}</button>,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactElement }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("../utils/is-logged-in", () => ({
  isLoggedIn: jest.fn(),
}));

describe("HeaderAuth (integration)", () => {
  const baseLinks: THeaderLink[] = [
    { key: "home", label: "Home", href: "/en" },
    { key: "products", label: "Products", href: "/en/products" },
  ];

  it("shows Login link when logged out", async () => {
    (isLoggedIn as jest.Mock).mockResolvedValue(false);

    const element = await HeaderAuth({
      title: "Project B",
      links: baseLinks,
      navPosition: "center",
      locale: "en",
      loginLabel: "Login",
      logoutLabel: "Logout",
    });

    render(element);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Logout")).toBeNull();
  });

  it("shows Logout button when logged in", async () => {
    (isLoggedIn as jest.Mock).mockResolvedValue(true);

    const element = await HeaderAuth({
      title: "Project A",
      links: baseLinks,
      navPosition: "right",
      locale: "en",
      loginLabel: "Login",
      logoutLabel: "Logout",
    });

    render(element);

    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Login")).toBeNull();
  });
});
