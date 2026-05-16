'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { useProductRail } from './useProductRail';

const CATEGORIES = [
    {
        id: 'hair',
        nameAr: 'الشعر',
        nameEn: 'Hair',
        slug: 'hair',
        icon: '//sourcebeauty.com/cdn/shop/files/Category_Icons_SVG_20X20-01.svg?v=1766502650&width=20'
    },
    {
        id: 'korean-beauty',
        nameAr: 'منتجات الجمال الكوري',
        nameEn: 'Korean Beauty',
        slug: 'korean-beauty',
        icon: '//sourcebeauty.com/cdn/shop/files/Category_Icons_SVG_20X20-03.svg?v=1766502649&width=20'
    },
    {
        id: 'fragrance',
        nameAr: 'العطور',
        nameEn: 'Fragrance',
        slug: 'fragrance',
        icon: '//sourcebeauty.com/cdn/shop/files/Category_Icons_SVG_20X20-02.svg?v=1766502652&width=20'
    },
    {
        id: 'skincare',
        nameAr: 'البشرة',
        nameEn: 'Skincare',
        slug: 'skincare',
        icon: '//sourcebeauty.com/cdn/shop/files/Category_Icons_SVG_20X20-05.svg?v=1766502650&width=20'
    },
    {
        id: 'makeup',
        nameAr: 'مكياچ',
        nameEn: 'Makeup',
        slug: 'makeup',
        icon: '//sourcebeauty.com/cdn/shop/files/Category_Icons_SVG_20X20-06.svg?v=1766502650&width=20'
    },
    {
        id: 'body-wellbeing',
        nameAr: 'الجسم و العناية بالصحة',
        nameEn: 'Body & Wellbeing',
        slug: 'body-wellbeing',
        icon: '//sourcebeauty.com/cdn/shop/files/Category_Icons_SVG_20X20-04.svg?v=1766502650&width=20'
    }
];

const CategoryPills = () => {
    const { dir, language } = useLanguage();
    const { railRef, canScrollForward, canScrollBackward, scrollForward, scrollBackward } = useProductRail(dir);

    return (
        <section className="container-custom py-10 md:py-16">
            <div className="flex flex-col items-center text-center mb-8 md:mb-12 max-w-3xl mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] leading-tight">
                    {language === 'ar'
                        ? 'اعطي لجسمك الاهتمام المحتاجه , جربي تجربة الجمال على طريقة روبي بيوتي'
                        : 'Give your body the care it needs, experience beauty the Ruby Beauty way'}
                </h2>
            </div>

            <div className="relative group/pills">
                {/* Previous Button */}
                <button
                    onClick={scrollBackward}
                    disabled={!canScrollBackward}
                    className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 hidden md:flex w-10 h-10 shrink-0 rounded-full bg-white items-center justify-center text-[#000000] shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all hover:bg-[#f1f1f1] disabled:opacity-0 disabled:cursor-not-allowed"
                    aria-label="Previous categories"
                >
                    <svg className={`w-5 h-5 ${dir === 'rtl' ? '-scale-x-100' : ''}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 16.25L6.25 10L12.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>

                <div
                    ref={railRef}
                    className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                    <div className={`flex items-center gap-3 w-max mx-auto md:justify-center min-w-full ${dir === 'rtl' ? 'flex-row' : 'flex-row'}`}>
                        {CATEGORIES.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="flex-shrink-0 flex items-center gap-3 bg-white border border-gray-200 hover:border-[#f1f1f1] hover:bg-[#f1f1f1] text-[#000000] hover:text-[#000000] rounded-full px-6 py-3 transition-all duration-300"
                            >
                                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                    <img
                                        src={category.icon}
                                        alt={language === 'ar' ? category.nameAr : category.nameEn}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="font-medium text-sm md:text-base whitespace-nowrap">
                                    {language === 'ar' ? category.nameAr : category.nameEn}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <button
                    onClick={scrollForward}
                    disabled={!canScrollForward}
                    className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 hidden md:flex w-10 h-10 shrink-0 rounded-full bg-white items-center justify-center text-[#000000] shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all hover:bg-[#f1f1f1] disabled:opacity-0 disabled:cursor-not-allowed"
                    aria-label="Next categories"
                >
                    <svg className={`w-5 h-5 ${dir === 'rtl' ? '-scale-x-100' : ''}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default CategoryPills;
