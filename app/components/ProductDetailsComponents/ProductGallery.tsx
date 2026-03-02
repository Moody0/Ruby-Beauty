"use client";

<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
>>>>>>> a19576317a12ff361fa14bd438f06655de705684

interface ProductGalleryProps {
    images: string;
    isTrending: boolean;
}

const ProductGallery = ({ images, isTrending }: ProductGalleryProps) => {
<<<<<<< HEAD
    const defaultImage = "/placeholder-image.jpg";
    const imageList = images && typeof images === "string"
        ? images.split(",").map(url => url.trim()).filter(url => url.length > 0)
        : [defaultImage];

    const [mainImage, setMainImage] = useState(imageList[0] || defaultImage);

    return (
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 self-start h-fit w-full">
            <div className="relative aspect-square md:aspect-4/5 w-full overflow-hidden rounded-2xl bg-[#f0eff0] dark:bg-white/5 group">
                <img
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    src={mainImage}
                    alt="Product main image"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
=======
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
                                <Image
                                    src={img}
                                    alt={`Product image ${index + 1}`}
                                    className="object-contain transition-all duration-500 group-hover:scale-[1.02]"
                                    fill
                                    sizes="100vw"
                                    priority={index === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
>>>>>>> a19576317a12ff361fa14bd438f06655de705684
                    {isTrending && (
                        <span className="bg-white/90 dark:bg-black/50 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-text-main dark:text-white shadow-sm">Trending</span>
                    )}
                </div>
            </div>

<<<<<<< HEAD
            {imageList.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
                    {imageList.map((imgUrl, index) => (
                        <button
                            key={index}
                            onClick={() => setMainImage(imgUrl)}
                            className={`relative aspect-square overflow-hidden rounded-xl bg-[#f0eff0] dark:bg-white/5 border-2 transition-all ${mainImage === imgUrl ? 'border-primary' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
                        >
                            <img
                                className="w-full h-full object-contain"
                                src={imgUrl}
                                alt={`Product thumbnail ${index + 1}`}
                            />
                        </button>
                    ))}
                </div>
            )}
=======
            {/* Thumbnails Slider - Only show if there are sub-images (total > 1) */}
            {allImages.length > 1 && (
                <div className="w-full">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={16}
                        slidesPerView={3}
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
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="object-contain p-2"
                                        fill
                                        sizes="100px"
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
                    border-color: var(--primary-color, #e91e63);
                }
            `}</style>
>>>>>>> a19576317a12ff361fa14bd438f06655de705684
        </div>
    );
};

export default ProductGallery;
