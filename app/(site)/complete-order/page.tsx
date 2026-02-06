"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import OrderSuccessHeader from '@/app/components/CompleteOrderComponents/OrderSuccessHeader';
import OrderBasicInfo from '@/app/components/CompleteOrderComponents/OrderBasicInfo';
import OrderShippingAndPayment from '@/app/components/CompleteOrderComponents/OrderShippingAndPayment';
import OrderItemsSelection from '@/app/components/CompleteOrderComponents/OrderItemsSelection';
import OrderSupportFooter from '@/app/components/CompleteOrderComponents/OrderSupportFooter';

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
            <OrderSuccessHeader />

            <div className="w-full bg-white dark:bg-[#2a161d] rounded-2xl border border-[#f4f0f2] dark:border-[#3a2228] shadow-sm overflow-hidden">
                <OrderBasicInfo
                    orderId={order.id}
                    totalAmount={order.totalAmount}
                />

                <OrderShippingAndPayment
                    name={order.Name}
                    streetAddress={order.streetAddress}
                    city={order.city}
                    phone={order.phone}
                />

                <OrderItemsSelection
                    items={order.items}
                />
            </div>

            <OrderSupportFooter email={order.email} />
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