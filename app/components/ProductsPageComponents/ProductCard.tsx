"use client";

import Link from 'next/link';
import React from 'react';
import AddToCartButton from './AddToCartButton';
import ResilientImage from '@/app/components/ResilientImage';
import { getPrimaryImage } from '@/lib/image-utils';
import { useCurrency } from '@/app/context/CurrencyContext';
import { useLanguage } from '@/app/context/LanguageContext';

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

interface ProductCardProps {
    product: Product;
    variant?: 'default' | 'compact';
}

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
    const { t, language, dir } = useLanguage();
    const primaryImage = getPrimaryImage(product.images);
    const isCompact = variant === 'compact';
    const { formatPrice } = useCurrency();



    return (
        <div className={`group relative flex flex-col gap-2 transition-all duration-300 ${isCompact ? 'w-full' : 'w-full'}`}>
            {/* Image Container */}
            <div className={`relative overflow-hidden rounded-2xl bg-[#f8f5f6] dark:bg-white/5 border border-transparent group-hover:border-primary/20 transition-all ${isCompact ? 'aspect-[4/5]' : 'aspect-square'}`}>
                {/* Wishlist Button */}


                {/* Trending Badge */}
                {product.isTrending && (
                    <span className={`absolute top-3 ${dir === 'rtl' ? 'right-3' : 'left-3'} z-10 rounded-md bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black shadow-sm`}>
                        {t('home.trendingNow')}
                    </span>
                )}

                {/* Discount Badge */}
                {product.discountPrice && (
                    <span className={`absolute bottom-3 ${dir === 'rtl' ? 'right-3' : 'left-3'} z-10 rounded-md bg-red-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm`}>
                        -{Math.round((1 - Number(product.discountPrice) / Number(product.price)) * 100)}%
                    </span>
                )}

                <Link href={`/products/${product.slug}`} className="block w-full h-full">
                    <ResilientImage
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-110 p-4"
                        src={primaryImage}
                        loading={product.isTrending ? "eager" : "lazy"}
                    />
                </Link>

                {/* Quick Add to Cart (Desktop Hover) */}
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                    <AddToCartButton product={product} label={t('products.addToCart')} language={language} variant="desktop" />
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-1 px-1">
                {/* Brand */}
                {product.brand && (
                    <Link
                        href={`/brands/${product.brand.slug}`}
                        className="text-[10px] font-bold uppercase tracking-wider text-primary/70 hover:text-primary transition-colors"
                    >
                        {product.brand.name}
                    </Link>
                )}

                {/* Name */}
                <Link href={`/products/${product.slug}`}>
                    <h3 className="text-sm md:text-base font-medium text-text-main-light dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}


                {/* Price */}
                <div className="flex items-center gap-2">
                    {product.discountPrice ? (
                        <>
                            <span className="text-base font-bold text-primary" dir="ltr">{formatPrice(Number(product.discountPrice))}</span>
                            <span className="text-xs text-gray-400 line-through" dir="ltr">{formatPrice(Number(product.price))}</span>
                        </>
                    ) : (
                        <span className="text-base font-bold text-primary" dir="ltr">{formatPrice(Number(product.price))}</span>
                    )}
                </div>
            </div>

            {/* Mobile Add Button */}
            <div className="md:hidden mt-1">
                <AddToCartButton product={product} label={t('products.addToCart')} language={language} variant="mobile" />
            </div>
        </div>
    );
};

export default ProductCard;
