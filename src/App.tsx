import { useState, useEffect } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved as Theme;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
  } catch {
    // ignore
  }
  return "light";
}

function applyTheme(themeValue: Theme) {
  if (themeValue === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  try {
    localStorage.setItem("theme", themeValue);
  } catch {
    // ignore write errors
  }
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Make the setMounted call asynchronous so it's not a synchronous setState inside effect.
  useEffect(() => {
    // Use requestAnimationFrame -> runs before next paint, avoids sync setState in effect
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-black dark:bg-black dark:text-yellow-400 transition-colors duration-500">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
