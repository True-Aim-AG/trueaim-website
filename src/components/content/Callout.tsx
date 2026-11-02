import { ButtonLink } from "@/components/brand/Button";
import { Reveal } from "./Reveal";
import { section, type Tone } from "./surface";

/** One statement, centred, in the heading colour, with an optional link beneath it. */
export function Callout({ text, link, tone = "tint" }: { text: string; link?: { href: string; label: string }; tone?: Tone }) {
  return (
    <section className={section(tone, true)}>
      <Reveal>
        <p className="mx-auto max-w-[70ch] text-center font-display text-[22px] font-medium leading-[1.4] text-strong text-balance md:text-[26px]">
          {text}
        </p>
        {link && (
          <div className="mt-8 flex justify-center">
            <ButtonLink href={link.href} variant="primary" size="lg">
              {link.label}
            </ButtonLink>
          </div>
        )}
      </Reveal>
    </section>
  );
}
