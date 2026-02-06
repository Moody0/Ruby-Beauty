"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { useCart } from '@/app/context/CartContext';
import HeaderSearch from './HeaderSearch';

const Header = () => {
    const { cartCount } = useCart();
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile search or menu is open
    useEffect(() => {
        if (isMobileSearchOpen || isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileSearchOpen, isMobileMenuOpen]);

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${scrolled ? "bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-[#f4f0f2] dark:border-[#3a1d26]" : "bg-transparent border-transparent"}`}>
            <div className="px-6 py-4 md:px-20 lg:px-32 xl:px-48 2xl:px-64">
                <div className="flex items-center justify-between gap-4">
                    {/* Mobile Menu Toggle (Left) */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-2 -ml-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark"
                    >
                        <span className="material-symbols-outlined text-[24px]">menu</span>
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:gap-4 shrink-0">
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark sm:block">Ruby Beauty</h1>
                    </Link>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex max-w-md w-full mx-8">
                        <HeaderSearch />
                    </div>

                    {/* Navigation Links & Icons */}
                    <div className="flex items-center gap-2 md:gap-8">
                        <nav className="hidden lg:flex items-center gap-6">
                            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">Shop</Link>
                            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">About</Link>
                            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">Blog</Link>
                        </nav>
                        <div className="flex items-center gap-1 md:gap-2">
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
                            {/* Theme Toggle Visible on all screens */}
                            <div className="block">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed top-0 left-0 h-full w-[300px] bg-white dark:bg-background-dark border-r border-[#f4f0f2] dark:border-white/10 shadow-2xl transform transition-transform duration-300 ease-out animate-in slide-in-from-left flex flex-col">
                        <div className="h-24 px-6 flex items-center justify-between border-b border-[#f4f0f2] dark:border-white/5">
                            <span className="text-2xl font-bold text-text-main-light dark:text-white">RUBY BEAUTY</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-text-main-light dark:text-white text-3xl">close</span>
                            </button>
                        </div>

                        <nav className="flex flex-col gap-2 p-6">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-4 py-4 px-6 rounded-2xl transition-all border bg-primary/10 text-primary border-primary/20"
                            >
                                <span className="material-symbols-outlined text-2xl opacity-70">home</span>
                                <span className="text-xl font-medium">Home</span>
                            </Link>

                            <Link
                                href="/products"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-4 py-4 px-6 rounded-2xl transition-all border border-transparent text-text-main-light dark:text-white/90 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                            >
                                <span className="material-symbols-outlined text-2xl opacity-70">shopping_bag</span>
                                <span className="text-xl font-medium">Shop</span>
                            </Link>

                            <Link
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-4 py-4 px-6 rounded-2xl transition-all border border-transparent text-text-main-light dark:text-white/90 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                            >
                                <span className="material-symbols-outlined text-2xl opacity-70">info</span>
                                <span className="text-xl font-medium">About Us</span>
                            </Link>

                            <Link
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-4 py-4 px-6 rounded-2xl transition-all border border-transparent text-text-main-light dark:text-white/90 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                            >
                                <span className="material-symbols-outlined text-2xl opacity-70">article</span>
                                <span className="text-xl font-medium">Blog</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            )}

            {/* Mobile Search Overlay */}
            {isMobileSearchOpen && (
                <div className="fixed inset-0 z-50 bg-white dark:bg-background-dark md:hidden animate-in fade-in duration-200">
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
                            <p className="text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-white/40 mb-4"></p>
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