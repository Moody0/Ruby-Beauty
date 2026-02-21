"use client";

import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

interface ProductHeaderProps {
    name: string;
    description: string | null;
}

const ProductHeader = ({ name, description }: ProductHeaderProps) => {
    const { language } = useLanguage();

    return (
        <div className="mb-4">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-text-main dark:text-white tracking-tight mb-2">{name}</h1>
            <p className="text-lg font-medium text-text-muted dark:text-white/60">{description || (language === 'ar' ? 'منتج تجميل فاخر' : 'Premium beauty product')}</p>
        </div>
    );
};

export default ProductHeader;