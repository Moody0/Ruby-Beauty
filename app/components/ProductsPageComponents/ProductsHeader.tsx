import React from 'react';

interface ProductsHeaderProps {
    sort: string;
    setSort: (val: string) => void;
}

const ProductsHeader = ({ sort, setSort }: ProductsHeaderProps) => {
    return (
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-[#f4f0f2] pb-6 dark:border-white/10">
            <div className="flex max-w-2xl flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight text-[#181113] dark:text-white">Our Collection</h1>
                <p className="text-base text-gray-500 dark:text-gray-400">Discover our premium range of beauty products designed to make you glow given nature's best ingredients.</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">Sort by:</span>
                <div className="relative">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="appearance-none rounded-lg border border-[#e6dbdf] bg-white px-4 py-2.5 pr-10 text-sm font-bold text-[#181113] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-white/5 dark:border-white/10 dark:text-white cursor-pointer min-w-[160px]"
                    >
                        <option>Best Sellers</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xl">keyboard_arrow_down</span>
                </div>
            </div>
        </div>
    );
};

export default ProductsHeader;
