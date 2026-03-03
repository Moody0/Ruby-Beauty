"use client";

import React from 'react';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import { CartItem as CartItemType } from '@/app/context/CartContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { getSafeImageUrl } from '@/lib/image-utils';


interface CartItemProps {
    item: CartItemType;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
}

const CartItem = ({ item, removeItem, updateQuantity }: CartItemProps) => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-[#2a161d] p-5 rounded-xl shadow-sm border border-transparent hover:border-[#f4f0f2] dark:hover:border-[#3a2228] transition-all">
            <div className="shrink-0">
                <div className="relative w-24 h-24 !bg-white rounded-lg border border-[#e6dbdf] dark:border-gray-800/50 overflow-hidden">
                    <img
                        src={getSafeImageUrl(item.image.split(',')[0])}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                        loading="lazy"
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1 justify-between py-1">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-[#181113] dark:text-white">
                            <Link href={`/${item.slug}`} className="hover:text-primary transition-colors">
                                {item.name}
                            </Link>
                        </h3>
                        <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                    </div>
                    {/* Description hidden per request */}
                    {/* {item.description && <p className="text-[#89616f] text-sm mt-1">{item.description}</p>} */}
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-[#f8f6f6] dark:bg-[#341a22] rounded-lg p-1">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#181113] dark:text-white hover:bg-white dark:hover:bg-[#4a2e36] rounded-md transition-colors font-bold text-lg"
                        >-</button>
                        <input
                            className="w-10 bg-transparent border-none text-center font-semibold focus:ring-0 p-0 text-sm dark:text-white"
                            readOnly
                            type="text"
                            value={item.quantity}
                        />
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#181113] dark:text-white hover:bg-white dark:hover:bg-[#4a2e36] rounded-md transition-colors font-bold text-lg"
                        >+</button>
                    </div>
                    <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#89616f] hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                        <MdDelete className="text-[18px]" />
                        <span className="hidden sm:inline">{t('cart.remove')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
