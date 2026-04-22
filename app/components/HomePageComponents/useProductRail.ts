"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "ltr" | "rtl";

const SCROLL_EPSILON = 4;

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const getScrollMetrics = (element: HTMLDivElement, dir: Direction) => {
    const max = Math.max(0, element.scrollWidth - element.clientWidth);

    if (max <= 0) {
        return { max, logical: 0 };
    }

    if (dir === "rtl") {
        const raw = element.scrollLeft;
        const logical = raw < 0 ? Math.abs(raw) : max - raw;
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
    const { max } = getScrollMetrics(element, dir);
    const clampedLogical = clamp(logical, 0, max);

    if (dir === "rtl") {
        return element.scrollLeft < 0 ? -clampedLogical : max - clampedLogical;
    }

    return clampedLogical;
};

export const useProductRail = (dir: Direction) => {
    const railRef = useRef<HTMLDivElement | null>(null);
    const [scrollState, setScrollState] = useState({
        canScrollLeft: false,
        canScrollRight: false,
    });

    const syncScrollState = useCallback(() => {
        const rail = railRef.current;

        if (!rail) {
            return;
        }

        const { max, logical } = getScrollMetrics(rail, dir);

        if (dir === "rtl") {
            setScrollState({
                canScrollLeft: logical < max - SCROLL_EPSILON,
                canScrollRight: logical > SCROLL_EPSILON,
            });
            return;
        }

        setScrollState({
            canScrollLeft: logical > SCROLL_EPSILON,
            canScrollRight: logical < max - SCROLL_EPSILON,
        });
    }, [dir]);

    const scrollVisual = useCallback(
        (direction: "left" | "right") => {
            const rail = railRef.current;

            if (!rail) {
                return;
            }

            const amount = Math.max(rail.clientWidth * 0.82, 320);
            const { logical, max } = getScrollMetrics(rail, dir);
            const delta =
                dir === "rtl"
                    ? direction === "left"
                        ? amount
                        : -amount
                    : direction === "left"
                        ? -amount
                        : amount;

            const nextLogical = clamp(logical + delta, 0, max);
            const targetLeft = getTargetScrollLeft(rail, dir, nextLogical);

            rail.scrollTo({
                left: targetLeft,
                behavior: "smooth",
            });
        },
        [dir]
    );

    useEffect(() => {
        const rail = railRef.current;

        if (!rail) {
            return;
        }

        const resetTarget = getTargetScrollLeft(rail, dir, 0);
        rail.scrollTo({ left: resetTarget, behavior: "auto" });

        const handleScroll = () => syncScrollState();
        const handleResize = () => syncScrollState();

        handleScroll();

        rail.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(rail);

        if (rail.firstElementChild instanceof HTMLElement) {
            resizeObserver.observe(rail.firstElementChild);
        }

        return () => {
            rail.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
        };
    }, [dir, syncScrollState]);

    return {
        railRef,
        canScrollLeft: scrollState.canScrollLeft,
        canScrollRight: scrollState.canScrollRight,
        scrollLeft: () => scrollVisual("left"),
        scrollRight: () => scrollVisual("right"),
    };
};
