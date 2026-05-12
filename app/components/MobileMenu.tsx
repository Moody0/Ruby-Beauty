"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdMenu, MdClose, MdHome, MdShoppingCart, MdCategory, MdExpandMore, MdInfo, MdSearch, MdStorefront } from 'react-icons/md';
import HeaderSearch from './HeaderSearch';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import CurrencyToggle from './CurrencyToggle';

interface MobileCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
}

interface MobileMenuProps {
    initialCategories: MobileCategory[];
}

const MobileMenu = ({ initialCategories }: MobileMenuProps) => {
    const { t, dir, language } = useLanguage();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [categories, setCategories] = useState<MobileCategory[]>(initialCategories);
    const [categorySearch, setCategorySearch] = useState('');
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    useEffect(() => {
        if (isMobileMenuOpen || isMobileSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen, isMobileSearchOpen]);

    useEffect(() => {
        if (initialCategories.length > 0) return;

        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories?limit=20');
                const data: MobileCategory[] = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();
    }, [initialCategories]);

    const filteredCategories = categories.filter((c) => {
        if (!categorySearch) return true;
        return c.name.toLowerCase().includes(categorySearch.toLowerCase());
    });

    return (
        <>
            <div className="flex items-center gap-2 md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-0 flex items-center justify-center w-10 h-10 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark"
                >
                    <MdMenu className="text-[24px]" />
                </button>
                <button
                    onClick={() => setIsMobileSearchOpen(true)}
                    className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark"
                >
                    <MdSearch className="text-[20px]" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Sidebar Container */}
                <div 
                    className={`fixed top-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} h-full w-[300px] bg-surface-light dark:bg-surface-dark border-${dir === 'rtl' ? 'l' : 'r'} border-[#f4f0f2] dark:border-white/10 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
                        isMobileMenuOpen 
                            ? 'translate-x-0' 
                            : (dir === 'rtl' ? 'translate-x-full' : '-translate-x-full')
                    }`}
                >
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

                        <Link
                            href="/brands"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-4 py-4 px-6 rounded-2xl transition-all border ${isActive('/brands') ? 'bg-primary/10 text-primary border-primary/20' : 'border-transparent text-text-main-light dark:text-white/90 hover:bg-primary/5 hover:text-primary hover:border-primary/20'}`}
                        >
                            <MdStorefront className="text-2xl opacity-70" />
                            <span className="text-xl font-medium">{t('common.brands')}</span>
                        </Link>

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

                        {isCategoriesExpanded && (
                            <div className="flex flex-col gap-2 pl-6">
                                <input
                                    type="search"
                                    value={categorySearch}
                                    onChange={(e) => setCategorySearch(e.target.value)}
                                    placeholder={t('common.search')}
                                    className="w-full mb-2 px-3 py-2 rounded-lg border border-[#eae6e8] dark:border-white/10 bg-white dark:bg-surface-dark"
                                />
                                {filteredCategories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/categories/${category.slug}`}
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

                    {/* Mobile Settings Row */}
                    <div className="border-t border-[#f4f0f2] dark:border-white/5 p-6 flex items-center justify-between mt-auto">
                        <CurrencyToggle />
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Mobile Search Overlay */}
            <div 
                className={`fixed inset-0 z-50 bg-white dark:bg-background-dark md:hidden transition-all duration-300 ${
                    isMobileSearchOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
            >
                <div className={`flex flex-col h-full transition-transform duration-300 ${
                    isMobileSearchOpen ? 'translate-y-0' : '-translate-y-4'
                }`}>
                    <div className="flex items-center justify-between p-4 border-b border-[#f4f0f2] dark:border-white/10">
                        <h2 className="text-lg font-bold">{t('common.search')}</h2>
                        <button
                            onClick={() => setIsMobileSearchOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <MdClose />
                        </button>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto">
                        <HeaderSearch
                            locale={language}
                            autoFocus
                            onSearchSelect={() => setIsMobileSearchOpen(false)}
                            placeholder={t('common.searchProducts')}
                        />
                        <div className="mt-8">
                            <p className="text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-white/40 mb-4">
                                {t('common.suggestions')}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { key: 'serum', labelKey: 'searchTags.serum' },
                                    { key: 'moisturizer', labelKey: 'searchTags.moisturizer' },
                                    { key: 'cleanser', labelKey: 'searchTags.cleanser' },
                                    { key: 'sunscreen', labelKey: 'searchTags.sunscreen' },
                                    { key: 'toner', labelKey: 'searchTags.toner' },
                                ].map((tag) => (
                                    <Link
                                        key={tag.key}
                                        href={`/products?search=${tag.key}`}
                                        onClick={() => setIsMobileSearchOpen(false)}
                                        className="px-4 py-2 bg-background-light dark:bg-white/5 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 rounded-full text-sm font-medium transition-all"
                                    >
                                        {t(tag.labelKey)}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
