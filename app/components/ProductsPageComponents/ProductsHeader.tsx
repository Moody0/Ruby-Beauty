"use client";

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface ProductsHeaderProps {
    sort: string;
    setSort: (val: string) => void;
    activeCategory?: {
        name: string;
        description: string | null;
        image: string | null;
    } | null;
    activeBrand?: {
        name: string;
        description: string | null;
        group: string;
    } | null;
}

const ProductsHeader = ({ sort, setSort, activeCategory = null, activeBrand = null }: ProductsHeaderProps) => {
    const { t } = useLanguage();
    const title = activeCategory?.name || activeBrand?.name || t('products.allProducts');
    const description = activeCategory?.description || activeBrand?.description || (activeCategory ? t('products.categoryDescriptionFallback') : t('products.allProductsDescription'));
    const eyebrow = activeCategory ? t('products.categoryCollection') : activeBrand ? t('brands.brandCollection') : t('products.catalogEyebrow');

    return (
        <div className="mb-8 flex flex-col gap-6 border-b border-[#ece2e5] pb-6 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a6c75] dark:text-white/45">
                    {eyebrow}
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#171214] dark:text-white md:text-5xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7b676f] dark:text-white/55">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-3 self-start lg:self-end">
                <span className="text-sm font-medium text-[#7b676f] dark:text-white/55 whitespace-nowrap">
                    {t('products.sortBy')}:
                </span>
                <div className="relative">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="min-w-[180px] cursor-pointer appearance-none rounded-full border border-[#ddd2d6] bg-white px-4 py-3 text-sm font-medium text-[#181113] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ltr:pr-10 rtl:pl-10 dark:border-white/10 dark:bg-[#221d20] dark:text-white"
                    >
                        <option value="best_sellers">{t('products.bestSellers')}</option>
                        <option value="Price: Low to High">{t('products.priceLowHigh')}</option>
                        <option value="Price: High to Low">{t('products.priceHighLow')}</option>
                        <option value="Newest Arrivals">{t('products.newestArrivals')}</option>
                    </select>
                    <MdKeyboardArrowDown className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-xl text-gray-500 ltr:right-3 rtl:left-3" />
                </div>
            </div>
        </div>
    );
};

export default ProductsHeader;
