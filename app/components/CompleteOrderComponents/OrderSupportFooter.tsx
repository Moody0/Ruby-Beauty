import React from 'react';
import Link from 'next/link';

interface OrderSupportFooterProps {
    email: string | null;
}

const OrderSupportFooter = () => {
    return (
        <>
            <div className="w-full mt-10">
                <Link
                    href="/products"
                    className="w-full bg-white dark:bg-transparent border-2 border-[#f4f0f2] dark:border-[#3a2228] hover:border-primary/30 text-[#181113] dark:text-white font-bold rounded-full h-14 flex items-center justify-center gap-2 transition-all"
                >
                    <span>Continue Shopping</span>
                    <span className="material-symbols-outlined text-sm">shopping_bag</span>
                </Link>
            </div>
            <div className="mt-12 flex flex-col items-center gap-2 text-center">
                <p className="text-xs text-[#89616f]">Need help? <a className="text-primary font-bold hover:underline" href="https://wa.me/963933254796" target="_blank" rel="noopener noreferrer">Contact our support</a></p>
            </div>
        </>
    );
};

export default OrderSupportFooter;
