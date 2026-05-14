'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '../ProductsPageComponents/ProductCard';
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

interface TabData {
    key: string;
    labelKey: string;
    products: Product[];
}

interface FeaturedCollectionProps {
    newArrivals: Product[];
    bundles: Product[];
    bestSellers: Product[];
}

const CARD_WIDTH = 320;
const CARD_GAP = 20;

const FeaturedCollection = ({ newArrivals, bundles, bestSellers }: FeaturedCollectionProps) => {
    const { t, dir } = useLanguage();
    const [activeTab, setActiveTab] = useState(0);

    const { railRef, canScrollForward, canScrollBackward, scrollForward, scrollBackward } = useProductRail(dir);

    const tabs: TabData[] = useMemo(() => [
        { key: 'new-arrivals', labelKey: 'home.featuredTabNewArrivals', products: newArrivals },
        { key: 'bundles', labelKey: 'home.featuredTabBundles', products: bundles },
        { key: 'best-sellers', labelKey: 'home.featuredTabBestSellers', products: bestSellers },
    ], [newArrivals, bundles, bestSellers]);

    const activeProducts = tabs[activeTab]?.products || [];

    if (!newArrivals.length && !bundles.length && !bestSellers.length) {
        return null;
    }

    return (
        <section className="container-custom py-8 md:py-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 px-2">
                <div className="flex-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                        {t('home.featuredCollection')}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {t('home.featuredCollectionSubtitle')}
                    </p>
                </div>

                <div className="tabs-nav overflow-x-auto scrollbar-hide" role="tablist">
                    <div className="flex md:justify-end gap-1">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.key}
                                role="tab"
                                aria-selected={activeTab === index}
                                onClick={() => setActiveTab(index)}
                                className={`tabs__btn whitespace-nowrap px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                                    activeTab === index
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                            >
                                {t(tab.labelKey)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative">
                <div
                    ref={railRef}
                    className="-mx-4 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:px-0"
                >
                    <div className="flex snap-x snap-mandatory gap-4 pb-2 md:gap-5">
                            {activeProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="w-[calc((100%-48px)/4)] md:w-[calc((100%-60px)/4)] lg:w-[calc((100%-80px)/5)] flex-none snap-start"
                                >
                                    <ProductCard
                                        product={product}
                                        variant="compact"
                                        badge={activeTab === 0 ? t('home.newArrival') : undefined}
                                    />
                                </div>
                            ))}
                    </div>
                </div>

                {canScrollBackward && (
                    <button
                        className="hidden md:flex absolute ltr:left-[-20px] rtl:right-[-20px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text-main transition-all hover:bg-primary hover:text-white dark:bg-surface-dark shadow-md"
                        aria-label="Previous"
                        onClick={scrollBackward}
                        type="button"
                    >
                        {dir === 'rtl' ? <MdChevronRight className="text-2xl" /> : <MdChevronLeft className="text-2xl" />}
                    </button>
                )}
                {canScrollForward && (
                    <button
                        className="hidden md:flex absolute ltr:right-[-20px] rtl:left-[-20px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text-main transition-all hover:bg-primary hover:text-white dark:bg-surface-dark shadow-md"
                        aria-label="Next"
                        onClick={scrollForward}
                        type="button"
                    >
                        {dir === 'rtl' ? <MdChevronLeft className="text-2xl" /> : <MdChevronRight className="text-2xl" />}
                    </button>
                )}
            </div>
        </section>
    );
};

export default FeaturedCollection;
