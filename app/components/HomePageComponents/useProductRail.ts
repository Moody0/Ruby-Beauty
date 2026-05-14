"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "ltr" | "rtl";

const SCROLL_EPSILON = 4;

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const getScrollMetrics = (element: HTMLDivElement, dir: Direction) => {
    const scrollWidth = element.scrollWidth;
    const clientWidth = element.clientWidth;
    const max = Math.max(0, scrollWidth - clientWidth);

    if (max <= 0) {
        return { max, logical: 0 };
    }

    if (dir === "rtl") {
        // In modern browsers, scrollLeft is 0 at the right edge and becomes negative as you scroll left.
        // Some older browsers might use a different system, but absolute value covers most cases.
        const logical = Math.abs(element.scrollLeft);
        return {
            max,
            logical: clamp(logical, 0, max),
        };
    }

    return {
        max,
        logical: clamp(element.scrollLeft, 0, max),
    };
};

const getTargetScrollLeft = (element: HTMLDivElement, dir: Direction, logical: number) => {
    const max = Math.max(0, element.scrollWidth - element.clientWidth);
    const clampedLogical = clamp(logical, 0, max);

    if (dir === "rtl") {
        // To scroll left, we need negative scrollLeft in modern browsers.
        return -clampedLogical;
    }

    return clampedLogical;
};

export const useProductRail = (dir: Direction, scrollStep?: number) => {
    const railRef = useRef<HTMLDivElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    
    const [scrollState, setScrollState] = useState({
        canScrollForward: false,
        canScrollBackward: false,
    });

    const isAnimating = useRef(false);

    const syncScrollState = useCallback(() => {
        const rail = railRef.current;
        if (!rail) return;

        const { max, logical } = getScrollMetrics(rail, dir);

        setScrollState((prev) => {
            const canScrollBackward = logical > SCROLL_EPSILON;
            const canScrollForward = logical < max - SCROLL_EPSILON;
            
            if (prev.canScrollBackward !== canScrollBackward || prev.canScrollForward !== canScrollForward) {
                return { canScrollBackward, canScrollForward };
            }
            return prev;
        });

        if (progressBarRef.current) {
            const progress = max > 0 ? clamp(logical / max, 0, 1) : 1;
            progressBarRef.current.style.transform = `scaleX(${progress})`;
        }
    }, [dir]);

    const scrollLogical = useCallback(
        (direction: "forward" | "backward") => {
            const rail = railRef.current;
            if (!rail || isAnimating.current) return;

            const { logical, max } = getScrollMetrics(rail, dir);
            const firstChild = rail.firstElementChild?.firstElementChild as HTMLElement;
            const gap = parseFloat(getComputedStyle(rail.firstElementChild as HTMLElement).gap) || 0;
            const itemWidth = firstChild ? firstChild.offsetWidth + gap : 320;
            const amount = scrollStep ?? itemWidth;
            const delta = direction === "forward" ? amount : -amount;

            const nextLogical = clamp(logical + delta, 0, max);
            
            if (nextLogical === logical) return;

            isAnimating.current = true;

            const targetLeft = getTargetScrollLeft(rail, dir, nextLogical);
            rail.scrollTo({
                left: targetLeft,
                behavior: "smooth",
            });

            setTimeout(() => {
                isAnimating.current = false;
                syncScrollState();
            }, 500);
        },
        [dir, syncScrollState, scrollStep]
    );

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;

        const resetTarget = getTargetScrollLeft(rail, dir, 0);
        rail.scrollTo({ left: resetTarget, behavior: "auto" });

        let rafId: number;
        const handleScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(syncScrollState);
        };

        const handleResize = () => syncScrollState();

        syncScrollState();

        rail.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(rail);

        return () => {
            rail.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
            cancelAnimationFrame(rafId);
        };
    }, [dir, syncScrollState]);

    return {
        railRef,
        progressBarRef,
        canScrollForward: scrollState.canScrollForward,
        canScrollBackward: scrollState.canScrollBackward,
        scrollForward: () => scrollLogical("forward"),
        scrollBackward: () => scrollLogical("backward"),
    };
};
