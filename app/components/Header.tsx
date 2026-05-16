'use client';

import Link from 'next/link';
import React from 'react';
import { MdOutlineShoppingBag, MdFavoriteBorder, MdPersonOutline, MdMenu, MdClose, MdSearch } from 'react-icons/md';
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
                    <div className="hidden md:flex items-center justify-between gap-6">
                        {/* Left: Logo and Menu Toggle Group */}
                        <div className="flex items-center shrink-0">
                            <button
                                onClick={() => setManualToggle(prev => !prev)}
                                className={`flex items-center justify-center transition-all duration-500 ease-in-out h-10 overflow-hidden text-text-main-light dark:text-white ${
                                    isScrolled ? 'w-10 opacity-100' : 'w-0 opacity-0 pointer-events-none'
                                }`}
                            >
                                <div className="w-5 h-5 flex flex-col items-center justify-center gap-[4px]">
                                    <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                                        isNavVisible && isScrolled ? 'translate-y-[6px] rotate-45' : ''
                                    }`} />
                                    <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                                        isNavVisible && isScrolled ? 'opacity-0 scale-0' : ''
                                    }`} />
                                    <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                                        isNavVisible && isScrolled ? '-translate-y-[6px] -rotate-45' : ''
                                    }`} />
                                </div>
                            </button>

                            <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'ms-2' : 'ms-0'}`}>
                                <Link href="/" className="flex flex-col items-center">
                                    <span className="text-2xl md:text-3xl font-bold tracking-tight text-text-main-light dark:text-white">
                                        Ruby Beauty
                                    </span>
                                    <span className="text-[10px] text-text-muted-light dark:text-text-muted-dark tracking-[0.2em] font-medium uppercase mt-[-4px]">
                                        {dir === 'rtl' ? 'جمالك يليق بك' : 'Your beauty deserves it'}
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Center: Search */}
                        <div className="flex-1 max-w-3xl px-4">
                            <HeaderSearch />
                        </div>

                        {/* Right: Icons */}
                        <div className="flex items-center gap-3 md:gap-5 shrink-0">
                            <div className="flex items-center gap-1">
                                <LanguageToggle />
                                <CurrencyToggle />
                            </div>
                            <div className="relative">
                                <Link href="/cart" className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-xl text-text-main-light dark:text-white hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all">
                                    <MdOutlineShoppingBag />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full shadow-sm">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Version */}
                    <div className="flex md:hidden flex-col gap-4">
                        {/* Top Row: Cart, Language, Logo, Menu */}
                        <div className="flex items-center justify-between">
                            {/* Right Group: Logo and Menu (Now on Left) - Internal Order Swapped */}
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-1 text-text-main-light dark:text-white"
                                >
                                    {isMobileMenuOpen ? (
                                        <MdClose className="text-3xl" />
                                    ) : (
                                        <MdMenu className="text-3xl" />
                                    )}
                                </button>
                                <Link href="/" className="flex flex-col items-center">
                                    <span className="text-lg font-bold tracking-tight text-text-main-light dark:text-white leading-tight uppercase">
                                        Ruby Beauty
                                    </span>
                                    <span className="text-[9px] text-text-muted-light dark:text-text-muted-dark tracking-[0.1em] font-medium mt-[-2px]">
                                        جمالك يليق بك
                                    </span>
                                </Link>
                            </div>

                            {/* Left Group: Cart, Currency, Language (Now on Right) - Internal Order Swapped */}
                            <div className="flex items-center gap-3">
                                <LanguageToggle />
                                <CurrencyToggle />
                                <div className="relative">
                                    <Link href="/cart" className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-xl text-text-main-light dark:text-white">
                                        <MdOutlineShoppingBag />
                                        {totalItems > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                                {totalItems}
                                            </span>
                                        )}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Search Bar */}
                        <div className="w-full">
                            <HeaderSearch autoFocus={false} />
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

            </div>

            {/* Navigation Links Row - Desktop only - Full Width Background */}
            <nav className={`hidden md:grid bg-[#F1F1F1] dark:bg-white/5 border-t border-gray-100 dark:border-white/5 transition-all duration-300 ease-in-out ${
                !isNavVisible ? 'grid-rows-[0fr] opacity-0 border-t-0' : 'grid-rows-[1fr] opacity-100'
            }`}>
                <div className="overflow-hidden">
                    <div className="container-custom">
                        <div className="flex items-center justify-center gap-8 py-3">
                            {[
                                { href: '/', label: t('common.home') },
                                { href: '/brands/ruby-beauty', label: t('nav.rubyBeauty') },
                                { href: '/brands/makeup', label: t('nav.makeup') },
                                { href: '/brands/perfumes', label: t('nav.perfumes') },
                                { href: '/brands/accessories', label: t('nav.accessories') },
                                { href: '/products', label: t('nav.offers') },
                                { href: '/products?sort=newest', label: t('nav.newArrivals') },
                            ].map((link, index) => (
                                <Link 
                                    key={index}
                                    href={link.href} 
                                    className="text-[15px] font-bold text-[#1C1C1C] dark:text-white/90 relative inline-block after:content-[''] after:absolute after:bottom-[-2px] after:right-0 after:w-full after:h-[1px] after:bg-current after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-left hover:after:origin-right"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
