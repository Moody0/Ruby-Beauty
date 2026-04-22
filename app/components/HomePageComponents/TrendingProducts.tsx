'use client';

import React, { useRef } from 'react';
import ProductCard from '../ProductsPageComponents/ProductCard';
import Link from 'next/link';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { useLanguage } from '@/app/context/LanguageContext';

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
    const railRef = useRef<HTMLDivElement | null>(null);

    const scrollRail = (direction: 'prev' | 'next') => {
        const rail = railRef.current;

        if (!rail) {
            return;
        }

        const amount = Math.max(rail.clientWidth * 0.8, 320);
        rail.scrollBy({
            left: direction === 'next' ? amount : -amount,
            behavior: 'smooth',
        });
    };

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

                    <button
                        className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text-main shadow-lg transition hover:bg-primary hover:text-white dark:bg-surface-dark ${dir === 'rtl' ? '-right-5' : '-left-5'}`}
                        aria-label="Scroll previous trending products"
                        onClick={() => scrollRail(dir === 'rtl' ? 'next' : 'prev')}
                        type="button"
                    >
                        <MdChevronLeft className="text-2xl" />
                    </button>
                    <button
                        className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text-main shadow-lg transition hover:bg-primary hover:text-white dark:bg-surface-dark ${dir === 'rtl' ? '-left-5' : '-right-5'}`}
                        aria-label="Scroll next trending products"
                        onClick={() => scrollRail(dir === 'rtl' ? 'prev' : 'next')}
                        type="button"
                    >
                        <MdChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
