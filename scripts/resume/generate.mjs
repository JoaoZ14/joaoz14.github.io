import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");
const publicDir = path.join(rootDir, "public");
const require = createRequire(import.meta.url);

const { resumes } = require("./content.js");
const { buildResumeHtml } = require("./build-html.js");

const logoPath = path.join(publicDir, "brand", "logo-mark.png");

function getLogoDataUri() {
  const buffer = fs.readFileSync(logoPath);
  const base64 = buffer.toString("base64");
  return `data:image/png;base64,${base64}`;
}

async function generatePdf(browser, langKey, logoDataUri) {
  const resume = resumes[langKey];
  const html = buildResumeHtml(resume, logoDataUri);
  const tempHtmlPath = path.join(__dirname, `.tmp-${langKey}.html`);
  const outputPath = path.join(publicDir, resume.fileName);

  fs.writeFileSync(tempHtmlPath, html, "utf8");

  const page = await browser.newPage();
  await page.goto(pathToFileURL(tempHtmlPath).href, { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await page.close();
  fs.unlinkSync(tempHtmlPath);

  console.log(`✓ ${resume.fileName}`);
}

async function main() {
  if (!fs.existsSync(logoPath)) {
    throw new Error(`Logo não encontrado em: ${logoPath}`);
  }

  const logoDataUri = getLogoDataUri();
  const browser = await puppeteer.launch({ headless: true });

  try {
    for (const langKey of ["pt", "en", "es"]) {
      await generatePdf(browser, langKey, logoDataUri);
    }
    console.log("\nPDFs gerados em public/");
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("Erro ao gerar currículos:", error);
  process.exit(1);
});
