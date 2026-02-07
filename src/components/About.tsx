import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from "../assets/Portfolio-Image.jpg";
import { ABOUT_BLOCKS, INTRO_HTML } from "../data/aboutContent";

const About: React.FC = () => {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [contentMinHeight, setContentMinHeight] = useState<number | undefined>(
    undefined,
  );

  const BLOCK_DURATION = 12000; // 12 seconds per block
  const FADE_IN_DURATION = 600; // 0.6s fade in
  const READING_TIME = BLOCK_DURATION - FADE_IN_DURATION; // reading time after fade in

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const isPausedRef = useRef(isPaused);
  const isContentVisibleRef = useRef(isContentVisible);
  const measuringRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isContentVisibleRef.current = isContentVisible;
  }, [isContentVisible]);

  useLayoutEffect(() => {
    const measure = () => {
      if (!measuringRef.current || !contentWrapperRef.current) return;
      // ensure measuring width matches visible container
      const width = contentWrapperRef.current.clientWidth;
      measuringRef.current.style.width = `${width}px`;
      const blocks = Array.from(
        measuringRef.current.querySelectorAll<HTMLDivElement>(".measure-block"),
      );
      let max = 0;
      blocks.forEach((b) => {
        max = Math.max(max, b.offsetHeight);
      });
      if (max) setContentMinHeight(max);
    };

    measure();
    const onResize = () => setTimeout(measure, 120);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const loop = (ts: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = ts;
      const delta = ts - lastTimeRef.current;
      lastTimeRef.current = ts;

      if (!isPausedRef.current && isContentVisibleRef.current) {
        elapsedRef.current += delta;
        const pct = Math.min(100, (elapsedRef.current / READING_TIME) * 100);
        setProgress(pct);

        if (elapsedRef.current >= READING_TIME) {
          setCurrentBlockIndex((i) => (i + 1) % ABOUT_BLOCKS.length);
          elapsedRef.current = 0;
          setProgress(0);
          setIsContentVisible(false);
          setTimeout(() => setIsContentVisible(true), FADE_IN_DURATION);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
      elapsedRef.current = 0;
    };
    // intentionally no deps: RAF loop reads refs
  }, [READING_TIME]);

  const currentBlock = ABOUT_BLOCKS[currentBlockIndex];

  return (
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
        <div
          className="max-w-xl"
          dangerouslySetInnerHTML={{ __html: INTRO_HTML }}
        />
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

            <div
              ref={contentWrapperRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                minHeight: contentMinHeight
                  ? `${contentMinHeight}px`
                  : undefined,
              }}
            >
              {/* Rotating Block Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBlockIndex}
                  className="mb-10"
                  initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  <motion.h3
                    className="group relative inline-block text-2xl font-semibold mb-6 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {currentBlock.title}
                    <span
                      className="
                      absolute left-0 -bottom-1
                      h-[2px] w-0
                      bg-[var(--brand-orange)]
                      transition-all duration-300
                      group-hover:w-full
                    "
                    />
                  </motion.h3>

                  <div className="space-y-4">
                    {currentBlock.content.map((paragraph, idx) => (
                      <motion.p
                        key={idx}
                        className="text-lg leading-relaxed text-[var(--brand-muted)]"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.15 + idx * 0.1,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Premium Progress Bar */}
              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Track background */}
                <div className="relative h-0.5 bg-gradient-to-r from-[var(--brand-orange)]/10 via-[var(--brand-orange)]/5 to-transparent rounded-full overflow-hidden backdrop-blur-sm">
                  {/* Glow effect behind */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-orange)]/20 to-transparent blur-md" />

                  {/* Progress fill */}
                  <motion.div
                    className="relative h-full bg-gradient-to-r from-[var(--brand-orange)] via-[var(--brand-orange)]/90 to-[var(--brand-orange)]/50 rounded-full"
                    style={{
                      width: `${progress}%`,
                      boxShadow: `0 0 12px rgba(255, 140, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)`,
                    }}
                    transition={{ width: { duration: 0.1, ease: "linear" } }}
                  >
                    {/* Shine effect */}
                    <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    {/* Premium circular tip with sparkle */}
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(255,255,255,0.7) 40%, rgba(255,200,100,0.6))",
                        boxShadow: `
                          0 0 20px rgba(255,255,255,0.9),
                          0 0 12px rgba(255,140,0,0.7),
                          inset -1px -1px 2px rgba(0,0,0,0.3),
                          inset 2px 2px 3px rgba(255,255,255,0.8)
                        `,
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 20px rgba(255,255,255,0.9), 0 0 12px rgba(255,140,0,0.7), inset -1px -1px 2px rgba(0,0,0,0.3), inset 2px 2px 3px rgba(255,255,255,0.8)`,
                          `0 0 28px rgba(255,255,255,1), 0 0 16px rgba(255,140,0,0.9), inset -1px -1px 2px rgba(0,0,0,0.3), inset 2px 2px 3px rgba(255,255,255,1)`,
                          `0 0 20px rgba(255,255,255,0.9), 0 0 12px rgba(255,140,0,0.7), inset -1px -1px 2px rgba(0,0,0,0.3), inset 2px 2px 3px rgba(255,255,255,0.8)`,
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {/* Inner highlight sparkle */}
                      <div
                        className="absolute inset-1 rounded-full pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), transparent 70%)",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Counter and spacing */}
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs uppercase tracking-widest text-[var(--brand-orange)]/70 font-medium">
                    {currentBlockIndex + 1} of {ABOUT_BLOCKS.length}
                  </div>
                  <div className="flex gap-1.5">
                    {ABOUT_BLOCKS.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => {
                          setCurrentBlockIndex(idx);
                          setProgress(0);
                          elapsedRef.current = 0;
                        }}
                        className={`rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentBlockIndex
                            ? "h-1 w-7 bg-[var(--brand-orange)] shadow-[0_0_8px_rgba(255,140,0,0.6)]"
                            : "h-0.5 w-2 bg-[var(--brand-orange)]/20 hover:bg-[var(--brand-orange)]/40"
                        }`}
                        aria-label={`Go to block ${idx + 1}`}
                        whileHover={{ scale: 1.1 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Hidden measuring container for stable layout */}
            <div
              ref={measuringRef}
              style={{
                position: "absolute",
                visibility: "hidden",
                left: -9999,
                top: 0,
                pointerEvents: "none",
              }}
              aria-hidden
            >
              {ABOUT_BLOCKS.map((block, idx) => (
                <div key={idx} className="measure-block mb-10">
                  <h3 className="group relative inline-block text-2xl font-semibold mb-6 text-white">
                    {block.title}
                  </h3>
                  <div className="space-y-4">
                    {block.content.map((p, i) => (
                      <p
                        key={i}
                        className="text-lg leading-relaxed text-[var(--brand-muted)]"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
