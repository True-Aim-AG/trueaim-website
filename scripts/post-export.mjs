import { lstat, readdir, rename, rmdir, mkdir, access, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const out = resolve("out");
const moves = [];
const directories = [];

async function exists(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

// Preflight the entire merge so a collision cannot leave a partial export.
async function plan(source, destination) {
  const sourceStat = await lstat(source);
  const destinationStat = await exists(destination);
  if (sourceStat.isDirectory() && destinationStat?.isDirectory()) {
    for (const name of await readdir(source)) {
      await plan(join(source, name), join(destination, name));
    }
    directories.push(source);
  } else {
    if (destinationStat) throw new Error(`Export collision: ${destination}`);
    moves.push([source, destination]);
  }
}

await access(join(out, "404.html"));
await plan(join(out, "en"), out);
// With trailingSlash disabled, Next exports the locale home beside en/.
for (const extension of ["html", "txt"]) {
  const source = join(out, `en.${extension}`);
  if (await exists(source)) await plan(source, join(out, `index.${extension}`));
}
const destinations = new Set();
for (const [, destination] of moves) {
  if (destinations.has(destination)) throw new Error(`Export collision: ${destination}`);
  destinations.add(destination);
}
for (const [source, destination] of moves) await rename(source, destination);
for (const directory of directories) await rmdir(directory);
await access(join(out, "index.html"));
// Use SWA's directory index resolution without a per-page routing registry.
// Preflight every destination before moving pages, preserving adjacent assets.
const pageMoves = [];
async function planPages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    if (entry.isDirectory()) {
      await planPages(source);
    } else if (entry.name.endsWith(".html") && ![join(out, "index.html"), join(out, "404.html")].includes(source)) {
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
const englishImages = [];
let renamedImages = 0;
async function renameImages(directory, prefix = "") {
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    const url = prefix + "/" + entry.name;
    if (entry.isFile() && /\.(html|txt)$/.test(entry.name)) metadataFiles.push(path);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") await renameImages(path, url);
    } else if (entry.name === "opengraph-image") {
      const bytes = await readFile(path);
      if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
        throw new Error(`Expected PNG: ${path}`);
      }
      if (!/^\/(de|fr|it)\//.test(url)) englishImages.push(url);
      await rename(path, path + ".png");
      renamedImages++;
    }
  }
}
await renameImages(out);
// Next's file-based metadata still embeds /en in English image URLs.
// Update only those known image URLs in HTML and React payloads.
let repairedMetadataFiles = 0;
for (const path of metadataFiles) {
  const original = await readFile(path, "utf8");
  let updated = original;
  for (const url of englishImages) {
    updated = updated.replaceAll("https://trueaim.ai/en" + url, "https://trueaim.ai" + url);
  }
  // Point every Open Graph / Twitter image URL at the renamed .png file.
  // The terminator set includes a backslash: inside the RSC payload that Next
  // embeds in the HTML, string quotes are escaped, so a queryless URL ends in
  // opengraph-image\" rather than opengraph-image".
  updated = updated.replace(/(https:\/\/trueaim\.ai(?:\/(?:de|fr|it))?(?:\/[a-z0-9-]+)*\/opengraph-image)(?=[?"'&\s\\])/g, "$1.png");
  const stale = updated.match(/\/opengraph-image(?!\.png)/g);
  if (stale) throw new Error(`${path}: ${stale.length} Open Graph image reference(s) still point at the extensionless file`);
  if (updated !== original) {
    await writeFile(path, updated);
    repairedMetadataFiles++;
  }
}
// Links to /en/... may exist from the middleware era (they used to redirect).
// Static hosting cannot rewrite a wildcard, so leave a tiny redirect stub at
// every English page's old prefixed path, pointing at its canonical URL.
let englishStubs = 0;
const nonPageTopLevel = new Set(["_next", "de", "fr", "it", "en", "images", "frames", "videos", "partners", "team", "screenshots", "awards", ".well-known"]);
const stubHtml = (target) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><link rel="canonical" href="https://trueaim.ai${target}"><meta http-equiv="refresh" content="0;url=${target}"><title>Redirecting</title></head><body><a href="${target}">${target}</a></body></html>\n`;
async function writeEnglishStubs(directory, prefix = "") {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("_") || (prefix === "" && nonPageTopLevel.has(entry.name))) continue;
      await writeEnglishStubs(path, prefix + "/" + entry.name);
    } else if (entry.name === "index.html" && prefix !== "") {
      await mkdir(join(out, "en", prefix), { recursive: true });
      await writeFile(join(out, "en", prefix, "index.html"), stubHtml(prefix));
      englishStubs++;
    }
  }
}
await writeEnglishStubs(out);
await mkdir(join(out, "en"), { recursive: true });
await writeFile(join(out, "en", "index.html"), stubHtml("/"));
console.log(`Wrote ${englishStubs + 1} /en redirect stubs.`);
const serializedConfig = JSON.stringify(config) + "\n";
const configBytes = Buffer.byteLength(serializedConfig, "utf8");
const maxConfigBytes = 16 * 1024;
console.log(`SWA configuration size: ${configBytes} bytes (limit: ${maxConfigBytes} bytes).`);
if (configBytes > maxConfigBytes) {
  throw new Error(`staticwebapp.config.json exceeds 16 KB: ${configBytes} bytes`);
}
await writeFile(join(out, "staticwebapp.config.json"), serializedConfig);
console.log(`Moved ${pageMoves.length} pages to directory indexes; renamed ${renamedImages} Open Graph images to .png; repaired image URLs in ${repairedMetadataFiles} metadata files.`);
console.log("Static export ready: English at /; localized pages preserved; 404.html verified.");
