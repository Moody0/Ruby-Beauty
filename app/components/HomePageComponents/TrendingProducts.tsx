import React from 'react';
import ProductCard from '../ProductsPageComponents/ProductCard';
import Link from 'next/link';
import { MdChevronRight } from 'react-icons/md';

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: number;
    discountPrice?: number | null;
    images: string;
    categoryId: string;
    isTrending: boolean;
    stock: number;
}

interface TrendingProductsProps {
    products: Product[];
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
    language: 'en' | 'ar';
}

const TrendingProducts = ({ products, t, dir, language }: TrendingProductsProps) => {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="container-custom py-8 md:py-10 transition-all duration-300">
            <div className="w-full">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-text-main-light dark:text-text-main-dark">{t('home.trendingNow')}</h3>
                    <Link className="text-primary font-medium text-sm flex items-center gap-1 " href="/products">
                        {t('common.viewAll')} <MdChevronRight className={`text-sm ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} t={t} language={language} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
