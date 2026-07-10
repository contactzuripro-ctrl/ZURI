@AGENTS.md

# Projet ZURI

## Stack
- Next.js 16.2.10 (App Router, Turbopack)
- TypeScript uniquement — pas de fichiers JavaScript
- TailwindCSS v4 (via `@tailwindcss/postcss`, config dans `postcss.config.mjs`)
- ESLint (`eslint.config.mjs`)

## Structure
- Code source dans `src/` — pages dans `src/app/`
- Page d'accueil : `src/app/page.tsx`
- Styles globaux Tailwind : `src/app/globals.css`
- Alias d'import : `@/*` → `src/*`

## Commandes
- `npm run dev` — serveur de développement (http://localhost:3000)
- `npm run build` — build de production
- `npm run lint` — lint

## Git / GitHub
- Dépôt distant : https://github.com/contactzuripro-ctrl/ZURI (branche `main`)
- Nom du package npm : `zuri` (minuscules imposées par npm, le dossier reste `ZURI`)
- Ne jamais commiter de tokens ou secrets dans ce dépôt
