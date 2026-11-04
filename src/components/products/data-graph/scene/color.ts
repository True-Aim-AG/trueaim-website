import { Color, SRGBColorSpace } from "three";

/**
 * CSS colours to three.js colours.
 *
 * The theme arrives as `oklch(...)` (and a tenant token may be a
 * `color-mix(...)`), which three.js cannot parse. The browser can: a colour
 * painted into a 1x1 canvas and read back is the sRGB value the rest of the
 * page is drawn in, gamut-mapped the way CSS maps it, with no colour maths of
 * our own to drift from it. Set as sRGB so three.js linearises it for
 * lighting and the output matches the token on screen.
 */

let context: CanvasRenderingContext2D | null = null;
const cache = new Map<string, Color>();

export function cssColor(css: string): Color {
  const key = css;
  const hit = cache.get(key);
  if (hit) return hit.clone();
  if (!context) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    context = canvas.getContext("2d", { willReadFrequently: true });
  }
  const color = new Color();
  if (context && key) {
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = key;
    context.fillRect(0, 0, 1, 1);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    color.setRGB(r / 255, g / 255, b / 255, SRGBColorSpace);
  }
  cache.set(key, color);
  return color.clone();
}
