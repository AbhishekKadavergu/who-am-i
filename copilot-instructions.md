# Copilot Instructions: Abhishek Kadavergu Portfolio

**Last Updated:** Jan 9, 2026 | **Status:** Phase 1 & 2 complete

---

## Project Overview

**Portfolio website** with React 19, TypeScript, Vite, Tailwind CSS. Dark/light theme, searchable projects, contact form with validation.

**Stack:** React 19 | TypeScript 5.9 | Vite 6 | Tailwind 4 | Serverless API (SendGrid)

---

## Key Patterns

### React & Hooks

- Functional components only
- Custom hooks in `src/hooks/`: `useTheme()`, `useDebounce()`, `useCarousel()`
- `useEffect` with proper dependencies
- No prop drilling — use Context

### TypeScript

- Strict mode enabled, no `any` types
- Explicit return types on functions
- Use `type` for aliases, `interface` for objects
- Always type event handlers: `React.ChangeEvent<HTMLInputElement>`

### File Organization

```
src/
├── components/     # React components (one per file)
├── hooks/          # Custom hooks
├── context/        # React Context (ThemeContext.tsx, ThemeProvider.tsx)
├── utils/          # Helper functions (validation.ts, theme.ts)
├── constants/      # UI_CONSTANTS
├── data/           # Static data (projects.ts, skills.ts)
└── App.tsx         # Main app
```

### Naming

- **Components:** PascalCase
- **Files:** PascalCase for components, camelCase for utilities
- **Functions:** camelCase
- **Constants:** ALL_CAPS
- **Booleans:** prefix with `is` or `has`

### Styling

- Tailwind classes for layout/spacing
- CSS variables for theme colors: `bg-[var(--brand-bg)]`
- Dark mode: `.dark` class on `documentElement`
- Custom colors in `index.css`

---

---

## Code Quality Rules

1. **No `any` types** — Use `unknown` if needed, then narrow via type guards
2. **Strict TypeScript** — Trust the compiler
3. **Meaningful names** — `isLoading`, `handleSubmit`, not `x`, `fn`
4. **Comments only for why** — Code should explain what it does
5. **Keep it simple** — Avoid over-abstraction; YAGNI (You Aren't Gonna Need It)
6. **Test before shipping** — Run `npm run lint` and `npm run build` locally
7. **One component per file** — Easier to debug, Fast Refresh friendly

---

## Running the Project

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Vite build
npm run lint      # ESLint check
```

Environment variables in `.env.local`:

```
SENDGRID_API_KEY=...
CONTACT_TO_EMAIL=...
```

---

## Questions?

- File structure: See directories in `src/`
- TypeScript: Check `tsconfig.json` (strict mode)
- Styling: Check `src/index.css` + `tailwind.config.ts`
- Components: Each has JSDoc comment explaining purpose

Keep code simple, ship incrementally, test often.
