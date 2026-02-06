"use client";
import React, { useEffect, useState } from 'react';

import ProductCard from '../ProductsPageComponents/ProductCard';
import ProductSkeleton from '../ProductsPageComponents/ProductSkeleton';
import Link from 'next/link';

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
            <section className="px-4 md:px-8  dark:bg-background-dark py-16">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col items-center text-center mb-12">
                        <h3 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark mb-3">Trending Now</h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark max-w-lg">Our customers&apos; most loved picks for the season. Get them while they&apos;re still in stock.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
        <section className="px-6 md:px-20 lg:px-32 xl:px-48 2xl:px-64  dark:bg-background-dark py-16">
            <div className="w-full">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Trending Now</h3>
                    <Link className="text-primary font-medium text-sm flex items-center gap-1 " href="/products">
                        View all <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;