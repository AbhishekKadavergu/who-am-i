import { motion } from "framer-motion";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
  featured?: boolean;
};

export default function ProjectCard({
  project,
  onOpen,
  featured = false,
}: Props) {
  return (
    <motion.article
      className={`
        card card-accent overflow-hidden cursor-pointer
relative

        ${featured ? "p-6 md:p-8" : ""}
      `}
      whileHover={{ y: featured ? -6 : -4 }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpen(project)}
    >
      {featured && (
        <span
          className="
      absolute top-4 right-4
      text-xs uppercase tracking-wider
      text-[var(--brand-orange)]
      opacity-80
    "
        >
          Featured
        </span>
      )}

      {/* Image */}
      <div
        className={`
    flex items-center justify-center
    rounded-xl
    ${featured ? "h-52 mb-6" : "h-40"}
    bg-[var(--brand-surface)]
shadow-inner

  `}
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
      >
        {project.images?.length ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="object-contain h-full"
            loading="lazy"
          />
        ) : (
          <div className="text-gray-400 dark:text-gray-500">No image</div>
        )}
      </div>

      {/* Content */}
      <div className={`${featured ? "space-y-4" : "p-5 space-y-3"}`}>
        {/* Title */}
        <h3
          className={`
    ${featured ? "text-2xl font-semibold" : "text-lg font-semibold"}
    tracking-tight
    text-[var(--brand-text)]
  `}
        >
          {project.title}
        </h3>

        <p className="text-body-sm text-[var(--brand-muted)]">
          {project.shortDesc}
        </p>

        {/* Highlights – ONLY for featured */}
        {featured && project.highlights && (
          <ul className="mt-4 space-y-2 text-sm text-[var(--brand-muted)] leading-relaxed">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-[var(--brand-orange)]">—</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags?.slice(0, featured ? 3 : 4).map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        {!featured && (
          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="flex gap-2">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary text-sm"
                >
                  Demo
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary text-sm"
                >
                  Source
                </a>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen(project);
              }}
              className="text-link cursor-pointer"
            >
              Read more
            </button>
          </div>
        )}

        {/* Featured CTA */}
        {featured && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
            className="
  pt-4
  inline-flex items-center gap-2
  text-sm font-medium
  text-[var(--brand-orange)]
  transition-transform
  hover:translate-x-1
  cursor-pointer
"
          >
            View system overview →
          </button>
        )}
      </div>
    </motion.article>
  );
}
