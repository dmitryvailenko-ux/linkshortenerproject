---
description: Authentication rules for this app. Supabase is the only auth provider; /dashboard is protected; sign in/sign up use modals.
applyTo: "**"
---

# Authentication

## Provider

- All authentication is handled by **Supabase** (`@supabase/ssr`, `@supabase/supabase-js`).
- **No other auth methods may be used.** Do not add or reference Clerk, NextAuth/Auth.js, Auth0, Firebase Auth, custom JWT/session/cookie auth, or any other provider or library.
- Use the existing helpers in `lib/supabase/` (`server.ts` for Server Components/Actions/Route Handlers, `client.ts` for Client Components, `proxy.ts` for session refresh). Auth server actions live in `app/actions.ts`.
- Verify users on the server with `supabase.auth.getUser()`, never `getSession()` alone, and never trust client-side auth state for access control.

## Route protection

- `/dashboard` (and any sub-route) is **protected**. A user who is not logged in must not be able to access it; redirect them to `/`.
- A logged-in user who visits the homepage `/` must be **redirected to `/dashboard`**.
- Enforce both rules on the server in the Next.js proxy (`proxy.ts` -> `lib/supabase/proxy.ts`, which replaces `middleware.ts` in this Next.js version). Pages may additionally re-check with `getUser()` as defense in depth.
- When redirecting in the proxy, copy the refreshed Supabase cookies onto the redirect response so the session is not lost.

## Sign in / sign up UI

- Sign in and sign up must **always open in a modal**, never as a full-page form or separate page. Switching between sign in and sign up should happen inside the same modal.
- Modals call Supabase-backed server actions (`signIn`, `signUp`, `signOut` in `app/actions.ts`).
- Routes such as `/login` must not render a standalone auth form; redirect to `/` (logged out) or `/dashboard` (logged in).
- Successful sign in/sign up redirects to `/dashboard`; sign out redirects to `/`.

## Next.js note

This project uses a Next.js version with breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing routing, proxy, or server action code.
