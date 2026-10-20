import Image from "next/image";
import { Reveal } from "@/components/content/Reveal";
import { section, type Tone } from "@/components/content/surface";

/** One centred statement under the True Aim symbol in glass and metal. */
export function AgenticStatement({ heading, tone = "white" }: { heading: string; tone?: Tone }) {
  return (
    <section className={section(tone)}>
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <Image src="/brand/3d/symbol.webp" alt="" width={420} height={236} className="h-auto w-[260px] md:w-[320px]" />
        <h2 className="mt-8 font-display text-[30px] font-bold leading-[1.15] text-strong text-balance md:text-[40px]">
          {heading}
        </h2>
      </Reveal>
    </section>
  );
}
