'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollAnimOptions {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

/**
 * Hook that returns a ref and visibility state.
 * Attach the ref to an element to detect when it enters the viewport.
 */
export function useScrollReveal(options: ScrollAnimOptions = {}) {
    const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, isVisible };
}

/**
 * Get a CSS transform+opacity style object for scroll-triggered entrance.
 */
export function getRevealStyle(
    isVisible: boolean,
    delay: number = 0,
    direction: 'up' | 'down' | 'left' | 'right' | 'scale' = 'up'
): React.CSSProperties {
    const transforms: Record<string, string> = {
        up: 'translateY(40px)',
        down: 'translateY(-40px)',
        left: 'translateX(40px)',
        right: 'translateX(-40px)',
        scale: 'scale(0.85)',
    };

    return {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) translateX(0) scale(1)' : transforms[direction],
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    };
}
