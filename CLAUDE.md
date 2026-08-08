# BAREK / LABS — instructions du projet

À lire au début de chaque session, quel que soit l'agent. Ce fichier fait foi.
Si une consigne ici contredit une habitude prise ailleurs, c'est ce fichier qui gagne.

---

## 1. Les non-négociables

Cinq règles. Aucune n'est une préférence esthétique ; chacune vient d'un incident réel.

**1.1 — On n'invente jamais un chiffre financier.** Pas un cours, pas un objectif, pas une
statistique, pas une position, pas une part de marché. Quand la donnée manque, on affiche un
tiret et on écrit pourquoi. Un tableau vide est un résultat ; un tableau rempli au jugé est un
mensonge qui a l'air d'un travail.

**1.2 — Un chiffre que le site publie sur lui-même se calcule, il ne s'écrit pas.** La page
d'accueil a annoncé 68 sociétés couvertes pendant que la liste en contenait 118, parce que le
nombre était tapé à la main dans trois fichiers de traduction. Tout compte de ce genre passe par
`src/lib/coverage.ts` et un jeton `{tickers}` / `{countries}` dans la copie.

**1.3 — On ne supprime jamais une fonctionnalité existante sans demander.** Un tableau de bord,
un graphique, un filtre, un module : s'il est là, quelqu'un l'a voulu. On propose, on ne retire pas.

**1.4 — La marque s'écrit `BAREK / LABS`.** BAREK en gras et en capitales, espace, barre oblique,
espace, LABS en capitales sans gras. Partout : texte, titres, CSS, commentaires, messages de
commit. Jamais `BAREK LABS` collé, jamais `BarekLabs`, jamais `Barek Labs`.

**1.5 — Aucun commentaire d'audit interne sur le site public.** Quand un document fourni contient
une erreur, on la **corrige silencieusement dans le document** et on **rapporte la correction dans
la conversation**, avec le chiffre avant et le chiffre après. On ne laisse jamais sur la page une
note qui dit « la source est fausse ».

---

## 2. Qui fait quoi

Deux agents travaillent sur ce projet, et ils se sont déjà marché dessus.

| | Agent Cowork | Session Claude Code (site) |
|---|---|---|
| **Produit** | les rapports d'analyse fondamentale | le site, son code, son intégration |
| **Livre** | des HTML autonomes + un markdown de cartes | des pages, des composants, des données |
| **Ne touche pas** | au code du site | au **contenu** des rapports |

**Le 8 août 2026, les deux ont produit le même rapport n°14 Winbond sans le savoir.** La cause :
l'agent Cowork travaille sur sa propre copie de la chaîne de production et ne pousse pas dans le
dépôt commun, donc la collision était invisible des deux côtés.

**Règle qui en découle.** Le tableau de `fiches/plan.md`, dans le dépôt `bareklabs-research`, est
le seul point de rendez-vous. Un dossier commencé s'y marque **avant** d'écrire une ligne de
modèle, et le changement est poussé immédiatement. Un agent qui ne peut pas pousser dans ce dépôt
ne prend aucun dossier de la série.

---

## 3. Les deux dépôts

| Dépôt | Visibilité | Contenu |
|---|---|---|
| `BarekLabs-io/bareklabs-site` | **public** | le site, déployé sur bareklabs.com |
| `BarekLabs-io/bareklabs-research` | **privé** | la chaîne de production des rapports, les fiches de données, le journal d'audit des défauts de méthode |

Le dépôt de recherche est privé pour une raison précise : il contient des fiches qui portent des
réserves **délibérément non publiées** et le relevé des erreurs de méthode du lab. Rien de ce
dossier ne va sur le site tel quel — seuls les HTML de `rapports/` sont destinés au public, et ils
sont servis depuis le dépôt du site.

**Ne jamais committer le contenu de `bareklabs-research` dans `bareklabs-site`.** Le second est
public : ce serait irréversible.

---

## 4. Intégrer un rapport sur le site

La procédure complète. Aucune modification de route n'est nécessaire : `/analysis/ideas/:slug` est
générique.

### 4.1 Poser le fichier

```
public/research/ideas/<slug>/index.html
```

Le HTML est **autonome** — CSS et JS en ligne, aucune dépendance externe — et on **n'en modifie
jamais le contenu**. Si un chiffre doit changer, c'est le code Python du dépôt de recherche qui
change et le HTML qui est refabriqué. Corriger un HTML à la main est interdit : chaque chiffre y
apparaît à cinq endroits (tableau, graphique, texte français, texte anglais, calculateur), on en
corrige un et on en oublie quatre.

### 4.2 Déclarer le rapport

Dans `src/data/ideaReports.ts`, ajouter une entrée à `IDEA_REPORTS` :

```ts
winbond: {
  src: '/research/ideas/winbond/index.html',
  title: 'Winbond (2344.TW) — The Market Split The Difference · BAREK LABS',
  tickers: ['2344.TW'],
},
```

La clé est le slug, donc l'URL. Un slug absent n'affiche simplement pas de lien — c'est le bon
comportement pour une thèse dont la rédaction n'est pas finie, pas une erreur de compilation.

### 4.3 Écrire la carte, dans les trois langues

`src/i18n/ideas-en.ts`, `ideas-fr.ts`, `ideas-ar.ts`. **L'arabe s'écrit à la main**, il ne se
génère pas par traduction automatique.

Deux pièges qui rendent une carte invisible :

- **`sector` doit correspondre exactement à une entrée de `t.ideas.filters`** dans le dict de la
  même langue (`['ALL', 'AI INFRA', 'MEDTECH', 'BIOTECH', 'SPACE', 'ENERGY', 'MATERIALS']`).
  Un secteur qui n'y figure pas donne une carte que le filtre ne retournera jamais.
- **Les trois fichiers doivent avoir le même nombre de cartes et les mêmes `id`.** Une idée écrite
  en anglais seulement est un blanc silencieux pour un lecteur français, pas une erreur de build.

Champs à respecter :

- `company` — obligatoire, le nom en toutes lettres, en alphabet latin dans les trois langues.
  C'est un identifiant, comme le ticker.
- `scenarios` — **optionnel**. Quand le rapport ne pondère pas ses cas, on ne met rien. Une
  pondération inventée serait le chiffre le plus citable de la carte.
- `discountRate` — le taux d'actualisation dont vient l'objectif. Il est publié parce que c'est
  l'hypothèse la plus déplaçante et qu'elle varie d'un rapport à l'autre.
- `revised` — badge à poser quand le rapport a été refait après correction d'une erreur de méthode.

### 4.4 Ce qu'on ne met pas sur une carte

Aucun bouton, badge ou libellé qui ressemble à une recommandation d'achat ou de vente. Pas de
« BUY », pas de « STRONG », pas de flèche verte de conviction. Les rapports produisent des
scénarios, des fourchettes et des conditions d'invalidation — rien d'autre.

### 4.5 Un rapport sans objectif de cours

C'est un cas normal, pas un champ à remplir. On laisse vide, ou on met exactement ce que dit le
markdown fourni. On ne fabrique pas un objectif pour équilibrer une grille.

### 4.6 Vérifier

```bash
npx tsc --noEmit && npm run build && npx vite preview --port 4173
```

Puis on **ouvre la page** : le rapport doit s'afficher dans son iframe, le lien de la carte doit
mener au bon slug, et la carte doit apparaître dans les trois langues.

### 4.7 Le piège des en-têtes

Les rapports sont des **iframes de même origine**. Dans `vercel.json`, `X-Frame-Options` doit
rester à `SAMEORIGIN` et `frame-ancestors` à `'self'`. Le `DENY` que recommandent les guides de
durcissement refuse aussi le cadrage depuis notre propre origine : ça ressemble à un gain de
sécurité jusqu'au moment où tous les rapports sont des boîtes vides.

Le site pilote aussi la langue du rapport via un `setLang` global exposé par chaque document
(`src/components/ReportFrame.tsx`). Un rapport qui n'expose pas cette fonction garde sa langue par
défaut, silencieusement — ce n'est pas une panne.

---

## 5. Git et mise en ligne

**On travaille sur `main`, et on pousse sur `main`.** Vercel déploie `main` sur bareklabs.com
automatiquement. C'est la pratique de ce projet.

Les sessions Claude Code démarrées depuis le web se voient parfois attribuer une branche par
défaut par l'outil. **Ce n'est pas une consigne du projet.** Dans ce cas : le dire à Elyes, et
pousser sur `main` sauf s'il demande le contraire.

**Ne jamais fusionner une pull request sans autorisation explicite.**

**Message de commit : jamais de guillemets doubles dans un `git commit -m`.** Le shell casse la
chaîne et git prend la suite pour un chemin de fichier — le commit échoue en silence. Utiliser
`git commit -F fichier` ou un heredoc.

---

## 6. Clés d'API et secrets

Les clés vont **uniquement** dans les variables d'environnement Vercel. Jamais dans le dépôt,
jamais dans un message, jamais dans un corps de réponse d'API, jamais dans un log.

Une route serverless ne publie ni la longueur d'une clé, ni ses tentatives d'appel : ce sont des
propriétés d'un secret, elles vont dans le journal de la fonction.

Connecteurs actuels : Alpha Vantage (fil d'actualité), FMP (fondamentaux — bloqué sur les titres
hors États-Unis au niveau d'abonnement actuel), Interactive Brokers.

**IBKR est en lecture seule.** On y lit des cours, des positions, des données de marché. On ne
crée, ne modifie et n'annule **jamais** un ordre, une alerte ou une liste de suivi.

Manquent encore : `RESEND_API_KEY` et `CONTACT_TO` pour le formulaire de contact.

---

## 7. Écriture

**Le français d'abord, l'anglais ensuite, l'arabe à la main.** Les trois dictionnaires ont la même
forme, garantie par le type `Dict = typeof en`.

Le défaut à traquer est la traduction littérale. « Journaliser » est un verbe d'informatique, pas
de marché. « Cherchable » n'est pas un mot. Un « moat » n'est pas un fossé. On écrit ce qu'un
lecteur francophone dirait, pas ce que l'anglais dit mot à mot.

Le ton : institutionnel, précis, sans esbroufe. Le lecteur est un investisseur professionnel ou un
analyste technique. On explique le mécanisme, on nomme la variable qui décide, on publie la
sensibilité et on laisse le lecteur trancher.

**La taille des positions ne se publie pas.** Le registre affiche un poids en pourcentage et une
performance en pourcentage — jamais un montant, jamais un nombre de titres. Un P&L en dollars
divisé par la variation du cours reconstitue la taille du livre, et c'est le seul chiffre que ce
registre ne divulgue pas.

---

## 8. Repères techniques

- React 19 · TypeScript · Vite 7 · Tailwind 3 · react-router 7 · déployé sur Vercel
- `.shell` = la colonne de contenu, 1720 px. Ne pas réintroduire de `max-w-[1440px]` en dur.
- Deux taxonomies **orthogonales** : `domain` (ce que fait l'entreprise — chaque ticker en a un) et
  `chainSegment` (sa place dans la chaîne de l'IA — absent pour la plupart, et l'absence n'est pas
  une rétrogradation).
- Neuf étapes de chaîne, qui répondent à « qui paie qui » : ENERGY → ELECTRIF → BUILD → FABTOOLS →
  FOUNDRY → MEMORY → LINK → COMPUTE → STACK.
- Fonctions serverless dans `/api`. La réécriture de `vercel.json` les exclut via
  `"/((?!api/).*)"` — une route API ajoutée sans cette exclusion renverrait `index.html`.
- Pas de `any` non typé. Composants courts, une seule responsabilité, mobile d'abord.
