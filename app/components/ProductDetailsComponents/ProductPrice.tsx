"use client";

import React from "react";
import { useCurrency } from "@/app/context/CurrencyContext";
import { useLanguage } from "@/app/context/LanguageContext";

interface ProductPriceProps {
    price: string;
    discountPrice?: string | null;
}

const ProductPrice = ({ price, discountPrice }: ProductPriceProps) => {
    const { formatPrice } = useCurrency();
    const { language } = useLanguage();

    const hasDiscount = discountPrice && Number(discountPrice) < Number(price);
    const discountPercentage = hasDiscount ? Math.round((1 - Number(discountPrice) / Number(price)) * 100) : 0;

    return (
        <div className="flex flex-wrap items-center gap-4 mb-3">
            <div className="flex items-center gap-3 order-2 md:order-1">
                <span className="text-[25px] md:text-[28px] font-semibold text-[#FF3B60] leading-none" dir="ltr">
                    {formatPrice(Number(hasDiscount ? discountPrice : price))}
                </span>
                {hasDiscount && (
                    <s className="text-[18px] text-gray-400 font-medium leading-none" dir="ltr">
                        {formatPrice(Number(price))}
                    </s>
                )}
            </div>

            {hasDiscount && (
                <div className="order-1 md:order-2">
                    <span className="bg-[#FF3B60] text-white text-[12px] font-bold px-2 py-1 rounded-[4px] flex items-center leading-none">
                        {discountPercentage}%- {language === 'ar' ? 'وفر' : 'Save'}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProductPrice;
