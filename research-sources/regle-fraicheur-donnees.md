# Règle de fraîcheur des données — obligatoire, bloquante

> Copie de référence versionnée dans le dépôt du site. **La copie qui fait foi
> pour les agents analystes est celle du projet Cowork BAREK LABS**
> (`claude/regles-valorisation-obligatoires.md`) — en cas de divergence,
> c'est elle qui gagne. Ajoutée le 8 août 2026 après qu'un agent a produit
> des analyses de sociétés japonaises sur des données périmées alors que des
> publications plus récentes existaient.

## La règle

1. **Aucun chiffre de mémoire.** Tout point de marché — cours, capitalisation,
   volume, nombre d'actions — vient d'un outil de la session (IBKR en priorité,
   FMP ou Alpha Vantage sinon), avec sa **date affichée à côté du chiffre**.
   Un chiffre non daté ne se publie pas.

2. **Contrôle de fraîcheur avant d'écrire.** Avant la première ligne d'analyse :
   (a) dernier cours + date via IBKR ; (b) date du dernier document trimestriel
   publié par l'émetteur. Si le document le plus récent utilisé est antérieur au
   dernier trimestre publié, **s'arrêter et aller chercher le récent** — ne
   jamais compléter avec ce que le modèle « sait » de son entraînement.

3. **Spécifique Japon.** L'exercice fiscal clôt au 31 mars. Les résultats du
   trimestre avril-juin sont publiés **fin juillet à mi-août** — au moment
   d'écrire, ils existent probablement déjà pour la société étudiée : vérifier
   le dernier kessan tanshin (TDnet / IR de l'émetteur) avant d'écrire. Un
   « dernier rapport annuel » sorti de la mémoire d'entraînement a plus d'un an
   de retard. Même vigilance de calendrier pour la Corée (KOSDAQ) et Taïwan
   (TWSE/TPEx) : les publications intermédiaires locales précèdent souvent de
   plusieurs semaines leur reprise par les agrégateurs.

3 bis. **Chercher dans la langue de l'émetteur.** Une société japonaise qui
   dépose ses comptes en japonais ne se trouve pas avec une recherche en
   anglais : chercher **決算短信**, pas « earnings release ». Passer par
   l'agrégateur de dépôts officiel — **TDnet/EDINET** (Japon), **MOPS**
   (Taïwan), **DART** (Corée) — plutôt que par le site IR, qui renvoie
   souvent des 404, et lire le PDF déposé. « Mes connecteurs n'ont pas la
   donnée » n'est pas « la donnée est introuvable » : un blocage d'outil sur
   une source ne dit rien des autres. Et le calcul des coûts est toujours
   défavorable à la question : demander une donnée publique à l'utilisateur
   coûte deux allers-retours ; la trouver coûte moins de trois appels d'outils.
   **Chercher d'abord, demander ensuite.**

4. **Datation systématique.** Chaque rapport porte une date d'arrêté des
   données en tête, et chaque chiffre d'émetteur cite son document source et sa
   date. En cas de conflit entre deux sources, **publier l'écart** — ne jamais
   choisir en silence.
