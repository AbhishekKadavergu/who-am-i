import React from "react";
import { motion } from "framer-motion";
import SKILLS from "../data/skills";

const Skills: React.FC = () => {
  return (
    <motion.section
      className="w-full px-4 py-24 bg-[var(--brand-bg)]"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="group relative inline-block text-3xl md:text-4xl font-semibold tracking-tight text-[var(--brand-text)]">
          Skills
          {/* underline */}
          <span
            className="
        absolute left-1/2 -bottom-3
        h-[2px] w-10
        -translate-x-1/2
        bg-[var(--brand-orange)]
        rounded-full
        transition-all duration-300
        group-hover:w-16
      "
          />
          {/* soft glow */}
          <span
            className="
        absolute left-1/2 -bottom-3
        h-[2px] w-10
        -translate-x-1/2
        bg-[var(--brand-orange)]
        blur-md
        opacity-30
        pointer-events-none
      "
          />
        </h2>

        <p className="mt-6 text-sm text-[var(--brand-muted)] max-w-md mx-auto">
          Tools I use to build things.
        </p>
      </div>

      {/* Marquee */}
      <div className="skills-marquee-viewport">
        <div className="skills-marquee-track">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="skill-pill group">
              <div className="skill-pill-icon">
                <img src={skill.icon} alt={skill.name} width={28} height={28} />
              </div>
              <span className="skill-pill-label">{skill.name}</span>

              {/* hover glow */}
              <span className="skill-pill-glow" />
            </div>
          ))}

          {/* duplicate row */}
          {SKILLS.map((skill) => (
            <div
              key={`${skill.name}-dup`}
              className="skill-pill group"
              aria-hidden="true"
            >
              <div className="skill-pill-icon">
                <img src={skill.icon} alt="" width={28} height={28} />
              </div>
              <span className="skill-pill-label">{skill.name}</span>
              <span className="skill-pill-glow" />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
