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
        <section className="mt-20 border-t border-[#f4f0f2] dark:border-white/10 pt-16">
            <h3 className="text-2xl font-bold mb-8 text-text-main dark:text-white">{t('products.relatedProducts')}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {products.map(related => (
                    // Cast to any to bypass stale Prisma types (isTrending/slug missing in generated client)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <ProductCard key={related.id} product={related as any} t={t} language={language} />
                ))}
            </div>
        </section>
    );
};

export default RelatedProducts;
