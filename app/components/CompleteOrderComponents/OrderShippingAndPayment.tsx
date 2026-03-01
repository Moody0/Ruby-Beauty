"use client";

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdLocalShipping, MdPayments } from 'react-icons/md';

interface OrderShippingAndPaymentProps {
    name: string;
    streetAddress: string;
    city: string;
    phone: string;
}

const OrderShippingAndPayment = ({ name, streetAddress, city, phone }: OrderShippingAndPaymentProps) => {
    const { t, language } = useLanguage();

    return (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:ltr:text-left md:rtl:text-right">
            <div className="flex flex-col gap-4 items-center md:items-start">
                <h3 className="text-sm font-bold flex items-center gap-2">
                    <MdLocalShipping className="text-primary text-lg" />
                    {t('orderComplete.shippingAddress')}
                </h3>
                <div className="text-[#5a424a] dark:text-[#b49ba4] text-sm leading-relaxed w-full">
                    <p className="font-semibold text-[#181113] dark:text-white">{name}</p>
                    <p>{streetAddress}</p>
                    <p>{city}</p>
                    <p><span dir="ltr">{phone}</span></p>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center md:items-start">
                <h3 className="text-sm font-bold flex items-center gap-2">
                    <MdPayments className="text-primary text-lg" />
                    {t('checkout.paymentMethod')}
                </h3>
                <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm font-semibold text-[#181113] dark:text-white">{t('checkout.cashOnDelivery')}</p>
                    <p className="text-xs text-[#89616f]">{language === 'ar' ? 'الدفع عند الاستلام' : 'Pay at the time of delivery'}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderShippingAndPayment;
