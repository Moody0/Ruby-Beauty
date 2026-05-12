import Link from 'next/link';
import React from 'react';
import ThemeToggle from './ThemeToggle';
import HeaderSearch from './HeaderSearch';
import LanguageToggle from './LanguageToggle';
import CurrencyToggle from './CurrencyToggle';
import MobileMenu from './MobileMenu';
import CartTrigger from './CartTrigger';

interface HeaderCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
}

interface HeaderProps {
    initialCategories?: HeaderCategory[];
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
    language: 'en' | 'ar';
}

const Header = ({ initialCategories = [], t }: HeaderProps) => {
    return (
        <header className="sticky top-0 z-50 w-full bg-surface-light dark:bg-surface-dark border-b border-[#f4f0f2] dark:border-white/10 transition-all duration-300">
            <div className="container-custom py-4">
                <div className="flex items-center justify-between gap-4 relative">
                    {/* Left side: Mobile Menu (Ham + Search) on mobile, Logo on desktop */}
                    <div className="flex items-center gap-2 md:gap-4 h-10 z-10">
                        <MobileMenu initialCategories={initialCategories} />

                        <Link href="/" className="hidden md:flex items-center gap-2 md:gap-4 shrink-0 h-full">
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark sm:block leading-none">
                                {t('header.brandName')}
                            </h1>
                        </Link>
                    </div>

                    {/* Center Logo (Mobile only) */}
                    <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
                        <Link href="/" className="pointer-events-auto">
                            <h1 className="text-xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark leading-none">
                                {t('header.brandName')}
                            </h1>
                        </Link>
                    </div>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex max-w-md w-full mx-8">
                        <HeaderSearch />
                    </div>

                    {/* Navigation Links & Icons */}
                    <div className="flex items-center gap-2 md:gap-8 z-10">
                        <nav className="hidden lg:flex items-center gap-6">
                            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('common.shop')}</Link>
                            <Link href="/brands" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('common.brands')}</Link>
                            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('common.categories')}</Link>
                            <Link href="/about-us" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('common.about')}</Link>
                        </nav>
                        <div className="flex items-center gap-1 md:gap-2">
                            <CurrencyToggle />
                            <CartTrigger />
                            <div className="hidden md:flex items-center gap-1 md:gap-2">
                                <LanguageToggle />
                                <div className="block">
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
