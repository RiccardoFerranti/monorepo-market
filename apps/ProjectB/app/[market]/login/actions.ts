"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, AUTH_COOKIE_MAX_AGE_SEC, paths } from "@repo/constants"; 
import type { TLocale } from "@repo/types";
import { TLoginErrorKey } from "./types";

type TLoginState =
  | { ok: true }
  | { ok: false; messageKey: TLoginErrorKey };

export async function login(
  locale: TLocale,
  _prevState: TLoginState | null,
  formData: FormData,
): Promise<TLoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (!username || !password) {
    return { ok: false, messageKey: 'missingFields' };
  }
  
  if (username.length < 3 || password.length < 3) {
    return { ok: false, messageKey: "missingFields" }; // or add a new key like "tooShort"
  }

  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) return { ok: false, messageKey: 'apiMissing' };

  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // DummyJSON expects username/password
    body: JSON.stringify({ username, password }),
    // keep it dynamic
    cache: "no-store",
  });

  if (!res.ok) {
    return { ok: false, messageKey: 'invalidCredentials' };
  }

  const data = (await res.json()) as { accessToken?: string; refreshToken?: string };

  if (!data.accessToken) {
    return { ok: false, messageKey: "loginFailed" };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE_SEC,
  });
  redirect(paths.products(locale));
}