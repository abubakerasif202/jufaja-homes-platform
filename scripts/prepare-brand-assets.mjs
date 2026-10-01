import { readFile, writeFile, copyFile } from 'node:fs/promises';
import sharp from 'sharp';

// Mechanical derivatives only: the approved artwork is never traced or redrawn.
const directory = new URL('../public/brand/', import.meta.url);
const source = new URL('jufaja-logo-3d.png', directory);
await copyFile(source, new URL('jufaja-logo-transparent.png', directory));
const logo = await sharp(await readFile(source)).resize(768).png({ compressionLevel: 9 }).toBuffer();
await writeFile(new URL('jufaja-logo.png', directory), logo);
const emblem = await sharp(await readFile(source))
  .extract({ left: 294, top: 10, width: 930, height: 622 })
  .resize(512).png({ compressionLevel: 9 }).toBuffer();
await writeFile(new URL('jufaja-mark.png', directory), emblem);
const favicon = await sharp(emblem).resize(96).png({ compressionLevel: 9 }).toBuffer();
const wrap = (bytes, width, height, label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}"><image width="${width}" height="${height}" href="data:image/png;base64,${bytes.toString('base64')}"/></svg>\n`;
for (const name of ['jufaja-logo-horizontal.svg', 'jufaja-logo-stacked.svg', 'jufaja-logo-light.svg', 'jufaja-logo-dark.svg']) {
  await writeFile(new URL(name, directory), wrap(logo, 768, 512, 'JUFAJA Constructions Pty Ltd'));
}
for (const name of ['jufaja-mark.svg', 'jufaja-monogram.svg']) {
  await writeFile(new URL(name, directory), wrap(emblem, 512, 342, 'JUFAJA architectural emblem'));
}
await writeFile(new URL('favicon.svg', directory), wrap(favicon, 96, 64, 'JUFAJA'));
