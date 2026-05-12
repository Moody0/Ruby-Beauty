"use client";

import Link from 'next/link';
import React from 'react';
import AddToCartButton from './AddToCartButton';
import ResilientImage from '@/app/components/ResilientImage';
import { getPrimaryImage } from '@/lib/image-utils';
import { useCurrency } from '@/app/context/CurrencyContext';

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: string | number;
    discountPrice?: string | number | null;
    images: string;
    categoryId: string;
    stock: number;
    isTrending: boolean;
    brand?: {
        id: string;
        name: string;
        slug: string;
        group?: string;
    } | null;
}

import { useLanguage } from '@/app/context/LanguageContext';

interface ProductCardProps {
    product: Product;
    variant?: 'default' | 'compact';
}

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
    const { t, language } = useLanguage();
    const primaryImage = getPrimaryImage(product.images);
    const isCompact = variant === 'compact';
    const { formatPrice } = useCurrency();

    return (
        <div className={`group relative flex flex-col gap-3 rounded-2xl p-2 transition-all duration-300 hover:bg-white dark:hover:bg-white/5 premium-shadow-hover ${isCompact ? 'w-[189px] max-w-[189px] md:w-[216px] md:max-w-[216px]' : 'w-full md:max-w-none'}`}>
            <Link href={`/products/${product.slug}`} className={`relative overflow-hidden rounded-xl !bg-white block border border-[#e6dbdf] dark:border-gray-800/50 shadow-sm ${isCompact ? 'h-[190px] w-[173px] md:h-[216px] md:w-[200px]' : 'aspect-4/4 w-full'}`}>
                {product.isTrending && (
                    <span className="absolute ltr:left-2 rtl:right-2 top-2 z-10 rounded bg-white px-1.5 py-0.5 text-[10px]  font-bold uppercase tracking-wider text-black shadow-sm">{t('home.trendingNow')}</span>
                )}
                {product.discountPrice && (
                    <span className="absolute ltr:right-2 rtl:left-2 top-2 z-10 rounded bg-red-500 px-1.5 py-0.5 text-[10px]  font-bold uppercase tracking-wider text-white shadow-sm">
                        -{Math.round((1 - Number(product.discountPrice) / Number(product.price)) * 100)}%
                    </span>
                )}
                <ResilientImage
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    src={primaryImage}
                    loading={product.isTrending ? "eager" : "lazy"}
                />
                <AddToCartButton product={product} label={t('products.addToCart')} language={language} variant="desktop" />
                <AddToCartButton product={product} label={t('products.addToCart')} language={language} variant="mobile" />
            </Link>
            <div className={`flex flex-col gap-1 p-0.5 ${isCompact ? 'w-[173px] md:w-[200px]' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${product.slug}`}>
                        <h3 className="text-[13px] md:text-sm font-medium text-text-main-light dark:text-white group-hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-tight" title={product.name}>{product.name}</h3>
                    </Link>
                </div>
                {product.brand && (
                    <Link
                        href={`/brands/${product.brand.slug}`}
                        className="truncate text-[10px] font-semibold uppercase tracking-wide text-primary/80 hover:text-primary"
                    >
                        {product.brand.name}
                    </Link>
                )}
                <div className="w-full flex flex-col items-end md:flex-row md:items-baseline gap-0.5 md:gap-2">
                    {product.discountPrice ? (
                        <>
                            <p className="font-bold text-primary text-sm md:text-sm w-full text-right" dir="ltr">{formatPrice(Number(product.discountPrice))}</p>
                            <p className="text-[10px] md:text-xs text-text-sub line-through decoration-red-400/50 w-full text-right" dir="ltr">{formatPrice(Number(product.price))}</p>
                        </>
                    ) : (
                        <p className="font-bold text-primary text-sm md:text-sm w-full text-right" dir="ltr">{formatPrice(Number(product.price))}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
