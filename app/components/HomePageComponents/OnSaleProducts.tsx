"use client";

import React, { useRef } from 'react';
import ProductCard from '../ProductsPageComponents/ProductCard';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdChevronLeft, MdChevronRight, MdArrowForward } from 'react-icons/md';

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

const OnSaleProducts = ({ products }: { products: Product[] }) => {
    const { t, dir } = useLanguage();
    const scrollRef = useRef<HTMLDivElement>(null);

    if (!products || products.length === 0) {
        return null;
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth * 0.8
                : scrollLeft + clientWidth * 0.8;

            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="container-custom py-8">
            <div className="w-full">
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-primary font-bold text-xs uppercase tracking-wider">{t('home.specialOffers') || 'Special Offers'}</span>
                        <h3 className="text-2xl md:text-3xl font-black text-text-main-light dark:text-text-main-dark">
                            {t('home.onSale') || 'On Sale Now'}
                        </h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="size-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-90"
                            >
                                <MdChevronLeft className={`${dir === 'rtl' ? 'rotate-180' : ''}`} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="size-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-90"
                            >
                                <MdChevronRight className={`${dir === 'rtl' ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                        <Link className="text-primary font-bold text-sm flex items-center gap-1 group" href="/products">
                            {t('common.viewAll')}
                            <MdArrowForward className={`text-sm transition-transform group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        </Link>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default OnSaleProducts;
