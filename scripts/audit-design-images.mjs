import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MIN_IMAGE_WIDTH = 1200;
const MIN_IMAGE_HEIGHT = 900;
const MIN_ASPECT_RATIO = 1.25;
const MAX_ASPECT_RATIO = 1.5;

// This validates a manual review attestation, not automated visual recognition.
export function hasApprovedVisualReview(dwellingType, sha256, review) {
  if (!review || review.outcome !== 'approved' || review.sha256 !== sha256
    || !/^[a-f0-9]{64}$/.test(sha256)
    || typeof review.notes !== 'string' || !review.notes.trim()
    || !Number.isInteger(review.observedStoreys) || review.observedStoreys < 1
    || !Number.isInteger(review.dwellingUnits) || review.dwellingUnits < 1) return false;
  if (dwellingType === 'single' && review.observedStoreys !== 1) return false;
  if (dwellingType === 'double' && review.observedStoreys !== 2) return false;
  if (dwellingType === 'duplex' && review.dwellingUnits !== 2) return false;
  return true;
}

export function hasSuitableImageDimensions(width, height) {
  const aspectRatio = width / height;
  return width >= MIN_IMAGE_WIDTH
    && height >= MIN_IMAGE_HEIGHT
    && aspectRatio >= MIN_ASPECT_RATIO
    && aspectRatio <= MAX_ASPECT_RATIO;
}

export function acceptsReviewedNativeDimensions(assignment, width, height) {
  return width === 1200 && height === 896
    && assignment.image?.width === width && assignment.image?.height === height
    && /^[a-f0-9]{64}$/.test(assignment.image?.sha256 ?? '')
    && assignment.dimensionException?.sha256 === assignment.image.sha256
    && assignment.dimensionException?.reason === 'Owner approved supplied native 1200 x 896 renders without upscaling.';
}

export async function calculatePerceptualHash(imagePath) {
  const { data } = await sharp(imagePath)
    .resize(32, 32, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const coefficients = [];

  for (let vertical = 0; vertical < 8; vertical += 1) {
    for (let horizontal = 0; horizontal < 8; horizontal += 1) {
      let coefficient = 0;
      for (let y = 0; y < 32; y += 1) {
        const verticalFactor = Math.cos(((2 * y + 1) * vertical * Math.PI) / 64);
        for (let x = 0; x < 32; x += 1) {
          coefficient += data[(y * 32) + x]
            * Math.cos(((2 * x + 1) * horizontal * Math.PI) / 64)
            * verticalFactor;
        }
      }
      coefficients.push(coefficient);
    }
  }

  const sortedAc = coefficients.slice(1).sort((a, b) => a - b);
  const median = sortedAc[Math.floor(sortedAc.length / 2)];
  return coefficients.map((coefficient, index) => Number(index !== 0 && coefficient > median)).join('');
}

function hammingDistance(first, second) {
  return [...first].reduce((distance, bit, index) => distance + Number(bit !== second[index]), 0);
}

function webpDimensions(buffer) {
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') return null;
  const format = buffer.toString('ascii', 12, 16);

  if (format === 'VP8 ') {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  if (format === 'VP8L' && buffer[20] === 0x2f) {
    return {
      width: 1 + (((buffer[22] & 0x3f) << 8) | buffer[21]),
      height: 1 + (((buffer[24] & 0x0f) << 10) | (buffer[23] << 2) | ((buffer[22] & 0xc0) >> 6)),
    };
  }

  if (format === 'VP8X') {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    };
  }

  return null;
}

export async function auditDesignImages() {
  const designs = JSON.parse(await readFile(join(repositoryRoot, 'src/data/designs.json'), 'utf8'));
  const assignments = JSON.parse(await readFile(join(repositoryRoot, 'src/data/design-images.json'), 'utf8'));
  const errors = [];
  const designBySlug = new Map(designs.map((design) => [design.slug, design]));
  const assignmentBySlug = new Map();
  const paths = new Set();
  const hashes = new Set();
  const available = [];

  for (const assignment of assignments) {
    if (assignmentBySlug.has(assignment.slug)) errors.push(`Duplicate image assignment: ${assignment.slug}`);
    assignmentBySlug.set(assignment.slug, assignment);

    const design = designBySlug.get(assignment.slug);
    if (!design) {
      errors.push(`Image assignment has no catalogue design: ${assignment.slug}`);
      continue;
    }
    if (assignment.dwellingType !== design.dwellingType) {
      errors.push(`Dwelling type mismatch for ${assignment.slug}`);
    }

    if (assignment.status === 'pending') {
      if (!assignment.reason || assignment.image) errors.push(`Pending image needs a reason and no published image: ${assignment.slug}`);
      continue;
    }
    if (assignment.status !== 'available' || !assignment.image) {
      errors.push(`Invalid image assignment status for ${assignment.slug}`);
      continue;
    }

    const image = assignment.image;
    if (image.slug !== assignment.slug) errors.push(`Image slug mismatch for ${assignment.slug}`);
    if (image.path !== `/images/designs/${assignment.slug}.webp`) errors.push(`Image path does not match design slug: ${assignment.slug}`);
    if (paths.has(image.path)) errors.push(`Image path assigned more than once: ${image.path}`);
    paths.add(image.path);

    const assetDirectory = resolve(repositoryRoot, 'public/images/designs');
    const absolutePath = resolve(repositoryRoot, 'public', image.path.slice(1));
    const assetRelativePath = relative(assetDirectory, absolutePath);
    if (!assetRelativePath || assetRelativePath.startsWith('..') || isAbsolute(assetRelativePath)) {
      errors.push(`Image path escapes the design asset directory: ${assignment.slug}`);
      continue;
    }

    try {
      const [buffer, fileStat] = await Promise.all([readFile(absolutePath), stat(absolutePath)]);
      const dimensions = webpDimensions(buffer);
      if (!dimensions) errors.push(`Unsupported or invalid WebP image: ${assignment.slug}`);
      else {
        if (dimensions.width !== image.width || dimensions.height !== image.height) errors.push(`Image dimensions differ from the registry: ${assignment.slug}`);
        if (!hasSuitableImageDimensions(dimensions.width, dimensions.height)
          && !acceptsReviewedNativeDimensions(assignment, dimensions.width, dimensions.height)) errors.push(`Image dimensions are below the minimum or outside the accepted aspect ratio: ${assignment.slug}`);
      }
      const sha256 = createHash('sha256').update(buffer).digest('hex');
      if (!hasApprovedVisualReview(assignment.dwellingType, sha256, assignment.visualReview)) errors.push(`Image needs a current, architecturally consistent manual visual review: ${assignment.slug}`);
      if (sha256 !== image.sha256) errors.push(`Image SHA-256 differs from the registry: ${assignment.slug}`);
      if (fileStat.size !== image.bytes) errors.push(`Image byte size differs from the registry: ${assignment.slug}`);
      if (hashes.has(sha256)) errors.push(`Image file is an exact duplicate: ${assignment.slug}`);
      hashes.add(sha256);
      if (!/^[01]{64}$/.test(image.phash)) errors.push(`Image perceptual hash is invalid: ${assignment.slug}`);
      const phash = await calculatePerceptualHash(absolutePath);
      if (phash !== image.phash) errors.push(`Image perceptual hash differs from the image bytes: ${assignment.slug}`);
      available.push({ slug: assignment.slug, phash });
    } catch {
      errors.push(`Image file is missing or unreadable: ${assignment.slug}`);
    }
  }

  for (const slug of designBySlug.keys()) {
    if (!assignmentBySlug.has(slug)) errors.push(`Catalogue design has no image review record: ${slug}`);
  }
  for (const slug of assignmentBySlug.keys()) {
    if (!designBySlug.has(slug)) errors.push(`Image review record has no catalogue design: ${slug}`);
  }

  for (let i = 0; i < available.length; i += 1) {
    for (let j = i + 1; j < available.length; j += 1) {
      const distance = hammingDistance(available[i].phash, available[j].phash);
      if (distance <= 8) errors.push(`Near-duplicate perceptual hashes: ${available[i].slug} and ${available[j].slug} (distance ${distance})`);
    }
  }

  return {
    errors,
    catalogueCount: designs.length,
    availableCount: available.length,
    pendingSlugs: assignments.filter((assignment) => assignment.status === 'pending').map((assignment) => assignment.slug),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = await auditDesignImages();
  if (result.errors.length > 0) {
    console.error(result.errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Design image audit passed: ${result.catalogueCount} catalogue records, ${result.availableCount} unique images, ${result.pendingSlugs.length} pending image reviews.`);
  }
}
