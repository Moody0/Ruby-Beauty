import React from 'react';
import Link from 'next/link';

interface ShippingFormProps {
    formData: {
        firstName: string;
        lastName: string;
        phone: string;
        streetAddress: string;
        city: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingForm = ({ formData, handleInputChange }: ShippingFormProps) => {
    return (
        <div className="flex flex-col gap-8">
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
                    <div className="col-span-1 md:col-span-2">
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
                        <p className="text-sm text-[#89616f] dark:text-[#a08590]">Standard delivery takes 3-5 business days. You will receive a tracking link via SMS.</p>
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
    );
};

export default ShippingForm;
