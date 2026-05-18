"use client";

import { useMemo, useState } from "react";
import AdminHeader from "../../components/AdminHeader";
import { useAdminSidebar } from "../../context/AdminSidebarContext";
import MainCategoryModal from "./MainCategoryModal";
import { deleteMainCategory, toggleMainCategoryActive } from "../../../../lib/admin-actions";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { MdAdd, MdDelete, MdEdit, MdImage, MdSearch, MdSync, MdToggleOff, MdToggleOn } from "react-icons/md";

interface MainCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    isActive: boolean;
    isFeatured: boolean;
    _count: {
        brands: number;
        categories: number;
        products: number;
    };
}

export default function MainCategoriesClient({ mainCategories }: { mainCategories: MainCategory[] }) {
    const { openSidebar } = useAdminSidebar();
    const { data: session } = useSession();
    const isSuperAdmin = session?.user?.role === "SUPER_ADMIN";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState<MainCategory | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

    const filtered = useMemo(() => {
        return mainCategories.filter((mc) =>
            mc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (mc.description || "").toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [mainCategories, searchQuery]);

    const handleAdd = () => {
        setSelected(null);
        setIsModalOpen(true);
    };

    const handleEdit = (mc: MainCategory) => {
        setSelected(mc);
        setIsModalOpen(true);
    };

    const handleDelete = async (mc: MainCategory) => {
        if (!confirm(`Are you sure you want to delete "${mc.name}"?`)) return;
        const result = await deleteMainCategory(mc.id);
        if (result.success) {
            toast.success("Main category deleted");
        } else {
            toast.error(result.error || "Failed to delete");
        }
    };

    const handleToggleActive = async (mc: MainCategory) => {
        setLoadingMap((c) => ({ ...c, [mc.id]: true }));
        const result = await toggleMainCategoryActive(mc.id, !mc.isActive);
        if (result.success) toast.success("Updated");
        else toast.error(result.error || "Failed to update");
        setLoadingMap((c) => ({ ...c, [mc.id]: false }));
    };

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <AdminHeader title="Main Categories" onMenuClick={openSidebar} />

            <div className="flex-1 overflow-y-auto bg-background-light p-8 dark:bg-background-dark">
                <div className="mx-auto max-w-[1200px]">
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-text-main dark:text-white">Main Categories</h2>
                            <p className="mt-1 text-text-sub dark:text-gray-400">
                                Manage your top-level store departments (e.g. Ruby Beauty, Makeup, Accessories)
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative">
                                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-text-sub/60" />
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="h-11 w-full rounded-xl border border-[#e6dbdf] bg-white pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-surface-dark dark:text-white sm:w-64"
                                />
                            </div>
                            {isSuperAdmin && (
                                <button onClick={handleAdd} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition-colors hover:bg-primary/90">
                                    <MdAdd className="text-xl" />
                                    Add Main Category
                                </button>
                            )}
                        </div>
                    </div>

                    <MainCategoryModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        mainCategory={selected}
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((mc) => (
                            <article key={mc.id} className="overflow-hidden rounded-xl border border-[#e6dbdf] bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-surface-dark">
                                <div className="flex h-36 items-center justify-center bg-gray-50 dark:bg-gray-800">
                                    {mc.image ? (
                                        <img src={mc.image} alt={mc.name} className="h-full w-full object-contain" />
                                    ) : (
                                        <MdImage className="text-5xl text-text-sub/30" />
                                    )}
                                </div>
                                <div className="p-5">
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="truncate text-lg font-bold text-text-main dark:text-white">{mc.name}</h3>
                                            <p className="text-xs font-bold uppercase tracking-wider text-primary">{mc.slug}</p>
                                        </div>
                                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${mc.isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
                                            {mc.isActive ? "Active" : "Draft"}
                                        </span>
                                    </div>

                                    <p className="mb-4 line-clamp-2 min-h-[40px] text-sm text-text-sub dark:text-gray-400">
                                        {mc.description || "No description"}
                                    </p>

                                    <div className="mb-4 flex flex-wrap gap-2 text-xs font-bold text-text-sub dark:text-gray-400">
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{mc._count.brands} Brands</span>
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300">{mc._count.categories} Categories</span>
                                        <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">{mc._count.products} Products</span>
                                    </div>

                                    <div className="flex items-center justify-end gap-2 border-t border-[#e6dbdf] pt-4 dark:border-gray-700">
                                        {isSuperAdmin && (
                                            <button onClick={() => handleToggleActive(mc)} className="rounded-lg p-2 text-text-sub transition-colors hover:bg-primary/10 hover:text-primary" title="Toggle active">
                                                {loadingMap[mc.id] ? <MdSync className="animate-spin text-xl" /> : mc.isActive ? <MdToggleOn className="text-2xl text-emerald-500" /> : <MdToggleOff className="text-2xl" />}
                                            </button>
                                        )}
                                        {isSuperAdmin && (
                                            <button onClick={() => handleEdit(mc)} className="rounded-lg p-2 text-text-sub transition-colors hover:bg-primary/10 hover:text-primary" title="Edit">
                                                <MdEdit className="text-xl" />
                                            </button>
                                        )}
                                        {isSuperAdmin && (
                                            <button onClick={() => handleDelete(mc)} className="rounded-lg p-2 text-text-sub transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/10" title="Delete">
                                                <MdDelete className="text-xl" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
