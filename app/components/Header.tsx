"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { useCart } from '@/app/context/CartContext';
import { useLanguage } from '@/app/context/LanguageContext';
import HeaderSearch from './HeaderSearch';
import LanguageToggle from './LanguageToggle';
import { MdMenu, MdSearch, MdShoppingBag, MdClose, MdHome, MdShoppingCart, MdCategory, MdExpandMore, MdInfo } from 'react-icons/md';

const Header = () => {
    const pathname = usePathname();
    const { cartCount } = useCart();
    const { t, dir, language } = useLanguage();
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };
    const [categories, setCategories] = useState<any[]>([]);
    const [categorySearch, setCategorySearch] = useState('');
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

    useEffect(() => {
        if (isMobileSearchOpen || isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileSearchOpen, isMobileMenuOpen]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Limit to 20 categories for mobile menu to avoid loading hundreds
                const res = await fetch('/api/categories?limit=20');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const filteredCategories = categories.filter((c: any) => {
        if (!categorySearch) return true;
        return c.name.toLowerCase().includes(categorySearch.toLowerCase());
    });

    return (
        <header className="sticky top-0 z-50 w-full bg-surface-light dark:bg-surface-dark border-b border-[#f4f0f2] dark:border-white/10 transition-all duration-300">
            <div className="container-custom py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Menu Button & Logo (same line, centered) */}
                    <div className="flex items-center gap-4 h-10">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-0 flex items-center justify-center w-10 h-10 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark"
                        >
                            <MdMenu className="text-[24px]" />

                        </button>

                        <Link href="/" className="flex items-center gap-2 md:gap-4 shrink-0 h-full">
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark sm:block leading-none">
                                {t('header.brandName')}
                            </h1>
                        </Link>
                    </div>  
                    
                    

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex max-w-md w-full mx-8">
                        <HeaderSearch />
                    </div>

                    {/* Navigation Links & Icons */}
                    <div className="flex items-center gap-2 md:gap-8">
                        
                        
                        <nav className="hidden lg:flex items-center gap-6">
                            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('common.shop')}</Link>
                            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('common.categories')}</Link>
                            <Link href="/about-us" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('common.about')}</Link>
                        </nav>
                        <div className="flex items-center gap-1 md:gap-2">
                            {/* Mobile Search Toggle */}
                            <button
                                onClick={() => setIsMobileSearchOpen(true)}
                                className="md:hidden p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark"
                            >
                                <MdSearch className="text-[20px]" />
                            </button>
                            <Link href="/cart" className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark relative group">
                                <MdShoppingBag className="text-[24px]" />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-0.5 rtl:right-auto rtl:left-0.5 size-2 bg-primary rounded-full"></span>
                                )}
                            </Link>
                            <LanguageToggle />
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
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <div className={`fixed top-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} h-full w-[300px] bg-surface-light dark:bg-surface-dark border-${dir === 'rtl' ? 'l' : 'r'} border-[#f4f0f2] dark:border-white/10 shadow-2xl transform transition-transform duration-300 ease-out ${dir === 'rtl' ? 'animate-in slide-in-from-right' : 'animate-in slide-in-from-left'} flex flex-col`}>
                        <div className="h-24 px-6 flex items-center justify-between border-b border-[#f4f0f2] dark:border-white/5">
                            <span className="text-2xl font-bold text-text-main-light dark:text-white">{t('header.brandName').toUpperCase()}</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            >
                                <MdClose className="text-text-main-light dark:text-white text-3xl" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-2 p-6 flex-1 overflow-y-auto">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-4 py-4 px-6 rounded-2xl transition-all border ${isActive('/') ? 'bg-primary/10 text-primary border-primary/20' : 'border-transparent text-text-main-light dark:text-white/90 hover:bg-primary/5 hover:text-primary hover:border-primary/20'}`}
                            >
                                <MdHome className="text-2xl opacity-70" />
                                <span className="text-xl font-medium">{t('common.home')}</span>
                            </Link>
                            <Link
                                href="/products"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-4 py-4 px-6 rounded-2xl transition-all border ${isActive('/products') ? 'bg-primary/10 text-primary border-primary/20' : 'border-transparent text-text-main-light dark:text-white/90 hover:bg-primary/5 hover:text-primary hover:border-primary/20'}`}
                            >
                                <MdShoppingCart className="text-2xl opacity-70" />
                                <span className="text-xl font-medium">{t('common.shop')}</span>
                            </Link>

                            {/* Categories Button with Expand/Collapse */}
                            <button
                                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                                className="flex items-center justify-between gap-4 py-4 px-6 rounded-2xl transition-all border border-transparent text-text-main-light dark:text-white/90 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                            >
                                <div className="flex items-center gap-4">
                                    <MdCategory className="text-2xl opacity-70" />
                                    <span className="text-xl font-medium">{t('common.categories')}</span>
                                </div>
                                <MdExpandMore className={`transition-transform ${isCategoriesExpanded ? 'rotate-180' : ''}`} />
                            </button>
                            

                            {/* Expandable Categories List */}
                            {isCategoriesExpanded && (
                                <div className="flex flex-col gap-2 pl-6">
                                    <input
                                        type="search"
                                        value={categorySearch}
                                        onChange={(e) => setCategorySearch(e.target.value)}
                                        placeholder={t('common.search')}
                                        className="w-full mb-2 px-3 py-2 rounded-lg border border-[#eae6e8] dark:border-white/10 bg-white dark:bg-surface-dark"
                                    />
                                    {filteredCategories.map((category: any) => (
                                        <Link
                                            key={category.id}
                                            href={`/products?category=${category.name}`}
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setIsCategoriesExpanded(false);
                                            }}
                                            className="py-3 px-4 rounded-xl transition-all border border-transparent text-text-main-light dark:text-white/80 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}

                                    <Link
                                        href="/categories"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="mt-2 text-sm text-primary font-medium"
                                    >
                                        {t('common.viewAllCategories') || 'View all categories'}
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/about-us"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-4 py-4 px-6 rounded-2xl transition-all border text-text-main-light dark:text-white/90 ${
                                    isActive('/about-us')
                                        ? 'bg-primary/10 text-primary border-primary/20'
                                        : 'border-transparent hover:bg-primary/5 hover:text-primary hover:border-primary/20'
                                }`}
                            >
                                <MdInfo className="text-2xl opacity-70" />
                                <span className="text-xl font-medium">{t('common.aboutUs')}</span>
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
                            <h2 className="text-lg font-bold">{t('common.search')}</h2>
                            <button
                                onClick={() => setIsMobileSearchOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                            >
                                <MdClose />
                            </button>
                        </div>
                        <div className="p-4">
                            <HeaderSearch
                                locale={language}
                                autoFocus
                                onSearchSelect={() => setIsMobileSearchOpen(false)}
                                placeholder={t('common.searchProducts')}
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto p-4" key={language}>
                            <p className="text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-white/40 mb-4">
                                {t('common.suggestions')}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { key: 'serum', labelKey: 'searchTags.serum' },
                                    { key: 'moisturizer', labelKey: 'searchTags.moisturizer' },
                                    { key: 'cleanser', labelKey: 'searchTags.cleanser' },
                                    { key: 'sunscreen', labelKey: 'searchTags.sunscreen' }
                                ].map((tag) => (
                                    <button
                                        key={tag.key}
                                        onClick={() => {
                                            // Handle tag click if needed, for now just placeholder
                                        }}
                                        className="px-4 py-2 bg-background-light dark:bg-white/5 rounded-full text-sm font-medium hover:text-primary transition-colors"
                                    >
                                        {t(tag.labelKey)}
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