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
    settings: any;
}

const MiddleBanner1 = ({ settings }: { settings: any }) => {
    const image = settings?.middleBanner1Image;
    const link = settings?.middleBanner1Link;

    if (!image) return null;

    const content = (
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl group">
            <div className="aspect-[21/7] md:aspect-[21/6] w-full">
                <img 
                    src={image} 
                    alt="Ad Banner" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
            </div>
        </div>
    );

    return (
        <section className="container-custom py-4">
            {link ? (
                <Link href={link}>
                    {content}
                </Link>
            ) : (
                content
            )}
        </section>
    );
};

const MiddleBanner2 = ({ settings, language }: { settings: any, language: string }) => {
    const image = settings?.middleBanner2Image;
    const link = settings?.middleBanner2Link;
    const title = language === 'ar' ? settings?.middleBanner2TitleAr : settings?.middleBanner2Title;
    const subtitle = language === 'ar' ? settings?.middleBanner2SubtitleAr : settings?.middleBanner2Subtitle;
    const buttonText = language === 'ar' ? settings?.middleBanner2ButtonTextAr : settings?.middleBanner2ButtonText;

    if (!image) return null;

    const content = (
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl group">
            <div className="aspect-[21/7] md:aspect-[21/6] w-full">
                <img 
                    src={image} 
                    alt={title || 'Ad Banner'} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
            </div>
            
            {/* Content Overlay */}
            {(title || subtitle) && (
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
                    <div className="max-w-md space-y-2 md:space-y-4">
                        {title && (
                            <h3 className="text-2xl md:text-4xl font-bold leading-tight">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="text-sm md:text-lg text-white/90 line-clamp-2">
                                {subtitle}
                            </p>
                        )}
                        {buttonText && (
                            <div className="pt-2 md:pt-4">
                                <span className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-base transition-all transform group-hover:translate-y-[-2px] shadow-lg">
                                    {buttonText}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <section className="container-custom py-4">
            {link ? (
                <Link href={link}>
                    {content}
                </Link>
            ) : (
                content
            )}
        </section>
    );
};

const Main = async ({ banners, categories, collectionSections, mainBrands, trendingProducts, onSaleProducts, settings }: MainProps) => {
    const { t, dir, language } = await getI18n();

    return (
        <main className="w-full flex flex-col gap-2 md:gap-4 pb-12">
            {/* Hero Carousel Section */}
            <HeroCarousel banners={banners} />

            {/* Trending Products Section */}
            <TrendingProducts products={trendingProducts} />

            {/* Middle Banner 1 - After Trending */}
            <MiddleBanner1 settings={settings} />

            {/* Main Brands Section */}
            <MainBrands brands={mainBrands} />

            {/* Middle Banner 2 - After Brands */}
            <MiddleBanner2 settings={settings} language={language} />

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
