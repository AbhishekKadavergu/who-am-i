import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="bg-[var(--brand-white)] dark:bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full mx-4 overflow-auto max-h-[90vh]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
            <div>
              <h2 id="project-modal-title" className="heading-md">
                {project.title}
              </h2>
              <p className="text-body-sm text-muted">
                {project.role} • {project.year}
              </p>
            </div>
            <motion.button
              onClick={onClose}
              aria-label="Close project details"
              className="text-2xl leading-none ring-focus cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ✕
            </motion.button>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-body">{project.longDesc}</p>

            {project.highlights && (
              <div>
                <h3 className="heading-sm mb-3">Highlights</h3>
                <ul className="space-y-2 text-body">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={`${project.id}-highlight-${i}`}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-[var(--brand-yellow)] font-bold">
                        •
                      </span>
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {project.images.map((src, i) => (
                  <motion.img
                    key={`${project.id}-img-${i}`}
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    className="w-full h-40 object-contain bg-gray-100 dark:bg-gray-800 p-2 rounded"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Live Demo
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
