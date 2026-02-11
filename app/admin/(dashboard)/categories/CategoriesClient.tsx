"use client";

import AdminHeader from "../../components/AdminHeader";
import { useAdminSidebar } from "../../context/AdminSidebarContext";
import { useState } from "react";
import CategoryModal from "./CategoryModal";
import { deleteCategory, toggleCategoryFeatured, bulkFixCategoryNames } from "../../../../lib/admin-actions";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/app/context/LanguageContext";

interface Category {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    isFeatured: boolean;
    _count: {
        products: number;
    };
}

export default function CategoriesClient({ categories }: { categories: Category[] }) {
    const { data: session } = useSession();
    const { t, dir } = useLanguage();
    const canManage = session?.user?.role === 'SUPER_ADMIN' || session?.user?.canManageCategories;
    const canDelete = session?.user?.role === 'SUPER_ADMIN' || session?.user?.canDeleteCategories;

    const { openSidebar } = useAdminSidebar();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

    const [isFixing, setIsFixing] = useState(false);

    const handleFixGarbledNames = async () => {
        const garbled = categories.filter(c => /[^\x00-\x7F]/.test(c.name));
        if (garbled.length === 0) {
            toast.success("No garbled names found!");
            return;
        }

        if (!confirm(`Found ${garbled.length} categories with encoding issues. Fix them?`)) return;

        setIsFixing(true);
        try {
            const mapping = garbled.map(c => {
                let fixedName = c.name;
                try {
                    fixedName = Buffer.from(c.name, 'binary').toString('utf8');
                } catch (e) {}
                return { id: c.id, newName: fixedName };
            }).filter(item => item.newName !== categories.find(c => c.id === item.id)?.name);

            if (mapping.length === 0) {
                toast.success("No names could be automatically fixed.");
                return;
            }

            const result = await bulkFixCategoryNames(mapping);
            if (result.success) {
                toast.success(`Fixed ${mapping.length} category names!`);
            } else {
                toast.error("Failed to fix names.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during cleanup.");
        } finally {
            setIsFixing(false);
        }
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (category.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    );

    const handleAdd = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(t('admin.confirmDeleteCategory').replace('{name}', name))) {
            try {
                const result = await deleteCategory(id);
                if (result.success) {
                    toast.success(t('admin.categoryDeleted'));
                } else {
                    toast.error(result.error || "Failed to delete category");
                }
            } catch (error) {
                console.error("Error deleting category:", error);
                toast.error("An unexpected error occurred");
            }
        }
    };

    const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
        setLoadingMap(prev => ({ ...prev, [id]: true }));
        try {
            const result = await toggleCategoryFeatured(id, !currentStatus);
            if (result.success) {
                toast.success(!currentStatus ? t('admin.categoryFeatured') : t('admin.categoryUnfeatured'));
            } else {
                toast.error(result.error || "Failed to update status");
            }
        } catch (error) {
            console.error("Error toggling category featured status:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setLoadingMap(prev => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader title={t('admin.categories')} onMenuClick={openSidebar} />

            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <div className="">
                            <h3 className="text-2xl font-bold text-text-main dark:text-white">
                                {t('admin.productCategories')}
                            </h3>
                            <p className="text-text-sub dark:text-gray-400 mt-1">
                                {t('admin.manageCategories')}
                            </p>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 items-center">
                            {/* Featured Count Indicator */}
                            <div className={`hidden md:flex flex-col items-end ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`}>
                                <span className="text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400">{t('admin.featured')}</span>
                                <span className="text-sm font-bold text-primary">
                                    {categories.filter(c => c.isFeatured).length} / 8 {t('admin.active')}
                                </span>
                            </div>

                            <div className="relative w-full md:w-72">
                                <span className={`material-symbols-outlined absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-text-sub/50 dark:text-gray-400/50 text-xl`}>search</span>
                                <input
                                    type="text"
                                    placeholder={t('admin.searchCategories')}
                                    className={`w-full ${dir === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-surface-light dark:bg-surface-dark border border-border-color/50 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text-main dark:text-white`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {canManage && (
                                <button
                                    onClick={handleAdd}
                                    className="w-full md:w-auto bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined">add</span>
                                    {t('admin.addCategory')}
                                </button>
                            )}
                        </div>
                    </div>

                    <CategoryModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        category={selectedCategory}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCategories.map((category) => (
                            <div key={category.id} className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-color/50 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                                <div className="category-card-image w-full h-[200px] overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    {category.image ? (
                                        <img
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            src={category.image}
                                        />
                                    ) : (
                                        <span className="material-symbols-outlined text-4xl text-text-sub/40">image</span>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">{category.name}</h3>
                                    <p className="text-sm text-text-sub dark:text-gray-400 line-clamp-2 mb-4">
                                        {category.description || t('admin.noDescription')}
                                    </p>
                                    <div className="w-full flex items-center justify-between pt-4 border-t border-border-color/30 dark:border-gray-700">
                                        <span className="bg-primary-light dark:bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                                            {category._count.products} {t('admin.products')}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {canManage && (
                                                <button
                                                    onClick={() => handleToggleFeatured(category.id, category.isFeatured)}
                                                    disabled={loadingMap[category.id]}
                                                    className={`p-2 rounded-lg transition-colors ${category.isFeatured ? 'text-amber-500 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/10 dark:hover:bg-amber-900/20' : 'text-gray-400 hover:text-amber-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                                    title={category.isFeatured ? t('admin.removeFromHome') : t('admin.featureOnHome')}
                                                >
                                                    {loadingMap[category.id] ? (
                                                        <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                                                    ) : (
                                                        <span className="material-symbols-outlined text-[20px]">{category.isFeatured ? 'star' : 'star_border'}</span>
                                                    )}
                                                </button>
                                            )}
                                            {canManage && (
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="p-2 text-text-sub hover:text-primary hover:bg-primary-light dark:hover:bg-primary/10 rounded-lg transition-colors"
                                                    title={t('admin.editCategory')}
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                            )}
                                            {canDelete && (
                                                <button
                                                    onClick={() => handleDelete(category.id, category.name)}
                                                    className="p-2 text-text-sub hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                                    title={t('admin.deleteCategory')}
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCategories.length === 0 && (
                        <div className="text-center py-20 bg-surface-light dark:bg-surface-dark rounded-2xl border border-dashed border-border-color dark:border-gray-700">
                            <span className="material-symbols-outlined text-5xl text-text-sub/30 mb-4">search_off</span>
                            <p className="text-text-sub italic">
                                {searchQuery ? t('admin.noCategoriesFound') : t('admin.noCategoriesCreated')}
                            </p>
                            {!searchQuery && (
                                <button
                                    onClick={handleAdd}
                                    className="mt-4 text-primary font-bold hover:underline"
                                >
                                    {t('admin.createFirstCategory')}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
