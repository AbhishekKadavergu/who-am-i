import React from "react";

const Header = ({ theme, toggleTheme }) => (
  <header className="flex justify-between items-center py-6 px-4 md:px-12 bg-primary-light dark:bg-primary-dark transition-colors duration-500 shadow-lg">
    <h1 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark">Abhishek Kadavergu</h1>
    <nav className="space-x-4">
      <a href="#about" className="text-text-light dark:text-text-dark hover:text-primary transition-colors">About</a>
      <a href="#projects" className="text-text-light dark:text-text-dark hover:text-primary transition-colors">Projects</a>
      <a href="#contact" className="text-text-light dark:text-text-dark hover:text-primary transition-colors">Contact</a>
      <button onClick={toggleTheme} className="ml-4 px-3 py-1 rounded bg-primary hover:bg-primary/80 text-black dark:text-yellow-300 font-bold transition-colors duration-200">
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </nav>
  </header>
);

export default Header;
