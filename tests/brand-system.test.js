const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const brandDirectory = path.join(__dirname, '../public/brand');

test('canonical logo preserves the approved supplied artwork byte for byte', () => {
  const original = fs.readFileSync(path.join(brandDirectory, 'jufaja-logo-3d.png'));
  const canonical = fs.readFileSync(path.join(brandDirectory, 'jufaja-logo-transparent.png'));
  assert.deepEqual(canonical, original);
  assert.equal(crypto.createHash('sha256').update(canonical).digest('hex'), '54aabe5a0672589e2633a2042a665612f87d42ae43f5e834cff524d266b642fd');
});

test('legacy SVG filenames carry the exact approved raster derivatives, without a redraw', () => {
  for (const name of ['jufaja-logo-horizontal.svg', 'jufaja-logo-stacked.svg', 'jufaja-logo-light.svg', 'jufaja-logo-dark.svg']) {
    const svg = fs.readFileSync(path.join(brandDirectory, name), 'utf8');
    const encoded = svg.match(/base64,([^" ]+)/)[1];
    assert.deepEqual(Buffer.from(encoded, 'base64'), fs.readFileSync(path.join(brandDirectory, 'jufaja-logo.png')));
    assert.doesNotMatch(svg, /<path|<text/);
  }
});

test('website lockups and intro use the same approved full artwork', () => {
  const read = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  assert.match(read('src/components/layout/Header.tsx'), /<JufajaLogo size="sm" theme="light"/);
  assert.match(read('src/components/layout/Footer.tsx'), /<JufajaLogo theme="dark"/);
  assert.match(read('src/components/brand/JufajaLogo.tsx'), /\/brand\/jufaja-logo-transparent\.png/);
  assert.match(read('src/components/motion/CinematicIntro.tsx'), /\/brand\/jufaja-logo-transparent\.png/);
  assert.doesNotMatch(read('src/components/motion/CinematicIntro.tsx'), /<motion\.p(?:\s|>)|<JufajaMark/);
  assert.match(read('src/app/layout.tsx'), /icons:\s*\{\s*icon:\s*'\/brand\/favicon\.svg'/);
  assert.match(read('src/components/layout/StructuredData.tsx'), /\/brand\/jufaja-logo\.png/);
});
