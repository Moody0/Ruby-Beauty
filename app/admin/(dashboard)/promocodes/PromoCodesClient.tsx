"use client";

import AdminHeader from "../../components/AdminHeader";
import { useAdminSidebar } from "../../context/AdminSidebarContext";
import { useState } from "react";
import PromoCodeModal from "./PromoCodeModal";
import { deletePromoCode, togglePromoCodeStatus } from "../../../../lib/admin-actions";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

interface PromoCode {
    id: string;
    code: string;
    discountPercentage: number;
    delegateName: string | null;
    isActive: boolean;
    totalSales: number;
    thisMonthSales: number;
    usageCount: number;
    createdAt: string;
}

export default function PromoCodesClient({ promoCodes }: { promoCodes: PromoCode[] }) {
    const { data: session } = useSession();
    const canManage = session?.user?.role === 'SUPER_ADMIN' || session?.user?.canManagePromoCodes;
    const canDelete = session?.user?.role === 'SUPER_ADMIN' || session?.user?.canDeletePromoCodes;

    const { openSidebar } = useAdminSidebar();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromoCode, setSelectedPromoCode] = useState<PromoCode | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

    const filteredPromoCodes = promoCodes.filter(pc =>
        pc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pc.delegateName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    );

    const handleAdd = () => {
        setSelectedPromoCode(null);
        setIsModalOpen(true);
    };

    const handleEdit = (pc: PromoCode) => {
        setSelectedPromoCode(pc);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, code: string) => {
        if (confirm(`Are you sure you want to delete the promo code "${code}"?`)) {
            try {
                const result = await deletePromoCode(id);
                if (result.success) {
                    toast.success("Promo code deleted successfully");
                } else {
                    toast.error(result.error || "Failed to delete promo code");
                }
            } catch (error) {
                console.error("Error deleting promo code:", error);
                toast.error("An unexpected error occurred");
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        setLoadingMap(prev => ({ ...prev, [id]: true }));
        try {
            const result = await togglePromoCodeStatus(id, !currentStatus);
            if (result.success) {
                toast.success(`Promo code ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
            } else {
                toast.error(result.error || "Failed to update status");
            }
        } catch (error) {
            console.error("Error toggling promo code status:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setLoadingMap(prev => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader title="Promo Codes" onMenuClick={openSidebar} />

            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                        <div className="">
                            <h3 className="text-2xl font-bold text-text-main dark:text-white">
                                Promo Codes & Delegates
                            </h3>
                            <p className="text-text-sub dark:text-gray-400 mt-1">
                                Manage discount codes and track delegate sales performance.
                            </p>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative w-full md:w-72">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-sub/50 dark:text-gray-400/50 text-xl">search</span>
                                <input
                                    type="text"
                                    placeholder="Search codes or delegates..."
                                    className="w-full pl-10 pr-4 py-3 bg-surface-light dark:bg-surface-dark border border-border-color/50 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text-main dark:text-white"
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
                                    Add Promo Code
                                </button>
                            )}
                        </div>
                    </div>

                    <PromoCodeModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        promoCode={selectedPromoCode}
                    />

                    {/* Stats Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm flex flex-col gap-1">
                            <p className="text-text-sub dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Total Sales</p>
                            <p className="text-2xl font-bold text-text-main dark:text-white">
                                ${promoCodes.reduce((sum, pc) => sum + pc.totalSales, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm flex flex-col gap-1">
                            <p className="text-text-sub dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Active Codes</p>
                            <p className="text-2xl font-bold text-emerald-500">
                                {promoCodes.filter(pc => pc.isActive).length}
                            </p>
                        </div>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-color/50 dark:border-gray-700 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-border-color/50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                        <th className="p-5 text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">Code</th>
                                        <th className="p-5 text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">Discount</th>
                                        <th className="p-5 text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">Delegate</th>
                                        <th className="p-5 text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">Total Sales</th>
                                        <th className="p-5 text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">This Month</th>
                                        <th className="p-5 text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">Usage</th>
                                        <th className="p-5 text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="p-5 text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-color/50 dark:divide-gray-700">
                                    {filteredPromoCodes.map((pc) => (
                                        <tr key={pc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="p-5">
                                                <span className="font-mono font-bold text-text-main dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                                    {pc.code}
                                                </span>
                                            </td>
                                            <td className="p-5 font-bold text-primary">
                                                {pc.discountPercentage}%
                                            </td>
                                            <td className="p-5 text-text-main dark:text-white font-medium">
                                                {pc.delegateName || <span className="text-text-sub dark:text-gray-500 italic">None</span>}
                                            </td>
                                            <td className="p-5 font-bold text-text-main dark:text-white">
                                                ${pc.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="p-5 font-bold text-emerald-600 dark:text-emerald-400">
                                                ${pc.thisMonthSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="p-5 text-text-sub dark:text-gray-400">
                                                {pc.usageCount}
                                            </td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${pc.isActive
                                                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                                                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                                                    }`}>
                                                    {pc.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex justify-end gap-2">
                                                    {canManage && (
                                                        <button
                                                            onClick={() => handleToggleStatus(pc.id, pc.isActive)}
                                                            disabled={loadingMap[pc.id]}
                                                            className={`p-2 rounded-lg transition-colors ${pc.isActive ? 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10' : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10'}`}
                                                            title={pc.isActive ? "Deactivate" : "Activate"}
                                                        >
                                                            {loadingMap[pc.id] ? (
                                                                <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                                                            ) : (
                                                                <span className="material-symbols-outlined text-[20px]">{pc.isActive ? 'toggle_on' : 'toggle_off'}</span>
                                                            )}
                                                        </button>
                                                    )}
                                                    {canManage && (
                                                        <button
                                                            onClick={() => handleEdit(pc)}
                                                            className="p-2 text-text-sub hover:text-primary hover:bg-primary-light dark:hover:bg-primary/10 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                        </button>
                                                    )}
                                                    {canDelete && (
                                                        <button
                                                            onClick={() => handleDelete(pc.id, pc.code)}
                                                            className="p-2 text-text-sub hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredPromoCodes.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="text-center py-12 text-text-sub/50">
                                                {searchQuery ? "No promo codes match your search." : "No promo codes created yet."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
