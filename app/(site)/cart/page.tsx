"use client";

import React from 'react';
import { useCart } from '@/app/context/CartContext';
import EmptyCart from '@/app/components/CartPageComponents/EmptyCart';
import CartItemsList from '@/app/components/CartPageComponents/CartItemsList';
import CartSummary from '@/app/components/CartPageComponents/CartSummary';

const CartPage = () => {
    const { items, removeItem, updateQuantity, subtotal, cartCount } = useCart();

    if (items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 lg:px-40 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <CartItemsList
                    items={items}
                    cartCount={cartCount}
                    removeItem={removeItem}
                    updateQuantity={updateQuantity}
                />
                <div className="lg:col-span-4">
                    <CartSummary subtotal={subtotal} />
                </div>
            </div>
        </main>
    );
};

export default CartPage;