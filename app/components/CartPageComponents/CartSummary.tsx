"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdArrowForward } from 'react-icons/md';

interface CartSummaryProps {
    subtotal: number;
}

const CartSummary = ({ subtotal }: CartSummaryProps) => {
    const { t, dir } = useLanguage();

    return (
        <div className="sticky top-28 space-y-6">
            <div className="bg-white dark:bg-[#2a161d] p-6 rounded-2xl shadow-lg border border-[#f4f0f2] dark:border-[#3a2228]">
                <h2 className="text-xl font-bold mb-6 text-[#181113] dark:text-white">{t('cart.orderSummary')}</h2>
                <div className="flex flex-col gap-3 mb-6 border-b border-[#f4f0f2] dark:border-[#3a2228] pb-6">
                    <div className="flex justify-between text-[#89616f] dark:text-[#a08590]">
                        <span>{t('cart.subtotal')}</span>
                        <span className="font-medium text-[#181113] dark:text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#89616f] dark:text-[#a08590]">
                        <span>{t('cart.shipping')}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{t('cart.freeShipping')}</span>
                    </div>
                </div>
                <div className="flex justify-between items-end mb-8">
                    <span className="text-lg font-bold text-[#181113] dark:text-white">{t('cart.total')}</span>
                    <span className="text-3xl font-black text-primary">${subtotal.toFixed(2)}</span>
                </div>

                <Link href="/place-order" className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-full h-14 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02]">
                    <span>{t('cart.proceedToCheckout')}</span>
                    <MdArrowForward className={`text-sm ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </Link>

            </div>
            <div className="bg-[#fcfafa] dark:bg-[#2a161d]/50 p-4 rounded-xl border border-dashed border-gray-200 dark:border-[#3a2228] text-center">
                <p className="text-sm text-[#89616f]">{t('footer.contactUs')}</p>
                <a className="text-sm font-bold text-primary hover:underline mt-1 block" href="#">{t('footer.helpCenter')}</a>
            </div>
        </div>
    );
};

export default CartSummary;
