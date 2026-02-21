import clsx from "clsx";
import type { ReactNode } from "react";
import type { IProductCardConfig, IProductRecord } from "@repo/types";
import { Badge } from "../badge";
import Image from "next/image";

type TProductCardProps = {
  config: IProductCardConfig;
  product: IProductRecord;
  footerRight?: ReactNode;
  className?: string;
};

const isTop = (p: IProductCardConfig["titlePlacement"]) => p.startsWith("top");
const isRight = (p: IProductCardConfig["titlePlacement"]) =>
  p.endsWith("right");

function alignToText(align: IProductCardConfig["contentAlign"]) {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}

function alignToItems(align: IProductCardConfig["contentAlign"]) {
  if (align === "right") return "items-end";
  if (align === "center") return "items-center";
  return "items-start";
}

function alignToJustify(align: IProductCardConfig["contentAlign"]) {
  if (align === "right") return "justify-end";
  if (align === "center") return "justify-center";
  return "justify-start";
}

export function ProductCard({
  config,
  product,
  footerRight,
  className,
}: TProductCardProps) {
  const titleOnTop = isTop(config.titlePlacement);
  const titleAlignRight = isRight(config.titlePlacement);

  // Title alignment comes ONLY from titlePlacement
  const titleText = titleAlignRight ? "text-right" : "text-left";
  const titleRowJustify = titleAlignRight ? "justify-end" : "justify-start";

  // Content alignment comes ONLY from contentAlign
  const contentText = alignToText(config.contentAlign);
  const contentItems = alignToItems(config.contentAlign);
  const contentJustify = alignToJustify(config.contentAlign);

  const tags = product.tags ?? [];
  const showTags = config.showCategories && tags.length > 0;

  const primary = product.thumbnail ?? product.images?.[0] ?? "";

  // thumbnails come from images[], excluding the primary
  const thumbs = (product.images ?? [])
    .filter((u) => u && u !== primary)
    .slice(0, config.thumbnails);

  const Title = (
    <div className={clsx("flex w-full", titleRowJustify)}>
      <h3
        className={clsx(
          "line-clamp-1 text-sm font-semibold tracking-tight text-card-foreground",
          titleText,
        )}
      >
        {product.title}
      </h3>
    </div>
  );

  const Description = (
    <p
      className={clsx(
        "mt-1 line-clamp-2 text-sm text-card-foreground/70",
        contentText,
      )}
    >
      {product.description}
    </p>
  );

  const Tags = showTags ? (
    <div className={clsx("mt-3 flex flex-wrap gap-2", contentJustify)}>
      {tags.slice(0, 4).map((tag) => (
        <Badge key={tag} title={tag} truncate>
          {tag}
        </Badge>
      ))}
    </div>
  ) : null;

  const Footer = (
    <div className="mt-2 flex w-full items-center">
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-semibold text-card-foreground">
          ${product.price}
        </span>
        {footerRight ?? (
          <span className="whitespace-nowrap text-xs text-card-foreground/60 opacity-0 transition-opacity group-hover:opacity-100">
            View →
          </span>
        )}
      </div>
    </div>
  );

  // --- MEDIA: thumbs alignment uses contentAlign ---
  const MediaVertical = (
    <div className="p-3">
      {primary ? (
        <div className="relative h-44 w-full rounded-xl bg-muted/85">
          <Image
            src={primary}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={clsx(
              "rounded-xl object-contain p-4",
              "transition-transform duration-300 group-hover:scale-[1.03]",
            )}
          />
        </div>
      ) : null}

      {thumbs.length > 0 ? (
        <div className={clsx("mt-2 flex items-center gap-2", contentJustify)}>
          {thumbs.map((src) => (
            <div
              key={src}
              className={clsx(
                "h-10 w-10 rounded-lg bg-muted/85 overflow-hidden",
                "ring-1 ring-border/70",
                "transition-transform duration-200",
                "hover:ring-border hover:bg-muted",
              )}
            >
              <Image
                src={src}
                alt={`${product.title} thumbnail`}
                width={40}
                height={40}
                className="h-full w-full rounded-lg object-contain p-2 opacity-90"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );

  const MediaHorizontal = (
    <div className="h-full border-r border-border/40 p-3">
      {primary ? (
        <div className="h-32 rounded-xl bg-muted">
          <img
            src={primary}
            alt={product.title}
            className={clsx(
              "h-full w-full rounded-xl object-contain p-3",
              "transition-transform duration-300 group-hover:scale-[1.03]",
            )}
          />
        </div>
      ) : null}

      {thumbs.length > 0 ? (
        <div className={clsx("mt-2 flex items-center gap-2", contentJustify)}>
          {thumbs.map((src) => (
            <div
              key={src}
              className={clsx(
                "h-10 w-10 rounded-lg bg-muted/85 overflow-hidden",
                "ring-1 ring-border/70",
                "transition-transform duration-200",
                "hover:ring-border hover:bg-muted",
              )}
            >
              <img
                src={src}
                alt={`${product.title} thumbnail`}
                className="h-full w-full rounded-lg object-contain p-2 opacity-90"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );

  const Media = config.layout === "vertical" ? MediaVertical : MediaHorizontal;

  // ----- VERTICAL -----
  const Vertical = (
    <article
      className={clsx(
        "group overflow-hidden rounded-2xl",
        "border border-border/60",
        "bg-card backdrop-blur supports-backdrop-filter:bg-card/55",
        "shadow-sm shadow-black/20 ring-1 ring-white/5",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-border hover:ring-1 hover:ring-white/20",
        "cursor-pointer flex flex-col",
        className,
      )}
    >
      {titleOnTop ? <div className="px-4 pt-4">{Title}</div> : null}

      {Media}

      <div className={clsx("px-4 pb-4", contentText)}>
        {!titleOnTop ? <div className="mt-1">{Title}</div> : null}
        {Description}
        {Tags}
        <div className="mt-3">{Footer}</div>
      </div>
    </article>
  );

  // ----- HORIZONTAL -----
  const Horizontal = (
    <article
      className={clsx(
        "group overflow-hidden rounded-2xl",
        "border border-border/60",
        "bg-card/70 backdrop-blur supports-backdrop-filter:bg-card/55",
        "shadow-sm shadow-black/20 ring-1 ring-white/5",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-border hover:ring-1 hover:ring-white/20",
        "cursor-pointer grid grid-cols-[140px_1fr]",
        className,
      )}
    >
      {Media}

      <div className={clsx("min-w-0 p-4 flex flex-col bg-card", contentItems)}>
        {titleOnTop ? (
          <>
            <div className="w-full">{Title}</div>
            {Description}
            {Tags}
            <div className="mt-auto w-full">{Footer}</div>
          </>
        ) : (
          <>
            {Description}
            {Tags}
            <div className="mt-auto w-full">
              <div className="w-full">{Title}</div>
              {Footer}
            </div>
          </>
        )}
      </div>
    </article>
  );

  const CardInner = config.layout === "vertical" ? Vertical : Horizontal;

  return CardInner;
}
