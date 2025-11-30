import React from 'react';

export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-primary">
      <div className="h-40 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        {project.images && project.images.length > 0 ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="object-contain h-36"
            loading="lazy"
            width="560"
            height="320"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{project.title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{project.shortDesc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags?.slice(0,4).map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {project.demo && (
              <a aria-label={`Open demo for ${project.title}`} href={project.demo} target="_blank" rel="noreferrer" className="text-sm px-3 py-1 bg-yellow-400 text-black rounded focus:outline-none focus:ring-2 focus:ring-primary">Demo</a>
            )}
            {project.repo && (
              <a aria-label={`Open source for ${project.title}`} href={project.repo} target="_blank" rel="noreferrer" className="text-sm px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary">Source</a>
            )}
          </div>
          <button onClick={() => onOpen(project)} aria-label={`View details for ${project.title}`} className="text-sm text-primary underline focus:outline-none focus:ring-2 focus:ring-primary">More</button>
        </div>
      </div>
    </article>
  );
}
