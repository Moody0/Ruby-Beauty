'use client';

import React from 'react';
import ProductCard from '../ProductsPageComponents/ProductCard';
import Link from 'next/link';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

import { useLanguage } from '@/app/context/LanguageContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

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

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="container-custom py-8 md:py-10 transition-all duration-300 relative group/section">
            <div className="w-full">
                <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-main-light dark:text-text-main-dark">{t('home.trendingNow')}</h3>
                    <Link className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all" href="/products">
                        {t('common.viewAll')} <MdChevronRight className={`text-sm ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
                
                <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
                    <Swiper
                        modules={[Navigation, FreeMode]}
                        spaceBetween={12}
                        slidesPerView={'auto'}
                        freeMode={true}
                        navigation={{
                            nextEl: '.swiper-button-next-trending',
                            prevEl: '.swiper-button-prev-trending',
                            disabledClass: 'opacity-0 cursor-auto pointer-events-none'
                        }}
                        breakpoints={{
                            // Mobile - Free scrolling
                            320: {
                                slidesPerView: 'auto',
                                spaceBetween: 12,
                                freeMode: true,
                                slidesPerGroup: 1
                            },
                            480: {
                                slidesPerView: 'auto',
                                spaceBetween: 16,
                                freeMode: true,
                                slidesPerGroup: 1
                            },
                            // Tablet - Scroll by group
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                                freeMode: false,
                                slidesPerGroup: 3
                            },
                            // Desktop - Scroll by 4
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                                freeMode: false,
                                slidesPerGroup: 4
                            }
                        }}
                        className="!pb-4 !px-1"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id} className="!h-auto !w-[179px] md:!w-auto">
                                <ProductCard product={product} t={t} language={language} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons - Hidden on Mobile */}
                    <button 
                        className={`swiper-button-prev-trending absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-surface-dark shadow-lg flex items-center justify-center text-text-main dark:text-white hover:bg-primary hover:text-white transition-all duration-300 opacity-0 group-hover/section:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed hidden md:flex ${dir === 'rtl' ? '-right-5 rotate-180' : '-left-5'}`}
                        aria-label="Previous slide"
                    >
                        <MdChevronLeft className="text-2xl" />
                    </button>
                    <button 
                        className={`swiper-button-next-trending absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-surface-dark shadow-lg flex items-center justify-center text-text-main dark:text-white hover:bg-primary hover:text-white transition-all duration-300 opacity-0 group-hover/section:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed hidden md:flex ${dir === 'rtl' ? '-left-5 rotate-180' : '-right-5'}`}
                        aria-label="Next slide"
                    >
                        <MdChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
