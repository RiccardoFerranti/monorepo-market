"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { Header, type THeaderLink } from "@repo/ui";

function activeKeyFromSegments(segments: string[]): THeaderLink["key"] {
  const first = segments[0]; // "" | "products" | "product" | "login"
  if (!first) return "home";
  if (first === "products" || first === "product") return "products";
  if (first === "login") return "login";
  return "home";
}

export function HeaderWithActive(
  props: Omit<React.ComponentProps<typeof Header>, "activeKey">,
) {
  const segments = useSelectedLayoutSegments() as string[];
  const activeKey = activeKeyFromSegments(segments);
  return <Header {...props} activeKey={activeKey} />;
}
