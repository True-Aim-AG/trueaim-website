import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";
import { section, type Tone } from "./surface";

/** One statement, centred, in the heading colour, with an optional link after it. */
export function Callout({ text, link, tone = "tint" }: { text: string; link?: { href: string; label: string }; tone?: Tone }) {
  return (
    <section className={section(tone, true)}>
      <Reveal>
        <p className="mx-auto max-w-[70ch] text-center font-display text-[22px] font-medium leading-[1.4] text-strong text-balance md:text-[26px]">
          {text}
          {link && (
            <>
              {" "}
              <Link href={link.href} className="text-accent underline-offset-4 hover:underline">
                {link.label}
              </Link>
            </>
          )}
        </p>
      </Reveal>
    </section>
  );
}
