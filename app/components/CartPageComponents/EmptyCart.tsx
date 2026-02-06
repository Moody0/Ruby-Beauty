import React from 'react';
import Link from 'next/link';

const EmptyCart = () => {
    return (
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 lg:px-40 py-20 text-center">
            <h1 className="text-3xl font-black mb-6 text-[#181113] dark:text-white">Your Cart is Empty</h1>
            <div className="flex justify-center">
                <Link href="/products" className="inline-block bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-full transition-colors">
                    Start Shopping
                </Link>
            </div>
        </main>
    );
};

export default EmptyCart;
