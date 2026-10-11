import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { calculatePerceptualHash, hasSuitableImageDimensions } from './audit-design-images.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: node scripts/review-design-sources.mjs <source-directory> <report.json>');
  process.exit(1);
}
const source = resolve(args[0]);
const output = resolve(args[1]);
const outputRelative = relative(source, output);
if (!outputRelative.startsWith(`..`) && !isAbsolute(outputRelative)) {
  throw new Error('Report must be outside the original source directory.');
}
const extensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
const portable = (path) => path.replaceAll('\\', '/');
const distance = (a, b) => [...a].reduce((total, bit, index) => total + Number(bit !== b[index]), 0);
async function inventory(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error('Source symbolic links are not supported.');
    if (entry.isDirectory()) files.push(...await inventory(path));
    else if (extensions.has(extname(entry.name).toLowerCase())) files.push(path);
  }
  return files.sort();
}
async function measure(path) {
  const buffer = await readFile(path);
  const metadata = await sharp(buffer).metadata();
  if (!metadata.width || !metadata.height) throw new Error('Image has no dimensions.');
  return {
    format: metadata.format,
    width: metadata.width,
    height: metadata.height,
    aspectRatio: metadata.width / metadata.height,
    bytes: buffer.length,
    sha256: createHash('sha256').update(buffer).digest('hex'),
    phash: await calculatePerceptualHash(path),
  };
}
const designs = JSON.parse(await readFile(join(root, 'src/data/designs.json'), 'utf8'));
const registry = JSON.parse(await readFile(join(root, 'src/data/design-images.json'), 'utf8'));
const bySlug = new Map(designs.map((design) => [design.slug, design]));
const pending = registry.filter((record) => record.status === 'pending').map((record) => record.slug);
const errors = [];
const files = [];
for (const path of await inventory(source)) {
  const sourcePath = portable(relative(source, path));
  const slug = basename(path, extname(path));
  if (!bySlug.has(slug)) errors.push(`Unmatched source filename: ${sourcePath}`);
  else if (!pending.includes(slug)) errors.push(`Source targets an already published design: ${slug}`);
  try {
    const data = await measure(path);
    const suitableDimensions = hasSuitableImageDimensions(data.width, data.height);
    files.push({ sourcePath, slug, dwellingType: bySlug.get(slug)?.dwellingType ?? null, ...data,
      suitableDimensions,
      rejectionReasons: suitableDimensions ? [] : ['Fails unchanged minimum 1200 x 900 and aspect-ratio gate.'],
      architecturalApproval: 'requires_manual_review',
    });
  } catch {
    errors.push(`Unreadable image: ${sourcePath}`);
  }
}
for (const slug of pending) {
  if (!files.some((file) => file.slug === slug)) errors.push(`Missing pending design source: ${slug}`);
}
for (const file of files) {
  const matching = files.filter((other) => other.slug === file.slug && other.format === file.format);
  if (matching.length > 1) errors.push(`Multiple ${file.format} source candidates for ${file.slug}`);
}
const published = [];
for (const record of registry.filter((record) => record.status === 'available')) {
  const path = resolve(root, 'public', record.image.path.replace(/^\//, ''));
  const publicRelative = relative(join(root, 'public'), path);
  if (publicRelative.startsWith('..') || isAbsolute(publicRelative)) throw new Error('Published asset escapes public directory.');
  const data = await measure(path);
  if (data.sha256 !== record.image.sha256 || data.phash !== record.image.phash) errors.push(`Published registry hash mismatch: ${record.slug}`);
  published.push({ slug: record.slug, sourcePath: record.image.path, ...data });
}
const duplicateCandidates = [];
let crossDesignComparisons = 0;
let sameSlugVariantComparisonsExcluded = 0;
for (let i = 0; i < files.length; i += 1) {
  for (const other of [...files.slice(i + 1), ...published]) {
    const file = files[i];
    if (file.slug === other.slug) {
      sameSlugVariantComparisonsExcluded += 1;
      continue;
    }
    crossDesignComparisons += 1;
    const hammingDistance = distance(file.phash, other.phash);
    const exactDuplicate = file.sha256 === other.sha256;
    if (exactDuplicate || hammingDistance <= 8) duplicateCandidates.push({
      first: file.sourcePath, firstSlug: file.slug,
      second: other.sourcePath, secondSlug: other.slug,
      exactDuplicate, hammingDistance,
    });
  }
}
const report = {
  sourceLabel: basename(source),
  method: 'Actual file bytes and Sharp metadata; unchanged production dimension predicate and 64-bit perceptual hash; cross-design near-duplicate threshold <= 8. Same-slug format variants are excluded.',
  limitations: 'Hashes cannot establish architectural correctness, facade uniqueness, text, watermarks, collages or image quality. Manual contact-sheet and full-size review remains required. Catalogue dwellingType is a filename match, not a visual architectural finding.',
  summary: {
    sourceFileCount: files.length,
    matchedPendingDesignCount: new Set(files.filter((file) => pending.includes(file.slug)).map((file) => file.slug)).size,
    publishedReferenceCount: published.length,
    dimensionFailures: files.filter((file) => !file.suitableDimensions).length,
    crossDesignComparisons,
    sameSlugVariantComparisonsExcluded,
    duplicateCandidateCount: duplicateCandidates.length,
  },
  errors: [...new Set(errors)],
  files,
  duplicateCandidates,
};
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.summary, null, 2));
if (errors.length || report.summary.dimensionFailures || duplicateCandidates.length) {
  console.error('Source review blocked: inspect report errors, dimension failures and duplicate candidates. No source files or registry records were changed.');
  process.exitCode = 1;
}
