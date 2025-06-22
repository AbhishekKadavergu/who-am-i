import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './index.css';

function App() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('Dark mode enabled: <html> classes =', document.documentElement.className);
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Light mode enabled: <html> classes =', document.documentElement.className);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    console.log('Theme toggled to', newTheme);
  };


  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-yellow-400 transition-colors duration-500">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
