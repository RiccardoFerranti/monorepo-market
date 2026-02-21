import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import type { IProductPageConfig, IProductRecord } from "@repo/types";
import { BRANDS, MARKETS, paths } from "@repo/constants";
import {
  ProductGallery,
  ProductReviews,
  ProductStat,
  Badge,
  Card,
} from "@repo/ui";
import { BRAND } from "@/app/consts/brand";
import { isLocale } from "@/app/utils/is-locale";
import { isNumericId } from "@/app/utils/is-numeric-id";

async function getProductCached(id: string): Promise<IProductRecord> {
  "use cache";
  cacheLife("product5m");

  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

type TProductPageProps = {
  params: Promise<{ market: string; slug: string }>;
};

export default async function ProductPage({ params }: TProductPageProps) {
  const { market, slug } = await params;

  if (!isLocale(market)) notFound();
  if (!isNumericId(slug)) notFound();

  let product: IProductRecord;
  try {
    product = await getProductCached(slug);
  } catch {
    notFound();
  }

  const pageConfig: IProductPageConfig = BRANDS[BRAND].productPage;

  const primary = product.thumbnail ?? product.images?.[0] ?? "";

  // uniq, exclude primary, limit by config
  const thumbs = Array.from(
    new Set((product.images ?? []).filter((img) => img && img !== primary)),
  ).slice(0, pageConfig.galleryThumbs);

  const showTags = pageConfig.showTags && (product.tags?.length ?? 0) > 0;
  const showReviews =
    pageConfig.showReviews && (product.reviews?.length ?? 0) > 0;

  const imageRight = (pageConfig.layout === "image-right") as boolean;

  const productPage = MARKETS[market].pages.product;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <Link
          href={paths.products(market)}
          className="text-sm text-foreground/70 hover:text-foreground"
        >
          ← {productPage.backToProducts}
        </Link>
      </div>

      <div
        className={clsx(
          "grid gap-6",
          imageRight ? "lg:grid-cols-[1fr_420px]" : "lg:grid-cols-[420px_1fr]",
        )}
      >
        {/* GALLERY */}
        <Card className={clsx(imageRight && "lg:order-2")} variant="soft">
          <Card.Content>
            <ProductGallery
              title={product.title}
              primary={primary}
              thumbs={thumbs}
            />
          </Card.Content>
        </Card>
        {/* DETAILS */}
        <Card className={clsx(imageRight && "lg:order-1")} variant="soft">
          <Card.Content>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight text-card-foreground">
                  {product.title}
                </h1>

                <p className="mt-2 text-sm text-card-foreground/70">
                  {product.description}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-xl font-semibold text-card-foreground">
                  ${product.price}
                </div>
                {typeof product.discountPercentage === "number" ? (
                  <div className="mt-1 text-xs text-card-foreground/60">
                    -{product.discountPercentage.toFixed(0)}%
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ProductStat label="Brand" value={product.brand} />
              <ProductStat label="Category" value={product.category} />
              <ProductStat
                label="Stock"
                value={typeof product.stock === "number" ? product.stock : "—"}
              />
              <ProductStat
                label="Rating"
                value={
                  typeof product.rating === "number"
                    ? product.rating.toFixed(2)
                    : "—"
                }
              />
            </div>

            {/* TAGS (config-driven) */}
            {showTags ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags!.slice(0, pageConfig.maxTags).map((tag) => (
                  <Badge key={tag} title={tag} truncate={false}>
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}

            {/* REVIEWS (config-driven) */}
            {showReviews ? (
              <ProductReviews
                reviews={product.reviews}
                max={pageConfig.maxReviews}
              />
            ) : null}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
