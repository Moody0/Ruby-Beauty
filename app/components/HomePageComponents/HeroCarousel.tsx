"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

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

const DEFAULT_BANNER = {
    id: 'default',
    title: "Radiance Redefined.",
    subtitle: "Discover our new botanical collection designed to give your skin a natural, healthy glow from within.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8pRgU38opDPgidWmDRVHh18-R0XsEouLP3xdxsGLZz4BX3nQjc-9PXhgFNDVECMvP80S7ZtFmpA-QwwrnKgOR8B7WY0FlM3qJCAf1J8cxpwvyt6V15oxTZz-uhtroLEp-87KWQzsp-6-2mVURrFG_Q6mWjJ5YGqT0gqwmcLOPMK6pDk77rqmdXEvvM82qGkXdLNmSeXBPXY9j9zwnT_PjJ5YAOzWa2PqrFvo1SOjMCtz71ZHQraBSPlt7TKx00ccpwm4TTWoB6b0y",
    buttonText: "Shop New Arrivals",
    link: "/products",
    badge: "New Collection",
    isActive: true
};

const HeroCarousel = ({ banners }: HeroCarouselProps) => {
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
                <div className="relative overflow-hidden rounded-2xl bg-surface-light dark:bg-surface-dark min-h-[500px] md:min-h-[550px]">
                    {/* Slides */}
                    {displayBanners.map((banner, index) => (
                        <div
                            key={banner.id}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            <div className="flex flex-col-reverse md:flex-row items-center h-full">
                                {/* Hero Content */}
                                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col items-start justify-center gap-6 z-10 h-full relative">
                                    {/* Content Transition Wrapper */}
                                    <div className={`transition-all duration-700 delay-300 transform ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}>
                                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                                            {banner.badge || "New Collection"}
                                        </span>
                                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-text-main-light dark:text-text-main-dark mb-4">
                                            {/* Handle the specific formatting for the default banner if needed, or just display generic title */}
                                            {banner.id === 'default' ? (
                                                <>Radiance <br className="hidden md:block" /> <span className="text-primary">Redefined.</span></>
                                            ) : (
                                                banner.title
                                            )}
                                        </h2>
                                        <p className="text-lg text-text-muted-light dark:text-text-muted-dark max-w-md mb-6">
                                            {banner.subtitle || "Discover our exclusive collection."}
                                        </p>
                                        <Link
                                            href={banner.link || "/products"}
                                            className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-sm transition-all flex items-center gap-2 w-fit group/btn"
                                        >
                                            {banner.buttonText || "Shop Now"}
                                            <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Hero Image */}
                                <div className="w-full md:w-1/2 h-[300px] md:h-full relative">
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
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-text-main dark:text-white hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover:opacity-100"
                                aria-label="Previous slide"
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-text-main dark:text-white hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover:opacity-100"
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
