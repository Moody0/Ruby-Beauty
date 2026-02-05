import Link from 'next/link';
import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-[#f4f0f2] dark:border-[#3a1d26]">
            <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:gap-4 shrink-0">
                        <div className="text-primary size-8">
                            <span className="material-symbols-outlined text-3xl">spa</span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark hidden sm:block">Glow & Co.</h1>
                    </Link>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex max-w-md w-full mx-8">
                        <div className="relative w-full group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">search</span>
                            </div>
                            <input
                                aria-label="Search"
                                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-full leading-5 bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary/50 sm:text-sm transition-shadow"
                                placeholder="Search for serums, creams..."
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Navigation Links & Icons */}
                    <div className="flex items-center gap-4 md:gap-8">
                        <nav className="hidden lg:flex items-center gap-6">
                            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
                            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
                            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</Link>
                        </nav>
                        <div className="flex items-center gap-2">
                            {/* Mobile Search Toggle */}
                            <button className="md:hidden p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </button>
                            <button className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark relative group">
                                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                                <span className="absolute top-1 right-0.5 size-2 bg-primary rounded-full"></span>
                            </button>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;