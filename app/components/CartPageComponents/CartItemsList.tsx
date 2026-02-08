"use client";

import React from 'react';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/app/context/CartContext';
import CartItem from './CartItem';
import { useLanguage } from '@/app/context/LanguageContext';

interface CartItemsListProps {
    items: CartItemType[];
    cartCount: number;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
}

const CartItemsList = ({ items, cartCount, removeItem, updateQuantity }: CartItemsListProps) => {
    const { t, dir } = useLanguage();

    return (
        <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-col gap-2 pb-4 border-b border-[#f4f0f2] dark:border-[#3a2228]">
                <h1 className="text-3xl font-black tracking-tight text-[#181113] dark:text-white">{t('cart.yourCart')}</h1>
                <p className="text-[#89616f] dark:text-[#a08590]">{cartCount} {t('orderComplete.items')}</p>
            </div>
            <div className="flex flex-col gap-6">
                {items.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        removeItem={removeItem}
                        updateQuantity={updateQuantity}
                    />
                ))}
            </div>
            <div className="mt-4">
                <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
                    <span className={`material-symbols-outlined text-sm ${dir === 'rtl' ? 'rotate-180' : ''}`}>arrow_back</span>
                    {t('cart.continueShopping')}
                </Link>
            </div>
        </div>
    );
};

export default CartItemsList;
