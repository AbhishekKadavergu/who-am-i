import { useState, type JSX } from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "../data/projects";

export default function Projects(): JSX.Element {
  const allProjects = projectsData as Project[];

  const [active, setActive] = useState<Project | null>(null);

  const featuredProjects = allProjects.filter((p) => p.featured);
  const otherProjects = allProjects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="py-20 px-4 md:px-12 bg-[var(--brand-bg)] transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* Header */}
        <div className="mb-20">
          <h2 className="relative inline-block text-3xl md:text-4xl font-semibold tracking-tight text-[var(--brand-text)]">
            Projects
            <span
              className="
        absolute left-0 -bottom-3
        h-[2px] w-16
        bg-[var(--brand-orange)]
        rounded-full
      "
            />
          </h2>

          <p className="mt-8 text-base text-[var(--brand-muted)] max-w-2xl leading-relaxed">
            A selection of systems I’ve designed and shipped across frontend,
            and backend — with a focus on clarity, scalability, and long-term
            maintainability.
          </p>
        </div>

        {/* ===== Key Projects ===== */}
        <div className="mb-28">
          <h3 className="mb-12 flex items-center gap-4 text-sm uppercase tracking-wider text-[var(--brand-muted)]">
            <span className="h-px w-10 bg-[var(--brand-orange)]" />
            Key Projects
          </h3>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} featured onOpen={setActive} />
            ))}
          </motion.div>
        </div>

        {/* ===== Other Projects ===== */}
        <div>
          <h3 className="mb-10 text-sm uppercase tracking-wider text-[var(--brand-muted)]">
            Other Projects
          </h3>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {otherProjects.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setActive} />
            ))}
          </motion.div>
        </div>

        {/* Modal */}
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  );
}
