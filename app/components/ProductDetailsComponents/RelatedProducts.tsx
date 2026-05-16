"use client";

import React from "react";
import ProductCard from '@/app/components/ProductsPageComponents/ProductCard';
import { useLanguage } from "@/app/context/LanguageContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface RelatedProductsProps {
    products: any[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
    const { t, language } = useLanguage();

    if (products.length === 0) return null;

    return (
        <section className="mt-12 lg:mt-24 pt-12 border-t border-[#e5e5e5] dark:border-white/10">
            <h3 className={`text-[20px] md:text-[24px] font-bold mb-10 text-[#1C1C1C] dark:text-white uppercase tracking-wider text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
                {t('products.relatedProducts')}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {products.map(related => (
                    // Cast to any to bypass stale Prisma types (isTrending/slug missing in generated client)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <ProductCard key={related.id} product={related as any} />
                ))}
            </div>
        </section>
    );
};

export default RelatedProducts;
