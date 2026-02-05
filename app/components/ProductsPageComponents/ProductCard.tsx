import Link from 'next/link';
import React from 'react';

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: string;
    images: string;
    categoryId: string;
    stock: number;
    isTrending: boolean;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="group relative flex flex-col gap-3">
            <Link href={`/${product.slug}`} className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 block">
                {product.isTrending && (
                    <span className="absolute left-3 top-3 z-10 rounded-md bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">Trending</span>
                )}
                <img
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={product.images}
                />
                {/* <!-- Quick Add Overlay Button --> */}
                <button className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-lg bg-white/95 py-3 text-sm font-bold text-[#181113] shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-background-dark/95 dark:text-white dark:hover:bg-primary">
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    Quick Add
                </button>
                {/* <!-- Like Button --> */}
                <button className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/50 text-[#181113] backdrop-blur-sm transition-colors hover:bg-white hover:text-primary dark:bg-black/30 dark:text-white dark:hover:bg-black/60">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                </button>
            </Link>
            <div className="flex flex-col gap-1">
                {/* <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Brand Name</p> */}
                <div className="flex items-start justify-between gap-2">
                    <Link href={`/${product.slug}`}>
                        <h3 className="text-base font-medium text-[#181113] dark:text-white group-hover:text-primary transition-colors cursor-pointer line-clamp-1" title={product.name}>{product.name}</h3>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <p className="font-bold text-primary">${parseFloat(product.price).toFixed(2)}</p>
                    <div className="flex text-yellow-400">
                        <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[14px] fill-current">star_half</span>
                    </div>
                    <span className="text-xs text-gray-400">(42)</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
