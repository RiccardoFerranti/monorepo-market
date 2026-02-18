import clsx from "clsx";
import type { ReactNode, ReactElement } from "react";

type CardProps = { children: ReactNode; className?: string };

type CardComponent = ((props: CardProps) => ReactElement) & {
  Header: (props: CardProps) => ReactElement;
  Content: (props: CardProps) => ReactElement;
  Footer: (props: CardProps) => ReactElement;
};

const CardRoot = ({ children, className }: CardProps) => (
  <div
    className={clsx(
      "rounded-2xl border border-border bg-card text-card-foreground",
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
  <div className={clsx("px-6 pb-6 pt-0", className)}>{children}</div>
);

export const Card = CardRoot as CardComponent;
Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;
