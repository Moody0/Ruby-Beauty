import React from "react";

interface ProductGalleryProps {
    images: string;
    isTrending: boolean;
}

const ProductGallery = ({ images, isTrending }: ProductGalleryProps) => {
    return (
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 self-start h-fit">
            {/* Main Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#f0eff0] dark:bg-white/5 group">
                <div
                    className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${images}')` }}
                >
                </div>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isTrending && (
                        <span className="bg-white/90 dark:bg-black/50 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-text-main dark:text-white shadow-sm">Trending</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;
