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

export const useProductRail = (dir: Direction) => {
    const railRef = useRef<HTMLDivElement | null>(null);
    const [scrollState, setScrollState] = useState({
        canScrollForward: false,
        canScrollBackward: false,
    });

    // We use a ref to track if we're currently animating to avoid sync conflicts
    const isAnimating = useRef(false);

    const syncScrollState = useCallback(() => {
        const rail = railRef.current;
        if (!rail) return;

        const { max, logical } = getScrollMetrics(rail, dir);

        setScrollState({
            canScrollBackward: logical > SCROLL_EPSILON,
            canScrollForward: logical < max - SCROLL_EPSILON,
        });
    }, [dir]);

    const scrollLogical = useCallback(
        (direction: "forward" | "backward") => {
            const rail = railRef.current;
            if (!rail || isAnimating.current) return;

            isAnimating.current = true;
            const amount = Math.max(rail.clientWidth * 0.85, 300);
            const { logical, max } = getScrollMetrics(rail, dir);
            const delta = direction === "forward" ? amount : -amount;

            const nextLogical = clamp(logical + delta, 0, max);
            const targetLeft = getTargetScrollLeft(rail, dir, nextLogical);

            rail.scrollTo({
                left: targetLeft,
                behavior: "smooth",
            });

            // Allow syncing once animation is roughly done
            setTimeout(() => {
                isAnimating.current = false;
                syncScrollState();
            }, 600);
        },
        [dir, syncScrollState]
    );

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;

        // Reset scroll position on dir/mount
        const resetTarget = getTargetScrollLeft(rail, dir, 0);
        rail.scrollTo({ left: resetTarget, behavior: "auto" });

        let timeoutId: NodeJS.Timeout;
        const handleScroll = () => {
            // Only sync immediately if not animating, otherwise debounce
            if (!isAnimating.current) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(syncScrollState, 50);
            }
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
            clearTimeout(timeoutId);
        };
    }, [dir, syncScrollState]);

    return {
        railRef,
        canScrollForward: scrollState.canScrollForward,
        canScrollBackward: scrollState.canScrollBackward,
        scrollForward: () => scrollLogical("forward"),
        scrollBackward: () => scrollLogical("backward"),
    };
};
