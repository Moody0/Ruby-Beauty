"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

interface BreadcrumbsProps {
    productName: string;
    categoryName?: string;
    categorySlug?: string;
}

const Breadcrumbs = ({ productName, categoryName, categorySlug }: BreadcrumbsProps) => {
    const { language } = useLanguage();

    return (
        <nav className="flex items-center flex-wrap gap-y-2 text-[11px] md:text-[12px] font-bold text-[#000000]/40 uppercase tracking-[0.1em] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="text-[#000000] dark:text-white/60 relative inline-block after:content-[''] after:absolute after:bottom-[-2px] after:right-0 after:w-full after:h-[1px] after:bg-current after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-left hover:after:origin-right">
                {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            
            <span className="mx-2 md:mx-4 text-gray-300">|</span>
            
            <Link href="/products" className="text-[#000000] dark:text-white/60 relative inline-block after:content-[''] after:absolute after:bottom-[-2px] after:right-0 after:w-full after:h-[1px] after:bg-current after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-left hover:after:origin-right">
                {language === 'ar' ? 'جميع المنتجات' : 'All Products'}
            </Link>

            {categoryName && categorySlug && (
                <>
                    <span className="mx-2 md:mx-4 text-gray-300">|</span>
                    <Link href={`/categories/${categorySlug}`} className="text-[#000000] dark:text-white/60 relative inline-block after:content-[''] after:absolute after:bottom-[-2px] after:right-0 after:w-full after:h-[1px] after:bg-current after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-left hover:after:origin-right">
                        {categoryName}
                    </Link>
                </>
            )}

            <span className="mx-2 md:mx-4 text-gray-300">|</span>
            
            <span className="text-[#000000] dark:text-white truncate max-w-[150px] md:max-w-none">
                {productName}
            </span>
        </nav>
    );
};

export default Breadcrumbs;
