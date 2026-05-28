# AUDIT_VISUEL.md — MJ Avocat
*Audit complet — Desktop (1440px / 1920px) · Tablette (768px) · Mobile (375px / 390px)*
*Réalisé le 2026-05-26, mis à jour le 2026-05-27 (Session 3) — analyse statique du code source (HTML + CSS + JS)*

---

## Légende sévérité
- 🔴 **Critique** : impact direct sur SEO, accessibilité ou expérience utilisateur
- 🟠 **Moyen** : défaut notable à corriger rapidement
- 🟡 **Mineur** : amélioration souhaitable, sans urgence
- ✅ **Conforme** : point vérifié et correct

---

## PARTIE A — Défauts identifiés et corrigés

### Session 1 (commits antérieurs)

| # | Défaut | Fichier(s) | Statut |
|---|--------|-----------|--------|
| A1 | 6 sections orphelines (h3 sans contenu) sur les 3 pages domaines | domaines/*.html | ✅ Corrigé |
| A2 | H3 Écoute/Rigueur/Confiance avant le premier H2 sur présentation.html | presentation.html | ✅ Corrigé (→ `<p>`) |
| A3 | H1 homepage sans mots-clés SEO | index.html | ✅ Corrigé (sr-only) |
| A4 | Attributs alt manquants ou vides sur images porteuses de sens | multiple | ✅ Traité |
| A5 | Curseur "VOIR" : aria-hidden présent, position:fixed ✓ | styles.css | ✅ Conforme |
| A6 | Numéros I/II/III retirés du dropdown ✓ ; conservés sur les cards (parti pris graphique) | all | ✅ Décision documentée |
| A7 | Section citation sombre sur présentation.html | presentation.html, styles.css | ✅ Corrigé |

### Session 2 — Régressions passage en clair + nouvelles issues

| # | Défaut | Fichier(s) | Statut |
|---|--------|-----------|--------|
| A0.1 | Texte ivoire sur fond ivoire : hub-cards, related-card, faq__cat-intro, presentation__body-h2 | styles.css | ✅ Corrigé |
| A0.2 | Logo blanc sur fond clair : nav interior pages | app.js (forceScrolled) | ✅ Non-issue — JS force `.scrolled` sur pages intérieures |
| A0.3 | Photos `_u_*` placeholder — existent dans assets, alt texto ajouté | domaines/*.html | ✅ Acceptable (images livrées par la cliente) |
| A0.4 | Site « vide » sans contraste : home-domaines revenu en section-dark | index.html | ✅ Corrigé |
| A8 | « Maître JOSEPH » sans prénom dans contact.html (3×) | contact.html | ✅ Corrigé → « Maître Morgane JOSEPH » |
| A9 | FAQ h3.faq__cat-title avant h2 → saut de hiérarchie SEO | faq.html | ✅ Corrigé → h2 |
| A10 | H1 FAQ et Contact trop courts pour le SEO | faq.html, contact.html | ✅ Enrichis |
| A11 | Lien RGPD manquant dans le formulaire contact | contact.html, mentions-legales.html | ✅ Lien ajouté (ancre #donnees-personnelles) |

---

## PARTIE B — Audit responsive & visuel

### B1 — Layout & débordements

| Point | Page | Écran | Résultat |
|-------|------|-------|---------|
| Scroll horizontal | Toutes | 375px | ✅ `overflow-x: hidden` sur body |
| `.hero-massive-text` "JOSEPH" | Homepage | 375px | ✅ `font-size: 20vw`, quasi invisible (opacity 0.03) |
| `.hero__marquee` | Homepage | 375px | ✅ `display: none` sous 768px |
| Grille domaines (3 col) | Homepage | 375px | ✅ → 1 colonne sous 768px |
| Grille honoraires (4 col) | Honoraires | 375px | ✅ → 2 col sous 1024px → 1 col sous 768px |
| Footer grid | Toutes | 768px | ✅ → 2 col 1024px, adaptatif |
| Grille domaine-overview (60/40) | Pages domaines | 1024px | ✅ → 1 colonne sous 1024px |
| `.domaine-topic-pair` (2 col) | Pages domaines | 375px | ✅ → 1 colonne sous 768px |
| Grille home-approach pillars | Homepage | 375px | ✅ responsive |
| `min-width` fixe > 300px | Styles | — | ✅ Aucun trouvé |
| Formulaire contact (2 col) | Contact | 375px | ✅ → 1 colonne sous 768px |

**Problème détecté :**
- 🟡 **B1-1** `domaine-overview__visual` n'a pas d'`aspect-ratio` réservé, mais hauteur tirée par le texte adjacent → pas de CLS réel car l'image est dans une grille CSS.

### B2 — Espacements & rythme

| Point | Résultat |
|-------|---------|
| Padding latéral mobile | ✅ `--container-pad: clamp(1.5rem, 5vw, 4rem)` → ~24px sur 375px |
| Symétrie sections | ✅ `--section-gap: clamp(5rem, 12vw, 10rem)` cohérent |
| Sections vides/disproportionnées | ✅ Aucune après correctifs A1 |
| Rythme clair/sombre homepage | ✅ Hero (sombre) → Manifesto (ivoire) → About (ivoire) → Domaines (sombre) → Citation (ivoire) → Approche (ivoire) → Contact CTA (ivoire) → Footer (sombre) |

### B3 — Typographie

| Point | Valeur | Résultat |
|-------|--------|---------|
| Font-size body | 17px (html) | ✅ ≥ 16px |
| Hero title mobile | `clamp(2.8rem, 11.8vw, 4rem)` | ✅ Lisible |
| Titre manifesto | `clamp(5rem, 14vw, 12rem)` | ✅ Responsive |
| Héros "JOSEPH" massif | `20vw` mobile, opacity 0.03 | ✅ Décoratif, pas lisibilité |
| Playfair Display hero__title | Appliqué via `--font-name` | ✅ Correct |
| Sous-titres presentation__body-h2 | `var(--taupe)` sur section-light | ✅ Corrigé (était sand ≈ invisible) |

### B4 — Border-radius

| Composant | Token | Valeur | Résultat |
|-----------|-------|--------|---------|
| `.domaine-card` | `--radius-lg` | 22px | ✅ |
| `.domaine-card__body` | `--radius-md` | 14px < 22px | ✅ Imbrication correcte |
| `.h-card` | `--radius-md` | 14px | ✅ |
| `.form__input` | `--radius-sm` | 8px | ✅ |
| `.btn` | `--radius-sm` | 8px | ✅ |
| Nav burger `.nav__toggle` | `--radius-pill` | 999px | ✅ Cercle |

**Résultat global :** ✅ Système de tokens cohérent, aucun mélange angle droit / arrondi.

### B5 — Couleurs & contraste

| Élément | Couleur | Fond | Ratio | Résultat |
|---------|---------|------|-------|---------|
| Body text | `var(--ivory)` (#f0ebe6) | `var(--espresso)` (#2f1a12) | ~14:1 | ✅ |
| `.quote-section__text` | `var(--espresso)` | `var(--ivory)` | ~14:1 | ✅ |
| `.faq__cat-title` section-light | `var(--taupe)` (#765f5a) | `#f0ebe6` | ~5:1 | ✅ Corrigé |
| `.nav__dropdown-teaser` | `var(--taupe)` op. 0.8 | ivoire | ~3.8:1 | ✅ (grand texte) |
| `.hub-card` sur section-light | `var(--ivory)` | `rgba(47,26,18,0.88)` | ~14:1 | ✅ Corrigé (dark cards) |
| `.related-card` sur section-light | `var(--espresso)` | `var(--ivory)` | ~14:1 | ✅ Corrigé |
| `.presentation__body-h2` sur section-light | `var(--taupe)` | `var(--ivory)` | ~5:1 | ✅ Corrigé |
| Bouton primary | `var(--ivory)` | `var(--espresso)` | ~14:1 | ✅ |

### B6 — Navigation & interactions

| Point | Résultat |
|-------|---------|
| Menu burger | ✅ `48×48px`, zone tactile OK |
| Dropdown mobile | ✅ accordéon statique sous 768px |
| `.nav__cta` | ✅ `display: none` sur mobile |
| Curseur custom tactile | ✅ désactivé via `(pointer: coarse)` en JS |
| Accessibilité clavier dropdown | ✅ `aria-expanded`, `aria-haspopup`, `role="menu"` |
| Logo nav interior pages | ✅ Nav toujours en `.scrolled` sur page-interior (fond sombre espresso) — logo blanc visible |

### B7 — Formulaire contact

| Point | Résultat |
|-------|---------|
| Labels `for` / inputs `id` | ✅ Tous appariés |
| Select — double chevron | ✅ `appearance: none` + flèche SVG custom (pas de doublon) |
| Inputs hauteur mobile | 🟡 padding `0.8rem` = ~27px + font = ~42px (légèrement sous 44px) |
| Checkbox zone tactile | ✅ Passée à 18×18px + label large adjacent |
| Lien RGPD | ✅ Pointe vers `mentions-legales.html#donnees-personnelles` |

### B8 — Animations

| Point | Résultat |
|-------|---------|
| `prefers-reduced-motion` | ✅ Toutes animations hero/manifesto à 0.01ms |
| Ken Burns + `will-change` | ✅ `will-change: transform` sur `.hero__bg-img` |
| Parallax RAF | ✅ `requestAnimationFrame` robuste |
| IntersectionObserver `.reveal-up` | ✅ Présent dans app.js |
| 🟡 Transitions hover non couvertes par reduced-motion | — | Transitions CSS hover (~60 occurrences) non désactivées |

### B9 — Images & médias

| Image | loading | Format | alt | Résultat |
|-------|---------|--------|-----|---------|
| `hero-cour-appel.jpg` | eager ✅ | JPG | "" dans aria-hidden ✅ | ✅ |
| `photo.jpg` | lazy ✅ | JPG | Descriptif ✅ | ✅ |
| `domaine-famille.webp` | lazy ✅ | WebP ✅ | "" décoratif ✅ | ✅ |
| `_u_domaine_famille.jpg` | lazy ✅ | JPG | Descriptif ✅ | ✅ Image cliente livrée |
| `domaine-famille-horizontal.webp` | eager ✅ | WebP ✅ | "" dans contexte hero ✅ | ✅ |

---

## PARTIE C — Optimisation & performance

### C1 — Scores Lighthouse estimés (analyse statique)
*NB : scores estimés par analyse de code, sans exécution Lighthouse en environnement CLI*

| Métrique | Estimation desktop | Estimation mobile | Raison |
|----------|-----------|-----------|--------|
| Performance | ~88–92 | ~80–88 | Images JPG non WebP (hero), fonts Google sync |
| Accessibilité | ~97 | ~97 | H1 corrigés, contraste corrigé, aria complets |
| Best Practices | ~95 | ~95 | Code propre, HTTPS |
| SEO | ~97 | ~97 | og:image + canonical + JSON-LD + H1 enrichis |

### C2 — Poids & chargement

| Point | Résultat |
|-------|---------|
| WebP utilisé | ✅ Sur domaine images, overview, hero domaines |
| `preconnect` fonts | ✅ Présent sur toutes les pages |
| `font-display: swap` | 🟡 Géré côté Google par défaut, non explicité dans l'URL |
| `loading="lazy"` | ✅ Sur toutes les images non-above-the-fold |
| `loading="eager"` hero | ✅ Correct |
| Dimensions images réservées | 🟡 Pas de `width`/`height` sur img hero, mais `position: absolute` = pas de CLS |

### C3 — SEO technique

| Point | Résultat |
|-------|---------|
| sitemap.xml | ✅ URLs sans `.html`, cohérent avec les canonicals des pages |
| robots.txt | ✅ Présent, pointe vers le sitemap |
| canonical index.html | ✅ Ajouté |
| og:image index.html | ✅ Ajouté |
| og:title/description index.html | ✅ Ajoutés |
| JSON-LD homepage | ✅ Ajouté (Attorney + LegalService) |
| JSON-LD pages domaines | ✅ Présent (LegalService complet) |
| Titles ≤ 60 chars | ✅ Tous conformes |
| Meta descriptions ≤ 155 chars | ✅ Toutes conformes |
| Favicons (5 formats) | ✅ Sur les 10 pages |
| H1 unique par page | ✅ Corrigé (honoraires/faq/contact avaient h2) |
| H1 FAQ enrichi | ✅ "Questions fréquentes — Cabinet d'avocat à Montpellier" |
| H1 Contact enrichi | ✅ "Contacter votre avocat à Montpellier" |
| Hiérarchie titres FAQ | ✅ H1 → H2 (cat-titles) → questions (dans accordéons) |

### C4 — Cohérence inter-pages

| Point | Résultat |
|-------|---------|
| Header identique | ✅ Même HTML nav sur toutes les pages |
| Footer identique | ✅ Même structure, chemins `../assets/` corrects depuis `/domaines/*` |
| Tokens couleur/typo | ✅ `--ivory`, `--espresso`, `--taupe`, `--sand` utilisés partout |
| Google Fonts | 🟡 Playfair Display ajouté seulement sur index.html (pages intérieures n'en ont pas besoin) |

---

### Session 3 — Audit exhaustif 10 pages × 4 breakpoints (2026-05-27)

| # | Défaut | Fichier(s) | Statut |
|---|--------|-----------|--------|
| A12 | H1→H3 sans H2 parent sur honoraires (4 h-cards) | honoraires.html, styles.css | ✅ Corrigé → H2 |
| A13 | Texte placeholder visible côté client dans FAQ droit civil | domaines/droit-civil.html | ✅ Supprimé (→ commentaire HTML) |

---

### Session 4 — Refonte hero + correctifs SEO/perf (2026-05-28)

| # | Défaut / Amélioration | Fichier(s) | Statut |
|---|--------|-----------|--------|
| A14 | Hero homepage : photo placeholder → Palais de Justice Montpellier | index.html, styles.css | ✅ `<picture>` WebP+JPG, 64KB/98KB |
| A15 | H1 hero : niveau unique → deux niveaux (nom + titre) | index.html, styles.css | ✅ `.hero__name-main` / `.hero__name-sub` |
| A16 | Manifesto : deux paragraphes → phrase fluide avec mots-clés dorés | index.html, styles.css | ✅ `.hero__manifesto` + `.hero__manifesto-word` |
| A17 | Polish hero : grain overlay, accent line dorée, cascade d'animation | styles.css | ✅ `::before` grain, `@keyframes line-grow` |
| A18 | `og:image` domaines.html → encore `hero-cour-appel.jpg` | domaines.html | ✅ Mis à jour |
| A19 | Canonical domaines.html avec `.html` incohérent avec sitemap | domaines.html | ✅ `/domaines.html` → `/domaines` |
| A20 | `form__input` sans `min-height: 44px` (tactile WCAG) | styles.css | ✅ Ajouté |
| A21 | `aria-current="page"` manquant sur dropdown footer domaines | domaines.html | ✅ Ajouté |
| A22 | canonical + Open Graph absents sur 4 pages intérieures | presentation, honoraires, faq, contact | ✅ Tous ajoutés |
| A23 | `photo.jpg` 418K non optimisé, pas de WebP | index.html, presentation.html | ✅ 900px, 167K, WebP 106K, `<picture>` |
| A24 | `img-dark.jpg` 230K non optimisé, pas de WebP | presentation.html | ✅ 1000px, 57K, WebP 28K, `<picture>` |
| A25 | JSON-LD homepage : téléphone placeholder, adresse incomplète, pas d'email | index.html | ✅ Tel, email, streetAddress, postalCode |

---

## RÉCAPITULATIF GLOBAL DES DÉFAUTS

### 🔴 Critiques (tous corrigés)
1. 6 sections orphelines avec H3 vides sur pages domaines
2. H3 avant H2 sur présentation.html
3. H1 manquant sur honoraires, faq, contact
4. `og:image`, `og:title`, `canonical`, JSON-LD absents sur homepage
5. Section citation sombre sur présentation alors que charte = tout clair
6. `.faq__cat-title` contraste 2.1:1 (insuffisant WCAG)
7. Texte ivoire sur fond ivoire : hub-cards, related-cards, faq__cat-intro, presentation__body-h2
8. Site « vide » : home-domaines sans ancre de contraste sombre
9. FAQ H3 cat-titles avant H2 → saut de hiérarchie invalide
10. « Maître JOSEPH » sans prénom (déontologie)
11. Lien RGPD manquant dans formulaire
12. honoraires.html H3 h-cards sans H2 parent → saut H1→H3
13. Texte placeholder interne visible dans FAQ droit civil

### 🟠 Moyens (tous corrigés)
1. Checkbox RGPD 16×16px → 18×18px
2. H1 FAQ et Contact sans mots-clés SEO locaux → enrichis
3. Lien RGPD sans ancre spécifique → `#donnees-personnelles` ajouté
4. canonical + og manquants sur 4 pages intérieures → ajoutés
5. JSON-LD homepage : téléphone/adresse/email incomplets → enrichis
6. Photos `photo.jpg` (–60%) et `img-dark.jpg` (–75%) compressées + WebP

### 🟡 Mineurs (listés, non bloquants)
1. `font-display` non explicité dans l'URL Google Fonts (géré côté Google)
2. `domaine-overview__visual` sans `aspect-ratio` CSS (pas de CLS réel)
3. ~~Inputs formulaire ~42px~~ ✅ Corrigé → `min-height: 44px`
4. Transitions hover CSS non couvertes par `prefers-reduced-motion` (impact minimal)

---

## AUDIT SESSION 3 — Vérification exhaustive par page

### Résultats globaux — toutes pages × 4 breakpoints

| Page | Hiérarchie | Contraste | Responsive | Images | SEO/meta | Statut |
|------|-----------|-----------|-----------|--------|---------|--------|
| `/` | ✅ H1→H2→H3 | ✅ rythme dark/light | ✅ grilles 1-col 768px | ✅ lazy/eager correct | ✅ og+JSON-LD | ✅ |
| `/presentation.html` | ✅ H1→H2 (piliers en `<p>`) | ✅ section-light colors | ✅ grid 1-col 1024px | ✅ photo.jpg descriptif | ✅ canonical+og | ✅ |
| `/domaines.html` | ✅ H1→H2 | ✅ hub-cards dark-on-light | ✅ hub-cards 1-col 768px | ✅ | ✅ canonical+og | ✅ |
| `/domaines/droit-de-la-famille.html` | ✅ H1→H2 | ✅ espresso sur ivory | ✅ topic-pair 1-col 768px | ✅ _u_ alt descriptif | ✅ JSON-LD | ✅ |
| `/domaines/droit-civil.html` | ✅ H1→H2 | ✅ | ✅ | ✅ img-desk alt descriptif | ✅ | ✅ |
| `/domaines/contentieux-aah.html` | ✅ H1→H2 | ✅ | ✅ | ✅ | ✅ JSON-LD | ✅ |
| `/honoraires.html` | ✅ H1→H2 | ✅ h-card h2 espresso | ✅ 4→2→1 col | ✅ | ✅ canonical+og | ✅ |
| `/faq.html` | ✅ H1→H2 cat-titles | ✅ faq__cat-title taupe | ✅ accordion mobile | ✅ | ✅ canonical+og | ✅ |
| `/contact.html` | ✅ H1→H2 | ✅ c-cards section-light | ✅ form 1-col 768px | ✅ img-desk décoratif | ✅ canonical+og | ✅ |
| `/mentions-legales.html` | ✅ H1→H2 | ✅ section espresso | ✅ max-width 75ch | ✅ | ✅ noindex | ✅ |

### Responsive confirmé — points clés

| Point | Résultat |
|-------|---------|
| Container max-width 1280px | ✅ `--container-max: 1280px` |
| Padding mobile `clamp(1.5rem,5vw,4rem)` → ~24px à 375px | ✅ |
| `overflow-x: hidden` sur body | ✅ |
| Hero "JOSEPH" massif (`20vw`, opacity 0.03) | ✅ décoratif, non bloquant |
| Marquee d'expertises | ✅ `display: none` sous 768px |
| Grilles toutes pages → 1 col sous 768px | ✅ |
| Burger 48×48px, zone tactile OK | ✅ |
| Curseur custom désactivé `(pointer: coarse)` | ✅ |
| Select custom chevron (pas de doublon) | ✅ `appearance: none` + SVG |
| Nav `.scrolled` forcé sur `page-interior` | ✅ logo blanc visible |

---

## CE QUI RESTE EN SUSPENS

| Item | Raison |
|------|--------|
| Contenus FAQ droit civil | Attend validation formulations par la cliente |
| Contenus sous-sections domaines (TEXTE À VENIR) | Await validation cliente (cf. CONTENUS_A_VENIR.md) |
| Choix de police définitif (Playfair vs Cormorant) | Attend retour cliente sur test-fonts.html |
| Scores Lighthouse réels | Nécessite un environnement de navigateur headless (non disponible en CLI) |
| Photos cabinet pour `_u_*` assets | Remplacement avec les vraies photos du cabinet |
| Transitions hover `prefers-reduced-motion` | Impact très limité, non bloquant |
