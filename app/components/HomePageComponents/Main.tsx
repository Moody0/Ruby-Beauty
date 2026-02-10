import Link from 'next/link';
import React from 'react';
import Categories from './Categories';
import TrendingProducts from './TrendingProducts';
import HeroCarousel from './HeroCarousel';
import OnSaleProducts from './OnSaleProducts';

interface Banner {
    id: string;
    title: string | null;
    subtitle: string | null;
    titleAr: string | null;
    subtitleAr: string | null;
    image: string;
    buttonText: string | null;
    link: string | null;
    badge: string | null;
    isActive: boolean;
}

interface Category {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
}

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: number;
    discountPrice?: number | null;
    images: string;
    categoryId: string;
    stock: number;
    isTrending: boolean;
    category: {
        name: string;
    } | null;
}

interface MainProps {
    banners: Banner[];
    categories: Category[];
    trendingProducts: Product[];
    onSaleProducts: Product[];
}

const Main = ({ banners, categories, trendingProducts, onSaleProducts }: MainProps) => {
    return (
        <main className="w-full flex flex-col gap-16">
            {/* Hero Carousel Section */}
            <HeroCarousel banners={banners} />

            {/* On Sale Section */}
            <OnSaleProducts products={onSaleProducts} />

            {/* Categories Section */}
            <Categories categories={categories} />

            {/* Trending Products Section */}
            <TrendingProducts products={trendingProducts} />
        </main>
    );
};

export default Main;