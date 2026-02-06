import React from 'react';
import Link from 'next/link';

const CheckoutSteps = () => {
    return (
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
    );
};

export default CheckoutSteps;
