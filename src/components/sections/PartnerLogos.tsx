"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    name: "ZHAW",
    logo: "/partners/zhaw-logo.png",
    width: 200,
    height: 150,
    href: "/partners/zhaw",
  },
  {
    name: "Yarowa",
    logo: "/partners/yarowa.png",
    width: 240,
    height: 68,
    href: "/partners/yarowa",
  },
  {
    name: "Innosuisse",
    logo: "/partners/innosuisse.png",
    width: 200,
    height: 150,
    href: "/partners/innosuisse",
  },
  {
    name: "Swiss InsurTech Hub",
    logo: "/partners/swiss-insurtech-hub.png",
    width: 292,
    height: 150,
    href: "/partners/swissinsurtechhub",
  },
];

export function PartnerLogos() {
  const t = useTranslations("partnerLogos");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative mt-10"
    >
      <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
        {t("title")}
      </h2>

      <div className="relative rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 py-8 shadow-inner">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="flex items-center justify-center gap-20 md:gap-32 lg:gap-40 flex-wrap px-8">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.href}
              className="flex items-center justify-center group"
            >
              <div className="relative transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                <Image
                  src={partner.logo}
                  alt={t("logoAlt", { name: partner.name })}
                  width={partner.width}
                  height={partner.height}
                  className="object-contain grayscale-0 opacity-90 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    height: partner.height,
                    width: 'auto',
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-gradient-to-t from-[var(--primary)]/5 to-transparent blur-xl rounded-full" />
    </motion.div>
  );
}
