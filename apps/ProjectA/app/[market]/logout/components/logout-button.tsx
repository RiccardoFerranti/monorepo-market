"use client";

import { useRouter } from "next/navigation";

import { SubmitButton } from "@/components/submit-button";

import { logout } from "../actions";


type TLogoutButtonProps = {
  label: string;
};

export default function LogoutButton({ label }: TLogoutButtonProps) {
  const router = useRouter();

  async function action() {
    await logout();
    // Re-fetch this route from the server with current auth state.
    router.refresh();
  }

  return (
    <form action={action}>
      <SubmitButton label={label} variant="outline" />
    </form>
  );
}
