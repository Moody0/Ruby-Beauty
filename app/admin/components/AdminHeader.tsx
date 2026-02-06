"use client";

import { useState } from "react";

interface AdminHeaderProps {
    title: string;
    onMenuClick: () => void;
}

export default function AdminHeader({ title, onMenuClick }: AdminHeaderProps) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-[#e6dbdf] dark:border-gray-700 bg-surface-light dark:bg-surface-dark px-4 md:px-8 py-4 z-10">
            <div className="flex items-center gap-4 text-text-main dark:text-white">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-text-main dark:text-white hover:bg-background-light dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <h2 className="text-lg md:text-xl font-bold leading-tight tracking-tight">{title}</h2>
            </div>
            <div className="flex flex-1 justify-end gap-3 md:gap-6 items-center">
            </div>
        </header>
    );
}
