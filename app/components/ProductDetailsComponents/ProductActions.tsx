"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useLanguage } from "@/app/context/LanguageContext";
import toast from "react-hot-toast";

interface ProductActionsProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
        slug: string;
    };
}

const ProductActions = ({ product }: ProductActionsProps) => {
    const { addItem } = useCart();
    const { t, language } = useLanguage();
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            slug: product.slug,
            quantity: quantity,
        });
        toast.success(language === 'ar'
            ? `تمت إضافة ${quantity} ${product.name} إلى السلة`
            : `Added ${quantity} ${product.name} to cart`
        );
    };

    return (
        <div className="flex gap-4 max-w-[1200px] mb-8">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border border-[#e6dbdf] dark:border-white/20 rounded-xl h-14 w-32 md:w-40 px-2 bg-white dark:bg-surface-dark shrink-0">
                <button
                    onClick={handleDecrement}
                    className="w-8 md:w-10 h-full flex items-center justify-center text-text-muted hover:text-primary active:scale-90 transition-all"
                >
                    <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <span className="text-lg font-bold text-text-main dark:text-white">{quantity}</span>
                <button
                    onClick={handleIncrement}
                    className="w-8 md:w-10 h-full flex items-center justify-center text-text-muted hover:text-primary active:scale-90 transition-all"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
            </div>
            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 hover:-translate-y-0.5 active:translate-y-0"
            >
                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                {t('products.addToCart')}
            </button>
        </div>
    );
};

export default ProductActions;
