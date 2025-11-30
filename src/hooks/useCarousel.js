// src/hooks/useCarousel.js
import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useCarousel hook
 * @param {Object} options
 *  - length: number of items in carousel (required)
 *  - autoPlayMs: number | 0 (ms for autoplay, 0 to disable)
 *  - initialIndex: number (default 0)
 */
export default function useCarousel({ length = 0, autoPlayMs = 6000, initialIndex = 0 } = {}) {
    const [index, setIndex] = useState(() => Math.max(0, Math.min(initialIndex, Math.max(0, length - 1))));
    const containerRef = useRef(null);
    const autoRef = useRef(null);
    const touchStartX = useRef(null);

    // keep index valid when length changes
    useEffect(() => {
        if (index >= length) setIndex(0);
    }, [length]); // eslint-disable-line react-hooks/exhaustive-deps

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
        const onKey = (e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [length, next, prev]);

    // autoplay: start/stop and pause on hover/focus
    useEffect(() => {
        if (!autoPlayMs || length <= 1) return;
        const play = () => {
            clearInterval(autoRef.current);
            autoRef.current = setInterval(() => setIndex((i) => (i + 1) % length), autoPlayMs);
        };
        const stop = () => clearInterval(autoRef.current);

        play();
        const el = containerRef.current;
        if (!el) return;

        el.addEventListener('mouseenter', stop);
        el.addEventListener('mouseleave', play);
        el.addEventListener('focusin', stop);
        el.addEventListener('focusout', play);

        return () => {
            stop();
            el.removeEventListener('mouseenter', stop);
            el.removeEventListener('mouseleave', play);
            el.removeEventListener('focusin', stop);
            el.removeEventListener('focusout', play);
        };
    }, [autoPlayMs, length]); // eslint-disable-line react-hooks/exhaustive-deps

    // swipe support
    useEffect(() => {
        const el = containerRef.current;
        if (!el || length <= 1) return;

        const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
        const onTouchEnd = (e) => {
            const endX = e.changedTouches[0].clientX;
            const dist = endX - touchStartX.current;
            const threshold = 40;
            if (dist > threshold) prev();
            else if (dist < -threshold) next();
        };

        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchend', onTouchEnd);
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
