// Refuses an export that would de-index production. Run by the production
// deploy job right before upload; fails on a staging noindex header, a
// robots.txt that closes the site, or a noindex English home page.
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const out = resolve(process.argv[2] ?? "out");
const problems = [];

const config = JSON.parse(await readFile(join(out, "staticwebapp.config.json"), "utf8"));
const headerBlocks = [config.globalHeaders ?? {}, ...(config.routes ?? []).map((route) => route.headers ?? {})];
if (headerBlocks.some((headers) => Object.keys(headers).some((name) => name.toLowerCase() === "x-robots-tag"))) {
  problems.push("staticwebapp.config.json sets an X-Robots-Tag header");
}

const robots = await readFile(join(out, "robots.txt"), "utf8");
let inWildcardGroup = false;
let previousWasAgent = false;
for (const raw of robots.split(/\r?\n/)) {
  const line = raw.replace(/#.*/, "").trim();
  if (!line) continue;
  const [field, ...rest] = line.split(":");
  const key = field.trim().toLowerCase();
  const value = rest.join(":").trim();
  if (key === "user-agent") {
    inWildcardGroup = previousWasAgent ? inWildcardGroup || value === "*" : value === "*";
    previousWasAgent = true;
    continue;
  }
  previousWasAgent = false;
  if (inWildcardGroup && key === "disallow" && value === "/") {
    problems.push("robots.txt disallows the whole site for User-agent: *");
  }
}

const home = await readFile(join(out, "en", "index.html"), "utf8");
if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(home)) {
  problems.push("the English home page is noindex");
}

if (problems.length) {
  for (const problem of problems) console.error(`::error::${problem}`);
  process.exit(1);
}
console.log("Production export check passed: no noindex header, robots.txt open, home page indexable.");
