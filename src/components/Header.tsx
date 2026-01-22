import React from "react";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <motion.header
      className="
        sticky top-0 z-50
        bg-[var(--brand-bg)]/80 backdrop-blur
        border-b border-white/5
      "
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="mx-auto px-4 md:px-12 py-4 flex items-center justify-between">
        {/* Identity */}
        <motion.a
          href="#about"
          className="
            group relative
            text-lg md:text-xl
            font-semibold
            tracking-tight
            text-[var(--brand-text)]
            cursor-pointer
          "
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="relative z-10">Abhishek Kadavergu</span>

          {/* underline accent */}
          <span
            className="
              absolute left-0 -bottom-1
              h-[2px] w-0
              bg-[var(--brand-orange)]
              transition-all duration-300
              group-hover:w-full
            "
          />

          {/* soft glow */}
          <span
            className="
              absolute left-0 -bottom-1
              h-[2px] w-0
              bg-[var(--brand-orange)]
              blur-sm opacity-40
              transition-all duration-300
              group-hover:w-full
            "
          />
        </motion.a>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {[
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="
                group relative
                text-sm
                font-medium
                text-[var(--brand-muted)]
                transition-colors
                hover:text-[var(--brand-text)]
              "
            >
              {item.label}
              <span
                className="
                  absolute left-0 -bottom-1
                  h-[2px] w-0
                  bg-[var(--brand-orange)]
                  transition-all duration-200
                  group-hover:w-full
                "
              />
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
