"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
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
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        addItem({
            ...product,
            quantity,
        });
        toast.success(`Added ${quantity} ${product.name} to cart`);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#e6dbdf] dark:border-white/20 rounded-xl h-14 w-full sm:w-40 px-2 bg-white dark:bg-surface-dark">
                <button
                    onClick={handleDecrement}
                    className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-primary active:scale-90 transition-all"
                >
                    <span className="material-symbols-outlined">remove</span>
                </button>
                <input
                    className="w-full text-center bg-transparent border-none text-lg font-bold text-text-main dark:text-white p-0 focus:ring-0"
                    readOnly
                    type="text"
                    value={quantity}
                />
                <button
                    onClick={handleIncrement}
                    className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-primary active:scale-90 transition-all"
                >
                    <span className="material-symbols-outlined">add</span>
                </button>
            </div>
            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
                <span className="material-symbols-outlined">shopping_bag</span>
                Add to Cart
            </button>
            {/* Favorite Button */}
            <button className="h-14 w-14 border border-[#e6dbdf] dark:border-white/20 rounded-xl flex items-center justify-center text-primary hover:bg-primary/5 dark:hover:bg-white/5 transition-colors group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
            </button>
        </div>
    );
};

export default ProductActions;
