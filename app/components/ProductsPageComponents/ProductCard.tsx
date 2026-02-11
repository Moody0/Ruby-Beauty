"use client";

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useCart } from '@/app/context/CartContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdAddShoppingCart, MdAdd } from 'react-icons/md';
import toast from 'react-hot-toast';

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
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addItem } = useCart();
    const { t, language } = useLanguage();

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addItem({
            id: product.id,
            name: product.name,
            price: Number(product.discountPrice || product.price),
            image: product.images,
            slug: product.slug,
            quantity: 1,
            description: product.description || undefined
        });

        toast.success(language === 'ar' ? `تمت إضافة ${product.name} إلى السلة` : `Added ${product.name} to cart`);
    };

    return (
        <div className="group relative flex flex-col gap-3 p-2 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-white/5 premium-shadow-hover">
            <Link href={`/products/${product.slug}`} className="relative aspect-4/4 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-white/5 block">
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
                    src={product.images}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={product.isTrending}
                    loading={product.isTrending ? undefined : "lazy"}
                />
                <button
                    onClick={handleQuickAdd}
                    className="hidden lg:flex absolute bottom-4 left-4 right-4 items-center justify-center gap-2 rounded-lg bg-white/95 py-3 text-sm font-bold text-[#181113] shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:text-white opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-background-dark/95 dark:text-white dark:hover:bg-primary"
                >
                    <MdAddShoppingCart className="text-[20px]" />
                    {t('products.addToCart')}
                </button>
                <button
                    onClick={handleQuickAdd}
                    className="lg:hidden absolute bottom-2 ltr:right-2 p-2 rtl:left-2 flex rounded-full bg-white/90 text-black shadow-md backdrop-blur-sm"
                    aria-label={t('products.addToCart')}
                >
                    <MdAdd className="text-[18px]" />
                </button>
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
