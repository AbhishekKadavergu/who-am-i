import React, { useState, useMemo, useEffect } from 'react';
import projectsData from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState(''); // debounced value
  const [featuredIdx, setFeaturedIdx] = useState(0);

  const tags = useMemo(() => {
    const t = new Set();
    projectsData.forEach(p => p.tags?.forEach(tag => t.add(tag)));
    return ['All', ...Array.from(t)];
  }, []);

  const filtered = useMemo(() => {
    let result = projectsData;
    
    // Filter by tag
    if (filter !== 'All') {
      result = result.filter(p => p.tags?.includes(filter));
    }
    
    // Filter by search term (debounced)
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.shortDesc.toLowerCase().includes(searchLower) ||
        p.longDesc.toLowerCase().includes(searchLower) ||
        p.role.toLowerCase().includes(searchLower) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return result;
  }, [filter, search]);

  // debounce searchTerm -> search (300ms)
  useEffect(() => {
    const id = setTimeout(() => setSearch(searchTerm.trim()), 300);
    return () => clearTimeout(id);
  }, [searchTerm]);

  const featured = projectsData.filter(p => p.featured);

  const currentFeatured = featured[featuredIdx];

  const nextFeatured = () => {
    if (featured.length <= 1) return;
    setFeaturedIdx((prev) => (prev + 1) % featured.length);
  };

  const prevFeatured = () => {
    if (featured.length <= 1) return;
    setFeaturedIdx((prev) => (prev - 1 + featured.length) % featured.length);
  };

  // Keyboard navigation for featured carousel (left/right)
  React.useEffect(() => {
    if (featured.length <= 1) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') nextFeatured();
      if (e.key === 'ArrowLeft') prevFeatured();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [featured.length]);

  return (
    <section id="projects" className="py-12 px-4 md:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-text-light dark:text-text-dark">Projects</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Featured work & key projects from my career</p>

        {featured.length > 0 && currentFeatured && (
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
              <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded h-64">
                {currentFeatured.images && currentFeatured.images.length > 0 ? (
                  <img src={currentFeatured.images[0]} alt={currentFeatured.title} className="object-contain h-56" loading="lazy" width="720" height="360" />
                ) : (
                  <div className="text-gray-400">Project Image</div>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary text-black dark:text-gray-900 rounded-full text-xs font-semibold">Featured</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{currentFeatured.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-text-light dark:text-text-dark">{currentFeatured.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{currentFeatured.longDesc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentFeatured.tags?.slice(0, 5).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setActive(currentFeatured)} className="flex-1 px-4 py-2 bg-primary text-black dark:text-gray-900 rounded font-semibold hover:opacity-90">View Details</button>
                  {featured.length > 1 && (
                    <div className="flex gap-2">
                      <button onClick={prevFeatured} aria-label="Previous featured project" className="px-3 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">←</button>
                      <button onClick={nextFeatured} aria-label="Next featured project" className="px-3 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">→</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {featured.length > 1 && (
              <div className="flex justify-center gap-2 px-6 pb-4">
                {featured.map((_, i) => (
                  <button key={i} onClick={() => setFeaturedIdx(i)} aria-label={`Show featured ${i+1}`} className={`w-2 h-2 rounded-full transition-all ${i === featuredIdx ? 'bg-primary w-6' : 'bg-gray-300 dark:bg-gray-600'}`} />
                ))}
              </div>
            )}
          </div>
        )}

        <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">All Projects</h3>
        
        {/* Search Box */}
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

        {/* Tag Filters */}
        <div className="mb-6 flex gap-2 flex-wrap" role="list" aria-label="Project filters">
          {tags.map(tag => (
            <button 
              key={tag} 
              onClick={() => setFilter(tag)} 
              aria-pressed={filter===tag}
              aria-label={`Filter projects by ${tag}`}
              className={`px-3 py-1 rounded text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${filter===tag ? 'bg-primary text-black dark:text-gray-900' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Announce results for screen readers */}
        <div aria-live="polite" className="sr-only">
          {search ? `Showing ${filtered.length} results for ${search}` : `Showing ${filtered.length} projects`}
        </div>

        <div id="projects-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map(p => (
              <ProjectCard key={p.id} project={p} onOpen={setActive} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {search ? `No projects found matching "${search}"` : 'No projects available'}
              </p>
              {search && (
                <button
                  onClick={() => { setSearch(''); setSearchTerm(''); }}
                  className="mt-4 px-4 py-2 bg-primary text-black rounded hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>

        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </div>
    </section>
  );
}
