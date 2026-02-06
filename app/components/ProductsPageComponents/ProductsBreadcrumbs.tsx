import React from 'react';
import Link from 'next/link';

const ProductsBreadcrumbs = () => {
    return (
        <div className="mb-6 flex flex-wrap gap-2 text-sm">
            <Link className="font-medium text-gray-500 hover:text-primary transition-colors" href="/">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-500">Shop</span>
            <span className="text-gray-400">/</span>
            <span className="font-bold text-primary">All Products</span>
        </div>
    );
};

export default ProductsBreadcrumbs;
