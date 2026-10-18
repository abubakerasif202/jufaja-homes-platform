const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = require('./load-typescript.cjs');

const root = path.resolve(__dirname, '..');
const { HERO_SLIDES } = load('src/data/hero-slides.ts');
const { buildGalleryCategories, INSPIRATION_PHOTOS } = load('src/data/inspiration.ts');
const designs = JSON.parse(fs.readFileSync(path.join(root, 'src/data/designs.json'), 'utf8'));
const designImages = JSON.parse(fs.readFileSync(path.join(root, 'src/data/design-images.json'), 'utf8'));

const publicExists = (src) => fs.existsSync(path.join(root, 'public', src));
const routeExists = (href) => {
  const pathname = href.split(/[?#]/)[0];
  if (pathname === '/') return true;
  if (fs.existsSync(path.join(root, 'src/app', pathname, 'page.tsx'))) return true;
  const slug = pathname.match(/^\/designs\/(.+)$/)?.[1];
  return Boolean(slug && designs.some((design) => design.slug === slug));
};
const catalogueFixture = designs.map((design) => {
  const assignment = designImages.find((item) => item.slug === design.slug && item.status === 'available');
  return { slug: design.slug, name: design.name, dwellingType: design.dwellingType, featured: design.featured, facades: assignment ? [{ image: assignment.image.path }] : [] };
});

test('hero has six unique slides with local images, alt text, a disclosure caption and a real destination', () => {
  assert.equal(HERO_SLIDES.length, 6);
  assert.equal(new Set(HERO_SLIDES.map((slide) => slide.id)).size, 6);
  for (const slide of HERO_SLIDES) {
    assert.ok(publicExists(slide.photo), `Missing hero image ${slide.photo}`);
    assert.ok(slide.alt.length > 20, `${slide.id} needs descriptive alt text`);
    assert.match(slide.caption, /not a (completed )?JUFAJA project/i);
    assert.ok(routeExists(slide.cta.href), `${slide.id} CTA ${slide.cta.href} must resolve to a route`);
  }
});

test('hero headlines and calls to action match the approved brief', () => {
  const headlines = HERO_SLIDES.map((slide) => slide.lines.join(' '));
  assert.deepEqual(headlines, [
    'Building Homes for a Brighter Tomorrow.',
    'Beautiful Spaces. Thoughtfully Designed.',
    'A New Beginning at Your Existing Address.',
    'More Possibilities. Smarter Living.',
    'A Home That’s Uniquely Yours.',
    'Inspiration for Every Space.',
  ]);
  assert.deepEqual(HERO_SLIDES.map((slide) => slide.cta.label), [
    'Explore Home Designs', 'Explore Design Inspiration', 'Explore Knockdown Rebuild',
    'Explore Duplex Designs', 'Explore Custom Homes', 'View Inspiration',
  ]);
});

test('inspiration photographs are local, credited and under the Unsplash License', () => {
  for (const photo of INSPIRATION_PHOTOS) {
    assert.ok(publicExists(photo.src), `Missing photo ${photo.src}`);
    assert.match(photo.credit.sourceUrl, /^https:\/\/unsplash\.com\/photos\/[\w-]+$/);
    assert.ok(photo.credit.photographer.length > 2);
    assert.ok(photo.alt.startsWith('Inspiration photograph'));
  }
  const onDisk = fs.readdirSync(path.join(root, 'public/images/inspiration')).filter((file) => file.endsWith('.webp'));
  assert.equal(onDisk.length, INSPIRATION_PHOTOS.length, 'Every delivered inspiration image must be credited, and vice versa');
});

test('gallery covers the eight requested categories with working images and links', () => {
  const categories = buildGalleryCategories(catalogueFixture);
  assert.deepEqual(categories.map((category) => category.id), [
    'luxury-bathrooms', 'modern-kitchens', 'contemporary-living', 'new-home-facades',
    'knockdown-rebuild-inspiration', 'double-storey-homes', 'duplex-dual-living', 'outdoor-living',
  ]);
  for (const category of categories) {
    assert.ok(category.items.length >= 3, `${category.id} needs at least three cards`);
    assert.ok(routeExists(category.href) || category.href.startsWith('/contact?project='), `${category.id} link`);
    for (const item of category.items) {
      assert.ok(publicExists(item.src), `Missing image ${item.src} in ${category.id}`);
      assert.ok(item.alt.length > 15 && item.title && item.tag);
      assert.ok(routeExists(item.href) || item.href.startsWith('/contact?project='), `${item.href} must resolve`);
    }
  }
});

test('facade categories only publish designs of the matching dwelling type', () => {
  const categories = new Map(buildGalleryCategories(catalogueFixture).map((category) => [category.id, category]));
  const typeBySlug = new Map(designs.map((design) => [design.slug, design.dwellingType]));
  const expected = { 'new-home-facades': 'single', 'double-storey-homes': 'double', 'duplex-dual-living': 'duplex' };
  for (const [id, type] of Object.entries(expected)) {
    for (const item of categories.get(id).items) assert.equal(typeBySlug.get(item.id), type, `${item.id} in ${id}`);
  }
});

test('slideshow keeps accessibility and server-render contracts', () => {
  const source = fs.readFileSync(path.join(root, 'src/components/home/HeroSlideshow.tsx'), 'utf8');
  assert.match(source, /aria-roledescription="carousel"/);
  assert.match(source, /Pause slideshow/);
  assert.match(source, /visibilitychange/);
  assert.match(source, /aria-hidden=\{active \? undefined : true\}/);
  assert.equal((source.match(/<h1\s/g) || []).length, 1, 'exactly one h1');
  const css = fs.readFileSync(path.join(root, 'src/components/home/hero-slideshow.css'), 'utf8');
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(css, /animation:[^;]*(width|height|left|top)\b/);
});
