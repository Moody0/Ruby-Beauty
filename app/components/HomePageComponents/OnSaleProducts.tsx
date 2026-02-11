import React from 'react';
import ProductCard from '../ProductsPageComponents/ProductCard';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';
import OnSaleScrollWrapper from './OnSaleScrollWrapper';

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: number;
    discountPrice?: number | null;
    images: string;
    categoryId: string;
    isTrending: boolean;
    stock: number;
}

interface OnSaleProductsProps {
    products: Product[];
    t: (key: string) => string;
    dir: 'ltr' | 'rtl';
    language: 'en' | 'ar';
}

const OnSaleProducts = ({ products, t, dir, language }: OnSaleProductsProps) => {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="container-custom py-8">
            <div className="w-full">
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-primary font-bold text-xs uppercase tracking-wider">{t('home.specialOffers') || 'Special Offers'}</span>
                        <h3 className="text-2xl md:text-3xl font-black text-text-main-light dark:text-text-main-dark">
                            {t('home.onSale') || 'On Sale Now'}
                        </h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link className="text-primary font-bold text-sm flex items-center gap-1 group" href="/products">
                            {t('common.viewAll')}
                            <MdArrowForward className={`text-sm transition-transform group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        </Link>
                    </div>
                </div>

                <OnSaleScrollWrapper dir={dir}>
                    {products.map((product) => (
                        <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start">
                            <ProductCard product={product} t={t} language={language} />
                        </div>
                    ))}
                </OnSaleScrollWrapper>
            </div>
        </section>
    );
};

export default OnSaleProducts;
