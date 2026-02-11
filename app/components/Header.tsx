import Link from 'next/link';
import React from 'react';
import ThemeToggle from './ThemeToggle';
import HeaderSearch from './HeaderSearch';
import LanguageToggle from './LanguageToggle';
import { MdMenu, MdSearch, MdShoppingBag } from 'react-icons/md';
import MobileMenu from './MobileMenu';
import CartBadge from './CartBadge';

interface HeaderProps {
    initialCategories?: any[];
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
    language: 'en' | 'ar';
}

const Header = ({ initialCategories = [], t, dir, language }: HeaderProps) => {
    return (
        <header className="sticky top-0 z-50 w-full bg-surface-light dark:bg-surface-dark border-b border-[#f4f0f2] dark:border-white/10 transition-all duration-300">
            <div className="container-custom py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Menu Button & Logo (same line, centered) */}
                    <div className="flex items-center gap-4 h-10">
                        <MobileMenu initialCategories={initialCategories} />

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
                            <Link href="/cart" className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark relative group">
                                <MdShoppingBag className="text-[24px]" />
                                <CartBadge />
                            </Link>
                            <LanguageToggle />
                            <div className="block">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;