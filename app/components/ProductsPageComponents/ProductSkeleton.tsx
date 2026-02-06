import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="flex flex-col gap-3 animate-pulse">
            {/* Image Placeholder */}
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700"></div>

            <div className="flex flex-col gap-2">
                {/* Title Placeholder */}
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>

                {/* Price and Rating Placeholder */}
                <div className="flex items-center gap-2">
                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        ))}
                    </div>
                    <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
