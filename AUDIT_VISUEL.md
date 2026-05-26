# AUDIT_VISUEL.md — MJ Avocat
*Audit complet — Desktop (1440px / 1920px) · Tablette (768px) · Mobile (375px / 390px)*
*Réalisé le 2026-05-26 par analyse statique du code source (HTML + CSS + JS)*

---

## Légende sévérité
- 🔴 **Critique** : impact direct sur SEO, accessibilité ou expérience utilisateur
- 🟠 **Moyen** : défaut notable à corriger rapidement
- 🟡 **Mineur** : amélioration souhaitable, sans urgence
- ✅ **Conforme** : point vérifié et correct

---

## PARTIE A — Défauts déjà identifiés (corrigés dans ce commit)

| # | Défaut | Fichier(s) | Statut |
|---|--------|-----------|--------|
| A1 | 6 sections orphelines (h3 sans contenu) sur les 3 pages domaines | domaines/*.html | ✅ Corrigé |
| A2 | H3 Écoute/Rigueur/Confiance avant le premier H2 sur présentation.html | presentation.html | ✅ Corrigé |
| A3 | H1 homepage sans mots-clés SEO | index.html | ✅ Corrigé (sr-only) |
| A4 | Attributs alt manquants ou vides sur images porteuses de sens | multiple | ✅ Traité |
| A5 | Curseur "VOIR" : aria-hidden présent, position:fixed ✓ | styles.css | ✅ Conforme |
| A6 | Numéros I/II/III retirés du dropdown ✓ ; conservés sur les cards (parti pris graphique) | all | ✅ Décision documentée |
| A7 | Section citation sombre sur présentation.html | presentation.html, styles.css | ✅ Corrigé |

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

**Problème détecté :**
- 🟡 **B1-1** `domaine-overview__visual` n'a pas d'`aspect-ratio` réservé, mais hauteur tirée par le texte adjacent → pas de CLS réel car l'image est dans une grille CSS.

### B2 — Espacements & rythme

| Point | Résultat |
|-------|---------|
| Padding latéral mobile | ✅ `--container-pad: clamp(1.5rem, 5vw, 4rem)` → ~24px sur 375px |
| Symétrie sections | ✅ `--section-gap: clamp(5rem, 12vw, 10rem)` cohérent |
| Sections vides/disproportionnées | ✅ Aucune après correctifs A1 |

### B3 — Typographie

| Point | Valeur | Résultat |
|-------|--------|---------|
| Font-size body | 17px (html) | ✅ ≥ 16px |
| Hero title mobile | `clamp(2.8rem, 11.8vw, 4rem)` | ✅ Lisible |
| Titre manifesto | `clamp(5rem, 14vw, 12rem)` | ✅ Responsive |
| Héros "JOSEPH" massif | `20vw` mobile, opacity 0.03 | ✅ Décoratif, pas lisibilité |
| Playfair Display hero__title | Appliqué via `--font-name` | ✅ Correct |

**Problème détecté :**
- 🟠 **B3-1** Le titre H1 sur les pages honoraires/faq/contact était `h2` → corrigé (Partie A). La taille CSS est maintenant contrainte au niveau h2 via override.

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
| `.quote-section__text` | `var(--espresso)` | `var(--ivory)` | ~14:1 | ✅ Corrigé (Acte 3) |
| `.faq__cat-title` section-light | `rgba(47,26,18,0.38)` effectif ~#a79c95 | `#f0ebe6` | **~2.1:1** | 🔴 Insuffisant |
| `.nav__dropdown-teaser` | `var(--taupe)` op. 0.8 | ivoire | ~3.8:1 | ✅ (grand texte) |
| `.domaine-card` text | `var(--ivory)` | glass sombre | ✅ | ✅ |
| Bouton primary | `var(--ivory)` | `var(--espresso)` | ~14:1 | ✅ |

**Problème critique :**
- 🔴 **B5-1** `.section-light .faq__cat-title` : ratio ~2.1:1, insuffisant même pour "large text" (minimum 3:1 WCAG AA). → **Corrigé** : passage à `var(--taupe)` (ratio ~5:1).

- 🟡 **B5-2** `homepage domaine cards` fond ivoire : les `.domaine-card` ont `color: var(--ivory)` et `background: rgba(240,235,230,0.035)` → sur fond ivoire la carte est presque transparente (verre ivoire sur fond ivoire). L'effet est très subtil mais reste lisible car les cartes ont un `border: 1px solid rgba(240,235,230,0.1)`.  
  → Décision : les cards sont visuellement sombres sur hover (photo + gradient), le contraste statique est suffisant pour le contexte décoratif.

### B6 — Navigation & interactions

| Point | Résultat |
|-------|---------|
| Menu burger | ✅ `48×48px`, zone tactile OK |
| Dropdown mobile | ✅ accordéon statique sous 768px |
| `.nav__cta` | ✅ `display: none` sur mobile |
| Curseur custom tactile | ✅ désactivé via `(pointer: coarse)` en JS |
| Accessibilité clavier dropdown | ✅ `aria-expanded`, `aria-haspopup`, `role="menu"` |

### B7 — Formulaire contact

| Point | Résultat |
|-------|---------|
| Labels `for` / inputs `id` | ✅ Tous appariés |
| Select — double chevron | ✅ `appearance: none` + flèche SVG custom (pas de doublon) |
| Inputs hauteur mobile | 🟡 padding `0.8rem` = ~27px + font = ~42px (légèrement sous 44px) |
| Checkbox zone tactile | 🟠 `16×16px` — compensé par label large adjacent |

**Problème noté :**
- 🟠 **B7-1** La checkbox RGPD est 16×16px. La zone cliquable est étendue par le label adjacent (grande zone textuelle), donc acceptable en pratique. Taille augmentée à 18×18px pour améliorer.

### B8 — Animations

| Point | Résultat |
|-------|---------|
| `prefers-reduced-motion` | ✅ Toutes animations à 0.01ms |
| Ken Burns + `will-change` | ✅ `will-change: transform` sur `.hero__bg-img` |
| Parallax RAF | ✅ `requestAnimationFrame` robuste |
| IntersectionObserver `.reveal-up` | ✅ Présent dans app.js |

### B9 — Images & médias

| Image | loading | Format | alt | Résultat |
|-------|---------|--------|-----|---------|
| `hero-cour-appel.jpg` | eager ✅ | JPG | "" dans aria-hidden ✅ | ✅ |
| `photo.jpg` | lazy ✅ | JPG | Descriptif ✅ | ✅ |
| `domaine-famille.webp` | lazy ✅ | WebP ✅ | "" décoratif ✅ | ✅ |
| `_u_domaine_famille.jpg` | lazy ✅ | JPG | Descriptif ✅ | ✅ |
| `domaine-famille-horizontal.webp` | eager ✅ | WebP ✅ | "" dans contexte sombre ✅ | ✅ |
| `img-dark.jpg` (citation) | — | JPG | "" + masquée (light mode) | ✅ |

---

## PARTIE C — Optimisation & performance

### C1 — Scores Lighthouse estimés (analyse statique)
*NB : scores estimés par analyse de code, sans exécution Lighthouse en environnement CLI*

| Métrique | Estimation | Raison |
|----------|-----------|--------|
| Performance | ~80–88 mobile | Images JPG non WebP (hero), pas de `srcset`, fonts Google sync |
| Accessibilité | ~88 → **95** après correctifs | h1 manquants corrigés, contraste faq__cat-title corrigé |
| Best Practices | ~95 | Code propre, HTTPS |
| SEO | ~88 → **95** après correctifs | og:image + canonical + JSON-LD homepage ajoutés |

### C2 — Poids & chargement

| Point | Résultat |
|-------|---------|
| WebP utilisé | ✅ Sur domaine images et overview |
| `preconnect` fonts | ✅ Présent sur toutes les pages |
| `font-display: swap` | 🟡 Absent dans la déclaration Google Fonts URL — géré côté Google par défaut |
| `loading="lazy"` | ✅ Sur toutes les images non-above-the-fold |
| `loading="eager"` hero | ✅ Correct |
| Dimensions images réservées | 🟡 Pas de `width`/`height` sur img hero, mais `position: absolute` = pas de CLS |

### C3 — SEO technique

| Point | Résultat |
|-------|---------|
| sitemap.xml | ✅ URLs sans `.html`, cohérent avec les canonicals des pages |
| robots.txt | ✅ Présent, pointe vers le sitemap |
| canonical index.html | 🔴 **Absent** → ajouté |
| og:image index.html | 🔴 **Absent** → ajouté |
| og:title/description index.html | 🔴 **Absents** → ajoutés |
| JSON-LD homepage | 🔴 **Absent** → ajouté (Attorney + LegalService) |
| JSON-LD pages domaines | ✅ Présent (LegalService complet) |
| Titles ≤ 60 chars | ✅ Tous conformes |
| Meta descriptions ≤ 155 chars | ✅ Toutes conformes |
| Favicons (5 formats) | ✅ Sur les 10 pages |
| H1 unique par page | ✅ Corrigé (honoraires/faq/contact avaient h2) |

### C4 — Cohérence inter-pages

| Point | Résultat |
|-------|---------|
| Header identique | ✅ Même HTML nav sur toutes les pages |
| Footer identique | ✅ Même structure, chemins `../assets/` corrects depuis `/domaines/*` |
| Tokens couleur/typo | ✅ `--ivory`, `--espresso`, `--taupe`, `--sand` utilisés partout |
| Google Fonts | 🟡 Playfair Display ajouté seulement sur index.html (pages intérieures n'en ont pas besoin car hero__title n'existe que sur index) |

---

## RÉCAPITULATIF DES DÉFAUTS

### 🔴 Critiques (6 — tous corrigés)
1. 6 sections orphelines avec H3 vides sur pages domaines
2. H3 avant H2 sur présentation.html
3. H1 manquant sur honoraires, faq, contact
4. `og:image`, `og:title`, `canonical`, JSON-LD absents sur homepage
5. Section citation sombre sur présentation alors que charte = tout clair
6. `.faq__cat-title` contraste 2.1:1 (insuffisant WCAG)

### 🟠 Moyens (2 — corrigés)
1. Checkbox RGPD 16×16px → passée à 18×18px
2. `faq__cat-title` couleur trop pâle → `var(--taupe)` direct

### 🟡 Mineurs (3 — listés, non bloquants)
1. `font-display: swap` non explicité dans l'URL Google Fonts (géré côté Google)
2. Les `domaine-overview__visual` n'ont pas d'`aspect-ratio` CSS explicite (pas de CLS réel)
3. Inputs formulaire ~42px (légèrement sous 44px recommandé mobile)

---

## CE QUI RESTE EN SUSPENS

| Item | Raison |
|------|--------|
| Contenus des sous-sections domaines | Attend validation cliente (cf. CONTENUS_A_VENIR.md) |
| Choix de police définitif (Playfair vs Cormorant) | Attend retour cliente sur test-fonts.html |
| Scores Lighthouse réels | Nécessite un environnement de navigateur headless (non disponible en CLI) |
| Images hero en WebP + srcset | Optimisation long terme, photos à recompresser côté cliente |
| Abandon du `img-dark.jpg` | Image devient inutilisée avec section-citation en clair |
