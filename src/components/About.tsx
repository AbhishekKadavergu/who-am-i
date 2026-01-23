import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/Portfolio-Image.jpg";

const About: React.FC = () => (
  <section id="about" className="py-16 px-4 md:px-12 bg-[var(--brand-bg)]">
    {/* Hero */}
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Image */}
      <div className="relative">
        <motion.img
          src={profileImg}
          alt="Abhishek Kadavergu"
          className="
            w-full max-w-lg
            rounded-[2rem]
            object-cover
            shadow-[0_25px_60px_rgba(0,0,0,0.35)]
          "
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Intro */}
      <div className="max-w-xl">
        <p className="text-lg leading-relaxed mb-6 text-[var(--brand-text)]">
          Hi — I’m{" "}
          <span className="font-semibold text-white">Abhishek Kadavergu</span>.
          I’m a software engineer who enjoys looking beyond features — spending
          time understanding how things behave, evolve, and hold up once they’re
          out in the real world.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-[var(--brand-muted)]">
          I currently work at{" "}
          <span className="font-semibold text-white">Airbus</span>, building
          backend services and micro-frontends using Node.js, Angular, React,
          TypeScript, AWS, and PostgreSQL. What I enjoy most is the balance
          between building something useful today and making sure it still makes
          sense tomorrow.
        </p>

        <blockquote className="border-l-2 border-[var(--brand-orange)] pl-5 italic text-[var(--brand-muted)]">
          I’m interested in building things that quietly last.
        </blockquote>
      </div>
    </motion.div>

    {/* Perspective */}
    <motion.div
      className="relative max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-10">
        {/* Vertical spine */}
        <div className="hidden md:flex justify-center">
          <div className="w-px bg-gradient-to-b from-transparent via-[var(--brand-orange)]/50 to-transparent" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--brand-muted)] mb-14">
            A little more context
          </p>

          {/* Block 1 */}
          <div className="mb-10">
            <h3 className="group relative inline-block text-2xl font-semibold mb-4 text-white">
              How I approach engineering
              <span
                className="
                  absolute left-0 -bottom-1
                  h-[2px] w-0
                  bg-[var(--brand-orange)]
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </h3>

            <p className="text-lg leading-relaxed text-[var(--brand-muted)]">
              I’m drawn to understanding why systems behave the way they do —
              especially when they grow, slow down, or fail in unexpected ways.
              That curiosity naturally pulled me toward backend work, system
              design, and thinking about trade-offs rather than perfect answers.
            </p>
          </div>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Block 2 */}
          <div className="mb-10">
            <h3 className="group relative inline-block text-2xl font-semibold mb-4 text-white">
              Life outside the code editor
              <span
                className="
                  absolute left-0 -bottom-1
                  h-[2px] w-0
                  bg-[var(--brand-orange)]
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </h3>

            <p className="text-lg leading-relaxed text-[var(--brand-muted)]">
              Outside of work, I stay active with badminton, table tennis, and
              regular workouts, and I enjoy watching cricket. Sports have been a
              quiet teacher — consistency, discipline, and showing up matter
              more than short bursts of intensity.
            </p>

            <p className="text-lg leading-relaxed text-[var(--brand-muted)] mt-4">
              I also enjoy watching wildlife and nature documentaries. It’s
              something I find calming, and over time it’s shaped how I think
              about patience, balance, and long-term impact — without being loud
              about it.
            </p>
          </div>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Block 3 */}
          <div>
            <h3 className="group relative inline-block text-2xl font-semibold mb-4 text-white">
              Growing, slowly and intentionally
              <span
                className="
                  absolute left-0 -bottom-1
                  h-[2px] w-0
                  bg-[var(--brand-orange)]
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </h3>

            <p className="text-lg leading-relaxed text-[var(--brand-muted)]">
              Over time, I’ve learned to rely less on motivation and more on
              small systems — simple habits, reduced friction, and environments
              that make good choices easier. Whether it’s keeping gym clothes
              ready the night before, staying mindful about health, or being
              conscious of long-term impact, these things add up quietly.
            </p>

            <p className="text-lg leading-relaxed text-[var(--brand-muted)] mt-4">
              I try to carry the same mindset into my work — improving a little,
              staying curious, and building in a way that’s thoughtful rather
              than rushed.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default About;
