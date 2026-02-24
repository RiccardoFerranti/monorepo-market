"use server";

import { cookies } from "next/headers";

import { AUTH_COOKIE } from "@repo/constants";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}
