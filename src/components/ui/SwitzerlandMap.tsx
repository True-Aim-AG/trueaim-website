import { MapPin } from "lucide-react";
import { GridPattern } from "@/components/brand/GridPattern";

interface SwitzerlandMapProps {
  label?: string;
}

export function SwitzerlandMap({ label = "Switzerland" }: SwitzerlandMapProps) {
  return (
    <div className="relative flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-pill bg-surface-muted p-8">
      <GridPattern className="absolute inset-0" step={32} />
      {/* Switzerland marker */}
      <div className="relative z-10">
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ta-blue shadow-[0_0_0_5px_rgba(163,165,182,.16)]">
            <MapPin strokeWidth={1.5} className="h-7 w-7 text-on-brand" />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="rounded-pill bg-card px-3 py-1 text-sm font-semibold text-strong shadow-swatch">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
