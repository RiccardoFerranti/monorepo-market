import type { IProductCardConfig } from "@repo/types";

export function makeProductCardConfig(
  overrides: Partial<IProductCardConfig> = {},
): IProductCardConfig {
  return {
    layout: "vertical",
    titlePlacement: "bottom-left",
    contentAlign: "left",
    showCategories: true,
    thumbnails: 2,
    ...overrides,
  };
}