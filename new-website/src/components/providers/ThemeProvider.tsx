"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme         = "light" | "dark" | "auto";
type ResolvedTheme = "light" | "dark";

interface ThemeCtxType {
  theme:         Theme;
  resolvedTheme: ResolvedTheme;
  setTheme:      (t: Theme) => void;
}

const ThemeContext = createContext<ThemeCtxType>({
  theme:         "auto",
  resolvedTheme: "light",
  setTheme:      () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme,      setThemeState] = useState<Theme>("auto");
  const [systemDark, setSystemDark] = useState(false);

  /* Bootstrap from localStorage + system preference */
  useEffect(() => {
    const stored = (localStorage.getItem("svp-theme") as Theme) || "auto";
    setThemeState(stored);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const resolved: ResolvedTheme =
    theme === "auto" ? (systemDark ? "dark" : "light") : theme;

  /* Apply / remove .dark class on <html> */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, [resolved]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("svp-theme", t);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme: resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
