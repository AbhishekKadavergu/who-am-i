import type { Project } from "../data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full mx-4 overflow-auto max-h-[90vh]">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-start">
          <div>
            <h2
              id="project-modal-title"
              className="text-2xl font-bold text-text-light dark:text-text-dark"
            >
              {project.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {project.role} • {project.year}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="text-xl leading-none focus:outline-none focus:ring-2 focus:ring-primary"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-200">{project.longDesc}</p>

          {project.highlights && (
            <div>
              <h3 className="font-semibold mb-2">Highlights</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {project.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  className="w-full h-40 object-contain bg-gray-50 dark:bg-gray-800 p-2"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          <div className="flex gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-yellow-400 rounded"
              >
                Live Demo
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border rounded"
              >
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
