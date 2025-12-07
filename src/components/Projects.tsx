import { useState, useMemo, useEffect } from "react";
import projectsData from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import useCarousel from "../hooks/useCarousel";
import type { Project } from "../data/projects";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const featured = (projectsData as Project[]).filter((p) => p.featured);
  const carousel = useCarousel({
    length: featured.length,
    autoPlayMs: 6000,
    initialIndex: 0,
  });

  // reset key / index when featured changes
  useEffect(() => {
    if (carousel.index >= featured.length) carousel.setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featured.length]);

  const tags = useMemo(() => {
    const t = new Set<string>();
    (projectsData as Project[]).forEach((p) =>
      p.tags?.forEach((tag) => t.add(tag))
    );
    return ["All", ...Array.from(t)];
  }, []);

  const filtered = useMemo(() => {
    let result = projectsData as Project[];
    if (filter !== "All")
      result = result.filter((p) => p.tags?.includes(filter));
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          (p.shortDesc ?? "").toLowerCase().includes(s) ||
          (p.longDesc ?? "").toLowerCase().includes(s) ||
          (p.role ?? "").toLowerCase().includes(s) ||
          p.tags?.some((t) => t.toLowerCase().includes(s))
      );
    }
    return result;
  }, [filter, search]);

  useEffect(() => {
    const id = setTimeout(() => setSearch(searchTerm.trim()), 300);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // --- NEW: blur focused element inside carousel when pointer leaves ---
  useEffect(() => {
    const el = carousel.containerRef?.current;
    if (!el) return;
    const onLeave = () => {
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl && el.contains(activeEl)) {
        activeEl.blur();
      }
    };
    el.addEventListener("mouseleave", onLeave);
    // also blur when a touchstart happens elsewhere (covers some mobile edge cases)
    const onDocTouch = (e: TouchEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl && el.contains(activeEl) && !el.contains(e.target as Node)) {
        activeEl.blur();
      }
    };
    document.addEventListener("touchstart", onDocTouch, { passive: true });

    return () => {
      el.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("touchstart", onDocTouch);
    };
  }, [carousel.containerRef]);

  return (
    <section
      id="projects"
      className="py-10 px-3 md:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        {/* ALL PROJECTS */}
        <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">
          All Projects
        </h3>

        <div className="mb-6">
          <input
            id="project-search"
            type="text"
            aria-label="Search projects"
            aria-controls="projects-grid"
            placeholder="Search projects by name, tech, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />
        </div>

        <div
          className="mb-6 flex gap-2 flex-wrap"
          role="list"
          aria-label="Project filters"
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              aria-pressed={filter === tag}
              aria-label={`Filter projects by ${tag}`}
              className={`px-3 py-1 rounded text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                filter === tag
                  ? "bg-primary text-black dark:text-gray-900"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="sr-only">
          {search
            ? `Showing ${filtered.length} results for ${search}`
            : `Showing ${filtered.length} projects`}
        </div>

        <div
          id="projects-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setActive} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {search
                  ? `No projects found matching "${search}"`
                  : "No projects available"}
              </p>
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSearchTerm("");
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-black rounded hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>

        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  );
}
