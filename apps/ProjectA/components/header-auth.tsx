import type { TLocale } from "@repo/types";
import { paths } from "@repo/constants";
import type { THeaderLink, THeaderProps } from "@repo/ui/header";
import { isLoggedIn } from "@/utils/is-logged-in";
import LogoutButton from "@/app/[market]/logout/components/logout-button";
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
