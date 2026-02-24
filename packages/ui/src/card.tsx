import clsx from "clsx";
import type { ReactNode, ReactElement } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "soft";
};

type CardComponent = ((props: CardProps) => ReactElement) & {
  Header: (props: CardProps) => ReactElement;
  Content: (props: CardProps) => ReactElement;
  Footer: (props: CardProps) => ReactElement;
};

const CardRoot = ({ children, className, variant = "solid" }: CardProps) => (
  <div
    className={clsx(
      "text-card-foreground rounded-2xl border",
      variant === "solid" && "border-border bg-card",
      variant === "soft" && "border-border/60 bg-card/70",
      className,
    )}
  >
    {children}
  </div>
);

const Header = ({ children, className }: CardProps) => (
  <div className={clsx("px-6 pt-6", className)}>{children}</div>
);

const Content = ({ children, className }: CardProps) => (
  <div className={clsx("px-6 py-6", className)}>{children}</div>
);

const Footer = ({ children, className }: CardProps) => (
  <div className={clsx("px-6 pt-0 pb-6", className)}>{children}</div>
);

export const Card = CardRoot as CardComponent;
Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;
