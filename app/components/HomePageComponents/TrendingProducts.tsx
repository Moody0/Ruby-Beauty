import React from 'react';
import ProductCard from '../ProductsPageComponents/ProductCard';
import ProductSkeleton from '../ProductsPageComponents/ProductSkeleton';
import Link from 'next/link';

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: number;
    images: string;
    categoryId: string;
    isTrending: boolean;
    stock: number;
}

const TrendingProducts = ({ products }: { products: Product[] }) => {

    if (!products || products.length === 0) {
        return null; // Or show message
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