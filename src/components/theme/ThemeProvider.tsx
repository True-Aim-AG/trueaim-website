"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * The website is dark-first (docs/DESIGN_SYSTEM.md §2.8): the design system's dark theme is the
 * site default, light is available per section via data-theme="light". The provider pins the document.
 */
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    try {
      localStorage.removeItem("theme");
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return { theme: "dark" as Theme, setTheme: () => {} };
  }
  return context;
}
