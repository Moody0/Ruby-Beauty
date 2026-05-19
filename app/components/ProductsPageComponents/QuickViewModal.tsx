"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ResilientImage from '@/app/components/ResilientImage';
import { useCurrency } from '@/app/context/CurrencyContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCart } from '@/app/context/CartContext';
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md';

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: string | number;
    discountPrice?: string | number | null;
    images: string;
    categoryId: string;
    stock: number;
    brand?: {
        name: string;
    } | null;
}

interface QuickViewModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
    const { t, language, dir } = useLanguage();
    const { formatPrice } = useCurrency();
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    
    if (!isOpen) return null;

    const images = product.images.split(',').map(img => img.trim()).filter(Boolean);
    const primaryImage = images[0] || '';

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: Number(product.discountPrice || product.price),
            image: primaryImage,
            slug: product.slug,
            quantity: quantity,
            description: product.description || undefined
        });
        toast.success(language === 'ar' ? `تمت إضافة ${product.name} إلى السلة` : `Added ${product.name} to cart`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div 
                className="bg-white rounded-2xl overflow-hidden w-full max-w-[800px] flex flex-col md:flex-row relative"
                onClick={e => e.stopPropagation()}
                dir={dir}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 ltr:left-4 rtl:right-4 z-10 text-gray-500 hover:text-black transition-colors"
                >
                    <MdClose size={24} />
                </button>

                {/* Left side (Details) */}
                <div className="flex-1 p-8 flex flex-col justify-center">
                    <h2 dir="ltr" className={`text-2xl font-bold text-[#0A314B] mb-2 font-sans tracking-normal ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{product.name}</h2>
                    
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                        {product.brand && (
                            <>
                                <span>{language === 'ar' ? 'البراند:' : 'Brand:'} <span className="font-semibold text-[#0A314B]">{product.brand.name}</span></span>
                            </>
                        )}
                    </div>

                    <div className="text-3xl font-bold text-[#0A314B] mb-6">
                        {product.discountPrice ? (
                            <div className="flex items-center gap-3">
                                <span>{formatPrice(Number(product.discountPrice))}</span>
                                <span className="text-lg text-gray-400 line-through font-normal">{formatPrice(Number(product.price))}</span>
                            </div>
                        ) : (
                            <span>{formatPrice(Number(product.price))}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <button 
                            onClick={handleAddToCart}
                            className="flex-1 bg-[#EE2B6C] hover:bg-[#D41B5C] text-white py-3 rounded-full font-bold transition-colors"
                        >
                            {language === 'ar' ? 'اضافة للعربة' : 'Add to cart'}
                        </button>
                        
                        <div className="flex items-center justify-between border border-gray-200 rounded-full px-4 py-2 w-32">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-black">-</button>
                            <span className="font-bold">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-black">+</button>
                        </div>
                    </div>

                    <button 
                        className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full font-bold transition-colors mb-6"
                    >
                        {language === 'ar' ? 'اشتري دلوقتي' : 'Buy Now'}
                    </button>

                    <Link 
                        href={`/products/${product.slug}`}
                        className="text-gray-600 hover:text-black text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                        {dir === 'rtl' ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>}
                        {language === 'ar' ? 'عرض كل التفاصيل' : 'View full details'}
                    </Link>
                </div>

                {/* Right side (Image) */}
                <div className="flex-1 bg-[#F7F7F5] relative min-h-[400px]">
                    <ResilientImage
                        src={primaryImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
