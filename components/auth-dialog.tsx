"use client";

import { useActionState, useState } from "react";
import { signIn, signUp } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "sign-in" | "sign-up";

const copy = {
  "sign-in": {
    title: "Sign in",
    description: "Use your account to continue.",
    submit: "Sign in",
    switchPrompt: "No account yet?",
    switchLabel: "Sign up",
  },
  "sign-up": {
    title: "Create an account",
    description: "Sign up with your email and a password.",
    submit: "Sign up",
    switchPrompt: "Already have an account?",
    switchLabel: "Sign in",
  },
} as const;

function AuthForm({
  mode,
  onSwitch,
}: {
  mode: Mode;
  onSwitch: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    mode === "sign-in" ? signIn : signUp,
    { error: null },
  );
  const text = copy[mode];

  return (
    <>
      <DialogHeader>
        <DialogTitle>{text.title}</DialogTitle>
        <DialogDescription>{text.description}</DialogDescription>
      </DialogHeader>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="auth-email">Email</Label>
          <Input
            autoComplete="email"
            id="auth-email"
            name="email"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="auth-password">Password</Label>
          <Input
            autoComplete={
              mode === "sign-in" ? "current-password" : "new-password"
            }
            id="auth-password"
            name="password"
            required
            type="password"
          />
        </div>
        {state.error ? (
          <p
            aria-live="polite"
            className="text-sm text-destructive"
            role="alert"
          >
            {state.error}
          </p>
        ) : null}
        <Button className="w-full" disabled={pending} type="submit">
          {text.submit}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        {text.switchPrompt}{" "}
        <Button
          className="h-auto p-0"
          onClick={onSwitch}
          type="button"
          variant="link"
        >
          {text.switchLabel}
        </Button>
      </p>
    </>
  );
}

export function AuthDialog({
  className = "mt-8 w-fit",
  initialMode = "sign-in",
  label = "Sign in",
  variant = "default",
}: {
  className?: string;
  initialMode?: Mode;
  label?: string;
  variant?: "default" | "outline" | "ghost";
}) {
  const [mode, setMode] = useState<Mode>(initialMode);

  return (
    <Dialog>
      <DialogTrigger render={<Button className={className} variant={variant} />}>
        {label}
      </DialogTrigger>
      <DialogContent>
        <AuthForm
          key={mode}
          mode={mode}
          onSwitch={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
        />
      </DialogContent>
    </Dialog>
  );
}
