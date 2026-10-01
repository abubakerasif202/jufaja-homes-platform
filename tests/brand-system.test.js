const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const brandDirectory = path.join(__dirname, '../public/brand');

test('canonical SVG logo variants share the JUFAJA architectural mark', () => {
  const variants = [
    'jufaja-mark.svg',
    'jufaja-logo-horizontal.svg',
    'jufaja-logo-light.svg',
    'jufaja-logo-dark.svg',
    'jufaja-logo-stacked.svg',
    'jufaja-monogram.svg',
    'favicon.svg',
  ];

  for (const name of variants) {
    const svg = fs.readFileSync(path.join(brandDirectory, name), 'utf8');
    assert.match(svg, /M14 44/ , `${name} must include the canonical roofline`);
    assert.match(svg, /M58 24/, `${name} must include the first tower`);
    assert.match(svg, /M65 30/, `${name} must include the center tower`);
    assert.match(svg, /M72 36/, `${name} must include the third tower`);
    assert.equal((svg.match(/<rect\s+x="(?:45\.5|50)"/g) ?? []).length, 4, `${name} must include the four-pane window`);
  }
});

test('header, footer, intro, favicon and structured data use the canonical SVG logo system', () => {
  const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  assert.match(read('src/components/layout/Header.tsx'), /<JufajaLogo size="sm" theme="light"/);
  assert.match(read('src/components/layout/Footer.tsx'), /<JufajaLogo theme="dark"/);
  assert.match(read('src/components/motion/CinematicIntro.tsx'), /@\/components\/brand\/JufajaMark/);
  assert.match(read('src/app/layout.tsx'), /icons:\s*\{\s*icon:\s*'\/brand\/favicon\.svg'/);
  assert.match(read('src/components/layout/StructuredData.tsx'), /\/brand\/jufaja-logo-horizontal\.svg/);
});
