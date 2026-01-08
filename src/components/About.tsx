import React from "react";
import { motion } from "framer-motion";
import SKILLS from "../data/skills";

const About: React.FC = () => (
  <section
    id="about"
    className="py-16 px-4 md:px-12 bg-[var(--brand-bg)] transition-colors duration-500"
  >
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.img
          src="https://avatars.githubusercontent.com/u/59202659?v=4"
          alt="Abhishek Kadavergu"
          className="w-32 h-32 rounded-full shadow-xl border-4 border-[var(--brand-yellow)] mb-6 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <h1 className="text-4xl font-extrabold text-primary mb-2">
          Abhishek Kadavergu
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-2">
          Full-Stack Developer | JavaScript • TypeScript • React • Node • AWS
        </p>
        <span className="inline-block bg-primary text-black dark:bg-yellow-400 dark:text-gray-900 px-4 py-1 rounded-full font-semibold shadow-md">
          Bangalore, India
        </span>
      </motion.div>
    </div>

    {/* Who Am I? */}
    <motion.div
      className="max-w-2xl mx-auto bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-8 mb-10 text-left"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-yellow-400">
        <span role="img" aria-label="waving hand">
          👋
        </span>{" "}
        Who Am I?
      </h2>
      <p className="mb-3 text-lg text-gray-700 dark:text-gray-300">
        Hi — I’m <span className="font-bold">Abhishek Kadavergu</span>. I build
        practical software that helps teams move faster and reduces everyday
        friction. After completing my MCA I worked with Angular at{" "}
        <span className="font-bold">TCS</span> and later moved into full-stack
        roles where I design and ship reliable, maintainable systems.
      </p>

      <p className="mb-3 text-lg text-gray-700 dark:text-gray-300">
        Today I work at <span className="font-bold">Airbus</span>, contributing
        to microservices, micro frontends, and cloud-first solutions using
        Node.js, Angular, React, TypeScript, AWS and PostgreSQL. I focus on
        clear architecture and reusable tooling — small investments that pay off
        across teams.
      </p>

      <blockquote className="border-l-4 border-gray-400 dark:border-yellow-400 pl-4 italic text-gray-700 dark:text-yellow-300 mb-2">
        “I like building things that are simple, reliable, and useful.”
      </blockquote>
    </motion.div>

    {/* What I Do */}
    <motion.div
      className="max-w-2xl mx-auto bg-yellow-50 dark:bg-gray-900/50 backdrop-blur-sm border border-yellow-200 dark:border-gray-700 rounded-xl shadow-lg p-8 mb-10 text-left"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
        <span role="img" aria-label="laptop">
          💻
        </span>{" "}
        What I Do
      </h2>
      <ul className="list-disc list-inside mb-3 space-y-1 text-gray-800 dark:text-gray-300">
        <li>
          Build <span className="font-semibold">full-stack applications</span>{" "}
          with clear, maintainable architecture.
        </li>
        <li>Create workflows and automation that improve team efficiency.</li>
        <li>
          Design and deploy cloud solutions on{" "}
          <span className="font-semibold">AWS</span>.
        </li>
        <li>
          Build reusable libraries, shared components, and standards for large
          teams.
        </li>
        <li>
          Tools I use: <span className="font-bold">Node.js</span>,{" "}
          <span className="font-bold">React</span>,{" "}
          <span className="font-bold">Angular</span>,{" "}
          <span className="font-bold">TypeScript</span>.
        </li>
        <li>Currently improving on system design, cloud patterns, and DSA.</li>
      </ul>
    </motion.div>

    {/* Beyond the Resume */}
    <motion.div
      className="max-w-2xl mx-auto bg-blue-50 dark:bg-gray-900/50 backdrop-blur-sm border border-blue-200 dark:border-blue-700 rounded-xl shadow-lg p-8 mb-10 text-left"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-300">
        <span role="img" aria-label="seedling">
          🌱
        </span>{" "}
        Beyond the Resume
      </h2>
      <p className="mb-2 text-gray-800 dark:text-gray-300">
        I focus on routines that keep me effective and curious:
      </p>
      <ul className="list-disc list-inside mb-3 space-y-1 text-gray-800 dark:text-gray-300">
        <li>Mentoring new developers and sharing practical learnings.</li>
        <li>Staying active — gym, badminton, and cricket.</li>
        <li>
          Exploring architecture, cloud patterns, and algorithms in my free
          time.
        </li>
      </ul>
      <blockquote className="border-l-4 border-blue-400 dark:border-blue-700 pl-4 italic text-blue-700 dark:text-blue-200">
        “Consistency outside work helps me stay consistent inside work.”
      </blockquote>
    </motion.div>

    {/* Why This Site? */}
    <motion.div
      className="max-w-2xl mx-auto bg-green-50 dark:bg-gray-900/50 backdrop-blur-sm border border-green-200 dark:border-green-700 rounded-xl shadow-lg p-8 text-left mb-12"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-green-700 dark:text-green-300">
        <span role="img" aria-label="rocket">
          🚀
        </span>{" "}
        Why This Site?
      </h2>
      <ul className="list-disc list-inside mb-3 space-y-1 text-gray-800 dark:text-gray-300">
        <li>Show practical project work and the thinking behind it.</li>
        <li>Share skills and patterns I use to build reliable systems.</li>
        <li>Offer a straightforward view of who I am and how I work.</li>
      </ul>
      <p className="text-green-700 dark:text-green-200 font-semibold">
        If my approach resonates, I’d be glad to connect and collaborate.
      </p>
    </motion.div>

    {/* Skills */}
    <motion.div
      className="w-full py-10 px-6 bg-gradient-to-r from-white to-yellow-50 dark:from-gray-900/50 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl mt-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-yellow-400">
        Skills
      </h1>

      <div className="skills-marquee-viewport">
        <div className="skills-marquee-track">
          {/* original row */}
          {SKILLS.map((skill) => (
            <div key={skill.name} className="skill-pill">
              <div className="skill-pill-icon">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="skill-pill-label">{skill.name}</span>
            </div>
          ))}

          {/* duplicate row for seamless looping – not visually jarring, just continuity */}
          {SKILLS.map((skill) => (
            <div
              key={`${skill.name}-dup`}
              className="skill-pill"
              aria-hidden="true"
            >
              <div className="skill-pill-icon">
                <img
                  src={skill.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="skill-pill-label">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default About;
