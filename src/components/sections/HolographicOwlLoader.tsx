"use client";

import dynamic from "next/dynamic";

const HolographicOwl = dynamic(
  () => import("./HolographicOwl").then((m) => m.HolographicOwl),
  { ssr: false },
);

export function HolographicOwlHero() {
  return (
    <div className="w-full h-full">
      <HolographicOwl />
    </div>
  );
}
