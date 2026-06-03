import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content.trimStart() + '\n', 'utf8');
  console.log(`wrote ${file}`);
}

function nav(base = '', current = '') {
  const isPresentation = current === 'presentation' ? ' aria-current="page"' : '';
  const isHonoraires = current === 'honoraires' ? ' aria-current="page"' : '';
  const isFaq = current === 'faq' ? ' aria-current="page"' : '';
  const isContact = current === 'contact' ? ' aria-current="page"' : '';
  const domainesActive = current === 'domaines' ? ' data-active="true"' : '';

  return `
  <nav class="nav" role="navigation" aria-label="Navigation principale">
    <div class="nav__inner">
      <a href="${base}index.html" class="nav__logo" aria-label="Maître Morgane JOSEPH — Accueil">
        <img src="${base}assets/1_LOGO_BLANC.png" alt="Logo Cabinet Maître Morgane JOSEPH" class="nav__logo-img" width="44" height="44">
      </a>
      <button class="nav__toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-menu">
        <span class="nav__toggle-line"></span>
        <span class="nav__toggle-line"></span>
      </button>
      <ul class="nav__links" id="nav-menu" role="list">
        <li><a href="${base}presentation.html" class="nav__link"${isPresentation}>Présentation</a></li>
        <li class="nav__item--dropdown">
          <button class="nav__dropdown-trigger"${domainesActive} aria-expanded="false" aria-haspopup="true" aria-controls="nav-dropdown-domaines">
            Domaines
            <svg class="nav__dropdown-caret" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div id="nav-dropdown-domaines" class="nav__dropdown" hidden role="menu">
            <a class="nav__dropdown-item" href="${base}domaines/droit-de-la-famille.html" role="menuitem">
              <span class="nav__dropdown-body"><span class="nav__dropdown-title">Droit de la famille</span><span class="nav__dropdown-teaser">Divorce, autorité parentale, ordonnance de protection.</span></span>
              <svg class="nav__dropdown-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a class="nav__dropdown-item" href="${base}domaines/droit-civil.html" role="menuitem">
              <span class="nav__dropdown-body"><span class="nav__dropdown-title">Droit civil</span><span class="nav__dropdown-teaser">Litiges contractuels, baux, responsabilité civile.</span></span>
              <svg class="nav__dropdown-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a class="nav__dropdown-item" href="${base}domaines/contentieux-aah.html" role="menuitem">
              <span class="nav__dropdown-body"><span class="nav__dropdown-title">Contentieux AAH</span><span class="nav__dropdown-teaser">Recours MDPH, refus d'attribution, Pôle social.</span></span>
              <svg class="nav__dropdown-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a class="nav__dropdown-footer" href="${base}domaines.html" role="menuitem">Vue d'ensemble des domaines →</a>
          </div>
        </li>
        <li><a href="${base}honoraires.html" class="nav__link"${isHonoraires}>Honoraires</a></li>
        <li><a href="${base}faq.html" class="nav__link"${isFaq}>FAQ</a></li>
        <li><a href="${base}contact.html" class="nav__link"${isContact}>Contact</a></li>
      </ul>
      <a href="${base}contact.html" class="nav__cta btn btn--outline">Prendre rendez-vous</a>
    </div>
  </nav>`;
}

function footer(base = '', current = '') {
  const links = [
    ['Accueil', 'index.html', 'accueil'],
    ['Présentation', 'presentation.html', 'presentation'],
    ['Domaines', 'domaines.html', 'domaines'],
    ['Honoraires', 'honoraires.html', 'honoraires'],
    ['FAQ', 'faq.html', 'faq'],
    ['Premier rendez-vous', 'premier-rendez-vous.html', 'premier'],
    ['Aide juridictionnelle', 'aide-juridictionnelle.html', 'aide'],
    ["Zone d'intervention", 'zone-intervention.html', 'zone'],
    ['Glossaire juridique', 'glossaire-juridique.html', 'glossaire'],
    ['Contact', 'contact.html', 'contact'],
    ['Politique de confidentialité', 'politique-confidentialite.html', 'privacy'],
    ['Mentions légales', 'mentions-legales.html', 'mentions']
  ];

  const items = links.map(([label, href, key]) => {
    const aria = current === key ? ' aria-current="page"' : '';
    return `            <li><a href="${base}${href}" class="footer__link"${aria}>${label}</a></li>`;
  }).join('\n');

  return `
  <footer class="footer" role="contentinfo">
    <div class="footer__inner container">
      <div class="footer__top">
        <div class="footer__brand">
          <a href="${base}index.html" aria-label="Retour à l'accueil">
            <img src="${base}assets/1_LOGO_BLANC.png" alt="Logo Cabinet Maître Morgane JOSEPH" class="footer__logo" width="60" height="60" loading="lazy" decoding="async">
          </a>
          <p class="footer__brand-name">Maître Morgane JOSEPH<br><span>Avocat à la Cour</span></p>
        </div>
        <nav class="footer__nav" aria-label="Navigation secondaire">
          <ul class="footer__links" role="list">
${items}
          </ul>
        </nav>
        <address class="footer__contact">
          <p>12 Ter Rue du Lantissargues<br>34070 Montpellier</p>
          <a href="tel:+33699154164" class="footer__contact-link">06 99 15 41 64</a>
          <a href="mailto:morganejoseph.avocat@gmail.com" class="footer__contact-link">morganejoseph.avocat@gmail.com</a>
        </address>
      </div>
      <div class="footer__bottom">
        <p class="footer__copy">&copy; 2026 Cabinet Maître Morgane JOSEPH &mdash; Avocat au Barreau de Montpellier. Tous droits réservés.</p>
        <p class="footer__credit">Site conçu par <span class="footer__studio">astr.studio</span></p>
      </div>
    </div>
  </footer>`;
}

function pageShell({ current = '', main }) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head></head>
<body class="page-interior">

  <div class="site-loader" id="siteLoader" aria-hidden="true" role="presentation">
    <img src="assets/1_LOGO_BLANC.png" alt="" class="site-loader__logo">
    <div class="site-loader__curtain"></div>
  </div>

  <div class="cursor-dot" aria-hidden="true"></div>
  <div class="cursor-ring" aria-hidden="true">
    <span class="cursor-ring__label" aria-hidden="true">VOIR</span>
  </div>

  <div class="page-overlay" aria-hidden="true"></div>
${nav('', current)}
${main}
${footer('', current)}
  <script src="app.js"></script>
</body>
</html>`;
}

const pages = {
  'politique-confidentialite.html': pageShell({
    current: 'privacy',
    main: `
  <main class="domaine-page seo-content-page">
    <div class="domaine-page-hero">
      <div class="domaine-page-hero__bg">
        <picture>
          <source srcset="assets/img-desk.webp" type="image/webp">
          <img src="assets/img-desk.jpg" alt="" role="presentation" loading="eager" decoding="async" width="1400" height="933">
        </picture>
      </div>
      <div class="domaine-page-hero__inner container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <ol class="breadcrumb__list" role="list">
            <li class="breadcrumb__item"><a href="index.html" class="breadcrumb__link">Accueil</a></li>
            <li class="breadcrumb__item breadcrumb__item--current" aria-current="page">Politique de confidentialité</li>
          </ol>
        </nav>
        <p class="eyebrow">RGPD</p>
        <h1>Politique de confidentialité</h1>
        <p class="domaine-lede">Cette page présente les données collectées par le site du cabinet, leur finalité, leur durée de conservation et les droits dont vous disposez à tout moment.</p>
      </div>
    </div>

    <div class="domaine-body container">
      <section class="domaine-overview reveal-up">
        <article class="domaine-overview__panel">
          <p class="eyebrow">RESPONSABLE DU TRAITEMENT</p>
          <h2>Cabinet Maître Morgane JOSEPH</h2>
          <p>Le traitement des données personnelles collectées via le site est assuré par Maître Morgane JOSEPH, avocat au Barreau de Montpellier, 12 Ter Rue du Lantissargues, 34070 Montpellier, joignable à l'adresse morganejoseph.avocat@gmail.com.</p>
        </article>
        <article class="domaine-overview__panel">
          <p class="eyebrow">REPÈRES ESSENTIELS</p>
          <ul class="domaine-overview__points">
            <li>Le formulaire collecte uniquement les informations nécessaires à une prise de contact.</li>
            <li>Aucune exploitation commerciale n'est réalisée à partir des messages reçus.</li>
            <li>Le cabinet ne cède ni ne revend les données à des tiers.</li>
            <li>Les échanges restent soumis aux exigences de confidentialité attachées à la profession d'avocat.</li>
          </ul>
        </article>
      </section>

      <section class="domaine-topic-grid">
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">DONNÉES COLLECTÉES</p>
          <h2>Quelles informations sont demandées&nbsp;?</h2>
          <p>Le site collecte, via le formulaire de contact, les nom et prénom, l'adresse email, le numéro de téléphone, le domaine d'activité concerné et le contenu du message. Ces informations permettent de comprendre la demande initiale et d'y répondre dans de bonnes conditions.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">FINALITÉ</p>
          <h2>Pourquoi ces données sont-elles utilisées&nbsp;?</h2>
          <p>Les données sont utilisées exclusivement pour répondre à une demande de rendez-vous ou de renseignement, organiser un premier échange et, le cas échéant, préparer les suites à donner au dossier. Elles ne servent ni à la prospection commerciale, ni au profilage des visiteurs.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">BASE LÉGALE</p>
          <h2>Quel est le fondement du traitement&nbsp;?</h2>
          <p>Le traitement repose sur le consentement de l'utilisateur lorsqu'il coche la case prévue à cet effet dans le formulaire. Il repose également, pour la réponse apportée à la demande, sur l'intérêt légitime du cabinet à assurer un suivi sérieux et utile des prises de contact reçues.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">CONSERVATION</p>
          <h2>Combien de temps les données sont-elles conservées&nbsp;?</h2>
          <p>Les données issues du formulaire de contact sont conservées pendant trois ans à compter du dernier échange. Lorsqu'un dossier est effectivement ouvert au cabinet, les documents et données utiles sont conservés selon les obligations professionnelles applicables à la profession d'avocat, soit dix ans après la clôture du dossier.</p>
        </article>
      </section>

      <section class="domaine-topic-plain has-image reveal-up">
        <div>
          <p class="eyebrow">VOS DROITS</p>
          <h2>Accès, rectification, effacement, opposition</h2>
          <p>Conformément au Règlement Général sur la Protection des Données, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition et de portabilité de vos données personnelles. Ces droits peuvent être exercés à tout moment en écrivant à morganejoseph.avocat@gmail.com.</p>
          <p>Si vous estimez, après échange avec le cabinet, que vos droits n'ont pas été respectés, vous pouvez introduire une réclamation auprès de la CNIL. Le cabinet s'attache toutefois à traiter toute demande avec sérieux, confidentialité et diligence afin d'apporter une réponse claire et adaptée.</p>
        </div>
        <figure class="domaine-topic-plain__illu">
          <picture>
            <source srcset="assets/photo-consultation.webp" type="image/webp">
            <img src="assets/photo-consultation.jpg" alt="Échange confidentiel au cabinet de Maître Morgane JOSEPH" loading="lazy" decoding="async" width="900" height="600">
          </picture>
        </figure>
      </section>

      <section class="domaine-topic-pair">
        <article class="domaine-topic-plain reveal-up">
          <p class="eyebrow">HÉBERGEMENT ET COOKIES</p>
          <h2>Hébergement, audience et absence de profilage</h2>
          <p>Le site est hébergé par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA. L'hébergement s'appuie sur des standards de sécurité adaptés à la diffusion du site et à la transmission des formulaires en HTTPS.</p>
          <p>Le site utilise des outils de mesure d'audience anonymes, sans cookies traceurs et sans collecte de données personnelles identifiables. Cette mesure sert uniquement à améliorer l'information proposée, la lisibilité des pages et la qualité du parcours utilisateur.</p>
        </article>
        <article class="domaine-topic-plain reveal-up">
          <p class="eyebrow">SÉCURITÉ ET MISE À JOUR</p>
          <h2>Sécurisation des échanges</h2>
          <p>Les données transmises via le formulaire sont envoyées en HTTPS chiffré. Le cabinet veille à limiter l'accès aux données strictement aux besoins de traitement des demandes reçues. La présente politique peut être mise à jour si les pratiques du site ou le cadre juridique évoluent.</p>
          <p>Date de dernière mise à jour&nbsp;: 3 juin 2026.</p>
        </article>
      </section>
    </div>
  </main>`
  }),
  'premier-rendez-vous.html': pageShell({
    current: 'premier',
    main: `
  <main class="domaine-page seo-content-page">
    <div class="domaine-page-hero">
      <div class="domaine-page-hero__bg">
        <picture>
          <source srcset="assets/photo-consultation.webp" type="image/webp">
          <img src="assets/photo-consultation.jpg" alt="" role="presentation" loading="eager" decoding="async" width="900" height="600">
        </picture>
      </div>
      <div class="domaine-page-hero__inner container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <ol class="breadcrumb__list" role="list">
            <li class="breadcrumb__item"><a href="index.html" class="breadcrumb__link">Accueil</a></li>
            <li class="breadcrumb__item breadcrumb__item--current" aria-current="page">Premier rendez-vous</li>
          </ol>
        </nav>
        <p class="eyebrow">PRENDRE CONTACT</p>
        <h1>Comment se déroule le premier rendez-vous au cabinet&nbsp;?</h1>
        <p class="domaine-lede">Le premier rendez-vous permet de poser les faits, de clarifier votre situation et d'identifier les premières pistes juridiques utiles. C'est un temps d'écoute, d'analyse et d'orientation.</p>
      </div>
    </div>

    <div class="domaine-body container">
      <section class="domaine-overview reveal-up">
        <article class="domaine-overview__panel">
          <p class="eyebrow">OBJECTIF</p>
          <h2>Comprendre votre situation avec méthode</h2>
          <p>Lors d'un premier rendez-vous, Maître Morgane JOSEPH vous reçoit pour écouter les faits, replacer votre situation dans son contexte et effectuer une première lecture juridique du dossier. L'objectif n'est pas seulement de recueillir des informations, mais de vous aider à comprendre les enjeux, les urgences éventuelles et les options qui peuvent être envisagées dans votre intérêt.</p>
        </article>
        <article class="domaine-overview__panel">
          <p class="eyebrow">À RETENIR</p>
          <ul class="domaine-overview__points">
            <li>Le rendez-vous est confidentiel.</li>
            <li>Il sert à faire un point clair sur les faits et les documents disponibles.</li>
            <li>Il permet de déterminer si une démarche amiable, administrative ou contentieuse est pertinente.</li>
            <li>Les modalités d'intervention et les honoraires sont expliqués de manière transparente.</li>
          </ul>
        </article>
      </section>

      <section class="domaine-topic-grid">
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">AVANT LE RENDEZ-VOUS</p>
          <h2>Préparer les éléments utiles</h2>
          <p>Il n'est pas nécessaire d'arriver avec un dossier parfaitement ordonné. En revanche, il est utile de rassembler les éléments les plus importants&nbsp;: décisions de justice, courriers reçus, contrats, attestations, échanges de mails, documents médicaux ou administratifs selon la nature du dossier. Cette préparation facilite l'analyse et permet de consacrer le temps du rendez-vous à ce qui compte vraiment.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">PENDANT L'ÉCHANGE</p>
          <h2>Faire le point sans précipitation</h2>
          <p>Le rendez-vous commence par votre récit des faits. Maître Morgane JOSEPH peut ensuite poser des questions complémentaires pour préciser les dates, l'environnement familial ou administratif, les démarches déjà entreprises et les attentes que vous avez vis-à-vis du cabinet. Cette phase d'écoute est essentielle pour distinguer ce qui relève de l'urgence, de la stratégie ou d'une simple mise au point préalable.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">APRÈS L'ANALYSE</p>
          <h2>Identifier les suites possibles</h2>
          <p>À l'issue de ce premier temps, plusieurs suites peuvent être envisagées&nbsp;: poursuite du dossier avec le cabinet, collecte de pièces complémentaires, tentative de résolution amiable, rédaction d'un acte, recours administratif ou saisine d'une juridiction. Si un délai doit être respecté, il est signalé clairement afin que vous puissiez prendre une décision en connaissance de cause.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">HONORAIRES</p>
          <h2>Une information claire dès le départ</h2>
          <p>Les modalités financières sont abordées sans ambiguïté. Selon le dossier, une convention d'honoraires peut être proposée à l'issue du rendez-vous. Un renvoi vers la page <a href="honoraires.html">Honoraires</a> permet aussi de consulter le cadre général appliqué par le cabinet avant toute décision d'engagement.</p>
          <!-- À COMPLÉTER PAR LA CLIENTE : montant ou gratuité éventuelle du premier rendez-vous -->
        </article>
      </section>

      <section class="domaine-topic-plain has-image reveal-up">
        <div>
          <p class="eyebrow">CONFIDENTIALITÉ</p>
          <h2>Un entretien protégé et utile</h2>
          <p>Le premier rendez-vous se déroule dans un cadre confidentiel. Il peut porter sur une difficulté familiale, un litige du quotidien, une décision administrative contestée ou toute situation nécessitant un éclairage juridique sérieux. Même lorsqu'aucune procédure n'est engagée à ce stade, cet échange permet déjà de sécuriser vos premières décisions et d'éviter des démarches inadaptées.</p>
          <p>Selon la situation, un échange à distance peut aussi être envisagé. Si un rendez-vous en visioconférence paraît plus adapté, la question peut être évoquée au moment de la prise de contact.</p>
        </div>
        <figure class="domaine-topic-plain__illu">
          <picture>
            <source srcset="assets/portrait-morgane-joseph-avocat-montpellier.webp" type="image/webp">
            <img src="assets/portrait-morgane-joseph-avocat-montpellier.jpg" alt="Maître Morgane JOSEPH, avocat au Barreau de Montpellier" loading="lazy" decoding="async" width="900" height="1200">
          </picture>
        </figure>
      </section>

      <section class="domaine-topic-pair">
        <article class="domaine-topic-plain reveal-up">
          <p class="eyebrow">DOCUMENTS</p>
          <h2>Que faut-il apporter&nbsp;?</h2>
          <ul>
            <li>Pièces d'identité et coordonnées à jour.</li>
            <li>Courriers, jugements, actes ou décisions déjà reçus.</li>
            <li>Échanges utiles avec l'autre partie, une administration ou un organisme.</li>
            <li>Justificatifs de ressources ou documents médicaux si le dossier le nécessite.</li>
          </ul>
        </article>
        <article class="domaine-topic-plain reveal-up">
          <p class="eyebrow">SUITE NATURELLE</p>
          <h2>Préparer la prise de rendez-vous</h2>
          <p>Si vous souhaitez rencontrer le cabinet, vous pouvez utiliser le <a href="contact.html">formulaire de contact</a> ou joindre directement Maître Morgane JOSEPH par téléphone. Indiquer dès le départ le domaine d'activité concerné, les délais éventuels et les premiers documents disponibles permet d'organiser le rendez-vous dans de bonnes conditions.</p>
        </article>
      </section>
    </div>
  </main>`
  }),
  'aide-juridictionnelle.html': pageShell({
    current: 'aide',
    main: `
  <main class="domaine-page seo-content-page">
    <div class="domaine-page-hero">
      <div class="domaine-page-hero__bg">
        <picture>
          <source srcset="assets/cour-appel-montpellier-cabinet-avocat.webp" type="image/webp">
          <img src="assets/cour-appel-montpellier-cabinet-avocat.jpg" alt="" role="presentation" loading="eager" decoding="async" width="1920" height="1024">
        </picture>
      </div>
      <div class="domaine-page-hero__inner container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <ol class="breadcrumb__list" role="list">
            <li class="breadcrumb__item"><a href="index.html" class="breadcrumb__link">Accueil</a></li>
            <li class="breadcrumb__item breadcrumb__item--current" aria-current="page">Aide juridictionnelle</li>
          </ol>
        </nav>
        <p class="eyebrow">INFORMATION PRATIQUE</p>
        <h1>L'aide juridictionnelle&nbsp;: conditions et démarches</h1>
        <p class="domaine-lede">L'aide juridictionnelle peut permettre, sous conditions, une prise en charge totale ou partielle des frais d'avocat. Cette page donne des repères pratiques pour préparer votre demande.</p>
      </div>
    </div>

    <div class="domaine-body container">
      <section class="domaine-overview reveal-up">
        <article class="domaine-overview__panel">
          <p class="eyebrow">PRINCIPE</p>
          <h2>Une aide publique soumise à conditions</h2>
          <p>L'aide juridictionnelle est un mécanisme qui permet, selon les ressources du demandeur et la nature de l'affaire, la prise en charge totale ou partielle des frais liés à une procédure. Elle ne se déclenche pas automatiquement&nbsp;: un dossier doit être constitué et examiné selon les règles en vigueur au moment de la demande.</p>
        </article>
        <article class="domaine-overview__panel">
          <p class="eyebrow">REPÈRES</p>
          <ul class="domaine-overview__points">
            <li>Les conditions de ressources évoluent régulièrement.</li>
            <li>Le dossier doit être complet pour être instruit dans de bonnes conditions.</li>
            <li>Certaines procédures sont plus directement concernées que d'autres.</li>
            <li>Le cabinet peut vous indiquer si cette voie paraît adaptée à votre situation.</li>
          </ul>
        </article>
      </section>

      <section class="domaine-topic-grid">
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">ÉLIGIBILITÉ</p>
          <h2>Qui peut en bénéficier&nbsp;?</h2>
          <p>L'examen porte notamment sur les ressources, la composition du foyer et la nature de l'affaire. Les barèmes étant susceptibles d'évoluer, il est préférable de vérifier la situation à la date du rendez-vous ou de la constitution du dossier. Le cabinet attire l'attention sur le fait qu'une appréciation sérieuse suppose toujours de regarder les justificatifs utiles.</p>
          <!-- À COMPLÉTER PAR LA CLIENTE : plafonds de ressources à jour -->
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">DOSSIER</p>
          <h2>Quels documents préparer&nbsp;?</h2>
          <p>La demande nécessite généralement les pièces d'identité, justificatifs de ressources, charges, composition du foyer et tout document relatif à la procédure envisagée. Plus le dossier est complet, plus l'instruction peut être fluide. Le cabinet peut signaler les pièces prioritaires à réunir selon le contexte exposé lors de la prise de contact.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">PROCÉDURE</p>
          <h2>Comment la demande est-elle déposée&nbsp;?</h2>
          <p>La demande est adressée au bureau d'aide juridictionnelle compétent. Selon la procédure, le moment du dépôt peut être déterminant&nbsp;: avant une audience, avant une saisine ou en accompagnement d'un recours déjà envisagé. L'enjeu est de ne pas laisser expirer un délai pendant la constitution du dossier.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">AU CABINET</p>
          <h2>Dans quels dossiers le cabinet peut-il intervenir&nbsp;?</h2>
          <p>Maître Morgane JOSEPH accepte d'intervenir au titre de l'aide juridictionnelle dans certaines procédures, notamment en droit de la famille et en contentieux AAH. Cette possibilité est examinée au cas par cas, en fonction du dossier, des délais et du cadre procédural applicable.</p>
          <!-- À COMPLÉTER PAR LA CLIENTE : périmètre exact des dossiers acceptés -->
        </article>
      </section>

      <section class="domaine-topic-plain has-image reveal-up">
        <div>
          <p class="eyebrow">POINT DE VIGILANCE</p>
          <h2>Ne pas retarder une démarche urgente</h2>
          <p>Lorsque des délais sont en cours, il est important de ne pas attendre la fin de toutes les recherches administratives avant de contacter le cabinet. Une première prise de contact permet d'identifier si une urgence existe, si un recours doit être préparé rapidement ou si des pièces doivent être réunies en priorité. Cette vigilance est essentielle en matière familiale comme dans certains contentieux administratifs et sociaux.</p>
          <p>Si vous pensez pouvoir bénéficier de l'aide juridictionnelle, signalez-le dès le message initial ou lors de l'appel. Le cabinet pourra ainsi vous orienter plus tôt vers les bons réflexes et la bonne temporalité.</p>
        </div>
        <figure class="domaine-topic-plain__illu">
          <picture>
            <source srcset="assets/img-desk.webp" type="image/webp">
            <img src="assets/img-desk.jpg" alt="Préparation d'un dossier d'aide juridictionnelle au cabinet" loading="lazy" decoding="async" width="1400" height="933">
          </picture>
        </figure>
      </section>

      <section class="domaine-topic-pair">
        <article class="domaine-topic-plain reveal-up">
          <p class="eyebrow">À FAIRE</p>
          <h2>Préparer sa demande</h2>
          <ul>
            <li>Rassembler les justificatifs personnels et financiers disponibles.</li>
            <li>Conserver les courriers ou décisions déjà reçus.</li>
            <li>Vérifier les délais éventuels avant toute saisine.</li>
            <li>Indiquer clairement la procédure envisagée lors de la prise de contact.</li>
          </ul>
        </article>
        <article class="domaine-topic-plain reveal-up">
          <p class="eyebrow">ALLER PLUS LOIN</p>
          <h2>Une question sur votre dossier&nbsp;?</h2>
          <p>Si votre situation concerne un <a href="domaines/droit-de-la-famille.html">dossier en droit de la famille</a> ou un <a href="domaines/contentieux-aah.html">contentieux AAH</a>, vous pouvez aussi consulter les pages dédiées pour mieux situer la nature de votre demande avant de prendre rendez-vous.</p>
        </article>
      </section>
    </div>
  </main>`
  }),
  'zone-intervention.html': pageShell({
    current: 'zone',
    main: `
  <main class="domaine-page seo-content-page">
    <div class="domaine-page-hero">
      <div class="domaine-page-hero__bg">
        <picture>
          <source srcset="assets/img-montpellier.webp" type="image/webp">
          <img src="assets/img-montpellier.jpg" alt="" role="presentation" loading="eager" decoding="async" width="611" height="900">
        </picture>
      </div>
      <div class="domaine-page-hero__inner container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <ol class="breadcrumb__list" role="list">
            <li class="breadcrumb__item"><a href="index.html" class="breadcrumb__link">Accueil</a></li>
            <li class="breadcrumb__item breadcrumb__item--current" aria-current="page">Zone d'intervention</li>
          </ol>
        </nav>
        <p class="eyebrow">MONTPELLIER & OCCITANIE</p>
        <h1>La zone d'intervention du cabinet</h1>
        <p class="domaine-lede">Le cabinet est implanté à Montpellier et accompagne principalement les clients situés dans la ville, la Métropole, l'Hérault et, selon le dossier, plus largement en Occitanie.</p>
      </div>
    </div>

    <div class="domaine-body container">
      <section class="domaine-overview reveal-up">
        <article class="domaine-overview__panel">
          <p class="eyebrow">ANCRAGE</p>
          <h2>Un cabinet basé à Montpellier</h2>
          <p>Le cabinet de Maître Morgane JOSEPH est installé au 12 Ter Rue du Lantissargues à Montpellier. Cet ancrage local permet d'assurer une relation de proximité avec les particuliers et les familles qui recherchent un accompagnement sérieux, lisible et accessible dans les moments où une décision juridique doit être prise.</p>
        </article>
        <article class="domaine-overview__panel">
          <p class="eyebrow">PÉRIMÈTRE</p>
          <ul class="domaine-overview__points">
            <li>Montpellier intra-muros et ses quartiers.</li>
            <li>Communes de Montpellier Méditerranée Métropole.</li>
            <li>Dossiers relevant de juridictions ou d'organismes du département de l'Hérault.</li>
            <li>Intervention plus large en Occitanie selon la nature du dossier et les modalités d'organisation.</li>
          </ul>
        </article>
      </section>

      <section class="domaine-topic-grid">
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">MONTPELLIER</p>
          <h2>Un accompagnement de proximité</h2>
          <p>Le cabinet accompagne les personnes domiciliées à Montpellier pour des questions de droit de la famille, de droit civil et de contentieux AAH. Cette proximité facilite la remise de pièces, l'organisation des rendez-vous et la réactivité lorsqu'un délai de procédure ou une audience impose une réponse rapide.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">MÉTROPOLE</p>
          <h2>Communes voisines fréquemment concernées</h2>
          <p>Le cabinet peut également intervenir pour les habitants de Castelnau-le-Lez, Lattes, Pérols, Mauguio, Juvignac, Saint-Jean-de-Védas, Villeneuve-lès-Maguelone ou encore Grabels, selon la nature du dossier. La logique reste la même&nbsp;: proposer un accompagnement clair et praticable, sans éloigner inutilement le client de la stratégie mise en place.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">HÉRAULT</p>
          <h2>Un cadre départemental cohérent</h2>
          <p>Pour certains dossiers, notamment lorsqu'ils s'inscrivent dans le ressort des juridictions ou organismes compétents à Montpellier, une intervention au niveau départemental peut être envisagée. Cela concerne en particulier les situations où le suivi administratif, familial ou contentieux impose une coordination précise dans le temps.</p>
        </article>
        <article class="domaine-topic-card reveal-up">
          <p class="eyebrow">OCCITANIE</p>
          <h2>Selon la nature du dossier et son organisation</h2>
          <p>Selon les enjeux du dossier, un accompagnement plus large en Occitanie peut être discuté. La possibilité d'un échange à distance, la circulation des pièces et les contraintes calendaires sont alors regardées avec attention afin de vérifier que la prise en charge reste utile, fluide et adaptée.</p>
        </article>
      </section>

      <section class="domaine-topic-plain has-image reveal-up">
        <div>
          <p class="eyebrow">COMMUNES</p>
          <h2>Des secteurs régulièrement recherchés</h2>
          <p>Les recherches des justiciables ne se limitent pas à la ville-centre. Il est donc utile de préciser que le cabinet peut accompagner des personnes résidant à Montpellier mais aussi dans les communes voisines où les besoins sont comparables&nbsp;: Castelnau-le-Lez, Lattes, Pérols, Mauguio, Juvignac, Saint-Jean-de-Védas et d'autres secteurs de la Métropole, sous réserve de la bonne adéquation entre le dossier, les délais et les modalités d'organisation.</p>
          <p>Le point essentiel n'est pas seulement la distance géographique, mais la capacité à travailler efficacement, à réunir les pièces nécessaires et à maintenir un contact régulier. C'est dans cette logique que chaque demande est examinée.</p>
        </div>
        <figure class="domaine-topic-plain__illu">
          <picture>
            <source srcset="assets/cour-appel-montpellier-cabinet-avocat.webp" type="image/webp">
            <img src="assets/cour-appel-montpellier-cabinet-avocat.jpg" alt="Façade de la Cour d'appel de Montpellier" loading="lazy" decoding="async" width="1920" height="1024">
          </picture>
        </figure>
      </section>

      <section class="domaine-topic-pair">
        <article class="domaine-topic-plain reveal-up">
          <p class="eyebrow">SITUER VOTRE BESOIN</p>
          <h2>Quel domaine consulter ensuite&nbsp;?</h2>
          <p>Si votre question concerne une séparation, une autorité parentale ou une pension alimentaire, la page <a href="domaines/droit-de-la-famille.html">droit de la famille</a> vous donnera des repères plus ciblés. Pour un litige contractuel, un bail ou un trouble de voisinage, vous pouvez <a href="domaines/droit-civil.html">consulter le droit civil</a>. Pour un refus d'AAH, la page <a href="domaines/contentieux-aah.html">contentieux AAH</a> détaille les recours envisageables.</p>
        </article>
        <article class="domaine-topic-plain reveal-up">
          <p class="eyebrow">PRISE DE CONTACT</p>
          <h2>Préciser votre commune et votre urgence</h2>
          <p>Lors du premier message ou de l'appel, il est utile d'indiquer votre commune, la juridiction éventuellement concernée et l'existence d'un délai proche. Ces informations permettent au cabinet d'évaluer plus rapidement la meilleure manière d'organiser un rendez-vous et de prioriser les premières actions utiles.</p>
        </article>
      </section>
    </div>
  </main>`
  }),
  'glossaire-juridique.html': pageShell({
    current: 'glossaire',
    main: `
  <main class="domaine-page seo-content-page">
    <div class="domaine-page-hero">
      <div class="domaine-page-hero__bg">
        <picture>
          <source srcset="assets/img-dark.webp" type="image/webp">
          <img src="assets/img-dark.jpg" alt="" role="presentation" loading="eager" decoding="async" width="1000" height="1500">
        </picture>
      </div>
      <div class="domaine-page-hero__inner container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <ol class="breadcrumb__list" role="list">
            <li class="breadcrumb__item"><a href="index.html" class="breadcrumb__link">Accueil</a></li>
            <li class="breadcrumb__item breadcrumb__item--current" aria-current="page">Glossaire juridique</li>
          </ol>
        </nav>
        <p class="eyebrow">REPÈRES UTILES</p>
        <h1>Glossaire juridique</h1>
        <p class="domaine-lede">Quelques termes rencontrés fréquemment en droit de la famille, en droit civil et en contentieux AAH, expliqués avec des mots simples pour aider à mieux comprendre les échanges avec le cabinet.</p>
      </div>
    </div>

    <div class="domaine-body container">
      <section class="domaine-overview reveal-up">
        <article class="domaine-overview__panel">
          <p class="eyebrow">POURQUOI CE GLOSSAIRE&nbsp;?</p>
          <h2>Clarifier le vocabulaire le plus courant</h2>
          <p>Une partie des incompréhensions juridiques naît du langage lui-même. Entre sigles administratifs, termes de procédure et expressions employées par les juridictions, il peut être difficile de saisir immédiatement l'enjeu d'un courrier ou d'une décision. Ce glossaire a vocation à donner un premier niveau de lecture, utile avant un rendez-vous ou pour relire un document avec plus de repères.</p>
        </article>
        <article class="domaine-overview__panel">
          <p class="eyebrow">IMPORTANT</p>
          <ul class="domaine-overview__points">
            <li>Ces définitions sont informatives et ne remplacent pas un conseil individualisé.</li>
            <li>Un même terme peut prendre une nuance différente selon le dossier.</li>
            <li>En cas de doute, un rendez-vous permet de replacer le mot dans votre situation concrète.</li>
          </ul>
        </article>
      </section>

      <section class="domaine-topic-grid">
        <article class="domaine-topic-card reveal-up"><p class="eyebrow">A</p><h2>AAH</h2><p>L'Allocation aux Adultes Handicapés est une prestation destinée à garantir un revenu minimal à certaines personnes en situation de handicap, sous conditions administratives et médicales. Un refus peut être contesté dans le cadre d'un recours spécifique.</p></article>
        <article class="domaine-topic-card reveal-up"><p class="eyebrow">C</p><h2>CDAPH</h2><p>La Commission des droits et de l'autonomie des personnes handicapées intervient dans l'examen de certaines demandes liées au handicap. Ses décisions peuvent faire l'objet d'un recours lorsque la personne estime qu'elles ne correspondent pas à sa situation.</p></article>
        <article class="domaine-topic-card reveal-up"><p class="eyebrow">C</p><h2>CAPA</h2><p>Le Certificat d'Aptitude à la Profession d'Avocat est le diplôme professionnel qui permet d'exercer comme avocat après la formation dispensée par l'école d'avocats.</p></article>
        <article class="domaine-topic-card reveal-up"><p class="eyebrow">J</p><h2>JAF</h2><p>Le juge aux affaires familiales intervient notamment pour les séparations, l'autorité parentale, la résidence des enfants, la pension alimentaire et diverses demandes urgentes en matière familiale.</p></article>
        <article class="domaine-topic-card reveal-up"><p class="eyebrow">M</p><h2>MDPH</h2><p>La Maison départementale des personnes handicapées reçoit et instruit les demandes liées au handicap. C'est souvent par elle que débute la constitution d'un dossier AAH ou d'une demande de reconnaissance de droits spécifiques.</p></article>
        <article class="domaine-topic-card reveal-up"><p class="eyebrow">O</p><h2>Ordonnance de protection</h2><p>Il s'agit d'une décision rendue rapidement par le juge lorsqu'une personne se dit exposée à des violences au sein du couple ou à un danger grave. Elle peut organiser des mesures de protection immédiates.</p></article>
        <article class="domaine-topic-card reveal-up"><p class="eyebrow">P</p><h2>Pension alimentaire</h2><p>La pension alimentaire correspond à la contribution financière versée pour participer aux besoins d'un enfant, et parfois à ceux d'un proche dans d'autres cadres. Son montant dépend de plusieurs éléments, dont les ressources et les charges.</p></article>
        <article class="domaine-topic-card reveal-up"><p class="eyebrow">P</p><h2>Pôle social</h2><p>Le Pôle social du tribunal judiciaire traite certains litiges relevant du droit de la sécurité sociale et de l'aide sociale, notamment certains recours après un refus lié à l'AAH.</p></article>
        <article class="domaine-topic-card reveal-up"><p class="eyebrow">R</p><h2>RAPO</h2><p>Le recours administratif préalable obligatoire est une étape imposée dans certains contentieux avant la saisine du juge. Il consiste à demander à l'administration ou à l'organisme de réexaminer sa décision.</p></article>
        <article class="domaine-topic-card reveal-up"><p class="eyebrow">R</p><h2>Résidence des enfants</h2><p>Cette expression désigne le lieu où l'enfant vit habituellement après une séparation, ainsi que le rythme d'organisation retenu entre les parents. Elle se distingue du principe de l'autorité parentale, qui peut rester exercée conjointement.</p></article>
      </section>

      <section class="domaine-topic-pair">
        <article class="domaine-topic-plain reveal-up">
          <p class="eyebrow">ALLER PLUS LOIN</p>
          <h2>Relier les termes à votre dossier</h2>
          <p>Si plusieurs de ces mots apparaissent dans votre courrier, votre convocation ou votre décision, il peut être utile de préparer un rendez-vous en notant les points qui restent flous. Un échange avec le cabinet permet ensuite de transformer ces termes techniques en décisions concrètes à prendre, en délais à surveiller et en actions réalistes à engager.</p>
        </article>
        <article class="domaine-topic-plain reveal-up">
          <p class="eyebrow">PAGES LIÉES</p>
          <h2>Continuer votre lecture</h2>
          <p>Vous pouvez compléter ce glossaire avec la page <a href="premier-rendez-vous.html">Premier rendez-vous</a>, la page <a href="aide-juridictionnelle.html">Aide juridictionnelle</a> ou l'une des pages domaines selon la nature de votre situation.</p>
        </article>
      </section>
    </div>
  </main>`
  }),
  '404.html': pageShell({
    current: '',
    main: `
  <main class="domaine-page seo-content-page">
    <div class="domaine-page-hero">
      <div class="domaine-page-hero__bg">
        <picture>
          <source srcset="assets/img-montpellier.webp" type="image/webp">
          <img src="assets/img-montpellier.jpg" alt="" role="presentation" loading="eager" decoding="async" width="611" height="900">
        </picture>
      </div>
      <div class="domaine-page-hero__inner container">
        <p class="eyebrow">ERREUR 404</p>
        <h1>Page introuvable</h1>
        <p class="domaine-lede">La page que vous cherchez n'existe pas ou a été déplacée. Le cabinet reste joignable et les accès principaux du site sont toujours disponibles ci-dessous.</p>
      </div>
    </div>

    <div class="domaine-body container">
      <section class="domaine-overview reveal-up">
        <article class="domaine-overview__panel">
          <p class="eyebrow">RETOUR RAPIDE</p>
          <h2>Revenir vers une page utile</h2>
          <p>Vous pouvez retourner à l'accueil, consulter la présentation du cabinet, accéder aux domaines d'activité ou utiliser la page contact pour demander un rendez-vous. Si vous êtes arrivé ici depuis un ancien lien, il est possible que l'adresse ait simplement changé.</p>
        </article>
        <article class="domaine-overview__panel">
          <p class="eyebrow">JOINDRE LE CABINET</p>
          <ul class="domaine-overview__points">
            <li><a href="tel:+33699154164">06 99 15 41 64</a></li>
            <li><a href="mailto:morganejoseph.avocat@gmail.com">morganejoseph.avocat@gmail.com</a></li>
            <li><a href="contact.html">Prendre rendez-vous</a></li>
          </ul>
        </article>
      </section>

      <section class="related-cards reveal-up">
        <a href="index.html" class="related-card">
          <span class="related-card__num">I</span>
          <span class="related-card__body">
            <span class="related-card__title">Retour à l'accueil</span>
            <span class="related-card__teaser">Revenir à la page d'entrée du cabinet.</span>
          </span>
          <svg class="related-card__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a href="presentation.html" class="related-card">
          <span class="related-card__num">II</span>
          <span class="related-card__body">
            <span class="related-card__title">Présentation</span>
            <span class="related-card__teaser">Découvrir Maître Morgane JOSEPH et l'approche du cabinet.</span>
          </span>
          <svg class="related-card__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a href="domaines.html" class="related-card">
          <span class="related-card__num">III</span>
          <span class="related-card__body">
            <span class="related-card__title">Domaines</span>
            <span class="related-card__teaser">Voir les domaines d'activité du cabinet.</span>
          </span>
          <svg class="related-card__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a href="contact.html" class="related-card">
          <span class="related-card__num">IV</span>
          <span class="related-card__body">
            <span class="related-card__title">Contact</span>
            <span class="related-card__teaser">Écrire au cabinet ou demander un rendez-vous.</span>
          </span>
          <svg class="related-card__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </section>
    </div>
  </main>`
  })
};

for (const [file, content] of Object.entries(pages)) {
  write(file, content);
}

const footerTargets = [
  ['index.html', '', 'accueil'],
  ['presentation.html', '', 'presentation'],
  ['domaines.html', '', 'domaines'],
  ['honoraires.html', '', 'honoraires'],
  ['faq.html', '', 'faq'],
  ['contact.html', '', 'contact'],
  ['mentions-legales.html', '', 'mentions'],
  ['domaines/droit-de-la-famille.html', '../', 'domaines'],
  ['domaines/droit-civil.html', '../', 'domaines'],
  ['domaines/contentieux-aah.html', '../', 'domaines'],
  ['politique-confidentialite.html', '', 'privacy'],
  ['premier-rendez-vous.html', '', 'premier'],
  ['aide-juridictionnelle.html', '', 'aide'],
  ['zone-intervention.html', '', 'zone'],
  ['glossaire-juridique.html', '', 'glossaire'],
  ['404.html', '', '']
];

for (const [file, base, current] of footerTargets) {
  const fullPath = path.join(root, file);
  let html = fs.readFileSync(fullPath, 'utf8');
  html = html.replace(/<footer class="footer"[\s\S]*?<\/footer>/i, footer(base, current));
  fs.writeFileSync(fullPath, html, 'utf8');
  console.log(`updated footer ${file}`);
}

const contactPath = path.join(root, 'contact.html');
let contact = fs.readFileSync(contactPath, 'utf8');
contact = contact.replace(
  /<label for="f-rgpd" class="form__label form__label--check">[\s\S]*?<\/label>/,
  `<label for="f-rgpd" class="form__label form__label--check">J'accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande, conformément à la <a href="politique-confidentialite.html" class="rgpd-link">politique de confidentialité du cabinet</a>.</label>`
);
fs.writeFileSync(contactPath, contact, 'utf8');
console.log('updated contact rgpd link');
