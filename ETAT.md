# BAREK / LABS — état du chantier

**Dernière mise à jour : 2026-09-19** · commit de référence `eba3927`

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
| Registre actions | **12 positions ouvertes**, **21 clôturées** (18 dans les compteurs) |
| Registre crypto | **2 positions ouvertes** (TAO, ETH), courtier Binance |
| Allocation du livre | **actions 19,03 %** · **crypto 1,84 %** · **liquidités 79,14 %** |
| Courtiers au registre | **IBKR** et **Nordnet**, provenance affichée par ligne |
| Poids des positions ouvertes | publiés par ligne sur le livre entier, liquidités comprises |
| Taux de réussite | **38,9 %** sur 18 transactions clôturées |
| Performance moyenne | **+44,4 %** par transaction clôturée |
| Performance pondérée par le capital | **+111,8 %** en devise locale, **+128,5 %** en SEK nette de frais |
| Ouverture du registre | **2026.08.07** |

Tous ces compteurs sauf la dette nette sont **dérivés** : la couverture via
`src/lib/coverage.ts`, les statistiques du registre via `src/lib/ledger.ts`
(règle 1.2). Ne jamais en taper un à la main.

Les trois statistiques se recalculent depuis `t.stocks.closed` filtré sur `inStats`.
Elles reproduisent la réconciliation de la source à l'arrondi près : la pondérée sort à
**111,83** parce que `capitalSharePct` est publié à deux décimales, contre 111,85
calculé sur les parts exactes. Le site publie ce qu'il sait recalculer.

---

## 3. Bloquants — ils demandent Elyes

- [x] **La production affiche de vrais cours.** Vérifié le 2026-09-19 depuis le
  terminal : `/api/quotes` renvoie AAPL 336.13, UUUU 11.70, NVDA 222.27, et sert aussi
  Stockholm en SEK (MYCR.ST 320, ERIC-B.ST 99.98). `/api/news` est alimenté. Les clés
  Alpha Vantage sont en place. En local `vite preview` ne sert pas `/api`, donc tout
  est en tiret : c'est normal et ce n'est pas un symptôme.
- [ ] **`RESEND_API_KEY` et `CONTACT_TO` sont toujours absents — confirmé en
  production.** Un POST valide sur `/api/contact` (preuve de travail résolue, tous les
  filtres anti-spam franchis) répond `503 not_configured` : aucun mail n'est parti.
  La page affiche un message honnête plutôt qu'une fausse coche verte, mais **aucune
  adresse de repli n'est proposée** — un recruteur qui écrit lundi tombe sur un
  cul-de-sac. **Demande Elyes :** créer les deux variables dans Vercel (Settings →
  Environment Variables) puis redéployer. `CONTACT_FROM` est optionnel.
- [ ] **Proposer une adresse de repli** sur le formulaire tant que Resend n'est pas
  branché. Non fait : publier une adresse en clair attire le spam que la preuve de
  travail existe précisément pour arrêter. À trancher par Elyes.

## 4. En cours

- [x] **Import des trades Nordnet Sweden — fait.** 32 lignes intégrées dans les trois
  dictionnaires depuis `nordnet_registre_pourcentages.json`. Le fichier source reste
  **hors du dépôt** (dépôt public) et n'a jamais été copié ni committé. Voir § 6 pour
  ce qui a été décidé sur chacun des cinq points.
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

## 6. Import Nordnet — fait, et ce qui a été décidé

Source unique : `nordnet_registre_pourcentages.json`, lu sur place dans `~/Downloads`.
**Ni le JSON ni aucun CSV Nordnet n'est entré dans le dépôt** — il est public.

32 lignes intégrées à la main dans les trois dictionnaires, sous `t.stocks` : **11
positions ouvertes** Nordnet plus la ligne UUUU / IBKR déjà présente, et **21
clôturées**. Il n'y a toujours **aucune connexion courtier automatique**.

1. **Jamais de montants — tenu.** Seuls des prix unitaires et des pourcentages sont
   publiés. Aucun montant, aucun nombre de titres, aucune valeur de portefeuille, ni
   dans le code, ni dans un commit, ni dans un log.
2. **Poids : tiret sur les douze lignes, et la raison est écrite sur la page.** Un poids
   n'a de sens que sur le livre combiné, et le calculer exige le rapport entre les deux
   livres — donc la valeur totale du compte Nordnet. Le fichier n'en contient aucune :
   `weightPctNordnetOnly` somme à 100 % **à l'intérieur de Nordnet seulement**, et
   aucun champ ne porte de montant. Authentifier IBKR n'y change rien : cela donne la
   valeur de la ligne UUUU, pas ce à quoi la comparer. Décision d'Elyes : tiret + raison
   (règle 1.1), plutôt qu'un poids interne faux à côté d'une ligne venue de l'autre
   courtier. **Rouvrir ce point demande la valeur totale du livre Nordnet.**
3. **Provenance : champ `broker` sur chaque ligne, affiché en colonne.** `sourceNote`
   corrigé dans les trois langues : il nommait IBKR seul. EFR (Nordnet) et UUUU (IBKR)
   sont la même société et restent **deux lignes distinctes** sous le ticker UUUU,
   chacune avec son prix d'entrée et sa performance. Aucun prix de revient moyen.
4. **`open` = tiret sur les 32 lignes.** Toutes antérieures au 2026.08.07. Aucune date
   d'ouverture devinée.
5. **Tuiles dérivées, libellé « RIEN DE CLÔTURÉ » retiré.** `src/lib/ledger.ts` calcule
   depuis `t.stocks.closed` filtré sur `inStats`, jamais en dur (règle 1.2) :
   **38,9 %** de réussite, **+44,4 %** de performance moyenne, **+111,8 %** pondérée par
   le capital (**+128,5 %** en SEK nette de frais). La page passe de 4 à 5 tuiles ;
   aucune n'a été retirée (règle 1.3).

**Autres points traités.** Les trois fonds sont listés et portent le badge « HORS
COMPTEURS » : un fonds n'est pas une transaction prise au bureau, et les compteurs le
disent en toutes lettres. Sangamo et Ideanomics portent « EN DIFFICULTÉ ». Le transfert
AF → ISK de Twitter et de CRISPR est consigné comme **une position continue**, pas comme
deux trades — la note l'explique sur la ligne. La non-éligibilité au PEA est écrite une
fois sous le tableau. Le libellé d'historique annonce que tout précède l'ouverture du
registre et vient des relevés de courtage.

**Deux conventions à connaître.** Une sortie à exactement 0,00 % (MARA) compte comme
non-gagnante : c'est la lecture prudente, et c'est elle qui donne 7 gains sur 18. La
performance clôturée est donnée en **devise de la transaction** en principal, avec la
lecture **SEK nette de frais** en secondaire.

Le suffixe `.ST` est câblé dans `src/data/valueChain.ts` — Suède, Nasdaq Stockholm, SEK.
Vérifié en production : `/api/quotes` sert bien Stockholm. Aucune des 32 lignes n'est
suédoise, mais le jour où il y en aura une, rien n'est à construire.

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

**Le livre entier, liquidités comprises — et un registre crypto qui existe**
- Les poids ne portent plus sur la seule poche investie : chaque ligne pèse sur le
  livre suivi, liquidités des trois comptes incluses. Le pied du registre actions
  affiche donc **19,03 %**, la part des actions, et non 100 %.
- Nouveau bloc **Allocation du livre** sur le Trade Tracker : actions 19,03 %,
  crypto 1,84 %, liquidités 79,14 %. Les trois se **dérivent** des poids publiés
  (`ALLOCATION` dans `src/lib/ledger.ts`, liquidités dans `src/data/bookAllocation.ts`)
  et reproduisent le bloc `totals` de la source à l'identique. Somme 100,01 %, soit
  100 % à un pas d'arrondi — chaque part est publiée à deux décimales.
- Registre crypto 03.B : **TAO et ETH chez Binance**, prix d'entrée, poids, date
  d'ouverture en tiret, cours et P&L recalculés en direct. La carte CRYPTO dérive son
  compteur et affiche 2.
- Les poids passent à **deux décimales** partout. À une seule, une position à 0,01 %
  s'affichait 0,0 % — présente dans le tableau, absente du chiffre — et les trois parts
  du livre totalisaient 99,9 % au lieu de 100 %.

**Les deux symboles crypto, une fois pour toutes**
- `ETH` **nu désigne Ethan Allen Interiors**, un fabricant de meubles coté au NYSE, à
  25,18 dollars. L'Ethereum est `ETH-USD`. Le registre utilise `ETH-USD`.
- TAO **est** servi, sous `TAO22974-USD` — `TAO` et `TAO-USD` renvoient `null`. C'est
  le symbole que `marketTape.ts` emploie déjà, et celui que le registre emploie. Le
  cours et le P&L de TAO sont donc en direct, pas en tiret.


**Poids publiés, compteurs dérivés, nombres au format de la langue**
- Colonne POIDS : les douze lignes portent leur `weightPct`, et le pied de tableau
  additionne devant le lecteur — il affiche **100,0 %**. Périmètre : positions
  investies, hors liquidités, au 2026.09.18.
- Quatre compteurs étaient écrits en dur et un était faux : la carte ACTIONS annonçait
  **0 OUVERTE** contre douze lignes au livre. `0 OPEN` (actions et crypto), `1 MODULE`
  et `5 NOTES` passent tous par `src/lib/coverage.ts` (règle 1.2).
- `src/lib/format.ts` : tout chiffre affiché passe par `Intl.NumberFormat`. Le français
  lit **38,9 %** et **68,40**, l'anglais **38.9%** et **68.40**. L'arabe garde les
  chiffres latins (`-u-nu-latn`) et ne prend que la ponctuation de sa locale.
- Quatre contradictions de discours corrigées dans les trois langues : la tuile disait
  « RIEN DE CONSIGNÉ AVANT » au-dessus de 32 lignes antérieures ; l'en-tête et la
  règle 01 promettaient que tout était consigné avant l'entrée ; deux textes affirmaient
  que **chaque** entrée est reliée à une thèse publiée, ce qui est faux des lignes
  Nordnet. La règle 01 dit maintenant en toutes lettres que l'historique antérieur n'a
  pas suivi la règle et qu'il est publié quand même.
- `<title>` et les dix titres d'iframe passent à **BAREK / LABS** (règle 1.4).

**Deux pièges de symboles, vérifiés sur `/api/quotes`**
- **`ETH` nu renvoie Ethan Allen Interiors** (25,18 USD), pas l'Ethereum (`ETH-USD`,
  2 629 USD). La watchlist de l'accueil et le bandeau utilisent déjà `ETH-USD` : aucun
  défaut à corriger, mais le piège est à connaître avant de câbler le registre crypto.
- **TAO est servi**, via `TAO22974-USD` (264,20 USD) — que `marketTape.ts` utilise déjà.
  `TAO` et `TAO-USD` renvoient `null`. Le registre crypto pourra donc afficher un cours
  et un P&L en direct pour TAO, pas un tiret.


**Import du registre Nordnet — 32 lignes, deux courtiers, trois statistiques dérivées**
- `t.stocks.open` passe de 1 à 12 lignes, `t.stocks.closed` de 0 à 21, dans les trois
  dictionnaires. Champ `broker` affiché en colonne ; `sourceNote` corrigé.
- `src/lib/ledger.ts` : taux de réussite, performance moyenne et performance pondérée
  par le capital, dérivés du livre au lieu d'un tiret écrit en dur.
- Poids en tiret avec la raison publiée — la valeur du livre Nordnet n'existe pas dans
  la source, et on ne l'estime pas.
- Trois défauts corrigés au passage, non demandés mais visibles : le copyright du pied
  de page affichait « BAREK LABS » collé sur toutes les pages alors que la règle 1.4
  l'interdit — il passe désormais par `withBrandMark` ; le pourcentage signé du libellé
  arabe s'affichait « %128.5+ » par réordonnancement bidi, il est isolé par U+2066/2069 ;
  et le tableau interrogeait la feed de cotation une fois par ligne au lieu d'une fois
  par symbole, ce qui doublait les appels dès que deux lignes partagent un ticker.

**Découverte utile :** `npx tsc --noEmit`, que `CLAUDE.md` § 4.6 recommande, **ne
vérifie rien** dans ce dépôt — `tsconfig.json` porte `files: []` et ne fait que
référencer les deux vrais projets. Le contrôle réel est `npx tsc -b`, exécuté aussi par
`npm run build`.


**`a3f9861` — trois chiffres que la page affirmait et contredisait**
- Trade Tracker : « 100 % CONSIGNÉ AVANT L'ENTRÉE, SANS EXCEPTION » remplacé par la
  date d'ouverture du registre. L'ancienne phrase était fausse à côté d'une position
  antérieure au registre.
- « 8 THÈSES » → 9, calculé.
- Tuile « 04 MODULES » → 3, calculée, et cesse de contredire l'en-tête juste au-dessus.

**Avant** — passe française sur Souk Signal et À propos ; légende du tableau Souk
Signal qui n'avait de couleur qu'en anglais ; pièges 5 et 6 de `netdebt.mjs` (repli sans
fond jusqu'en 2021, et fiabilité du fournisseur qui suit la taille du bilan).
