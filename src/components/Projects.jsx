import React from "react";

const projects = [
  { title: "Portfolio Website", description: "A personal portfolio built with React and Tailwind CSS.", link: "#" },
  { title: "E-commerce App", description: "A modern e-commerce platform with cart and payment integration.", link: "#" },
  { title: "Blog Platform", description: "A full-featured blog with markdown support and comments.", link: "#" },
];

const Projects = () => (
  <section id="projects" className="py-12 px-4 md:px-12 bg-primary-light dark:bg-primary-dark transition-colors duration-500 animate-fade-in-up">
    <h2 className="text-2xl font-bold text-center mb-8 text-text-light dark:text-text-dark">Projects</h2>
    <div className="grid gap-6 md:grid-cols-3">
      {projects.map((project, idx) => (
        <a key={idx} href={project.link} className="block p-6 rounded-lg shadow-lg bg-white dark:bg-black border-2 border-primary hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-2 text-primary">{project.title}</h3>
          <p className="text-text-light dark:text-text-dark">{project.description}</p>
        </a>
      ))}
    </div>
  </section>
);

export default Projects;
