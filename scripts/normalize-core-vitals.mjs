import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlFiles = [
  ...fs.readdirSync(root).filter((file) => file.endsWith('.html')).map((file) => path.join(root, file)),
  ...fs.readdirSync(path.join(root, 'domaines')).filter((file) => file.endsWith('.html')).map((file) => path.join(root, 'domaines', file))
];

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const updated = html
    .replaceAll(
      '<img src="assets/1_LOGO_BLANC.png" alt="" class="site-loader__logo">',
      '<img src="assets/1_LOGO_BLANC.png" alt="" class="site-loader__logo" width="120" height="120">'
    )
    .replaceAll(
      '<img src="../assets/1_LOGO_BLANC.png" alt="" class="site-loader__logo">',
      '<img src="../assets/1_LOGO_BLANC.png" alt="" class="site-loader__logo" width="120" height="120">'
    )
    .replaceAll(
      '<img src="assets/img-desk.jpg" alt="" class="contact__desk-img parallax" data-speed="0.1" loading="lazy"',
      '<img src="assets/img-desk.jpg" alt="" class="contact__desk-img parallax" data-speed="0.1" loading="lazy" width="1400" height="933"'
    )
    .replaceAll(
      'class="signature-img" loading="lazy" width="280">',
      'class="signature-img" loading="lazy" width="280" height="102">'
    )
    .replaceAll('<script src="app.js"></script>', '<script src="app.js" defer></script>')
    .replaceAll('<script src="../app.js"></script>', '<script src="../app.js" defer></script>');

  if (updated !== html) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`updated ${path.relative(root, file)}`);
  }
}
