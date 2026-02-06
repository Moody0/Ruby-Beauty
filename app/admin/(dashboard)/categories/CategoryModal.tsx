"use client";

import { useState, useEffect } from "react";
import { createCategory, updateCategory } from "../../../../lib/admin-actions";
import { toast } from "react-hot-toast";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: {
        id: string;
        name: string;
        description: string | null;
    } | null;
}

export default function CategoryModal({ isOpen, onClose, category }: CategoryModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description || "");
        } else {
            setName("");
            setDescription("");
        }
    }, [category, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = { name, description };
            let result;

            if (category) {
                result = await updateCategory(category.id, data);
            } else {
                result = await createCategory(data);
            }

            if (result.success) {
                toast.success(`Category ${category ? "updated" : "created"} successfully!`);
                onClose();
            } else {
                toast.error(result.error || `Failed to ${category ? "update" : "create"} category`);
            }
        } catch (error) {
            console.error("Error submitting category:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-white dark:bg-surface-dark rounded-2xl shadow-2xl overflow-hidden border border-[#e6dbdf] dark:border-gray-700">
                <div className="p-6 border-b border-[#e6dbdf] dark:border-gray-700 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-text-main dark:text-white">
                        {category ? "Edit Category" : "Add New Category"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined text-gray-500">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-main dark:text-white">
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Skincare, Makeup"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-main dark:text-white">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what products belong in this category..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                        />
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-xl border border-[#e6dbdf] dark:border-gray-700 text-text-main dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                                    Saving...
                                </>
                            ) : (
                                category ? "Update Category" : "Create Category"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
