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

4. **Datation systématique.** Chaque rapport porte une date d'arrêté des
   données en tête, et chaque chiffre d'émetteur cite son document source et sa
   date. En cas de conflit entre deux sources, **publier l'écart** — ne jamais
   choisir en silence.
