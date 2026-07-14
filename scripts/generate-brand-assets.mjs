import sharp from "sharp";
import fs from "fs";
import path from "path";
import toIco from "to-ico";

const src = "public/Logo/Design sem nome (27)-Photoroom.png";
const brand = "public/brand";

fs.mkdirSync(brand, { recursive: true });

/** Retorna buffer PNG só com a marca (crop), fundo preto. */
async function extractMark(marginRatio = 0.08) {
  const image = sharp(src);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (data[i] > 20 || data[i + 1] > 20 || data[i + 2] > 20) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const contentW = maxX - minX + 1;
  const contentH = maxY - minY + 1;
  const margin = Math.round(Math.max(contentW, contentH) * marginRatio);
  const left = Math.max(0, minX - margin);
  const top = Math.max(0, minY - margin);
  const extractW = Math.min(width - left, contentW + margin * 2);
  const extractH = Math.min(height - top, contentH + margin * 2);

  console.log("crop", { left, top, extractW, extractH });

  return sharp(src)
    .extract({ left, top, width: extractW, height: extractH })
    .png()
    .toBuffer();
}

const markBuf = await extractMark(0.06);

// Logo de uso geral: marca grande em quadrado preto
const logoMasterSize = 512;
await sharp({
  create: {
    width: logoMasterSize,
    height: logoMasterSize,
    channels: 3,
    background: { r: 0, g: 0, b: 0 },
  },
})
  .composite([
    {
      input: await sharp(markBuf)
        .resize(Math.round(logoMasterSize * 0.92), Math.round(logoMasterSize * 0.92), {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 1 },
        })
        .toBuffer(),
      gravity: "centre",
    },
  ])
  .png()
  .toFile(path.join(brand, "logo.png"));

async function squareIcon(size, out, fill = 0.92) {
  const inner = Math.max(1, Math.round(size * fill));
  const logo = await sharp(markBuf)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    })
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: { r: 0, g: 0, b: 0 },
    },
  })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toFile(out);
}

await squareIcon(192, "public/logo192.png");
await squareIcon(512, "public/logo512.png");
await squareIcon(180, path.join(brand, "apple-touch-icon.png"));
await squareIcon(32, path.join(brand, "favicon-32.png"));
await squareIcon(16, path.join(brand, "favicon-16.png"));
await squareIcon(48, path.join(brand, "favicon-48.png"));

const buf16 = await sharp(path.join(brand, "favicon-16.png")).png().toBuffer();
const buf32 = await sharp(path.join(brand, "favicon-32.png")).png().toBuffer();
const buf48 = await sharp(path.join(brand, "favicon-48.png")).png().toBuffer();
fs.writeFileSync("public/favicon.ico", await toIco([buf16, buf32, buf48]));

const ogW = 1200;
const ogH = 630;
const logoBox = 420;
const logoBuf = await sharp(markBuf)
  .resize(logoBox, Math.round(logoBox * 0.7), {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  })
  .png()
  .toBuffer();

const logoMeta = await sharp(logoBuf).metadata();
const logoTop = Math.round((ogH - (logoMeta.height || logoBox)) / 2) - 50;
const logoLeft = Math.round((ogW - (logoMeta.width || logoBox)) / 2);

const svgText = Buffer.from(`<svg width="${ogW}" height="${ogH}" xmlns="http://www.w3.org/2000/svg">
  <text x="600" y="500" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#ffffff">João Guilherme</text>
  <text x="600" y="550" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#a3a3a3">Desenvolvedor Fullstack</text>
</svg>`);

await sharp({
  create: {
    width: ogW,
    height: ogH,
    channels: 3,
    background: { r: 0, g: 0, b: 0 },
  },
})
  .composite([
    { input: logoBuf, top: Math.max(0, logoTop), left: Math.max(0, logoLeft) },
    { input: svgText, top: 0, left: 0 },
  ])
  .png()
  .toFile(path.join(brand, "og-image.png"));

console.log("done");
for (const f of fs.readdirSync(brand)) {
  console.log("brand/" + f, fs.statSync(path.join(brand, f)).size);
}
