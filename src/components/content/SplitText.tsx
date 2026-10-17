import Image from "next/image";
import { ButtonLink } from "@/components/brand/Button";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { section, type Tone } from "./surface";

export type SplitImage = { src: string; alt: string; width: number; height: number };

/** Feathers Anna's square renders so they sit on the page rather than as a pasted rectangle. */
const FEATHER = "radial-gradient(115% 105% at 50% 42%, #000 52%, transparent 100%)";

/** Text beside an optional image or graphic. Children render under the paragraphs. */
export function SplitText({
  cap,
  heading,
  headingLevel = "h2",
  paragraphs,
  image,
  visual,
  imageSide = "right",
  link,
  tone = "white",
  children,
}: {
  cap?: string;
  heading: string;
  headingLevel?: "h2" | "h3";
  paragraphs: string[];
  image?: SplitImage;
  visual?: React.ReactNode;
  imageSide?: "left" | "right";
  link?: { href: string; label: string };
  tone?: Tone;
  children?: React.ReactNode;
}) {
  const Heading = headingLevel;
  const art = visual ?? (image && (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className="mx-auto h-auto w-full max-w-[380px]"
      style={{ WebkitMaskImage: FEATHER, maskImage: FEATHER }}
    />
  ));
  return (
    <section className={section(tone)}>
      <div
        className={cn(
          "mx-auto grid max-w-7xl items-center gap-14",
          art && "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-20",
        )}
      >
        <Reveal className={cn("max-w-[70ch]", imageSide === "left" && art && "lg:order-2")}>
          {cap && <p className="mb-4 text-caption-sm text-accent">{cap}</p>}
          <Heading className="font-display text-[30px] font-bold leading-[1.15] text-strong text-balance md:text-[40px]">
            {heading}
          </Heading>
          <div className="mt-6 space-y-6 text-[18px] leading-[30px] text-body">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {children}
          {link && (
            <div className="mt-9">
              <ButtonLink href={link.href} variant="primary" size="lg">
                {link.label}
              </ButtonLink>
            </div>
          )}
        </Reveal>
        {art && (
          <Reveal
            delay={0.15}
            className={cn("relative grid min-h-[320px] place-items-center", imageSide === "left" && "lg:order-1")}
          >
            {art}
          </Reveal>
        )}
      </div>
    </section>
  );
}
