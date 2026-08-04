# BAREK LABS

Site institutionnel de **BAREK LABS** — laboratoire indépendant finance & technologie.
Research desk, signal engine (Souk Signal) et trade ledger public.

## Stack

- **React 19 + TypeScript** (Vite 7)
- **Tailwind CSS 3** — design system custom (dark, mono/serif/grotesk)
- **react-router 7** — 10 routes
- **i18n trilingue** EN / FR / AR (RTL complet) + thème dark / anthracite
- Prêt pour **Vercel** (`vercel.json` inclus, rewrites SPA configurés)

## Routes

| Route | Page |
|---|---|
| `/` | Accueil (BAREK LABS) |
| `/analysis` | Analysis & Research |
| `/analysis/insights` | Insights |
| `/analysis/ideas` | Investment Ideas (filtre sectoriel) |
| `/analysis/ai-value-chain` | AI Value Chain — matrice interactive 10 étapes |
| `/analysis/space-economy` | New Space Economy — note interactive (SPCX, RKLB, ASTS) |
| `/souk-signal` | Souk Signal |
| `/trade-tracker` | Trade Tracker |
| `/trade-tracker/stocks` | Stocks |
| `/trade-tracker/crypto` | Crypto |
| `/about` | About |

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production → dist/
```

## Déploiement Vercel

1. Importer le repo sur [vercel.com/new](https://vercel.com/new)
2. Framework détecté automatiquement : **Vite** (aucun réglage requis)
3. Deploy — les rewrites SPA sont déjà dans `vercel.json`

## Notes

- `public/logo.svg` — logo officiel BAREK LABS (blanc sur transparent)
- Les prix affichés sont simulés côté client (démo) ; brancher les flux réels dans `src/components/lab.tsx` (`useLivePrice`, `MarketCanvas`) et les ledgers `src/pages/Stocks.tsx` / `Crypto.tsx`
- Architecture prévue pour devenir transactionnelle : ledgers, sizing et audit trail déjà modélisés dans les types et composants
