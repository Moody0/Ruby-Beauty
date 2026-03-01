"use client";

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

interface OrderBasicInfoProps {
    orderId: string;
    totalAmount: number;
}

const OrderBasicInfo = ({ orderId, totalAmount }: OrderBasicInfoProps) => {
    const { t, language } = useLanguage();

    return (
        <div className="p-8 border-b border-[#f4f0f2] dark:border-[#3a2228] grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:ltr:text-left md:rtl:text-right">
            <div className="flex flex-col gap-1 items-center md:items-start">
                <span className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest">{t('orderComplete.orderNumber')}</span>
                <p className="text-lg font-bold truncate"><span dir="ltr">#{orderId.slice(-8).toUpperCase()}</span></p>
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start">
                <span className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest">{t('cart.total')}</span>
                <p className="text-lg font-black text-primary"><span dir="ltr">${Number(totalAmount).toFixed(2)}</span></p>
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start">
                <span className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest">{language === 'ar' ? 'التوصيل المتوقع' : 'Est. Delivery'}</span>
                <p className="text-lg font-bold">{language === 'ar' ? '3-5 أيام عمل' : '3-5 business days'}</p>
            </div>
        </div>
    );
};

export default OrderBasicInfo;
