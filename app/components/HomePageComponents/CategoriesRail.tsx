'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { useProductRail } from './useProductRail';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const CATEGORIES = [
    {
        titleAr: 'مجموعات',
        titleEn: 'Bundles',
        link: '/products',
        image: 'https://sourcebeauty.com/cdn/shop/files/Hair-Reset-System-source-beauty-egypt_de05030f-3df2-465c-b821-a83b6935f933.png?v=1778405611&width=320',
    },
    {
        titleAr: 'وصل جديد',
        titleEn: 'New Arrivals',
        link: '/products',
        image: 'https://sourcebeauty.com/cdn/shop/files/new_arrivals_9543edc2-246d-4fd3-861f-33acfd4f5a02.webp?v=1762693588&width=320',
    },
    {
        titleAr: 'البشرة',
        titleEn: 'Skincare',
        link: '/products',
        image: 'https://sourcebeauty.com/cdn/shop/files/skincare.webp?v=1762693694&width=320',
    },
    {
        titleAr: 'المكياچ',
        titleEn: 'Makeup',
        link: '/products',
        image: 'https://sourcebeauty.com/cdn/shop/files/lipsticks_0e4aadd4-9c3f-4524-acb5-c883c71941b8.webp?v=1765907215&width=320',
    },
    {
        titleAr: 'الشعر',
        titleEn: 'Hair',
        link: '/products',
        image: 'https://sourcebeauty.com/cdn/shop/files/Fino-hair-mask.webp?v=1765873943&width=320',
    }
];

const CategoriesRail = () => {
    const { dir, language } = useLanguage();
    const { railRef, progressBarRef, canScrollForward, canScrollBackward, scrollForward, scrollBackward } = useProductRail(dir);

    return (
        <section className="w-full bg-white dark:bg-[#121212] py-8 md:py-10 border-gray-100 dark:border-white/5">
            <div className="container-custom">
                <div className="relative group">
                    <div
                        ref={railRef}
                        className="-mx-4 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:px-0"
                    >
                        <div className="flex snap-x snap-mandatory gap-6 md:gap-10 pb-2">
                            {CATEGORIES.map((category, index) => (
                                <Link
                                    key={index}
                                    href={category.link}
                                    className="flex flex-col items-center gap-2 w-[100px] md:w-[120px] flex-none snap-start group/card"
                                >
                                    <div className="w-20 h-20 rounded-full overflow-hidden relative">
                                        <img
                                            src={category.image}
                                            alt={language === 'ar' ? category.titleAr : category.titleEn}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="text-sm font-bold text-center text-[#000000] dark:text-white flex items-center gap-1">
                                        <span>{language === 'ar' ? category.titleAr : category.titleEn}</span>
                                        <svg 
                                            className={`w-3.5 h-3.5 opacity-0 -translate-x-1.5 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-500 ease-out ${dir === 'rtl' ? 'rotate-180' : ''}`} 
                                            viewBox="0 0 20 20" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </h3>
                                </Link>
                            ))}
                            {/* Spacer for mobile */}
                            <div className="w-[1px] shrink-0 sm:hidden"></div>
                        </div>
                    </div>

                    {/* Desktop Navigation Arrows (Floating) */}
                    <button
                        onClick={scrollBackward}
                        disabled={!canScrollBackward}
                        className={`hidden md:flex absolute top-1/2 -translate-y-1/2 -left-5 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-800 hover:bg-gray-50 hover:scale-105 transition-all disabled:opacity-0 disabled:pointer-events-none ${dir === 'rtl' ? 'rotate-180' : ''}`}
                    >
                        <MdChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <button
                        onClick={scrollForward}
                        disabled={!canScrollForward}
                        className={`hidden md:flex absolute top-1/2 -translate-y-1/2 -right-5 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-800 hover:bg-gray-50 hover:scale-105 transition-all disabled:opacity-0 disabled:pointer-events-none ${dir === 'rtl' ? 'rotate-180' : ''}`}
                    >
                        <MdChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CategoriesRail;
