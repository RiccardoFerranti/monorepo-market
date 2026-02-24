import clsx from "clsx";
import type { ReactNode, ReactElement } from "react";

type TCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "soft";
};

type TCardComponent = ((props: TCardProps) => ReactElement) & {
  Header: (props: TCardProps) => ReactElement;
  Content: (props: TCardProps) => ReactElement;
  Footer: (props: TCardProps) => ReactElement;
};

const CardRoot = ({ children, className, variant = "solid" }: TCardProps) => (
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

const Header = ({ children, className }: TCardProps) => (
  <div className={clsx("px-6 pt-6", className)}>{children}</div>
);

const Content = ({ children, className }: TCardProps) => (
  <div className={clsx("px-6 py-6", className)}>{children}</div>
);

const Footer = ({ children, className }: TCardProps) => (
  <div className={clsx("px-6 pt-0 pb-6", className)}>{children}</div>
);

export const Card = CardRoot as TCardComponent;
Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;
