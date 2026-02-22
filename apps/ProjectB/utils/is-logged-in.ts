import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@repo/constants";

/**
 * Checks if the user is currently logged in by verifying the presence of the authentication cookie.
 *
 * @returns {Promise<boolean>} A promise that resolves to true if the authentication cookie exists, otherwise false.
 */
export async function isLoggedIn() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(AUTH_COOKIE)?.value);
}