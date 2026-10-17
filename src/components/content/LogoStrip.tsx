import Image from "next/image";
import { Link } from "@/i18n/navigation";

export type StripLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  renderHeight: number;
  href?: string;
};

const LOGO_CLASS = "opacity-85 hover:opacity-100 transition-opacity duration-300 ease-brand";

/** Caption over a card row of partner or certification logos. */
export function LogoStrip({ caption, logos }: { caption: string; logos: StripLogo[] }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-caption-sm text-subtle text-center mb-8">{caption}</p>
        <ul className="rounded-pill bg-card shadow-card py-8 px-6 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => {
            const img = (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={LOGO_CLASS}
                style={{ height: logo.renderHeight, width: "auto" }}
              />
            );
            return (
              <li key={logo.src}>
                {logo.href ? <Link href={logo.href}>{img}</Link> : img}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
