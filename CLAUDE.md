@AGENTS.md

# Projet ZURI

## Stack
- Next.js 16.2.10 (App Router, Turbopack)
- TypeScript uniquement — pas de fichiers JavaScript
- TailwindCSS v4 (via `@tailwindcss/postcss`, config dans `postcss.config.mjs`)
- ESLint (`eslint.config.mjs`)

## Commandes
- `npm run dev` — serveur de développement (http://localhost:3000)
- `npm run build` — build de production
- `npm run lint` — lint

## Git / GitHub
- Dépôt distant : https://github.com/contactzuripro-ctrl/ZURI (branche `main`)
- Nom du package npm : `zuri` (minuscules imposées par npm, le dossier reste `ZURI`)
- Ne jamais commiter de tokens ou secrets dans ce dépôt

## Règles de travail (obligatoires)
1. **Documenter chaque feature** : avant/pendant chaque feature, ajouter une entrée dans le « Journal des features » ci-dessous (quoi, où, quels composants).
2. **Découper en composants** : jamais de page monolithique. Chaque bloc visuel ou logique réutilisable = un composant dans son propre fichier.
3. **Nommage lisible par un humain** :
   - Composants : `PascalCase` (ex. `ProductCard.tsx`), un composant par fichier, le fichier porte le nom du composant.
   - Fonctions / variables : `camelCase`, noms explicites (`fetchUserOrders`, pas `getData`).
   - Dossiers : `kebab-case` ou nom de domaine clair (`user-profile/`, `checkout/`).
   - Types partagés : dans `src/types/`, interfaces en `PascalCase`.
4. **Code repris par un humain** : props typées explicitement, pas de logique cachée, commentaire uniquement quand une contrainte n'est pas évidente dans le code.

## Structure des dossiers
```
src/
  app/                 # Routes Next.js (App Router) — uniquement pages/layouts
  components/
    ui/                # Composants génériques réutilisables (Button, Card, Input…)
    layout/            # Header, Footer, Sidebar…
  features/            # Un dossier par feature métier (ses composants + sa logique)
  hooks/               # Hooks React personnalisés (useXxx.ts)
  lib/                 # Fonctions utilitaires, clients API
  types/               # Types et interfaces TypeScript partagés
```
Règle : une feature vit dans `src/features/<nom-feature>/`. Les pages dans `src/app/` ne font qu'assembler les composants des features.

## Journal des features
> Chaque feature ajoutée au projet est consignée ici : nom, date, description, fichiers/composants créés.

| Date | Feature | Description | Fichiers principaux |
|------|---------|-------------|---------------------|
| 2026-07-10 | Initialisation | Projet Next.js + TypeScript + Tailwind, structure de dossiers, conventions | `src/app/`, `CLAUDE.md` |
