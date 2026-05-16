"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import { 
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdAdd
} from 'react-icons/md';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

interface MobileCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
}

interface MobileMenuProps {
    initialCategories: MobileCategory[];
    isOpen?: boolean;
    setIsOpen?: (open: boolean) => void;
    isSearchOpen?: boolean;
    setIsSearchOpen?: (open: boolean) => void;
    hideTriggers?: boolean;
}

const MobileMenu = ({ 
    initialCategories, 
    isOpen: externalIsOpen, 
    setIsOpen: externalSetIsOpen,
    hideTriggers = false
}: MobileMenuProps) => {
    const { t, dir, language } = useLanguage();
    const pathname = usePathname();
    
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isMobileMenuOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsMobileMenuOpen = externalSetIsOpen !== undefined ? externalSetIsOpen : setInternalIsOpen;

    const [categories, setCategories] = useState<MobileCategory[]>(initialCategories);
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [shouldRender, setShouldRender] = useState(isMobileMenuOpen);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            setShouldRender(true);
            // Use a slight delay to trigger the animation after mounting
            const timer = setTimeout(() => setIsAnimating(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (initialCategories.length > 0) {
            setCategories(initialCategories);
            return;
        }

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

    const menuItems = [
        { id: 'brands', label: language === 'ar' ? 'البراندات' : 'Brands', sub: ['Ruby Beauty'] },
        { id: 'accessories', label: language === 'ar' ? 'الادوات و الاكسسوارات' : 'Tools & Accessories', sub: categories.filter(c => c.slug.includes('accessories')).map(c => c.name) },
        { id: 'watches', label: language === 'ar' ? 'ساعات' : 'Watches', sub: categories.filter(c => c.slug.includes('watches')).map(c => c.name) },
        { id: 'perfumes', label: language === 'ar' ? 'عطور' : 'Perfumes', sub: categories.filter(c => c.slug.includes('perfume')).map(c => c.name) },
        { id: 'makeup', label: language === 'ar' ? 'مكياج' : 'Makeup', sub: categories.filter(c => c.slug.includes('makeup')).map(c => c.name) },
        { id: 'about', label: language === 'ar' ? 'عن الشركة' : 'About Us', link: '/about-us' },
    ];

    const activeCategory = menuItems.find(item => item.id === activeCategoryId);

    if (!shouldRender) return null;

    return (
        <div className={`fixed top-[140px] left-0 right-0 bottom-0 z-[40] md:hidden transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} suppressHydrationWarning>
            <div 
                className={`absolute top-0 inset-x-0 bottom-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar Content - Starts below header */}
            <div className={`absolute top-0 left-0 right-0 bottom-0 w-full bg-white shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'} overflow-hidden`}>
                
                {/* 3. Navigation Container (Sliding Views) */}
                <div className="flex-1 relative overflow-hidden">
                    
                    {/* Main Menu View */}
                    <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${activeCategoryId ? '-translate-x-full' : 'translate-x-0'}`}>
                        <div className="flex flex-col h-full overflow-y-auto px-2 pt-4">
                            {menuItems.map((item) => (
                                <div key={item.id} className="border-b border-gray-50/50">
                                    {item.link ? (
                                        <Link 
                                            href={item.link}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center justify-between py-4 px-4 group"
                                        >
                                            <span className="text-[16px] font-semibold text-[rgb(46,46,46)]">
                                                {item.label}
                                            </span>
                                            <MdKeyboardArrowLeft className="text-2xl text-[rgb(46,46,46)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    ) : (
                                        <button 
                                            onClick={() => setActiveCategoryId(item.id)}
                                            className="w-full flex items-center justify-between py-4 px-4"
                                        >
                                            <span className="text-[16px] font-semibold text-[rgb(46,46,46)]">
                                                {item.label}
                                            </span>
                                            <MdKeyboardArrowLeft className="text-2xl text-[rgb(46,46,46)]" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            {/* 4. Social Footer */}
                <div className="p-8 flex items-center justify-start gap-6 mt-auto">
                    <a 
                        href="https://wa.me/963933254796" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <FaWhatsapp className="text-xl" />
                    </a>
                    <a 
                        href="https://www.instagram.com/ruby.beauty.sy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <FaInstagram className="text-xl" />
                    </a>
                    <a 
                        href="https://www.facebook.com/share/1HzXdo7sLG/?mibextid=wwXIfr" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <FaFacebook className="text-xl" />
                    </a>
                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sub Menu View */}
                    <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${activeCategoryId ? 'translate-x-0' : 'translate-x-full'}`}>
                        {activeCategory && (
                            <div className="flex flex-col h-full bg-white">
                                {/* Sub Menu Header (Back Button) */}
                                <div className="border-b border-gray-100 px-4 py-4 flex items-center justify-start">
                                    <button 
                                        onClick={() => setActiveCategoryId(null)}
                                        className="flex items-center gap-2 text-[rgb(46,46,46)] hover:text-black transition-colors"
                                    >
                                        <MdKeyboardArrowRight className="text-2xl" />
                                        <span className="text-[16px] font-medium">{activeCategory.label}</span>
                                    </button>
                                </div>

                                {/* Sub Menu Items */}
                                <div className="flex-1 overflow-y-auto px-2">
                                    <div className="flex flex-col pt-2">
                                        {(activeCategory.sub || []).length > 0 ? (
                                            (activeCategory.sub || []).map((subItem, idx) => (
                                                <Link 
                                                    key={idx}
                                                    href={`/products?search=${subItem}`}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex items-center justify-between py-4 px-4 border-b border-gray-50/50 group"
                                                >
                                                    <span className="text-[16px] font-semibold text-[rgb(46,46,46)]">
                                                        {subItem}
                                                    </span>
                                                    <MdAdd className="text-2xl text-[rgb(46,46,46)]" />
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="py-8 px-8 text-center text-[14px] text-gray-400 italic">
                                                {language === 'ar' ? 'لا توجد أقسام حالياً' : 'No sub-items available'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
        </div>
    );
};

export default MobileMenu;
