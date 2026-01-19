import { useContext } from "react";
import ThemeContext, { type ThemeContextType } from "../context/ThemeContext";

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export default useTheme;
