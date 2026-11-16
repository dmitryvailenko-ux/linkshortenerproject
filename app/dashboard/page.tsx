import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { signOut } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

async function DashboardContent() {
  // Supabase reads Date.now() when validating the session; render at request time.
  await connection();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="outline">
            Sign out
          </Button>
        </form>
      </header>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <p className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">Loading...</p>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
