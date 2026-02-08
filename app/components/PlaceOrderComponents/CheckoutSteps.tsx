"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

const CheckoutSteps = () => {
    const { t, dir, language } = useLanguage();

    return (
        <div className="flex flex-col gap-2 pb-4">
            <nav className="flex items-center gap-2 text-xs font-semibold text-[#89616f] uppercase tracking-wider mb-2">
                <Link href="/cart" className="hover:text-primary transition-colors">{t('common.cart')}</Link>
                <span className={`material-symbols-outlined text-[14px] ${dir === 'rtl' ? 'rotate-180' : ''}`}>chevron_right</span>
                <span className="text-primary">{t('checkout.shippingInformation')}</span>
                <span className={`material-symbols-outlined text-[14px] ${dir === 'rtl' ? 'rotate-180' : ''}`}>chevron_right</span>
                <span className="opacity-50">{t('checkout.paymentMethod')}</span>
            </nav>
            <h1 className="text-3xl font-black tracking-tight text-[#181113] dark:text-white">{t('checkout.shippingInformation')}</h1>
            <p className="text-[#89616f] dark:text-[#a08590]">{language === 'ar' ? 'يرجى إدخال معلومات التوصيل أدناه' : 'Please enter your delivery information below'}</p>
        </div>
    );
};

export default CheckoutSteps;
