import type { IdeaItem } from '@/data/ideaReports'

/* Les thèses ouvertes, en français. Tenues hors de dict-fr.ts parce que ce
 * sont les seules entrées du dictionnaire qui portent de la recherche réelle :
 * elles changent à leur propre rythme, elles sont redatées, et elles doivent
 * se relire comme un fichier plutôt que comme un diff enfoui dans un objet de
 * traduction de 900 lignes.
 *
 * Les huit rapports ont été refabriqués le 7 août 2026 après la découverte
 * d'une erreur de méthode sur l'année terminale. Les cartes portent un
 * marqueur REFAIT, et plusieurs chiffres ont beaucoup bougé.
 * Données arrêtées au 6 août 2026. */
export const ideasFr: IdeaItem[] = [
  {
    id: 'IDEA-01',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'AI INFRA',
    company: 'Nebius Group N.V.',
    tickers: ['NBIS'],
    revised: 'REFAIT 07.08',
    report: 'nbis',
    title: 'Nebius : la contrainte est le raccordement, pas la demande',
    thesis:
      'Fin 2025, Nebius revendiquait plus de trois gigawatts de puissance contractée pour environ 170 mégawatts réellement actifs et facturants, soit 5,7 %. La société a signé plus de 32 milliards de dollars de contrats fermes avec Microsoft et Meta : la demande n\'est pas la contrainte. Ce qui limite la croissance est la capacité à raccorder, refroidir et énergiser — un risque de permis, pas un risque de marché. Le chiffre d\'affaires est passé de 91,5 M$ en 2024 à 529,8 M$ en 2025 puis à 399,0 M$ sur le seul T1 2026 : l\'exécution est réelle. Mais tout modèle qui valorise linéairement les gigawatts contractés se trompe d\'un facteur dix-sept.',
    entry:
      'Le seul dossier du lot où le cours se situe à l\'intérieur de la fourchette de nos scénarios : 189,88 $ contre un objectif pondéré de 156,90 $, un cas central à 109,57 $ et un cas haussier à 484,08 $. Le point d\'entrée se juge sur la réplication du financement garanti de juillet — 775 M$ à SOFR + 250 points de base, couvrant plus de 100 % du capex du contrat adossé. Chaque opération de ce type retire de la dilution future. À noter aussi : la valeur d\'entreprise de 47,8 Md$ implique un multiple de sortie de 7,3x sur notre EBITDA central 2033, contre 5,0x produit par notre propre valeur terminale — ici, le marché est plus prudent que nous.',
    invalidation:
      'Des mégawatts raccordés nettement sous la fourchette guidée de 800 à 1 000 MW fin 2026, ou un refus définitif de l\'extension de Vineland — le site qui sert le contrat Microsoft de 17,4 Md$. Le 6 août, une audience d\'urbanisme contestée dans cette commune du New Jersey a fait perdre 13,3 % au titre : une réunion municipale dans une ville de 60 000 habitants a effacé plus de six milliards de dollars de capitalisation. Et lisez l\'avertissement sur le taux : à 8 %, la même trajectoire centrale vaut 332 $, ce qui inverse entièrement la conclusion.',
    horizon: 'T2 le 12 août 2026, bon NVIDIA exerçable le 11 septembre 2026, guidance de fin 2026, trajectoire jusqu\'en 2033.',
    discountRate:
      '10,80 % de coût moyen pondéré du capital, sur un bêta retenu à 1,60 contre 1,43 observé. Sur ce dossier, le taux d\'actualisation est l\'hypothèse dominante, devant la conversion des mégawatts — à 8 %, le titre ressort à 332 $ contre une clôture à 189,88 $',
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
    company: 'Energy Vault Holdings',
    tickers: ['NRGV'],
    revised: 'REFAIT 07.08',
    report: 'nrgv',
    title: 'Energy Vault : le carnet de commandes qui n\'en est pas un',
    thesis:
      'Energy Vault communique un carnet de 1,35 milliard de dollars. Le même dépôt SEC chiffre ses obligations de prestation contractuelles à 142,4 millions, soit 10,5 % du chiffre affiché. L\'écart tient à une définition maison qui inscrit au carnet le chiffre d\'affaires futur que la société espère se verser à elle-même sur des actifs qu\'elle possède. Notez aussi ce qu\'est devenue l\'activité : 96 % du chiffre d\'affaires vient de l\'intégration de batteries lithium classiques, et la gravité — la technologie fondatrice — ne génère aucun revenu identifiable.',
    entry:
      'Pas d\'entrée à ce niveau. Trois signaux vérifiables sur pièces conditionnent le dossier : le bouclage des financements de projet SOSA et Stoney Creek à des conditions d\'infrastructure, le retour du ratio de couverture de Cross Trails au-dessus de son seuil contractuel, et l\'arrêt du recours aux débentures à conversion flottante. Aucune de nos approches ne rejoint le cours de 2,96 $ — ni le DCF par scénario à 0,17 $, ni la somme des parties à 0,89 $, ni la moyenne pondérée à 0,78 $.',
    invalidation:
      'La thèse tombe si les obligations ASC 606 du T2 2026 remontent fortement en proportion du carnet communiqué, ou si un financement sans recours est annoncé sous 9 %. Un avertissement qui a sa place sur la même carte : à 8 % de taux d\'actualisation, le cas central passe au-dessus du cours. La conclusion baissière dépend ici du coût du capital retenu, pas de la trajectoire d\'exploitation.',
    horizon: 'T2 le 11 août 2026, test du covenant de Calistoga le 30 novembre 2026, trajectoire jusqu\'en 2033.',
    discountRate:
      '14,23 % de coût moyen pondéré du capital, sur un bêta retenu à 1,80 contre 1,17 observé, plus une prime de taille de 3 points — c\'est le levier qui décide du résultat, et il joue contre la société',
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
    company: 'Digi Power X',
    tickers: ['DGXX'],
    revised: 'REFAIT 07.08',
    report: 'dgxx',
    title: 'Digi Power X : un seul contrat, et un chiffre que personne ne publie',
    thesis:
      'Digi Power X vaut environ 370 millions de dollars sur la promesse d\'un seul contrat de colocation — 40 mégawatts loués à Cerebras, 1,1 milliard sur dix ans, signé le 4 mai 2026 — qui n\'a encore produit aucun revenu. Le seuil de rentabilité se situe à 9,11 millions de dollars de capex par mégawatt : au-dessus, le contrat détruit de la valeur ; en dessous, il en crée. L\'émetteur ne publie pas ce chiffre. Et les 370 millions eux-mêmes ne sont pas fermes : sur le nombre d\'actions périmé du 10-Q, la capitalisation ressort à 342 millions.',
    entry:
      'L\'entrée dépend d\'une donnée, pas d\'un niveau. Le capex par mégawatt et le financement de projet de la phase 2 — condition suspensive portant sur 63 % du contrat — décident du signe du résultat. Tant que ni l\'un ni l\'autre n\'est publié, toute position est un pari sur une variable inconnue. Le seul indicateur qui flatte le dossier est réel : environ 5,4 M$ de valeur d\'entreprise par mégawatt contracté contre 10 à 22 M$ pour les comparables — mais ces comparables sont diversifiés et plusieurs bénéficient d\'un rehaussement de crédit.',
    invalidation:
      'À la hausse : un financement sans recours à 9-10 % couplé à un capex sous 9 M$/MW valide le cas haussier. À la baisse : un glissement de la mise en service du 15 décembre 2026, ou un nombre d\'actions au 10-Q du 14 août approchant 115 millions — au-delà, plus aucun cas haussier défendable n\'atteint le cours. À 98,54 millions d\'actions, le cas haussier ressort à 3,78 $ contre une clôture à 3,75 $ ; à 115 millions, à 3,24 $. Cette page de garde est un événement binaire.',
    horizon: 'T2 le 14 août 2026, phase 1 visée au 15 décembre 2026, 40 MW fin T1 2027, contrat jusqu\'en 2036.',
    discountRate:
      '15,98 % de coût moyen pondéré du capital, sur un bêta retenu à 2,40 contre 6,19 observé — l\'héritage minier n\'est pas le risque de l\'activité future. Valeur terminale résiduelle d\'actif au bear et au base, perpétuité au bull seulement. À 8 %, la conclusion tient : l\'écart vient du capex par mégawatt, pas du taux',
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
    company: 'Recursion Pharmaceuticals',
    tickers: ['RXRX'],
    revised: 'REFAIT 07.08',
    report: 'rxrx',
    title: 'Recursion : la plateforme contre le temps',
    thesis:
      'Recursion a poussé l\'industrialisation de la découverte de médicaments par l\'IA plus loin que quiconque : 2,2 millions d\'échantillons traités par semaine, 36 pétaoctets de données propriétaires, et plus de 500 M$ encaissés auprès de Roche, Sanofi, Bayer et Merck KGaA. Aucun médicament découvert par Recursion n\'a encore franchi la phase 2 avec un signal d\'efficacité robuste. La question n\'est pas de savoir si la plateforme fonctionne, mais combien de temps il reste et combien d\'actions il faudra créer pour le savoir.',
    entry:
      'Lisez le chiffre comme une somme des parties, pas comme un DCF. Le DCF se disqualifie lui-même ici : la valeur terminale ressort à −172 % de la valeur d\'entreprise, parce que la valeur actualisée des dix premières années est négative de 931 M$. Descendez le taux d\'actualisation à 2 % — un niveau absurde — et la valeur par action ne monte pas, elle tombe à −8,89 $, parce qu\'un taux plus bas augmente davantage la valeur actualisée de dix ans de pertes que la valeur terminale. Le chiffre qui compte est donc la somme des parties : 542,6 M$ de trésorerie nette, plus 212 M$ de pipeline probabilisé, plus la valeur de la plateforme, moins 660 M$ de coût de la dilution nécessaire. REC-4881 pèse à lui seul 48 % de ce pipeline.',
    invalidation:
      'REC-4881 ne tenant pas son efficacité au CGA-IGC de novembre 2026, ou un financement réalisé près du cas baissier — où il faut lever 2,1 Md$ à 1,90 $ et créer plus de deux fois les 536 millions d\'actions existantes, contre 21 % de dilution seulement dans le cas haussier. Le chiffre d\'affaires du T2 2026, à 7,7 M$, recule de 60 % sur un an et ressort 36,9 % sous le consensus, avec une perte nette de 131,0 M$ et 197,1 M$ de trésorerie consommés sur le semestre.',
    horizon: 'Jusqu\'aux résultats cliniques. Runway guidé « into early 2028 », formulation réaffirmée le 5 août 2026.',
    discountRate:
      '12,9 % sur le cas central (11,9–14,9 % sur les trois) — mais l\'objectif n\'est pas une sortie de DCF. Le DCF n\'est publié que pour montrer pourquoi il ne peut pas servir sur ce dossier',
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
    company: 'Intuitive Surgical',
    tickers: ['ISRG'],
    revised: 'REFAIT 07.08',
    report: 'isrg',
    title: 'Intuitive Surgical : le monopole a rendez-vous',
    thesis:
      'Onze mille sept cent dix robots da Vinci placés et plus de 3,2 millions de procédures en 2025, à 66 % de marge brute, 31 % de marge opérationnelle, 8,6 Md$ de trésorerie et zéro dette. C\'est l\'une des plus belles machines de la medtech, et le titre a perdu 38 % depuis son plus-haut. Deux choses se sont produites en même temps : la croissance des procédures américaines est tombée à +12 % au T2 2026, et le 22 juillet la FDA a autorisé OTTAVA de Johnson & Johnson sur dix procédures de chirurgie générale — le cœur du volume da Vinci.',
    entry:
      'Tout le débat sur cette valeur tient dans 286 points de base. Notre cas central ressort à 217 $ contre un cours de 373,71 $, à 10,86 % de coût du capital — soit le bêta observé de 1,46 ajusté de Blume à 1,308. Gardez la trajectoire d\'exploitation strictement inchangée et passez le taux à 8 %, le rendement long terme des actions américaines, et le même modèle donne 351 $, six pour cent sous le marché. Cinquante-huit pour cent de la valeur se situe au-delà de 2035 : le taux domine tout. Quelqu\'un qui dit qu\'ISRG vaut 500 $ et quelqu\'un qui dit 250 $ peuvent être d\'accord sur toutes les hypothèses opérationnelles.',
    invalidation:
      'Une réaccélération de la croissance des procédures américaines au-dessus de 15 % réinitialiserait à elle seule le cas baissier. Dans l\'autre sens, OTTAVA convertissant des placements plutôt que passant simplement la FDA transformerait un événement réglementaire en événement commercial. Une réserve sur les chiffres eux-mêmes : notre cas haussier ressortait d\'abord 0,4 % sous le cours, ce qui échoue au test bloquant, et ses hypothèses ont été élargies jusqu\'à ce qu\'il passe à +2,2 %. Un cas haussier calibré pour atteindre le cours n\'est pas un cas haussier découvert, et la fourchette doit se lire en le sachant.',
    horizon: 'Pluriannuel. Sur cette valeur, la duration est la thèse.',
    discountRate:
      '10,86 % de coût moyen pondéré du capital sur le cas central (9,08–11,86 % sur les trois), sur le bêta observé plutôt que sur un bêta supposé. À 8 %, le modèle donne 351,36 $ contre 373,71 $ — la conclusion ne s\'inverse pas, elle s\'efface',
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
    company: 'TransMedics Group',
    tickers: ['TMDX'],
    revised: 'REFAIT 07.08',
    report: 'tmdx',
    title: 'TransMedics : un organe, une thèse',
    thesis:
      'TransMedics a construit en cinq ans le seul réseau intégré de prélèvement, de perfusion et de transport d\'organes des États-Unis, et le chiffre d\'affaires a été multiplié par 2,5 depuis 2023. Deux choses nuancent cela : 78 % du chiffre d\'affaires organes vient du foie, et la marge opérationnelle ajustée est passée de 23,2 % à 13,6 % en un an. Aucun des deux métiers n\'a perdu de marge — la marge brute produit s\'est même améliorée. C\'est le poids croissant de la logistique qui tire la moyenne vers le bas.',
    entry:
      'La conclusion s\'inverse à 8 %, et c\'est la phrase la plus importante de cette carte. Notre cas central ressort à 64,30 $ contre un cours de 78,74 $ — 18,3 % en dessous — à 10,33 % de coût du capital dérivé du bêta observé de 1,88. Gardez la trajectoire d\'exploitation strictement inchangée et actualisez à 8 %, le rendement long terme des actions américaines, et les mêmes flux valent 110,06 $, soit 39,8 % au-dessus du marché. Ce rapport ne dit pas que TransMedics vaut moins : il dit qu\'elle vaut moins au taux que nous exigeons. Le chiffre d\'affaires du T2 2026, à 189,9 M$, est un record absolu, en hausse de 21 %.',
    invalidation:
      'La montée en puissance du cœur ou du poumon élargirait la thèse plutôt qu\'elle ne la terminerait — la concentration sur le foie est le risque, pas le plafond, et les États-Unis réalisent environ 12 344 greffes de foie par an, en croissance d\'environ 8 %. Le risque vif est juridique : la partie du litige boursier qui attaque le cœur du modèle commercial a survécu à sa motion to dismiss et se trouve en phase de discovery. Notez que le cas baissier n\'a besoin d\'aucune catastrophe — ni rappel produit, ni perte d\'agrément, ni fraude — seulement que le foie sature.',
    horizon: '2026-2027, sur le glissement de mix et sur la discovery.',
    discountRate:
      '10,33 % de coût moyen pondéré du capital sur le cas central (9,33–11,58 % sur les trois), 3 % de croissance perpétuelle. À 8 %, la même trajectoire vaut 110,06 $ contre une clôture à 78,74 $ — la conclusion s\'inverse',
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
    company: 'Rocket Lab · AST SpaceMobile',
    tickers: ['RKLB', 'ASTS'],
    revised: 'REFAIT 07.08',
    report: 'rklb-asts',
    title: 'Deux paris spatiaux, une même question : que faut-il croire sur 2035 ?',
    thesis:
      'Rocket Lab et AST SpaceMobile sont valorisées sur la même base — la croyance — alors qu\'elles n\'ont rien en commun industriellement. L\'une a 92 lancements réussis, 2,2 Md$ de carnet et une acquisition de 8 Md$ en cours ; l\'autre a douze satellites en orbite sur les 45 à 60 visés et aucun revenu commercial. Nos scénarios pondérés donnent 12,98 $ et 29,40 $ ; le marché demande 78,89 $ et 68,50 $.',
    entry:
      'Il n\'y a pas de niveau d\'entrée à donner : le désaccord n\'est pas sur le prix mais sur la trajectoire. Ce qui rendrait le dossier RKLB différent est un premier vol Neutron réussi, qui déverrouille jusqu\'à 5,6 Md$ d\'ordres de mission NSSL aujourd\'hui inaccessibles — le seul événement qui déplace le cas central vers le cas haussier. Pour ASTS, c\'est la cadence de lancement : sans un lancement tous les 45 jours d\'ici décembre, l\'objectif de couverture continue des États-Unis tombe, et avec lui la trajectoire de revenus 2028-2030. Retourné, le cours implique un taux d\'actualisation de 4,50 % pour RKLB, ou 66,9 Md$ de chiffre d\'affaires 2035 — 87 % de ce que fait Lockheed Martin aujourd\'hui ; pour ASTS, 6,63 %, ou 18,4 Md$, soit 1,2 fois le marché mondial du direct-to-device estimé pour 2035.',
    invalidation:
      'La lecture baissière tombe si Neutron vole avec succès au T4 2026 et remporte des ordres de mission NSSL dans les douze mois ; si Rocket Lab chiffre des synergies Iridium supérieures à 300 M$ par an, ce qui rendrait défendable le prix de 8 Md$ ; si AST SpaceMobile atteint 45 satellites en orbite d\'ici mi-2027 et publie un partage de revenus opérateurs supérieur à 50 % ; ou si le marché du direct-to-device est réévalué d\'un ordre de grandeur au-dessus des 15,5 Md$ estimés pour 2035. Une réserve de méthode : ce rapport porte quatre scénarios, pas trois. Le quatrième — un cas « ciel bleu » à 92,01 $ pour RKLB et 156,53 $ pour ASTS, pondéré 5 % et 7 % — a été ajouté pour que la fourchette encadre le cours, ce qui est le test bloquant du lab. Les objectifs pondérés ci-dessus sont calculés sur les quatre.',
    horizon: 'T2 pour les deux le 10 août 2026 après clôture. Premier vol Neutron visé au T4 2026, clôture Iridium attendue mi-2027, trajectoire modélisée jusqu\'en 2035.',
    discountRate:
      '13,5 % pour RKLB et 14,0 % pour ASTS dans le cas central — taux sans risque 4,65 %, prime de risque actions 4,75 %, bêtas ramenés à 1,90 et 2,10 contre 2,55-2,63 et 2,68-2,75 observés, par convergence sur dix ans. Une variante financement de projet est calculée à 9-10 %',
  },
  {
    id: 'IDEA-08',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'MATERIALS',
    company: 'ALUULA Composites',
    tickers: ['AUUA.V'],
    revised: 'REFAIT 07.08',
    report: 'auua',
    title: 'ALUULA Composites : le pari de la largeur',
    thesis:
      'ALUULA fusionne du polyéthylène à très haut poids moléculaire en un laminé sans colle, à Victoria, en Colombie-Britannique. Le chiffre d\'affaires a progressé de 90 % au premier semestre de son exercice 2026, avec une marge brute stable dans les bas quarante pour cent depuis six trimestres, et l\'usine tourne désormais à 100 % de sa capacité. Tout ce que la société veut faire ensuite — abris, panneaux structurels, défense, aérospatiale — est verrouillé par une seule contrainte physique : la largeur de rouleau. Victoria produit 0,925 mètre ; Vancouver est construite pour 1,5. Les 128 millimètres qui comptent sont ceux qui font passer ALUULA au-dessus des 54 pouces autour desquels le textile technique découpe ses patrons.',
    entry:
      'Pas un niveau de cours. La logique d\'entrée est le verrou de capacité : Victoria est pleine et ne sait faire que des rouleaux de 0,925 mètre, donc le chiffre d\'affaires plafonne autour de 12 M CA$ jusqu\'à l\'ouverture de Vancouver à 1,5 mètre. C\'est un événement daté, binaire et vérifiable, pas un récit. Qui prend une position avant paie un résultat qui n\'a pas été démontré ; qui attend paie un autre prix pour beaucoup moins d\'incertitude. Les deux blocs de gré à gré passés à 3,30 CA$ — le placement de février et la cession du fondateur en juillet, à cinq mois d\'écart — sont les seuls prix auxquels de la taille s\'est réellement traitée.',
    invalidation:
      'Vancouver non opérationnelle en 1,5 mètre au 31 octobre 2026 serait le premier engagement rompu du bilan de cette direction, et cela retire le verrou de tous les marchés hors sports de glisse. Un deuxième recul séquentiel consécutif du carnet publié, après la chute de 3,5 à 2,7 M CA$ au T2, résoudrait l\'ambiguïté centrale dans le mauvais sens. Et une base de coûts dépassant 9 M CA$ annualisés avant que la nouvelle usine ne produise repousserait le seuil de rentabilité opérationnel d\'une année de scénario entière. Le chiffre d\'affaires défense publié est, et a toujours été, nul.',
    horizon: 'Résultats du T3 2026 vers le 29 septembre 2026, prise de possession de Vancouver en octobre 2026, clôture de l\'exercice le 31 octobre 2026, trajectoire modélisée jusqu\'en 2029.',
    discountRate:
      '11,43 % de coût moyen pondéré du capital — 4,69 % de taux sans risque, un bêta de 0,89 dérivé des pairs, et une prime de taille et d\'illiquidité de 3,0 % portée sur sa propre ligne. Mais aucun taux ne tranche ce dossier : les deux méthodes divergent d\'un facteur proche de neuf, 0,64 CA$ pour le DCF pondéré contre 5,65 CA$ pour le multiple pondéré, parce que la VE / marge brute est neutre à la marge et aveugle au coût d\'exploitation. Le rapport publie les deux et n\'en fait pas la moyenne',
    scenarios: [
      { label: 'BEAR', prob: 30, tone: 'down' },
      { label: 'BASE', prob: 45, tone: 'mid' },
      { label: 'BULL', prob: 25, tone: 'up' },
    ],
  },
]
