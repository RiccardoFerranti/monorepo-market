import localFont from "next/font/local";

import type { Metadata } from "next";
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Monorepo Market",
    template: "%s | Monorepo Market",
  },
  description:
    "Multi-brand, multi-market product portal built with Next.js 16, React 19, and Turborepo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background min-h-screen`}>
        <div className="relative h-dvh">
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
          <div className="from-background via-background to-foreground/5 pointer-events-none fixed inset-0 -z-10 bg-linear-to-b" />
          {children}
        </div>
      </body>
    </html>
  );
}
