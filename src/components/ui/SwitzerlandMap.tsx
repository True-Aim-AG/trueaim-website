import { MapPin } from "lucide-react";

interface SwitzerlandMapProps {
  label?: string;
}

export function SwitzerlandMap({ label = "Switzerland" }: SwitzerlandMapProps) {
  return (
    <div className="glass-panel p-8 relative overflow-hidden min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-4 border-2 border-dashed border-[var(--border)] rounded-xl" />

      {/* Switzerland marker */}
      <div className="relative z-10">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-red-400" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="text-sm font-semibold text-[var(--text-primary)] bg-[var(--subtle-bg)] px-2 py-1 rounded backdrop-blur-sm">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
