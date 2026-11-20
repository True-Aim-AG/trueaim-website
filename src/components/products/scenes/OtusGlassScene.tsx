"use client";

import { ArrowUp } from "lucide-react";
import { useCallback, useRef } from "react";

import { SCENE_CARD, SCENE_CARD_HERO } from "@/components/content/surface";
import { cn } from "@/lib/utils";

import {
  clamp01,
  easeOut,
  GlassPause,
  lerp,
  seg,
  spring,
  u,
  useGlassLoop,
} from "./glass";
import g from "./glass.module.css";
import styles from "./OtusGlassScene.module.css";
import { OtusMark } from "./OtusMark";

export type OtusGlassData = {
  alt: string;
  otusLabel: string;
  /** The words in the empty message bar. */
  placeholder: string;
  /** One question each: what the adjuster types, the answer in short lines, and the actions Otus offers. */
  items: { id: string; prompt: string; lines: string[]; actions: string[] }[];
  pause: string;
  play: string;
};

/** The one timing table, in seconds. Each question holds the scene for STEP; the beats count from its start. */
const STEP = 10.5;
const TYPE_T = 0.5;
/** Characters typed per second, at constant speed. */
const TYPE_RATE = 30;
const SEND_GAP = 0.35;
const REPLY_GAP = 0.8;
const LINE_STEP = 0.7;
const ACTIONS_GAP = 0.4;
const CLEAR = 0.5;

const LAYOUTS = [
  { name: "desktop", ww: 1600 },
  { name: "phone", ww: 720 },
] as const;

type Item = OtusGlassData["items"][number];

/** Collects one stage's elements and returns the function that draws one frame. */
function prepareStage(root: HTMLElement, ww: number, items: Item[]) {
  const all = (sel: string, el: ParentNode = root) =>
    Array.from(el.querySelectorAll<HTMLElement>(sel));
  const one = (sel: string) => root.querySelector<HTMLElement>(sel)!;
  const turns = all("[data-turn]").map((el) => ({
    prompt: el.querySelector<HTMLElement>("[data-prompt]")!,
    who: el.querySelector<HTMLElement>("[data-who]")!,
    lines: all("[data-line]", el),
    actions: el.querySelector<HTMLElement>("[data-actions]")!,
  }));
  const bar = one("[data-bar]");
  const typed = one("[data-typed]");
  const placeholder = one("[data-placeholder]");
  const caret = one("[data-caret]");
  const send = one("[data-send]");
  const count = items.length;

  // A sent question rises out of the message bar: how far, in world units, from where each one comes to rest.
  const box = root.getBoundingClientRect();
  const k = box.width ? box.width / ww : 0;
  const rise = turns.map((turn) =>
    k
      ? (bar.getBoundingClientRect().top -
          turn.prompt.getBoundingClientRect().top) /
        k
      : 120,
  );

  /** One frame of the loop: every style is a function of t alone, so any t can be shown. */
  return (t: number) => {
    root.style.setProperty(
      "--sh",
      `${(34 + 3.2 * Math.sin((2 * Math.PI * t) / (STEP * count))).toFixed(2)}%`,
    );
    const now = Math.min(count - 1, Math.floor(t / STEP));

    for (let i = 0; i < count; i++) {
      // Seconds since this question took the scene; outside its turn everything of it is hidden.
      const local = t - i * STEP;
      const live = i === now;
      const out = live ? 1 - easeOut(seg(local, STEP - CLEAR, STEP)) : 0;
      const sent = TYPE_T + items[i].prompt.length / TYPE_RATE + SEND_GAP;
      const turn = turns[i];

      const b = spring(seg(local, sent, sent + 0.7), 0.06);
      turn.prompt.style.opacity = String(clamp01(b * 1.6) * out);
      turn.prompt.style.transform = `translateY(${u(+lerp(rise[i], 0, b).toFixed(1))})`;

      const replied = sent + REPLY_GAP;
      turn.who.style.opacity = String(
        easeOut(seg(local, replied, replied + 0.3)) * out,
      );
      turn.lines.forEach((line, j) => {
        const t0 = replied + 0.3 + j * LINE_STEP;
        const v = easeOut(seg(local, t0, t0 + 0.45)) * out;
        line.style.opacity = String(v);
        line.style.transform = `translateY(${u(+lerp(10, 0, v).toFixed(1))})`;
      });
      const at = replied + 0.3 + turn.lines.length * LINE_STEP + ACTIONS_GAP;
      const a = spring(seg(local, at, at + 0.7), 0.07);
      turn.actions.style.opacity = String(clamp01(a * 1.5) * out);
      turn.actions.style.transform = `translateY(${u(+lerp(12, 0, a).toFixed(1))})`;

      if (!live) continue;
      // The bar: the question is typed at constant speed, then sent, and the bar is empty again.
      const prompt = items[i].prompt;
      const typing = local < sent;
      const shown = typing
        ? prompt.slice(0, Math.max(0, Math.floor((local - TYPE_T) * TYPE_RATE)))
        : "";
      if (typed.textContent !== shown) typed.textContent = shown;
      placeholder.style.opacity = shown ? "0" : "1";
      caret.style.opacity = shown ? "1" : "0";
      send.style.setProperty("--on", shown ? "1" : "0");
    }
  };
}

/**
 * The Otus hero, in the glass look of the platform demo: one pale glass sheet
 * holds the conversation and a composer at its foot. An adjuster's question
 * is typed into the composer and sent, rises into the conversation as a quiet
 * line on the right, and Otus writes its answer onto the sheet in short lines
 * with the actions it offers. No chat bubbles. The conversation then
 * clears and the next question is typed. Otus's mark is the brand symbol,
 * alive in small ways.
 *
 * Live HTML in world units, as the other glass heroes: translated text, a
 * portrait layout below 480px, a still frame under reduced motion and the
 * figure itself as the pause control (WCAG 2.2.2).
 */
export function OtusGlassScene({
  data,
  still,
  bleed,
}: {
  data: OtusGlassData;
  /** A picture, not a film: the finished frame of the desktop layout at any width, with no pause control. */
  still?: boolean;
  /** The scene is the whole hero: no card around it, edge to edge. */
  bleed?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const items = data.items;
  const prepare = useCallback(
    (root: HTMLElement) => {
      const draws = LAYOUTS.map((layout) =>
        prepareStage(
          root.querySelector<HTMLElement>(`[data-stage="${layout.name}"]`)!,
          layout.ww,
          items,
        ),
      );
      return (t: number) => draws.forEach((draw) => draw(t));
    },
    [items],
  );
  // The still frame is the last question with its whole answer and its actions in view.
  const { playing, toggle } = useGlassLoop(
    rootRef,
    STEP * items.length,
    STEP * items.length - 1,
    prepare,
    still,
  );

  return (
    <div
      ref={rootRef}
      data-paused={playing || still ? undefined : ""}
      className={cn(
        "@container relative",
        bleed ? "font-body" : cn(SCENE_CARD, SCENE_CARD_HERO, "rounded-[10px]"),
        still && "h-full",
      )}
    >
      <div role="img" aria-label={data.alt} className={cn(still && "h-full")}>
        {LAYOUTS.map(({ name }) => (
          <div
            key={name}
            data-stage={name}
            className={cn(
              g.stage,
              g[name],
              styles[name],
              still && styles.still,
              bleed && styles.bleed,
              still
                ? name !== "desktop" && "hidden"
                : name === "desktop"
                  ? "@max-[480px]:hidden"
                  : "hidden @max-[480px]:block",
            )}
          >
            <div className={g.ground} />
            <div className={g.floor} />
            <div className={styles.world}>
              <div className={styles.sheet}>
                <div className={styles.thread}>
                  {items.map((item) => (
                    <div key={item.id} data-turn className={styles.turn}>
                      <p data-prompt className={styles.prompt}>
                        {item.prompt}
                      </p>
                      <div className={styles.reply}>
                        <p data-who className={styles.who}>
                          <OtusMark />
                          {data.otusLabel}
                        </p>
                        {item.lines.map((line) => (
                          <p key={line} data-line className={styles.line}>
                            {line}
                          </p>
                        ))}
                        <div data-actions className={styles.actions}>
                          {item.actions.map((action, index) => (
                            <span
                              key={action}
                              className={
                                index === 0 ? styles.primary : undefined
                              }
                            >
                              {action}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div data-bar className={styles.bar}>
                  <span className={styles.field}>
                    <span data-placeholder className={styles.placeholder}>
                      {data.placeholder}
                    </span>
                    <span data-typed />
                    <i data-caret />
                  </span>
                  <span data-send className={styles.send}>
                    <ArrowUp aria-hidden strokeWidth={2.2} />
                  </span>
                </div>
              </div>
            </div>
            <div className={g.vignette} />
          </div>
        ))}
      </div>
      {!still && (
        <GlassPause
          playing={playing}
          toggle={toggle}
          pause={data.pause}
          play={data.play}
        />
      )}
    </div>
  );
}
