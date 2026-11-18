import { cn } from "@/lib/utils";

import styles from "./OtusMark.module.css";

/**
 * The brand symbol's own outline (public/brand/logo/symbol-blue.svg), as its
 * three parts: the frame, the opening at the brow and the opening that holds
 * both eyes. Nothing is redrawn; the path is the supplied one.
 */
const FRAME =
  "M142.96,23.55c-8.43,0-16.55,1.32-24.19,3.75L71.48,0,24.19,27.31c-7.63-2.43-15.76-3.75-24.19-3.75v16.78c3.07,0,6.1.23,9.05.66v67.13l62.43,36.04,62.43-36.04V40.99c2.96-.43,5.98-.66,9.05-.66v-16.78Z";
const BROW = "M71.48,19.37l28.77,16.61c-12.25,7.79-22.24,18.81-28.77,31.86-6.52-13.06-16.52-24.08-28.77-31.86l28.77-16.61Z";
const EYES =
  "M117.13,98.44l-45.65,26.35-45.65-26.35v-52.55c21.93,9.89,37.24,31.93,37.26,57.5,0,.01,0,.02,0,.04h16.78s0-.02,0-.04c.01-25.57,15.33-47.62,37.26-57.5v52.55Z";

/**
 * Otus's mark: the True Aim symbol in blue, alive in small ways. It looks to
 * one side and the other, winks one eye, blinks and ruffles, on a slow loop.
 * The wink is a lid of the symbol's own blue that closes over one eye opening.
 * It holds still under reduced motion and while its scene is paused.
 */
export function OtusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 142.96 144.17" className={cn(styles.mark, className)} aria-hidden>
      <defs>
        <clipPath id="otus-eye">
          <path d={EYES} />
        </clipPath>
      </defs>
      <g className={styles.body}>
        <path fillRule="evenodd" d={`${FRAME}${BROW}${EYES}`} />
        {/* one lid per eye, each kept inside the eye opening */}
        <g clipPath="url(#otus-eye)">
          <rect className={cn(styles.lid, styles.left)} x="20" y="40" width="51.48" height="90" />
          <rect className={cn(styles.lid, styles.right)} x="71.48" y="40" width="51.48" height="90" />
        </g>
      </g>
    </svg>
  );
}
