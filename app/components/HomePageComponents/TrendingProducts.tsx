"use client";
import React, { useEffect, useState } from 'react';

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: string;
    images: string;
    categoryId: string;
    isTrending: boolean;
    stock: number;
}

const TrendingProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrendingProducts = async () => {
            try {
                const response = await fetch('/api/products/trending');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Error fetching trending products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingProducts();
    }, []);

    if (loading) {
        return (
            <section className="px-4 md:px-8 bg-white dark:bg-surface-dark py-16">
                <div className="max-w-[1200px] mx-auto flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </section>
        )
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="px-4 md:px-8 bg-white dark:bg-surface-dark py-16">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col items-center text-center mb-12">
                    <h3 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark mb-3">Trending Now</h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark max-w-lg">Our customers' most loved picks for the season. Get them while they're still in stock.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group flex flex-col gap-3">
                            <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-background-light dark:bg-background-dark">
                                {/* Only show "New" badge if it's very recently created? Or maybe we can just skip it for now unless specific logic. */}
                                {/* <div className="absolute top-3 left-3 z-10 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">New</div> */}

                                <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-black/40 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary text-text-main-light dark:text-white">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                                <div
                                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    style={{ backgroundImage: `url('${product.images}')` }}
                                ></div>
                                {/* Add to Cart Hover */}
                                <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <button className="w-full bg-text-main-light dark:bg-white text-white dark:text-text-main-light py-2.5 rounded-lg font-bold text-sm hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                                <div className="flex items-center gap-1">
                                    {/* Hardcoded stars for now as ratings aren't in DB yet */}
                                    <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">star</span>
                                    <span className="material-symbols-outlined text-yellow-400 text-[16px] fill-current">star_half</span>
                                    <span className="text-xs text-text-muted-light dark:text-text-muted-dark ml-1">(128)</span>
                                </div>
                                <h4 className="font-bold text-lg text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors line-clamp-1">{product.name}</h4>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-1">{product.description}</p>
                                <p className="font-bold text-lg text-primary mt-1">${Number(product.price).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;