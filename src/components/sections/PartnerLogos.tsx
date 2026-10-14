"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.4, 0, 0.2, 1] as const;

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
    logo: "/partners/innosuisse.webp",
    width: 200,
    height: 150,
    href: "/partners/innosuisse",
  },
  {
    name: "Swiss InsurTech Hub",
    logo: "/partners/swiss-insurtech-hub.png",
    width: 195,
    height: 100,
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
      transition={{ duration: 0.6, delay: 0.3, ease }}
      className="relative mt-10"
    >
      <h2 className="text-center font-display text-3xl md:text-4xl font-bold text-strong mb-6">
        {t("title")}
      </h2>

      <div className="rounded-pill bg-ta-neutral-0 shadow-card py-8" data-theme="light">
        <div className="flex items-center justify-center gap-6 md:gap-10 lg:gap-12 flex-wrap px-8">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.href}
              className="flex items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={t("logoAlt", { name: partner.name })}
                width={partner.width}
                height={partner.height}
                className="object-contain opacity-85 transition-opacity duration-300 ease-brand hover:opacity-100"
                style={{
                  height: partner.height,
                  width: 'auto',
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
