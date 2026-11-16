import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { AuthDialog } from "@/components/auth-dialog";
import { createClient } from "@/lib/supabase/server";

async function Home() {
  await connection();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Link Shortener
      </p>
      <h1 className="max-w-xl text-4xl font-semibold tracking-tight">
        Your links, in one place.
      </h1>
      <p className="mt-4 max-w-lg text-muted-foreground">
        Sign in to view and manage your links.
      </p>
      <AuthDialog />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <p className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">Loading...</p>
      }
    >
      <Home />
    </Suspense>
  );
}
