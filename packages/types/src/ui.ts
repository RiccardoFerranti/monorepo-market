
export interface IProductCardConfig {
  /**
   * Controls the overall structure of the card.
   * - "vertical": image stacked above content
   * - "horizontal": image and content side-by-side
   */
  layout: "vertical" | "horizontal";

  /**
   * Controls where the product title is rendered inside the card.
   * This affects markup positioning (not just CSS alignment).
   *
   * Format: "{vertical-position}-{horizontal-alignment}"
   * Example: "top-right" → title at top, aligned right.
   */
  titlePlacement:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

  /**
   * Controls alignment of description, tags and general content
   * inside the card body.
   *
   * Optional to allow a default alignment (e.g., "left")
   * in the shared component.
   */
  contentAlign?: "left" | "right" | "center";

  /**
   * Determines whether category tags should be rendered.
   * Example:
   * - ProjectA → false
   * - ProjectB → true
   *
   * This modifies business logic, not just styling.
   */
  showCategories: boolean;

  /**
   * Number of additional thumbnails to display
   * (derived from product.images excluding primary).
   *
   * 0 → no thumbnails
   * 1–2 → small preview images rendered under/aside main image
   *
   * Limited union type ensures strict control per brand.
   */
  thumbnails: 0 | 1 | 2;
}

export interface IProductPageConfig {
  /**
   * Controls the overall layout of the product detail page.
   * - image-left: gallery column first, details second
   * - image-right: details first, gallery second
   */
  layout: "image-left" | "image-right";

  /**
   * How many thumbnails to show in the gallery (from product.images, excluding the primary).
   * 0 means "no thumbnails row".
   */
  galleryThumbs: 0 | 1 | 2 | 3 | 4 | 5 | 6;


  /**
   * Toggles optional sections on the detail page.
   */
  showTags: boolean;
  showReviews: boolean;

   /**
   * Maximum number of tags displayed on the product page.
   */
   maxTags: number;

   /**
    * Maximum number of reviews displayed on the product page.
    */
   maxReviews: number;
}