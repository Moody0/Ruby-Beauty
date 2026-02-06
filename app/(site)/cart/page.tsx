"use client";

import React from 'react';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

const CartPage = () => {
    const { items, removeItem, updateQuantity, subtotal, cartCount } = useCart();

    if (items.length === 0) {
        return (
            <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 lg:px-40 py-20 text-center">
                <h1 className="text-3xl font-black mb-6 text-[#181113] dark:text-white">Your Cart is Empty</h1>
                <Link href="/products" className="inline-block bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-full transition-colors">
                    Start Shopping
                </Link>
            </main>
        );
    }

    return (
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 lg:px-40 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <div className="flex flex-col gap-2 pb-4 border-b border-[#f4f0f2] dark:border-[#3a2228]">
                        <h1 className="text-3xl font-black tracking-tight text-[#181113] dark:text-white">Your Shopping Bag</h1>
                        <p className="text-[#89616f] dark:text-[#a08590]">{cartCount} items in your cart need a home</p>
                    </div>
                    <div className="flex flex-col gap-6">
                        {items.map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-[#2a161d] p-5 rounded-xl shadow-sm border border-transparent hover:border-[#f4f0f2] dark:hover:border-[#3a2228] transition-all">
                                <div className="shrink-0">
                                    <div
                                        className="w-24 h-24 bg-gray-100 rounded-lg bg-cover bg-center"
                                        style={{ backgroundImage: `url('${item.image}')` }}
                                    ></div>
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
                                        {/* Optional description or metadata if available */}
                                        {item.description && <p className="text-[#89616f] text-sm mt-1">{item.description}</p>}
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
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                            <span className="hidden sm:inline">Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
                <div className="lg:col-span-4">
                    <div className="sticky top-28 space-y-6">
                        <div className="bg-white dark:bg-[#2a161d] p-6 rounded-2xl shadow-lg border border-[#f4f0f2] dark:border-[#3a2228]">
                            <h2 className="text-xl font-bold mb-6 text-[#181113] dark:text-white">Order Summary</h2>
                            <div className="flex flex-col gap-3 mb-6 border-b border-[#f4f0f2] dark:border-[#3a2228] pb-6">
                                <div className="flex justify-between text-[#89616f] dark:text-[#a08590]">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-[#181113] dark:text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[#89616f] dark:text-[#a08590]">
                                    <span>Shipping</span>
                                    <span className="text-xs italic">Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between text-[#89616f] dark:text-[#a08590]">
                                    <span>Estimated Tax</span>
                                    <span className="text-xs italic">Calculated at checkout</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end mb-8">
                                <span className="text-lg font-bold text-[#181113] dark:text-white">Total</span>
                                <span className="text-3xl font-black text-primary">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="relative mb-6">
                                <input className="w-full bg-[#f8f6f6] dark:bg-[#341a22] border-none rounded-lg py-3 pl-4 pr-20 text-sm focus:ring-1 focus:ring-primary/50 text-[#181113] dark:text-white" placeholder="Promo code" type="text" />
                                <button className="absolute right-2 top-1.5 bottom-1.5 bg-white dark:bg-[#4a2e36] text-primary text-xs font-bold px-3 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-[#5a3e46] transition-colors">Apply</button>
                            </div>
                            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-full h-14 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02]">
                                <span>Proceed to Shipping</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>

                        </div>
                        <div className="bg-[#fcfafa] dark:bg-[#2a161d]/50 p-4 rounded-xl border border-dashed border-gray-200 dark:border-[#3a2228] text-center">
                            <p className="text-sm text-[#89616f]">Need help with your order?</p>
                            <a className="text-sm font-bold text-primary hover:underline mt-1 block" href="#">Chat with Beauty Expert</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CartPage;