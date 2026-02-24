export const BRANDS = {
  projectA: {
    header: {
      navPosition: "right",
    },
    footer: {
      align: "right",
    },
    productCard: {
      layout: "vertical",
      titlePlacement: "bottom-left",
      contentAlign: "left",
      showCategories: false,
      thumbnails: 0,
    },
    productPage: {
      layout: "image-left", // or "image-right"
      galleryThumbs: 1,
      showReviews: true,
      showTags: true,
      maxTags: 8,
      maxReviews: 5,
    },
  },
  projectB: {
    header: {
      navPosition: "center",
    },
    footer: {
      align: "right",
    },
    productCard: {
      layout: "horizontal",
      titlePlacement: "top-left",
      contentAlign: "left",
      showCategories: true,
      thumbnails: 2,
    },
    productPage: {
      layout: "image-left",
      galleryThumbs: 6,
      showReviews: true,
      showTags: true,
      maxTags: 8,
      maxReviews: 5,
    },
  },
} as const;
