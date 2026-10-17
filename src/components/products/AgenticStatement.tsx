import Image from "next/image";
import { Reveal } from "@/components/content/Reveal";

/** One centred statement under the owl, on the dark band so the owl shines. */
export function AgenticStatement({ heading }: { heading: string }) {
  return (
    <section data-theme="dark" className="bg-page-tint px-6 py-20 md:py-[120px]">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <Image src="/brand/3d/owl.png" alt="" width={864} height={1350} className="h-auto w-[200px] md:w-[260px]" />
        <h2 className="mt-6 font-display text-[30px] font-bold leading-[1.15] text-strong text-balance md:text-[40px]">
          {heading}
        </h2>
      </Reveal>
    </section>
  );
}
