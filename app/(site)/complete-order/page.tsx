"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
    id: string;
    product: {
        images: string;
        name: string;
    };
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    Name: string;
    phone: string;
    email: string | null;
    streetAddress: string;
    city: string;
    totalAmount: number;
    items: OrderItem[];
    createdAt: string;
}

const CompleteOrderContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('id');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) {
            router.push('/');
            return;
        }

        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${orderId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrder(data);
                } else {
                    router.push('/');
                }
            } catch (error) {
                console.error("Error fetching order:", error);
                router.push('/');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, router]);

    if (loading) {
        return (
            <div className="flex-grow flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin material-symbols-outlined text-primary text-4xl">progress_activity</div>
            </div>
        );
    }

    if (!order) return null;

    return (
        <main className="flex-grow w-full max-w-[800px] mx-auto px-6 py-16 flex flex-col items-center">
            <div className="flex flex-col items-center text-center mb-10">
                <div className="w-24 h-24 bg-soft-pink dark:bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}>check_circle</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[#181113] dark:text-white mb-2">Thank you for your order!</h1>
                <p className="text-[#89616f] dark:text-[#a08590] text-lg">We’ve received your order and we're getting it ready.</p>
            </div>
            <div className="w-full bg-white dark:bg-[#2a161d] rounded-2xl border border-[#f4f0f2] dark:border-[#3a2228] shadow-sm overflow-hidden">
                <div className="p-8 border-b border-[#f4f0f2] dark:border-[#3a2228] grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest">Order ID</span>
                        <p className="text-lg font-bold truncate">#{order.id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest">Order Total</span>
                        <p className="text-lg font-black text-primary">${Number(order.totalAmount).toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest">Est. Delivery</span>
                        <p className="text-lg font-bold">3-5 business days</p>
                    </div>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">local_shipping</span>
                            Shipping Address
                        </h3>
                        <div className="text-[#5a424a] dark:text-[#b49ba4] text-sm leading-relaxed">
                            <p className="font-semibold text-[#181113] dark:text-white">{order.Name}</p>
                            <p>{order.streetAddress}</p>
                            <p>{order.city}</p>
                            <p>{order.phone}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">payments</span>
                            Payment Method
                        </h3>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-[#181113] dark:text-white">Cash on Delivery</p>
                            <p className="text-xs text-[#89616f]">Pay at the time of delivery</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fcfafa] dark:bg-white/5 p-6 border-t border-[#f4f0f2] dark:border-[#3a2228]">
                    <p className="text-[10px] font-bold text-[#89616f] uppercase tracking-widest mb-4 text-center">Your Selection</p>
                    <div className="flex justify-center flex-wrap gap-4">
                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="w-16 h-16 bg-gray-100 rounded-lg bg-cover bg-center border border-[#f4f0f2] relative group"
                                style={{ backgroundImage: `url('${item.product.images}')` }}
                                title={item.product.name}
                            >
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                                    {item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full mt-10">
                <Link
                    href="/products"
                    className="w-full bg-white dark:bg-transparent border-2 border-[#f4f0f2] dark:border-[#3a2228] hover:border-primary/30 text-[#181113] dark:text-white font-bold rounded-full h-14 flex items-center justify-center gap-2 transition-all"
                >
                    <span>Continue Shopping</span>
                    <span className="material-symbols-outlined text-sm">shopping_bag</span>
                </Link>
            </div>
            <div className="mt-12 flex flex-col items-center gap-2">
                {order.email && (
                    <p className="text-xs text-[#89616f] flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">mail</span>
                        A confirmation email was sent to {order.email}
                    </p>
                )}
                <p className="text-xs text-[#89616f]">Need help? <a className="text-primary font-bold hover:underline" href="#">Contact our support</a></p>
            </div>
        </main>
    );
};

const Page = () => {
    return (
        <Suspense fallback={
            <div className="flex-grow flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin material-symbols-outlined text-primary text-4xl">progress_activity</div>
            </div>
        }>
            <CompleteOrderContent />
        </Suspense>
    );
};

export default Page;