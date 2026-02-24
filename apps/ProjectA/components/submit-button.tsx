import { useFormStatus } from "react-dom";

import { Button, type TVariant } from "@repo/ui";

type TSubmitButtonProps = {
  label: string;
  className?: string;
  variant: TVariant;
};

export function SubmitButton({ label, className, variant }: TSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className={className} variant={variant}>
      {pending ? "…" : label}
    </Button>
  );
}
