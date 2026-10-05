import { createHash } from 'node:crypto';
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const excluded = new Set(['node_modules', '.next', '.git', 'out', 'build', 'docs']);
const visualExtension = /\.(png|jpe?g|webp|avif|svg|gif|ico|glb|gltf|mp4|webm)$/i;
const textExtension = /\.(tsx?|jsx?|mjs|cjs|json|css|md|html)$/i;

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.filter(entry => !excluded.has(entry.name)).map(entry => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(absolute) : [absolute];
  }));
  return groups.flat();
}

// Difference hashes compare visual content independently of encoding or dimensions.
async function differenceHash(bytes) {
  const pixels = await sharp(bytes).flatten({ background: '#ffffff' }).resize(9, 8, { fit: 'fill' }).greyscale().raw().toBuffer();
  let hash = 0n;
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 8; x += 1) {
      hash = (hash << 1n) | BigInt(pixels[y * 9 + x] > pixels[y * 9 + x + 1]);
    }
  }
  return hash.toString(16).padStart(16, '0');
}

function distance(first, second) {
  let bits = BigInt(`0x${first}`) ^ BigInt(`0x${second}`);
  let count = 0;
  while (bits) { count += 1; bits &= bits - 1n; }
  return count;
}

const files = await filesIn(root);
const sources = await Promise.all(files.filter(file => textExtension.test(file) && !file.endsWith('audit-assets.mjs')).map(async file => ({
  file: path.relative(root, file).replaceAll('\\', '/'), text: await readFile(file, 'utf8'),
})));
const assets = [];
for (const file of files.filter(file => visualExtension.test(file)).sort()) {
  const bytes = await readFile(file);
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const usages = sources.filter(source => source.text.includes(path.basename(file))).map(source => source.file);
  const asset = { file: relative, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), usages };
  if (!/\.(glb|gltf|mp4|webm)$/i.test(file)) {
    const metadata = await sharp(bytes).metadata();
    Object.assign(asset, { width: metadata.width, height: metadata.height, alpha: metadata.hasAlpha, perceptualHash: await differenceHash(bytes) });
  }
  assets.push(asset);
}
const hashGroups = new Map();
for (const asset of assets) {
  const group = hashGroups.get(asset.sha256) ?? [];
  group.push(asset);
  hashGroups.set(asset.sha256, group);
}
const exactDuplicates = [...hashGroups.values()].filter(group => group.length > 1).map(group => group.map(asset => asset.file));
const nearDuplicates = [];
for (let i = 0; i < assets.length; i += 1) {
  for (let j = i + 1; j < assets.length; j += 1) {
    const a = assets[i], b = assets[j];
    if (!a.perceptualHash || !b.perceptualHash || a.sha256 === b.sha256) continue;
    const hammingDistance = distance(a.perceptualHash, b.perceptualHash);
    if (hammingDistance <= 6) nearDuplicates.push({ files: [a.file, b.file], hammingDistance });
  }
}
const report = {
  method: 'Repository-wide SHA-256, Sharp dimensions/alpha, 64-bit perceptual difference hashes (distance <=6), and filename reference searches. Candidates require human review; generated/script prerequisites and source originals are not orphans.',
  totalAssets: assets.length,
  exactDuplicates,
  nearDuplicates,
  withoutTextReferences: assets.filter(asset => asset.usages.length === 0).map(asset => asset.file),
  assets,
};
await mkdir(path.join(root, 'docs'), { recursive: true });
await writeFile(path.join(root, 'docs', 'asset-inventory.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Inventoried ${assets.length} assets; ${exactDuplicates.length} exact groups; ${nearDuplicates.length} visual candidates. See docs/asset-inventory.json.`);
