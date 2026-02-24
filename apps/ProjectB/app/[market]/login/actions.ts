"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTH_COOKIE,
  AUTH_COOKIE_MAX_AGE_SEC,
  paths,
} from "@repo/constants";
import type { TLocale } from "@repo/types";
import type { TLoginErrorKey } from "./types";
import { LoginSchema } from "./login-validation-schema";

type TLoginState = { ok: true } | { ok: false; messageKey: TLoginErrorKey };


export async function login(
  locale: TLocale,
  _prevState: TLoginState | null,
  formData: FormData,
): Promise<TLoginState> {
  // Coerce FormData values to strings before parsing
  const parsed = LoginSchema.safeParse({
    username: String(formData.get("username") ?? ""),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    // The first issue will have message "missingFields" or "tooShort"
    const first = parsed.error.issues[0]?.message;

    return {
      ok: false,
      messageKey: first === "tooShort" ? "tooShort" : "missingFields",
    };
  }

  const { username, password } = parsed.data;

  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) return { ok: false, messageKey: "apiMissing" };

  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    return { ok: false, messageKey: "invalidCredentials" };
  }

  const data = (await res.json()) as { accessToken?: string };

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