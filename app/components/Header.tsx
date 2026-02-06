"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { useCart } from '@/app/context/CartContext';
import HeaderSearch from './HeaderSearch';

const Header = () => {
    const { cartCount } = useCart();
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    // Prevent scrolling when mobile search is open
    useEffect(() => {
        if (isMobileSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileSearchOpen]);

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
                        <HeaderSearch />
                    </div>

                    {/* Navigation Links & Icons */}
                    <div className="flex items-center gap-4 md:gap-8">
                        <nav className="hidden lg:flex items-center gap-6">
                            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">Shop</Link>
                            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">About</Link>
                            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">Blog</Link>
                        </nav>
                        <div className="flex items-center gap-2">
                            {/* Mobile Search Toggle */}
                            <button
                                onClick={() => setIsMobileSearchOpen(true)}
                                className="md:hidden p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark"
                            >
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </button>
                            <Link href="/cart" className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark relative group">
                                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-0.5 size-2 bg-primary rounded-full"></span>
                                )}
                            </Link>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {isMobileSearchOpen && (
                <div className="fixed inset-0 z-60 bg-white dark:bg-background-dark md:hidden animate-in fade-in duration-200">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 border-b border-[#f4f0f2] dark:border-white/10">
                            <h2 className="text-lg font-bold">Search</h2>
                            <button
                                onClick={() => setIsMobileSearchOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-4">
                            <HeaderSearch
                                autoFocus
                                onSearchSelect={() => setIsMobileSearchOpen(false)}
                                placeholder="Search products..."
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-white/40 mb-4">Popular Searches</p>
                            <div className="flex flex-wrap gap-2">
                                {['Serum', 'Moisturizer', 'Cleanser', 'Sunscreen'].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            // Handle tag click if needed, for now just placeholder
                                        }}
                                        className="px-4 py-2 bg-background-light dark:bg-white/5 rounded-full text-sm font-medium hover:text-primary transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;