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
                {/* Search Bar */}
                <div className="hidden md:flex relative w-full max-w-sm">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-sub dark:text-gray-400">
                        <span className="material-symbols-outlined">search</span>
                    </span>
                    <input
                        className="w-full py-2.5 pl-10 pr-4 text-sm text-text-main dark:text-white bg-background-light dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-gray-700 transition-all placeholder:text-text-sub dark:placeholder:text-gray-500 outline-none"
                        placeholder="Search orders, products..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Mobile Search Button */}
                    <button className="md:hidden flex items-center justify-center size-10 rounded-full hover:bg-background-light dark:hover:bg-gray-800 text-text-main dark:text-white transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <button className="relative flex items-center justify-center size-10 rounded-full hover:bg-background-light dark:hover:bg-gray-800 text-text-main dark:text-white transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-surface-light dark:border-surface-dark"></span>
                    </button>
                    <button className="hidden md:flex items-center justify-center size-10 rounded-full hover:bg-background-light dark:hover:bg-gray-800 text-text-main dark:text-white transition-colors">
                        <span className="material-symbols-outlined">help</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
