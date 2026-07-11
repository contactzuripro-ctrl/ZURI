# Assistant flottant (cercle Lottie + modale) — design

Date : 2026-07-11 · Statut : validé par l'utilisateur

## Besoin

Un bouton flottant circulaire en bas à droite, visible sur **toutes les pages**,
qui affiche l'animation Lottie fournie par l'utilisateur (`Tm4MbR2aOb.json`,
700×700, 25 Ko) à l'intérieur d'un **cercle blanc**, et qui ouvre une **modale
« Assistant Zuri »** au clic (UI seule : message d'accueil, le vrai
chat/aide viendra plus tard).

## Décisions validées

- Contenu de la modale : **assistant / aide** (animation en grand + message d'accueil).
- Placement : **toutes les pages** (monté dans le layout racine).
- Animation : **boucle permanente** dans le cercle.
- Lecteur : **`lottie-react`** (le fichier est du JSON Lottie classique ;
  `@lottiefiles/dotlottie-react` jugé surdimensionné).

## Architecture

Nouvelle feature `src/features/assistant/` :

- `animation.json` — le fichier `Tm4MbR2aOb.json` déplacé tel quel.
- `AssistantLauncher.tsx` (`"use client"`) — cercle blanc fixe
  (`fixed bottom-6 right-6`, ~72 px, ombre douce, hover : léger zoom,
  active : enfoncement), Lottie en boucle à l'intérieur, `aria-label`.
  Au clic → ouvre la modale. La modale réutilise le composant `Modal`
  existant (verre renforcé, portail vers `<body>`, Échap/voile/✕) avec
  l'animation en grand et un court texte d'accueil.

Intégration : `<AssistantLauncher />` monté une fois dans
`src/app/layout.tsx` (dans `<body>`, hors du `<main>`).

Z-index : au-dessus du contenu et des en-têtes (z-40), sous le tiroir
mobile (z-45) et le voile de modale (z-50) → `z-[44]`.

Modes jour/nuit : le cercle reste blanc (demande explicite), la modale
hérite du thème via `Modal`.

## Vérification

Build + navigateur (Playwright) : cercle visible et animé sur plusieurs
pages, ouverture/fermeture de la modale (clic, Échap, voile), mobile
390×844 sans débordement, modes jour et nuit. Entrée au Journal des
features de `CLAUDE.md`.
