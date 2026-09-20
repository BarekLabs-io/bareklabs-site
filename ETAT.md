# BAREK / LABS — état du chantier

**Dernière mise à jour : 2026-09-20** · commit de référence `46143e2`

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
| Idées publiées | **20** cartes × 3 langues, **20** rapports HTML |
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
- [x] **Le formulaire de contact délivre.** `CONTACT_TO` pointe désormais sur l'adresse
  du compte Resend : un POST de test répond **200 `{"ok":true}`**. Le 403 précédent
  venait bien de la restriction du domaine de test — tant qu'aucun domaine n'est
  vérifié, `onboarding@resend.dev` n'écrit qu'à l'adresse du compte. **Reste à faire si
  le formulaire doit écrire ailleurs :** vérifier un domaine chez Resend et poser
  `CONTACT_FROM`. En l'état, tout message du site arrive sur cette seule adresse.
- [x] ~~**Les clés sont posées, Resend refuse avec un 403**~~
  Le POST de test passe désormais le contrôle des variables (plus de `503
  not_configured`) et meurt chez le fournisseur : `502 delivery_failed`, `status: 403`.
  L'expéditeur par défaut est `onboarding@resend.dev` (`api/contact.ts`), et la
  documentation de Resend donne trois 403 possibles : domaine de test (on ne peut
  écrire qu'à l'adresse du compte Resend tant qu'aucun domaine n'est vérifié), clé
  suspendue, ou portée manquante. **Ce qui départage :** si `CONTACT_TO` est l'adresse
  du compte Resend, c'est la clé ; sinon c'est le domaine de test. Le correctif dans ce
  second cas est de vérifier un domaine et de poser `CONTACT_FROM`.
- [x] ~~**`RESEND_API_KEY` et `CONTACT_TO` absents**~~ Un POST valide sur `/api/contact` (preuve de travail résolue, tous les
  filtres anti-spam franchis) répond `503 not_configured` : aucun mail n'est parti.
  La page affiche un message honnête plutôt qu'une fausse coche verte, mais **aucune
  adresse de repli n'est proposée** — un recruteur qui écrit lundi tombe sur un
  cul-de-sac. **Demande Elyes :** créer les deux variables dans Vercel (Settings →
  Environment Variables) puis redéployer. `CONTACT_FROM` est optionnel.
- [ ] **166 notes de méthode internes sur les fiches société.** `src/data/companies.ts`
  porte « mechanically rescaled » (47), « not independently re-verified » (68), « not
  independently re-derived » (25), « not independently reconciled » (11) et « varies by
  source » (15), sur une centaine de sociétés. Elles **s'affichent** — `Company.tsx:466`
  pour `sourceNote`, et dans les tableaux de multiples pour les valeurs. C'est la
  règle 1.5. **Pourquoi ce n'est pas fait :** effacer la réserve en gardant « ~61,1x »
  publierait un chiffre approximatif sans son avertissement, ce qui est pire ; la
  réponse honnête est un tiret, et cela touche 166 valeurs. **À trancher par Elyes.**
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

- [x] **Les deux numéros de version sont retirés**, avec l'accord d'Elyes. Le pied de
  page ne rend plus la ligne quand elle est vide.

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

- [ ] **La base de la performance depuis l'origine est à corriger en comptant.** Le
  site publie **+95,3 %**, dérivé de `SINCE_INCEPTION` sur un dénominateur en coût de
  revient de 208 294 SEK. Le comptant vaut 200 740 SEK ; l'écart de **7 554 SEK** est
  un **double comptage AF→ISK** — les lignes transférées du compte-titres vers l'ISK
  apparaissent des deux côtés dans la source. Sur base comptant la performance vaut
  **+97,4 %**. Elyes a tranché : **le +95,3 % reste publié tel quel** pour lundi, la
  correction se fait mardi. Ne pas la faire passer en douce dans un commit d'affichage.
- [ ] **Deux erreurs de ma dérivation, corrigées, à ne pas réintroduire.** Roivant n'est
  pas issu d'Immunovant mais du SPAC **Montes Archimedes (MAAC.US, US6126571065)**,
  acheté le 2021-01-14 — l'achat existe, il porte un autre nom. Et un achat du fonds
  **Tundra Vietnam** était compté comme action parce que son nom d'avant le changement
  ne figurait pas dans la liste des fonds : l'identité de ligne se fait désormais par
  **ISIN**, pas par libellé.

- [ ] **Deux éditions existent des rapports n°08 TMDX / ISRG / RXRX.** Celles de
  `~/Downloads` sont numérotées n°08-A/B/C et affichent l'écart en tête (−16,6 %,
  −36,4 %, −68,3 %) plus la fourchette 52 semaines ; celles en ligne affichent
  capitalisation et valeur d'entreprise et marquent le cours « vérifié IBKR ».
  **Les chiffres sont identiques des deux côtés** — cible, cours et date d'arrêté au
  6 août 2026 — mais TMDX pèse 21 % de plus dans l'édition numérotée, donc les deux ne
  portent pas la même quantité de texte. Décision : **on garde les versions en ligne**,
  rien n'est remplacé. À arbitrer côté recherche, pas côté site.
- [ ] **Končar (ZSE: KOEI)** à ajouter au screener et aux Investment Ideas. Jamais
  commencé. Deux anomalies non résolues dans le S1 2026 : un résultat net de 171,4 M€
  pour un EBITDA de 173,4 M€ (élément non récurrent non identifié), et deux chiffres
  d'affaires en circulation (724,9 et 745 M€). Le semestriel est déposé sur `eho.zse.hr`.
  Ajouter au screener signifie écrire un dossier `Company` complet — le type exige des
  zones de prix et des scénarios pondérés, que la règle 4.3 interdit d'inventer. Le
  type prévoit `verdictTone: 'unrated'` pour ce cas.
- [x] **Le zip `publier/` — intégré.** Les 11 rapports n°09 à n°19 sont posés et
  déclarés ; 8 cartes écrites dans les trois langues.
- [x] **Les trois cartes manquantes sont intégrées.** n°09 WDC/STX, n°12 Micron et
  n°18 SUMCO sont arrivées dans `publier_barek_labs.zip`. La série va désormais de
  IDEA-10 à IDEA-20, dans l'ordre des rapports n°09 à n°19.
- [ ] **Rafraîchir trois dossiers**, dettes de données listées par le markdown lui-même :
  n°10 Phison et n°15 ADATA sont antérieurs aux comptes du T2 (disponibles mi-août 2026) ;
  n°11 SanDisk attend le rapport annuel sur le capex hors bilan de la coentreprise BiCS,
  et ses valeurs Kioxia sont antérieures à la division du titre du 1er octobre 2026.
- [x] **Secteurs MEMORY et DISTRIBUTION** ajoutés aux filtres, trois langues. SEMIS a été
  ajouté puis retiré : après correction d'Elyes, SUMCO et Shin-Etsu vont en MATERIALS,
  et le filtre serait resté vide.
- [ ] **Série chaîne d'approvisionnement** dans sa propre section, pas mélangée aux 9. Les
  secteurs MEMORY / SEMIS / DISTRIBUTION la séparent déjà au filtre, mais pas à l'œil.
- [x] **Rapport n°14 Winbond — il n'y avait pas de doublon côté site.** Winbond n'a
  jamais été publié : aucun slug `winbond` dans `IDEA_REPORTS`, aucun dossier sous
  `public/research/ideas/`. Le nom n'existait que comme fiche de screener dans
  `companies.ts`, marquée « watchlist entry, not a deep dive ». Le zip n'en contient
  qu'une version, qui est donc celle publiée. Si un second exemplaire existe, il est
  dans `bareklabs-research` et invisible d'ici.
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

**Commit 2 — accueil : le Stack à la place du manifeste, en-tête agrandi, watchlist élargie**
- **Le Stack remonte dans la colonne du manifeste** (`SectionHead index="01—04"`), avec
  une **4e carte OPTIONS TRADING**. L'ancienne section MODULES, plus bas, disparaît :
  elle disait la même chose deux fois. Les cartes sont ordonnées 01→04 —
  RECHERCHE, SIGNAL, REGISTRE, OPTIONS — après un défaut où OPTIONS, insérée avant
  REGISTRE, faisait lire 01, 02, 04, 03.
- **Hero restructuré** : titre sur trois lignes dans `max-w-[34rem]`, ENTRER DANS LE
  LABO sous le paragraphe et à gauche, au lieu d'un bloc qui courait sous le panneau.
- **Watchlist élargie** de 540 à **620 px** au `xl`. `whitespace-nowrap` sur les
  libellés avait transformé une troncature en collision : TOKYO ELECTRON débordait de
  21 px sur sa colonne voisine. Mesuré à 1920 et 1440 : **0 libellé en défaut**.
- **The Wire filtre par sujet, pas par liste noire de sources.** `api/news.ts` croise la
  pertinence de couverture et les `topics` d'Alpha Vantage (`coverageRelevance < 0.15`
  **et** `topicRelevance < 0.3` → écarté) ; le panier `rest`, qui laissait passer
  n'importe quoi pour remplir, est supprimé.

**Quatre défauts d'affichage trouvés en vérifiant le commit 2, non demandés**
- **Le logo disparaissait entre 768 et 1279 px.** La barre d'en-tête est un `flex
  justify-between` sans `shrink-0` : le lien de la marque, seul élément compressible,
  était écrasé à **0 px de large**. Un recruteur sur un portable 1024 voyait un en-tête
  sans marque. Le logo est désormais `shrink-0`, et ce sont les ornements qui cèdent —
  l'horloge des places et le libellé RECHERCHER passent de `lg` à `xl`, la navigation
  se resserre (`gap-5 lg:gap-7 xl:gap-9`, `text-[12px] xl:text-[13px]`). Défaut
  antérieur au commit 2, mesuré sur la version précédente avant de conclure.
- **Le logo était aussi comprimé à 1440 et 1920** — 206 px et 272 px pour une largeur
  naturelle de 297 —, donc déformé horizontalement. Il rend maintenant à son rapport
  exact (183 / 251 / 297 px selon le palier) aux cinq largeurs, dans les deux sens
  d'écriture.
- **Le bouton de menu sortait de l'écran sur téléphone.** Conséquence directe du
  `shrink-0` ci-dessus : à 390 px il se retrouvait à x=409 sur un écran de 390, et le
  site n'avait plus aucune navigation mobile. Le logo revient à `h-8` sous `md` — sa
  taille d'avant l'agrandissement, qui ne visait que le bureau — et les ornements se
  resserrent. Vérifié visible à 390 et 430 px, FR et AR.
- **« BAREK / LABS » se coupait en deux lignes** dans la signature du hero sur mobile.
  `BrandMark` émet désormais `whitespace-nowrap` (règle 1.4).

**Vérification du commit 2** — captures à 1920, 1440, 1024 et 390 px, **en français et
en arabe**, régénérées après chaque correction : aucun défilement horizontal
(`scrollW === clientW` aux huit combinaisons). Dégagement mesuré ligne à ligne entre le
texte du hero et le panneau : le pire cas, FR à 1024, passe de **8 px à 43 px** après
élargissement de `lg:pe-[420px]` à `lg:pe-[460px]`. `tsc -b` passe, le build passe,
`npm run lint` rend les **18 problèmes de référence** — aucun introduit.

**Deux affirmations retirées de la page À propos, faute d'être vraies**
- Le principe 02 disait préférer « être excellents sur trois marchés que moyens sur
  trente » — une figure de style qui se lisait comme un chiffre de couverture à côté
  des {countries} marchés annoncés, et dérivés, sur l'accueil. Il parle désormais de ce
  qu'on peut défendre ligne à ligne plutôt que de ce qu'on peut énumérer : le principe
  porte sur la profondeur, il n'a pas besoin d'un compte.
- **Le lab n'a pas encore de clients.** La page affirmait que le travail sur mandat
  « finance la moitié gratuite ». Elle dit maintenant que le lab est *disponible* pour
  de la recherche sur mandat et du conseil — une offre, pas une clientèle.
- **Balayage complet des trois dictionnaires** sur cinq familles de formulations
  (clients, revenus, mandats en cours, tarification, témoignages) : c'était la seule
  affirmation fausse. Tout le reste est du langage d'offre. La mention de l'accueil
  (« ÉGALEMENT DISPONIBLE : MANDATS DE RECHERCHE ET DE CONSEIL PAYANTS ») est exacte et
  n'a pas été touchée, pas plus que « RÉPONSE < 48 H ».
- **Une formulation à surveiller, laissée en place :** « Tarifé à la mission, pas à
  l'heure » affirme une pratique tarifaire établie. Défendable pour une offre, mais
  c'est la phrase la plus proche de la ligne.


**À propos : deux promesses alignées sur ce que le site fait vraiment**
- La bio promettait « chaque position à un journal », la même promesse que celle déjà
  corrigée sur le Trade Tracker et fausse à côté de trente-deux lignes antérieures au
  registre. Elle dit désormais : depuis le 2026.08.07 chaque position est consignée
  avant l'entrée, et l'historique antérieur est reconstitué depuis les relevés et
  signalé comme tel.
- Le formulaire annonçait « votre message arrive dans la boîte du labo et nulle part
  ailleurs ». Inexact : il transite par un prestataire d'envoi. Le texte énonce
  maintenant ce qui est vrai — pas de mesure d'audience, pas de captcha tiers, pas de
  liste de diffusion, pas de revente — puis dit que le message est acheminé par un
  prestataire d'envoi jusqu'à la boîte du lab. Le prestataire n'est pas nommé.

**Le portrait du fondateur existe déjà.** `public/founder.jpg`, 1200 × 1600, ratio 3:4
exact, niveaux de gris, servi en production avec le bon type MIME. Le bloc « PORTRAIT
INDISPONIBLE » est un repli que le visiteur ne voit jamais : il n'apparaît que si le
fichier échoue à charger (`onError` masque l'image). Fournir une autre photo revient à
remplacer ce fichier, déjà recadré en 3:4 et en JPEG réel — l'en-tête `nosniff` de
`vercel.json` transforme une mauvaise extension en cadre vide plutôt qu'en avertissement.


**Le nettoyage des notes de méthode passe de cinq formules à la famille entière**
- Les cinq chaînes exactes traitées au commit précédent étaient à zéro, mais des
  variantes passaient toujours : « rescaled from $240–250 pre-refresh », « in this
  pass », « the real recent low is closer to ~$200 ». La détection ne se fait plus par
  phrase mais **par clause** : toute clause qui parle du processus de mise à jour —
  et non de la société — tombe, et ses voisines dans la même parenthèse survivent.
  « 52-week low $90.94 (10:1 split-adjusted; the real recent low is closer to ~$200) »
  garde la division et perd la correction.
- Décompte sur tout `companies.ts`, motif par motif : **319 occurrences avant,
  0 après**. Vérifié en compilant le module livré et en le passant sur les 7 372
  chaînes du fichier, pas sur une copie du code.
- Une cellule entièrement composée de langage de processus — « not captured in this
  pass » — devient un **tiret** et non un libellé de réserve : c'est une donnée absente,
  pas un chiffre approximatif, et le tiret le dit déjà.
- **Neuf champs** rendaient encore brut et passent au nettoyeur : `priceMap.technical`
  (deux rendus plus le résumé du graphique), `priceMap.zones[].rationale`,
  `priceMap.invalidation`, `priceMap.scenarios[].note`, `synthesis.summary`,
  `synthesis.scores[].note`, `risks[].note`, `valuation.verdictPoints` et
  `valuation.justifiedIf`. Le dernier a été trouvé en ouvrant la fiche 005380.KS :
  « Nothing is re-derived » y survivait dans un point de verdict que rien ne nettoyait.
- **Aucun chiffre de `companies.ts` n'est modifié.** Le fichier garde sa provenance
  complète ; seul l'affichage change.

**Les cours datés dans le texte gardent leur date, au format de la langue**
- **128 fiches sur 176** portent au moins un cours daté en toutes lettres
  (« Current $322.87 (Aug 5, 2026) »), pour **293 occurrences**. La date est conservée
  et rendue selon la langue — 5 août 2026, 5 Aug 2026, 5 أغسطس 2026 — au lieu du format
  américain figé. Le cours affiché en tête de fiche, lui, vient du flux.
- La capitalisation de l'en-tête reste le seul endroit où une date est **retirée** du
  chiffre, parce que le `asOf` du dossier est imprimé juste à côté.


**Le jargon de méthode quitte les pages, la réserve y reste**
- `src/lib/figures.ts` nettoie à l'affichage, **sans toucher à `companies.ts`** : les
  cinq formules de travail — « mechanically rescaled », « not independently
  re-verified / re-derived / reconciled », « varies by source » — sont retirées du
  texte rendu et remplacées par un libellé localisé unique (« donnée d'agrégateur,
  datée, non revérifiée par le lab »). Contrôle : **103 valeurs et 22 paragraphes de
  source** portaient une formule ; après nettoyage il en reste **zéro**.
- **Le screener était concerné aussi**, ce que la demande n'avait pas prévu : ses
  colonnes capitalisation, Forward P/E et EV/EBITDA lisent les mêmes chaînes. 87
  valeurs de tête en portaient une. Elles passent par le même nettoyeur, avec un
  marqueur discret et une légende sous le tableau — une phrase répétée quatre-vingts
  fois dans un tableau dense n'est pas lisible.
- **Une seule date** sur la capitalisation : le chiffre embarquait parfois la sienne
  (« (Aug 7, 2026) ») à côté du `asOf` du dossier, d'où « $54.94B (Aug 2026) (2026.08) ».
  La date du chiffre est retirée, celle du dossier est rendue au format de la langue.
- Radar et liste de suivi de l'accueil : nombres au format de la langue via
  `format.ts`. `formatLevel` prend désormais la langue.
- Le bloc radar du haut de page porte la date de rédaction des notes, comme le tableau.

**`api/contact.ts` : le journal reçoit enfin la raison du refus**
- La route ne journalisait rien quand Resend refusait : le journal de fonction était
  vide, donc un 403 était indiscernable d'une clé suspendue ou d'une portée manquante.
  Une ligne `console.error` publie désormais le statut et le motif du fournisseur
  **dans le journal seulement** — la réponse HTTP garde le seul statut, conformément au
  § 6. Aucune clé, aucune longueur, aucune adresse dans un corps de réponse.


**L'accueil cesse de promettre ce que personne ne fait**
- « 24/7 SURVEILLANCE DES MARCHÉS » : rien ne surveille quoi que ce soit en continu. La
  tuile annonce désormais l'intervalle réel de rafraîchissement des cours — **90 s,
  page ouverte** — lu depuis `REFRESH_MS` dans `useLiveQuotes.ts`, donc vrai par
  construction. C'est un remplacement proposé : une ligne à changer s'il ne convient pas.
- « MIS À JOUR QUOTIDIENNEMENT » devient **la date du dernier article**, dérivée du fil
  lui-même (`COVERAGE.lastPost`, 2026.08.08). Une promesse de cadence remplacée par un
  fait daté.
- Les deux numéros de version sont retirés.
- **Liste de suivi : trois colonnes au lieu de deux** sur le panneau flottant à pleine
  largeur. La marge passe de `px-4` à `px-3` et les gouttières se resserrent : ce sont
  les colonnes qui gagnent la place, pas les lignes qui perdent leurs chiffres. Le
  mobile ne peut pas être touché — `xl:grid-cols-3` ne s'applique qu'au-delà de 1280 px
  et le panneau en flux est `lg:hidden`, donc plafonné à 1023 px.
- **Bloc SÉOUL ajouté** : KOSPI, SK hynix, Samsung Electronics, Hyundai, MediaTek,
  Winbond. Paris gagne Soitec, Tokyo gagne TOWA — toutes des sociétés déjà au screener,
  sauf SK hynix qui n'a pas de fiche et ne porte donc pas de lien. Les six symboles ont
  été vérifiés un par un sur `/api/quotes` avant d'être ajoutés.


**Souk Signal cesse de publier six chiffres inventés**
- Le score de 74/100 **était calculé** — `src/pages/SoukSignal.tsx`, moyenne pondérée
  des tons — mais ses six entrées étaient écrites à la main dans les trois
  dictionnaires. Un nombre calculé sur des entrées inventées est pire qu'un nombre en
  dur : il a l'air dérivé. Les six valeurs (1,42 · 0,87× · +18,2 M$ · BANQUES ·
  2 ALERTES · BAS), leurs tons et leurs commentaires sont retirés.
- **Une seule composante est calculable** depuis `/api/quotes`, qui ne renvoie que
  `price`, `changePercent`, `currency`, `marketTime` : l'**ampleur ADV/DEC**. Elle est
  désormais calculée en direct (`src/lib/soukSignal.ts`) sur les 28 valeurs de
  `MOVERS_UNIVERSE`, avec un seuil de couverture de 60 % en dessous duquel elle affiche
  un tiret plutôt qu'un ratio tiré de quatre noms.
- Les cinq autres portent un tiret **et la raison** : pas de volumes (intensité,
  leadership), pas de flux de conservation (flux étranger), pas d'historique
  (volatilité, anomalies). Les pondérations restent publiées — la méthode est la partie
  de cette page qui n'a jamais été fausse.
- **La jauge ne dessine plus d'arc.** Un arc tracé à n'importe quelle longueur est une
  lecture, et il n'y en a pas à donner tant que cinq composantes sur six sont muettes.
- Promesses de cadence retirées : « mise à jour à chaque clôture », « prochaine mise à
  jour : clôture + 30 min », « actualisé à la clôture ». Le radar affiche à la place la
  date réelle de rédaction de ses notes, **2026.08.08**, établie par `git log -S` sur le
  contenu anglais (commit `c543977`) — la passe française du 11 n'a touché que la
  traduction.
- **Le cours figé du radar passe au direct** et la capitalisation porte désormais la
  date du dossier dont elle vient (`asOf`). Un prix d'août non daté à côté d'un signal
  se lit comme le prix du jour.
- Quatre formulations de conseil retirées de la légende et de la lecture du jour :
  « nous restons positionnés, stops resserrés », « nous réduirions l'exposition »,
  « trop tôt pour courir après », « rien à faire tant que ». La légende décrit la
  configuration, pas une action.

**Investment Ideas, deux textes**
- Le récit de l'erreur de méthode passe de six lignes à une phrase ; le badge REFAIT et
  le passage sur la sensibilité au taux de 8 % restent.
- L'en-tête « écrites avant le trade, auditées après » — une promesse d'audit que rien
  n'atteste — devient la description de ce que la carte publie réellement.


**Les trois dernières cartes, et la série remise dans l'ordre**
- n°09 WDC/STX, n°12 Micron et n°18 SUMCO rejoignent les huit autres. La série mémoire
  court maintenant de IDEA-10 à IDEA-20 **dans l'ordre des rapports** : les identifiants
  du lot précédent ont été décalés pour que le carrousel se lise n°09 → n°19. Rien
  d'extérieur ne pointait sur ces identifiants — ils dataient du commit précédent.
- **n°09 est un DCF inversé** : aucun objectif n'est présenté comme une cible. Ce que la
  carte met en avant, conformément à ce que demande son markdown, ce sont les taux
  d'actualisation implicites — 5,72 % et 5,27 % pour que le cas central vaille le cours,
  sur des titres dont la volatilité observée est de 133,1 % et 119,8 %.
- **n°12 Micron affiche ses quatre scénarios**, BLUE_SKY compris. Le panneau du site
  rend un nombre quelconque de barres, donc le replier en note n'était pas nécessaire :
  30/45/18/7 remplit la barre exactement. L'objectif pondéré de 460,71 $ est celui
  établi sur quatre scénarios et n'a **pas** été recalculé ; la carte dit que le
  quatrième a été construit pour satisfaire le test d'élargissement, pas découvert.
- **n°18 SUMCO** est le premier dossier du lab dont l'objectif dépasse le cours. Son
  markdown demande de ne jamais publier l'objectif sans l'avertissement de robustesse :
  les deux sont sur la carte. Valeurs en yens, aucune conversion au comptant.

**Secteurs, après correction d'Elyes**
- MEMORY : n°09 à n°15. DISTRIBUTION : n°16 et n°17. MATERIALS : n°18 et n°19.
- **SEMIS, ajouté au commit précédent, est retiré** — il serait resté vide. Un contrôle
  vérifie désormais qu'aucun filtre n'est vide et qu'aucun secteur de carte ne manque
  aux filtres, dans les trois langues.
- À savoir : les cartes livrées placent WDC/STX, Micron et SUMCO en **AI INFRA** et le
  disent explicitement — le stockage de masse et les plaquettes de silicium n'ont pas
  d'entrée propre dans la nomenclature, et les deux cartes demandent que le point soit
  soulevé plutôt que tranché en silence. MEMORY et MATERIALS sont un choix d'éditeur,
  pris en connaissance de cause, et noté dans le code.

**L'introduction ne compte plus à la main.** Elle écrivait « les huit rapports » cinq
fois. `COVERAGE.rebuilt` compte les cartes qui portent le badge REBUILT et la copie
porte un jeton `{rebuilt}` — la phrase parle de corrélation d'erreurs à l'intérieur d'un
lot, donc elle compte ce lot et reste vraie à vingt cartes comme à neuf.


**La série mémoire entre : 11 rapports, 8 cartes, 3 secteurs**
- `public/research/ideas/` passe de 9 à 20 dossiers. Les onze HTML sont copiés
  **octet pour octet** — MD5 vérifié avant et après (§ 4.1) — et déclarés dans
  `IDEA_REPORTS`.
- 8 cartes écrites dans les trois langues depuis le markdown livré, l'arabe à la main.
  Aucun chiffre qui ne soit pas dans ce markdown. Les trois rapports sans objectif
  exploitable — n°11 SanDisk (DCF inversé), n°15 ADATA (non concluant), n°19 Shin-Etsu
  (somme des parties inversée) — n'en portent aucun.
- Filtres MEMORY, SEMIS et DISTRIBUTION ajoutés : un secteur absent de `t.ideas.filters`
  donne une carte que le filtre ne retourne jamais (§ 4.3).
- **La date d'arrêté est de nouveau affichée.** Elle était volontairement masquée parce
  que les neuf thèses portaient la même — la raison est écrite dans le code. Elle tombe
  avec un second lot : la date sépare désormais deux dates au lieu d'en exposer une.
- Nouveau champ `freshness` sur la carte, pour les réserves datées : n°10 Phison et
  n°15 ADATA antérieurs aux comptes du T2, n°11 antérieur à la division Kioxia.
- **L'introduction de la page disait « les huit rapports ».** Elle décrit le premier lot
  et son erreur d'année terminale, pas la série mémoire ; la passer à dix-sept l'aurait
  rendue fausse. Elle est cantonnée à son lot, et nomme le second.

**Deux retouches du registre**
- Signe moins : `Intl` écrit un trait d'union dans toutes les locales, donc une perte
  s'affichait « -24,3 % » à côté d'un gain composé au vrai signe. `format.ts` remplace
  désormais la **part** `minusSign` par U+2212, ce qui laisse intacts les tirets des
  dates et des tickers.
- L'accroche du registre crypto promettait du levier maîtrisé et un dimensionnement par
  conviction devant deux positions au comptant sous 1 % du livre. Remplacée.

**CSP et Google Fonts : rien à changer.** La CSP de `vercel.json` ne porte que
`frame-ancestors 'self'` — ni `default-src`, ni `font-src`, ni `style-src` — donc rien ne
bloque `fonts.googleapis.com`. Vérifié en production sur les rapports `meta` et `nbis`,
déjà en ligne et déjà chargeurs de Google Fonts. `X-Frame-Options` reste `SAMEORIGIN`.


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
