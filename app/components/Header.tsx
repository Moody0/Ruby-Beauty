'use client';

import Link from 'next/link';
import React from 'react';
import { MdSearch, MdOutlineShoppingBag, MdFavoriteBorder, MdPersonOutline, MdMenu } from 'react-icons/md';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCart } from '@/app/context/CartContext';
import HeaderSearch from './HeaderSearch';
import MobileMenu from './MobileMenu';
import CartTrigger from './CartTrigger';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import CurrencyToggle from './CurrencyToggle';

interface HeaderCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
}

interface HeaderProps {
    initialCategories?: HeaderCategory[];
    dir: 'ltr' | 'rtl';
    language: 'en' | 'ar';
}

const Header = ({ initialCategories = [], dir }: HeaderProps) => {
    const { t } = useLanguage();
    const { totalItems } = useCart();
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [manualToggle, setManualToggle] = React.useState(false);
    const isNavVisible = !isScrolled || manualToggle;
    const isScrolledRef = React.useRef(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100 && !isScrolledRef.current) {
                isScrolledRef.current = true;
                setIsScrolled(true);
            } else if (window.scrollY < 60 && isScrolledRef.current) {
                isScrolledRef.current = false;
                setIsScrolled(false);
                setManualToggle(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-surface-dark border-b border-[#f4f0f2] dark:border-white/10 transition-all duration-300">
            <div className="container-custom">
                {/* Main Header Row */}
                <div className="py-4 relative">
                    {/* Desktop Version */}
                    <div className="hidden md:flex items-center justify-between">
                        {/* Left: Toggles and Cart */}
                        <div className="flex items-center gap-3 md:gap-5 w-1/3">
                            <div className="flex items-center gap-1">
                                <LanguageToggle />
                                <CurrencyToggle />
                            </div>
                            <div className="relative">
                                <Link href="/cart" className="text-2xl text-text-main-light dark:text-white hover:text-primary transition-colors">
                                    <MdOutlineShoppingBag />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                            </div>
                            <Link href="/products?favorites=true" className="text-2xl text-text-main-light dark:text-white hover:text-primary transition-colors hidden sm:block">
                                <MdFavoriteBorder />
                            </Link>
                        </div>

                        {/* Center: Logo */}
                        <div className="flex justify-center w-1/3">
                            <Link href="/" className="flex flex-col items-center">
                                <span className="text-2xl md:text-3xl font-bold tracking-tight text-text-main-light dark:text-white">
                                    Ruby Beauty
                                </span>
                                <span className="text-[10px] text-text-muted-light dark:text-text-muted-dark tracking-[0.2em] font-medium uppercase mt-[-4px]">
                                    {dir === 'rtl' ? 'جمالك يليق بك' : 'Your beauty deserves it'}
                                </span>
                            </Link>
                        </div>

                        {/* Right: Search, Profile, Menu */}
                        <div className="flex items-center justify-end gap-3 md:gap-5 w-1/3">
                            <Link href="/about-us" className="text-2xl text-text-main-light dark:text-white hover:text-primary transition-colors">
                                <MdPersonOutline />
                            </Link>
                            <button 
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-2xl text-text-main-light dark:text-white hover:text-primary transition-colors"
                            >
                                <MdSearch />
                            </button>
                            <button
                                onClick={() => setManualToggle(prev => !prev)}
                                className={`w-7 h-7 flex flex-col items-center justify-center gap-[4px] text-text-main-light dark:text-white transition-all duration-300 ${
                                    isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                            >
                                <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                                    isNavVisible && isScrolled ? 'translate-y-[6px] rotate-45' : ''
                                }`} />
                                <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                                    isNavVisible && isScrolled ? 'opacity-0 scale-0' : ''
                                }`} />
                                <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                                    isNavVisible && isScrolled ? '-translate-y-[6px] -rotate-45' : ''
                                }`} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Version (RTL order: Menu -> Logo -> EN -> Cart -> Search) */}
                    <div className="flex md:hidden items-center justify-between">
                        {/* Right Group: Menu and Logo */}
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="p-0 flex items-center justify-center w-10 h-10 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark"
                            >
                                <MdMenu className="text-[24px]" />
                            </button>
                            <Link href="/" className="flex flex-col">
                                <span className="text-xl font-bold tracking-tight text-text-main-light dark:text-white leading-tight">
                                    Ruby Beauty
                                </span>
                                <span className="text-[8px] text-text-muted-light dark:text-text-muted-dark tracking-[0.1em] font-medium uppercase mt-[-1px]">
                                    {dir === 'rtl' ? 'جمالك يليق بك' : 'Your beauty deserves it'}
                                </span>
                            </Link>
                        </div>

                        {/* Left Group: EN, Cart, Search */}
                        <div className="flex items-center gap-2">
                            <LanguageToggle />
                            <div className="relative">
                                <Link href="/cart" className="text-2xl text-text-main-light dark:text-white hover:text-primary transition-colors">
                                    <MdOutlineShoppingBag />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                            </div>
                            <button 
                                onClick={() => setIsMobileSearchOpen(true)}
                                className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark"
                            >
                                <MdSearch className="text-[22px]" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Overlays Wrapper */}
                    <MobileMenu 
                        initialCategories={initialCategories}
                        isOpen={isMobileMenuOpen}
                        setIsOpen={setIsMobileMenuOpen}
                        isSearchOpen={isMobileSearchOpen}
                        setIsSearchOpen={setIsMobileSearchOpen}
                        hideTriggers={true}
                    />
                </div>

                {/* Navigation Links Row - Desktop only */}
                <nav className={`hidden md:grid border-t border-gray-50 dark:border-white/5 transition-all duration-300 ease-in-out ${
                    !isNavVisible ? 'grid-rows-[0fr] opacity-0 border-t-0' : 'grid-rows-[1fr] opacity-100'
                }`}>
                    <div className="overflow-hidden">
                        <div className="flex items-center justify-center gap-8 py-2">
                            <Link href="/" className="text-sm font-bold text-primary border-b-2 border-primary pb-1">{t('common.home')}</Link>
                            <Link href="/brands/ruby-beauty" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('nav.rubyBeauty')}</Link>
                            <Link href="/brands/makeup" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('nav.makeup')}</Link>
                            <Link href="/brands/perfumes" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('nav.perfumes')}</Link>
                            <Link href="/brands/accessories" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('nav.accessories')}</Link>
                            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('nav.offers')}</Link>
                            <Link href="/products?sort=newest" className="text-sm font-medium hover:text-primary transition-colors text-text-main-light dark:text-white">{t('nav.newArrivals')}</Link>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Expandable Search Bar */}
            {isSearchOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-white/10 p-4 animate-fadeIn">
                    <div className="container-custom">
                        <HeaderSearch />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
