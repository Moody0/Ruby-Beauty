import React from 'react';

interface Category {
    id: string;
    name: string;
    description: string;
}

interface ProductsSidebarProps {
    categories: Category[];
    selectedCategoryIds: Set<string>;
    handleCategoryToggle: (id: string) => void;
}

const ProductsSidebar = ({ categories, selectedCategoryIds, handleCategoryToggle }: ProductsSidebarProps) => {
    return (
        <aside className="w-full shrink-0 lg:w-64 space-y-8">
            {/* <!-- Mobile Filter Toggle (Hidden on LG) --> */}
            <button className="flex w-full items-center justify-between rounded-xl border border-[#e6dbdf] bg-white px-4 py-3 font-bold text-[#181113] lg:hidden">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined">filter_list</span> Filters</span>
                <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </button>
            <div className="hidden lg:block space-y-8">
                {/* <!-- Categories --> */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#181113] dark:text-white">Categories</h3>
                    <div className="space-y-3">
                        {categories.map(cat => (
                            <label key={cat.id} className="flex items-center gap-3 group cursor-pointer">
                                <input
                                    checked={selectedCategoryIds.has(cat.id)}
                                    onChange={() => handleCategoryToggle(cat.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                                    type="checkbox"
                                />
                                <span className="text-sm font-medium text-gray-600 group-hover:text-primary dark:text-gray-400 transition-colors">{cat.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ProductsSidebar;
