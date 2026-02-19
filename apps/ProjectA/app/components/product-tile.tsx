import { IProduct } from "@repo/types";
import clsx from "clsx";
import Image from "next/image";

export default function ProductTile({ product }: { product: IProduct }) {
  return (
    <article
      className={clsx(
        "group overflow-hidden rounded-2xl",
        "border bg-card shadow-sm transition-all duration-200 ease-out cursor-pointer",
        "border-border/60",
        "hover:-translate-y-1 hover:shadow-xl",
        "hover:border-primary",
        "hover:outline-2 hover:outline-primary",
        "hover:ring-4 hover:ring-primary/25",
      )}
    >
      {/* Image area */}
      <div className="relative h-44 w-full bg-linear-to-b from-white to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* subtle top shine */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent dark:via-white/5" />
      </div>

      {/* Text panel */}
      <div className="space-y-1.5 bg-card p-4">
        <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-card-foreground">
          {product.title}
        </h3>

        <p className="line-clamp-2 text-sm text-card-foreground/70">
          {product.description}
        </p>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-card-foreground">
            ${product.price}
          </span>

          <span className="text-xs text-card-foreground/70 opacity-0 transition-opacity group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>
    </article>
  );
}
