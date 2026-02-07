import Link from 'next/link';
import React from 'react';
import Categories from './Categories';
import TrendingProducts from './TrendingProducts';
import HeroCarousel from './HeroCarousel';

interface Banner {
    id: string;
    title: string;
    subtitle: string | null;
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
}

const Main = ({ banners, categories, trendingProducts }: MainProps) => {
    return (
        <main className="w-full flex flex-col gap-16">
            {/* Hero Carousel Section */}
            <HeroCarousel banners={banners} />

            {/* Categories Section */}
            <Categories categories={categories} />

            {/* Trending Products Section */}
            <TrendingProducts products={trendingProducts} />
        </main>
    );
};

export default Main;