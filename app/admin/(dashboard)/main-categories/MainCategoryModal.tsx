"use client";

import { useEffect, useState } from "react";
import { MdClose, MdSync } from "react-icons/md";
import { createMainCategory, updateMainCategory } from "../../../../lib/admin-actions";
import { toast } from "react-hot-toast";

interface MainCategory {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    isActive: boolean;
    isFeatured: boolean;
}

interface MainCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    mainCategory?: MainCategory | null;
}

export default function MainCategoryModal({ isOpen, onClose, mainCategory }: MainCategoryModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        isActive: true,
        isFeatured: false,
    });

    useEffect(() => {
        if (mainCategory) {
            setFormData({
                name: mainCategory.name,
                description: mainCategory.description || "",
                image: mainCategory.image || "",
                isActive: mainCategory.isActive,
                isFeatured: mainCategory.isFeatured,
            });
        } else {
            setFormData({
                name: "",
                description: "",
                image: "",
                isActive: true,
                isFeatured: false,
            });
        }
    }, [mainCategory, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const result = mainCategory
                ? await updateMainCategory(mainCategory.id, formData)
                : await createMainCategory(formData);

            if (result.success) {
                toast.success(mainCategory ? "Main category updated" : "Main category created");
                onClose();
            } else {
                toast.error(result.error || "Failed to save");
            }
        } catch (error) {
            console.error("Error saving main category:", error);
            toast.error("Failed to save main category");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#e6dbdf] bg-white shadow-2xl dark:border-gray-700 dark:bg-surface-dark">
                <div className="flex items-center justify-between border-b border-[#e6dbdf] p-6 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-text-main dark:text-white">
                        {mainCategory ? "Edit Main Category" : "Add Main Category"}
                    </h2>
                    <button onClick={onClose} className="rounded-lg p-1 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                        <MdClose className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex max-h-[80vh] flex-col gap-5 overflow-y-auto p-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-text-main dark:text-white">Name</span>
                        <input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="rounded-xl border border-[#e6dbdf] bg-white px-4 py-3 text-text-main outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-text-main dark:text-white">Image URL</span>
                        <input
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="rounded-xl border border-[#e6dbdf] bg-white px-4 py-3 text-text-main outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-text-main dark:text-white">Description</span>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="resize-none rounded-xl border border-[#e6dbdf] bg-white px-4 py-3 text-text-main outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                    </label>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="flex items-center gap-3 rounded-xl border border-[#e6dbdf] bg-background-light p-4 dark:border-gray-700 dark:bg-gray-800/50">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-bold text-text-main dark:text-white">Active</span>
                        </label>
                        <label className="flex items-center gap-3 rounded-xl border border-[#e6dbdf] bg-background-light p-4 dark:border-gray-700 dark:bg-gray-800/50">
                            <input
                                type="checkbox"
                                checked={formData.isFeatured}
                                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-bold text-text-main dark:text-white">Featured</span>
                        </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-[#e6dbdf] px-4 py-3 font-bold text-text-main transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-white transition-all hover:bg-primary/90 disabled:opacity-50">
                            {isSubmitting && <MdSync className="animate-spin text-lg" />}
                            {mainCategory ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
