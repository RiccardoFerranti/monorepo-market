import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div className="p-8 bg-background text-foreground min-h-screen">
      <main className="flex flex-col gap-4">
        <Button
          appName="ProjectB"
          className="bg-primary text-primary-foreground"
        >
          Open alert
        </Button>
      </main>
    </div>
  );
}
