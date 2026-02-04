"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    name: "ZHAW",
    logo: "/partners/zhaw.jpg",
    width: 160,
    height: 120,
  },
  {
    name: "Yarowa",
    logo: "/partners/yarowa.png",
    width: 200,
    height: 56,
  },
  {
    name: "Innosuisse",
    logo: "/partners/innosuisse.png",
    width: 280,
    height: 80,
  },
];

export function PartnerLogos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative mt-10"
    >
      {/* Section Label */}
      <p className="text-center text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-6">
        Trusted Partners
      </p>

      {/* Static Logo Display */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 py-8 shadow-inner">
        {/* Subtle top/bottom border lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="flex items-center justify-center gap-20 md:gap-32 lg:gap-40 flex-wrap px-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center group"
            >
              <div className="relative transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  className="object-contain grayscale-0 opacity-90 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    height: partner.height,
                    width: 'auto',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-gradient-to-t from-[var(--primary)]/5 to-transparent blur-xl rounded-full" />
    </motion.div>
  );
}
