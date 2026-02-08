"use client";

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

const OrderSuccessHeader = () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center text-center mb-10">
            <div className="w-24 h-24 bg-soft-pink dark:bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}>check_circle</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-[#181113] dark:text-white mb-2">{t('orderComplete.thankYou')}</h1>
            <p className="text-[#89616f] dark:text-[#a08590] text-lg">{t('orderComplete.orderConfirmed')}</p>
        </div>
    );
};

export default OrderSuccessHeader;
