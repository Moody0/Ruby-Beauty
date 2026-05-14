'use client';

import React from 'react';
import ProductCard from '../ProductsPageComponents/ProductCard';
import Link from 'next/link';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

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
    brand?: {
        id: string;
        name: string;
        slug: string;
        group?: string;
    } | null;
}

interface BestSellersProps {
    products: Product[];
}

const BestSellers = ({ products }: BestSellersProps) => {
    const { t, dir } = useLanguage();
    const { railRef, canScrollForward, canScrollBackward, scrollForward, scrollBackward } = useProductRail(dir);

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="container-custom py-8 md:py-10">
            <div className="w-full">
                <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-main-light dark:text-text-main-dark">{t('home.bestSellers')}</h3>
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
                                className="w-[calc((100%-48px)/4)] md:w-[calc((100%-60px)/4)] lg:w-[calc((100%-80px)/5)] flex-none snap-start"
                            >
                                <ProductCard product={product} variant="compact" />
                            </div>
                        ))}
                    </div>
                    </div>

                    {canScrollForward && (
                        <button
                            className="hidden md:flex absolute ltr:right-[-20px] rtl:left-[-20px] top-[95px] md:top-[108px] -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text-main transition-all hover:bg-primary hover:text-white dark:bg-surface-dark"
                            aria-label="Next"
                            onClick={scrollForward}
                            type="button"
                        >
                            {dir === 'rtl' ? <MdChevronLeft className="text-2xl" /> : <MdChevronRight className="text-2xl" />}
                        </button>
                    )}
                    {canScrollBackward && (
                        <button
                            className="hidden md:flex absolute ltr:left-[-20px] rtl:right-[-20px] top-[95px] md:top-[108px] -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text-main transition-all hover:bg-primary hover:text-white dark:bg-surface-dark"
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

export default BestSellers;