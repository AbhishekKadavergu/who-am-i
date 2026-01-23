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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="
            bg-[var(--brand-dark)]
            text-[var(--brand-text)]
            rounded-xl
            shadow-2xl
            max-w-3xl
            w-full
            mx-4
            max-h-[90vh]
            overflow-y-auto
            border border-white/10
          "
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm text-[var(--brand-muted)] mt-1">
                {project.role} · {project.year}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="
    cursor-pointer
    text-xl
    opacity-70
    rounded-md
    p-1.5

    transition-all duration-200 ease-out

    hover:opacity-100
    hover:text-[var(--brand-orange)]
    hover:shadow-[0_0_18px_var(--brand-orange-glow)]

    focus-visible:outline-none
    focus-visible:text-[var(--brand-orange)]
    focus-visible:ring-2
    focus-visible:ring-[var(--brand-orange)]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[var(--brand-dark)]
  "
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-10">
            {/* Context */}
            <section>
              <p className="text-lg leading-relaxed text-[var(--brand-text)]">
                {project.shortDesc}
              </p>
            </section>

            <Divider />

            {/* System Overview */}
            <Section title="System Overview">
              <p className="leading-relaxed text-[var(--brand-muted)]">
                {project.longDesc}
              </p>
            </Section>

            {/* Decisions */}
            <Section title="Key Decisions & Trade-offs">
              <ul className="space-y-3 text-[var(--brand-muted)]">
                <li className="flex gap-3">
                  <span className="text-[var(--brand-orange)]">—</span>
                  <span>
                    Optimized for scalability and isolation over tight coupling
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--brand-orange)]">—</span>
                  <span>
                    Prioritized long-term maintainability over short-term speed
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--brand-orange)]">—</span>
                  <span>Accepted higher complexity to improve reliability</span>
                </li>
              </ul>
            </Section>

            {/* Impact */}
            {project.highlights && (
              <Section title="Impact">
                <ul className="space-y-3">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-[var(--brand-muted)]"
                    >
                      <span className="text-[var(--brand-orange)]">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Stack */}
            <Section title="Technology Stack">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
            </Section>

            {/* Actions */}
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
    document.body,
  );
}

/* ---------- helpers ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-xs uppercase tracking-wider text-[var(--brand-muted)]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Divider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  );
}
