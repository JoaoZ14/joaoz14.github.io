import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "theme";
const META_COLORS = { light: "#ffffff", dark: "#0a0a0a" };

const ThemeContext = createContext(null);

/**
 * Lê o tema inicial na mesma ordem do script anti-flash do index.html:
 * preferência salva > preferência do sistema > claro.
 */
function getInitialTheme() {
  if (typeof window === "undefined") return "light";

  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch (e) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", META_COLORS[theme]);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      return; // ignora falha de persistência (ex.: modo privado)
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return ctx;
}
