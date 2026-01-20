import { useState, type JSX } from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project } from "../data/projects";

export default function Projects(): JSX.Element {
  const allProjects = projectsData as Project[];

  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="py-16 px-4 md:px-12 bg-[var(--brand-bg)] transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="heading-lg mb-2">Projects</h2>
        <p className="text-body text-muted mb-10">
          Key projects from my career
        </p>

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
          {allProjects.length > 0 &&
            allProjects.map((p) => (
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
            ))}
        </motion.div>

        {/* Modal */}
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  );
}
