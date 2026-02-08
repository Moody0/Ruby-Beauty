"use client";

import React from 'react';
import ProductCard from '../ProductsPageComponents/ProductCard';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: number;
    images: string;
    categoryId: string;
    isTrending: boolean;
    stock: number;
}

const TrendingProducts = ({ products }: { products: Product[] }) => {
    const { t, dir } = useLanguage();

    if (!products || products.length === 0) {
        return null; // Or show message
    }

    return (
        <section className="px-4 md:px-20 lg:px-32 xl:px-48 2xl:px-64  dark:bg-background-dark py-16">
            <div className="w-full">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-main-light dark:text-text-main-dark">{t('home.trendingNow')}</h3>
                    <Link className="text-primary font-medium text-sm flex items-center gap-1 " href="/products">
                        {t('common.viewAll')} <span className={`material-symbols-outlined text-sm ${dir === 'rtl' ? 'rotate-180' : ''}`}>chevron_right</span>
                    </Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;