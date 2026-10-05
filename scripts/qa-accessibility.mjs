import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import assert from 'node:assert/strict';
const argument = (name, fallback) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const base = new URL(argument('base-url', 'http://127.0.0.1:3010'));
const local = ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname);
const productionHosts = ['jufaja-homes-platform.vercel.app', 'www.jufajaconstructions.com.au', 'jufajaconstructions.com.au'];
assert(local || (argument('live', 'false') === 'true' && base.protocol === 'https:' && productionHosts.includes(base.hostname)), 'Use localhost or an approved HTTPS production host with --live=true');
const output = argument('output', path.join(tmpdir(), 'jufaja-production-audit'));
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const results = [];
try {
  const designs = JSON.parse(await readFile(new URL('../src/data/designs.json', import.meta.url), 'utf8'));
  const samples = ['single', 'double', 'duplex', 'granny', 'rural'].map(type => designs.find(design => design.dwellingType === type)).filter(Boolean);
  const routes = ['/', '/about-us', '/contact', '/custom-homes', '/designs', '/display-homes', '/inclusions', '/knockdown-rebuild', '/packages', '/privacy', '/projects', ...samples.map(design => '/designs/' + design.slug), '/audit-missing-page'];
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { window.scrollTo(0, document.body.scrollHeight); await document.fonts.ready; });
      await page.waitForTimeout(100);
      await page.addScriptTag({ path: require.resolve('axe-core') });
      const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } })).violations.map(item => ({ id: item.id, impact: item.impact, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })));
      results.push({ route, width, violations });
      if (violations.length) console.log(JSON.stringify({ route, width, violations }));
    }
  }
  const totalViolations = results.reduce((sum, result) => sum + result.violations.length, 0);
  console.log(`Accessibility checks: ${results.length}, violations: ${totalViolations}`);
  if (totalViolations > 0) process.exitCode = 1;
} finally {
  await mkdir(output, { recursive: true });
  await writeFile(path.join(output, 'accessibility.json'), JSON.stringify(results, null, 2));
  await browser.close();
}
