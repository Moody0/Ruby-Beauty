import React from 'react';
import dynamic from 'next/dynamic';
import type { HomeBrand } from '@/lib/admin-actions';
import CategoriesRail from './CategoriesRail';
import ShopByCategory from './ShopByCategory';
import FeaturedCollection from './FeaturedCollection';
import PromoBanner from './PromoBanner';
import CountdownOffer from './CountdownOffer';

const HeroCarousel = dynamic(() => import('./HeroCarousel'), {
    ssr: true,
});

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
    brand?: {
        id: string;
        name: string;
        slug: string;
        group?: string;
    } | null;
}

interface MainProps {
    banners: Banner[];
    mainBrands: HomeBrand[];
    featuredNewArrivals: Product[];
    featuredBundles: Product[];
    featuredBestSellers: Product[];
    settings: any;
}

const Main = async ({ banners, mainBrands, featuredNewArrivals, featuredBundles, featuredBestSellers, settings }: MainProps) => {
    return (
        <main className="w-full flex flex-col pb-12">
            {/* 1. Hero Carousel Section */}
            <HeroCarousel banners={banners} />

            {/* 2. Categories Rail (Replaces Feature Bar) */}
            <CategoriesRail />

            {/* 3. Promo Banner (Moved up) */}
            <PromoBanner />

            {/* 4. Shop by Category - 4 cards (Ruby Beauty, Makeup, Perfumes, Accessories) */}
            <ShopByCategory mainBrands={mainBrands} />

            <FeaturedCollection
                newArrivals={featuredNewArrivals}
                bundles={featuredBundles}
                bestSellers={featuredBestSellers}
            />

            {/* 6. Countdown Offer Section */}
            <CountdownOffer />
        </main>
    );
};

export default Main;
