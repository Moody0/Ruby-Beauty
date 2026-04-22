"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MdArrowForward, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useLanguage } from '@/app/context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { getSafeImageUrl } from '@/lib/image-utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Banner {
    id: string;
    title: string | null;
    subtitle: string | null;
    titleAr: string | null;
    subtitleAr: string | null;
    image: string;
    buttonText: string | null;
    link: string | null;
    badge: string | null;
    isActive: boolean;
}

interface HeroCarouselProps {
    banners: Banner[];
}

const HeroCarousel = ({ banners }: HeroCarouselProps) => {
    const { t, dir, language } = useLanguage();
    const DEFAULT_BANNER: Banner = {
        id: 'default',
        title: t('home.trendingNow'),
        subtitle: t('footer.brandDescription'),
        titleAr: 'الآن شائع',
        subtitleAr: 'مستحضرات عناية بالبشرة نباتية فاخرة مصممة لكشف إشراقتك الطبيعية. خالي من القسوة وللنباتيين ومستدام.',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8pRgU38opDPgidWmDRVHh18-R0XsEouLP3xdxsGLZz4BX3nQjc-9PXhgFNDVECMvP80S7ZtFmpA-QwwrnKgOR8B7WY0FlM3qJCAf1J8cxpwvyt6V15oxTZz-uhtroLEp-87KWQzsp-6-2mVURrFG_Q6mWjJ5YGqT0gqwmcLOPMK6pDk77rqmdXEvvM82qGkXdLNmSeXBPXY9j9zwnT_PjJ5YAOzWa2PqrFvo1SOjMCtz71ZHQraBSPlt7TKx00ccpwm4TTWoB6b0y",
        buttonText: t('home.shopNow'),
        link: "/products",
        badge: t('home.newArrival'),
        isActive: true
    };

    const getBannerTitle = (banner: Banner): string => {
        return language === 'ar' ? (banner.titleAr || banner.title || '') : (banner.title || banner.titleAr || '');
    };

    const getBannerSubtitle = (banner: Banner): string => {
        return language === 'ar' ? (banner.subtitleAr || banner.subtitle || '') : (banner.subtitle || banner.subtitleAr || '');
    };

    const getBannerButtonText = (banner: Banner): string => {
        if (language === 'ar') {
            // If it's the default "Shop Now" or empty, use translation
            if (!banner.buttonText || banner.buttonText === 'Shop Now') {
                return t('home.shopNow');
            }
            return banner.buttonText;
        }
        return banner.buttonText || t('home.shopNow');
    };

    const displayBanners = banners && banners.length > 0 ? banners : [DEFAULT_BANNER];

    if (displayBanners.length === 0) return null;

    return (
        <section className="container-custom pt-4 md:pt-8 group hero-carousel">
            {/* Preload the first banner image for LCP */}
            {displayBanners[0]?.image && (
                <link
                    rel="preload"
                    href={getSafeImageUrl(displayBanners[0].image)}
                    as="image"
                />
            )}
            <div className="w-full relative">
                <div className="relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark h-[500px] sm:h-[550px] md:h-[600px]">
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={displayBanners.length > 1}
                        speed={1000}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        pagination={{
                            clickable: true,
                            bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary !w-8 !rounded-full',
                            bulletClass: 'swiper-pagination-bullet !bg-gray-300 !opacity-100 transition-all duration-300'
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next-hero',
                            prevEl: '.swiper-button-prev-hero',
                        }}
                        className="h-full w-full !h-full"
                    >
                        {displayBanners.map((banner, index) => (
                            <SwiperSlide key={banner.id} className="h-full w-full relative bg-surface-light dark:bg-surface-dark !h-full">
                                {/* Mobile Layout: Full background image with overlay content */}
                                <div className="md:hidden relative w-full h-full">
                                    {/* Image Container */}
                                    <div className="absolute inset-0 w-full h-full bg-gray-50 dark:bg-white/5">
                                        <img
                                            src={getSafeImageUrl(banner.image)}
                                            alt={getBannerTitle(banner)}
                                            className="w-full h-full object-cover"
                                            loading={index === 0 ? "eager" : "lazy"}
                                        />
                                        {/* Subtle overlay for text readability on mobile */}
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className={`relative z-10 h-full flex flex-col justify-end items-start p-6 sm:p-8 pb-16`}>
                                        <div className="animate-fadeInUp">
                                            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider mb-3">
                                                {banner.badge || t('home.newArrival')}
                                            </span>
                                            <h2 className="text-3xl sm:text-4xl font-extrabold leading-[1.1] tracking-tight text-white mb-3 drop-shadow-lg">
                                                {getBannerTitle(banner)}
                                            </h2>
                                            <p className="text-sm sm:text-base text-white/90 max-w-md mb-5 line-clamp-3 drop-shadow">
                                                {getBannerSubtitle(banner) || t('footer.brandDescription')}
                                            </p>
                                            <Link
                                                href={banner.link || "/products"}
                                                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-sm transition-all flex items-center gap-2 w-fit group/btn shadow-lg"
                                            >
                                                {dir === 'rtl' && (
                                                    <MdArrowForward className="text-lg group-hover/btn:-translate-x-1 transition-transform" />
                                                )}
                                                {getBannerButtonText(banner)}
                                                {dir !== 'rtl' && (
                                                    <MdArrowForward className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Layout: Split Layout */}
                                <div className="hidden md:flex flex-row items-center h-full w-full" dir="ltr">
                                    {/* Text Side - 50% */}
                                    <div className={`w-1/2 h-full flex flex-col justify-center p-12 lg:p-20 relative z-10 
                                        ${dir === 'rtl' ? 'order-2 text-right items-end' : 'order-1 text-left items-start'}
                                        bg-[#fff0f3] dark:bg-[#2d161e] transition-colors duration-300
                                    `}>
                                        <div className={`animate-fadeInUp w-full max-w-xl ${dir === 'rtl' ? 'flex flex-col items-end' : ''}`}>
                                            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 dark:bg-white/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                                                {banner.badge || t('home.newArrival')}
                                            </span>
                                            <h2 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-4 text-text-main-light dark:text-white">
                                                {getBannerTitle(banner)}
                                            </h2>
                                            <p className="text-lg text-text-muted-light dark:text-white/80 max-w-md mb-8 leading-relaxed">
                                                {getBannerSubtitle(banner) || t('footer.brandDescription')}
                                            </p>
                                            <Link
                                                href={banner.link || "/products"}
                                                className={`px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-sm transition-all flex items-center gap-2 w-fit group/btn shadow-lg`}
                                            >
                                                {getBannerButtonText(banner)}
                                                <MdArrowForward className={`text-lg group-hover/btn:translate-x-1 transition-transform ${dir === 'rtl' ? ' group-hover/btn:-translate-x-1' : ''}`} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Image Side - 50% */}
                                    <div className={`w-1/2 h-full relative ${dir === 'rtl' ? 'order-1' : 'order-2'}`}>
                                        <img
                                            src={getSafeImageUrl(banner.image)}
                                            alt={getBannerTitle(banner)}
                                            className="w-full h-full object-cover"
                                            loading={index === 0 ? "eager" : "lazy"}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Controls - Only show if more than 1 banner */}
                    {displayBanners.length > 1 && (
                        <>
                            <button
                                className={`swiper-button-prev-hero absolute ${dir === 'rtl' ? 'right-4 rotate-180' : 'left-4'} top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 border border-white/30`}
                                aria-label="Previous slide"
                            >
                                <MdChevronLeft className="text-2xl" />
                            </button>
                            <button
                                className={`swiper-button-next-hero absolute ${dir === 'rtl' ? 'left-4 rotate-180' : 'right-4'} top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 border border-white/30`}
                                aria-label="Next slide"
                            >
                                <MdChevronRight className="text-2xl" />
                            </button>
                        </>
                    )}
                </div>
            </div>
            
            {/* Custom Styles for Swiper Pagination */}
            <style jsx global>{`
                .hero-carousel .swiper-pagination {
                    bottom: 24px !important;
                }
                /* Adjust pagination color for split layout on desktop */
                @media (min-width: 768px) {
                    .hero-carousel .swiper-pagination-bullet {
                        background: rgba(0, 0, 0, 0.2) !important;
                    }
                    :global(.dark) .hero-carousel .swiper-pagination-bullet {
                        background: rgba(255, 255, 255, 0.5) !important;
                    }
                    .hero-carousel .swiper-pagination-bullet-active {
                        background: #ee2b6c !important; /* Primary color */
                        opacity: 1 !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default HeroCarousel;
