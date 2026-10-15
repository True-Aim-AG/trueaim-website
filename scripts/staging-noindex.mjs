// Marks a built export as staging: every static response carries
// X-Robots-Tag: noindex, nofollow. The deploy workflow runs this in the
// staging job only, after the build artifact is downloaded, so the header
// can never reach production (the production job builds from a release tag
// and runs scripts/check-production-export.mjs instead).
// robots.txt stays open on purpose: a Disallow would stop crawlers from
// fetching pages and so from ever seeing the noindex header.
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const out = resolve(process.argv[2] ?? "out");
const path = join(out, "staticwebapp.config.json");
const config = JSON.parse(await readFile(path, "utf8"));
config.globalHeaders = { ...config.globalHeaders, "X-Robots-Tag": "noindex, nofollow" };
const serialized = JSON.stringify(config) + "\n";
if (Buffer.byteLength(serialized, "utf8") > 16 * 1024) {
  throw new Error("staticwebapp.config.json exceeds 16 KB after adding the staging header");
}
await writeFile(path, serialized);
console.log(`Staging export: X-Robots-Tag noindex added to ${path}`);
