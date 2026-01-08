import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProgressBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="mx-auto px-3 py-3">
            <div className="flex items-center">
              {/* Left-aligned message */}
              <div className="flex items-start gap-3 text-left">
                <span className="text-xl leading-none mt-0.5">🚧</span>
                <p className="text-sm md:text-base font-medium leading-snug">
                  This portfolio is actively evolving. Sections are being
                  shipped incrementally.
                </p>
              </div>

              {/* Right-aligned close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="ml-auto flex-shrink-0 rounded-md p-1.5 hover:bg-white/20 transition-colors"
                aria-label="Dismiss banner"
                title="Dismiss"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProgressBanner;
