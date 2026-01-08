import { motion } from "framer-motion";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  return (
    <motion.article
      className="card card-accent overflow-hidden cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        {project.images && project.images.length > 0 ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="object-contain h-36"
            loading="lazy"
            width={560}
            height={320}
          />
        ) : (
          <div className="text-gray-400 dark:text-gray-500">No image</div>
        )}
      </div>
      <div className="p-5 space-y-3">
        <h3 className="heading-sm">{project.title}</h3>
        <p className="text-body-sm text-muted">{project.shortDesc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.slice(0, 4).map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
        <div className="pt-2 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {project.demo && (
              <a
                aria-label={`Open demo for ${project.title}`}
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
                aria-label={`Open source for ${project.title}`}
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
            onClick={() => onOpen(project)}
            aria-label={`View details for ${project.title}`}
            className="text-link"
          >
            More
          </button>
        </div>
      </div>
    </motion.article>
  );
}
