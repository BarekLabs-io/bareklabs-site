import type { IdeaItem } from '@/data/ideaReports'

/* Les thèses ouvertes, en français. Voir ideas-en.ts pour la raison du fichier
 * séparé. Les identifiants, dates, secteurs, tickers, probabilités et slugs de
 * rapport doivent rester identiques d'une langue à l'autre : seul le texte est
 * traduit. Données arrêtées au 6 août 2026 pour l'ensemble du lot. */
export const ideasFr: IdeaItem[] = [
  {
    id: 'IDEA-01',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'AI INFRA',
    tickers: ['NBIS'],
    report: 'nbis',
    title: 'Nebius : l\'écart entre le contracté et l\'actif',
    thesis:
      'Fin 2025, Nebius revendiquait plus de trois gigawatts de puissance contractée. Environ 170 mégawatts produisaient réellement du chiffre d\'affaires, soit 5,7 %. L\'exécution est réelle — le chiffre d\'affaires est passé de 91,5 M$ en 2024 à 529,8 M$ en 2025, puis à 399,0 M$ sur le seul premier trimestre 2026. Mais tout modèle qui valorise linéairement les gigawatts contractés se trompe d\'un facteur dix-sept, et ce ratio est le seul chiffre qui doive gouverner la valorisation.',
    entry:
      'Fait rare dans ce lot : le marché ne paie pas plus que ce que notre modèle soutient. La valeur d\'entreprise de 48,5 Md$ implique un multiple de sortie de 7,4x sur l\'EBITDA 2033 de notre scénario central ; notre propre valeur terminale de Gordon ressort à 5,5x — le marché est plus prudent que nous. Le débat porte donc sur l\'exécution et non sur le prix, ce qui signifie aussi une faible marge d\'erreur dans les deux sens. 29 % du flottant est vendu à découvert.',
    invalidation:
      'Une conversion qui bloque sur les permis plutôt que sur la demande. Le 6 août, une audience d\'urbanisme contestée à Vineland, dans le New Jersey, a fait perdre 11 % au titre : ce site sert le contrat Microsoft de 17,4 Md$, et une réunion municipale a effacé six milliards de dollars de capitalisation. Le second signal est le financement : la dette garantie de 775 M$ de juillet couvre plus de 100 % du capex qu\'elle finance, et sa réplication sur les contrats Meta décide de la dilution que subit l\'actionnaire actuel.',
    horizon: 'Résultats du T2 le 12 août 2026. La trajectoire de conversion court jusqu\'en 2028.',
    discountRate: 'WACC 11,5 %, scénario central (10,5–13,5 % sur les trois)',
    scenarios: [
      { label: 'BEAR', prob: 32, tone: 'down' },
      { label: 'BASE', prob: 46, tone: 'mid' },
      { label: 'BULL', prob: 22, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-02',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'ENERGY',
    tickers: ['NRGV'],
    report: 'nrgv',
    title: 'Energy Vault : les dix pour cent',
    thesis:
      'Energy Vault communique un carnet de commandes de 1,35 Md$. Dans le même document déposé auprès de la SEC, ses obligations de prestation restantes au sens de la norme ASC 606 — le chiffre d\'affaires réellement contracté et pas encore reconnu — s\'élèvent à 142,4 M$. Soit 10,5 % du chiffre affiché. Cette thèse porte sur les 89,5 % restants : ce qu\'ils contiennent, pourquoi ils y sont, et ce qu\'ils valent.',
    entry:
      'Aucune de nos approches ne rejoint le cours de 3,01 $ — ni le DCF par scénario, ni la somme des parties, ni la moyenne pondérée par les probabilités. L\'écart est d\'un facteur trois à quatre, ce qui est assez large pour être une affirmation sur nos hypothèses autant que sur la société. Soit notre coût du capital et nos taux de conversion sont trop sévères, auquel cas la variante financement de projet donne 1,70 $ par action à 10 % et 2,42 $ à 9 %, soit le marché valorise une option sur le pipeline développé de 3,5 Md$ plutôt qu\'une trajectoire de flux.',
    invalidation:
      'Le bouclage de SOSA et Stoney Creek à des conditions d\'infrastructure normales casserait le scénario baissier à lui seul. Les renonciations de covenants du 26 juin rendent cela plus difficile, pas plus facile. C\'est le point à surveiller avant tous les autres.',
    horizon: 'Résultats du T2 le 11 août 2026. Les financements de projet décident de 2027.',
    discountRate: 'WACC 14,0 %, scénario central (12,5–16,5 % sur les trois)',
    scenarios: [
      { label: 'BEAR', prob: 35, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 20, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-03',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'AI INFRA',
    tickers: ['DGXX'],
    report: 'dgxx',
    title: 'Digi Power X : la date de décembre',
    thesis:
      'Une valorisation de 342 M$ repose sur un seul contrat : 40 mégawatts loués à Cerebras, 1,1 Md$ sur dix ans, signés le 4 mai 2026. À ce jour, il a produit zéro dollar de chiffre d\'affaires. La phase 1 — 15 des 40 mégawatts — a pour date cible de mise en service le 15 décembre 2026, et les 25 restants sont expressément conditionnés à un financement qui n\'est pas annoncé. Tout le dossier tient dans cette date et dans cette condition.',
    entry:
      'Pondérés sur nos trois scénarios, les fonds propres valent environ 0,83 $ contre un cours de 3,75 $. Le levier qui déplace ce chiffre est le coût du capital, pas l\'exploitation : les mêmes flux centraux valent 0,81 $ à 15,7 %, coût que nous reconstituons pour la société, et 2,18 $ à 9 %, coût plausible d\'une dette de projet sans recours adossée à un contrat de dix ans. L\'annonce d\'un financement de projet compte donc davantage que la date de décembre, parce qu\'elle la conditionne.',
    invalidation:
      'Une phase 1 qui glisse au-delà du premier trimestre 2027, ou une phase 2 jamais financée. Une réserve sur tous les multiples : notre nombre d\'actions de 91,09 millions provient de la couverture du 10-Q au 15 mai, et la trésorerie est passée de 57,8 M$ au 31 mars à environ 155 M$ au 3 juillet sans opération de dette — ce qui indique des émissions au fil de l\'eau au titre du programme porté à 175 M$ le 8 mai. La capitalisation et la valeur d\'entreprise sont donc probablement sous-estimées jusqu\'à la publication du 14 août.',
    horizon: 'Jusqu\'au 15 décembre 2026, puis la construction 2027-2028.',
    discountRate: 'WACC 15,5 %, scénario central (14,0–18,5 %). À 9 %, taux d\'une dette de projet sans recours, les mêmes flux valent 2,18 $',
    scenarios: [
      { label: 'BEAR', prob: 40, tone: 'down' },
      { label: 'BASE', prob: 42, tone: 'mid' },
      { label: 'BULL', prob: 18, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-04',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'BIOTECH',
    tickers: ['RXRX'],
    report: 'rxrx',
    title: 'Recursion : la plateforme contre le temps',
    thesis:
      'Recursion a poussé plus loin que quiconque l\'idée d\'industrialiser la découverte de médicaments par l\'intelligence artificielle : 2,2 millions d\'échantillons traités par semaine, 36 pétaoctets de données propriétaires, et plus de 500 M$ encaissés auprès de Roche, Sanofi, Bayer et Merck KGaA. Aucun médicament découvert par Recursion n\'a franchi la phase 2 avec un signal d\'efficacité robuste. La question n\'est pas de savoir si la plateforme marche, mais combien de temps il reste et combien d\'actions il faudra créer pour le savoir.',
    entry:
      'Le pipeline probabilisé ressort à 230 M$ de rNPV, et REC-4881 en représente à lui seul 48 % — le seul programme avec des données d\'efficacité publiées (charge polypeuse réduite de 43 % à la semaine 13, 53 % à la semaine 25) et deux désignations FDA. Rapporté à 1,68 Md$ de capitalisation et 556,8 M$ de trésorerie, le mécanisme qui domine tout est réflexif : le scénario fixe le prix d\'émission, et la dilution amplifie ensuite le scénario.',
    invalidation:
      'Un REC-4881 qui ne tient pas la profondeur de la semaine 25, ou une levée valorisée près du scénario baissier — dans ce cas, il faut créer plus de deux fois le nombre d\'actions existantes. Le chiffre d\'affaires du T2 2026, à 7,7 M$, était en baisse de 60 % sur un an et 36,9 % sous le consensus, pour une perte nette de 131,0 M$.',
    horizon: 'Jusqu\'aux résultats cliniques. Le runway est guidé « into early 2028 ».',
    discountRate: '13 % sur le DCF, 12 % sur le pipeline probabilisé',
    scenarios: [
      { label: 'BEAR', prob: 40, tone: 'down' },
      { label: 'BASE', prob: 40, tone: 'mid' },
      { label: 'BULL', prob: 20, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-05',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MEDTECH',
    tickers: ['ISRG'],
    report: 'isrg',
    title: 'Intuitive Surgical : le monopole a rendez-vous',
    thesis:
      'Onze mille sept cent dix robots da Vinci installés et plus de 3,2 millions de procédures en 2025, avec 66 % de marge brute, 31 % de marge opérationnelle, 8,6 Md$ de trésorerie et zéro dette. C\'est l\'une des plus belles machines de la medtech, et le titre a perdu 38 % depuis son plus haut. Deux choses se sont produites en même temps : la croissance des procédures américaines est tombée à +12 % au T2 2026, et le 22 juillet la FDA a autorisé OTTAVA de Johnson & Johnson sur dix procédures de chirurgie générale — le cœur du volume da Vinci.',
    entry:
      '65 % de la valeur se situe au-delà de 2035, ce qui en fait un actif de très longue duration et rend le taux d\'actualisation dominant. À 373,71 $, le cours implique un bêta de 0,75 — un titre qui bouge 25 % moins que l\'indice — sur une société qui vient de voir arriver son premier concurrent crédible en vingt ans. Notre cible pondérée par les probabilités ressort à 289,26 $.',
    invalidation:
      'Une croissance des procédures américaines qui repasse durablement au-dessus de 15 % réinitialiserait le scénario baissier à elle seule. Dans l\'autre sens, un OTTAVA qui convertit des placements et pas seulement une autorisation FDA transformerait un événement réglementaire en événement commercial.',
    horizon: 'Pluriannuel. Sur ce dossier, la duration est la thèse.',
    discountRate: 'WACC 9,5 %, sur un bêta supposé de 1,05–1,10 contre 1,46 observé. Passer le taux à 8,50 % ajoute plus de 100 $ par action',
    scenarios: [
      { label: 'BEAR', prob: 25, tone: 'down' },
      { label: 'BASE', prob: 50, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-06',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MEDTECH',
    tickers: ['TMDX'],
    report: 'tmdx',
    title: 'TransMedics : un organe, une thèse',
    thesis:
      'TransMedics a construit en cinq ans le seul réseau intégré de prélèvement, de perfusion et de transport d\'organes des États-Unis, et le chiffre d\'affaires a été multiplié par 2,5 depuis 2023. Deux nuances : 78 % du chiffre d\'affaires organes vient du foie, et la marge opérationnelle ajustée est passée de 23,2 % à 13,6 % en un an. Aucun des deux métiers n\'a perdu de marge — la marge brute produit a même progressé. C\'est le poids croissant de la logistique qui tire la moyenne vers le bas.',
    entry:
      'Le chiffre d\'affaires du T2 2026, à 189,9 M$, est un record absolu, en hausse de 21 % sur un an, pour une guidance 2026 de 737 à 757 M$. Le marché paie 78,74 $ pour cela ; notre cible pondérée ressort à 60,51 $. Le convertible a un prix d\'exercice de 94,00 $ et le capped call un plafond de 141,88 $, ce qui borne le point de départ et d\'arrivée de la dilution.',
    invalidation:
      'Une montée en charge du cœur ou du poumon élargirait la thèse au lieu d\'y mettre fin : la concentration sur le foie est le risque, pas le plafond. Le risque vif est judiciaire — la partie du litige qui attaque le cœur du modèle commercial a survécu à sa motion to dismiss et passe en phase de discovery.',
    horizon: '2026-2027, sur la bascule du mix et sur la discovery.',
    discountRate: 'WACC 10,5 %, croissance perpétuelle 3 %. Justifier le cours actuel demande 9,5 % ou moins avec au moins 3,5 % de croissance',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
  {
    id: 'IDEA-07',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'SPACE',
    tickers: ['RKLB', 'ASTS'],
    report: 'rklb-asts',
    title: 'Rocket Lab et AST SpaceMobile : deux paris spatiaux, une même question',
    thesis:
      'Deux dossiers de nature radicalement différente que le marché valorise aujourd\'hui sur la même base : la croyance. Rocket Lab est une société industrielle réelle — 92 lancements Electron réussis, 2,2 Md$ de carnet de commandes, 679,6 M$ de chiffre d\'affaires sur douze mois. AST SpaceMobile est une option d\'achat sur la téléphonie directe par satellite, un marché qui n\'existe commercialement pour personne aujourd\'hui, avec 84,9 M$ de chiffre d\'affaires et douze satellites en orbite.',
    entry:
      'Plutôt que de conclure « surévalué » et de s\'arrêter là, nous avons retourné le modèle pour demander ce que le cours exige. Justifier 78,42 $ pour RKLB suppose un taux d\'actualisation de 4,37 % — inférieur au rendement du 10 ans américain à 4,65 %, c\'est-à-dire une prime de risque négative sur l\'un des titres les plus volatils du Nasdaq, de bêta 2,63. À coût du capital inchangé, il faut à la place 88 Md$ de chiffre d\'affaires en 2035, davantage que Lockheed Martin aujourd\'hui. Pour ASTS, le même exercice demande 42 Md$ en 2035, contre un marché mondial du direct-to-device estimé à 15,5 Md$ par GM Insights — 2,7 fois son marché entier. La conclusion du rapport n\'est pas que ces titres valent le dixième de leur cours : c\'est qu\'ils sont valorisés comme des options — sur Neutron et le budget Golden Dome pour Rocket Lab, sur la valeur du spectre et un quasi-monopole du direct-to-device pour ASTS — et non comme des flux de trésorerie. C\'est une position défendable. Elle n\'est simplement pas exprimable par un DCF, et des deux, Rocket Lab est le dossier de meilleure qualité : revenus réels, carnet de commandes réel, diversification défense.',
    invalidation:
      'Un Neutron qui vole à l\'heure fin 2026 et un budget Golden Dome qui se convertit reconstruiraient le dossier Rocket Lab sur des fondamentaux plutôt que sur la croyance. Pour ASTS, le plancher tangible est la valeur du spectre, et 22,3 % du flottant est vendu à découvert : la convexité est réelle là même où le dossier de flux ne l\'est pas.',
    horizon: 'Résultats du T2 le 10 août 2026 pour les deux. Les questions du DCF inversé se tranchent entre 2027 et 2030.',
    discountRate: '13,5 % pour RKLB, 14,0 % pour ASTS — délibérément sous les 17,1 % qu\'impliquerait le bêta observé de 2,63, au motif que le bêta converge vers 1 sur dix ans',
  },
  {
    id: 'IDEA-08',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MATERIALS',
    tickers: ['AUUA.V'],
    report: 'auua',
    title: 'ALUULA Composites : le pari de la largeur',
    thesis:
      'ALUULA fusionne un laminé de polyéthylène à très haute masse moléculaire à Victoria, en Colombie-Britannique. Le chiffre d\'affaires a presque doublé au dernier trimestre, la marge brute tient la bande des 40-45 % depuis six trimestres consécutifs, et le titre a pris 271 % en un an. Presque tout ce qui suit dépend de 128 millimètres — la largeur que la ligne actuelle sait produire.',
    entry:
      'L\'usine tourne à 100 % de sa capacité : l\'exercice 2026 atterrira donc entre 11,0 et 12,2 M$ canadiens quelle que soit la demande, et les scénarios ne se séparent qu\'à partir de l\'exercice 2027, quand la contrainte cesse d\'être physique pour devenir commerciale. À la marge brute actuelle de 43 % et une base de coûts de 6,6 M$ canadiens, le point mort demande environ 15,3 M$ de chiffre d\'affaires annuel — soit 46 % de plus que les douze derniers mois, et 25 % de plus que le trimestre annualisé.',
    invalidation:
      'Des frais de structure de Vancouver qui arrivent avant le chiffre d\'affaires de Vancouver : chaque dollar de coût ajouté relève le point mort de plus de deux dollars. Noter aussi la structure de marché — environ 12 000 titres par jour, soit 45 000 $ canadiens de volume, aucune couverture d\'analyste et aucune guidance de la société. Le chiffre d\'affaires défense publié est, et a toujours été, nul.',
    horizon: 'L\'exercice 2027 est le premier où l\'extension peut contribuer.',
    discountRate: 'Pas de DCF. Les trois cas sont des hypothèses de marge brute — 40 %, 43 % et 45 % — pas des flux actualisés',
  },
]
