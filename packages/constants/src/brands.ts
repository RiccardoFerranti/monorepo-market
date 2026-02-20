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
  },
} as const;