import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";
import { section, type Tone } from "./surface";

export type VisionPerson = { name: string; role: string; photo: string; alt: string };

/**
 * The founders' vision: the heading and the founders' portraits on the left,
 * the text in two columns on the right, as the Legora home page sets its
 * vision. The portraits are square, cropped the same way, and never shown
 * larger than their source stays sharp (about 400 px).
 */
export function VisionSection({
  heading,
  paragraphs,
  people,
  link,
  tone = "white",
}: {
  heading: string;
  /** Each paragraph as rendered rich text, so a phrase can be set in bold. */
  paragraphs: React.ReactNode[];
  people: VisionPerson[];
  link: { href: string; label: string };
  tone?: Tone;
}) {
  return (
    <section className={section(tone)}>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="flex flex-col">
          <h2 className="font-display text-[30px] font-bold leading-[1.15] text-strong text-balance md:text-[40px]">{heading}</h2>
          <ul className="mt-10 grid max-w-[460px] grid-cols-2 gap-5 lg:mt-auto lg:pt-12">
            {people.map((person) => (
              <li key={person.name}>
                <Image
                  src={person.photo}
                  alt={person.alt}
                  width={640}
                  height={640}
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="aspect-square h-auto w-full max-w-[220px] rounded-[20px] object-cover shadow-[0_12px_32px_-10px_rgba(44,43,42,.28)]"
                />
                <p className="mt-4 font-display text-[16px] font-semibold leading-[1.3] text-strong">{person.name}</p>
                <p className="mt-0.5 text-[14px] leading-[1.4] text-muted">{person.role}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="text-[17px] leading-[1.65] text-body md:columns-2 md:gap-10 [&>p]:mb-5 [&>p]:break-inside-avoid">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <Link
            href={link.href}
            className="group mt-4 inline-flex items-center gap-2 font-medium text-accent transition-colors duration-150 ease-brand hover:text-accent-hover"
          >
            {link.label}
            <ArrowRight aria-hidden strokeWidth={1.6} className="h-4 w-4 transition-transform duration-150 ease-brand group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
