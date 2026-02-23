import type { IProductRecord, IProductRecordReview } from "@repo/types";

export function makeReview(
  overrides: Partial<IProductRecordReview> = {},
): IProductRecordReview {
  return {
    rating: 4.5,
    comment: "Great!",
    date: "2024-01-01T00:00:00.000Z",
    reviewerName: "Alice",
    reviewerEmail: "alice@example.com",
    ...overrides,
  };
}

export function makeProduct(
  overrides: Partial<IProductRecord> = {},
): IProductRecord {
  const base: IProductRecord = {
    id: 1,
    title: "Test Product",
    description: "Test description",
    category: "test-category",
    price: 100,
    discountPercentage: 0,
    rating: 4.2,
    stock: 10,
    tags: ["tag1", "tag2"],
    brand: "TestBrand",
    sku: "SKU-TEST-001",
    weight: 1.2,
    dimensions: { width: 10, height: 20, depth: 5 },
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 2-3 days",
    availabilityStatus: "In Stock",
    returnPolicy: "30-day returns",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
      barcode: "1234567890",
      qrCode: "https://example.com/qr.png",
    },
    images: ["https://example.com/img1.png", "https://example.com/img2.png"],
    thumbnail: "https://example.com/thumb.png",
    reviews: [makeReview()],
  };

  return {
    ...base,
    ...overrides,

    // protect nested objects from being overwritten partially
    dimensions: {
      ...base.dimensions,
      ...(overrides.dimensions ?? {}),
    },
    meta: {
      ...base.meta,
      ...(overrides.meta ?? {}),
    },

    // if caller provides reviews, use them; otherwise keep default
    reviews: overrides.reviews ?? base.reviews,
  };
}