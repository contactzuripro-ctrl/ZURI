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
| 2026-07-10 | Layout dashboard | Sidebar prune fixe (logo Zuri, 9 liens + Paramètres, lien actif surligné), en-tête de page, palette Zuri (prune/crème/or) dans Tailwind | `src/components/layout/` (`Sidebar`, `SidebarLink`, `navigation`, `PageHeader`), `src/app/globals.css`, `src/app/layout.tsx` |
| 2026-07-10 | Composants UI | Carte, carte de statistique, badge de statut, tableau générique, bouton principal | `src/components/ui/` (`Card`, `StatCard`, `StatusBadge`, `DataTable`, `PrimaryButton`) |
| 2026-07-10 | 01 Tableau de bord | Recette du jour, RDV du jour, nouvelles clientes, alertes stock + liste des prochains RDV | `src/app/page.tsx`, `src/features/tableau-de-bord/` |
| 2026-07-10 | 02 Agenda | Planning du jour en colonnes par employée, cartes de RDV triées par heure | `src/app/agenda/`, `src/features/agenda/` |
| 2026-07-10 | 03 Clients | Liste des clientes : téléphone, prestation favorite, visites, total dépensé, dernière visite | `src/app/clients/`, `src/features/clients/` |
| 2026-07-10 | 04 Paiements | 3 indicateurs (encaissé, acomptes, transactions) + tableau des transactions Orange Money / Wave / Espèces avec statuts | `src/app/paiements/`, `src/features/paiements/` |
| 2026-07-10 | 05 Comptabilité | CA, dépenses, bénéfice net du mois + dernières dépenses + bouton export | `src/app/comptabilite/`, `src/features/comptabilite/` |
| 2026-07-10 | 06 Prestations | Catalogue en grille : catégorie, prix, durée, promotions | `src/app/prestations/`, `src/features/prestations/` |
| 2026-07-10 | 07 Employés | Cartes par employée : objectif mensuel, barre de progression, commission calculée | `src/app/employes/`, `src/features/employes/` |
| 2026-07-10 | 08 Stock | Inventaire avec seuils d'alerte et statuts En stock / À commander / Rupture | `src/app/stock/`, `src/features/stock/` |
| 2026-07-10 | 09 Marketing | Indicateurs fidélité + tableau des campagnes SMS / WhatsApp (envois, taux de réponse) | `src/app/marketing/`, `src/features/marketing/` |
| 2026-07-10 | Paramètres | Écran d'infos du salon (nom, devise, moyens de paiement) — à compléter | `src/app/parametres/` |
| 2026-07-10 | Design Neumorphism | Refonte du contenu en soft UI : surfaces couleur du fond, relief par double ombre (`shadow-neu`, `shadow-neu-sm`), éléments actifs/creusés en ombre interne (`shadow-neu-inset`, `shadow-neu-inset-sm`) — badges, boutons (enfoncés au clic), barres de progression, cartes RDV | `src/app/globals.css` (tokens d'ombres), `src/components/ui/`, features |
| 2026-07-10 | Menu Material + Organic | Sidebar façon navigation drawer M3 (remplace un essai glassmorphism supprimé) : surface prune unie avec élévation, item actif = pilule pleine or, survol = state layer `bg-white/10`. Touche Organic : bord droit très arrondi (`rounded-r-[2.5rem]`), logo et pilules aux coins asymétriques (border-radius irréguliers « galet »), 2 blobs décoratifs en fond | `src/components/layout/` (`Sidebar`, `SidebarLink`), `src/app/layout.tsx` |

| 2026-07-10 | Bouton ouvrir/fermer le menu | Bouton neumorphique dans l'en-tête de chaque page qui replie/déplie la sidebar (animation 300 ms). État partagé via contexte React (`SidebarProvider` dans le layout racine, hook `useSidebar`) | `src/components/layout/` (`SidebarContext`, `SidebarToggle`, `PageHeader`, `Sidebar`), `src/app/layout.tsx` |

| 2026-07-10 | Organic Design du contenu | Touche organique sur le contenu (en plus du neumorphism) : cartes, boutons, bouton de menu, cartes RDV et avatars en coins asymétriques « galet » ; 3 blobs or/prune très discrets fixés derrière le contenu (`OrganicBackdrop`) | `src/components/ui/` (`Card`, `PrimaryButton`), `src/components/layout/` (`OrganicBackdrop`, `SidebarToggle`), features agenda/employés |

| 2026-07-10 | Vrai calendrier Agenda | Remplace les simples colonnes par un calendrier complet : vue **Mois** (grille lun→dim, pastilles de RDV colorées par employée, « +n autres », jour courant surligné or, clic sur un jour → sa journée) et vue **Jour** (grille horaire 08:00–19:00, une colonne par employée, blocs positionnés selon l'horaire). Navigation ‹ › + « Aujourd'hui » + bascule Jour/Mois. Le type `Appointment` a maintenant un champ `date` | `src/features/agenda/` (`Calendar`, `CalendarHeader`, `MonthView`, `DayView`, `data.ts`), `src/lib/calendar.ts`, `src/types/index.ts` — supprime `DailyPlanning`, `AppointmentCard` |

| 2026-07-10 | Refonte Minimalisme | Le contenu passe du Neumorphism au minimalisme façon Apple : fond blanc, cartes gris très clair sans ombre, badges = point coloré + texte, tableaux à fines lignes, typo mise en avant (grandes valeurs, libellés discrets), espacements élargis. Suppression des blobs (`OrganicBackdrop`) et formes « galet » du contenu. **Le menu garde son style Material + Organic** (validé par l'utilisateur) | `src/app/globals.css` (tokens neutres `surface`/`hairline`, suppression ombres neu), `src/components/ui/`, pages et features |
| 2026-07-10 | Barre de recherche animée | Dans l'en-tête de chaque page : fin anneau statique en dégradé prune→or, icône loupe en pastille or, halo doré + élargissement (w-64 → w-96) au focus. Tant que le champ est vide, les invites se tapent **à la machine à écrire** (lettre par lettre, pause, effacement, invite suivante) avec curseur doré clignotant — hook `useTypewriter` dans le composant. Une version très voyante (anneau défilant + halo pulsant) a été jugée trop voyante et retirée. Recherche non branchée (UI seule) | `src/components/layout/SearchBar.tsx`, `PageHeader.tsx`, utilitaires `search-ring`/`animate-cursor-blink` dans `globals.css` |

| 2026-07-10 | Mode nuit | Bouton « Mode nuit / Mode jour » (lune/soleil) en bas du menu, au-dessus de Paramètres. Bascule la classe `dark` sur `<html>` : toutes les couleurs neutres du contenu sont des variables CSS redéfinies dans le bloc `.dark` de `globals.css` (fond `#131315`, cartes `#1d1d20`, textes inversés, statuts éclaircis). Choix persisté dans `localStorage` (`zuri-theme`) et réappliqué avant le premier rendu par un script inline dans `<head>` (pas de flash). Source de vérité = classe du `<html>` lue via `useSyncExternalStore` + MutationObserver | `src/components/layout/ThemeToggle.tsx`, `Sidebar.tsx`, `src/app/layout.tsx`, `globals.css` (tokens `page`/`surface`/`elevated`/`hairline`) |

| 2026-07-10 | Accent rose poudré | Le doré est remplacé par du rose poudré (#E39BB1) partout : pilule active du menu, logo, pastille et curseur de la barre de recherche, dégradé de l'anneau, couleur d'Awa dans le calendrier. Le token est renommé `accent-400/500` : pour changer de couleur d'accent, ne modifier que ces 2 variables dans `globals.css` | `src/app/globals.css`, `Sidebar`, `SidebarLink`, `SearchBar`, `features/agenda/data.ts` |

### Notes techniques
- Toutes les données des écrans sont des **données de démonstration** dans `src/features/<feature>/data.ts` — à remplacer par une vraie API/BDD.
- Les types métier partagés (Payment, Client, Appointment, Service, Employee, StockItem, Campaign…) sont dans `src/types/index.ts`.
- Formatage des montants CFA / dates / pourcentages : `src/lib/format.ts`.
- Icônes : `lucide-react`. Les icônes étant des fonctions, tout composant qui les reçoit en props doit être un composant client (`"use client"` sur `Sidebar`).
