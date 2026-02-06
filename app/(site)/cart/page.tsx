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
        <main className="flex-grow w-full mx-auto px-6 py-10 md:px-20 lg:px-32 xl:px-48 2xl:px-64">
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