"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark border border-text-muted-light/10 text-text-main-light dark:text-text-main-dark">
                <span className="material-symbols-outlined text-[20px]!">light_mode</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark border border-text-muted-light/10 text-text-main-light dark:text-text-main-dark hover:scale-110 transition-transform cursor-pointer"
            aria-label="Toggle theme"
        >
            <span className="material-symbols-outlined text-[20px]!">
                {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
        </button>
    );
}
