import React from "react";
import { useCurrency } from "@/app/context/CurrencyContext";

interface ProductPriceProps {
    price: string;
    discountPrice?: string | null;
}

const ProductPrice = ({ price, discountPrice }: ProductPriceProps) => {
    const { formatPrice } = useCurrency();
    
    return (
        <div className="flex items-baseline gap-4 mb-3 lg:mt-6 lg:pt-6 lg:border-t border-[#f4f0f2] dark:border-white/10">
            {discountPrice ? (
                <>
                    <span className="text-3xl font-bold text-primary" dir="ltr">{formatPrice(Number(discountPrice))}</span>
                    <del className="text-lg text-text-sub decoration-red-400/50" dir="ltr">{formatPrice(Number(price))}</del>
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        {Math.round((1 - Number(discountPrice) / Number(price)) * 100)}% Off
                    </span>
                </>
            ) : (
                <span className="text-3xl font-bold text-primary" dir="ltr">{formatPrice(Number(price))}</span>
            )}
        </div>
    );
};

export default ProductPrice;