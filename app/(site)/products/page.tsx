"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import ProductsBreadcrumbs from '@/app/components/ProductsPageComponents/ProductsBreadcrumbs';
import ProductsHeader from '@/app/components/ProductsPageComponents/ProductsHeader';
import ProductsSidebar from '@/app/components/ProductsPageComponents/ProductsSidebar';
import ProductCard from '@/app/components/ProductsPageComponents/ProductCard';
import ProductSkeleton from '@/app/components/ProductsPageComponents/ProductSkeleton';
import LoadMoreButton from '@/app/components/ProductsPageComponents/LoadMoreButton';

interface Category {
    id: string;
    name: string;
    description: string;
}

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

const ProductsPageContent = () => {
    const searchParams = useSearchParams();
    const initialCategoryId = searchParams.get('category');

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(
        initialCategoryId ? new Set([initialCategoryId]) : new Set()
    );
    const [sort, setSort] = useState("best_sellers");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);

    // Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories?limit=100'); // Fetch all
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch Products
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

            // Map sort selection to API expected values
            let sortQuery = '';
            if (sort === 'Price: Low to High') sortQuery = '&sort=price_asc';
            else if (sort === 'Price: High to Low') sortQuery = '&sort=price_desc';
            else if (sort === 'Newest Arrivals') sortQuery = '&sort=newest';

            const res = await fetch(`/api/products?page=${currentPage}&limit=8${categoryQuery}${sortQuery}`);
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

    // Initial Fetch & Filter/Sort Changes
    useEffect(() => {
        setPage(1);
        fetchProducts(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryIds, sort]);

    // Load More Fetch
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
        <div className="flex-1 px-6 py-8 md:px-20 lg:px-32 xl:px-48 2xl:px-64">
            <ProductsBreadcrumbs />

            <ProductsHeader sort={sort} setSort={setSort} />

            <div className="flex flex-col gap-10 lg:flex-row">
                <ProductsSidebar
                    categories={categories}
                    selectedCategoryIds={selectedCategoryIds}
                    handleCategoryToggle={handleCategoryToggle}
                />

                {/* <!-- Product Grid --> */}
                <div className="flex-1">
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Showing {products.length} of {totalProducts} results</p>

                    {products.length === 0 && !loading && (
                        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl dark:bg-white/5">
                            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">search_off</span>
                            <p className="text-gray-500 font-medium">No products found matching your criteria.</p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        {loading && (
                            [...Array(products.length > 0 ? 4 : 8)].map((_, i) => (
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
    )
}

const ProductsPage = () => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <ProductsPageContent />
        </Suspense>
    );
};

export default ProductsPage;