import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/Portfolio-Image.jpg";

const About: React.FC = () => (
  <section id="about" className="py-20 px-4 md:px-12 bg-[var(--brand-bg)]">
    {/* Hero */}
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-32"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
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
            shadow-[0_30px_80px_rgba(0,0,0,0.6)]
          "
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Intro */}
      <div className="max-w-xl">
        <p className="text-lg leading-relaxed mb-6 text-[var(--brand-text)]">
          Hi — I’m{" "}
          <span className="font-semibold text-white">Abhishek Kadavergu</span>.
          I’m a software engineer who enjoys thinking beyond features — about
          how systems behave under load, change over time, and hold up in the
          real world.
        </p>

        <p className="text-lg leading-relaxed mb-6 text-[var(--brand-muted)]">
          I currently work at{" "}
          <span className="font-semibold text-white">Airbus</span>, building
          backend services and micro-frontends using Node.js, Angular, React,
          TypeScript, AWS, and PostgreSQL. I care deeply about clear
          architecture, sensible trade-offs, and building software that’s easy
          to reason about.
        </p>

        <blockquote className="border-l-2 border-[var(--brand-orange)] pl-5 italic text-[var(--brand-muted)]">
          I’m less interested in shipping fast — and more interested in building
          things that last.
        </blockquote>
      </div>
    </motion.div>

    {/* Perspective */}
    <motion.div
      className="relative max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[72px_1fr] gap-12">
        {/* Vertical spine */}
        <div className="hidden md:flex justify-center">
          <div className="w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        <div>
          {/* Intro */}
          <p className="text-xs uppercase tracking-wider text-[var(--brand-muted)] mb-16">
            How I think, what I care about, and how I grow
          </p>

          {/* Block helper */}
          {[
            {
              title: "Building systems that hold up under pressure",
              lead: (
                <>
                  I’m less interested in writing code and more interested in
                  understanding{" "}
                  <span className="font-semibold text-white">
                    why systems behave the way they do at scale.
                  </span>
                </>
              ),
              body: `I enjoy breaking down large products like Uber, Amazon, Netflix,
              Razorpay, PhonePe, and Google Pay — looking at how they handle
              traffic, failures, growth, and trade-offs. This curiosity pulled
              me toward system design, backend architecture, and building
              things meant to last.`,
            },
            {
              title: "Curious beyond the codebase",
              lead: (
                <>
                  I don’t chase hustle. I care about{" "}
                  <span className="font-semibold text-white">consistency.</span>
                </>
              ),
              body: `I stay active with badminton, table tennis, and regular workouts,
              and I enjoy watching cricket. I admire Kohli, Rohit, Dhoni, and
              Sachin — not just for skill, but for discipline, mindset, and
              longevity. Wildlife and nature documentaries remind me that
              systems exist everywhere — balance and sustainability matter.`,
            },
            {
              title: "Growing with intention",
              lead: `I try to design my life the same way I design systems — by shaping
              the environment instead of relying on motivation.`,
              body: `I build small systems that reduce friction: keeping gym
              clothes ready, removing distractions, and making learning
              material easy to reach. These decisions compound quietly. I
              apply the same thinking to my work — improving system design,
              practicing problem solving, and building routines for long-term
              growth. I value teams that ask why, not just how.`,
            },
          ].map((block, i) => (
            <div key={block.title} className={i !== 0 ? "mt-24" : ""}>
              <h3 className="group relative inline-block text-2xl font-semibold mb-4 text-[var(--brand-text)]">
                {block.title}
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

              <p className="text-xl mb-4 text-[var(--brand-text)]">
                {block.lead}
              </p>

              <p className="text-lg leading-relaxed text-[var(--brand-muted)]">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default About;
