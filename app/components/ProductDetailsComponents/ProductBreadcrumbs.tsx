import Link from "next/link";
import React from "react";

interface ProductBreadcrumbsProps {
    productName: string;
}

const ProductBreadcrumbs = ({ productName }: ProductBreadcrumbsProps) => {
    return (
        <nav className="flex mb-8 text-sm font-medium text-text-muted dark:text-white/60">
            <ol className="flex items-center space-x-2">
                <li><Link className="hover:text-primary transition-colors" href="/">Home</Link></li>
                <li><span className="material-symbols-outlined text-[16px] align-middle">chevron_right</span></li>
                <li><Link className="hover:text-primary transition-colors" href="/products">Shop</Link></li>
                <li><span className="material-symbols-outlined text-[16px] align-middle">chevron_right</span></li>
                <li><span className="text-text-main dark:text-white font-semibold">{productName}</span></li>
            </ol>
        </nav>
    );
};

export default ProductBreadcrumbs;
