import React from 'react';
import dynamic from 'next/dynamic';
import type { HomeBrand } from '@/lib/admin-actions';
import CategoriesRail from './CategoriesRail';

import FeaturedCollection from './FeaturedCollection';
import PromoBanner from './PromoBanner';
import CountdownOffer from './CountdownOffer';
import CategoryPills from './CategoryPills';
import TrendingWeekly from './TrendingWeekly';
import FeaturedCategoriesGrid from './FeaturedCategoriesGrid';
import CategoryHighlightCards from './CategoryHighlightCards';
import TestimonialsMasonry from './TestimonialsMasonry';

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

interface FeaturedCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    brandId: string;
    isFeatured: boolean;
}

interface MainProps {
    banners: Banner[];
    mainBrands: HomeBrand[];
    featuredNewArrivals: Product[];
    featuredBundles: Product[];
    featuredBestSellers: Product[];
    trendingWeekly: Product[];
    featuredCategories: FeaturedCategory[];
    settings: any;
}

const Main = async ({ banners, mainBrands, featuredNewArrivals, featuredBundles, featuredBestSellers, trendingWeekly, featuredCategories, settings }: MainProps) => {
    return (
        <main className="w-full flex flex-col pb-12">
            {/* 1. Hero Carousel Section */}
            <HeroCarousel banners={banners} />

            {/* 2. Categories Rail (Replaces Feature Bar) */}
            <CategoriesRail />

            {/* 3. Promo Banner (Moved up) */}
            <PromoBanner />



            <FeaturedCollection
                newArrivals={featuredNewArrivals}
                bundles={featuredBundles}
                bestSellers={featuredBestSellers}
            />

            {/* 6. Countdown Offer Section */}
            <CountdownOffer />

            {/* 7. Category Pills Section */}
            <CategoryPills />

            {/* 8. Category Highlight Cards - 4 tall brand cards */}
            <CategoryHighlightCards mainBrands={mainBrands} />

            {/* 9. Trending This Week - Horizontal Product Cards */}
            <TrendingWeekly products={trendingWeekly} />

            {/* 10. Featured Categories Grid - Hero + Category Cards */}
            <FeaturedCategoriesGrid categories={featuredCategories} />

            {/* 11. Testimonials Masonry */}
            <TestimonialsMasonry products={featuredBestSellers} />
        </main>
    );
};

export default Main;
