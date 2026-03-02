"use client";

import React from 'react';
import { useCart } from '@/app/context/CartContext';

const CartBadge = () => {
    const { cartCount } = useCart();

    if (cartCount === 0) return null;

    return (
        <span className="absolute top-1 right-0.5 rtl:right-auto rtl:left-0.5 size-2 bg-primary rounded-full animate-in zoom-in duration-300"></span>
    );
};

export default CartBadge;
