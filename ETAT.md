# BAREK / LABS — état du chantier

**Dernière mise à jour : 2026-09-19** · commit de référence `a3f9861`

Ce fichier dit **où en est le projet**. `CLAUDE.md` dit **comment on travaille** — il
reste la règle, celui-ci n'est que l'état. Quand les deux se contredisent, `CLAUDE.md`
gagne.

**Qui le met à jour :** l'agent qui termine un chantier déplace la ligne
correspondante, dans le même commit que son travail. Elyes ajoute ce qu'il veut, où il
veut. Un fichier d'état qui ment est pire que pas de fichier d'état.

---

## 1. L'échéance qui commande tout

**Le lien du site part à des recruteurs lundi matin.**

Tout se juge à cette aune : un recruteur ouvre le site, clique trois pages, se fait une
opinion en deux minutes. On priorise ce qu'il verra, pas ce qui est intéressant.

---

## 2. Où en est le site

| | |
|---|---|
| Sociétés couvertes | **176** |
| Marchés | **14** |
| Idées publiées | **9** cartes × 3 langues, 9 rapports HTML |
| Dettes nettes renseignées | **57** sur 176 |
| Registre actions | **1 position ouverte** (UUUU), **0 clôturée** |
| Ouverture du registre | **2026.08.07** |

Tous ces compteurs sauf la dette nette sont **dérivés** via `src/lib/coverage.ts`
(règle 1.2). Ne jamais en taper un à la main.

---

## 3. Bloquants — ils demandent Elyes

- [ ] **La production affiche-t-elle des cours ou des tirets ?** En local, `vite
  preview` ne sert pas les routes `/api`, donc tout est en tiret : c'est normal. En
  production ça dépend des clés Vercel. Un terminal de recherche sans un seul chiffre
  ne se présente pas à un recruteur. **À vérifier en ouvrant bareklabs.com.**
- [ ] **`RESEND_API_KEY` et `CONTACT_TO`** absents en août. Sans eux, un recruteur qui
  écrit depuis le formulaire reçoit une erreur. Le pire scénario de lundi.

## 4. En cours

- [ ] **Import des trades Nordnet Sweden.** Les CSV sont extraits du compte via Claude
  in Chrome. Voir § 6 pour les cinq points à traiter — aucun n'est optionnel.
- [ ] **Liste des « trucs qui ne me plaisent pas »** — attendue d'Elyes. Les
  corrections déjà faites étaient des contradictions factuelles, pas des questions de
  goût.
- [ ] **Articles à ajouter** — attendus d'Elyes. S'ils existent en HTML l'intégration
  est rapide ; s'ils sont à écrire, c'est un autre calendrier.

## 5. Proposé, en attente d'accord

- [ ] **Retirer les deux numéros de version.** Le site affiche « TERMINAL DE RECHERCHE
  v0.4 » (`home.tagSuffix`) et « BUILD 0.5.0 / PRÊT POUR VERCEL » (`footer.build`).
  Deux numéros différents, et « prêt pour Vercel » sur un site déjà déployé est un
  reste de template. Ne pas retirer sans accord — règle 1.3.

---

## 6. Import Nordnet — les cinq points

Les positions sont écrites **à la main dans les trois dictionnaires**, sous `t.stocks` :
`open` et `closed`. Il n'y a **aucune connexion courtier automatique** — UUUU a été
recopiée le 7 août 2026. Le site n'a jamais lu d'API de courtier.

1. **Jamais de montants.** Règle § 7 : poids en **pourcentage**, performance en
   **pourcentage**. Jamais un montant, jamais un nombre de titres. Un P&L en couronnes
   divisé par la variation du cours reconstitue la taille du livre. Les CSV Nordnet
   sont pleins de SEK : ils servent à **calculer** des pourcentages, ils ne vont pas
   sur la page.
2. **Le poids de UUUU est à 100 %.** Dès qu'une deuxième position entre, l'arithmétique
   casse. Recalculer sur le livre combiné.
3. **Le registre ne dit pas de quel courtier vient une position.** Avec deux sources il
   le faut. Le `sourceNote` de `t.stocks` affirme aujourd'hui que les positions
   viennent d'IBKR : il devient faux au premier import Nordnet.
4. **Tout trade antérieur au 2026.08.07 porte un tiret** dans son champ `open`, comme
   UUUU. Ne jamais deviner une date d'ouverture.
5. **Deux tuiles de statistiques sont écrites en dur** — « TAUX DE RÉUSSITE » et
   « ESPÉRANCE MOYENNE », toutes deux à `—` avec le libellé « RIEN DE CLÔTURÉ ». Dès
   qu'il y a des trades clôturés, la valeur **et** le libellé deviennent faux. Les
   dériver depuis `t.stocks.closed`, comme `{tickers}` et `{ideas}`.

**Le gain :** les trades Nordnet clôturés transforment ces deux tirets en vrais
chiffres. Pour un recruteur, c'est la différence entre un registre vide et un
historique.

Le suffixe `.ST` est déjà câblé dans `src/data/valueChain.ts` — Suède, Nasdaq
Stockholm, SEK. Rien à construire pour les tickers suédois.

---

## 7. Backlog — hors échéance de lundi

- [ ] **Končar (ZSE: KOEI)** à ajouter au screener et aux Investment Ideas. Jamais
  commencé. Deux anomalies non résolues dans le S1 2026 : un résultat net de 171,4 M€
  pour un EBITDA de 173,4 M€ (élément non récurrent non identifié), et deux chiffres
  d'affaires en circulation (724,9 et 745 M€). Le semestriel est déposé sur `eho.zse.hr`.
  Ajouter au screener signifie écrire un dossier `Company` complet — le type exige des
  zones de prix et des scénarios pondérés, que la règle 4.3 interdit d'inventer. Le
  type prévoit `verdictTone: 'unrated'` pour ce cas.
- [ ] **Le zip `publier/`** — 11 rapports HTML + cartes. Jamais arrivé. Le site est à 9.
- [ ] **Secteurs MEMORY / SEMIS / DISTRIBUTION** à ajouter aux filtres Investment Ideas.
- [ ] **Série chaîne d'approvisionnement** dans sa propre section, pas mélangée aux 9.
- [ ] **Rapport n°14 Winbond en double** — comparer les deux versions avant d'en publier une.
- [ ] **Dette nette : 57 sur 176.** `scripts/netdebt.mjs` encode six pièges.

---

## 8. Qui peut faire quoi, et où

Le point qui a coûté le plus de temps : **toutes les sessions ne voient pas la même
chose.**

| | Session Claude Code **web** | Session Claude Code **terminal** (Mac) |
|---|---|---|
| Réseau sortant | Bloqué sauf liste courte | **Direct** |
| Lire un PDF, un article | Non — proxy 403 | **Oui** |
| WebSearch | Oui | Oui |
| Alpha Vantage, FMP | Oui (via connecteurs) | Oui |
| `barek-finance` (yfinance) | **Non** | **Oui** |
| `obsidian` (coffre iCloud) | **Non** | **Oui** |
| `brave-search` | **Non** | **Oui** |

Les serveurs MCP locaux sont des **processus sur le Mac** : un `server.py`, un serveur
filesystem sur iCloud. Une session cloud ne peut pas les joindre — ce n'est pas une
permission, c'est une machine différente.

**Conséquence pratique :** tout ce qui demande de *lire* un document externe ou
d'atteindre une place non américaine se fait **depuis le terminal**. Le reste — code,
build, tests, captures, commits — se fait indifféremment.

Rappel `CLAUDE.md` § 2 : l'agent Cowork produit les **rapports**, la session Claude
Code produit le **site**. Aucun des deux ne touche au domaine de l'autre.

---

## 9. Fait récemment

**`a3f9861` — trois chiffres que la page affirmait et contredisait**
- Trade Tracker : « 100 % CONSIGNÉ AVANT L'ENTRÉE, SANS EXCEPTION » remplacé par la
  date d'ouverture du registre. L'ancienne phrase était fausse à côté d'une position
  antérieure au registre.
- « 8 THÈSES » → 9, calculé.
- Tuile « 04 MODULES » → 3, calculée, et cesse de contredire l'en-tête juste au-dessus.

**Avant** — passe française sur Souk Signal et À propos ; légende du tableau Souk
Signal qui n'avait de couleur qu'en anglais ; pièges 5 et 6 de `netdebt.mjs` (repli sans
fond jusqu'en 2021, et fiabilité du fournisseur qui suit la taille du bilan).
