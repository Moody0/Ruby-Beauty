"use client";

import React, { useState, useEffect } from "react";

interface ProductGalleryProps {
    images: string;
    subImage1?: string | null;
    subImage2?: string | null;
    isTrending: boolean;
}

const ProductGallery = ({ images, subImage1, subImage2, isTrending }: ProductGalleryProps) => {
    const mainImage = images.split(',')[0];
    const [selectedImage, setSelectedImage] = useState(mainImage);

    // Update selected image if props change
    useEffect(() => {
        setSelectedImage(mainImage);
    }, [mainImage]);

    // Collect all available images
    const allImages = [mainImage];
    if (subImage1) allImages.push(subImage1);
    if (subImage2) allImages.push(subImage2);

    return (
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 self-start h-fit">
            <div className="relative aspect-square md:aspect-3/3 w-full overflow-hidden rounded-2xl bg-[#f0eff0] dark:bg-white/5 group">
                <div
                    className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${selectedImage}')` }}
                >
                </div>
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isTrending && (
                        <span className="bg-white/90 dark:bg-black/50 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-text-main dark:text-white shadow-sm">Trending</span>
                    )}
                </div>
            </div>

            {/* Thumbnails - Only show if there are sub-images (total > 1) */}
            {allImages.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                    {allImages.map((img, index) => (
                        <div 
                            key={index} 
                            className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === img ? 'border-primary' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
                            onClick={() => setSelectedImage(img)}
                        >
                            <div 
                                className="absolute inset-0 bg-center bg-cover"
                                style={{ backgroundImage: `url('${img}')` }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
