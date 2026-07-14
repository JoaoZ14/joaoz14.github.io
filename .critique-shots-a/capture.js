const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const outDir = __dirname;
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  await page.goto("http://localhost:3000", {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 4500));

  await page.screenshot({
    path: path.join(outDir, "01-hero-desktop.png"),
    fullPage: false,
  });

  await page.evaluate(() => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(outDir, "02-about-desktop.png"),
    fullPage: false,
  });

  await page.evaluate(() => {
    const titles = [...document.querySelectorAll("h2,h3")];
    const s = titles.find((t) => /habilidad|skill/i.test(t.textContent || ""));
    if (s) s.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(outDir, "03-skills-desktop.png"),
    fullPage: false,
  });

  await page.evaluate(() => {
    const titles = [...document.querySelectorAll("h2,h3,h4")];
    const s = titles.find((t) => /tecnolog/i.test(t.textContent || ""));
    if (s) s.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(outDir, "04-tech-desktop.png"),
    fullPage: false,
  });

  await page.evaluate(() => {
    const el = document.querySelector("#projects");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(outDir, "05-projects-desktop.png"),
    fullPage: false,
  });

  await page.evaluate(() => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(outDir, "06-contact-desktop.png"),
    fullPage: false,
  });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(outDir, "07-footer-desktop.png"),
    fullPage: false,
  });

  await page.screenshot({
    path: path.join(outDir, "08-full-desktop.png"),
    fullPage: true,
  });

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 4500));
  await page.screenshot({
    path: path.join(outDir, "09-hero-mobile.png"),
    fullPage: false,
  });

  await page.evaluate(() => {
    const el = document.querySelector("#projects");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(outDir, "10-projects-mobile.png"),
    fullPage: false,
  });

  await page.evaluate(() => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(outDir, "11-about-mobile.png"),
    fullPage: false,
  });

  const hamburger = await page.$('header button[aria-expanded]');
  if (hamburger) {
    await hamburger.click();
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(outDir, "12-nav-mobile.png"),
      fullPage: false,
    });
  }

  console.log("Done. Files:", fs.readdirSync(outDir).join(", "));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
