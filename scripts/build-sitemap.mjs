// Writes out/sitemap.xml from the exported pages themselves, so the sitemap
// can never disagree with what is served:
// - a page is listed only if it is indexable (no robots noindex) and its
//   canonical is its own URL, so English-only copies under /de/ and
//   redirects (which are routes, not files) never appear;
// - its hreflang alternates are the page's own <link rel="alternate"> tags;
// - lastmod is the last git commit touching the page's route folder, the
//   components it imports and the messages files it reads, not the build
//   date. The build therefore needs the full git history (fetch-depth: 0).
// The build fails if an alternate points at a URL that is not an indexable
// page in the export, or if alternates are not reciprocal.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";

const SITE_URL = "https://trueaim.ai";
const LOCALES = ["en", "de", "fr", "it"];
const out = resolve(process.argv[2] ?? "out");
const root = resolve(".");
const appRoot = join(root, "src", "app", "[locale]");
// Shared chrome and helpers would bump every page on any change; only the
// page's own sections and data count towards its lastmod.
const IGNORED_IMPORTS = /^@\/(components\/(brand|layout|ui|seo)|lib|i18n)\//;

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

if (git(["rev-parse", "--is-shallow-repository"]) === "true") {
  throw new Error("build-sitemap: the git history is shallow, so lastmod would be wrong. Check out with fetch-depth: 0.");
}

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)) result[match[1].toLowerCase()] = match[2];
  return result;
}

function readPage(file) {
  const html = readFileSync(file, "utf8");
  const head = html.slice(0, html.search(/<body[\s>]/i) === -1 ? html.length : html.search(/<body[\s>]/i));
  let canonical = null;
  let noindex = false;
  const alternates = {};
  for (const tag of head.match(/<(link|meta)\b[^>]*>/gi) ?? []) {
    const attrs = attributes(tag);
    if (tag.toLowerCase().startsWith("<link") && attrs.rel === "canonical") canonical = attrs.href;
    if (tag.toLowerCase().startsWith("<link") && attrs.rel === "alternate" && attrs.hreflang) alternates[attrs.hreflang] = attrs.href;
    if (tag.toLowerCase().startsWith("<meta") && attrs.name === "robots" && /noindex/i.test(attrs.content ?? "")) noindex = true;
  }
  return { canonical, noindex, alternates };
}

function exportedPages(directory) {
  const pages = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) pages.push(...exportedPages(path));
    else if (entry.name === "index.html") pages.push(path);
  }
  return pages;
}

// src/app/[locale]/a/b for out/<locale>/a/b, following [param] folders.
function routeDirectory(segments) {
  let directory = appRoot;
  for (const segment of segments) {
    if (existsSync(join(directory, segment))) {
      directory = join(directory, segment);
      continue;
    }
    const dynamic = readdirSync(directory, { withFileTypes: true }).find(
      (entry) => entry.isDirectory() && /^\[[^.\]][^\]]*\]$/.test(entry.name),
    );
    if (!dynamic) return null;
    directory = join(directory, dynamic.name);
  }
  return directory;
}

function resolveImport(specifier, fromFile) {
  let base;
  if (specifier.startsWith("@/")) base = join(root, "src", specifier.slice(2));
  else if (specifier.startsWith(".")) base = resolve(dirname(fromFile), specifier);
  else return null;
  for (const candidate of [base, `${base}.tsx`, `${base}.ts`, join(base, "index.tsx"), join(base, "index.ts")]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

// Top-level message key -> messages file name, from the English reference.
const namespaceFiles = new Map();
for (const file of readdirSync(join(root, "messages", "en"))) {
  if (!file.endsWith(".json")) continue;
  for (const key of Object.keys(JSON.parse(readFileSync(join(root, "messages", "en", file), "utf8")))) {
    namespaceFiles.set(key, file);
  }
}

function sourceFiles(directory, locale) {
  const files = new Set(
    readdirSync(directory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.(tsx?|mdx?)$/.test(entry.name))
      .map((entry) => join(directory, entry.name)),
  );
  for (const file of [...files]) {
    const code = readFileSync(file, "utf8");
    for (const match of code.matchAll(/from\s+["']([^"']+)["']/g)) {
      if (IGNORED_IMPORTS.test(match[1])) continue;
      const resolved = resolveImport(match[1], file);
      if (resolved && !resolved.startsWith(directory + sep)) files.add(resolved);
    }
  }
  for (const file of [...files]) {
    const code = readFileSync(file, "utf8");
    const namespaces = [
      ...code.matchAll(/(?:useTranslations|getTranslations)\(\s*["']([^"']+)["']/g),
      ...code.matchAll(/namespace:\s*["']([^"']+)["']/g),
    ].map((match) => match[1].split(".")[0]);
    for (const namespace of namespaces) {
      const messages = namespaceFiles.get(namespace);
      if (messages) files.add(join(root, "messages", locale, messages));
    }
  }
  return [...files].filter((file) => existsSync(file)).map((file) => relative(root, file));
}

const lastmodCache = new Map();
function lastmod(files) {
  const key = files.slice().sort().join("\n");
  if (!lastmodCache.has(key)) {
    const date = files.length ? git(["log", "-1", "--format=%cI", "--", ...files]) : "";
    lastmodCache.set(key, date || new Date().toISOString());
  }
  return lastmodCache.get(key);
}

const entries = new Map();
for (const locale of LOCALES) {
  const localeDirectory = join(out, locale);
  if (!existsSync(localeDirectory)) continue;
  for (const file of exportedPages(localeDirectory)) {
    const pagePath = relative(out, dirname(file)).split(sep).join("/");
    const url = `${SITE_URL}/${pagePath}/`;
    const page = readPage(file);
    if (page.noindex || page.canonical !== url) continue;
    const directory = routeDirectory(pagePath.split("/").slice(1));
    if (!directory) throw new Error(`build-sitemap: no route folder for ${url}`);
    entries.set(url, { url, alternates: page.alternates, lastmod: lastmod(sourceFiles(directory, locale)) });
  }
}

const problems = [];
for (const entry of entries.values()) {
  for (const [hreflang, href] of Object.entries(entry.alternates)) {
    if (!entries.has(href)) {
      problems.push(`${entry.url}: hreflang ${hreflang} points at ${href}, which is not an indexable page`);
      continue;
    }
    const target = entries.get(href);
    if (hreflang !== "x-default" && target.alternates[hreflang] !== href) {
      problems.push(`${entry.url}: hreflang ${hreflang} target ${href} does not list itself`);
    }
    if (hreflang !== "x-default" && !Object.values(target.alternates).includes(entry.url)) {
      problems.push(`${entry.url}: ${href} does not link back`);
    }
  }
}
if (problems.length) {
  for (const problem of problems) console.error(problem);
  throw new Error(`build-sitemap: ${problems.length} hreflang problem(s)`);
}
if (entries.size === 0) throw new Error("build-sitemap: no indexable pages found");

const escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sorted = [...entries.values()].sort((a, b) => a.url.localeCompare(b.url));
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sorted.map((entry) =>
    [
      "<url>",
      `<loc>${escape(entry.url)}</loc>`,
      `<lastmod>${entry.lastmod}</lastmod>`,
      ...Object.entries(entry.alternates).map(
        ([hreflang, href]) => `<xhtml:link rel="alternate" hreflang="${escape(hreflang)}" href="${escape(href)}"/>`,
      ),
      "</url>",
    ].join(""),
  ),
  "</urlset>",
  "",
].join("\n");
await writeFile(join(out, "sitemap.xml"), xml);
console.log(`Sitemap: ${entries.size} indexable pages written to out/sitemap.xml.`);
