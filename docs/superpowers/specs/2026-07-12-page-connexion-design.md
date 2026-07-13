# Page de connexion « Espace prestataire » — design validé

Date : 2026-07-12 — validé par l'utilisateur en brainstorming.

## Objectif

Intercaler une page de connexion/inscription entre la vitrine publique et le
back-office. Contexte Afrique de l'Ouest : l'identifiant est le **numéro
WhatsApp**, pas l'e-mail.

## Route et navigation

- Nouvelle page `/connexion` (`src/app/connexion/page.tsx`), hors du groupe
  `(back-office)` : pas de sidebar, pas d'assistant.
- Liens mis à jour vers `/connexion` :
  - « Se connecter » et « Espace prestataire » du `LandingHeader` ;
  - « Je suis un professionnel de beauté » de `ProSection`.
- Soumission d'un des deux formulaires → redirection `/tableau-de-bord`.
- ~~UI seule~~ **Mise à jour 2026-07-13 : vraie authentification** — comptes
  salons dans Postgres Supabase (mot de passe bcrypt, numéro WhatsApp unique
  normalisé `225…`), routes `POST /api/auth/inscription` et
  `/api/auth/connexion`, cookie de session httpOnly `zuri-salon` (7 j).
  Reste à faire : durcir la session (signature) et protéger les pages du
  back-office.
- **Mise à jour 2026-07-13 (bis) : OTP WhatsApp à l'inscription** —
  inscription en 2 étapes (formulaire → code à 6 chiffres) via
  `POST /api/auth/otp` ; codes hachés sha256, 10 min, 5 essais, usage
  unique. Envoi par modèle Authentication (`WHATSAPP_TEMPLATE_OTP`) ;
  le compte de test Meta ne permettant pas de créer ce modèle, repli
  dev : code affiché à l'écran (`codeDev`, jamais en production).

## Écran

> Révisions demandées par l'utilisateur pendant l'implémentation : la box
> centrée sur image de fond est remplacée par un **écran coupé en deux**,
> le **header vitrine** est ajouté en haut, et les moitiés sont inversées
> (contenu à gauche, image à droite).

- **Header vitrine** (`LandingHeader`, fixe, 76 px) en haut de la page ;
  son logo assure le retour à la vitrine (pas de logo posé sur l'image).
- En dessous, écran **fixe** (`h-dvh` + `pt-19`, pas de scroll de page),
  coupé en deux :
  - moitié gauche : contenu de connexion sur **fond blanc** ;
  - moitié droite : **diaporama automatique** (ajout utilisateur) de 3
    visuels plein cadre (`espacepresta.webp` + 2 photos Pexels) en fondu
    croisé toutes les 3,5 s, points de navigation cliquables, masqué sous `lg`.

## Le contenu de connexion (moitié gauche)

- Titre « Espace prestataire » + sous-titre qui change selon l'onglet.
- Onglets « Connexion │ Inscription » en pilules, l'actif en rose plein,
  bascule instantanée sans changement de page.
- **Connexion** : numéro WhatsApp (préfixe +225 dans le champ), mot de passe,
  bouton « Se connecter ».
- **Inscription** : nom du salon, numéro WhatsApp, localisation de la
  structure, mot de passe, bouton « Créer mon salon ».
- **« Localisation de la structure » avec autocomplétion** (ajout
  utilisateur) : suggestions
  de lieux de Côte d'Ivoire à la frappe via l'API Photon (OpenStreetMap,
  gratuite, sans clé) — débounce 300 ms, ≥ 3 caractères, bbox pays +
  filtre `countrycode=CI`, sélection = champ rempli, saisie libre en repli.
- Mobile : image masquée, formulaire pleine largeur (max 28 rem), écran
  toujours fixe, la colonne scrolle en interne si elle dépasse.

## Composants (`src/features/connexion/`)

| Composant | Rôle |
|-----------|------|
| `AuthScreen.tsx` | Écran fixe coupé en deux : contenu à gauche, image à droite ; porte l'état de l'onglet actif (client) |
| `AuthTabs.tsx` | Paire d'onglets Connexion/Inscription |
| `LoginForm.tsx` | Formulaire de connexion, redirection à la soumission |
| `AddressField.tsx` | Champ adresse avec autocomplétion Photon limitée à la Côte d'Ivoire |
| `AuthImageSlideshow.tsx` | Diaporama automatique en fondu des 3 visuels de la moitié droite |
| `SignupForm.tsx` | Formulaire d'inscription, redirection à la soumission |

Champs : les `FormField` existants sont pensés pour les modales sur fond de
contenu ; si leur rendu ne passe pas sur le verre posé sur photo, créer un
champ dédié dans la feature.

## Vérification

Playwright sur le dev server : desktop 1440×900 et mobile 390×844 — onglets,
bascule, redirections, liens vitrine, aucun débordement. Rendu montré à
l'utilisateur avant tout commit.
