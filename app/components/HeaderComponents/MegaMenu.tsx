"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCurrency } from "@/app/context/CurrencyContext";
import ResilientImage from "@/app/components/ResilientImage";

interface Brand {
    id: string;
    name: string;
    slug: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface TopProduct {
    id: string;
    name: string;
    slug: string;
}

interface TrendingProduct {
    id: string;
    name: string;
    slug: string;
    images: string;
    price: number;
    discountPrice: number | null;
    brand?: { name: string } | null;
}

export interface NavMainCategory {
    id: string;
    name: string;
    slug: string;
    brands: Brand[];
    categories: Category[];
    topProducts: TopProduct[];
    trendingProducts: TrendingProduct[];
}

interface MegaMenuProps {
    data: NavMainCategory;
    onClose: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export default function MegaMenu({ data, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
    const { dir, language } = useLanguage();
    const { formatPrice } = useCurrency();

    const getFirstImage = (images: string) => {
        try {
            const parsed = JSON.parse(images);
            return Array.isArray(parsed) ? parsed[0] : images;
        } catch {
            return images.split(",")[0]?.trim() || images;
        }
    };

    return (
        <div
            className="absolute top-full left-0 right-0 z-50"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Smooth slide-down animation wrapper */}
            <div className="animate-mega-menu-enter bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-white/10 shadow-xl">
                <div className="container-custom py-8">
                    <div className={`grid grid-cols-4 gap-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>

                        {/* Column 1: Brands */}
                        <div>
                            <h3 className="text-[13px] font-bold text-[#1C1C1C] dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-100 dark:border-white/10">
                                {language === 'ar' ? 'الماركات' : 'Brands'}
                            </h3>
                            <ul className="flex flex-col gap-1.5">
                                {data.brands.length > 0 ? data.brands.map((brand) => (
                                    <li key={brand.id}>
                                        <Link
                                            href={`/brands/${brand.slug}`}
                                            onClick={onClose}
                                            className="text-[14px] text-[rgb(46,46,46)] dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors leading-relaxed inline bg-gradient-to-r from-current to-current bg-no-repeat bg-[length:0%_1px] bg-[position:0_90%] hover:bg-[length:100%_1px] transition-[background-size] duration-300"
                                        >
                                            {brand.name}
                                        </Link>
                                    </li>
                                )) : (
                                    <li className="text-[13px] text-gray-400 italic">
                                        {language === 'ar' ? 'لا توجد ماركات' : 'No brands yet'}
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Column 2: Categories */}
                        <div>
                            <h3 className="text-[13px] font-bold text-[#1C1C1C] dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-100 dark:border-white/10">
                                {language === 'ar' ? 'الأقسام' : 'Categories'}
                            </h3>
                            <ul className="flex flex-col gap-1.5">
                                {data.categories.length > 0 ? data.categories.map((cat) => (
                                    <li key={cat.id}>
                                        <Link
                                            href={`/categories/${cat.slug}`}
                                            onClick={onClose}
                                            className="text-[14px] text-[rgb(46,46,46)] dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors leading-relaxed inline bg-gradient-to-r from-current to-current bg-no-repeat bg-[length:0%_1px] bg-[position:0_90%] hover:bg-[length:100%_1px] transition-[background-size] duration-300"
                                        >
                                            {cat.name}
                                        </Link>
                                    </li>
                                )) : (
                                    <li className="text-[13px] text-gray-400 italic">
                                        {language === 'ar' ? 'لا توجد أقسام' : 'No categories yet'}
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Column 3: Top Products (text links) */}
                        <div>
                            <h3 className="text-[13px] font-bold text-[#1C1C1C] dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-100 dark:border-white/10">
                                {language === 'ar' ? 'المنتجات' : 'Products'}
                            </h3>
                            <ul className="flex flex-col gap-1.5">
                                {data.topProducts.length > 0 ? data.topProducts.map((product) => (
                                    <li key={product.id}>
                                        <Link
                                            href={`/products/${product.slug}`}
                                            onClick={onClose}
                                            className="text-[14px] text-[rgb(46,46,46)] dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors leading-relaxed line-clamp-1 inline bg-gradient-to-r from-current to-current bg-no-repeat bg-[length:0%_1px] bg-[position:0_90%] hover:bg-[length:100%_1px] transition-[background-size] duration-300"
                                        >
                                            {product.name}
                                        </Link>
                                    </li>
                                )) : (
                                    <li className="text-[13px] text-gray-400 italic">
                                        {language === 'ar' ? 'لا توجد منتجات' : 'No products yet'}
                                    </li>
                                )}
                                {data.topProducts.length > 0 && (
                                    <li className="mt-2">
                                        <Link
                                            href={`/department/${data.slug}`}
                                            onClick={onClose}
                                            className="text-[13px] font-semibold text-[rgb(46,46,46)] dark:text-white inline bg-gradient-to-r from-current to-current bg-no-repeat bg-[length:0%_1px] bg-[position:0_90%] hover:bg-[length:100%_1px] transition-[background-size] duration-300"
                                        >
                                            {language === 'ar' ? 'عرض كل المنتجات' : 'View All Products'}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Column 4: Trending Products (visual cards) */}
                        <div>
                            <h3 className="text-[13px] font-bold text-[#1C1C1C] dark:text-white uppercase tracking-wider mb-4 pb-2 border-b border-gray-100 dark:border-white/10">
                                {language === 'ar' ? 'الأكثر مبيعاً' : 'Best Sellers'}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {data.trendingProducts.length > 0 ? data.trendingProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.slug}`}
                                        onClick={onClose}
                                        className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                                    >
                                        <div className="w-[60px] h-[60px] shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                            <ResilientImage
                                                src={getFirstImage(product.images)}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {product.brand && (
                                                <p className="text-[10px] uppercase text-gray-400 dark:text-gray-500 tracking-wider mb-0.5">
                                                    {product.brand.name}
                                                </p>
                                            )}
                                            <p className="text-[13px] font-semibold text-[rgb(46,46,46)] dark:text-white truncate transition-colors">
                                                <span className="inline bg-gradient-to-r from-current to-current bg-no-repeat bg-[length:0%_1px] bg-[position:0_90%] group-hover:bg-[length:100%_1px] transition-[background-size] duration-300">
                                                    {product.name}
                                                </span>
                                            </p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                {product.discountPrice ? (
                                                    <>
                                                        <span className="text-[12px] font-bold text-[rgb(46,46,46)] dark:text-white">
                                                            {formatPrice(product.discountPrice)}
                                                        </span>
                                                        <span className="text-[11px] text-gray-400 line-through">
                                                            {formatPrice(product.price)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-[12px] font-bold text-[rgb(46,46,46)] dark:text-white">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <p className="text-[13px] text-gray-400 italic">
                                        {language === 'ar' ? 'لا توجد منتجات رائجة' : 'No trending products'}
                                    </p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
