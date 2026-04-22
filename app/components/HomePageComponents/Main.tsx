import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';
import Categories from './Categories';
import TrendingProducts from './TrendingProducts';
import { getI18n } from '@/lib/i18n';

const HeroCarousel = dynamic(() => import('./HeroCarousel'), {
    ssr: true,
});

const OnSaleProducts = dynamic(() => import('./OnSaleProducts'), {
    loading: () => <div className="h-[400px] bg-gray-100 dark:bg-white/5 rounded-2xl mx-4 my-8" />,
    ssr: true,
});

// Remove Categories and TrendingProducts dynamic imports as they are now server components

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
    slug: string;
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

const Main = async ({ banners, categories, trendingProducts, onSaleProducts }: MainProps) => {
    const { t, dir, language } = await getI18n();

    return (
        <main className="w-full flex flex-col gap-8">
            {/* Hero Carousel Section */}
            <HeroCarousel banners={banners} />

            {/* On Sale Section */}
            <OnSaleProducts products={onSaleProducts} />

            {/* Categories Section */}
            <Categories categories={categories} t={t} dir={dir} />

            {/* Trending Products Section */}
            <TrendingProducts products={trendingProducts} />
        </main>
    );
};

export default Main;
