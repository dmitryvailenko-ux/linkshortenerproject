---
description: UI rules for this app. All UI elements must use shadcn/ui components; no custom components.
applyTo: "**/*.{ts,tsx}"
---

# UI components

## shadcn/ui only

- **ALL UI elements in this app use shadcn/ui.** Do **not** create custom UI components, and do not hand-roll buttons, inputs, dialogs, cards, menus, etc.
- **ALWAYS use shadcn/ui components** for anything user-facing (forms, modals, buttons, inputs, labels, cards, dropdowns, toasts, tables, and so on).
- If a needed component is not yet in `components/ui/`, add it with the shadcn CLI (`npx shadcn@latest add <component>`) instead of writing it yourself. Configuration lives in `components.json`.
- Do not modify the generated files in `components/ui/` to build custom variants; compose existing shadcn components and style them with Tailwind utility classes at the usage site.
- Do not introduce other UI libraries (Material UI, Chakra, Ant Design, Mantine, Headless UI, etc.) or raw styled HTML elements as replacements for shadcn components.
- Page-level layout using plain semantic HTML (`div`, `main`, `section`, headings, text) is fine; interactive and visual UI elements must come from shadcn/ui.

## Related

- Sign in / sign up modals must use the shadcn `Dialog` component (see [auth.instructions.md](auth.instructions.md)).
