/**
 * Server-HTML test. Fetches every public route over plain HTTP (no JavaScript, no browser) and checks that the
 * first response already contains the real page: positioned inside <main>, not inside a hidden/pending/streamed
 * block, with navigation, a call to action and a footer.
 *   node scripts/qa-ssr.mjs [--base-url=http://127.0.0.1:3010] [--live=true]
 */
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
const local = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
const productionHosts = ['jufaja-homes-platform.vercel.app', 'www.jufajaconstructions.com.au', 'jufajaconstructions.com.au'];
assert(local || (argument('live', 'false') === 'true' && base.protocol === 'https:' && productionHosts.includes(base.hostname)), 'Use localhost or an approved HTTPS production host with --live=true');

const app = new URL('../src/app/', import.meta.url);
async function discover(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const routes = entries.some(entry => entry.name === 'page.tsx') ? [prefix || '/'] : [];
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('[') && entry.name !== 'api') routes.push(...await discover(new URL(`${entry.name}/`, directory), `${prefix}/${entry.name}`));
  }
  return routes;
}
const designs = JSON.parse(await readFile(new URL('../src/data/designs.json', import.meta.url), 'utf8'));
const routes = [...await discover(app), ...designs.map(design => `/designs/${design.slug}`)];

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const HIDING_STYLE = /(?:^|;)\s*(?:display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0(?:\.0+)?)\s*(?:;|$)/i;
const INTERNAL_CTA = /^\/(?:contact|designs|custom-homes|packages|knockdown-rebuild|display-homes|inclusions|projects)?(?:[/?#]|$)/;

/** Minimal tag walker: yields open/close events with attributes; ignores comments, script and style bodies. */
function* tags(html) {
  const pattern = /<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1>|<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
  for (const match of html.matchAll(pattern)) {
    if (!match[3]) continue;
    const attrs = {};
    for (const attr of match[4].matchAll(/([^\s"'=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) attrs[attr[1].toLowerCase()] = attr[2] ?? attr[3] ?? attr[4] ?? '';
    yield { close: Boolean(match[2]), name: match[3].toLowerCase(), attrs, index: match.index };
  }
}

const text = html => html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[#\w]+;/g, ' ').replace(/\s+/g, ' ').trim();

function inspect(html, route) {
  const problems = [];
  const fail = message => problems.push(message);
  const mainOpen = html.indexOf('<main');
  const mainClose = html.indexOf('</main>');
  if (mainOpen < 0 || mainClose < mainOpen) return [`no <main> element`];
  const main = html.slice(mainOpen, mainClose + 7);
  const afterMain = html.slice(mainClose + 7);

  // Streaming / pending / outlined Suspense output means content is delivered by script, not by the document.
  if (/<template id="B:\d+"/.test(html)) fail('contains <template id="B:n"> pending Suspense boundary');
  if (/<div hidden[^>]*id="S:\d+"/.test(html) || /id="S:\d+"/.test(html)) fail('contains hidden streamed segment (id="S:n")');
  if (/\$RC\(|\$RS\(|\$RX\(/.test(html)) fail('contains Suspense completion script ($RC/$RS/$RX)');
  if (html.includes('<!--$?-->')) fail('contains pending Suspense marker <!--$?-->');
  if (/aria-busy="true"/.test(main)) fail('<main> contains aria-busy loading placeholder');
  if (/Loading page/.test(html)) fail('contains loading skeleton text');

  // Title text.
  const title = /<title[^>]*>([\s\S]*?)<\/title>/.exec(html)?.[1].trim();
  if (!title) fail('missing <title> text');

  // H1: exists, has text, lives in <main>, and no ancestor or inline style hides it.
  const stack = [];
  let h1 = null;
  for (const tag of tags(main)) {
    if (tag.close) {
      for (let i = stack.length - 1; i >= 0; i -= 1) if (stack[i].name === tag.name) { stack.length = i; break; }
      continue;
    }
    if (tag.name === 'h1' && !h1) {
      const chain = [...stack, tag];
      const hiddenBy = chain.find(item => 'hidden' in item.attrs || item.attrs['aria-hidden'] === 'true' || HIDING_STYLE.test(item.attrs.style ?? ''));
      h1 = { index: tag.index, hiddenBy: hiddenBy?.name };
    }
    if (!VOID.has(tag.name)) stack.push(tag);
  }
  if (!h1) fail('no <h1> inside <main>');
  else {
    if (h1.hiddenBy) fail(`<h1> is hidden by <${h1.hiddenBy}>`);
    const heading = text(/<h1\b[\s\S]*?<\/h1>/.exec(main)?.[0] ?? '');
    if (heading.length < 8) fail(`<h1> text too short: "${heading}"`);
  }

  // Content body in <main>.
  const words = text(main).split(' ').filter(Boolean).length;
  if (words < 40) fail(`only ${words} words inside <main>`);
  // Content must not be server-rendered hidden. Decorative (aria-hidden) elements such as drawing lines and the intro overlay may animate in.
  const hiddenContent = [];
  const walk = [];
  for (const tag of tags(main)) {
    if (tag.close) {
      for (let i = walk.length - 1; i >= 0; i -= 1) if (walk[i].name === tag.name) { walk.length = i; break; }
      continue;
    }
    const decorative = tag.name === 'path' || tag.attrs['aria-hidden'] === 'true' || walk.some(item => item.attrs['aria-hidden'] === 'true');
    if (!decorative && HIDING_STYLE.test(tag.attrs.style ?? '')) hiddenContent.push(`<${tag.name} style="${tag.attrs.style}">`);
    if (!VOID.has(tag.name)) walk.push(tag);
  }
  if (hiddenContent.length) fail(`${hiddenContent.length} content element(s) in <main> server-rendered hidden: ${hiddenContent[0].slice(0, 90)}`);
  if (/data-state="armed"/.test(main)) fail('reveal element server-rendered in armed (hidden) state');

  // Navigation.
  const header = html.slice(0, mainOpen);
  const navLinks = [...header.matchAll(/<nav\b[\s\S]*?<\/nav>/g)].flatMap(nav => [...nav[0].matchAll(/href="(\/[^"]*)"/g)].map(link => link[1]));
  if (!navLinks.includes('/designs') || !navLinks.includes('/contact')) fail(`navigation missing /designs or /contact (found ${navLinks.length} links)`);

  // Primary CTA: an internal call-to-action link or the enquiry submit button inside <main>.
  const ctaLinks = [...main.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map(link => link[1]).filter(href => INTERNAL_CTA.test(href) || href.startsWith('tel:') || href.startsWith('mailto:'));
  const submit = /<button\b[^>]*type="submit"/.test(main);
  if (!ctaLinks.length && !submit && route !== '/privacy') fail('no call-to-action link or submit button inside <main>');

  // Footer comes after <main> and carries links.
  const footer = /<footer\b[\s\S]*?<\/footer>/.exec(afterMain)?.[0];
  if (!footer) fail('no <footer> after <main>');
  else if (!/<a\b[^>]*href=/.test(footer)) fail('<footer> has no links');
  return problems;
}

const failures = [];
const summary = [];
for (const route of routes) {
  const response = await fetch(new URL(route, base), { headers: { 'user-agent': 'Mozilla/5.0 (compatible; jufaja-qa-ssr/1.0)' } });
  const html = await response.text();
  const problems = response.status === 200 ? inspect(html, route) : [`HTTP ${response.status}`];
  if (problems.length) failures.push({ route, problems });
  else summary.push(route);
}
console.log(JSON.stringify({ base: base.origin, routes: routes.length, passed: summary.length, failed: failures.length }));
for (const failure of failures.slice(0, 20)) console.log(`FAIL ${failure.route}\n  - ${failure.problems.join('\n  - ')}`);
if (failures.length) process.exit(1);
