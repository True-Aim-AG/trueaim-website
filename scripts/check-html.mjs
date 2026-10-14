// Build check over every exported locale page (Firon "Rendering" and
// "Schema"): fails the build when a page
// - has no H1 or more than one,
// - skips a heading level (h2 straight to h4),
// - has an <img> without alt, width or height,
// - carries a JSON-LD block that does not parse,
// - has an <html lang> that does not match its locale folder.
// Runs inside npm run build, so it guards local builds, pull requests and
// every staging and production deploy alike.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const LOCALES = ["en", "de", "fr", "it"];
const out = resolve(process.argv[2] ?? "out");

function pages(directory) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...pages(path));
    else if (entry.name === "index.html") found.push(path);
  }
  return found;
}

const problems = [];
let checked = 0;
for (const locale of LOCALES) {
  let files;
  try {
    files = pages(join(out, locale));
  } catch {
    continue;
  }
  for (const file of files) {
    checked++;
    const page = "/" + relative(out, file).replace(/index\.html$/, "");
    const html = readFileSync(file, "utf8");
    const bodyStart = html.search(/<body[\s>]/i);
    const body = bodyStart === -1 ? html : html.slice(bodyStart);

    const lang = html.match(/<html[^>]*\blang="([^"]+)"/i)?.[1];
    if (lang !== locale) problems.push(`${page}: <html lang="${lang ?? ""}"> in the ${locale} folder`);

    const levels = [...body.matchAll(/<h([1-6])[\s>]/gi)].map((match) => Number(match[1]));
    const h1s = levels.filter((level) => level === 1).length;
    if (h1s !== 1) problems.push(`${page}: ${h1s} H1 elements, expected exactly one`);
    let previous = 0;
    for (const level of levels) {
      if (previous && level > previous + 1) {
        problems.push(`${page}: heading skips from h${previous} to h${level}`);
        break;
      }
      previous = level;
    }

    for (const [tag] of body.matchAll(/<img\b[^>]*>/gi)) {
      const missing = ["alt", "width", "height"].filter((name) => !new RegExp(`\\s${name}=`, "i").test(tag));
      if (missing.length) problems.push(`${page}: <img> without ${missing.join(", ")}: ${tag.slice(0, 120)}`);
    }

    for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(json);
      } catch (error) {
        problems.push(`${page}: JSON-LD does not parse (${error.message})`);
      }
    }
  }
}

if (checked === 0) {
  console.error("check-html: no exported locale pages found");
  process.exit(1);
}
if (problems.length) {
  for (const problem of problems) console.error(problem);
  console.error(`check-html: ${problems.length} problem(s) in ${checked} pages`);
  process.exit(1);
}
console.log(`HTML check passed: ${checked} pages, one H1 each, headings in order, images sized, JSON-LD parses.`);
