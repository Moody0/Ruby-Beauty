import React from 'react';
import dynamic from 'next/dynamic';
import type { HomeBrand } from '@/lib/admin-actions';
import CategoriesRail from './CategoriesRail';

import FeaturedCollection from './FeaturedCollection';
import PromoBanner from './PromoBanner';
import CountdownOffer from './CountdownOffer';
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

            {/* 2. Main Categories (10x Better UI/UX) */}
            <CategoryHighlightCards mainBrands={mainBrands} />

            {/* 3. First Ad */}
            <PromoBanner />

            {/* 4. الجديد والمحبوب (New Arrivals & Best Sellers) */}
            <FeaturedCollection
                newArrivals={featuredNewArrivals}
                bundles={featuredBundles}
                bestSellers={featuredBestSellers}
            />

            {/* 5. Categories Rail (Custom Static List) */}
            <CategoriesRail />

            {/* 6. Trending This Week - Horizontal Product Cards */}
            <TrendingWeekly products={trendingWeekly} />

            {/* 7. Countdown Offer Section */}
            <CountdownOffer />

            {/* 8. Testimonials Masonry */}
            <TestimonialsMasonry products={featuredBestSellers} />
        </main>
    );
};

export default Main;
