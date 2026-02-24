import type { MARKETS } from "@repo/constants";

export type TLoginErrorKey = keyof (typeof MARKETS)["en"]["pages"]["login"]["errors"];
