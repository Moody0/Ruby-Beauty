"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

interface Banner {
    id: string;
    title: string;
    subtitle: string | null;
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
    const { t, dir } = useLanguage();

    const DEFAULT_BANNER = {
        id: 'default',
        title: t('home.trendingNow'),
        subtitle: t('footer.brandDescription'),
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8pRgU38opDPgidWmDRVHh18-R0XsEouLP3xdxsGLZz4BX3nQjc-9PXhgFNDVECMvP80S7ZtFmpA-QwwrnKgOR8B7WY0FlM3qJCAf1J8cxpwvyt6V15oxTZz-uhtroLEp-87KWQzsp-6-2mVURrFG_Q6mWjJ5YGqT0gqwmcLOPMK6pDk77rqmdXEvvM82qGkXdLNmSeXBPXY9j9zwnT_PjJ5YAOzWa2PqrFvo1SOjMCtz71ZHQraBSPlt7TKx00ccpwm4TTWoB6b0y",
        buttonText: t('home.shopNow'),
        link: "/products",
        badge: t('home.newArrival'),
        isActive: true
    };

    // If no banners are provided or the list is empty, use the default banner as a single-item array
    const displayBanners = banners && banners.length > 0 ? banners : [DEFAULT_BANNER];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayBanners.length);
    }, [displayBanners.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + displayBanners.length) % displayBanners.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (isPaused || displayBanners.length <= 1) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Rotate every 5 seconds

        return () => clearInterval(interval);
    }, [isPaused, nextSlide, displayBanners.length]);

    // Preload images for smoother transitions
    useEffect(() => {
        displayBanners.forEach((banner) => {
            const img = new Image();
            img.src = banner.image;
        });
    }, [displayBanners]);

    if (displayBanners.length === 0) return null;

    return (
        <section className="px-6 pt-8 md:px-20 lg:px-32 xl:px-48 2xl:px-64 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="w-full">
                <div className="relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark min-h-[500px] sm:min-h-[550px] md:min-h-[550px]">
                    {/* Slides */}
                    {displayBanners.map((banner, index) => (
                        <div
                            key={banner.id}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            {/* Mobile Layout: Full background image with overlay content */}
                            <div className="md:hidden relative w-full h-full">
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat"
                                    style={{ backgroundImage: `url("${banner.image}")` }}
                                >
                                    {/* Dark overlay for better text readability */}
                                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60"></div>
                                </div>

                                {/* Content Overlay */}
                                <div className={`relative z-10 h-full flex flex-col justify-end items-start p-6 sm:p-8 pb-8 sm:pb-10`}>
                                    <div className={`transition-all duration-700 delay-300 transform ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}>
                                        <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider mb-3">
                                            {banner.badge || t('home.newArrival')}
                                        </span>
                                        <h2 className="text-3xl sm:text-4xl font-extrabold leading-[1.1] tracking-tight text-white mb-3 drop-shadow-lg">
                                            {banner.title}
                                        </h2>
                                        <p className="text-sm sm:text-base text-white/90 max-w-md mb-5 line-clamp-3 drop-shadow">
                                            {banner.subtitle || t('footer.brandDescription')}
                                        </p>
                                        <Link
                                            href={banner.link || "/products"}
                                            className="px-6 sm:px-8 py-3 sm:py-3.5  bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-sm transition-all flex items-center gap-2 w-fit group/btn shadow-lg "
                                        >
                                            {dir === 'rtl' && (
                                                <span className="material-symbols-outlined text-lg group-hover/btn:-translate-x-1 transition-transform">arrow_forward</span>
                                            )}
                                            {banner.buttonText || t('home.shopNow')}
                                            {dir !== 'rtl' && (
                                                <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Layout: dir="ltr" so flex order is physical (left/right) in both LTR and RTL docs */}
                            <div className="hidden md:flex flex-row items-center h-full" dir="ltr">
                                {/* Hero Content — in RTL: order-2 = right; in LTR: order-1 = left */}
                                <div className={`w-full md:w-1/2 p-12 lg:p-20 flex flex-col justify-center gap-6 z-10 h-full relative ${dir === 'rtl' ? 'order-2 items-end text-right' : 'order-1 items-start text-left'}`}>
                                    {/* Content Transition Wrapper — in RTL full width so button can sit at end */}
                                    <div className={`transition-all duration-700 delay-300 transform ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        } ${dir === 'rtl' ? 'w-full flex flex-col items-end' : ''}`}>
                                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                                            {banner.badge || t('home.newArrival')}
                                        </span>
                                        <h2 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-text-main-light dark:text-text-main-dark mb-4">
                                            {banner.title}
                                        </h2>
                                        <p className="text-lg text-text-muted-light dark:text-text-muted-dark max-w-md mb-6">
                                            {banner.subtitle || t('footer.brandDescription')}
                                        </p>
                                        <Link
                                            href={banner.link || "/products"}
                                            className={`px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-sm transition-all flex items-center gap-2 w-fit group/btn ${dir === 'rtl' ? 'self-end' : ''}`}
                                        >
                                            {banner.buttonText || t('home.shopNow')}
                                            <span className={`material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform ${dir === 'rtl' ? ' group-hover/btn:-translate-x-1' : ''}`}>arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Hero Image — order-1 in RTL so it appears on the left */}
                                <div className={`w-full md:w-1/2 h-full relative ${dir === 'rtl' ? 'order-1' : 'order-2'}`}>
                                    <div
                                        className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-10000 ease-linear transform scale-100 group-hover:scale-110"
                                        style={{ backgroundImage: `url("${banner.image}")` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Controls - Only show if more than 1 banner */}
                    {displayBanners.length > 1 && (
                        <>
                            {/* Arrows */}
                            <button
                                onClick={prevSlide}
                                className={`absolute ${dir === 'rtl' ? 'right-4 rotate-180' : 'left-4'} top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-text-main dark:text-white hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover:opacity-100`}
                                aria-label="Previous slide"
                            >
                                <span className={`material-symbols-outlined ${dir === 'rtl' ? '' : ''}`}>chevron_left</span>
                            </button>
                            <button
                                onClick={nextSlide}
                                className={`absolute ${dir === 'rtl' ? 'left-4 rotate-180' : 'right-4'} top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-text-main dark:text-white hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover:opacity-100`}
                                aria-label="Next slide"
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                {displayBanners.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'w-8 bg-primary'
                                            : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroCarousel;
