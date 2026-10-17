import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type SplitImage = { src: string; alt: string; width: number; height: number };

/** Text beside an optional image. Children render under the paragraphs. */
export function SplitText({
  heading,
  headingLevel = "h2",
  paragraphs,
  image,
  imageSide = "right",
  link,
  lilac,
  children,
}: {
  heading: string;
  headingLevel?: "h2" | "h3";
  paragraphs: string[];
  image?: SplitImage;
  imageSide?: "left" | "right";
  link?: { href: string; label: string };
  lilac?: boolean;
  children?: React.ReactNode;
}) {
  const Heading = headingLevel;
  return (
    <section className={cn("py-20 px-6", lilac && "bg-lilac")}>
      <div
        className={cn(
          "max-w-7xl mx-auto grid gap-12 items-center",
          image && "lg:grid-cols-2",
        )}
      >
        <div className={cn("max-w-[560px]", imageSide === "left" && image && "lg:order-2")}>
          <Heading className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
            {heading}
          </Heading>
          <div className="space-y-4 text-body leading-[1.6]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {children}
          {link && (
            <p className="mt-6">
              <Link href={link.href} className="font-medium text-link hover:underline">
                {link.label}
              </Link>
            </p>
          )}
        </div>
        {image && (
          <div className={cn(imageSide === "left" && "lg:order-1")}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-auto w-full max-w-[380px] mx-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
}
