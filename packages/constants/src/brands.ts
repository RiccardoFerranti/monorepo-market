export const BRANDS = {
  projectA: {
    header: {
      navPosition: "right",
    },
    footer: {
      align: "left",
    },
    productCard: {
      layout: "vertical",
      titlePosition: "top-right",
      showCategories: false,
      thumbnails: 1,
      ctaAlert: "Hello from Green Project",
    },
  },
  projectB: {
    header: {
      navPosition: "left",
    },
    footer: {
      align: "left",
    },
    productCard: {
      layout: "horizontal",
      titlePosition: "bottom-left",
      showCategories: true,
      thumbnails: 2,
      ctaAlert: "Hello from Red Project",
    },
  },
} as const;