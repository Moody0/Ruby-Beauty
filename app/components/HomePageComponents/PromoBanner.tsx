'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

const PromoBanner = () => {
    const { t, dir } = useLanguage();

    return (
        <section className="container-custom py-8 md:py-12">
            <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-[#fce7ed] dark:bg-[#2d161e] min-h-[140px] md:h-[180px] flex items-center px-6 md:px-16">

                {/* Content Container */}
                <div className={`w-full flex items-center justify-between z-10 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>

                    {/* 1. Button (Far left in RTL) */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/products"
                            className="px-8 md:px-12 py-3 md:py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-base md:text-lg transition-all shadow-md active:scale-95 whitespace-nowrap"
                        >
                            {dir === 'rtl' ? 'تسوقي الآن' : 'Shop Now'}
                        </Link>
                    </div>

                    {/* 2. Text Content (Middle) */}
                    <div className={`flex flex-col flex-grow px-8 md:px-16 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] dark:text-white mb-1">
                            {dir === 'rtl' ? 'خصومات تصل إلى 30%' : 'Discounts up to 30%'}
                        </h2>
                        <p className="text-sm md:text-lg text-[#666666] dark:text-white/80 font-medium">
                            {dir === 'rtl' ? 'على مجموعة مختارة من المنتجات' : 'On a selected range of products'}
                        </p>
                    </div>

                    {/* 3. Image (Far right in RTL) */}
                    <div className="flex-shrink-0 w-32 md:w-64 h-32 md:h-64 relative -my-10 md:-my-16 hidden sm:block">
                        <img
                            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"
                            alt="Promo Products"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* Mobile Decor Overlay */}
                <div className="absolute right-0 top-0 h-full w-1/4 sm:hidden opacity-20 pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"
                        alt="Promo Products"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;
