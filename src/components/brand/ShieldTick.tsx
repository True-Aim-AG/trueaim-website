import { createLucideIcon } from "lucide-react";

/** Lucide's shield with a larger tick inside, for certifications True Aim holds. */
export const ShieldTick = createLucideIcon("shield-tick", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "shield",
    },
  ],
  ["path", { d: "m8 12.5 3 3 5-6", key: "tick" }],
]);
