"use client";

import Link from "next/link";
import React from "react";
import { useLanguage } from "@/app/context/LanguageContext";

interface ProductBreadcrumbsProps {
    productName: string;
}

const ProductBreadcrumbs = ({ productName }: ProductBreadcrumbsProps) => {
    const { t, dir } = useLanguage();

    return (
        <nav className="flex mb-8 text-sm font-medium text-text-muted dark:text-white/60">
            <ol className={`flex items-center gap-2 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                <li><Link className="hover:text-primary transition-colors" href="/">{t('common.home')}</Link></li>
                <li><span className={`material-symbols-outlined text-[16px] align-middle ${dir === 'rtl' ? 'rotate-180' : ''}`}>chevron_right</span></li>
                <li><Link className="hover:text-primary transition-colors" href="/products">{t('common.shop')}</Link></li>
                <li><span className={`material-symbols-outlined text-[16px] align-middle ${dir === 'rtl' ? 'rotate-180' : ''}`}>chevron_right</span></li>
                <li><span className="text-text-main dark:text-white font-semibold">{productName}</span></li>
            </ol>
        </nav>
    );
};

export default ProductBreadcrumbs;
