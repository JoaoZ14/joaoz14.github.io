import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const OUT = process.env.OUT_DIR || path.join(process.env.TEMP, "impeccable-assessment-b");
const LIVE = process.env.LIVE_URL || "http://localhost:8400";
const APP = process.env.APP_URL || "http://localhost:3000";

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const consoleLogs = [];
page.on("console", (msg) => {
  consoleLogs.push({ type: msg.type(), text: msg.text() });
});
page.on("pageerror", (err) => {
  consoleLogs.push({ type: "pageerror", text: String(err) });
});

let injectError = null;
let findings = null;
let overlayAchieved = false;
let mode = null;

try {
  await page.goto(APP, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 4500));
  await page.screenshot({ path: path.join(OUT, "desktop-hero.png"), fullPage: false });

  await page.evaluate((src) => {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error("Failed to load detect.js from " + src));
      document.head.appendChild(s);
    });
  }, LIVE + "/detect.js");

  await page.waitForFunction(() => typeof window.impeccableScanAsync === "function", { timeout: 15000 });

  findings = await page.evaluate(async () => {
    try {
      const r = await window.impeccableScanAsync({ serialize: true });
      return { ok: true, results: r };
    } catch (e) {
      return { ok: false, error: String(e && e.stack || e) };
    }
  });

  await new Promise((r) => setTimeout(r, 1000));

  mode = await page.evaluate(() => ({
    hasScan: typeof window.impeccableScan === "function",
    hasDetect: typeof window.impeccableDetect === "function",
    overlayCount: document.querySelectorAll("[class*='impeccable']").length,
    overlayNodes: Array.from(document.querySelectorAll("[class*='impeccable']")).slice(0, 20).map((el) => el.className),
    bodyClasses: document.body.className,
  }));
  overlayAchieved = mode.overlayCount > 0;

  await page.screenshot({ path: path.join(OUT, "desktop-hero-with-detect.png"), fullPage: false });

  await page.evaluate(() => window.scrollTo(0, Math.floor(document.body.scrollHeight * 0.45)));
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT, "desktop-mid.png"), fullPage: false });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT, "desktop-contact.png"), fullPage: false });

  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUT, "mobile-hero.png"), fullPage: false });
} catch (e) {
  injectError = String(e && e.stack || e);
  try {
    await page.screenshot({ path: path.join(OUT, "error-state.png"), fullPage: false });
  } catch {}
}

const result = {
  injectError,
  findings,
  overlayAchieved,
  mode,
  consoleRelevant: consoleLogs.filter(
    (l) => /impeccable|error|warn|fail/i.test(l.text) || l.type === "error" || l.type === "pageerror"
  ),
  allConsoleCount: consoleLogs.length,
  outDir: OUT,
  screenshots: fs.readdirSync(OUT).filter((f) => f.endsWith(".png")),
};

fs.writeFileSync(path.join(OUT, "evidence.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
await browser.close();
