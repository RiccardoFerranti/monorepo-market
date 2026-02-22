import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@repo/constants";

export async function isLoggedIn() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(AUTH_COOKIE)?.value);
}