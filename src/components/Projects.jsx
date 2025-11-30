// src/components/Projects.jsx
import React, { useState, useMemo, useEffect } from "react";
import projectsData from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import useCarousel from "../hooks/useCarousel";

// SVG chevrons
const ChevronLeft = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M12 15l-5-5 5-5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChevronRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M8 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Projects() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [featuredIdxResetKey, setFeaturedIdxResetKey] = useState(0);

  const featured = projectsData.filter((p) => p.featured);
  const carousel = useCarousel({
    length: featured.length,
    autoPlayMs: 6000,
    initialIndex: 0,
  });

  // reset key / index when featured changes
  useEffect(() => {
    setFeaturedIdxResetKey((k) => k + 1);
    if (carousel.index >= featured.length) carousel.setIndex(0);
  }, [featured.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const tags = useMemo(() => {
    const t = new Set();
    projectsData.forEach((p) => p.tags?.forEach((tag) => t.add(tag)));
    return ["All", ...Array.from(t)];
  }, []);

  const filtered = useMemo(() => {
    let result = projectsData;
    if (filter !== "All")
      result = result.filter((p) => p.tags?.includes(filter));
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.shortDesc.toLowerCase().includes(s) ||
          p.longDesc.toLowerCase().includes(s) ||
          p.role.toLowerCase().includes(s) ||
          p.tags?.some((t) => t.toLowerCase().includes(s))
      );
    }
    return result;
  }, [filter, search]);

  useEffect(() => {
    const id = setTimeout(() => setSearch(searchTerm.trim()), 300);
    return () => clearTimeout(id);
  }, [searchTerm]);

  const currentFeatured = featured[carousel.index];

  // --- NEW: blur focused element inside carousel when pointer leaves ---
  useEffect(() => {
    const el = carousel.containerRef?.current;
    if (!el) return;
    const onLeave = () => {
      const activeEl = document.activeElement;
      if (activeEl && el.contains(activeEl)) {
        activeEl.blur();
      }
    };
    el.addEventListener("mouseleave", onLeave);
    // also blur when a touchstart happens elsewhere (covers some mobile edge cases)
    const onDocTouch = (e) => {
      const activeEl = document.activeElement;
      if (activeEl && el.contains(activeEl) && !el.contains(e.target)) {
        activeEl.blur();
      }
    };
    document.addEventListener("touchstart", onDocTouch, { passive: true });

    return () => {
      el.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("touchstart", onDocTouch);
    };
  }, [carousel.containerRef]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      id="projects"
      className="py-10 px-3 md:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-text-light dark:text-text-dark">
          Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Featured work & key projects from my career
        </p>

        {featured.length > 0 && currentFeatured && (
          <div
            key={`featured-${featuredIdxResetKey}`}
            ref={carousel.containerRef}
            className="group mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects carousel"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-3 md:p-6 items-stretch">
              {/* IMAGE */}
              <div className="relative flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded h-56 md:h-80 overflow-hidden">
                {currentFeatured.images?.length ? (
                  <>
                    <img
                      src={currentFeatured.images[0]}
                      alt={currentFeatured.title}
                      className="w-full h-full object-contain object-center transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      width="1280"
                      height="720"
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-white dark:to-black opacity-20" />
                  </>
                ) : (
                  <div className="text-gray-400">Project Image</div>
                )}

                {/* FADE-IN overlay arrows (hidden, appear on hover or focus) */}
                {featured.length > 1 && (
                  <>
                    <button
                      onClick={carousel.prev}
                      onMouseUp={(e) => e.currentTarget.blur()}
                      onTouchEnd={(e) => e.currentTarget.blur()}
                      aria-label="Previous featured project"
                      className="
    absolute left-2 md:left-4 top-1/2 -translate-y-1/2
    text-white
    rounded-full p-2 md:p-3
    backdrop-blur-lg
    bg-white/10 dark:bg-white/5
    shadow-[0_4px_16px_rgb(0_0_0_/_0.25)]
    border border-white/20 dark:border-white/10

    opacity-0 -translate-x-2
    group-hover:opacity-100 group-hover:translate-x-0
    focus:opacity-100 focus:translate-x-0

    transition-all duration-350 ease-in-out
    hover:bg-white/20 dark:hover:bg-white/10
    hover:shadow-[0_6px_20px_rgb(0_0_0_/_0.35)]

    focus:outline-none focus:ring-2 focus:ring-primary
  "
                      style={{
                        WebkitBackdropFilter: "blur(12px)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                    </button>

                    <button
                      onClick={carousel.next}
                      onMouseUp={(e) => e.currentTarget.blur()}
                      onTouchEnd={(e) => e.currentTarget.blur()}
                      aria-label="Next featured project"
                      className="
    absolute right-2 md:right-4 top-1/2 -translate-y-1/2
    text-white
    rounded-full p-2 md:p-3
    backdrop-blur-lg
    bg-white/10 dark:bg-white/5
    shadow-[0_4px_16px_rgb(0_0_0_/_0.25)]
    border border-white/20 dark:border-white/10

    opacity-0 translate-x-2
    group-hover:opacity-100 group-hover:translate-x-0
    focus:opacity-100 focus:translate-x-0

    transition-all duration-350 ease-in-out
    hover:bg-white/20 dark:hover:bg-white/10
    hover:shadow-[0_6px_20px_rgb(0_0_0_/_0.35)]

    focus:outline-none focus:ring-2 focus:ring-primary
  "
                      style={{
                        WebkitBackdropFilter: "blur(12px)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary text-black dark:text-gray-900 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {currentFeatured.year}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-2 text-text-light dark:text-text-dark truncate"
                    title={currentFeatured.title}
                  >
                    {currentFeatured.title}
                  </h3>

                  <div className="relative mb-3">
                    <p className="text-gray-700 dark:text-gray-300 mb-0 line-clamp-3 pr-16">
                      {currentFeatured.longDesc}
                    </p>

                    {currentFeatured.longDesc.length > 180 && (
                      <button
                        type="button"
                        onClick={() => setActive(currentFeatured)}
                        className="absolute bottom-0 right-0 text-sm font-semibold underline bg-white dark:bg-gray-800 px-2 py-1 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label={`View more details about ${currentFeatured.title}`}
                      >
                        View more
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentFeatured.tags?.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActive(currentFeatured)}
                    className="flex-1 px-4 py-2 md:w-auto bg-primary text-black dark:text-gray-900 rounded font-semibold hover:opacity-95 transition"
                  >
                    View Details
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                      {carousel.index + 1} / {featured.length}
                    </div>

                    <div className="flex gap-2">
                      {featured.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => carousel.setIndex(i)}
                          aria-label={`Show featured ${i + 1}`}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === carousel.index
                              ? "bg-primary w-6"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sr-only" aria-live="polite">
              Showing featured {carousel.index + 1} of {featured.length}:{" "}
              {currentFeatured.title}
            </div>
          </div>
        )}

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
