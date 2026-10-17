import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SECTION_TIGHT } from "./surface";

export type StripLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  renderHeight: number;
  href?: string;
};

const LOGO_CLASS =
  "w-auto max-w-[360px] opacity-80 grayscale transition-[filter,opacity] duration-300 ease-brand hover:opacity-100 hover:grayscale-0";

/** Caption over a centred row of partner logos, one tone until hovered. A logo with an href opens its page. */
export function LogoStrip({ caption, logos }: { caption: string; logos: StripLogo[] }) {
  return (
    <section className={SECTION_TIGHT}>
      <div className="mx-auto max-w-7xl">
        <p className="mb-7 text-center text-caption-sm text-subtle">{caption}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10">
          {logos.map((logo) => {
            const img = (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={LOGO_CLASS}
                style={{ height: logo.renderHeight }}
              />
            );
            return (
              <li key={logo.src} className="flex items-center">
                {logo.href ? (
                  <Link href={logo.href} className="block">
                    {img}
                  </Link>
                ) : (
                  img
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
