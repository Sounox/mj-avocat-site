import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const files = [
  'index.html',
  'presentation.html',
  'domaines.html',
  'honoraires.html',
  'faq.html',
  'contact.html',
  'mentions-legales.html',
  'politique-confidentialite.html',
  'premier-rendez-vous.html',
  'aide-juridictionnelle.html',
  'zone-intervention.html',
  'glossaire-juridique.html',
  '404.html',
  'domaines/droit-de-la-famille.html',
  'domaines/droit-civil.html',
  'domaines/contentieux-aah.html',
  'styles.css',
  'app.js'
];

const replacements = [
  ['assets/hero-tribunal-montpellier.webp', 'assets/cour-appel-montpellier-cabinet-avocat.webp'],
  ['assets/hero-tribunal-montpellier.jpg', 'assets/cour-appel-montpellier-cabinet-avocat.jpg'],
  ['assets/photo.webp', 'assets/portrait-morgane-joseph-avocat-montpellier.webp'],
  ['assets/photo.jpg', 'assets/portrait-morgane-joseph-avocat-montpellier.jpg'],
  ['assets/domaine-famille-horizontal.webp', 'assets/avocat-droit-famille-montpellier-horizontal.webp'],
  ['assets/domaine-civil-horizontal.webp', 'assets/avocat-droit-civil-montpellier-horizontal.webp'],
  ['assets/domaine-aah-horizontal.webp', 'assets/avocat-contentieux-aah-montpellier-horizontal.webp'],
  ['assets/domaine-famille.webp', 'assets/avocat-droit-famille-montpellier.webp'],
  ['assets/domaine-civil.webp', 'assets/avocat-droit-civil-montpellier.webp'],
  ['assets/domaine-aah.webp', 'assets/avocat-contentieux-aah-montpellier.webp'],
  ['../assets/domaine-famille-horizontal.webp', '../assets/avocat-droit-famille-montpellier-horizontal.webp'],
  ['../assets/domaine-civil-horizontal.webp', '../assets/avocat-droit-civil-montpellier-horizontal.webp'],
  ['../assets/domaine-aah-horizontal.webp', '../assets/avocat-contentieux-aah-montpellier-horizontal.webp'],
  ['../assets/domaine-famille.webp', '../assets/avocat-droit-famille-montpellier.webp'],
  ['../assets/domaine-civil.webp', '../assets/avocat-droit-civil-montpellier.webp'],
  ['../assets/domaine-aah.webp', '../assets/avocat-contentieux-aah-montpellier.webp'],
  ['../assets/_u_domaine_famille.webp', '../assets/avocat-droit-famille-montpellier-horizontal.webp'],
  ['../assets/_u_domaine_famille.jpg', '../assets/avocat-droit-famille-montpellier-horizontal.jpg'],
  ['Logo Maître Morgane JOSEPH', 'Logo Cabinet Maître Morgane JOSEPH'],
  ['height="44" width="auto"', 'width="44" height="44"'],
  ['width="60" height="auto"', 'width="60" height="60"']
];

for (const file of files) {
  const fullPath = path.join(root, file);
  let source = fs.readFileSync(fullPath, 'utf8');
  for (const [from, to] of replacements) {
    source = source.replaceAll(from, to);
  }

  source = source.replace(
    'src="assets/cour-appel-montpellier-cabinet-avocat.jpg" alt=""',
    'src="assets/cour-appel-montpellier-cabinet-avocat.jpg" alt="Façade de la Cour d\'appel de Montpellier"'
  );
  source = source.replaceAll(
    'alt="Maître Morgane JOSEPH, Avocat au Barreau de Montpellier"',
    'alt="Maître Morgane JOSEPH, avocat au Barreau de Montpellier"'
  );

  source = source.replace(
    /<img src="\.\.\/assets\/avocat-droit-famille-montpellier-horizontal\.webp" alt="" loading="eager" decoding="async">/,
    '<img src="../assets/avocat-droit-famille-montpellier-horizontal.webp" alt="" role="presentation" loading="eager" fetchpriority="high" decoding="async" width="1672" height="941">'
  );
  source = source.replace(
    /<img src="\.\.\/assets\/avocat-droit-civil-montpellier-horizontal\.webp" alt="" loading="eager" decoding="async">/,
    '<img src="../assets/avocat-droit-civil-montpellier-horizontal.webp" alt="" role="presentation" loading="eager" fetchpriority="high" decoding="async" width="1672" height="941">'
  );
  source = source.replace(
    /<img src="\.\.\/assets\/avocat-contentieux-aah-montpellier-horizontal\.webp" alt="" loading="eager" decoding="async">/,
    '<img src="../assets/avocat-contentieux-aah-montpellier-horizontal.webp" alt="" role="presentation" loading="eager" fetchpriority="high" decoding="async" width="1672" height="941">'
  );

  source = source.replace(
    /<img src="\.\.\/assets\/avocat-droit-famille-montpellier\.webp" alt="" loading="lazy" decoding="async">/,
    '<img src="../assets/avocat-droit-famille-montpellier.webp" alt="Avocat en droit de la famille à Montpellier" loading="lazy" decoding="async" width="941" height="1672">'
  );
  source = source.replace(
    /<img src="\.\.\/assets\/avocat-droit-civil-montpellier\.webp" alt="" loading="lazy" decoding="async">/,
    '<img src="../assets/avocat-droit-civil-montpellier.webp" alt="Avocat en droit civil à Montpellier" loading="lazy" decoding="async" width="941" height="1672">'
  );
  source = source.replace(
    /<img src="\.\.\/assets\/avocat-contentieux-aah-montpellier\.webp" alt="" loading="lazy" decoding="async">/,
    '<img src="../assets/avocat-contentieux-aah-montpellier.webp" alt="Avocat en contentieux AAH à Montpellier" loading="lazy" decoding="async" width="941" height="1672">'
  );

  source = source.replace(
    /<img src="\.\.\/assets\/avocat-droit-famille-montpellier-horizontal\.jpg" alt="[^"]*" loading="lazy" decoding="async" width="1200" height="800">/,
    '<img src="../assets/avocat-droit-famille-montpellier-horizontal.jpg" alt="Accompagnement en droit de la famille à Montpellier" loading="lazy" decoding="async" width="1672" height="941">'
  );

  fs.writeFileSync(fullPath, source, 'utf8');
  console.log(`updated ${file}`);
}
