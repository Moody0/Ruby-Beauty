"use client";

import Link from 'next/link';
import React from 'react';
import { useCart } from '@/app/context/CartContext';
import toast from 'react-hot-toast';

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: string | number;
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

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addItem({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.images,
            slug: product.slug,
            quantity: 1,
            description: product.description || undefined
        });

        toast.success(`Added ${product.name} to cart`);
    };

    return (
        <div className="group relative flex flex-col gap-3">
            <Link href={`/products/${product.slug}`} className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-gray-100 block">
                {product.isTrending && (
                    <span className="absolute left-3 top-3 z-10 rounded-md bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">Trending</span>
                )}
                <img
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={product.images}
                />
                {/* <!-- Quick Add Overlay Button (Desktop Only) --> */}
                <button
                    onClick={handleQuickAdd}
                    className="hidden lg:flex absolute bottom-4 left-4 right-4 items-center justify-center gap-2 rounded-lg bg-white/95 py-3 text-sm font-bold text-[#181113] shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:text-white opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-background-dark/95 dark:text-white dark:hover:bg-primary"
                >
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    Quick Add
                </button>
                {/* <!-- Mobile Quick Add Button (Visible on image) --> */}
                <button
                    onClick={handleQuickAdd}
                    className="lg:hidden absolute bottom-2 right-2 p-2 rounded-full bg-white/90 text-black shadow-md backdrop-blur-sm"
                >
                    <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                </button>
            </Link>
            <div className="flex flex-col gap-1 p-1">
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${product.slug}`}>
                        <h3 className="text-sm md:text-base font-medium text-text-main-light dark:text-white group-hover:text-primary transition-colors cursor-pointer line-clamp-2 md:line-clamp-1 h-10 md:h-auto leading-tight" title={product.name}>{product.name}</h3>
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <p className="font-bold text-primary text-sm md:text-base">${Number(product.price).toFixed(2)}</p>
                    <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400">
                            <span className="material-symbols-outlined text-[12px] md:text-[14px] fill-current">star</span>
                            <span className="material-symbols-outlined text-[12px] md:text-[14px] fill-current">star</span>
                            <span className="material-symbols-outlined text-[12px] md:text-[14px] fill-current">star</span>
                            <span className="material-symbols-outlined text-[12px] md:text-[14px] fill-current">star</span>
                            <span className="material-symbols-outlined text-[12px] md:text-[14px] fill-current">star_half</span>
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-400">(42)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
