'use client';

import React from 'react';
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
        title: 'Liquid Contour from Ruby Beauty',
        subtitle: 'Melts seamlessly into the skin to give you natural coverage and a lasting texture all day long.',
        titleAr: 'كونتور سائل مُجدد ومنحوت من روبي بيوتي',
        subtitleAr: 'يذوب بانسيابية على البشرة ليمنحك تغطية طبيعية وملمساً يدوم طوال اليوم',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8pRgU38opDPgidWmDRVHh18-R0XsEouLP3xdxsGLZz4BX3nQjc-9PXhgFNDVECMvP80S7ZtFmpA-QwwrnKgOR8B7WY0FlM3qJCAf1J8cxpwvyt6V15oxTZz-uhtroLEp-87KWQzsp-6-2mVURrFG_Q6mWjJ5YGqT0gqwmcLOPMK6pDk77rqmdXEvvM82qGkXdLNmSeXBPXY9j9zwnT_PjJ5YAOzWa2PqrFvo1SOjMCtz71ZHQraBSPlt7TKx00ccpwm4TTWoB6b0y",
        buttonText: t('home.shopNow'),
        link: "/products",
        badge: 'NEW COLLECTION',
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
            if (!banner.buttonText || banner.buttonText === 'Shop Now') {
                return t('home.shopNow');
            }
            return banner.buttonText;
        }
        return banner.buttonText || t('home.shopNow');
    };

    const displayBanners = banners && banners.length > 0 ? banners : [DEFAULT_BANNER];

    return (
        <section className="container-custom pt-4 md:pt-6 pb-4 md:pb-6 group hero-carousel">
            <div className="w-full relative">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#f8f3f4] dark:bg-[#1a1a1a] h-[450px] sm:h-[500px] md:h-[600px]">
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={displayBanners.length > 1}
                        speed={1000}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<span class="' + className + '"></span>';
                            },
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next-hero',
                            prevEl: '.swiper-button-prev-hero',
                        }}
                        className="h-full w-full"
                    >
                        {displayBanners.map((banner, index) => (
                            <SwiperSlide key={banner.id} className="h-full w-full relative">
                                {/* Background Image covering the whole container */}
                                <div className="absolute inset-0 w-full h-full">
                                    <img
                                        src={getSafeImageUrl(banner.image)}
                                        alt={getBannerTitle(banner)}
                                        className="w-full h-full object-cover object-center"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                    {/* Exact Gradient Overlay - Physical Left regardless of RTL */}
                                    {/* Exact Gradient Overlay - Focused more on the physical left */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#f8f3f4] via-[#f8f3f4]/90 via-[40%] to-transparent to-[70%] dark:from-[#1a1a1a] dark:via-[#1a1a1a]/90 dark:via-[40%] dark:to-transparent dark:to-[70%] pointer-events-none" />
                                </div>

                                {/* Content Overlay - Forced to the Physical Left */}
                                <div className={`relative z-10 h-full w-full flex items-center px-6 md:px-12 lg:px-20 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                                    {/* Content Block - Forced to the Physical Left with correct items alignment for RTL */}
                                    <div className={`animate-fadeInUp w-full max-w-[400px] md:max-w-xl flex flex-col ${dir === 'rtl' ? 'items-end' : 'items-start'} text-left`}>
                                        <span className="inline-block py-1.5 px-4 rounded bg-[#fde8ef] text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                                            {banner.badge || 'NEW COLLECTION'}
                                        </span>
                                        <h2 className="text-3xl lg:text-5xl font-bold leading-[1.3] mb-6 text-[#1a1a1a] dark:text-white text-left">
                                            {getBannerTitle(banner)}
                                        </h2>
                                        <p className="text-base lg:text-lg text-[#666666] dark:text-white/70 max-w-md mb-10 leading-relaxed font-medium text-left">
                                            {getBannerSubtitle(banner)}
                                        </p>
                                        <Link
                                            href={banner.link || "/products"}
                                            className={`px-10 py-4 bg-primary hover:opacity-90 text-white rounded-xl font-bold text-base transition-all flex items-center gap-3 w-fit group/btn shadow-lg active:scale-95`}
                                        >
                                            {dir === 'rtl' ? (
                                                <>
                                                    <MdArrowForward className="text-xl rotate-180 group-hover/btn:-translate-x-1 transition-transform" />
                                                    <span>{getBannerButtonText(banner)}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{getBannerButtonText(banner)}</span>
                                                    <MdArrowForward className="text-xl group-hover/btn:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons */}
                    <button className="swiper-button-prev-hero absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-90 opacity-0 group-hover:opacity-100">
                        <MdChevronLeft className="text-2xl" />
                    </button>
                    <button className="swiper-button-next-hero absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-90 opacity-0 group-hover:opacity-100">
                        <MdChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>

            <style jsx global>{`
                .hero-carousel .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: #d1d1d1;
                    opacity: 1;
                    transition: all 0.3s;
                    border-radius: 5px;
                }
                .hero-carousel .swiper-pagination-bullet-active {
                    width: 30px;
                    background: #ee2b6c !important;
                }
                .hero-carousel .swiper-pagination {
                    bottom: 30px !important;
                }
            `}</style>
        </section>
    );
};

export default HeroCarousel;
