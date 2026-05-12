"use client";

import { useEffect } from "react";

const LOADER_TIMEOUT_MS = 2000;

const finishInitialLoad = () => {
    const root = document.documentElement;
    root.classList.remove("app-loading");
    root.classList.add("app-loaded");
};

const isElementVisuallyRelevant = (element: Element) => {
    const rect = element.getBoundingClientRect();

    return rect.bottom > 0 && rect.top < window.innerHeight * 1.15;
};

const waitForImage = (image: HTMLImageElement) =>
    new Promise<void>((resolve) => {
        if (image.complete && image.naturalWidth > 0) {
            resolve();
            return;
        }

        const cleanup = () => {
            image.removeEventListener("load", handleDone);
            image.removeEventListener("error", handleDone);
        };

        const handleDone = () => {
            cleanup();
            resolve();
        };

        image.addEventListener("load", handleDone, { once: true });
        image.addEventListener("error", handleDone, { once: true });
    });

export default function InitialLoadGate() {
    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            const shell = document.getElementById("app-shell");

            if (!shell) {
                finishInitialLoad();
                return;
            }

            const images = Array.from(shell.querySelectorAll("img")).filter(isElementVisuallyRelevant);

            const timeoutPromise = new Promise<void>((resolve) => {
                window.setTimeout(resolve, LOADER_TIMEOUT_MS);
            });

            await Promise.race([
                Promise.all(images.map(waitForImage)).then(() => undefined),
                timeoutPromise,
            ]);

            if (!cancelled) {
                finishInitialLoad();
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, []);

    return null;
}
