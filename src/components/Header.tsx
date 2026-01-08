import React from "react";
import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.header
      className="flex justify-between items-center py-6 px-4 md:px-12 bg-[var(--brand-bg)] transition-colors duration-400 border-b border-gray-200 dark:border-gray-800"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="heading-lg text-gray-900 dark:text-white"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <span className="inline-block mr-3">Abhishek Kadavergu</span>
        <span className="text-sm px-3 py-1 rounded-full bg-[var(--brand-yellow)] text-[var(--brand-black)] font-semibold">
          Portfolio
        </span>
      </motion.h1>

      <motion.nav
        className="flex items-center gap-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <a
          href="#about"
          className="text-body-sm font-medium cursor-pointer hover:text-[var(--brand-yellow)] transition-colors duration-200"
        >
          About
        </a>
        <a
          href="#projects"
          className="text-body-sm font-medium cursor-pointer hover:text-[var(--brand-yellow)] transition-colors duration-200"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="text-body-sm font-medium cursor-pointer hover:text-[var(--brand-yellow)] transition-colors duration-200"
        >
          Contact
        </a>

        <button
          onClick={toggleTheme}
          className="btn btn-secondary text-lg"
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          <span aria-hidden="true">{theme === "dark" ? "🌙" : "☀️"}</span>
        </button>
      </motion.nav>
    </motion.header>
  );
};

export default Header;
