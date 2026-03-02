"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdInfo, MdArrowBack } from 'react-icons/md';

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
    const { t, dir } = useLanguage();

    return (
        <div className="flex flex-col gap-8">
            <div className="bg-white dark:bg-[#2a161d] p-8 rounded-2xl shadow-sm border border-[#f4f0f2] dark:border-[#3a2228]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">{t('checkout.firstName')} *</label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                            placeholder={dir === 'rtl' ? 'زين' : 'Zein'}
                            type="text"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">{t('checkout.lastName')} *</label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                            placeholder={dir === 'rtl' ? 'أحمد' : 'Ahmad'}
                            type="text"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">{t('checkout.phoneNumber')} *</label>
                        <div className="relative">
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                                placeholder="09xxxxxxxx"
                                type="tel"
                                dir="ltr"
                            />
                            {formData.phone && formData.phone.length > 0 && (
                                <span className={`absolute inset-y-0 right-4 flex items-center text-xs ${formData.phone.startsWith('09') && formData.phone.length === 10 ? 'text-green-500' : 'text-red-500'}`}>
                                    {formData.phone.length}/10
                                </span>
                            )}
                        </div>
                        <p className="text-[10px] mt-1 text-[#89616f] dark:text-[#a08590]">
                            {dir === 'rtl' ? 'يجب أن يبدأ بـ 09 ويتكون من 10 أرقام' : 'Must start with 09 and be 10 digits'}
                        </p>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">{t('checkout.streetAddress')} *</label>
                        <input
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                            placeholder={dir === 'rtl' ? 'مثال: طريق المزة السريع، بالقرب من ملعب الجلاء' : 'e.g. Mazzeh Highway, near Al Jalaa Stadium'}
                            type="text"
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-[#181113] dark:text-white">{t('checkout.city')} *</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange(e as any)}
                            required
                            className="w-full bg-white dark:bg-[#341a22] border-[#f4f0f2] dark:border-[#4a2e36] rounded-xl px-4 py-3.5 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm appearance-none cursor-pointer text-sm"
                        >
                            <option value="">{dir === 'rtl' ? 'اختر المدينة' : 'Select City'}</option>
                            <option value="Damascus">{dir === 'rtl' ? 'دمشق' : 'Damascus'}</option>
                            <option value="Aleppo">{dir === 'rtl' ? 'حلب' : 'Aleppo'}</option>
                            <option value="Homs">{dir === 'rtl' ? 'حمص' : 'Homs'}</option>
                            <option value="Hama">{dir === 'rtl' ? 'حماة' : 'Hama'}</option>
                            <option value="Latakia">{dir === 'rtl' ? 'اللاذقية' : 'Latakia'}</option>
                            <option value="Tartus">{dir === 'rtl' ? 'طرطوس' : 'Tartus'}</option>
                            <option value="Idlib">{dir === 'rtl' ? 'إدلب' : 'Idlib'}</option>
                            <option value="Deir ez-Zor">{dir === 'rtl' ? 'دير الزور' : 'Deir ez-Zor'}</option>
                            <option value="Raqqa">{dir === 'rtl' ? 'الرقة' : 'Raqqa'}</option>
                            <option value="Al-Hasakah">{dir === 'rtl' ? 'الحسكة' : 'Al-Hasakah'}</option>
                            <option value="Daraa">{dir === 'rtl' ? 'درعا' : 'Daraa'}</option>
                            <option value="As-Suwayda">{dir === 'rtl' ? 'السويداء' : 'As-Suwayda'}</option>
                            <option value="Quneitra">{dir === 'rtl' ? 'القنيطرة' : 'Quneitra'}</option>
                            <option value="Rif Dimashq">{dir === 'rtl' ? 'ريف دمشق' : 'Rif Dimashq'}</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#f4f0f2] dark:border-[#3a2228]">
                    <div className="flex items-center gap-3 p-4 bg-soft-pink dark:bg-primary/5 rounded-xl border border-primary/10">
                        <MdInfo className="text-primary" />
                        <p className="text-sm text-[#89616f] dark:text-[#a08590]">{t('checkout.deliveryInfo')}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <Link className="flex items-center gap-2 text-sm font-bold text-[#89616f] hover:text-primary transition-colors" href="/cart">
                    <MdArrowBack className={`text-sm ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    {t('common.returnToCart')}
                </Link>
            </div>
        </div>
    );
};

export default ShippingForm;
