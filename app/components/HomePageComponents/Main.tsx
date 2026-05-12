import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MdChevronLeft } from 'react-icons/md';
import Categories from './Categories';
import CollectionShowcase from './CollectionShowcase';
import TrendingProducts from './TrendingProducts';
import MainBrands from './MainBrands';
import { getI18n } from '@/lib/i18n';
import type { HomeBrand, HomeCollectionSection } from '@/lib/admin-actions';

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
    brand?: {
        id: string;
        name: string;
        slug: string;
        group?: string;
    } | null;
}

interface MainProps {
    banners: Banner[];
    categories: Category[];
    collectionSections: HomeCollectionSection[];
    mainBrands: HomeBrand[];
    trendingProducts: Product[];
    onSaleProducts: Product[];
}

const MiddleBanner1 = ({ banners }: { banners: Banner[] }) => {
    const banner = banners.find(b => 
        (b.badge?.toLowerCase().includes('middle') && b.badge?.includes('1')) || 
        (b.title?.toLowerCase().includes('middle') && b.title?.includes('1'))
    );
    if (!banner) return null;
    return (
        <div className="container-custom py-4">
            <Link href={banner.link || '#'}>
                <div className="relative w-full rounded-2xl overflow-hidden aspect-[21/9] md:aspect-[4/1] shadow-sm">
                    <img src={banner.image} alt={banner.title || 'Ad Banner'} className="w-full h-full object-cover" />
                </div>
            </Link>
        </div>
    );
};

const MiddleBanner2 = ({ banners }: { banners: Banner[] }) => {
    const banner = banners.find(b => 
        (b.badge?.toLowerCase().includes('middle') && b.badge?.includes('2')) || 
        (b.title?.toLowerCase().includes('middle') && b.title?.includes('2'))
    );
    if (!banner) return null;
    return (
        <div className="container-custom py-4">
            <Link href={banner.link || '#'}>
                <div className="relative w-full rounded-2xl overflow-hidden aspect-[21/9] md:aspect-[4/1] shadow-sm">
                    <img src={banner.image} alt={banner.title || 'Ad Banner'} className="w-full h-full object-cover" />
                </div>
            </Link>
        </div>
    );
};

const Main = async ({ banners, categories, collectionSections, mainBrands, trendingProducts, onSaleProducts }: MainProps) => {
    const { t, dir, language } = await getI18n();

    return (
        <main className="w-full flex flex-col gap-2 md:gap-4 pb-12">
            {/* Hero Carousel Section */}
            <HeroCarousel banners={banners} />

            {/* Trending Products Section */}
            <TrendingProducts products={trendingProducts} />

            {/* Middle Banner 1 */}
            <MiddleBanner1 banners={banners} />

            {/* Main Brands Section */}
            <MainBrands brands={mainBrands} t={t} dir={dir} />

            {/* Middle Banner 2 */}
            <MiddleBanner2 banners={banners} />

            {/* On Sale Section / Daily Offers */}
            <OnSaleProducts products={onSaleProducts} />

            {/* Collection Showcase / Categories Fallback */}
            {collectionSections.length > 0 ? (
                <CollectionShowcase sections={collectionSections} t={t} dir={dir} language={language} />
            ) : (
                <Categories categories={categories} t={t} dir={dir} />
            )}
        </main>
    );
};

export default Main;
