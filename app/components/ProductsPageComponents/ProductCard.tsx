"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import ResilientImage from '@/app/components/ResilientImage';
import { useCurrency } from '@/app/context/CurrencyContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCart } from '@/app/context/CartContext';
import toast from 'react-hot-toast';
import { MdSearch } from 'react-icons/md';
import QuickViewModal from './QuickViewModal';

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
    isTrending: boolean;
    brand?: {
        id: string;
        name: string;
        slug: string;
        group?: string;
    } | null;
}

interface ProductCardProps {
    product: Product;
    variant?: 'default' | 'compact';
    badge?: string | null;
    showBadge?: boolean;
}

const ProductCard = ({ product, variant = 'default', badge, showBadge = true }: ProductCardProps) => {
    const { t, language, dir } = useLanguage();
    const { formatPrice } = useCurrency();
    const { addItem } = useCart();
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    
    const images = product.images.split(',').map(img => img.trim()).filter(Boolean);
    const primaryImage = images[0] || '';
    const secondaryImage = images[1] || primaryImage;

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: Number(product.discountPrice || product.price),
            image: primaryImage,
            slug: product.slug,
            quantity: 1,
            description: product.description || undefined
        });
        toast.success(language === 'ar' ? `تمت إضافة ${product.name} إلى السلة` : `Added ${product.name} to cart`);
    };

    return (
        <>
        <div 
            className="group relative flex flex-col bg-[#F7F7F5] dark:bg-surface-dark rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-sm"
            style={{ width: '100%', height: '461px' }}
        >
            {/* Search Icon */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsQuickViewOpen(true);
                }}
                className="absolute z-20 top-3 left-3 w-8 h-8 bg-white text-black hover:bg-black hover:text-white rounded-full shadow-sm flex items-center justify-center opacity-0 -translate-x-[150%] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                aria-label="Quick View"
            >
                <MdSearch size={18} />
            </button>
            
            {/* Badge */}
            {showBadge && (badge || product.isTrending) && (
                <div className="absolute top-3 right-3 z-10 bg-[#c20059] text-white px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wide leading-none">
                    {badge || (language === 'ar' ? 'وصل حديثاً' : 'New Arrival')}
                </div>
            )}

            {/* Image Area */}
            <div className="relative w-full h-[321px] overflow-hidden">
                <Link href={`/products/${product.slug}`} className="absolute inset-0 block w-full h-full" aria-label={product.name}>
                    <ResilientImage
                        alt={product.name}
                        className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal transition-opacity duration-500 ${secondaryImage !== primaryImage ? 'group-hover:opacity-0' : ''}`}
                        src={primaryImage}
                        loading="lazy"
                    />
                    {secondaryImage !== primaryImage && (
                        <ResilientImage
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                            src={secondaryImage}
                            loading="lazy"
                        />
                    )}
                </Link>
                
                {/* Hover Add to Cart Button */}
                <div className="absolute inset-x-4 bottom-4 z-20 translate-y-[150%] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden md:block">
                    <button
                        onClick={handleQuickAdd}
                        className="w-full bg-white hover:bg-black text-black hover:text-white py-3 rounded-xl text-sm font-bold shadow-md transition-colors"
                    >
                        {language === 'ar' ? 'اضافة للعربة' : t('products.addToCart')}
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className={`flex flex-col p-4 md:p-5 pt-0 md:pt-0 ${dir === 'rtl' ? 'text-right' : 'text-right'}`}>
                {/* Brand */}
                {product.brand && (
                    <p className="text-[#898989] dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                        {product.brand.name}
                    </p>
                )}
                
                {/* Title */}
                <h3 className="text-[#003049] dark:text-white text-[15px] font-semibold leading-tight mb-2 line-clamp-2">
                    <Link 
                        href={`/products/${product.slug}`} 
                        className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-full after:h-[1px] after:bg-current after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-left hover:after:origin-right"
                    >
                        {product.name}
                    </Link>
                </h3>
                
                {/* Price */}
                <div className="flex flex-row items-center justify-start gap-2 mt-auto text-[#003049] dark:text-white">
                    {product.discountPrice ? (
                        <>
                            <span className="text-[15px] font-bold text-[#c20059]">{formatPrice(Number(product.discountPrice))}</span>
                            <span className="text-[12px] text-gray-400 line-through font-normal">{formatPrice(Number(product.price))}</span>
                        </>
                    ) : (
                        <span className="text-[15px] font-bold">{formatPrice(Number(product.price))}</span>
                    )}
                </div>
                
                {/* Mobile ATC Button */}
                <div className="md:hidden mt-3">
                    <button
                        onClick={handleQuickAdd}
                        className="w-full bg-white text-black py-2.5 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-transform border border-gray-200"
                    >
                        {language === 'ar' ? 'اضافة للعربة' : t('products.addToCart')}
                    </button>
                </div>
            </div>
        </div>
        
        <QuickViewModal 
            product={product} 
            isOpen={isQuickViewOpen} 
            onClose={() => setIsQuickViewOpen(false)} 
        />
        </>
    );
};

export default ProductCard;
