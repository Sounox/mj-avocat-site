# AUDIT VISUEL — Cabinet Maître Morgane JOSEPH
*Basé sur inspection du code (index.html + styles.css + app.js)*

---

## ✅ Points forts à conserver

| Élément | État |
|---------|------|
| Hero 200vh sticky pin | ✓ Implémenté |
| Massive "JOSEPH" scroll-driven (22vw → 55vw) | ✓ Implémenté |
| Canvas particles | ✓ Implémenté |
| Alternance dark/light sections | ✓ Implémenté |
| Ghost keyword domaines (clip-path reveal) | ✓ Implémenté |
| Curseur personnalisé dot + ring lerp | ✓ Implémenté |
| Scroll reveals (IntersectionObserver) | ✓ Implémenté |
| Split text animation (chars/words) | ✓ Implémenté |
| Accordéons FAQ | ✓ Implémenté |
| Card glow (--gx, --gy) | ✓ Implémenté |
| Nav hide-on-scroll | ✓ Implémenté |
| Mobile menu hamburger | ✓ Implémenté |
| Mailto fallback formulaire | ✓ Implémenté |

---

## ❌ Lacunes — impact fort

### 🔴 Globaux (traversent tout le site)
- **Grain/texture global absent** — le site paraît "écran plat", sans matière
- **Loader d'entrée absent** — première visite sans rituel de révélation
- **Numéros romains décoratifs absents** — pas d'ancrage subliminal par section

### 🔴 Hero
- **Marquee domaines absent** — le bas du hero est vide avant le scroll indicator
- Hero remplit bien 100vh ✓, CTAs hiérarchisés primary/ghost ✓

### 🔴 Présentation
- **Pas de drop cap** — premier paragraphe identique aux autres, sans geste typographique
- Photo portrait présente ✓, pas de rotation/overlap mais acceptable

### 🔴 Domaines (priorité absolue)
- **Aucune image par domaine** — les 3 lignes sont purement textuelles
- Assets disponibles non utilisés : img-room.jpg (Famille), img-books.jpg (Civil), img-texture.jpg (AAH)
- Ghost keyword ✓, mais visuellement pauvre sans image d'ambiance

### 🟡 Honoraires
- 4 h-cards ✓, glow ✓
- Numéro romain BG absent

### 🟡 Contact
- img-desk.jpg présent en BG mais opacity 0.06 = invisible
- 4 c-cards ✓

### 🟡 Footer
- img-montpellier.jpg opacity 0.2 = trop faible
- Pas de min-height 80vh — pas assez dramatique

---

## Assets disponibles non référencés dans index.html

| Fichier | Taille | Usage possible |
|---------|--------|----------------|
| img-books.jpg | 133 KB | Domaine Civil |
| img-room.jpg | 138 KB | Domaine Famille |
| img-texture.jpg | 119 KB | Domaine AAH |
| texture-paper.jpg | 38 KB | Grain global overlay |
| img-dark.jpg | 235 KB | Background citation |
| 2_LOGO_BEIGE.png | 39 KB | Variante logo |
| 3_LOGO_MARRON.png | 39 KB | Variante logo |

---

## Plan d'exécution (par priorité décroissante)

1. [x] Grain texture global (body::after, texture-paper.jpg)
2. [x] Loader d'entrée (sessionStorage, curtain lift)
3. [x] Marquee hero bas
4. [x] Section citation plein écran
5. [x] Images d'ambiance par domaine
6. [x] Drop cap présentation
7. [x] Numéros romains sections background
8. [x] Micro-tilt boutons hover
9. [x] Underline animé depuis centre
10. [x] Footer min-height 80vh + image plus visible
