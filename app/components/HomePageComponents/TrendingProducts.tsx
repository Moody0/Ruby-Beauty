"use client";
import React, { useEffect, useState } from 'react';

import ProductCard from '../ProductsPageComponents/ProductCard';
import ProductSkeleton from '../ProductsPageComponents/ProductSkeleton';

interface Product {
    id: string;
    slug: string;
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
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col items-center text-center mb-12">
                        <h3 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark mb-3">Trending Now</h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark max-w-lg">Our customers' most loved picks for the season. Get them while they're still in stock.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
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
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;