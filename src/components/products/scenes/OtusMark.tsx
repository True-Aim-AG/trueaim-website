import { cn } from "@/lib/utils";

import styles from "./OtusMark.module.css";

/** The brand symbol's own outline (public/brand/logo/symbol-blue.svg). Nothing is redrawn; the path is the supplied one. */
const SYMBOL =
  "M142.96,23.55c-8.43,0-16.55,1.32-24.19,3.75L71.48,0,24.19,27.31c-7.63-2.43-15.76-3.75-24.19-3.75v16.78c3.07,0,6.1.23,9.05.66v67.13l62.43,36.04,62.43-36.04V40.99c2.96-.43,5.98-.66,9.05-.66v-16.78ZM71.48,19.37l28.77,16.61c-12.25,7.79-22.24,18.81-28.77,31.86-6.52-13.06-16.52-24.08-28.77-31.86l28.77-16.61ZM117.13,98.44l-45.65,26.35-45.65-26.35v-52.55c21.93,9.89,37.24,31.93,37.26,57.5,0,.01,0,.02,0,.04h16.78s0-.02,0-.04c.01-25.57,15.33-47.62,37.26-57.5v52.55Z";
/** Where the slanted pieces of the face end and the body begins, in the symbol's own units. */
const SEAM = 68;

/**
 * Otus's mark: the True Aim symbol in blue, alive in small ways. It looks to
 * one side and the other, blinks and ruffles, on a slow loop. A blink is the
 * slanted pieces of the face crimping in a little towards the body, which
 * stays still; the symbol is drawn once above the seam and once below it so
 * the two halves stay joined. It holds still under reduced motion and while
 * its scene is paused.
 */
export function OtusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 142.96 144.17" className={cn(styles.mark, className)} aria-hidden>
      <defs>
        <clipPath id="otus-face">
          <rect x="-10" y="-10" width="163" height={SEAM + 10} />
        </clipPath>
        <clipPath id="otus-body">
          <rect x="-10" y={SEAM} width="163" height="90" />
        </clipPath>
      </defs>
      <g className={styles.whole}>
        <g clipPath="url(#otus-body)">
          <path d={SYMBOL} />
        </g>
        <g className={styles.face} clipPath="url(#otus-face)">
          <path d={SYMBOL} />
        </g>
      </g>
    </svg>
  );
}
