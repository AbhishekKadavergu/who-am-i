import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

function App() {
  // Initialize theme on mount by checking localStorage or system preference
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Hydrate theme from localStorage/system on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  // Update theme when state changes
  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const applyTheme = (themeValue) => {
    if (themeValue === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', themeValue);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

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
