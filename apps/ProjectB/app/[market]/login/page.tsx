import { Suspense } from "react";

import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import type { Metadata } from "next";

import { AUTH_COOKIE, paths } from "@repo/constants";
import type { TLocale } from "@repo/types";
import { isLocale } from "@repo/utils";

import { TITLE } from "@/consts/brand";

import { LoginFallback } from "./components/login-fallback";
import LoginForm from "./components/login-form";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TITLE} – Login`,
    description: "Login to access your account.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

type TLoginPageProps = {
  params: Promise<{ market: TLocale }>;
  searchParams?: Promise<{ next?: string }>;
};

export default function LoginPage(props: TLoginPageProps) {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginInner {...props} />
    </Suspense>
  );
}

async function LoginInner({ params, searchParams }: TLoginPageProps) {
  const { market } = await params;
  const sp = (await searchParams) ?? {};

  if (!isLocale(market)) notFound();

  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE);

  if (session) {
    redirect(paths.products(market));
  }

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
      <p className="text-foreground/70 mt-2 text-sm">
        Use <b>emilys</b> / <b>emilyspass</b>
      </p>

      <div className="mt-6">
        <LoginForm market={market} nextPath={sp.next ?? `/${market}`} />
      </div>
    </div>
  );
}
