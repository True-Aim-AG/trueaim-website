// Turns redirects/redirects.csv into Static Web Apps routes. Called by
// scripts/post-export.mjs once the export is in out/, so every target can be
// checked against what was actually built. The checks are pure functions so
// scripts/__tests__/build-redirects.test.ts can cover each failure.
//
// Static Web Apps rules applied here: one route per old URL in the bare form
// (the platform treats /x and /x/ as the same pattern and rejects a config
// that lists both), redirect routes placed before any wildcard route (first
// match wins), config kept under 16 KB (platform limit 20 KB).
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

export const CSV_HEADER = "old_url,new_url,status,note";
export const MAX_CONFIG_BYTES = 16 * 1024;
const STATUSES = new Set(["301", "410", "404"]);
const SITE_PATH = /^\/[^\s?#*]*$/;

// "/x/" and "/x" are the same route; "/" stays "/".
export function normalise(path) {
  const bare = path.replace(/\/+$/, "");
  return bare === "" ? "/" : bare;
}

export function parseRedirects(csv) {
  const lines = csv.split("\n").map((line) => line.replace(/\r$/, ""));
  if (lines[0] !== CSV_HEADER) {
    throw new Error(`redirects.csv: the first line must be "${CSV_HEADER}", found "${lines[0]}"`);
  }
  const rows = [];
  lines.slice(1).forEach((line, index) => {
    if (line.trim() === "") return;
    const [oldUrl = "", newUrl = "", status = "", ...note] = line.split(",");
    rows.push({ line: index + 2, oldUrl: oldUrl.trim(), newUrl: newUrl.trim(), status: status.trim(), note: note.join(",").trim() });
  });
  return rows;
}

// exists(path) answers "page" for a folder with an index.html, "file" for a
// file, and null when the export has nothing at that path.
export function exportLookup(outDir) {
  return (path) => {
    const bare = normalise(path);
    try {
      if (statSync(join(outDir, bare, "index.html")).isFile()) return "page";
    } catch {
      // not a page
    }
    try {
      if (bare !== "/" && statSync(join(outDir, bare)).isFile()) return "file";
    } catch {
      // not a file
    }
    return null;
  };
}

export function buildRedirectRoutes(rows, config, exists) {
  const errors = [];
  const seen = new Map();
  const configRoutes = new Map(config.routes.map((route) => [normalise(route.route), route]));
  const where = (row) => `redirects.csv line ${row.line} (${row.oldUrl || "empty old_url"})`;

  for (const row of rows) {
    if (!SITE_PATH.test(row.oldUrl)) {
      errors.push(`${where(row)}: old_url must be a site path without query string, fragment or wildcard`);
      continue;
    }
    const key = normalise(row.oldUrl);
    if (seen.has(key)) {
      errors.push(`${where(row)}: duplicate of line ${seen.get(key).line} after stripping the trailing slash`);
    } else if (configRoutes.has(key)) {
      errors.push(`${where(row)}: already a route in public/staticwebapp.config.json`);
    } else {
      seen.set(key, row);
    }
    if (!STATUSES.has(row.status)) {
      errors.push(`${where(row)}: status "${row.status}" is not 301, 410 or 404`);
    }
    if (exists(row.oldUrl)) {
      errors.push(`${where(row)}: the export has a page or file at this path; the redirect would hide it`);
    }
    if ((row.status === "410" || row.status === "404") && row.newUrl !== "") {
      errors.push(`${where(row)}: a ${row.status} row takes no new_url`);
    }
  }

  const staticRedirects = new Set(config.routes.filter((route) => route.redirect).map((route) => normalise(route.route)));
  for (const row of rows) {
    if (row.status !== "301" || !SITE_PATH.test(row.oldUrl)) continue;
    if (!SITE_PATH.test(row.newUrl)) {
      errors.push(`${where(row)}: new_url must be a site path without query string, fragment or wildcard`);
      continue;
    }
    const target = normalise(row.newUrl);
    if (seen.has(target) || staticRedirects.has(target)) {
      errors.push(`${where(row)}: new_url ${row.newUrl} is itself redirected (a chain); point at the final URL`);
      continue;
    }
    const kind = exists(row.newUrl);
    if (!kind) {
      errors.push(`${where(row)}: new_url ${row.newUrl} is not in the export`);
    } else if (kind === "page" && !row.newUrl.endsWith("/")) {
      errors.push(`${where(row)}: new_url ${row.newUrl} is a page; write it with the trailing slash so the redirect lands in one hop`);
    }
  }

  const routes = [...seen.values()].map((row) =>
    row.status === "301"
      ? { route: normalise(row.oldUrl), redirect: row.newUrl, statusCode: 301 }
      : { route: normalise(row.oldUrl), statusCode: Number(row.status) },
  );
  const firstWildcard = config.routes.findIndex((route) => route.route.includes("*"));
  const merged = { ...config, routes: [...config.routes] };
  merged.routes.splice(firstWildcard === -1 ? merged.routes.length : firstWildcard, 0, ...routes);
  const serialised = JSON.stringify(merged) + "\n";
  const bytes = Buffer.byteLength(serialised, "utf8");
  if (bytes > MAX_CONFIG_BYTES) {
    errors.push(`staticwebapp.config.json would be ${bytes} bytes; the limit is ${MAX_CONFIG_BYTES} bytes`);
  }
  return { config: merged, serialised, bytes, routes, errors };
}

// Reads the CSV, builds the routes against the export in outDir and throws
// with every problem found. Returns the serialised config to write.
export function buildRedirects(csvPath, config, outDir) {
  const rows = parseRedirects(readFileSync(csvPath, "utf8"));
  const result = buildRedirectRoutes(rows, config, exportLookup(outDir));
  if (result.errors.length > 0) {
    throw new Error(`Redirect map rejected:\n- ${result.errors.join("\n- ")}`);
  }
  return result;
}
