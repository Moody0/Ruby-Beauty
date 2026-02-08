"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

interface ProductInfoProps {
    name: string;
    description: string | null;
    price: string;
    discountPrice?: string | null;
}

const ProductInfo = ({ name, description, price, discountPrice }: ProductInfoProps) => {
    const { language } = useLanguage();

    return (
        <div className="mb-6 border-b border-[#f4f0f2] dark:border-white/10 pb-6">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-text-main dark:text-white tracking-tight mb-2">{name}</h1>
            <p className="text-lg font-medium text-text-muted dark:text-white/60 mb-4">{description || (language === 'ar' ? 'منتج تجميل فاخر' : 'Premium beauty product')}</p>
            <div className="flex items-baseline gap-4">
                {discountPrice ? (
                    <>
                        <span className="text-3xl font-bold text-primary" dir="ltr">${Number(discountPrice).toFixed(2)}</span>
                        <del className="text-lg text-text-sub decoration-red-400/50" dir="ltr">${Number(price).toFixed(2)}</del>
                        <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            {Math.round((1 - Number(discountPrice) / Number(price)) * 100)}% Off
                        </span>
                    </>
                ) : (
                    <span className="text-3xl font-bold text-primary" dir="ltr">${Number(price).toFixed(2)}</span>
                )}
            </div>
        </div>
    );
};

export default ProductInfo;
