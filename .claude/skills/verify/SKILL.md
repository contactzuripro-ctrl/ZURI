---
name: verify
description: Vérifier un changement de ZURI dans le vrai navigateur (Playwright sur le dev server)
---

# Vérifier ZURI au navigateur

## Lancer / atteindre l'app
- Dev server souvent déjà lancé : `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` → 200.
- Sinon : `npm run dev` (Next.js + Turbopack, port 3000).

## Piloter avec Playwright
- `playwright` n'est PAS dans les dépendances du projet. Installer `playwright-core` dans le scratchpad (`npm i playwright-core`) et pointer sur le Chromium déjà en cache :
  `executablePath: "/Users/kuti/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell"`
  (adapter le numéro `chromium_headless_shell-*` si le cache change : `ls ~/Library/Caches/ms-playwright`).
- Viewports de référence : mobile 390×844, desktop 1440×900.

## Flows utiles
- Agenda : `/agenda` — bascule Jour/Mois (desktop seulement ; sur mobile < 640 px il n'y a que la vue Jour en liste), filtre par employée (pastilles photo), navigation ‹ › / « Aujourd'hui ».
- Vérifier l'absence de débordement horizontal : `document.documentElement.scrollWidth > clientWidth`.

## Pièges
- `page.click('button:has-text("jour")')` matche aussi « Aujourd'hui » (sous-chaîne). Utiliser `page.locator("button", { hasText: /^jour$/ })`.
- L'animation de page (fade-up ~350 ms) : attendre ~600 ms après `networkidle` avant de mesurer visibilité/positions.
- Les données de démo sont datées de juillet 2026 ; « Aujourd'hui » (2026-07-10) est un vendredi chargé — bon jour pour tester.
