'use client';

import React from 'react';
import ProductCard from '../ProductsPageComponents/ProductCard';
import Link from 'next/link';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { useLanguage } from '@/app/context/LanguageContext';
import { useProductRail } from './useProductRail';

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: number;
    discountPrice?: number | null;
    images: string;
    categoryId: string;
    isTrending: boolean;
    stock: number;
}

interface TrendingProductsProps {
    products: Product[];
}

const TrendingProducts = ({ products }: TrendingProductsProps) => {
    const { t, dir, language } = useLanguage();
    const { railRef, canScrollForward, canScrollBackward, scrollForward, scrollBackward } = useProductRail(dir);

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="container-custom py-8 md:py-10">
            <div className="w-full">
                <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-main-light dark:text-text-main-dark">{t('home.trendingNow')}</h3>
                    <Link className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all" href="/products">
                        {t('common.viewAll')} <MdChevronRight className={`text-sm ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </Link>
                </div>

                <div className="relative">
                    <div
                        ref={railRef}
                        className="-mx-4 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:px-0"
                    >
                    <div className="flex snap-x snap-mandatory gap-4 pb-2 md:gap-5">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="w-[189px] min-w-[189px] flex-none snap-start md:w-[216px] md:min-w-[216px]"
                            >
                                <ProductCard product={product} t={t} language={language} variant="compact" />
                            </div>
                        ))}
                    </div>
                    </div>

                    {canScrollForward && (
                        <button
                            className="hidden md:flex absolute ltr:right-[-20px] rtl:left-[-20px] top-[95px] md:top-[108px] -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text-main shadow-lg transition-all hover:bg-primary hover:text-white dark:bg-surface-dark"
                            aria-label="Next"
                            onClick={scrollForward}
                            type="button"
                        >
                            {dir === 'rtl' ? <MdChevronLeft className="text-2xl" /> : <MdChevronRight className="text-2xl" />}
                        </button>
                    )}
                    {canScrollBackward && (
                        <button
                            className="hidden md:flex absolute ltr:left-[-20px] rtl:right-[-20px] top-[95px] md:top-[108px] -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text-main shadow-lg transition-all hover:bg-primary hover:text-white dark:bg-surface-dark"
                            aria-label="Previous"
                            onClick={scrollBackward}
                            type="button"
                        >
                            {dir === 'rtl' ? <MdChevronRight className="text-2xl" /> : <MdChevronLeft className="text-2xl" />}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
