"use client";

import React from 'react';
import { MdShoppingBag } from 'react-icons/md';
import CartBadge from './CartBadge';
import CartDrawer from './CartDrawer';
import { useCart } from '@/app/context/CartContext';

const CartTrigger = () => {
    const { openDrawer } = useCart();

    return (
        <>
            <button 
                onClick={openDrawer}
                className="p-2 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-main-light dark:text-text-main-dark relative group"
                aria-label="Open Cart"
            >
                <MdShoppingBag className="text-[24px]" />
                <CartBadge />
            </button>
            <CartDrawer />
        </>
    );
};

export default CartTrigger;
