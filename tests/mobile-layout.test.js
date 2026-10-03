const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const postcss = require('postcss');

const css = postcss.parse(fs.readFileSync('src/app/globals.css', 'utf8'));
function declarations(selector, property, media) {
  const values = [];
  css.walkRules(selector, rule => {
    if ((rule.parent.type === 'atrule' ? rule.parent.params : '') !== media) return;
    rule.walkDecls(property, declaration => values.push(declaration.value));
  });
  return values;
}
test('mobile hero uses content-driven grid and landscape photography', () => {
  assert.equal(declarations('.cinematic-hero', 'height', '(max-width: 767px)').at(-1), 'auto');
  assert.equal(declarations('.cinematic-hero .hs-slide', 'position', '(max-width: 767px)').at(-1), 'relative');
  assert.equal(declarations('.cinematic-hero .hs-image-frame', 'height', '(max-width: 767px)').at(-1), 'clamp(13rem, 66.6667vw, 22rem)');
  assert.equal(declarations('.cinematic-hero .hero-controls > div', 'flex-wrap', '(max-width: 767px)').at(-1), 'wrap');
});
test('white desktop hero copy cannot override the mobile reading colour', () => {
  assert.equal(declarations('.cinematic-hero .hero-lead', 'color', '').length, 0);
  assert.equal(declarations('.cinematic-hero .hero-lead', 'color', '(max-width: 767px)').at(-1), '#5c5852');
});
test('menu and drawer reserve dynamic viewport and safe-area space', () => {
  assert.match(declarations('.mobile-menu', 'max-height', '').at(-1), /100dvh.*safe-area-inset-top/);
  assert.equal(declarations('.enquiry-drawer__panel', 'height', '').at(-1), '100dvh');
  assert.match(fs.readFileSync('src/app/layout.tsx', 'utf8'), /viewportFit: 'cover'/);
});
test('catalogue cards cannot shrink into six phone-width columns', () => {
  assert.equal(declarations('.featured-rail', 'display', '').at(-1), 'flex');
  assert.match(declarations('.featured-rail__item', 'flex', '').at(-1), /^0 0 clamp/);
  assert.match(declarations('.featured-rail__item', 'flex', '(max-width: 767px)').at(-1), /^0 0 clamp\(15rem, calc\(100vw/);
  assert.equal(declarations('.featured-rail', 'grid-auto-columns', '(max-width: 767px)').length, 0);
});
