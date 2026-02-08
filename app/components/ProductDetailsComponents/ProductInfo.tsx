"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

interface ProductInfoProps {
    name: string;
    description: string | null;
    price: string;
}

const ProductInfo = ({ name, description, price }: ProductInfoProps) => {
    const { language } = useLanguage();

    return (
        <div className="mb-6 border-b border-[#f4f0f2] dark:border-white/10 pb-6">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-text-main dark:text-white tracking-tight mb-2">{name}</h1>
            <p className="text-lg font-medium text-text-muted dark:text-white/60 mb-4">{description || (language === 'ar' ? 'منتج تجميل فاخر' : 'Premium beauty product')}</p>
            <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-primary" dir="ltr">${Number(price).toFixed(2)}</span>
            </div>
        </div>
    );
};

export default ProductInfo;
