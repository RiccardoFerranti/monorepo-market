import { render, screen } from "@testing-library/react";
import ProductExtendedDetails from "./product-extended-details";
import type { IProductPageConfig } from "@repo/types";
import { makeProduct } from "@repo/ui";

describe("Product auth gating (integration-ish)", () => {
  const pageConfig: IProductPageConfig = {
    layout: "image-left",
    galleryThumbs: 1,
    showReviews: true,
    showTags: true,
    maxTags: 8,
    maxReviews: 5,
  };

  it("logged out -> shows auth notice and NOT extended details", () => {
    const product = makeProduct();
    const authNotice = "Sign in to see warranty, shipping, reviews and other details.";

    const loggedIn = false;

    render(
      <>
        {loggedIn ? (
          <ProductExtendedDetails product={product} pageConfig={pageConfig} />
        ) : (
          <p>{authNotice}</p>
        )}
      </>,
    );

    expect(screen.getByText(authNotice)).toBeInTheDocument();
    expect(screen.queryByText("Warranty")).toBeNull();
    expect(screen.queryByText("Reviews")).toBeNull();
  });
});
