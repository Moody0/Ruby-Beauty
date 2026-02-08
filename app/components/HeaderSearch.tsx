"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

interface HeaderSearchProps {
    onSearchSelect?: () => void;
    placeholder?: string;
    autoFocus?: boolean;
    locale?: 'en' | 'ar';
}

const HeaderSearch = ({ onSearchSelect, placeholder, autoFocus = false, locale }: HeaderSearchProps) => {
    const { t, dir, language } = useLanguage();
    const currentLocale = locale ?? language;
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const searchPlaceholder = placeholder || t('common.searchProducts');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.trim().length > 1) {
                setLoading(true);
                try {
                    const res = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=5&lang=${currentLocale}`);
                    if (res.ok) {
                        const data = await res.json();
                        setResults(data.products);
                        setShowResults(true);
                    }
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, currentLocale]);

    const handleProductClick = () => {
        setShowResults(false);
        setQuery("");
        if (onSearchSelect) onSearchSelect();
    };

    return (
        <div ref={searchRef} className="relative w-full group">
            <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">search</span>
            </div>
            <input
                autoFocus={autoFocus}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                    if (query.trim().length > 0) setShowResults(true);
                }}
                aria-label={t('common.search')}
                className={`block w-full ${dir === 'rtl' ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2.5 border-none rounded-full leading-5 bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary/50 sm:text-sm transition-shadow`}
                placeholder={searchPlaceholder}
                type="text"
            />

            {showResults && (
                <div className="absolute top-full left-0 right-0 mt-3 p-2 bg-white dark:bg-[#2a161d] shadow-xl rounded-2xl overflow-hidden border border-[#f4f0f2] dark:border-[#3a2228] z-50">
                    {loading ? (
                        <div className="p-4 text-center text-sm text-text-muted-light dark:text-text-muted-dark">{t('common.loading')}</div>
                    ) : results.length > 0 ? (
                        <div className="flex flex-col gap-1">
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/${product.slug}`}
                                    onClick={handleProductClick}
                                    className="flex items-center gap-4 p-2 hover:bg-background-light dark:hover:bg-gray-800 rounded-lg group/item transition-all"
                                >
                                    <div className="shrink-0 size-12 rounded-lg bg-gray-100 overflow-hidden">
                                        <img
                                            src={product.images}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-text-main-light dark:text-white truncate group-hover/item:text-primary transition-colors">
                                            {product.name}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            {product.discountPrice ? (
                                                <>
                                                    <span className="text-xs font-bold text-primary">${product.discountPrice}</span>
                                                    <span className="text-[10px] text-text-sub line-through decoration-red-400/50">${product.price}</span>
                                                </>
                                            ) : (
                                                <span className="text-xs font-bold text-primary">${product.price}</span>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`material-symbols-outlined text-gray-300 group-hover/item:text-primary ${dir === 'rtl' ? 'translate-x-2 group-hover/item:translate-x-0 rotate-180' : '-translate-x-2 group-hover/item:translate-x-0'} opacity-0 group-hover/item:opacity-100 transition-all text-xl`}>
                                        arrow_forward
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-3xl text-[#e6dbdf] dark:text-[#4a2e36]">search_off</span>
                            <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">{t('products.noProducts')}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HeaderSearch;
