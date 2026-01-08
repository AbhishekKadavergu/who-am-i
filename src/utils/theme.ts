export const THEME_KEY = "theme";

export type Theme = "light" | "dark";

export function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved as Theme;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return "dark";
  } catch {
    // ignore
  }
  return "light";
}
