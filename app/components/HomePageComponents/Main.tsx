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
    loading: () => <div className="h-[400px] animate-pulse bg-gray-100 dark:bg-white/5 rounded-2xl mx-4 my-8" />,
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

    // Preload the first banner image for LCP
    const firstBannerImage = banners[0]?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuB8pRgU38opDPgidWmDRVHh18-R0XsEouLP3xdxsGLZz4BX3nQjc-9PXhgFNDVECMvP80S7ZtFmpA-QwwrnKgOR8B7WY0FlM3qJCAf1J8cxpwvyt6V15oxTZz-uhtroLEp-87KWQzsp-6-2mVURrFG_Q6mWjJ5YGqT0gqwmcLOPMK6pDk77rqmdXEvvM82qGkXdLNmSeXBPXY9j9zwnT_PjJ5YAOzWa2PqrFvo1SOjMCtz71ZHQraBSPlt7TKx00ccpwm4TTWoB6b0y";

    return (
        <main className="w-full flex flex-col gap-8">
            {/* Preload link for LCP image */}
            <link
                 rel="preload"
                 href={firstBannerImage}
                 as="image"
                 imageSrcSet="(max-width: 768px) 100vw, 50vw"
             />
            
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