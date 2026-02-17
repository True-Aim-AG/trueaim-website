import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import Image from "next/image";
import { slideFromLeft, slideFromRight, staggerContainer } from "@/lib/animations";
import { PartnerLogos } from "./PartnerLogos";

const awards: { country: string; title: string; titleLine2?: string; image: string }[] = [
  {
    country: "Switzerland",
    title: "Innovationspreis der Schweizer Assekuranz",
    image: "/awards/swiss-innovation.png",
  },
  {
    country: "Germany",
    title: "Digitaler Leuchtturm Versicherungen - 1. Rang",
    image: "/awards/digitaler-leuchtturm.png",
  },
  {
    country: "Italy",
    title: "Miglior InsurTech",
    titleLine2: "IKN Awards",
    image: "/awards/ikn-italy.png",
  },
];

export async function TrustBar() {
  const t = await getTranslations("trustBar");

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            {t("title")}
          </h2>
          <p className="text-base text-[var(--text-secondary)] mt-3">
            {t("subtitle")}
          </p>
        </MotionDiv>

        {/* Awards with actual badge images */}
        <MotionDiv
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-stretch md:justify-center gap-4 md:gap-6 mb-10 overflow-x-auto pb-2 md:pb-0 scrollbar-hide"
        >
          {awards.map((award, index) => (
            <MotionDiv
              key={award.country}
              variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 md:flex-1 max-w-sm md:max-w-none"
            >
              <div className="flex items-center gap-5 glass-panel p-6 h-full">
                <div className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center p-2 ${
                  index === 1 ? 'bg-slate-600' : 'bg-white'
                }`}>
                  <Image
                    src={award.image}
                    alt={award.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide mb-1">
                    {award.country}
                  </p>
                  <p className="text-base font-semibold text-[var(--text-primary)] leading-tight">
                    <span className="block">{award.title}</span>
                    {award.titleLine2 && <span className="block">{award.titleLine2}</span>}
                  </p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Partner Logos */}
        <PartnerLogos />
      </div>
    </section>
  );
}
