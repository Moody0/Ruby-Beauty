"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAdminSidebar } from "../../context/AdminSidebarContext";
import AdminHeader from "../../components/AdminHeader";
import AddProductModal from "./AddProductModal";
import { deleteProduct, toggleProductTrending, bulkToggleTrending, bulkCreateProducts } from "../../../../lib/admin-actions";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/app/context/LanguageContext";

interface Product {
    id: string;
    name: string;
    description: string | null;
    categoryId: string;
    sku: string | null;
    price: number;
    discountPrice: number | null;
    discountType: string | null;
    discountValue: number | null;
    stock: number;
    images: string;
    isTrending: boolean;
    category: {
        id: string;
        name: string;
    } | null;
}

interface Category {
    id: string;
    name: string;
}

export default function ProductsClient({ products, categories }: { products: Product[], categories: Category[] }) {
    const { data: session } = useSession();
    const { t, dir } = useLanguage();
    const canDelete = session?.user?.role === 'SUPER_ADMIN' || session?.user?.canDeleteProducts;
    const canEdit = session?.user?.role === 'SUPER_ADMIN' || session?.user?.canManageProducts;

    const { openSidebar } = useAdminSidebar();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedStockStatus, setSelectedStockStatus] = useState("Stock Status");
    const [showTrendingOnly, setShowTrendingOnly] = useState(false);
    const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
    const [isSubmittingBulk, setIsSubmittingBulk] = useState(false);
    const itemsPerPage = 20;

    // Calculate stats
    const stats = useMemo(() => {
        const total = products.length;
        const outOfStock = products.filter(p => Number(p.stock) === 0).length;
        const lowStock = products.filter(p => Number(p.stock) > 0 && Number(p.stock) <= 10).length;
        const categories = new Set(products.map(p => p.category?.name).filter(Boolean)).size;
        const onSale = products.filter(p => p.discountPrice !== null).length;
        return { total, outOfStock, lowStock, categories, onSale };
    }, [products]);

    // Get unique categories for filter
    const uniqueCategories = useMemo(() => {
        return Array.from(new Set(products.map(p => p.category?.name).filter(Boolean))).sort();
    }, [products]);

    // Reset to first page when filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, selectedStockStatus, showTrendingOnly, showOnSaleOnly]);

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.sku?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                (p.category?.name?.toLowerCase() || "").includes(searchQuery.toLowerCase());

            // Handle "All Categories" for translations (this check might need to be robust)
            // Ideally we check against the translation key or value? For now let's assume "All Categories" is the default state value.
            const matchesCategory = selectedCategory === "All Categories" || selectedCategory === t('admin.allCategories') || p.category?.name === selectedCategory;

            let matchesStock = true;
            if (selectedStockStatus === "In Stock" || selectedStockStatus === t('admin.inStock')) matchesStock = Number(p.stock) > 10;
            else if (selectedStockStatus === "Low Stock" || selectedStockStatus === t('admin.lowStock')) matchesStock = Number(p.stock) > 0 && Number(p.stock) <= 10;
            else if (selectedStockStatus === "Out of Stock" || selectedStockStatus === t('admin.outOfStock')) matchesStock = Number(p.stock) === 0;

            const matchesTrending = !showTrendingOnly || p.isTrending;
            const matchesOnSale = !showOnSaleOnly || p.discountPrice !== null;

            return matchesSearch && matchesCategory && matchesStock && matchesTrending && matchesOnSale;
        });
    }, [products, searchQuery, selectedCategory, selectedStockStatus, showTrendingOnly, showOnSaleOnly, t]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Find the main scroll container
        const container = document.querySelector('.overflow-y-auto');
        if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsAddModalOpen(true);
    };

    const toggleSelectAll = () => {
        const allOnPageSelected = currentItems.length > 0 && currentItems.every(p => selectedIds.has(p.id));
        const newSelected = new Set(selectedIds);

        if (allOnPageSelected) {
            currentItems.forEach(p => newSelected.delete(p.id));
        } else {
            currentItems.forEach(p => newSelected.add(p.id));
        }
        setSelectedIds(newSelected);
    };

    const toggleSelectOne = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`⚠️ Are you sure you want to permanently delete "${name}"?\n\nThis action cannot be undone and will remove the product from all future orders.`)) {
            try {
                const result = await deleteProduct(id);
                if (result.success) {
                    toast.success("Product deleted successfully");
                } else {
                    toast.error(result.error || "Failed to delete product");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("An unexpected error occurred");
            }
        }
    }

    const handleBulkRemoveTrending = async () => {
        if (selectedIds.size === 0) return;

        const ids = Array.from(selectedIds);
        setIsSubmittingBulk(true);
        try {
            const result = await bulkToggleTrending(ids, false);
            if (result.success) {
                toast.success(`Removed trending status from ${ids.length} products`);
                setSelectedIds(new Set());
            } else {
                toast.error(result.error || "Failed to update products");
            }
        } catch (error) {
            console.error("Error in bulk update:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmittingBulk(false);
        }
    };

    const handleToggleTrending = async (id: string, currentStatus: boolean) => {
        setLoadingMap(prev => ({ ...prev, [id]: true }));
        try {
            const result = await toggleProductTrending(id, !currentStatus);
            if (result.success) {
                toast.success(`Product ${!currentStatus ? 'marked as trending' : 'removed from trending'} successfully`);
            } else {
                toast.error(result.error || "Failed to update status");
            }
        } catch (error) {
            console.error("Error toggling product trending status:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setLoadingMap(prev => ({ ...prev, [id]: false }));
        }
    };

    const handleExportCSV = () => {
        try {
            // Prepare headers
            const headers = ["Name", "SKU", "Category", "Price", "Stock", "Status", "Is Trending"];

            // Prepare data rows
            const rows = products.map((p: any) => [
                `"${p.name.replace(/"/g, '""')}"`,
                `"${(p.sku || '').replace(/"/g, '""')}"`,
                `"${(p.category?.name || 'Uncategorized').replace(/"/g, '""')}"`,
                p.price,
                p.stock,
                p.stock > 0 ? "In Stock" : "Out of Stock",
                p.isTrending ? "Yes" : "No"
            ]);

            // Combine into CSV string
            const csvContent = [
                headers.join(","),
                ...rows.map(r => r.join(","))
            ].join("\n");

            // Create download link
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `ruby_beauty_products_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Products exported successfully");
        } catch (error) {
            console.error("Export failed:", error);
            toast.error("Failed to export products");
        }
    };

    const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsSubmittingBulk(true);
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const text = event.target?.result as string;
                const lines = text.split('\n');
                if (lines.length < 2) {
                    toast.error("CSV file is empty or missing headers");
                    return;
                }

                const headers = lines[0].split(',').map(h => h.trim());

                const data = lines.slice(1).filter(line => line.trim()).map(line => {
                    const values = line.split(',').map(v => v.replace(/^"|"$/g, '').trim());
                    const obj: any = {};
                    headers.forEach((header, i) => {
                        obj[header] = values[i];
                    });
                    return obj;
                });

                const result = await bulkCreateProducts(data);
                if (result.success) {
                    toast.success(`Successfully imported ${result.count} products`);
                } else {
                    toast.error(result.error || "Failed to import products");
                }
            } catch (error) {
                console.error("Import error:", error);
                toast.error("Failed to parse CSV file");
            } finally {
                setIsSubmittingBulk(false);
                if (e.target) e.target.value = '';
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            <AdminHeader title={t('admin.products')} onMenuClick={openSidebar} />

            <div className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-8">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-6 md:gap-8 pb-10">

                    {/* Page Heading & Breadcrumbs */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="flex flex-col gap-1">
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-sm text-text-sub dark:text-gray-400 mb-1">
                                <Link href="/admin/dashboard" className="hover:text-primary cursor-pointer transition-colors">{t('admin.dashboard')}</Link>
                                <span className={`material-symbols-outlined text-[12px] ${dir === 'rtl' ? 'rotate-180' : ''}`}>chevron_right</span>
                                <span className="text-text-main dark:text-white font-medium">{t('admin.products')}</span>
                            </div>
                            <h2 className="text-3xl font-extrabold text-text-main dark:text-white tracking-tight">{t('admin.products')}</h2>
                            <p className="text-text-sub dark:text-gray-400">{t('admin.manageCatalog')}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleExportCSV}
                                className="bg-surface-light dark:bg-surface-dark border border-border-color/50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-text-main dark:text-white h-12 px-6 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[20px]">file_download</span>
                                {t('admin.exportData')}
                            </button>
                            <label className="bg-surface-light dark:bg-surface-dark border border-border-color/50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-text-main dark:text-white h-12 px-6 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-sm cursor-pointer">
                                <span className="material-symbols-outlined text-[20px]">file_upload</span>
                                {t('admin.importData')}
                                <input
                                    type="file"
                                    accept=".csv"
                                    className="hidden"
                                    onChange={handleImportCSV}
                                    disabled={isSubmittingBulk}
                                />
                            </label>
                            {canEdit && (
                                <button
                                    onClick={() => {
                                        setSelectedProduct(null);
                                        setIsAddModalOpen(true);
                                    }}
                                    className="bg-primary hover:bg-primary/90 text-white h-12 px-6 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <span className="material-symbols-outlined text-[20px]">add</span>
                                    {t('admin.addNewProduct')}
                                </button>
                            )}
                        </div>
                    </div>

                    <AddProductModal
                        isOpen={isAddModalOpen}
                        onClose={() => {
                            setIsAddModalOpen(false);
                            setSelectedProduct(null);
                        }}
                        categories={categories}
                        product={selectedProduct}
                    />

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm flex flex-col gap-1">
                            <p className="text-text-sub dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{t('admin.totalProducts')}</p>
                            <p className="text-2xl font-bold text-text-main dark:text-white">{stats.total.toLocaleString()}</p>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm flex flex-col gap-1">
                            <p className="text-text-sub dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{t('admin.trending')}</p>
                            <p className="text-2xl font-bold text-amber-500">{products.filter(p => p.isTrending).length} / 8</p>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm flex flex-col gap-1">
                            <p className="text-text-sub dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{t('admin.outOfStock')}</p>
                            <p className="text-2xl font-bold text-red-500">{stats.outOfStock.toLocaleString()}</p>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm flex flex-col gap-1">
                            <p className="text-text-sub dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{t('admin.lowInventory')}</p>
                            <p className="text-2xl font-bold text-orange-500">{stats.lowStock.toLocaleString()}</p>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm flex flex-col gap-1">
                            <p className="text-text-sub dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{t('admin.categories')}</p>
                            <p className="text-2xl font-bold text-text-main dark:text-white">{stats.categories.toLocaleString()}</p>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm flex flex-col gap-1">
                            <p className="text-text-sub dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{t('admin.onSale')}</p>
                            <p className="text-2xl font-bold text-emerald-500">{stats.onSale.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Filters & Table Container */}
                    <div className="bg-surface-light dark:bg-surface-dark border border-[#e6dbdf] dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
                        {/* Toolbar */}
                        <div className="p-5 border-b border-[#e6dbdf] dark:border-gray-700 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
                            <div className="relative w-full lg:w-80">
                                <span className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                                    <span className="material-symbols-outlined text-text-sub dark:text-gray-400 text-[20px]">search</span>
                                </span>
                                <input
                                    className={`block w-full ${dir === 'rtl' ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-2.5 border border-[#e6dbdf] dark:border-gray-700 rounded-xl bg-background-light dark:bg-gray-800 text-sm text-text-main dark:text-white placeholder-text-sub dark:placeholder-gray-500 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none`}
                                    placeholder={t('admin.searchPlaceholder')}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Category Filter */}
                                <div className="relative flex-1 sm:flex-initial">
                                    <select
                                        className={`appearance-none w-full ${dir === 'rtl' ? 'pr-3 pl-10' : 'pl-3 pr-10'} py-2.5 bg-background-light dark:bg-gray-800 border border-[#e6dbdf] dark:border-gray-700 rounded-xl text-sm font-medium text-text-main dark:text-white focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer min-w-[140px] outline-none`}
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option>{t('admin.allCategories')}</option>
                                        {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                    <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'left-0 pl-2' : 'right-0 pr-2'} flex items-center pointer-events-none text-text-sub dark:text-gray-400`}>
                                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                    </div>
                                </div>
                                {/* Stock Filter */}
                                <div className="relative flex-1 sm:flex-initial">
                                    <select
                                        className={`appearance-none w-full ${dir === 'rtl' ? 'pr-3 pl-10' : 'pl-3 pr-10'} py-2.5 bg-background-light dark:bg-gray-800 border border-[#e6dbdf] dark:border-gray-700 rounded-xl text-sm font-medium text-text-main dark:text-white focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer min-w-[140px] outline-none`}
                                        value={selectedStockStatus}
                                        onChange={(e) => setSelectedStockStatus(e.target.value)}
                                    >
                                        <option>{t('admin.stockStatus')}</option>
                                        <option>{t('admin.inStock')}</option>
                                        <option>{t('admin.lowStock')}</option>
                                        <option>{t('admin.outOfStock')}</option>
                                    </select>
                                    <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'left-0 pl-2' : 'right-0 pr-2'} flex items-center pointer-events-none text-text-sub dark:text-gray-400`}>
                                        <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                    </div>
                                </div>

                                {/* Trending Filter Toggle */}
                                <button
                                    onClick={() => setShowTrendingOnly(!showTrendingOnly)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${showTrendingOnly
                                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                                        : 'bg-background-light dark:bg-gray-800 border border-[#e6dbdf] dark:border-gray-700 text-text-main dark:text-white hover:border-amber-500 hover:text-amber-500'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-[20px] ${showTrendingOnly ? 'fill-1' : ''}`}>local_fire_department</span>
                                    <span className="hidden sm:inline">{t('admin.trendingOnly')}</span>
                                </button>

                                {/* On Sale Filter Toggle */}
                                <button
                                    onClick={() => setShowOnSaleOnly(!showOnSaleOnly)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${showOnSaleOnly
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-background-light dark:bg-gray-800 border border-[#e6dbdf] dark:border-gray-700 text-text-main dark:text-white hover:border-emerald-500 hover:text-emerald-500'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-[20px] ${showOnSaleOnly ? 'fill-1' : ''}`}>sell</span>
                                    <span className="hidden sm:inline">{t('admin.onSaleOnly')}</span>
                                </button>
                            </div>
                        </div>

                        {/* Bulk Actions Bar */}
                        {selectedIds.size > 0 && (
                            <div className="bg-primary/5 dark:bg-primary/10 border-b border-[#e6dbdf] dark:border-gray-700 px-5 py-4 flex items-center justify-between animate-in slide-in-from-top duration-300">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center size-6 bg-primary text-white text-xs font-bold rounded-full">{selectedIds.size}</span>
                                    <span className="text-sm font-bold text-text-main dark:text-white">{t('admin.itemsSelected')}</span>
                                    <button
                                        onClick={() => setSelectedIds(new Set())}
                                        className="text-xs text-text-sub hover:text-primary transition-colors font-medium ml-2 underline"
                                    >
                                        {t('admin.deselectAll')}
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    {canEdit && (
                                        <button
                                            onClick={handleBulkRemoveTrending}
                                            disabled={isSubmittingBulk}
                                            className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/30 transition-all border border-amber-200 dark:border-amber-800/50 disabled:opacity-50"
                                        >
                                            {isSubmittingBulk ? (
                                                <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                                            ) : (
                                                <span className="material-symbols-outlined text-[18px]">trending_down</span>
                                            )}
                                            {t('admin.removeTrending')}
                                        </button>
                                    )}
                                    {canDelete && (
                                        <button
                                            onClick={() => {
                                                if (confirm(`Are you sure you want to delete ${selectedIds.size} products?`)) {
                                                    // We would call a bulk delete action here if we had one
                                                    toast.error("Bulk delete coming soon!");
                                                }
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-red-500/20"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                            {t('admin.deleteSelected')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr className="bg-background-light dark:bg-gray-800/50 border-b border-[#e6dbdf] dark:border-gray-700 text-[10px] sm:text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">
                                        <th className="p-3 sm:p-5 w-10 sm:w-12 text-center text-[0px]">
                                            <input
                                                className="rounded border-gray-300 text-primary focus:ring-primary size-3 sm:size-4 cursor-pointer"
                                                type="checkbox"
                                                checked={currentItems.length > 0 && currentItems.every(p => selectedIds.has(p.id))}
                                                onChange={toggleSelectAll}
                                            />
                                        </th>
                                        <th className={`p-3 sm:p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('admin.productName')}</th>
                                        <th className={`p-3 sm:p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('admin.categoryName')}</th>
                                        <th className={`p-3 sm:p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('admin.priceValue')}</th>
                                        <th className={`p-3 sm:p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('admin.inventory')}</th>
                                        <th className={`p-3 sm:p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('admin.trending')}</th>
                                        <th className={`p-3 sm:p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('admin.statusValue')}</th>
                                        <th className={`p-3 sm:p-5 ${dir === 'rtl' ? 'text-left' : 'text-right'}`}>{t('admin.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#e6dbdf] dark:divide-gray-700">
                                    {currentItems.length > 0 ? (
                                        currentItems.map((product) => (
                                            <tr key={product.id} className={`group hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors ${selectedIds.has(product.id) ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                                                <td className="p-3 sm:p-5 text-center px-3 sm:px-5">
                                                    <input
                                                        className="rounded border-gray-300 text-primary focus:ring-primary size-3 sm:size-4 cursor-pointer"
                                                        type="checkbox"
                                                        checked={selectedIds.has(product.id)}
                                                        onChange={() => toggleSelectOne(product.id)}
                                                    />
                                                </td>
                                                <td className="p-3 sm:p-5">
                                                    <div className="flex items-center gap-3 sm:gap-4">
                                                        <div className="relative size-10 sm:size-12 rounded-lg bg-gray-100 dark:bg-gray-800 border border-[#e6dbdf] dark:border-gray-700 overflow-hidden shrink-0">
                                                            <Image
                                                                src={product.images.split(',')[0] || '/placeholder.jpg'}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="48px"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col min-w-0">
                                                            <span className="font-bold text-text-main dark:text-white text-xs sm:text-sm line-clamp-1">{product.name}</span>
                                                            <span className="text-[10px] sm:text-xs text-text-sub dark:text-gray-500">{t('admin.sku')}: {product.sku || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3 sm:p-5">
                                                    <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-medium bg-primary/10 text-primary whitespace-nowrap">
                                                        {product.category?.name || 'Uncategorized'}
                                                    </span>
                                                </td>
                                                <td className="p-3 sm:p-5 text-xs sm:text-sm font-bold text-text-main dark:text-white">
                                                    {product.discountPrice ? (
                                                        <div className="flex flex-col">
                                                            <span className="text-primary">${product.discountPrice.toFixed(2)}</span>
                                                            <span className="text-[10px] text-text-sub line-through decoration-red-400/50">${product.price.toFixed(2)}</span>
                                                        </div>
                                                    ) : (
                                                        <span>${product.price.toFixed(2)}</span>
                                                    )}
                                                </td>
                                                <td className="p-3 sm:p-5">
                                                    <div className="flex flex-col gap-1 w-full max-w-[140px]">
                                                        <div className="flex flex-wrap items-center text-[10px] sm:text-xs">
                                                            <span className={`font-medium ${Number(product.stock) === 0 ? 'text-red-500' :
                                                                Number(product.stock) <= 10 ? 'text-orange-500' :
                                                                    'text-emerald-500'
                                                                }`}>
                                                                {Number(product.stock) === 0 ? t('admin.outOfStock') : `${product.stock} ${t('admin.inStock')}`}
                                                            </span>
                                                            {Number(product.stock) > 0 && Number(product.stock) <= 10 && (
                                                                <span className="text-orange-500 text-[10px] font-bold uppercase ml-1 sm:ml-2">Low</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3 sm:p-5">
                                                    <button
                                                        onClick={() => handleToggleTrending(product.id, product.isTrending)}
                                                        disabled={loadingMap[product.id]}
                                                        className={`p-1.5 rounded-lg transition-colors ${product.isTrending ? 'text-amber-500 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/10 dark:hover:bg-amber-900/20' : 'text-gray-300 hover:text-amber-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                                        title={product.isTrending ? "Remove from Trending" : "Mark as Trending"}
                                                    >
                                                        {loadingMap[product.id] ? (
                                                            <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                                                        ) : (
                                                            <span className="material-symbols-outlined text-[20px]">{product.isTrending ? 'local_fire_department' : 'local_fire_department'}</span>
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="p-3 sm:p-5">
                                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border ${Number(product.stock) > 0
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-800/50'
                                                        : 'bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                                                        }`}>
                                                        <span className={`size-1 sm:size-1.5 rounded-full ${Number(product.stock) > 0 ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                                                        {Number(product.stock) > 0 ? t('admin.active') : t('admin.draft')}
                                                    </span>
                                                </td>
                                                <td className={`p-3 sm:p-5 ${dir === 'rtl' ? 'text-left' : 'text-right'}`}>
                                                    <div className={`flex items-center ${dir === 'rtl' ? 'justify-start' : 'justify-end'} gap-1 sm:gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity`}>
                                                        {canEdit && (
                                                            <button
                                                                onClick={() => handleEdit(product)}
                                                                className="p-1.5 sm:p-2 text-text-sub dark:text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title={t('admin.editProduct')}
                                                            >
                                                                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">edit</span>
                                                            </button>
                                                        )}
                                                        {canDelete && (
                                                            <button
                                                                onClick={() => handleDelete(product.id, product.name)}
                                                                className="p-1.5 sm:p-2 text-text-sub dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors" title={t('admin.deleteProduct')}
                                                            >
                                                                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">delete</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="p-10 text-center text-text-sub dark:text-gray-500 italic">
                                                {t('admin.noProductsMatch')}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="p-3 sm:p-5 border-t border-[#e6dbdf] dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <span className="text-xs sm:text-sm text-text-sub dark:text-gray-400 order-2 sm:order-1">
                                {t('admin.showingProducts')
                                    .replace('{start}', (startIndex + 1).toString())
                                    .replace('{end}', Math.min(startIndex + itemsPerPage, filteredProducts.length).toString())
                                    .replace('{total}', filteredProducts.length.toString())}
                            </span>
                            <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-1.5 sm:p-2 border border-[#e6dbdf] dark:border-gray-700 rounded-lg text-text-sub dark:text-gray-400 hover:bg-background-light dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <span className={`material-symbols-outlined text-[18px] sm:text-[20px] ${dir === 'rtl' ? 'rotate-180' : ''}`}>chevron_left</span>
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                                        let pageNum = currentPage <= 2 ? i + 1 : currentPage - 1 + i;
                                        if (pageNum > totalPages) pageNum = totalPages - (Math.min(3, totalPages) - 1 - i);
                                        if (pageNum <= 0) return null;

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`size-8 sm:size-9 flex items-center justify-center rounded-lg text-xs sm:text-sm font-bold transition-all ${currentPage === pageNum
                                                    ? 'bg-primary text-white shadow-soft shadow-primary/40'
                                                    : 'border border-[#e6dbdf] dark:border-gray-700 text-text-sub dark:text-gray-400 hover:bg-background-light dark:hover:bg-gray-800'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    {totalPages > 3 && currentPage < totalPages - 1 && (
                                        <>
                                            <span className="text-text-sub dark:text-gray-500 px-0.5 sm:px-1">...</span>
                                            <button
                                                onClick={() => handlePageChange(totalPages)}
                                                className={`size-8 sm:size-9 flex items-center justify-center rounded-lg border border-[#e6dbdf] dark:border-gray-700 text-text-sub dark:text-gray-400 hover:bg-background-light dark:hover:bg-gray-800 text-xs sm:text-sm font-bold`}
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="p-1.5 sm:p-2 border border-[#e6dbdf] dark:border-gray-700 rounded-lg text-text-sub dark:text-gray-400 hover:bg-background-light dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <span className={`material-symbols-outlined text-[18px] sm:text-[20px] ${dir === 'rtl' ? 'rotate-180' : ''}`}>chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
