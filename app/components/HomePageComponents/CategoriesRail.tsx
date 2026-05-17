'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { useProductRail } from './useProductRail';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const STATIC_CATEGORIES = [
    { name: 'BodyCare', nameAr: 'العناية بالجسم', slug: 'bodycare', image: 'https://i.postimg.cc/VkWt3Vdx/images-(7)-Nero-AI-Image-Upscaler-Photo-Face.jpg' },
    { name: 'Eyes', nameAr: 'العيون', slug: 'eyes', image: 'https://i.postimg.cc/Hnn85Y2P/photo-2026-02-09-19-57-13.jpg' },
    { name: 'Sunscreen SPF', nameAr: 'واقي شمس', slug: 'sunscreen-spf', image: 'https://i.postimg.cc/mkBT98yJ/Designer-(5).png' },
    { name: 'Skincare', nameAr: 'العناية بالبشرة', slug: 'skincare', image: 'https://i.postimg.cc/J4pjGJ4c/photo-2026-02-09-19-59-57.jpg' },
    { name: 'Haircare', nameAr: 'العناية بالشعر', slug: 'haircare', image: 'https://i.postimg.cc/rpZ4QRPt/Designer-(4).png' },
    { name: 'Face Makeup', nameAr: 'مكياج الوجه', slug: 'face-makeup', image: 'https://i.postimg.cc/ZnRDXNbR/Designer-(6).png' },
    { name: 'False Nails', nameAr: 'أظافر صناعية', slug: 'false-nails', image: 'https://i.postimg.cc/L5xBKQCM/images-(6)-Nero-AI-Image-Upscaler-Photo-Face.jpg' },
    { name: 'False Lashes', nameAr: 'رموش صناعية', slug: 'false-lashes', image: 'https://i.postimg.cc/VLNdHkXV/images-(5)-Nero-AI-Image-Upscaler-Photo-Face.jpg' },
    { name: 'Lenses', nameAr: 'عدسات لاصقة', slug: 'lenses', image: 'https://i.postimg.cc/TYkQZ1FD/Designer-(7).png' },
    { name: 'Nails Tools', nameAr: 'أدوات الأظافر', slug: 'nails-tools', image: 'https://i.postimg.cc/fTzgGxr3/Ruby-Face-Professional-Beauty-Tools-Manicure-set-5pcs-Mauve.jpg' },
    { name: 'Nails', nameAr: 'طلاء الأظافر', slug: 'nails', image: 'https://i.postimg.cc/v80m9wCr/CAT-EYE-RUBY-315x315-Nero-AI-Image-Upscaler-Photo-Face.jpg' },
    { name: 'Lips', nameAr: 'الشفاه', slug: 'lips', image: 'https://i.postimg.cc/C5QLVFSn/Designer-(3).png' },
];

const CategoriesRail = () => {
    const { dir, language } = useLanguage();
    const { railRef, canScrollForward, canScrollBackward, scrollForward, scrollBackward } = useProductRail(dir);

    return (
        <section className="w-full bg-white dark:bg-[#121212] py-4 md:py-6 border-b border-gray-100 dark:border-white/5">
            <div className="container-custom">
                <div className="relative group">
                    <div
                        ref={railRef}
                        className="-mx-4 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:px-0"
                    >
                        <div className="flex snap-x snap-mandatory gap-6 md:gap-10 pb-2">
                            {STATIC_CATEGORIES.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/products?category=${category.slug}`}
                                    className="flex flex-col items-center gap-2 w-[100px] md:w-[120px] flex-none snap-start group/card"
                                >
                                    <div className="w-20 h-20 rounded-full overflow-hidden relative bg-gray-100">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="text-sm font-bold text-center text-[#000000] dark:text-white flex items-center gap-1">
                                        <span>{language === 'ar' ? category.nameAr : category.name}</span>
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
