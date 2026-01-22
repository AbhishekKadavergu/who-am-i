import React, { useEffect } from "react";
import Header from "./components/Header";
import ProgressBanner from "./components/ProgressBanner";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
import ThemeProvider from "./context/ThemeProvider";
import Skills from "./components/Skills";

function App() {
  // keep the initial mount gating to avoid flash of uninitialized UI
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors duration-500">
          <a href="#main" className="sr-only focus:not-sr-only">
            Skip to content
          </a>
          <ProgressBanner />
          <Header />
          <main id="main">
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
