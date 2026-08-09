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
    revised: 'REFAIT',
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
    revised: 'REFAIT',
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
    revised: 'REFAIT',
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
    revised: 'REFAIT',
    report: 'rxrx',
    title: 'Recursion : la plateforme contre le temps',
    thesis:
      'Recursion a poussé plus loin que quiconque l\'industrialisation de la découverte de médicaments par l\'intelligence artificielle : 36 pétaoctets de données propriétaires, 2,2 millions d\'échantillons traités par semaine, plus de 500 millions de dollars encaissés auprès de Roche, Sanofi, Bayer et Merck KGaA. Mais aucune molécule issue de la plateforme n\'a franchi la phase 2 avec un signal d\'efficacité robuste, et le seul programme qui la prouverait — REC-7735 — ne livre pas de données avant le premier semestre 2028.',
    entry:
      'Ce n\'est pas un dossier de flux, c\'est une option sur une méthode : prix d\'exercice 557 millions de dollars de trésorerie, échéance « early 2028 ». Le seul validateur externe qui compte est l\'exercice d\'option par un partenaire pharmaceutique — Genentech l\'a fait le 5 août 2026 sur sa première cible neuroscience, portant le cumulé encaissé à 216 millions. Un nouvel accord à upfront à trois chiffres est la seule source de trésorerie non dilutive. Notre objectif pondéré ressort à 0,99 $ contre une clôture à 3,125 $ — baissier 0,00 $, central 0,24 $, haussier 4,47 $.',
    invalidation:
      'Les données de phase 2 de REC-4881 au congrès CGA-IGC de novembre 2026 sont le seul événement binaire de l\'année : ce programme porte à lui seul près de la moitié du pipeline probabilisé. Un échec y efface l\'essentiel de la valeur hors trésorerie. À l\'inverse, la thèse baissière ne survit ni à un accord partenarial majeur, ni à une opération de fusion-acquisition — 38 opérations biotech depuis janvier, le meilleur rythme en sept ans.',
    horizon: 'CGA-IGC en novembre 2026, trois readouts groupés au S1 2027, fin du runway guidé début 2028, premières données de REC-7735 au S1 2028.',
    discountRate:
      '12,88 % de coût des fonds propres — bêta observé 0,995 ajusté de Blume à 0,997, majoré d\'une prime de taille et d\'exécution de 3,5 points. AVERTISSEMENT MÉTHODE : la part de valeur terminale du cas central ressort à −172 %, la période explicite détruit de la valeur et la valeur d\'entreprise du seul flux d\'exploitation est négative de 342 millions. Le DCF n\'est pas l\'outil adapté ; le chiffre publié vient de la somme des parties — trésorerie nette, plus valeur actualisée probabilisée du pipeline, plus plateforme, moins le coût de la dilution nécessaire. À 2 % de taux d\'actualisation, la valeur par action est négative : aucun coût du capital ne rend ce dossier attrayant par actualisation de flux',
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
    revised: 'REFAIT',
    report: 'isrg',
    title: 'Intuitive Surgical : le monopole a rendez-vous',
    thesis:
      'Pendant vingt ans, Intuitive n\'a pas eu de concurrent occidental crédible. Le 22 juillet 2026, six jours après la publication de son deuxième trimestre, la FDA a autorisé OTTAVA de Johnson & Johnson sur dix procédures de chirurgie générale — le segment que la direction d\'Intuitive désigne elle-même comme son premier moteur de croissance américain. Sur le call de la veille, aucun concurrent n\'avait été cité.',
    entry:
      'L\'entrée se juge sur le rythme d\'adoption d\'OTTAVA sur ses douze premiers mois, pas sur son autorisation. Karl Storz vient de démontrer que l\'obstacle est l\'écosystème et non le feu vert réglementaire : le groupe a arrêté Senhance et abandonné Luna le 22 juin 2026, deux ans après avoir racheté Asensus. Un lancement lent et sans traction valide le cas haussier ; 75 % du chiffre d\'affaires d\'Intuitive est récurrent et une perte de part sur les placements met sept à dix ans à se voir dans les comptes. Notre objectif pondéré ressort à 237,56 $ contre une clôture à 373,71 $ — baissier 134,38 $, central 216,90 $, haussier 382,04 $.',
    invalidation:
      'Trois conditions tiennent la thèse haussière et une seule suffit à la casser : la croissance des procédures américaines sous 10 % — elle est à 12 % au T2 2026 contre 20 % hors États-Unis —, une hausse des taux longs, ou OTTAVA au-delà d\'un placement américain sur cinq. La substitution par les GLP-1 est un quatrième risque, non chiffrable : Intuitive ne publie pas son mix par procédure. Une réserve sur les chiffres eux-mêmes : notre cas haussier ressortait d\'abord 0,4 % sous le cours, ce qui échoue au test bloquant, et ses hypothèses ont été élargies jusqu\'à ce qu\'il passe à +2,2 %. Un cas haussier calibré pour atteindre le cours n\'est pas un cas haussier découvert, et la fourchette doit se lire en le sachant.',
    horizon: 'T3 2026 en octobre — premier trimestre complet après la réforme de remboursement japonaise du 1er juin et après OTTAVA, avec des comparables plus difficiles annoncés ; décision FDA sur les 510(k) Hugo au T3-T4 ; clarté sur les codes de facturation chinois pas avant 2027 ; trajectoire jusqu\'en 2035.',
    discountRate:
      '10,86 % de coût des fonds propres, égal au coût moyen pondéré puisque la société n\'a aucune dette financière — bêta observé 1,460 ajusté de Blume à 1,308, retenu sans écart. Le cours implique un bêta observé de 0,47, entre celui de Johnson & Johnson (0,235) et de Coca-Cola (0,349). À 8 %, la conclusion ne s\'inverse pas mais l\'écart tombe à −6,0 % : il est presque entièrement un écart de coût du capital',
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
    revised: 'REFAIT',
    report: 'tmdx',
    title: 'TransMedics : un organe, une thèse',
    thesis:
      'TransMedics tire 78 % de son chiffre d\'affaires organes du seul foie, sur un marché américain de 12 344 greffes par an qui croît de 8 %. La compression de marge n\'est pas un accident : le service — perfusion, logistique, aviation — est passé de 27 % à 41 % du chiffre d\'affaires en trois ans, à 28-35 % de marge brute contre 79 % sur le produit. Le mix, pas les métiers, explique la baisse.',
    entry:
      'Le dossier ne se joue pas sur un niveau mais sur un embranchement. Trois faits vérifiables le décident : l\'approbation du supplément IDE ENHANCE Part B avec CHOPS, qui ouvre le cœur et le poumon ; le retour de la marge opérationnelle au-dessus de 16 % sans révision de la croissance, qui prouverait le levier logistique ; et le taux de couverture interne de la flotte, passé de 82 % à 86 % en un trimestre. Le troisième est le seul qui progresse aujourd\'hui. Notre objectif pondéré ressort à 65,68 $ contre une clôture à 78,74 $ — baissier 16,87 $, central 64,30 $, haussier 126,74 $.',
    invalidation:
      'La thèse tombe si la pénétration hépatique plafonne — une croissance du chiffre d\'affaires sous 10 % dès 2028 suffit — ou si le volet « forced bundling » de Jewik v. TransMedics (1:25-cv-10385), qui a survécu à sa motion to dismiss le 29 juillet 2026 et passe en discovery, contraint la manière de vendre le National OCS Program. Le NOP intégré n\'est pas un canal de distribution, c\'est le modèle économique.',
    horizon: 'ENHANCE Part A avant fin 2026, IDE Part B au T3-T4, option d\'achat du siège de Somerville le 31 décembre 2027, échéance des convertibles le 1er juin 2028, trajectoire jusqu\'en 2035.',
    discountRate:
      '10,33 % de coût moyen pondéré du capital — bêta observé 1,881 ajusté de Blume à 1,590, 75,8 % de capitaux propres et 24,2 % de dette à 6,0 % avant impôt. AVERTISSEMENT : à 8 %, la conclusion s\'inverse et le titre ressort à 110,06 $ — sur ce dossier, le taux d\'actualisation décide du signe',
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
    revised: 'REFAIT',
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
    revised: 'REFAIT',
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
  {
    id: 'IDEA-09',
    date: '2026-08-06',
    status: 'WATCHING',
    sector: 'AI INFRA',
    company: 'Meta Platforms',
    tickers: ['META'],
    report: 'meta',
    title: 'Meta : la dépréciation qui n\'est pas encore arrivée',
    thesis:
      'Meta a publié le meilleur trimestre publicitaire de son histoire — 60,80 Md$, +28 % — et perdu 9,6 % en après-Bourse. Le débat public a porté sur une charge juridique de 2,4 Md$. Le vrai sujet est ailleurs : 80,3 Md$ d\'actifs en construction qui ne se déprécient pas encore — 27,4 % du parc brut — et 347 Md$ d\'engagements de location signés qui ne figurent pas au bilan, soit 3,1 fois la dette qui y figure. La marge opérationnelle est passée de 43,0 % à 30,9 %, et seuls six de ces douze points environ sont exceptionnels.',
    entry:
      'Le marché price le plan, avec une prime modeste. Trois trajectoires publicitaires, construites à partir des impressions et du prix séparément : la trajectoire plan vaut environ 628 $ contre une clôture à 589,47 $ — 6,5 % au-dessus — au coût du capital par défaut de 8,5 % ; la trajectoire idéale 1 101 $ ; le retour à la moyenne 393 $. Le consensus des 62 analystes, à 756,95 $, se situe entre le plan et l\'idéal. L\'asymétrie à garder en tête : la dépréciation atteint environ 118 Md$ par an en 2031 dans la trajectoire centrale contre 26 Md$ aujourd\'hui, et cette charge est déjà déterminée par des contrats signés, alors que le revenu censé l\'absorber dépend des agents personnels — une catégorie de produits que personne n\'a encore livrée à l\'échelle du grand public.',
    invalidation:
      'Le chiffre qui fait basculer le dossier : la croissance du prix publicitaire, +12 % au T2 2026, porte la moitié de la croissance et toute la thèse « l\'IA améliore le cœur de métier » — sous +6 % pendant deux trimestres consécutifs, le retour à la moyenne devient le scénario central. Le free cash flow est négatif en 2026 et 2027 dans les trois trajectoires (0,78 Md$ au T2 contre 8,55 un an plus tôt, capex à 51 % du CA). Et notez où loge le vrai risque : avec une valeur terminale à 89 % de la valeur d\'entreprise, passer le taux de 7,5 % à 9,5 % déplace la trajectoire plan de 787 $ à 518 $ — un écart plus large que celui entre le plan et le retour à la moyenne. Le principal risque n\'est pas que les agents ne se vendent pas ; c\'est que les taux longs ne baissent pas.',
    horizon: 'Connect le 23 septembre 2026 (les lunettes, et les agents personnels s\'ils existent), résultats T3 fin octobre — premier chiffrage du capex 2027, procès américains sur les mineurs au S2, baux Hyperion entrant au bilan à partir de 2029.',
    discountRate:
      '8,5 % de coût moyen pondéré du capital et 3,0 % de croissance à l\'infini, valeurs par défaut du modèle interactif. Les trois trajectoires ne portent aucune pondération de probabilité — le rapport nomme ce que chacune exige et valorise les trois, et la carte n\'invente aucun poids',
  },
]
