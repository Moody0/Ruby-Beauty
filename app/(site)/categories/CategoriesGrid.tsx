"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Category {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
}

interface CategoriesGridProps {
    categories: Category[];
}

const CategoriesGrid = ({ categories }: CategoriesGridProps) => {
    const [displayLimit, setDisplayLimit] = useState(6);
    const defaultImage = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800';

    const visibleCategories = categories.slice(0, displayLimit);
    const hasMore = categories.length > displayLimit;

    const handleLoadMore = () => {
        setDisplayLimit(prev => prev + 6);
    };

    return (
        <section className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {visibleCategories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        className="group flex flex-col gap-5 p-2 rounded-2xl bg-surface-light dark:bg-surface-dark border border-transparent hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all animate-in fade-in zoom-in-95 duration-500"
                    >
                        <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-background-light dark:bg-background-dark">
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url('${category.image || defaultImage}')` }}
                            ></div>
                        </div>
                        <div className="px-4 pb-4">
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">{category.name}</h3>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1 italic font-medium">{category.description || 'Premium collection'}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {hasMore && (
                <div className="mt-16 flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        className="group relative px-10 py-4 bg-surface-light dark:bg-surface-dark border border-[#e6dbdf] dark:border-gray-700 rounded-full font-bold text-sm text-text-main-light dark:text-white hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                        Load More Categories
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-y-1 transition-transform">expand_more</span>
                    </button>
                </div>
            )}
        </section>
    );
};

export default CategoriesGrid;
