import { describe, expect, it } from "vitest";
import { buildRedirectRoutes, parseRedirects, normalise, CSV_HEADER, MAX_CONFIG_BYTES } from "../build-redirects.mjs";

const config = {
  trailingSlash: "auto",
  routes: [
    { route: "/api/*", allowedRoles: ["anonymous"] },
    { route: "/llms.txt", headers: { "Cache-Control": "public" } },
    { route: "/", redirect: "/en/", statusCode: 301 },
  ],
};

// What the export holds: pages end with "/", files do not.
const exportPaths: Record<string, "page" | "file"> = {
  "/en": "page",
  "/en/platform": "page",
  "/en/about": "page",
  "/en/opengraph-image.png": "file",
};
const exists = (path: string) => exportPaths[normalise(path)] ?? null;

function build(rowsCsv: string) {
  return buildRedirectRoutes(parseRedirects(`${CSV_HEADER}\n${rowsCsv}`), config, exists);
}

describe("parseRedirects", () => {
  it("rejects a file without the expected header", () => {
    expect(() => parseRedirects("old,new\n/a/,/b/,301,x")).toThrow(/first line/);
  });

  it("keeps commas inside the note and strips CRLF", () => {
    const [row] = parseRedirects(`${CSV_HEADER}\r\n/en/product/,/en/platform/,301,renamed, see URL-LIST\r\n`);
    expect(row).toEqual({ line: 2, oldUrl: "/en/product/", newUrl: "/en/platform/", status: "301", note: "renamed, see URL-LIST" });
  });
});

describe("buildRedirectRoutes", () => {
  it("writes one bare-form route per row, before the first wildcard", () => {
    const { routes, config: merged, errors } = build("/en/product/,/en/platform/,301,renamed\n/old.png,/en/opengraph-image.png,301,image\n/gone/,,410,retired");
    expect(errors).toEqual([]);
    expect(routes).toEqual([
      { route: "/en/product", redirect: "/en/platform/", statusCode: 301 },
      { route: "/old.png", redirect: "/en/opengraph-image.png", statusCode: 301 },
      { route: "/gone", statusCode: 410 },
    ]);
    expect(merged.routes.slice(0, 3)).toEqual(routes);
    expect(merged.routes[3]).toEqual(config.routes[0]);
  });

  it("fails on a duplicate old_url after stripping the trailing slash", () => {
    const { errors } = build("/en/product/,/en/platform/,301,a\n/en/product,/en/about/,301,b");
    expect(errors).toEqual([expect.stringMatching(/line 3 .*duplicate of line 2/)]);
  });

  it("fails on an old_url that is already a route in the config", () => {
    const { errors } = build("/,/en/,301,root");
    expect(errors).toEqual([expect.stringMatching(/already a route/)]);
  });

  it("fails on a chain through another row or a config redirect", () => {
    const { errors } = build("/en/product/,/en/platform/,301,a\n/product/,/en/product/,301,chain\n/home/,/,301,chain");
    expect(errors).toEqual([
      expect.stringMatching(/line 3 .*\/en\/product\/ is itself redirected/),
      expect.stringMatching(/line 4 .*\/ is itself redirected/),
    ]);
  });

  it("fails on a status outside 301, 410 and 404", () => {
    const { errors } = build("/en/product/,/en/platform/,302,a\n/x/,/en/platform/,,b");
    expect(errors).toEqual([expect.stringMatching(/status "302"/), expect.stringMatching(/status ""/)]);
  });

  it("fails on a target missing from the export or written without its slash", () => {
    const { errors } = build("/a/,/en/nowhere/,301,x\n/b/,/en/platform,301,y");
    expect(errors).toEqual([expect.stringMatching(/\/en\/nowhere\/ is not in the export/), expect.stringMatching(/write it with the trailing slash/)]);
  });

  it("fails when the old_url still exists in the export", () => {
    const { errors } = build("/en/about/,/en/platform/,301,x");
    expect(errors).toEqual([expect.stringMatching(/would hide it/)]);
  });

  it("fails when the config would exceed 16 KB", () => {
    const rows = Array.from({ length: 300 }, (_, i) => `/old-page-${String(i).padStart(3, "0")}/,/en/platform/,301,x`).join("\n");
    const { errors, bytes } = build(rows);
    expect(bytes).toBeGreaterThan(MAX_CONFIG_BYTES);
    expect(errors).toEqual([expect.stringMatching(/limit is 16384 bytes/)]);
  });
});
