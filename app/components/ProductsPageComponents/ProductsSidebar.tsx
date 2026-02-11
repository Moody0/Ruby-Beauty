"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdFilterList, MdKeyboardArrowDown } from 'react-icons/md';

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
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState(false);
    const { t } = useLanguage();

    const VISIBLE_COUNT = 12;
    const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    const visibleCategories = expanded ? filtered : filtered.slice(0, VISIBLE_COUNT);

    return (
        <aside className="w-full shrink-0 lg:w-64 space-y-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-xl border border-[#e6dbdf] bg-white px-4 py-3 font-bold text-[#181113] lg:hidden dark:bg-surface-dark dark:border-white/10 dark:text-white"
            >
                <span className="flex items-center gap-2"><MdFilterList /> {t('products.categories')}</span>
                <MdKeyboardArrowDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-8`}>
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#181113] dark:text-white">{t('products.categories')}</h3>
                    <div className="space-y-3">
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={t('common.search') || 'Search'}
                            className="w-full mb-2 px-3 py-2 rounded-lg border border-[#e6dbdf] dark:border-white/10 bg-white dark:bg-surface-dark"
                        />

                        {visibleCategories.map(cat => (
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

                        {filtered.length > VISIBLE_COUNT && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="mt-2 text-sm text-primary font-medium"
                            >
                                {expanded ? (t('common.showLess') || 'Show less') : (t('common.showMore') || 'Show more')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ProductsSidebar;
