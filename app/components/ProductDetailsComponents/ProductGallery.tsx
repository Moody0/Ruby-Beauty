"use client";

import React, { useState } from "react";

interface ProductGalleryProps {
    images: string;
    isTrending: boolean;
}

const ProductGallery = ({ images, isTrending }: ProductGalleryProps) => {
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
                    {isTrending && (
                        <span className="bg-white/90 dark:bg-black/50 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-text-main dark:text-white shadow-sm">Trending</span>
                    )}
                </div>
            </div>

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
        </div>
    );
};

export default ProductGallery;
