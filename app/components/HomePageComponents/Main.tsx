import React from 'react';
import dynamic from 'next/dynamic';
import type { HomeBrand } from '@/lib/admin-actions';
import FeatureBar from './FeatureBar';
import ShopByCategory from './ShopByCategory';
import BestSellers from './BestSellers';
import PromoBanner from './PromoBanner';

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
    bestSellerProducts: Product[];
    settings: any;
}

const Main = async ({ banners, mainBrands, bestSellerProducts, settings }: MainProps) => {
    return (
        <main className="w-full flex flex-col pb-12">
            {/* 1. Hero Carousel Section */}
            <HeroCarousel banners={banners} />

            {/* 2. Feature Bar - 4 icons */}
            <FeatureBar />

            {/* 3. Shop by Category - 4 cards (Ruby Beauty, Makeup, Perfumes, Accessories) */}
            <ShopByCategory mainBrands={mainBrands} />

            {/* 4. Best Sellers (الأكثر مبيعاً) */}
            <BestSellers products={bestSellerProducts} />

            {/* 5. Promo Banner (خصومات تصل إلى 30%) */}
            <PromoBanner />
        </main>
    );
};

export default Main;
