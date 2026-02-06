"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const PlaceOrderPage = () => {
    const { items, subtotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        streetAddress: '',
        city: '',
        email: '' // optional
    });

    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    useEffect(() => {
        if (items.length === 0 && !loading) {
            // router.push('/cart');
        }
    }, [items, router, loading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.streetAddress || !formData.city) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    email: formData.email,
                    streetAddress: formData.streetAddress,
                    city: formData.city,
                    totalAmount: parseFloat(total.toFixed(2)),
                    items: items.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                })
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Order placed successfully!");
                clearCart();
                router.push(`/order/success?id=${data.id}`);
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to place order");
            }
        } catch (error) {
            console.error("Order error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 lg:px-40 py-10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="flex flex-col gap-2 pb-4">
                        <nav className="flex items-center gap-2 text-xs font-semibold text-[#89616f] uppercase tracking-wider mb-2">
                            <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-primary">Information</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="opacity-50">Payment</span>
                        </nav>
                        <h1 className="text-3xl font-black tracking-tight text-[#181113] dark:text-white">Shipping Details</h1>
                        <p className="text-[#89616f] dark:text-[#a08590]">Please enter your delivery information below</p>
                    </div>

                    <div className="bg-white dark:bg-[#2a161d] p-8 rounded-2xl shadow-sm border border-[#f4f0f2] dark:border-[#3a2228]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">First Name *</label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    placeholder="Zein"
                                    type="text"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">Last Name *</label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    placeholder="Ahmad"
                                    type="text"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">Phone Number *</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    placeholder="+963 9xx xxx xxx"
                                    type="tel"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">Email Address (Optional)</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    placeholder="user@aruma-luxe.com"
                                    type="email"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">Street Address *</label>
                                <input
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    placeholder="e.g. Mazzeh Highway, near Al Jalaa Stadium"
                                    type="text"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">City / Governorate *</label>
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                    placeholder="e.g. Damascus"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-[#f4f0f2] dark:border-[#3a2228]">
                            <div className="flex items-center gap-3 p-4 bg-soft-pink dark:bg-primary/5 rounded-xl border border-primary/10">
                                <span className="material-symbols-outlined text-primary">info</span>
                                <p className="text-sm text-[#89616f] dark:text-[#a08590]">Standard delivery takes 3-5 business days. You will receive a tracking link via SMS/Email.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link className="flex items-center gap-2 text-sm font-bold text-[#89616f] hover:text-primary transition-colors" href="/cart">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Return to Cart
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div className="sticky top-28 space-y-6">
                        <div className="bg-white dark:bg-[#2a161d] p-8 rounded-2xl shadow-lg border border-[#f4f0f2] dark:border-[#3a2228]">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div
                                            className="w-16 h-16 bg-gray-100 rounded-lg bg-cover bg-center shrink-0 border border-[#f4f0f2] dark:border-[#3a2228]"
                                            style={{ backgroundImage: `url('${item.image}')` }}
                                        ></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold truncate dark:text-white" title={item.name}>{item.name}</p>
                                            <p className="text-xs text-[#89616f] dark:text-[#a08590]">Qty: {item.quantity} • ${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                                {items.length === 0 && (
                                    <p className="text-sm text-center py-4 text-[#89616f]">Your cart is empty</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-3 mb-6 border-t border-b border-[#f4f0f2] dark:border-[#3a2228] py-6">
                                <div className="flex justify-between text-[#89616f] dark:text-[#a08590]">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-[#181113] dark:text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[#89616f] dark:text-[#a08590]">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-[#89616f] dark:text-[#a08590]">
                                    <span>Estimated Tax (8%)</span>
                                    <span className="font-medium text-[#181113] dark:text-white">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-[#f8f6f6] dark:bg-[#341a22] rounded-xl p-4 mb-8">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-[#89616f] dark:text-[#a08590] uppercase tracking-wider">Payment Method</span>
                                    <span className="material-symbols-outlined text-primary text-sm">payments</span>
                                </div>
                                <p className="text-sm font-bold text-[#181113] dark:text-white">Cash on Delivery</p>
                            </div>

                            <div className="flex justify-between items-end mb-8">
                                <span className="text-lg font-bold dark:text-white">Total</span>
                                <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || items.length === 0}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-full h-14 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <span className="animate-spin material-symbols-outlined">progress_activity</span>
                                ) : (
                                    <>
                                        <span>Place Order</span>
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                    </>
                                )}
                            </button>
                            <p className="text-[10px] text-center text-[#89616f] dark:text-[#a08590] mt-4 uppercase tracking-widest font-bold">Secure Checkout Guaranteed</p>
                        </div>

                        <div className="bg-[#fcfafa] dark:bg-[#2a161d]/50 p-5 rounded-xl border border-dashed border-[#f4f0f2] dark:border-[#3a2228] flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-[#341a22] flex items-center justify-center shadow-sm">
                                <span className="material-symbols-outlined text-primary text-xl">support_agent</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold dark:text-white">Need assistance?</p>
                                <a className="text-xs text-[#89616f] hover:text-primary underline" href="#">Speak with a beauty expert</a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default PlaceOrderPage;