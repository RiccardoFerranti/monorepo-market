import { Button, TVariant } from "@repo/ui";
import { useFormStatus } from "react-dom";

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
