import { lstat, readdir, rename, mkdir, access, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const out = resolve("out");

async function exists(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

await access(join(out, "404.html"));
// Every locale is prefixed, English included, so the English home is en/index.html.
await access(join(out, "en", "index.html"));
// Use SWA's directory index resolution without a per-page routing registry.
// Pages already export as <path>/index.html (trailingSlash: true); this moves
// any remaining <name>.html (for example contact-card.html from public/) to
// <name>/index.html. Preflight every destination before moving.
const pageMoves = [];
async function planPages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    if (entry.isDirectory()) {
      await planPages(source);
    } else if (entry.name.endsWith(".html") && entry.name !== "index.html" && source !== join(out, "404.html")) {
      const destinationDirectory = source.slice(0, -5);
      const destination = join(destinationDirectory, "index.html");
      const directoryStat = await exists(destinationDirectory);
      if ((directoryStat && !directoryStat.isDirectory()) || await exists(destination)) {
        throw new Error(`Export collision: ${destination}`);
      }
      pageMoves.push([source, destinationDirectory, destination]);
    }
  }
}
await planPages(out);
for (const [source, directory, destination] of pageMoves) {
  await mkdir(directory, { recursive: true });
  await rename(source, destination);
}
// Static Web Apps serves extensionless files as application/octet-stream and
// route headers do not override that, so every generated Open Graph image is
// renamed to opengraph-image.png and the page metadata is rewritten to match.
const config = JSON.parse(await readFile(join(out, "staticwebapp.config.json"), "utf8"));
const metadataFiles = [];
let renamedImages = 0;
async function renameImages(directory) {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    if (entry.isFile() && /\.(html|txt)$/.test(entry.name)) metadataFiles.push(path);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") await renameImages(path);
    } else if (entry.name === "opengraph-image") {
      const bytes = await readFile(path);
      if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
        throw new Error(`Expected PNG: ${path}`);
      }
      await rename(path, path + ".png");
      renamedImages++;
    }
  }
}
await renameImages(out);
// Point every Open Graph / Twitter image URL at the renamed .png file.
// The terminator set includes a backslash: inside the RSC payload that Next
// embeds in the HTML, string quotes are escaped, so a queryless URL ends in
// opengraph-image\" rather than opengraph-image".
let repairedMetadataFiles = 0;
for (const path of metadataFiles) {
  const original = await readFile(path, "utf8");
  const updated = original.replace(/(https:\/\/trueaim\.ai(?:\/[a-z0-9-]+)*\/opengraph-image)(?=[?"'&\s\\])/g, "$1.png");
  const stale = updated.match(/\/opengraph-image(?!\.png)/g);
  if (stale) throw new Error(`${path}: ${stale.length} Open Graph image reference(s) still point at the extensionless file`);
  if (updated !== original) {
    await writeFile(path, updated);
    repairedMetadataFiles++;
  }
}
// English lived at the root until October 2026, so every old unprefixed URL
// gets a real 301 to its /en/ page. Static Web Apps cannot capture a wildcard
// path into a redirect target, so one route per page is generated here.
// Static Web Apps treats /x and /x/ as the same pattern and rejects a config
// that lists both, so only the bare form is written. Renamed pages are
// handled by the redirect map, not here.
let redirectRoutes = 0;
const englishPages = [];
async function collectPages(directory, prefix = "") {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue;
    const pagePath = prefix + "/" + entry.name;
    if (await exists(join(directory, entry.name, "index.html"))) englishPages.push(pagePath);
    await collectPages(join(directory, entry.name), pagePath);
  }
}
await collectPages(join(out, "en"));
const existingRoutes = new Set(config.routes.map((route) => route.route.replace(/\/+$/, "") || "/"));
for (const pagePath of englishPages) {
  if (existingRoutes.has(pagePath)) continue;
  config.routes.push({ route: pagePath, redirect: "/en" + pagePath + "/", statusCode: 301 });
  redirectRoutes++;
}
const serializedConfig = JSON.stringify(config) + "\n";
const configBytes = Buffer.byteLength(serializedConfig, "utf8");
const maxConfigBytes = 16 * 1024;
console.log(`Added ${redirectRoutes} legacy English redirect routes for ${englishPages.length} pages.`);
console.log(`SWA configuration size: ${configBytes} bytes (limit: ${maxConfigBytes} bytes).`);
if (configBytes > maxConfigBytes) {
  throw new Error(`staticwebapp.config.json exceeds 16 KB: ${configBytes} bytes`);
}
await writeFile(join(out, "staticwebapp.config.json"), serializedConfig);
// The Static Web Apps deploy action refuses an app folder without a root
// index.html. The "/" route above answers first with a 301 to /en/, so this
// file only serves a client that somehow bypasses the route.
await writeFile(
  join(out, "index.html"),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><link rel="canonical" href="https://trueaim.ai/en/"><meta http-equiv="refresh" content="0;url=/en/"><title>True Aim</title></head><body><a href="/en/">https://trueaim.ai/en/</a></body></html>',
);
console.log(`Moved ${pageMoves.length} pages to directory indexes; renamed ${renamedImages} Open Graph images to .png; repaired image URLs in ${repairedMetadataFiles} metadata files.`);
console.log("Static export ready: every locale prefixed, trailing slashes on, 404.html verified.");
