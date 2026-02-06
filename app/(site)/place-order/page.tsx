"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CheckoutSteps from '@/app/components/PlaceOrderComponents/CheckoutSteps';
import ShippingForm from '@/app/components/PlaceOrderComponents/ShippingForm';
import OrderSummary from '@/app/components/PlaceOrderComponents/OrderSummary';

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
            router.push('/cart');
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
                router.push(`/complete-order?id=${data.id}`);
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
        <main className="flex-grow w-full mx-auto px-6 py-10 md:px-20 lg:px-32 xl:px-48 2xl:px-64">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7">
                    <CheckoutSteps />
                    <ShippingForm formData={formData} handleInputChange={handleInputChange} />
                </div>
                <div className="lg:col-span-5">
                    <OrderSummary
                        items={items}
                        subtotal={subtotal}
                        tax={tax}
                        total={total}
                        loading={loading}
                    />
                </div>
            </form>
        </main>
    );
};

export default PlaceOrderPage;