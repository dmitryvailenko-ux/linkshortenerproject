import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import {
  BarChart3,
  Link as LinkIcon,
  LayoutDashboard,
  Pencil,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { AuthDialog } from "@/components/auth-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";

const features = [
  {
    icon: LinkIcon,
    title: "Instant short links",
    description:
      "Paste a long URL and get a clean, shareable short link in a single step.",
  },
  {
    icon: Pencil,
    title: "Custom slugs",
    description:
      "Pick a memorable, branded slug so your links are easy to recognize and remember.",
  },
  {
    icon: BarChart3,
    title: "Click analytics",
    description:
      "See how often each link is opened so you know what content resonates.",
  },
  {
    icon: LayoutDashboard,
    title: "One dashboard",
    description:
      "View, edit and delete all of your links from a single, tidy place.",
  },
  {
    icon: Zap,
    title: "Fast redirects",
    description:
      "Visitors are sent to the destination quickly, with no extra steps in between.",
  },
  {
    icon: ShieldCheck,
    title: "Private and secure",
    description:
      "Your account is protected with secure sign in, and only you can manage your links.",
  },
];

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
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <LinkIcon className="size-5" />
          Link Shortener
        </span>
        <AuthDialog className="" label="Sign in" variant="ghost" />
      </header>

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-20 pt-16 text-center sm:pt-24">
          <Badge variant="secondary">Free to get started</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Short links. Big insight.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Turn long, messy URLs into short links that are easy to share, then
            manage and track all of them from one simple dashboard.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <AuthDialog
              className="h-10 px-6"
              initialMode="sign-up"
              label="Get started"
            />
            <AuthDialog
              className="h-10 px-6"
              label="Sign in"
              variant="outline"
            />
          </div>
        </section>

        <Separator />

        <section
          className="mx-auto w-full max-w-6xl px-6 py-20"
          id="features"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Everything you need to share links with confidence
            </h2>
            <p className="mt-3 text-muted-foreground">
              A focused toolkit for creating, organizing and understanding your
              links.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="mb-2 size-6 text-primary" />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Ready to shorten your first link?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Create an account in seconds and start sharing.
          </p>
          <AuthDialog
            className="mt-8 h-10 px-6"
            initialMode="sign-up"
            label="Create your free account"
          />
        </section>
      </main>

      <footer className="border-t px-6 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Link Shortener
      </footer>
    </div>
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
