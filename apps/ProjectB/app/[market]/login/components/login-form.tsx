"use client";

import * as React from "react";
import { useActionState } from "react";
import { Card } from "@repo/ui";
import type { TLocale } from "@repo/types";
import { MARKETS } from "@repo/constants";
import { login } from "../actions";
import { TLoginErrorKey } from "../types";
import { SubmitButton } from "@/components/submit-button";

type TLoginState = { ok: true } | { ok: false; messageKey: TLoginErrorKey };

type TLoginFormProps = {
  market: TLocale;
  nextPath: string;
};

export default function LoginForm({ market }: TLoginFormProps) {
  const loginPage = MARKETS[market].pages.login;

  const loginWithLocale = (prev: TLoginState | null, fd: FormData) =>
    login(market, prev, fd);

  const [state, formAction] = useActionState<TLoginState | null, FormData>(
    loginWithLocale,
    null,
  );

  const errorText =
    state && state.ok === false ? loginPage.errors[state.messageKey] : null;

  return (
    <Card variant="soft">
      <Card.Content>
        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-xs text-foreground/70">
              {loginPage.usernameLabel}
            </label>
            <input
              name="username"
              required
              className="mt-1 w-full rounded-xl border border-border bg-background/40 px-3 py-2 text-sm"
              autoComplete="username"
              minLength={3}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          <div>
            <label className="text-xs text-foreground/70">
              {loginPage.passwordLabel}
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-xl border border-border bg-background/40 px-3 py-2 text-sm"
              autoComplete="current-password"
              minLength={3}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          {errorText ? (
            <p className="text-sm text-destructive">{errorText}</p>
          ) : null}

          <SubmitButton
            label={loginPage.submit}
            className="w-full"
            variant="primary"
          />
        </form>
      </Card.Content>
    </Card>
  );
}
