"use client";

import AdminHeader from "../../components/AdminHeader";
import { useAdminSidebar } from "../../context/AdminSidebarContext";
import { useState } from "react";
import CategoryModal from "./CategoryModal";
import { deleteCategory } from "../../../../lib/admin-actions";
import { toast } from "react-hot-toast";

interface Category {
    id: string;
    name: string;
    description: string | null;
    _count: {
        products: number;
    };
}

export default function CategoriesClient({ categories }: { categories: Category[] }) {
    const { openSidebar } = useAdminSidebar();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleAdd = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete the category "${name}"?`)) {
            try {
                const result = await deleteCategory(id);
                if (result.success) {
                    toast.success("Category deleted successfully");
                } else {
                    toast.error(result.error || "Failed to delete category");
                }
            } catch (error) {
                console.error("Error deleting category:", error);
                toast.error("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader title="Categories" onMenuClick={openSidebar} />

            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8">
                <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-text-main dark:text-white text-base md:text-lg font-bold">
                            All Categories ({categories.length})
                        </h3>
                        <button
                            onClick={handleAdd}
                            className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                            Add Category
                        </button>
                    </div>

                    <CategoryModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        category={selectedCategory}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <div key={category.id} className="p-5 md:p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-[#e6dbdf] dark:border-gray-700 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow group">
                                <div className="flex items-start justify-between">
                                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <span className="material-symbols-outlined filled text-2xl">category</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="p-1.5 text-text-sub hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                            title="Edit Category"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id, category.name)}
                                            className="p-1.5 text-text-sub hover:text-red-500 hover:bg-red-50/50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                            title="Delete Category"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-text-main dark:text-white font-bold text-lg">{category.name}</h4>
                                    <p className="text-text-sub dark:text-gray-400 text-sm mt-1 line-clamp-3 min-h-[40px]">
                                        {category.description || 'No description provided.'}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-[#e6dbdf]/50 dark:border-gray-700 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-text-sub">
                                    <span>Products Total</span>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{category._count.products}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {categories.length === 0 && (
                        <div className="text-center py-20 bg-surface-light dark:bg-surface-dark rounded-2xl border border-dashed border-[#e6dbdf] dark:border-gray-700">
                            <p className="text-text-sub italic">No categories created yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
