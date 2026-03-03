"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/autoplay";

interface ProductGalleryProps {
    images: string;
    isTrending: boolean;
}

const ProductGallery = ({ images, isTrending }: ProductGalleryProps) => {
    const allImages = images ? images.split(',').map((img: string) => img.trim()).filter(Boolean) : [];
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    if (allImages.length === 0) return null;

    return (
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 self-start h-fit w-full">
            {/* Main Image Slider */}
            <div className="relative w-full aspect-square max-w-[600px] mx-auto overflow-hidden rounded-2xl !bg-white group border border-[#e6dbdf] dark:border-gray-800/50 shadow-sm">
                <Swiper
                    spaceBetween={10}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Thumbs, Autoplay]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    className="h-full w-full !bg-white"
                >
                    {allImages.map((img, index) => (
                        <SwiperSlide key={`main-${index}`} className="!bg-white">
                            <div className="relative w-full h-full flex items-center justify-center p-6 md:p-8 !bg-white">
                                <img
                                    src={img}
                                    alt={`Product image ${index + 1}`}
                                    className="w-full h-full object-contain transition-all duration-500 group-hover:scale-[1.02]"
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                    {isTrending && (
                        <span className="bg-white/90 dark:bg-black/50 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-text-main dark:text-white shadow-sm">Trending</span>
                    )}
                </div>
            </div>

            {/* Thumbnails Slider - Only show if there are sub-images (total > 1) */}
            {allImages.length > 1 && (
                <div className="w-full">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={16}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Thumbs]}
                        className="thumbs-swiper w-full"
                    >
                        {allImages.map((img, index) => (
                            <SwiperSlide key={`thumb-${index}`}>
                                <div
                                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all [&.swiper-slide-thumb-active]:border-primary !bg-white"
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-contain p-2"
                                        loading="lazy"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            <style jsx global>{`
                .thumbs-swiper .swiper-slide {
                    opacity: 0.6;
                    transition: opacity 0.3s;
                }
                .thumbs-swiper .swiper-slide-thumb-active {
                    opacity: 1;
                }
                .thumbs-swiper .swiper-slide-thumb-active > div {
                    border-color: var(--primary-color, #ee2b6c);
                }
            `}</style>
        </div>
    );
};

export default ProductGallery;
