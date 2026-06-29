/**
 * Generate the full favicon / app-icon set from the brand mark
 * (creatine-molecule logo on the teal→navy tile). Run: `node scripts/gen-favicons.mjs`.
 * Requires `sharp` (already a dependency). Outputs into /public.
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const TEAL = "#0d8f8f";
const NAVY = "#0e2a47";
const MOLECULE = "M12 2v20M5 7l7 4 7-4M5 12l7 4 7-4M5 17l7 4 7-4";

/**
 * Build a square SVG icon.
 * @param {object} o
 * @param {number} o.size        canvas px
 * @param {number} o.radius      corner radius fraction (0 = full-bleed square)
 * @param {number} o.frac        fraction of canvas the 24-unit mark spans
 * @param {number} o.stroke24    stroke width in 24-unit mark space
 * @param {boolean} o.bg         draw the gradient tile (false = transparent, mono mark)
 */
function svg({ size, radius = 0.22, frac = 0.55, stroke24 = 2.0, bg = true }) {
  const r = Math.round(radius * size);
  const markSize = frac * size;
  const offset = (size - markSize) / 2;
  const scale = markSize / 24;
  const stroke = bg ? "#ffffff" : "#000000";
  const tile = bg
    ? `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${TEAL}"/>
        <stop offset="1" stop-color="${NAVY}"/>
      </linearGradient></defs>
      <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="url(#g)"/>`
    : "";
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  ${tile}
  <g transform="translate(${offset} ${offset}) scale(${scale})" fill="none" stroke="${stroke}" stroke-width="${stroke24}" stroke-linecap="round" stroke-linejoin="round">
    <path d="${MOLECULE}"/>
  </g>
</svg>`;
}

const png = (config, size) =>
  sharp(Buffer.from(svg({ size, ...config })))
    .png()
    .toBuffer();

// Variant presets
const standard = { radius: 0.22, frac: 0.55, stroke24: 2.0 }; // rounded tile (browser/PWA)
const small = { radius: 0.18, frac: 0.62, stroke24: 2.5 }; // bolder for 16/32 legibility
const fullBleed = { radius: 0, frac: 0.54, stroke24: 2.1 }; // apple-touch (iOS rounds it)
const maskable = { radius: 0, frac: 0.46, stroke24: 2.2 }; // Android safe-zone

/** Pack 16/32/48 PNG buffers into a PNG-embedded .ico (Vista+ / all modern browsers). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach((img, i) => {
    const e = i * 16;
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, e + 0); // width
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, e + 1); // height
    dir.writeUInt8(0, e + 2); // palette
    dir.writeUInt8(0, e + 3); // reserved
    dir.writeUInt16LE(1, e + 4); // color planes
    dir.writeUInt16LE(32, e + 6); // bits per pixel
    dir.writeUInt32LE(img.data.length, e + 8); // size of data
    dir.writeUInt32LE(offset, e + 12); // offset
    offset += img.data.length;
  });

  return Buffer.concat([header, dir, ...images.map((i) => i.data)]);
}

async function main() {
  const out = async (name, buf) => {
    await writeFile(join(PUBLIC, name), buf);
    console.log("  ✓", name);
  };

  // SVG icons
  await out("icon.svg", Buffer.from(svg({ size: 512, ...standard })));
  await out(
    "safari-pinned-tab.svg",
    Buffer.from(svg({ size: 512, frac: 0.62, stroke24: 2.4, bg: false }))
  );

  // PNGs
  await out("favicon-16x16.png", await png(small, 16));
  await out("favicon-32x32.png", await png(small, 32));
  await out("apple-touch-icon.png", await png(fullBleed, 180));
  await out("android-chrome-192x192.png", await png(standard, 192));
  await out("android-chrome-512x512.png", await png(standard, 512));
  await out("icon-maskable-512x512.png", await png(maskable, 512));
  await out("mstile-150x150.png", await png(standard, 150));

  // Multi-size .ico (16 / 32 / 48)
  const ico = buildIco([
    { size: 16, data: await png(small, 16) },
    { size: 32, data: await png(small, 32) },
    { size: 48, data: await png(standard, 48) },
  ]);
  await out("favicon.ico", ico);

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
