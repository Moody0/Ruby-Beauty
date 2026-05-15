'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import ResilientImage from '@/app/components/ResilientImage';

interface HomeBrand {
    id: string;
    name: string;
    slug: string;
    image: string | null;
}

interface CategoryHighlightCardsProps {
    mainBrands: HomeBrand[];
}

/*
 * Each card matches the scroll.html reference:
 *  - A tall image (3:4) with dark overlay
 *  - Subheading + heading at the TOP of the card
 *  - Mini product row at the BOTTOM (overlaid on image) with thumbnail, name, price, button
 */
const CARD_DATA = [
    {
        slug: 'ruby-beauty',
        subheadingAr: 'مجموعة',
        subheadingEn: 'Collection',
        headingAr: 'الحجم الصغير و الاساسية',
        headingEn: 'Mini & Essentials',
        productNameAr: 'الروتين السهل',
        productNameEn: 'The Clear Routine',
        priceText: 'ل.س ٧٨٥.٤٠',
        oldPriceText: 'SYP 939.00',
        btnAr: 'اشتري',
        btnEn: 'Buy',
        heroImage: 'https://sourcebeauty.com/cdn/shop/files/The-Clear-Routine-source-beauty-egypt_1d0c19ab-dd70-46cd-aa95-4ce07258d6dd.png?v=1778661109&width=750',
        productThumb: 'https://sourcebeauty.com/cdn/shop/files/The-Clear-Routine-source-beauty-egypt.png?v=1778060994&width=140',
    },
    {
        slug: 'perfumes',
        subheadingAr: 'برفان',
        subheadingEn: 'Perfume',
        headingAr: 'رائحة الورد الخفيفة',
        headingEn: 'Light Rose Scent',
        productNameAr: 'برفان المسك الخشبي',
        productNameEn: 'Woody Musk Perfume',
        priceText: 'ل.س ٤٧٥.٠٠',
        oldPriceText: '',
        btnAr: 'تسوقي',
        btnEn: 'Shop',
        heroImage: 'https://sourcebeauty.com/cdn/shop/files/Source-beauty-perfumes-product-highlight-Homepage-Section_93e68752-6b29-473b-929f-1fb225fb5705_1.webp?v=1774954702&width=750',
        productThumb: 'https://sourcebeauty.com/cdn/shop/files/Woody-Musk-Perfume-New-Packaging-Source-Beauty-Egypt.png?v=1760867648&width=140',
    },
    {
        slug: 'makeup',
        subheadingAr: 'كريم للشمس',
        subheadingEn: 'Sunscreen',
        headingAr: 'حماية من الشمس',
        headingEn: 'Sun Protection',
        productNameAr: 'جل واقي شمس سوبر شير ١+١',
        productNameEn: 'Super Sheer Sunscreen Gel',
        priceText: 'ل.س ٤٧٥.٠٠',
        oldPriceText: '',
        btnAr: 'Shop',
        btnEn: 'Shop',
        heroImage: 'https://sourcebeauty.com/cdn/shop/files/Nano-treat-products-highlight.webp?v=1777581882&width=750',
        productThumb: 'https://sourcebeauty.com/cdn/shop/files/NanoTreat-Super-Sheer-SunScreen-Gel-Offer-For-1_1-Free-Source-Beauty-Egypt.png?v=1774880845&width=140',
    },
    {
        slug: 'accessories',
        subheadingAr: 'اكسسوارات',
        subheadingEn: 'Accessories',
        headingAr: 'لمسة من الأناقة',
        headingEn: 'A Touch of Elegance',
        priceText: '',
        oldPriceText: '',
        btnAr: 'إشتري',
        btnEn: 'Buy',
        heroImage: 'https://sourcebeauty.com/cdn/shop/files/Fino-products-highlight.webp?v=1774954050&width=750',
        productThumb: 'https://sourcebeauty.com/cdn/shop/files/Fino-Premium-Touch-moist-repair-Shampoo-550ml-Moisturizing-source-beauty-egypt_a1309549-dc8b-4a7c-a1e8-9c5b29f7bbb5.png?v=1755009326&width=140',
    },
    {
        slug: 'watches',
        subheadingAr: 'ساعات',
        subheadingEn: 'Watches',
        headingAr: 'تألقي في كل وقت',
        headingEn: 'Shine Every Time',
        priceText: '',
        oldPriceText: '',
        btnAr: 'تسوقي',
        btnEn: 'Shop',
        heroImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
        productThumb: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=140',
    },
];

const CategoryHighlightCards = ({ mainBrands }: CategoryHighlightCardsProps) => {
    const { language } = useLanguage();

    if (!mainBrands || mainBrands.length === 0) {
        return null;
    }

    const localizedNames: Record<string, { en: string; ar: string }> = {
        'ruby-beauty': { en: 'Ruby Beauty', ar: 'روبي بيوتي' },
        'makeup': { en: 'Makeup', ar: 'مكياج' },
        'perfumes': { en: 'Perfumes', ar: 'عطور' },
        'accessories': { en: 'Accessories', ar: 'اكسسوارات' },
        'watches': { en: 'Watches', ar: 'ساعات' },
    };

    // Desired exact order matching "Shop By Category" (تسوقي حسب الفئة)
    const categoryOrder = ['ruby-beauty', 'accessories', 'watches', 'makeup'];

    return (
        <section className="w-full py-8 md:py-10" style={{ padding: '32px 20px' }}>
            <div className="flex gap-3 md:gap-1.5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:overflow-visible">
                {categoryOrder.map((slug) => {
                    const brand = mainBrands.find(b => b.slug === slug);
                    const card = CARD_DATA.find(c => c.slug === slug);
                    
                    const categoryName = language === 'ar'
                        ? localizedNames[slug]?.ar || brand?.name || slug
                        : localizedNames[slug]?.en || brand?.name || slug;

                    const heroImage = brand?.image || card?.heroImage || 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800';

                    // Fallbacks for data if not in CARD_DATA
                    const subheadingAr = card?.subheadingAr || 'فئة';
                    const subheadingEn = card?.subheadingEn || 'Category';
                    const headingAr = card?.headingAr || brand?.name || categoryName;
                    const headingEn = card?.headingEn || brand?.name || categoryName;

                    return (
                        <Link
                            key={slug}
                            href={`/brands/${slug}`}
                            className="group relative flex-none w-[292px] md:w-auto md:flex-1 min-w-0 rounded-[10px] overflow-hidden snap-start"
                        >
                            {/* Image with 3:4 aspect ratio */}
                            <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                                <ResilientImage
                                    src={heroImage}
                                    alt={language === 'ar' ? headingAr : headingEn}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    loading="lazy"
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />

                                {/* Top content: subheading + heading */}
                                <div className="absolute top-0 inset-x-0 p-4 md:p-5 z-10">
                                    <p className="text-[10px] md:text-xs font-medium text-white/90 mb-1 uppercase tracking-wider drop-shadow-sm">
                                        {language === 'ar' ? subheadingAr : subheadingEn}
                                    </p>
                                    <h3 className="text-sm md:text-lg lg:text-xl font-bold text-white leading-snug drop-shadow-md">
                                        {language === 'ar' ? headingAr : headingEn}
                                    </h3>
                                </div>

                                {/* Bottom category section strip (overlaid on image) */}
                                <div className="absolute bottom-0 inset-x-0 p-2 md:p-3 z-10">
                                    <div className="flex items-center justify-between gap-2 bg-white/95 backdrop-blur-sm rounded-[8px] px-3 py-2.5 md:py-3 shadow-sm transition-all duration-300 group-hover:bg-white">
                                        {/* Category Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] md:text-sm font-bold text-[#1a1a1a] truncate leading-tight uppercase tracking-tight">
                                                {categoryName}
                                            </p>
                                        </div>

                                        {/* Explore Link */}
                                        <div className={`shrink-0 flex items-center gap-1 text-[#1a1a1a] transition-transform duration-300 ${language === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                                            <span className="text-[10px] md:text-xs font-bold whitespace-nowrap">
                                                {language === 'ar' ? 'اكتشفي الآن' : 'Explore Now'}
                                            </span>
                                            <svg className={`w-3.5 h-3.5 md:w-4 md:h-4 ${language === 'ar' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoryHighlightCards;
