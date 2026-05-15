'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import ResilientImage from '@/app/components/ResilientImage';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    brandId: string;
    isFeatured: boolean;
}

interface FeaturedCategoriesGridProps {
    categories: Category[];
}

const FeaturedCategoriesGrid = ({ categories }: FeaturedCategoriesGridProps) => {
    const { language, dir } = useLanguage();

    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <section className="container-custom py-10 md:py-14">
            <div className={`flex flex-col md:flex-row gap-2 ${dir === 'rtl' ? '' : 'md:flex-row-reverse'}`}>
                {/* Hero Card - Navigation to All Categories */}
                <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
                    <Link
                        href="/products"
                        className="group relative block w-full h-[280px] md:h-full rounded-[10px] overflow-hidden bg-[#072835]"
                    >
                        {/* Solid Background with subtle pattern or gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#072835] to-[#0a3a4d]" />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                                {language === 'ar' ? 'أهم الفئات. الاكثر مبيعاً' : 'Top Categories. Best Sellers'}
                            </h2>
                            <p className="text-sm md:text-base text-white/80 max-w-[280px]">
                                {language === 'ar'
                                    ? 'من منتجات البشرة الى العطور , اكتشفي كل المنتجات الجديدة'
                                    : 'From skincare to perfumes, discover all the new products'}
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Category Cards Grid - All 12 items */}
                <div className="flex-1">
                    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {categories.slice(0, 12).map((category) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.slug}`}
                                className="group relative block aspect-square rounded-[10px] overflow-hidden"
                            >
                                {/* Category Image */}
                                {category.image ? (
                                    <ResilientImage
                                        src={category.image}
                                        alt={category.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                                )}

                                {/* Bottom gradient overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Category Name */}
                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-3 px-2">
                                    <span className="text-white text-xs md:text-sm font-semibold text-center leading-tight">
                                        {category.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategoriesGrid;
