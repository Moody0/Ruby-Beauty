"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

const ProductsBreadcrumbs = () => {
    const { t } = useLanguage();

    return (
        <div className="mb-6 flex flex-wrap gap-2 text-sm">
            <Link className="font-medium text-gray-500 hover:text-primary transition-colors" href="/">{t('common.home')}</Link>
            <span className="text-gray-400">/</span>
            <span className="font-bold text-primary">{t('products.allProducts')}</span>
        </div>
    );
};

export default ProductsBreadcrumbs;
