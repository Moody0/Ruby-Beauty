"use client";

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

interface ProductsHeaderProps {
    sort: string;
    setSort: (val: string) => void;
}

const ProductsHeader = ({ sort, setSort }: ProductsHeaderProps) => {
    const { t } = useLanguage();

    return (
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-[#f4f0f2] pb-6 dark:border-white/10">
            <div className="flex max-w-2xl flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight text-[#181113] dark:text-white">{t('products.allProducts')}</h1>
                <p className="text-base text-gray-500 dark:text-gray-400">{t('footer.brandDescription')}</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{t('products.sortBy')}:</span>
                <div className="relative">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="appearance-none rounded-lg border border-[#e6dbdf] bg-background-light px-4 py-2.5 ltr:pr-10 rtl:pl-10 text-sm font-bold text-[#181113] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-white/10 dark:text-white cursor-pointer min-w-[160px]"
                    >
                        <option value="best_sellers">{t('products.bestSellers')}</option>
                        <option value="Price: Low to High">{t('products.priceLowHigh')}</option>
                        <option value="Price: High to Low">{t('products.priceHighLow')}</option>
                        <option value="Newest Arrivals">{t('products.newestArrivals')}</option>
                    </select>
                    <span className="material-symbols-outlined absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xl">keyboard_arrow_down</span>
                </div>
            </div>
        </div>
    );
};

export default ProductsHeader;
