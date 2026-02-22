import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/utils/is-locale";
import LoginForm from "./components/login-form";
import { cookies } from "next/headers";
import { AUTH_COOKIE, paths } from "@repo/constants";

type TLoginPageProps = {
  params: Promise<{ market: string }>;
  searchParams?: Promise<{ next?: string }>;
};

export default async function LoginPage({
  params,
  searchParams,
}: TLoginPageProps) {
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
      <p className="mt-2 text-sm text-foreground/70">
        Use <b>emilys</b> / <b>emilyspass</b>
      </p>

      <div className="mt-6">
        <LoginForm market={market} nextPath={sp.next ?? `/${market}`} />
      </div>
    </div>
  );
}
