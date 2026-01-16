"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    name: "ZHAW",
    logo: "/partners/zhaw.jpg",
    width: 100,
    height: 80,
  },
  {
    name: "Yarowa",
    logo: "/partners/yarowa.png",
    width: 140,
    height: 40,
  },
  {
    name: "Innosuisse",
    logo: "/partners/innosuisse.png",
    width: 200,
    height: 60,
  },
];

// Duplicate for seamless infinite scroll
const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

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

      {/* Marquee Container with Light Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 py-8 shadow-inner">
        {/* Subtle top/bottom border lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Animated Track */}
        <div className="flex animate-marquee">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-12 flex items-center justify-center group"
            >
              <div className="relative transition-transform duration-300 ease-out group-hover:scale-110">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  className="object-contain grayscale-0 opacity-90 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    maxHeight: partner.height,
                    width: 'auto',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle ambient glow under the marquee */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-gradient-to-t from-[var(--primary)]/5 to-transparent blur-xl rounded-full" />
    </motion.div>
  );
}
