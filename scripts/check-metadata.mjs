// Metadata build check (Firon "Metadata"). Two passes, both inside npm run build:
//
// node scripts/check-metadata.mjs           before next build. Fails when any entry in
//   messages/<locale>/metadata.json has an empty field, a title that does not end in
//   "| True Aim", or a title or description that another page in the same locale uses.
//
// node scripts/check-metadata.mjs --out out after the export. Fails when an exported page
//   has no metadata entry or an entry has no page, or when a page's title, description,
//   canonical (its own URL), Open Graph title, description, image and URL or H1 is
//   missing or differs from its entry.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const LOCALES = ["en", "de", "fr", "it"];
const SITE_URL = "https://trueaim.ai";
const REQUIRED = ["title", "description", "h1", "breadcrumb", "ogTitle", "ogDescription", "updated"];

/** Problems in the metadata sources; `files` maps locale to the parsed metadata.json. */
export function checkSources(files) {
  const problems = [];
  for (const [locale, file] of Object.entries(files)) {
    const seen = { title: new Map(), description: new Map() };
    for (const [path, entry] of Object.entries(file.pages ?? {})) {
      const where = `${locale} ${path}`;
      for (const field of REQUIRED) {
        if (typeof entry[field] !== "string" || !entry[field].trim()) problems.push(`${where}: ${field} is missing or empty`);
      }
      if (entry.title && !entry.title.endsWith("| True Aim")) problems.push(`${where}: title does not end in "| True Aim"`);
      if (entry.updated && !/^\d{4}-\d{2}-\d{2}$/.test(entry.updated)) problems.push(`${where}: updated is not YYYY-MM-DD`);
      if (entry.robots && !["index", "noindex", "noindex, nofollow"].includes(entry.robots)) {
        problems.push(`${where}: robots must be "index", "noindex" or "noindex, nofollow"`);
      }
      for (const field of ["title", "description"]) {
        const value = entry[field]?.trim();
        if (!value) continue;
        if (seen[field].has(value)) problems.push(`${where}: same ${field} as ${seen[field].get(value)}`);
        else seen[field].set(value, path);
      }
    }
  }
  return problems;
}

const decode = (text) =>
  text
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const meta = (html, attr, name) => {
  const match = html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`));
  return match ? decode(match[1]) : undefined;
};
const squash = (text) => text.replace(/\s+/g, "");

function exportedPages(directory, base = directory) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...exportedPages(path, base));
    else if (entry.name === "index.html") found.push(path.slice(base.length).replace(/\\/g, "/").replace(/index\.html$/, ""));
  }
  return found;
}

/** Problems in the exported HTML under `out` against the metadata sources. */
export function checkExport(out, files) {
  const problems = [];
  let checked = 0;
  for (const locale of LOCALES) {
    const pages = files[locale]?.pages ?? {};
    const exported = existsSync(join(out, locale)) ? exportedPages(join(out, locale)) : [];
    const keys = new Set();
    for (const folder of exported) {
      const key = folder === "/" ? "/" : folder.replace(/\/$/, "");
      keys.add(key);
      const where = `/${locale}${folder}`;
      const entry = pages[key];
      if (!entry) {
        problems.push(`${where}: exported page has no entry in messages/${locale}/metadata.json`);
        continue;
      }
      const html = readFileSync(join(out, locale, folder, "index.html"), "utf8");
      const url = `${SITE_URL}/${locale}${folder}`;
      const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
      const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1];
      const expect = (label, actual, expected) => {
        if (actual === undefined) problems.push(`${where}: no ${label}`);
        else if (expected !== undefined && actual !== expected) problems.push(`${where}: ${label} is "${actual}", expected "${expected}"`);
      };
      expect("title", title === undefined ? undefined : decode(title), entry.title);
      expect("meta description", meta(html, "name", "description"), entry.description);
      expect("canonical", canonical, url);
      expect("og:title", meta(html, "property", "og:title"), entry.ogTitle);
      expect("og:description", meta(html, "property", "og:description"), entry.ogDescription);
      expect("og:url", meta(html, "property", "og:url"), url);
      expect("og:image", meta(html, "property", "og:image"));
      if (h1 === undefined) problems.push(`${where}: no H1`);
      else if (squash(decode(h1.replace(/<[^>]+>/g, ""))) !== squash(entry.h1)) problems.push(`${where}: H1 does not match the h1 in metadata.json`);
      checked++;
    }
    for (const key of Object.keys(pages)) {
      if (!keys.has(key)) problems.push(`${locale} ${key}: metadata entry has no exported page`);
    }
  }
  return { problems, checked };
}

function loadSources(root) {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, JSON.parse(readFileSync(join(root, "messages", locale, "metadata.json"), "utf8"))]),
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const files = loadSources(process.cwd());
  const outIndex = process.argv.indexOf("--out");
  if (outIndex === -1) {
    const problems = checkSources(files);
    if (problems.length) {
      console.error(`Metadata check failed:\n${problems.map((p) => `  ${p}`).join("\n")}`);
      process.exit(1);
    }
    const count = Object.values(files).reduce((sum, file) => sum + Object.keys(file.pages).length, 0);
    console.log(`Metadata check passed: ${count} entries, titles and descriptions present and unique per locale.`);
  } else {
    const { problems, checked } = checkExport(resolve(process.argv[outIndex + 1] ?? "out"), files);
    if (problems.length) {
      console.error(`Exported metadata check failed:\n${problems.map((p) => `  ${p}`).join("\n")}`);
      process.exit(1);
    }
    console.log(`Exported metadata check passed: ${checked} pages, each with its own title, description, canonical, Open Graph and H1.`);
  }
}
