import { paths } from "@repo/constants";
import type { TLocale } from "@repo/types";
import type { THeaderLink, THeaderProps } from "@repo/ui/header";

import LogoutButton from "@/app/[market]/logout/components/logout-button";
import { isLoggedIn } from "@/utils/is-logged-in";

import { HeaderWithActive } from "./header-with-active";

type THeaderAuthProps = Omit<THeaderProps, "activeKey"> & {
  locale: TLocale;
  loginLabel: string;
  logoutLabel: string;
};

export default async function HeaderAuth(props: THeaderAuthProps) {
  const { locale, loginLabel, logoutLabel, links, ...rest } = props;

  const loggedIn = await isLoggedIn();

  const nextLinks: THeaderLink[] = [...links];

  // if the user is not logged in, add the login link
  if (!loggedIn) {
    nextLinks.push({
      key: "login",
      label: loginLabel,
      href: paths.login(locale),
    });
  }

  return (
    <HeaderWithActive
      {...rest}
      links={nextLinks}
      rightSlot={loggedIn ? <LogoutButton label={logoutLabel} /> : null}
    />
  );
}
