/**
 * Fetches Google Fonts as TrueType ArrayBuffers for use with next/og's ImageResponse,
 * which requires TTF/OTF/WOFF (not WOFF2). Google Fonts only serves WOFF2 to modern
 * User-Agent strings, so requests here spoof an old browser to get a TTF file back.
 * Each (family, weight) pair is fetched once per edge function instance and cached.
 */

const OLD_BROWSER_UA = "Mozilla/5.0 (Windows NT 6.1)";

const fontCache = new Map<string, Promise<ArrayBuffer | null>>();

async function fetchFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
    const cssRes = await fetch(cssUrl, { headers: { "User-Agent": OLD_BROWSER_UA } });
    if (!cssRes.ok) return null;

    const css = await cssRes.text();
    const match = css.match(/src:\s*url\(([^)]+)\)/);
    if (!match) return null;

    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;

    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

/** Loads one Google Font weight as a TTF ArrayBuffer, cached for the process lifetime. Never throws. */
export function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  const key = `${family}:${weight}`;
  let cached = fontCache.get(key);
  if (!cached) {
    cached = fetchFont(family, weight);
    fontCache.set(key, cached);
  }
  return cached;
}

export type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 500 | 700; style: "normal" };

/**
 * Loads the True Aim OG-card fonts: Inter Tight 700 (headings) and IBM Plex Sans 400/500 (body).
 * Returns only the weights that fetched successfully, so ImageResponse falls back to its
 * default font instead of erroring when Google Fonts is unreachable.
 */
export async function loadOgFonts(): Promise<OgFont[]> {
  const [interTight700, plexSans400, plexSans500] = await Promise.all([
    loadGoogleFont("Inter Tight", 700),
    loadGoogleFont("IBM Plex Sans", 400),
    loadGoogleFont("IBM Plex Sans", 500),
  ]);

  const fonts: OgFont[] = [];
  if (interTight700) fonts.push({ name: "Inter Tight", data: interTight700, weight: 700, style: "normal" });
  if (plexSans400) fonts.push({ name: "IBM Plex Sans", data: plexSans400, weight: 400, style: "normal" });
  if (plexSans500) fonts.push({ name: "IBM Plex Sans", data: plexSans500, weight: 500, style: "normal" });
  return fonts;
}
