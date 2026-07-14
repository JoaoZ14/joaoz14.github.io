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
const logoDataUri = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;

const langKey = process.argv[2] || "es";
const resume = resumes[langKey];
const html = buildResumeHtml(resume, logoDataUri);
const tempHtmlPath = path.join(__dirname, `.preview-${langKey}.html`);
fs.writeFileSync(tempHtmlPath, html, "utf8");

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
// A4 em px @ 96dpi = 794 x 1123
await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.4 });
await page.goto(pathToFileURL(tempHtmlPath).href, { waitUntil: "networkidle0" });
await page.evaluateHandle("document.fonts.ready");

const pages = await page.$$(".page");
for (let i = 0; i < pages.length; i++) {
  const out = path.join(__dirname, `preview-${langKey}-p${i + 1}.png`);
  await pages[i].screenshot({ path: out });
  console.log("saved", out);
}

const totalHeight = await page.evaluate(() => {
  const els = [...document.querySelectorAll(".page")];
  return els.map((el) => Math.round(el.getBoundingClientRect().height));
});
console.log("page heights (px, A4=1123):", totalHeight.join(", "));

await browser.close();
fs.unlinkSync(tempHtmlPath);
