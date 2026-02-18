import { Button } from "@repo/ui/button";
import { BRANDS } from "@repo/constants";

export default function Home() {
  console.log("BRANDS", BRANDS);
  return (
    <div className="p-8 bg-background text-foreground min-h-screen">
      <main className="flex flex-col gap-4">
        <Button
          appName="ProjectA"
          className="bg-primary text-primary-foreground"
        >
          Open alert
        </Button>
      </main>
    </div>
  );
}
