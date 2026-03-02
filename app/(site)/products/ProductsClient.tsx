"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ProductsBreadcrumbs from '@/app/components/ProductsPageComponents/ProductsBreadcrumbs';
import ProductsHeader from '@/app/components/ProductsPageComponents/ProductsHeader';
import ProductsSidebar from '@/app/components/ProductsPageComponents/ProductsSidebar';
import ProductCard from '@/app/components/ProductsPageComponents/ProductCard';
import ProductSkeleton from '@/app/components/ProductsPageComponents/ProductSkeleton';
import LoadMoreButton from '@/app/components/ProductsPageComponents/LoadMoreButton';
import { useLanguage } from '@/app/context/LanguageContext';
import { MdSearchOff } from 'react-icons/md';

interface Category {
    id: string;
    name: string;
    description: string | null;
}

interface Product {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: string;
    discountPrice?: string | null;
    images: string;
    categoryId: string;
    stock: number;
    isTrending: boolean;
}

interface ProductsClientProps {
    initialCategories: Category[];
    initialProducts: Product[];
    initialTotal: number;
}

const ProductsClient = ({ initialCategories, initialProducts, initialTotal }: ProductsClientProps) => {
    const searchParams = useSearchParams();
    const initialCategoryId = searchParams.get('category');
    const { t, language } = useLanguage();

    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    
    // Initialize selectedCategoryIds from initialCategoryId if it matches a category ID or name
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(() => {
        const set = new Set<string>();
        if (initialCategoryId && initialCategories.length > 0) {
            const matchedCategory = initialCategories.find(
                (cat) => cat.name.toLowerCase() === initialCategoryId.toLowerCase() || cat.id === initialCategoryId
            );
            if (matchedCategory) {
                set.add(matchedCategory.id);
            }
        }
        return set;
    });

    const [sort, setSort] = useState("best_sellers");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalProducts, setTotalProducts] = useState(initialTotal);
    const [isInitialRender, setIsInitialRender] = useState(true);

    // No longer need this useEffect as we initialize in useState
    /*
    useEffect(() => {
        if (initialCategoryId && categories.length > 0) {
            const matchedCategory = categories.find(
                (cat) => cat.name.toLowerCase() === initialCategoryId.toLowerCase() || cat.id === initialCategoryId
            );
            if (matchedCategory) {
                setSelectedCategoryIds(new Set([matchedCategory.id]));
            }
        }
    }, [initialCategoryId, categories]);
    */

    const fetchProducts = async (reset = false) => {
        if (reset) {
            setProducts([]);
        }
        setLoading(true);
        try {
            const currentPage = reset ? 1 : page;
            const categoryQuery = selectedCategoryIds.size > 0
                ? `&categoryIds=${Array.from(selectedCategoryIds).join(',')}`
                : '';

            let sortQuery = '';
            if (sort === 'Price: Low to High') sortQuery = '&sort=price_asc';
            else if (sort === 'Price: High to Low') sortQuery = '&sort=price_desc';
            else if (sort === 'Newest Arrivals') sortQuery = '&sort=newest';

            const dynamicLimit = 12;

            const res = await fetch(`/api/products?page=${currentPage}&limit=${dynamicLimit}${categoryQuery}${sortQuery}`);
            if (res.ok) {
                const data = await res.json();
                if (reset) {
                    setProducts(data.products);
                } else {
                    setProducts(prev => [...prev, ...data.products]);
                }
                setTotalProducts(data.pagination.total);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    // Refetch when filters change, but skip the very first render if we already have initial products
    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            // If we have filters on initial render that differ from the server-side default, we might need to fetch
            if (selectedCategoryIds.size > 0 || sort !== "best_sellers") {
                setPage(1);
                fetchProducts(true);
            }
            return;
        }
        
        setPage(1);
        fetchProducts(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryIds, sort]);

    useEffect(() => {
        if (page > 1) {
            fetchProducts(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleCategoryToggle = (id: string) => {
        const newSet = new Set(selectedCategoryIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedCategoryIds(newSet);
    };

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <div className="flex-1 container-custom py-8">
            <ProductsBreadcrumbs />

            <ProductsHeader sort={sort} setSort={setSort} />

            <div className="flex flex-col gap-10 lg:flex-row">
                <ProductsSidebar
                    categories={categories}
                    selectedCategoryIds={selectedCategoryIds}
                    handleCategoryToggle={handleCategoryToggle}
                />

                <div className="flex-1">
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                        {t('products.showing')} {products.length} {t('products.of')} {totalProducts} {t('products.results')}
                    </p>

                    {products.length === 0 && !loading && (
                        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl dark:bg-white/5">
                            <MdSearchOff className="text-4xl text-gray-400 mb-2" />
                            <p className="text-gray-500 font-medium">{t('products.noProducts')}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} t={t} language={language} />
                        ))}
                        {loading && (
                            [...Array(products.length > 0 ? 5 : 12)].map((_, i) => (
                                <ProductSkeleton key={`skeleton-${i}`} />
                            ))
                        )}
                    </div>

                    <LoadMoreButton
                        handleLoadMore={handleLoadMore}
                        loading={loading}
                        hasMore={products.length < totalProducts}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductsClient;
