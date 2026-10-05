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
test('current homepage keeps mobile cards stacked and its hero image framed', () => {
  assert.equal(declarations('.cv-design-grid, .cv-studies__grid', 'grid-template-columns', '(max-width: 639px)').at(-1), '1fr');
  assert.equal(declarations('.cv-hero__image', 'object-fit', '').at(-1), 'cover');
  assert.match(fs.readFileSync('src/app/page.tsx', 'utf8'), /<CasaviewHome/);
});
test('mobile home sections have readable space and portrait height', () => {
  assert.equal(declarations('.cv-about__content, .cv-difference__content', 'padding', '(max-width: 639px)').at(-1), '36px 24px');
  assert.equal(declarations('.cv-leadership__image', 'height', '(max-width: 639px)').at(-1), '360px');
});
test('menu and drawer reserve dynamic viewport and safe-area space', () => {
  assert.match(declarations('.mobile-menu', 'max-height', '').at(-1), /100dvh.*safe-area-inset-top/);
  assert.equal(declarations('.enquiry-drawer__panel', 'height', '').at(-1), '100dvh');
  assert.match(fs.readFileSync('src/app/layout.tsx', 'utf8'), /viewportFit: 'cover'/);
});
test('home service selector uses three bounded tablet and phone columns', () => {
  assert.equal(declarations('.cv-selector', 'grid-template-columns', '(max-width: 1023px)').at(-1), 'repeat(3, minmax(0, 1fr))');
  assert.equal(declarations('.cv-selector__link', 'min-height', '(max-width: 639px)').at(-1), '102px');
});
