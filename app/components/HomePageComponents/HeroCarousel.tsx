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
    const wrapperRef = React.useRef<HTMLElement>(null);
    
    const DEFAULT_BANNER: Banner = {
        id: 'default',
        title: 'Flash Sale 50% Off',
        subtitle: 'Pamper yourself with beauty you love. Enjoy discounts up to 50% for a limited time this week.',
        titleAr: 'خصم حتى ٥٠٪',
        subtitleAr: 'دلعي نفسك بجمال تحبينه. استمتعي بخصومات تصل إلى ٥٠٪ لفترة محدودة هذا الأسبوع',
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8pRgU38opDPgidWmDRVHh18-R0XsEouLP3xdxsGLZz4BX3nQjc-9PXhgFNDVECMvP80S7ZtFmpA-QwwrnKgOR8B7WY0FlM3qJCAf1J8cxpwvyt6V15oxTZz-uhtroLEp-87KWQzsp-6-2mVURrFG_Q6mWjJ5YGqT0gqwmcLOPMK6pDk77rqmdXEvvM82qGkXdLNmSeXBPXY9j9zwnT_PjJ5YAOzWa2PqrFvo1SOjMCtz71ZHQraBSPlt7TKx00ccpwm4TTWoB6b0y",
        buttonText: language === 'ar' ? 'وفري' : 'Save',
        link: "/products",
        badge: language === 'ar' ? 'عرض الويك اند' : 'Weekend Offer',
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
                return 'وفري';
            }
            return banner.buttonText;
        }
        return banner.buttonText || 'Save';
    };

    const displayBanners = banners && banners.length > 0 ? banners : [DEFAULT_BANNER];

    return (
        <section ref={wrapperRef} className="container-custom pt-4 md:pt-6 pb-4 md:pb-6 group hero-carousel">
            <div className="w-full relative">
                {/* Responsive Height: 776px on mobile, 500-600px on desktop */}
                <div className="relative overflow-hidden rounded-[10px] bg-[#FAECE8] dark:bg-[#1a1a1a] h-[776px] md:h-[500px] lg:h-[600px]">
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
                        onAutoplayTimeLeft={(swiper, time, progress) => {
                            if (wrapperRef.current) {
                                wrapperRef.current.style.setProperty('--autoplay-progress', `${(1 - progress) * 100}%`);
                            }
                        }}
                        pagination={{
                            el: '.hero-swiper-pagination',
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
                            <SwiperSlide key={banner.id} className="h-full w-full">
                                <div className="flex flex-col md:flex-row rtl:md:flex-row-reverse h-full w-full">
                                    
                                    {/* Image Container - Left side on desktop */}
                                    <div className="w-full h-[55%] md:h-full md:w-1/2 relative shrink-0">
                                        <img
                                            src={getSafeImageUrl(banner.image)}
                                            alt={getBannerTitle(banner)}
                                            className="w-full h-full object-cover object-center"
                                            loading={index === 0 ? "eager" : "lazy"}
                                        />
                                    </div>

                                    {/* Content Container - Solid Right side on desktop */}
                                    <div className="relative z-10 w-full h-[45%] md:h-full md:w-1/2 flex flex-col items-center justify-center text-center px-6 py-6 pb-16 md:px-12 lg:px-20 bg-[#FAECE8] dark:bg-[#1a1a1a]">
                                        <div className="animate-fadeInUp w-full max-w-[320px] md:max-w-md flex flex-col items-center text-center">
                                            

                                            
                                            {/* Title */}
                                            <h2 className="text-[40px] md:text-[42px] lg:text-5xl font-bold leading-[1.2] mb-3 md:mb-6 text-[#072835] dark:text-[#072835] md:dark:text-white">
                                                {getBannerTitle(banner)}
                                            </h2>
                                            
                                            {/* Description */}
                                            <p className="text-[14px] md:text-base lg:text-lg text-[#555] md:text-[#666] md:dark:text-white/70 mb-6 md:mb-10 leading-relaxed font-medium">
                                                {getBannerSubtitle(banner)}
                                            </p>
                                            
                                            {/* Button */}
                                            <Link
                                                href={banner.link || "/products"}
                                                className="px-8 py-3 bg-black text-white hover:bg-white hover:text-black border border-transparent hover:border-black rounded-full font-bold text-[15px] md:text-base transition-all flex items-center justify-center gap-3 w-fit group/btn shadow-lg active:scale-95"
                                            >
                                                <span>{getBannerButtonText(banner)}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation and Pagination Group - Always Bottom Right corner */}
                    <div className="absolute bottom-6 right-6 z-20 flex items-center pointer-events-none">
                        
                        <button className="swiper-button-prev-hero pointer-events-auto flex items-center justify-center text-[#4A4A4A] hover:text-black transition-colors mr-2">
                            <svg className="w-4 h-4 rtl:scale-x-[-1]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 16.25L6.25 10L12.5 3.75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>

                        <div className="hero-swiper-pagination pointer-events-auto flex items-center justify-center" />

                        <button className="swiper-button-next-hero pointer-events-auto flex items-center justify-center text-[#4A4A4A] hover:text-black transition-colors ml-2">
                            <svg className="w-4 h-4 rtl:scale-x-[-1]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .hero-carousel .swiper-pagination-bullet {
                    width: 7px;
                    height: 7px;
                    background: #A89D9F;
                    opacity: 1;
                    transition: all 0.3s;
                    border-radius: 99px;
                    margin: 0 4px !important;
                }
                .hero-carousel .swiper-pagination-bullet-active {
                    width: 48px;
                    background: #D9CDD1 !important;
                    position: relative;
                    overflow: hidden;
                }
                .hero-carousel .swiper-pagination-bullet-active::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    width: var(--autoplay-progress, 0%);
                    background: #333333;
                    border-radius: 99px;
                }
                [dir="rtl"] .hero-carousel .swiper-pagination-bullet-active::after {
                    left: auto;
                    right: 0;
                }
            `}</style>
        </section>
    );
};

export default HeroCarousel;
