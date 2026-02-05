import React from 'react';

const ProductsBreadcrumbs = () => {
    return (
        <div className="mb-6 flex flex-wrap gap-2 text-sm">
            <a className="font-medium text-gray-500 hover:text-primary transition-colors" href="/">Home</a>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-500">Shop</span>
            <span className="text-gray-400">/</span>
            <span className="font-bold text-primary">All Products</span>
        </div>
    );
};

export default ProductsBreadcrumbs;
