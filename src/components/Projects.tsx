import { useEffect, useMemo, useRef, useState, type JSX } from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import useDebounce from "../hooks/useDebounce";
import { UI_CONSTANTS } from "../constants/ui";
import type { Project } from "../data/projects";

export default function Projects(): JSX.Element {
  const allProjects = projectsData as Project[];

  // Filters & search
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [active, setActive] = useState<Project | null>(null);

  // Debounce search term for efficient filtering
  const search = useDebounce(searchTerm.trim(), UI_CONSTANTS.DEBOUNCE_MS);

  // Build tags (unique)
  const tags = useMemo(() => {
    const s = new Set<string>();
    allProjects.forEach((p) => p.tags?.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, [allProjects]);

  // Filtered projects
  const filtered = useMemo(() => {
    let res = allProjects;
    if (filter !== "All") res = res.filter((p) => p.tags?.includes(filter));
    if (search) {
      const s = search.toLowerCase();
      res = res.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          (p.shortDesc ?? "").toLowerCase().includes(s) ||
          (p.longDesc ?? "").toLowerCase().includes(s) ||
          (p.role ?? "").toLowerCase().includes(s) ||
          p.tags?.some((t) => t.toLowerCase().includes(s))
      );
    }
    return res;
  }, [allProjects, filter, search]);

  // keyboard: focus search when pressing '/'
  const searchRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        const el = searchRef.current;
        if (el) {
          e.preventDefault();
          el.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="projects"
      className="py-16 px-4 md:px-12 bg-[var(--brand-bg)] transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="heading-lg mb-2">Projects</h2>
        <p className="text-body text-muted mb-10">
          Featured work & key projects from my career
        </p>

        {/* Search + Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-lg">
            <input
              ref={searchRef}
              id="project-search"
              type="text"
              aria-label="Search projects (press / to focus)"
              placeholder='Search projects by name, tech, or role... (press "/" to focus)'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input w-full pr-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-colors"
                type="button"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => {
              const count =
                t === "All"
                  ? allProjects.length
                  : allProjects.filter((p) => p.tags?.includes(t)).length;
              const isActive = filter === t;
              return (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  aria-pressed={isActive}
                  className={`badge cursor-pointer ${
                    isActive
                      ? "bg-[var(--brand-yellow)] text-[var(--brand-black)] border-[var(--brand-yellow)]"
                      : ""
                  }`}
                >
                  {t}
                  <span className="ml-1 opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live region for screen readers */}
        <div aria-live="polite" className="sr-only">
          {search
            ? `Showing ${filtered.length} results for "${search}"`
            : `Showing ${filtered.length} projects`}
        </div>

        {/* Projects Grid */}
        <motion.div
          id="projects-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <motion.div
                key={p.id}
                className="project-card-wrapper"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <ProjectCard project={p} onOpen={setActive} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-body text-muted mb-6">
                {search
                  ? `No projects found matching "${search}"`
                  : "No projects available"}
              </p>
              <div className="flex items-center justify-center gap-3">
                {search && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="btn btn-primary"
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={() => {
                    setFilter("All");
                    setSearchTerm("");
                  }}
                  className="btn btn-secondary"
                >
                  Show All Projects
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Modal */}
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  );
}
