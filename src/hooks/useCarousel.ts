import { useEffect, useRef, useState, useCallback } from "react";

type Options = {
  length?: number;
  autoPlayMs?: number;
  initialIndex?: number;
};

export default function useCarousel({
  length = 0,
  autoPlayMs = 6000,
  initialIndex = 0,
}: Options = {}) {
  const boundedInitial = Math.max(
    0,
    Math.min(initialIndex, Math.max(0, length - 1))
  );
  const [index, setIndex] = useState<number>(boundedInitial);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // keep index valid when length changes
  useEffect(() => {
    if (index >= length) setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  const next = useCallback(() => {
    if (length <= 1) return;
    setIndex((i) => (i + 1) % length);
  }, [length]);

  const prev = useCallback(() => {
    if (length <= 1) return;
    setIndex((i) => (i - 1 + length) % length);
  }, [length]);

  // keyboard nav
  useEffect(() => {
    if (length <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [length, next, prev]);

  // autoplay: start/stop and pause on hover/focus
  useEffect(() => {
    if (!autoPlayMs || length <= 1) return;
    const play = () => {
      if (autoRef.current) window.clearInterval(autoRef.current);
      autoRef.current = window.setInterval(
        () => setIndex((i) => (i + 1) % length),
        autoPlayMs
      );
    };
    const stop = () => {
      if (autoRef.current) {
        window.clearInterval(autoRef.current);
        autoRef.current = null;
      }
    };

    play();
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", play);
    el.addEventListener("focusin", stop);
    el.addEventListener("focusout", play);

    return () => {
      stop();
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", play);
      el.removeEventListener("focusin", stop);
      el.removeEventListener("focusout", play);
    };
  }, [autoPlayMs, length]);

  // swipe support
  useEffect(() => {
    const el = containerRef.current;
    if (!el || length <= 1) return;

    // Keep handlers strongly typed as TouchEvent
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      return 0;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const dist = endX - (touchStartX.current ?? endX);
      const threshold = 40;
      if (dist > threshold) prev();
      else if (dist < -threshold) next();
      return 0;
    };

    // Cast to unknown first to satisfy TypeScript's DOM typings
    el.addEventListener(
      "touchstart",
      onTouchStart as unknown as EventListener,
      { passive: true }
    );
    el.addEventListener("touchend", onTouchEnd as unknown as EventListener, {
      passive: true,
    });

    return () => {
      el.removeEventListener(
        "touchstart",
        onTouchStart as unknown as EventListener
      );
      el.removeEventListener(
        "touchend",
        onTouchEnd as unknown as EventListener
      );
    };
  }, [length, next, prev]);

  return {
    index,
    setIndex,
    next,
    prev,
    containerRef,
  };
}
