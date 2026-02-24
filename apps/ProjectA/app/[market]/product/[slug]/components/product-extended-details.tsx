import { IProductPageConfig, IProductRecord } from "@repo/types";
import { ProductReviews, ProductStat } from "@repo/ui";

type TProductExtendedDetailsProps = {
  product: IProductRecord;
  pageConfig: IProductPageConfig;
};

export default function ProductExtendedDetails({
  product,
  pageConfig,
}: TProductExtendedDetailsProps) {
  const showReviews = pageConfig.showReviews && (product.reviews?.length ?? 0) > 0;

  return (
    <>
      {/* EXTENDED DETAILS (auth-gated) */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <ProductStat label="SKU" value={product.sku ?? "—"} />

        <ProductStat
          label="Weight"
          value={typeof product.weight === "number" ? `${product.weight} kg` : "—"}
        />

        <ProductStat
          label="Dimensions"
          value={
            product.dimensions
              ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`
              : "—"
          }
        />

        <ProductStat label="Availability" value={product.availabilityStatus ?? "—"} />

        <ProductStat label="Warranty" value={product.warrantyInformation ?? "—"} />

        <ProductStat label="Shipping" value={product.shippingInformation ?? "—"} />

        <ProductStat label="Return policy" value={product.returnPolicy ?? "—"} />

        <ProductStat
          label="Min order qty"
          value={
            typeof product.minimumOrderQuantity === "number"
              ? String(product.minimumOrderQuantity)
              : "—"
          }
        />
      </div>

      {/* REVIEWS (config + auth-gated) */}
      {showReviews ? (
        <ProductReviews reviews={product.reviews} max={pageConfig.maxReviews} />
      ) : null}
    </>
  );
}
