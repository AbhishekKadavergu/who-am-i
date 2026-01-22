import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "hideProgressBanner";

const ProgressBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(
    () => localStorage.getItem(STORAGE_KEY) !== "true",
  );

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="
          w-full
          bg-[#0B0F14]
          border-b border-white/5
          relative
        "
      >
        {/* top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF9F1C]" />

        <div className="max-w-7xl mx-auto px-4 md:px-12 py-2.5">
          <div className="flex items-center gap-4">
            {/* Message */}
            <div className="flex items-start gap-3 text-left">
              <span className="text-base leading-none opacity-90">🚧</span>

              <p className="text-sm text-gray-300 leading-snug">
                This portfolio is actively evolving.
                <span className="text-gray-400">
                  {" "}
                  Sections are shipped incrementally.
                </span>
              </p>
            </div>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              className="
                ml-auto
                text-sm
                text-gray-400
                hover:text-[#FF9F1C]
                transition-colors
              "
              aria-label="Dismiss banner"
            >
              Dismiss
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProgressBanner;
