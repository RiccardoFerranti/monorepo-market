"use client";

import * as React from "react";
import { useActionState } from "react";
import { Card, Input } from "@repo/ui";
import type { TLocale } from "@repo/types";
import { MARKETS } from "@repo/constants";
import { SubmitButton } from "@/components/submit-button";
import { login } from "../actions";
import type { TLoginErrorKey } from "../types";

type TLoginState = { ok: true } | { ok: false; messageKey: TLoginErrorKey };

type TLoginFormProps = {
  market: TLocale;
  nextPath: string;
};

export default function LoginForm({ market }: TLoginFormProps) {
  const loginPage = MARKETS[market].pages.login;

  const loginWithLocale = (prev: TLoginState | null, fd: FormData) => login(market, prev, fd);

  const [state, formAction] = useActionState<TLoginState | null, FormData>(loginWithLocale, null);

  const errorText = state && state.ok === false ? loginPage.errors[state.messageKey] : null;

  return (
    <Card variant="soft">
      <Card.Content>
        <form action={formAction} className="space-y-4">
          <div>
            <div>
              <label htmlFor="username">{loginPage.usernameLabel}</label>
              <Input
                id="username"
                name="username"
                required
                autoComplete="username"
                minLength={3}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password">{loginPage.passwordLabel}</label>
            <Input
              id="password"
              name="password"
              required
              autoComplete="current-password"
              minLength={3}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          {errorText ? <p className="text-destructive text-sm">{errorText}</p> : null}

          <SubmitButton label={loginPage.submit} className="w-full" variant="primary" />
        </form>
      </Card.Content>
    </Card>
  );
}
