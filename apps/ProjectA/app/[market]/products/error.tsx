"use client";

import { Button, Card } from "@repo/ui";

type TErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: TErrorProps) {
  return (
    <div className="mx-auto max-w-4xl py-12">
      <Card variant="soft">
        <Card.Content className="text-center">
          <h2 className="text-lg font-semibold">Failed to load products</h2>

          <p className="mt-2 text-sm text-card-foreground/70">
            {error.message || "Something went wrong while fetching products"}
          </p>

          <Button
            onClick={reset}
            className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
          >
            Try again
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
}
