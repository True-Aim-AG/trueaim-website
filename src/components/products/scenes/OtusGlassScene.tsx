"use client";

import { useCallback, useRef } from "react";

import { SCENE_CARD, SCENE_CARD_HERO } from "@/components/content/surface";
import { cn } from "@/lib/utils";

import { clamp01, easeOut, GlassPause, lerp, seg, spring, u, useGlassLoop } from "./glass";
import g from "./glass.module.css";
import { HexDot } from "./marks";
import styles from "./OtusGlassScene.module.css";

export type OtusGlassData = {
  alt: string;
  youLabel: string;
  otusLabel: string;
  /** The line on decision rights, in view through every scenario. */
  footer: string;
  /** One scenario each: the adjuster's question, the answer in short lines, and the actions Otus offers. */
  items: { id: string; tab: string; prompt: string; lines: string[]; actions: string[] }[];
  pause: string;
  play: string;
};

/** The one timing table, in seconds. Each scenario holds the scene for STEP; the beats count from its start. */
const STEP = 8;
const PROMPT_T = 0.3;
const LINE_T = 1.3;
const LINE_STEP = 0.85;
const ACTIONS_GAP = 0.5;
const OUT = 0.4;

const LAYOUTS = ["desktop", "phone"] as const;

/** Collects one stage's elements and returns the function that draws one frame. */
function prepareStage(root: HTMLElement, count: number) {
  const all = (sel: string, el: ParentNode = root) => Array.from(el.querySelectorAll<HTMLElement>(sel));
  const tabs = all("[data-tab]");
  const turns = all("[data-turn]").map((el) => ({
    prompt: el.querySelector<HTMLElement>("[data-prompt]")!,
    lines: all("[data-line]", el),
    actions: el.querySelector<HTMLElement>("[data-actions]")!,
  }));
  const pieces = all("[data-piece]");
  const dur = STEP * count;

  /** One frame of the loop: every style is a function of t alone, so any t can be shown. */
  return (t: number) => {
    const drift = -8 * Math.sin((2 * Math.PI * t) / dur);
    root.style.setProperty("--sh", `${(34 - drift * 0.4).toFixed(2)}%`);
    pieces.forEach((el, i) => {
      el.style.transform = `translateX(${u(+(drift * (i ? 0.3 : 0.45)).toFixed(2))}) scale(${i ? 0.88 : 0.92})`;
    });

    for (let i = 0; i < count; i++) {
      // Seconds since this scenario took the scene; outside its turn everything of it is hidden.
      const local = t - i * STEP;
      const live = local >= 0 && local < STEP;
      const out = live ? 1 - easeOut(seg(local, STEP - OUT, STEP)) : 0;
      tabs[i].style.setProperty("--on", (live ? easeOut(seg(local, 0, 0.3)) * out : 0).toFixed(3));

      const turn = turns[i];
      const p = spring(seg(local, PROMPT_T, PROMPT_T + 0.7), 0.07);
      turn.prompt.style.opacity = String(clamp01(p * 1.5) * out);
      turn.prompt.style.transform = `translateY(${u(+lerp(14, 0, p).toFixed(1))}) scale(${lerp(0.96, 1, p).toFixed(4)})`;
      turn.lines.forEach((line, j) => {
        const k = easeOut(seg(local, LINE_T + j * LINE_STEP, LINE_T + j * LINE_STEP + 0.45)) * out;
        line.style.opacity = String(k);
        line.style.transform = `translateY(${u(+lerp(10, 0, k).toFixed(1))})`;
      });
      const at = LINE_T + turn.lines.length * LINE_STEP + ACTIONS_GAP;
      const a = spring(seg(local, at, at + 0.7), 0.07);
      turn.actions.style.opacity = String(clamp01(a * 1.5) * out);
      turn.actions.style.transform = `translateY(${u(+lerp(12, 0, a).toFixed(1))})`;
    }
  };
}

/**
 * The Otus hero, in the glass look of the platform demo: an adjuster asks
 * Otus three things in turn, and each answer is written out line by line with
 * the actions Otus offers. The line on decision rights stays in view: Otus
 * drafts, explains and plans, and the team decides.
 *
 * Live HTML in world units, as the other glass heroes: translated text, a
 * portrait layout below 480px, a still frame under reduced motion and the
 * figure itself as the pause control (WCAG 2.2.2).
 */
export function OtusGlassScene({ data, still }: {
  data: OtusGlassData;
  /** A picture, not a film: the finished frame of the desktop layout at any width, with no pause control. */
  still?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const count = data.items.length;
  const prepare = useCallback(
    (root: HTMLElement) => {
      const draws = LAYOUTS.map((name) => prepareStage(root.querySelector<HTMLElement>(`[data-stage="${name}"]`)!, count));
      return (t: number) => draws.forEach((draw) => draw(t));
    },
    [count],
  );
  // The still frame is the last scenario with its whole answer and its actions in view.
  const { playing, toggle } = useGlassLoop(rootRef, STEP * count, STEP * count - 1.2, prepare, still);

  return (
    <div ref={rootRef} className={cn(SCENE_CARD, SCENE_CARD_HERO, "@container relative rounded-[10px]")}>
      <div role="img" aria-label={data.alt}>
        {LAYOUTS.map((name) => (
          <div
            key={name}
            data-stage={name}
            className={cn(g.stage, g[name], styles[name], still ? name !== "desktop" && "hidden" : name === "desktop" ? "@max-[480px]:hidden" : "hidden @max-[480px]:block")}
          >
            <div className={g.ground} />
            <div className={g.floor} />
            <div data-piece className={g.piece} style={{ left: "-24%", top: "6%", width: "50%", height: "36%" }}>
              <i style={{ top: u(40), width: "45%", height: u(18) }} />
              <i style={{ top: u(90), width: "80%", height: u(9) }} />
            </div>
            <div data-piece className={g.piece} style={{ left: "72%", top: "60%", width: "50%", height: "38%" }}>
              <i style={{ top: u(40), width: "42%", height: u(18) }} />
              <i style={{ top: u(96), width: "78%", height: u(9) }} />
            </div>

            <div className={styles.world}>
              <div className={styles.tabs}>
                {data.items.map((item) => (
                  <span key={item.id} data-tab>
                    {item.tab}
                  </span>
                ))}
              </div>
              <div className={cn(g.gloss, styles.panel)}>
                <p className={styles.name}>
                  <HexDot />
                  {data.otusLabel}
                </p>
                <div className={styles.stack}>
                  {data.items.map((item) => (
                    <div key={item.id} data-turn className={styles.turn}>
                      <div data-prompt className={styles.prompt}>
                        <span>{data.youLabel}</span>
                        <p>{item.prompt}</p>
                      </div>
                      <div className={styles.answer}>
                        {item.lines.map((line) => (
                          <p key={line} data-line>
                            {line}
                          </p>
                        ))}
                      </div>
                      <div data-actions className={styles.actions}>
                        {item.actions.map((action, index) => (
                          <span key={action} className={index === 0 ? styles.primary : undefined}>
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className={styles.footer}>{data.footer}</p>
              </div>
            </div>
            <div className={g.vignette} />
          </div>
        ))}
      </div>
      {!still && <GlassPause playing={playing} toggle={toggle} pause={data.pause} play={data.play} />}
    </div>
  );
}
