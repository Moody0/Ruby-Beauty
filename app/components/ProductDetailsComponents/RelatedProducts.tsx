import React from "react";
import ProductCard from '@/app/components/ProductsPageComponents/ProductCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface RelatedProductsProps {
    products: any[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
    if (products.length === 0) return null;

    return (
        <section className="mt-20 border-t border-[#f4f0f2] dark:border-white/10 pt-16">
            <h3 className="text-2xl font-bold mb-8 text-text-main dark:text-white">Complete Your Routine</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {products.map(related => (
                    // Cast to any to bypass stale Prisma types (isTrending/slug missing in generated client)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <ProductCard key={related.id} product={related as any} />
                ))}
            </div>
        </section>
    );
};

export default RelatedProducts;
