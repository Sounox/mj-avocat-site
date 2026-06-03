import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const origin = 'https://mj-avocat-site.abl-slancry.workers.dev';
const fontsHref = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap';
const trackingPlaceholder = [
  '<!-- PLAUSIBLE ANALYTICS — snippet à coller ici une fois fourni -->',
  '<!-- <script defer data-domain="..." src="https://plausible.io/js/script.js"></script> -->',
  '',
  '<!-- MICROSOFT CLARITY — snippet à coller ici une fois fourni -->'
].join('\n  ');

const faqMain = [
  {
    q: "Prendre un avocat, est-ce partir en guerre juridique ?",
    a: "Non. Faire appel à un avocat n'est pas synonyme de conflit ou d'escalade. C'est avant tout choisir d'être accompagné, conseillé et protégé dans une situation qui peut être juridiquement complexe ou émotionnellement difficile. Maître Morgane JOSEPH privilégie, chaque fois que cela est possible, des solutions apaisées et durables, dans une logique de dialogue et d'équilibre. Lorsque le désaccord persiste ou qu'un contentieux est inévitable, l'accompagnement se poursuit dans un cadre structuré, avec une défense engagée des intérêts du client."
  },
  {
    q: 'Puis-je payer en plusieurs fois ?',
    a: "Oui. Un échelonnement des honoraires peut être envisagé et fait l'objet d'une discussion au cas par cas. Les modalités de paiement sont définies en toute transparence avant la signature de la convention d'honoraires."
  },
  {
    q: "Puis-je bénéficier de l'aide juridictionnelle ?",
    a: "Lors du premier rendez-vous, Maître Morgane JOSEPH vous indiquera de manière transparente si votre situation peut ouvrir droit à l'aide juridictionnelle. Le cabinet accepte d'intervenir au titre de l'aide juridictionnelle uniquement dans certaines procédures, notamment en droit de la famille et en contentieux AAH."
  },
  {
    q: 'Que se passe-t-il lors du premier rendez-vous ?',
    a: "Le premier rendez-vous permet d'exposer votre situation en toute confidentialité. Maître Morgane JOSEPH procède à une première analyse juridique du dossier, identifie les options envisageables et vous informe des suites possibles. Les modalités d'intervention ainsi que les honoraires sont également expliquées de manière claire et transparente."
  },
  {
    q: 'Dois-je apporter des documents dès le premier rendez-vous ?',
    a: "Il est recommandé d'apporter tout document utile à l'analyse de votre situation : décisions de justice, courriers, échanges, justificatifs de ressources ou documents médicaux selon le dossier. À défaut, le rendez-vous peut parfaitement avoir lieu et les pièces pourront être transmises ensuite."
  },
  {
    q: 'Puis-je contacter mon avocat en cours de procédure ?',
    a: "Oui. Le cabinet reste accessible pendant toute la durée de la procédure. Par mail : merci de préciser votre nom et prénom dans l'objet et d'envoyer les pièces au format PDF. Par téléphone : Maître Morgane JOSEPH est joignable du lundi au vendredi, de 9h à 18h30. En cas d'urgence, un message vocal ou un email mentionnant « URGENT » permet de signaler la situation."
  },
  {
    q: 'Quels sont les frais en plus des honoraires ?',
    a: "Des frais annexes peuvent s'ajouter selon les dossiers : huissiers, expertises, déplacements ou frais de procédure. Ils sont distincts des honoraires du cabinet et expliqués avec transparence lorsqu'ils sont susceptibles d'intervenir."
  }
];

const faqFamille = [
  {
    q: "Puis-je avoir le même avocat que mon époux/épouse dans le cadre d'un divorce ?",
    a: 'Non. En matière de divorce, chaque époux doit être assisté par son propre avocat.'
  },
  {
    q: 'Que devient le logement familial en cas de séparation ?',
    a: "Le sort du logement dépend de la situation du couple, du régime matrimonial et, le cas échéant, de l'intérêt des enfants. Une analyse du dossier permet de déterminer les solutions envisageables."
  },
  {
    q: 'Comment est fixée la pension alimentaire ?',
    a: "La pension alimentaire est fixée en fonction des ressources et charges de chacun, ainsi que des besoins de l'enfant. Le juge peut être saisi en cas de désaccord."
  },
  {
    q: 'Comment est organisée la garde des enfants ?',
    a: "L'organisation de la résidence des enfants et du droit de visite dépend avant tout de l'intérêt de l'enfant. Une organisation amiable peut être recherchée, à défaut le juge tranche."
  },
  {
    q: 'Combien de temps dure une procédure de divorce ?',
    a: "La durée dépend du type de divorce, du niveau d'accord entre les époux et du calendrier de la juridiction. Un divorce amiable est en général plus rapide qu'une procédure contentieuse."
  },
  {
    q: 'Dois-je obligatoirement passer par le juge pour divorcer ?',
    a: "Non. En cas d'accord complet entre les époux, un divorce par consentement mutuel sans juge peut être envisagé. En revanche, un désaccord sur les conséquences du divorce nécessite l'intervention du juge."
  }
];

const faqAAH = [
  {
    q: "Ai-je droit à l'AAH automatiquement ?",
    a: "Non. L'AAH est accordée après instruction du dossier par la MDPH selon des critères médicaux et administratifs précis."
  },
  {
    q: 'Que faire en cas de refus AAH ?',
    a: "Il est possible d'exercer un recours administratif préalable obligatoire auprès de la CDAPH dans un délai de deux mois. Si le refus est maintenu, la contestation peut ensuite être portée devant le tribunal judiciaire, au sein du Pôle social."
  }
];

const legalServiceHome = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${origin}/#cabinet`,
  name: 'Cabinet Maître Morgane JOSEPH',
  alternateName: 'Maître Morgane JOSEPH — Avocat à Montpellier',
  image: `${origin}/assets/portrait-morgane-joseph-avocat-montpellier.jpg`,
  url: `${origin}/`,
  telephone: '+33-6-99-15-41-64',
  email: 'morganejoseph.avocat@gmail.com',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12 Ter Rue du Lantissargues',
    postalCode: '34070',
    addressLocality: 'Montpellier',
    addressRegion: 'Occitanie',
    addressCountry: 'FR'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '43.6047',
    longitude: '3.8767'
  },
  areaServed: [
    { '@type': 'City', name: 'Montpellier' },
    { '@type': 'AdministrativeArea', name: 'Hérault' },
    { '@type': 'AdministrativeArea', name: 'Occitanie' }
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:30'
    }
  ],
  knowsAbout: [
    'Droit de la famille',
    'Droit civil',
    'Contentieux AAH',
    'Divorce',
    'Autorité parentale',
    'Pension alimentaire',
    'Ordonnance de protection',
    'Refus AAH',
    'MDPH'
  ],
  provider: { '@id': `${origin}/#morgane` }
};

const attorneySchema = {
  '@context': 'https://schema.org',
  '@type': 'Attorney',
  '@id': `${origin}/#morgane`,
  name: 'Maître Morgane JOSEPH',
  image: `${origin}/assets/portrait-morgane-joseph-avocat-montpellier.jpg`,
  jobTitle: 'Avocat au Barreau de Montpellier',
  memberOf: {
    '@type': 'Organization',
    name: 'Barreau de Montpellier',
    url: 'https://www.avocats-montpellier.com/'
  },
  knowsAbout: ['Droit de la famille', 'Droit civil', 'Contentieux AAH'],
  url: `${origin}/presentation`,
  workLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 Ter Rue du Lantissargues',
      postalCode: '34070',
      addressLocality: 'Montpellier',
      addressCountry: 'FR'
    }
  }
};

const breadcrumb = (...items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

const faqSchema = (entries) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: entries.map((entry) => ({
    '@type': 'Question',
    name: entry.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: entry.a
    }
  }))
});

const domaineService = (title, description, slug, serviceType, procedures) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: `${title} — Maître Morgane JOSEPH`,
  description,
  url: `${origin}/domaines/${slug}`,
  serviceType,
  provider: { '@id': `${origin}/#morgane` },
  areaServed: [{ '@type': 'City', name: 'Montpellier' }],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `Procédures en ${serviceType.toLowerCase()}`,
    itemListElement: procedures.map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name }
    }))
  }
});

const pages = [
  {
    file: 'index.html',
    title: 'Maître Morgane JOSEPH — Avocat à Montpellier | Famille, Civil, AAH',
    description: 'Cabinet de Maître Morgane JOSEPH, Avocat au Barreau de Montpellier. Droit de la famille, droit civil et contentieux AAH.',
    canonical: `${origin}/`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-home.jpg`,
    cssHref: 'styles.css',
    scripts: [legalServiceHome, attorneySchema]
  },
  {
    file: 'presentation.html',
    title: 'Maître Morgane JOSEPH — Parcours & approche | Avocat à Montpellier',
    description: 'Présentation du cabinet de Maître Morgane JOSEPH, Avocat au Barreau de Montpellier : parcours, approche et engagement auprès de ses clients.',
    canonical: `${origin}/presentation`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-presentation.jpg`,
    cssHref: 'styles.css',
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: 'Présentation', url: `${origin}/presentation` }
      )
    ]
  },
  {
    file: 'domaines.html',
    title: "Domaines d'activité — Maître Morgane JOSEPH, Avocat à Montpellier",
    description: "Découvrez les trois domaines d'activité du cabinet : droit de la famille, droit civil et contentieux AAH à Montpellier.",
    canonical: `${origin}/domaines`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-domaines.jpg`,
    cssHref: 'styles.css',
    extraBeforeScripts: [
      `<script>
    (function () {
      const map = {
        '#famille': '/domaines/droit-de-la-famille',
        '#civil': '/domaines/droit-civil',
        '#aah': '/domaines/contentieux-aah'
      };
      const next = map[window.location.hash];
      if (next) window.location.replace(next);
    })();
  </script>`
    ],
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: "Domaines d'activité", url: `${origin}/domaines` }
      )
    ]
  },
  {
    file: 'honoraires.html',
    title: 'Honoraires — Maître Morgane JOSEPH, Avocat au Barreau de Montpellier',
    description: "Honoraires du cabinet : modalités de facturation, convention d'honoraires, facilités de paiement et aide juridictionnelle.",
    canonical: `${origin}/honoraires`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-honoraires.jpg`,
    cssHref: 'styles.css',
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: 'Honoraires', url: `${origin}/honoraires` }
      )
    ]
  },
  {
    file: 'faq.html',
    title: 'FAQ — Maître Morgane JOSEPH, Avocat au Barreau de Montpellier',
    description: 'Questions fréquentes sur le cabinet, le premier rendez-vous, les honoraires et le suivi des dossiers de Maître Morgane JOSEPH à Montpellier.',
    canonical: `${origin}/faq`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-faq.jpg`,
    cssHref: 'styles.css',
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: 'FAQ', url: `${origin}/faq` }
      ),
      faqSchema(faqMain)
    ]
  },
  {
    file: 'contact.html',
    title: 'Contact — Maître Morgane JOSEPH, Avocat au Barreau de Montpellier',
    description: 'Contacter le cabinet de Maître Morgane JOSEPH à Montpellier pour une prise de rendez-vous ou une première demande.',
    canonical: `${origin}/contact`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-contact.jpg`,
    cssHref: 'styles.css',
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: 'Contact', url: `${origin}/contact` }
      )
    ]
  },
  {
    file: 'mentions-legales.html',
    title: 'Mentions légales — Maître Morgane JOSEPH, Avocat au Barreau de Montpellier',
    description: 'Mentions légales du site du Cabinet Maître Morgane JOSEPH, Avocat au Barreau de Montpellier.',
    canonical: `${origin}/mentions-legales`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-home.jpg`,
    cssHref: 'styles.css',
    extraBeforeScripts: [preserveStyleBlock('mentions-legales.html')],
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: 'Mentions légales', url: `${origin}/mentions-legales` }
      )
    ],
    robots: 'noindex, follow, max-image-preview:large'
  },
  {
    file: 'politique-confidentialite.html',
    title: 'Politique de confidentialité — Maître Morgane JOSEPH, Avocat à Montpellier',
    description: 'Politique de confidentialité du cabinet de Maître Morgane JOSEPH : formulaire de contact, données personnelles, RGPD, hébergement et sécurité.',
    canonical: `${origin}/politique-confidentialite`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-politique-confidentialite.jpg`,
    cssHref: 'styles.css',
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: 'Politique de confidentialité', url: `${origin}/politique-confidentialite` }
      )
    ]
  },
  {
    file: 'premier-rendez-vous.html',
    title: 'Le premier rendez-vous au cabinet — Maître Morgane JOSEPH',
    description: 'Premier rendez-vous avocat à Montpellier : déroulement, documents utiles, confidentialité et préparation de votre échange avec Maître Morgane JOSEPH.',
    canonical: `${origin}/premier-rendez-vous`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-premier-rendez-vous.jpg`,
    cssHref: 'styles.css',
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: 'Premier rendez-vous', url: `${origin}/premier-rendez-vous` }
      )
    ]
  },
  {
    file: 'aide-juridictionnelle.html',
    title: "L'aide juridictionnelle — Cabinet Maître Morgane JOSEPH",
    description: "Aide juridictionnelle : repères utiles, démarches et informations pratiques pour préparer votre demande auprès du cabinet de Maître Morgane JOSEPH.",
    canonical: `${origin}/aide-juridictionnelle`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-aide-juridictionnelle.jpg`,
    cssHref: 'styles.css',
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: 'Aide juridictionnelle', url: `${origin}/aide-juridictionnelle` }
      )
    ]
  },
  {
    file: 'zone-intervention.html',
    title: "Zone d'intervention — Cabinet d'avocat à Montpellier",
    description: "Montpellier, Métropole, Hérault et Occitanie : découvrez la zone d'intervention du cabinet de Maître Morgane JOSEPH selon la nature du dossier.",
    canonical: `${origin}/zone-intervention`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-zone-intervention.jpg`,
    cssHref: 'styles.css',
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: "Zone d'intervention", url: `${origin}/zone-intervention` }
      )
    ]
  },
  {
    file: 'glossaire-juridique.html',
    title: 'Glossaire juridique — Cabinet Maître Morgane JOSEPH',
    description: 'Glossaire juridique du cabinet : AAH, CDAPH, JAF, MDPH, RAPO, Pôle social et autres termes utiles expliqués simplement.',
    canonical: `${origin}/glossaire-juridique`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-glossaire-juridique.jpg`,
    cssHref: 'styles.css',
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: 'Glossaire juridique', url: `${origin}/glossaire-juridique` }
      )
    ]
  },
  {
    file: '404.html',
    title: 'Page introuvable — Maître Morgane JOSEPH, Avocat à Montpellier',
    description: "La page demandée n'existe pas ou a été déplacée. Retrouvez les accès utiles pour contacter le cabinet de Maître Morgane JOSEPH.",
    canonical: `${origin}/404`,
    ogType: 'website',
    ogImage: `${origin}/assets/og-404.jpg`,
    cssHref: 'styles.css',
    scripts: [
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: 'Page introuvable', url: `${origin}/404` }
      )
    ],
    robots: 'noindex, follow, max-image-preview:large'
  },
  {
    file: path.join('domaines', 'droit-de-la-famille.html'),
    title: 'Avocat en droit de la famille à Montpellier — Maître Morgane JOSEPH',
    description: 'Maître Morgane JOSEPH, avocat à Montpellier, accompagne les particuliers en droit de la famille : divorce, autorité parentale, pension alimentaire, ordonnance de protection.',
    canonical: `${origin}/domaines/droit-de-la-famille`,
    ogType: 'article',
    ogImage: `${origin}/assets/og-famille.jpg`,
    cssHref: '../styles.css',
    scripts: [
      domaineService(
        'Avocat en droit de la famille à Montpellier',
        'Maître Morgane JOSEPH accompagne les particuliers en droit de la famille à Montpellier : divorce, autorité parentale, pension alimentaire, ordonnance de protection.',
        'droit-de-la-famille',
        'Droit de la famille',
        [
          'Procédure de divorce amiable',
          'Procédure de divorce contentieux',
          "Exercice de l'autorité parentale et résidence des enfants",
          'Fixation de la pension alimentaire',
          'Violences conjugales et ordonnance de protection',
          'Procédures urgentes en matière familiale'
        ]
      ),
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: "Domaines d'activité", url: `${origin}/domaines` },
        { name: 'Droit de la famille', url: `${origin}/domaines/droit-de-la-famille` }
      ),
      faqSchema(faqFamille)
    ]
  },
  {
    file: path.join('domaines', 'droit-civil.html'),
    title: 'Avocat en droit civil à Montpellier — Maître Morgane JOSEPH',
    description: "Maître Morgane JOSEPH, avocat civiliste à Montpellier, intervient sur les litiges contractuels, les baux d'habitation, la responsabilité civile et les conflits de voisinage.",
    canonical: `${origin}/domaines/droit-civil`,
    ogType: 'article',
    ogImage: `${origin}/assets/og-civil.jpg`,
    cssHref: '../styles.css',
    scripts: [
      domaineService(
        'Avocat en droit civil à Montpellier',
        "Maître Morgane JOSEPH intervient en droit civil à Montpellier pour les litiges contractuels, les baux d'habitation, la responsabilité civile et les conflits de voisinage.",
        'droit-civil',
        'Droit civil',
        [
          'Litiges contractuels',
          "Contentieux des baux d'habitation",
          'Réparation du préjudice et responsabilité civile',
          'Troubles et conflits de voisinage'
        ]
      ),
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: "Domaines d'activité", url: `${origin}/domaines` },
        { name: 'Droit civil', url: `${origin}/domaines/droit-civil` }
      )
    ]
  },
  {
    file: path.join('domaines', 'contentieux-aah.html'),
    title: 'Contentieux AAH à Montpellier — Maître Morgane JOSEPH, Avocat',
    description: "Avocat à Montpellier, Maître Morgane JOSEPH accompagne les recours contre les refus d'AAH : recours préalable CDAPH, saisine du Pôle social du tribunal judiciaire.",
    canonical: `${origin}/domaines/contentieux-aah`,
    ogType: 'article',
    ogImage: `${origin}/assets/og-aah.jpg`,
    cssHref: '../styles.css',
    scripts: [
      domaineService(
        'Contentieux AAH à Montpellier',
        "Maître Morgane JOSEPH accompagne à Montpellier les recours contre les refus d'AAH, du recours préalable à la saisine du Pôle social.",
        'contentieux-aah',
        'Contentieux AAH',
        [
          "Refus d'attribution de l'AAH",
          'Recours administratif préalable obligatoire (RAPO) auprès de la CDAPH',
          'Saisine du tribunal judiciaire — Pôle social',
          'Compléments et prestations associées'
        ]
      ),
      breadcrumb(
        { name: 'Accueil', url: `${origin}/` },
        { name: "Domaines d'activité", url: `${origin}/domaines` },
        { name: 'Contentieux AAH', url: `${origin}/domaines/contentieux-aah` }
      ),
      faqSchema(faqAAH)
    ]
  }
];

function preserveStyleBlock(relativePath) {
  const file = path.join(root, relativePath);
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(/<style>[\s\S]*?<\/style>/i);
  return match ? match[0] : '';
}

function scriptTag(data) {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
}

function buildHead(page) {
  const ogDescription = escapeHtml(page.description);
  const title = escapeHtml(page.title);
  const ogType = page.ogType || 'website';
  const robots = page.robots || 'index, follow, max-image-preview:large';
  const extras = []
    .concat(page.extraBeforeScripts || [])
    .filter(Boolean)
    .join('\n  ');
  const schemaScripts = (page.scripts || []).map(scriptTag).join('\n  ');

  return [
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    `  <meta name="description" content="${ogDescription}">`,
    `  <meta name="robots" content="${robots}">`,
    `  <link rel="canonical" href="${page.canonical}">`,
    `  <meta property="og:type" content="${ogType}">`,
    '  <meta property="og:locale" content="fr_FR">',
    '  <meta property="og:site_name" content="Cabinet Maître Morgane JOSEPH">',
    `  <meta property="og:title" content="${title}">`,
    `  <meta property="og:description" content="${ogDescription}">`,
    `  <meta property="og:image" content="${page.ogImage}">`,
    '  <meta property="og:image:width" content="1200">',
    '  <meta property="og:image:height" content="630">',
    `  <meta property="og:url" content="${page.canonical}">`,
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${title}">`,
    `  <meta name="twitter:description" content="${ogDescription}">`,
    `  <meta name="twitter:image" content="${page.ogImage}">`,
    `  <title>${title}</title>`,
    '  <link rel="preconnect" href="https://fonts.googleapis.com">',
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    `  <link href="${fontsHref}" rel="stylesheet">`,
    '  <link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    '  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
    '  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">',
    '  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
    '  <link rel="icon" href="/favicon.ico" sizes="any">',
    `  <link rel="stylesheet" href="${page.cssHref}">`,
    extras,
    schemaScripts,
    `  ${trackingPlaceholder}`,
    '</head>'
  ]
    .filter(Boolean)
    .join('\n');
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

for (const page of pages) {
  const file = path.join(root, page.file);
  const source = fs.readFileSync(file, 'utf8');
  const next = source.replace(/<head>[\s\S]*?<\/head>/i, buildHead(page));
  fs.writeFileSync(file, next, 'utf8');
  console.log(`updated ${page.file}`);
}
