import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const htmlFiles = [
  ...fs.readdirSync(root).filter((file) => file.endsWith('.html')).map((file) => path.join(root, file)),
  ...fs.readdirSync(path.join(root, 'domaines')).filter((file) => file.endsWith('.html')).map((file) => path.join(root, 'domaines', file))
];

const replacements = new Map([
  ['href="index.html"', 'href="/"'],
  ['href="../index.html"', 'href="/"'],
  ['href="presentation.html"', 'href="/presentation"'],
  ['href="../presentation.html"', 'href="/presentation"'],
  ['href="domaines.html"', 'href="/domaines"'],
  ['href="../domaines.html"', 'href="/domaines"'],
  ['href="domaines/droit-de-la-famille.html"', 'href="/domaines/droit-de-la-famille"'],
  ['href="../domaines/droit-de-la-famille.html"', 'href="/domaines/droit-de-la-famille"'],
  ['href="domaines/droit-civil.html"', 'href="/domaines/droit-civil"'],
  ['href="../domaines/droit-civil.html"', 'href="/domaines/droit-civil"'],
  ['href="domaines/contentieux-aah.html"', 'href="/domaines/contentieux-aah"'],
  ['href="../domaines/contentieux-aah.html"', 'href="/domaines/contentieux-aah"'],
  ['href="honoraires.html"', 'href="/honoraires"'],
  ['href="../honoraires.html"', 'href="/honoraires"'],
  ['href="faq.html"', 'href="/faq"'],
  ['href="../faq.html"', 'href="/faq"'],
  ['href="contact.html"', 'href="/contact"'],
  ['href="../contact.html"', 'href="/contact"'],
  ['href="premier-rendez-vous.html"', 'href="/premier-rendez-vous"'],
  ['href="../premier-rendez-vous.html"', 'href="/premier-rendez-vous"'],
  ['href="aide-juridictionnelle.html"', 'href="/aide-juridictionnelle"'],
  ['href="../aide-juridictionnelle.html"', 'href="/aide-juridictionnelle"'],
  ['href="zone-intervention.html"', 'href="/zone-intervention"'],
  ['href="../zone-intervention.html"', 'href="/zone-intervention"'],
  ['href="glossaire-juridique.html"', 'href="/glossaire-juridique"'],
  ['href="../glossaire-juridique.html"', 'href="/glossaire-juridique"'],
  ['href="politique-confidentialite.html"', 'href="/politique-confidentialite"'],
  ['href="../politique-confidentialite.html"', 'href="/politique-confidentialite"'],
  ['href="mentions-legales.html"', 'href="/mentions-legales"'],
  ['href="../mentions-legales.html"', 'href="/mentions-legales"']
]);

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let updated = content;

  for (const [from, to] of replacements) {
    updated = updated.split(from).join(to);
  }

  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`normalized ${path.relative(root, file)}`);
  }
}
