import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import AddToCartButton from './AddToCartButton';

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
}

interface ProductCardProps {
    product: Product;
    t: (key: string) => string;
    language: 'en' | 'ar';
}

const ProductCard = ({ product, t, language }: ProductCardProps) => {
    return (
        <div className="group relative flex flex-col gap-3 p-2 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-white/5 premium-shadow-hover">
            <Link href={`/products/${product.slug}`} className="relative aspect-4/4 w-full overflow-hidden rounded-xl !bg-white block border border-[#e6dbdf] dark:border-gray-800/50 shadow-sm">
                {product.isTrending && (
                    <span className="absolute ltr:left-2 rtl:right-2 top-2 z-10 rounded bg-white px-1.5 py-0.5 text-[10px]  font-bold uppercase tracking-wider text-black shadow-sm">{t('home.trendingNow')}</span>
                )}
                {product.discountPrice && (
                    <span className="absolute ltr:right-2 rtl:left-2 top-2 z-10 rounded bg-red-500 px-1.5 py-0.5 text-[10px]  font-bold uppercase tracking-wider text-white shadow-sm">
                        -{Math.round((1 - Number(product.discountPrice) / Number(product.price)) * 100)}%
                    </span>
                )}
                <Image
                    alt={product.name}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    src={product.images.split(',').map((img: string) => img.trim()).filter(Boolean)[0]}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={product.isTrending}
                    loading={product.isTrending ? undefined : "lazy"}
                    unoptimized
                />
                <AddToCartButton product={product} label={t('products.addToCart')} language={language} variant="desktop" />
                <AddToCartButton product={product} label={t('products.addToCart')} language={language} variant="mobile" />
            </Link>
            <div className="flex flex-col gap-1 p-0.5">
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${product.slug}`}>
                        <h3 className="text-[13px] md:text-sm font-medium text-text-main-light dark:text-white group-hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-tight" title={product.name}>{product.name}</h3>
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-2">
                    {product.discountPrice ? (
                        <>
                            <p className="font-bold text-primary text-sm md:text-sm">${Number(product.discountPrice).toFixed(2)}</p>
                            <p className="text-[10px] md:text-xs text-text-sub line-through decoration-red-400/50">${Number(product.price).toFixed(2)}</p>
                        </>
                    ) : (
                        <p className="font-bold text-primary text-sm md:text-sm">${Number(product.price).toFixed(2)}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
