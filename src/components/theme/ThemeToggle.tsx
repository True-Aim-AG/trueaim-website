"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  /** Show the label next to the icon (mobile menu). */
  withLabel?: boolean;
}

/** Light/dark switcher: a pill button that flips the document theme and persists the choice. */
export function ThemeToggle({ className, withLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} mode`;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-theme-toggle
      data-theme-current={theme}
      aria-label={label}
      title={label}
      aria-pressed={theme === "light"}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-pill px-3 text-body transition-colors duration-150 ease-brand hover:bg-accent-soft hover:text-accent",
        withLabel && "w-full justify-start px-4",
        className,
      )}
    >
      {/* The visible icon shows the mode the click will switch to. */}
      {theme === "dark" ? <Sun strokeWidth={1.5} className="h-4 w-4" /> : <Moon strokeWidth={1.5} className="h-4 w-4" />}
      {withLabel && <span className="text-sm">{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}
