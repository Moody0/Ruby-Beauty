"use client";

import AdminHeader from "../../components/AdminHeader";
import Link from "next/link";
import { useAdminSidebar } from "../../context/AdminSidebarContext";
import { useState } from "react";
import OrderDetailsModal from "../orders/OrderDetailsModal";
import { useLanguage } from "@/app/context/LanguageContext";

interface RecentOrder {
    id: string;
    Name: string;
    customer: string;
    phone: string;
    streetAddress: string;
    city: string;
    product: string;
    date: string;
    amount: string;
    totalAmount: number;
    status: string;
    statusColor: string;
    createdAt: string;
    items: {
        id: string;
        quantity: number;
        price: number;
        product: {
            name: string;
            images: string;
        } | null;
    }[];
}

interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalCategories: number;
    recentOrders: RecentOrder[];
}

export default function DashboardClient({ stats }: { stats: DashboardStats }) {
    const { openSidebar } = useAdminSidebar();
    const { t, dir } = useLanguage();
    const [selectedOrder, setSelectedOrder] = useState<RecentOrder | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const handleViewDetails = (order: RecentOrder) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader title={t('admin.overview')} onMenuClick={openSidebar} />

            {/* Scrollable Dashboard Content */}
            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-6 md:gap-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {/* Revenue Card */}
                        <div className="flex flex-col gap-4 rounded-xl p-5 md:p-6 bg-surface-light dark:bg-surface-dark shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none border border-[#e6dbdf]/50 dark:border-gray-700">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined filled">attach_money</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-text-sub dark:text-gray-400 text-sm font-medium">
                                    {t('admin.totalRevenue')}
                                </p>
                                <h3 className="text-text-main dark:text-white text-xl md:text-2xl font-bold mt-1">
                                    ${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </h3>
                            </div>
                        </div>

                        {/* Orders Card */}
                        <div className="flex flex-col gap-4 rounded-xl p-5 md:p-6 bg-surface-light dark:bg-surface-dark shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none border border-[#e6dbdf]/50 dark:border-gray-700">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined filled">shopping_bag</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-text-sub dark:text-gray-400 text-sm font-medium">
                                    {t('admin.totalOrders')}
                                </p>
                                <h3 className="text-text-main dark:text-white text-xl md:text-2xl font-bold mt-1">
                                    {stats.totalOrders}
                                </h3>
                            </div>
                        </div>

                        {/* Products Card */}
                        <div className="flex flex-col gap-4 rounded-xl p-5 md:p-6 bg-surface-light dark:bg-surface-dark shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none border border-[#e6dbdf]/50 dark:border-gray-700">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined filled">checkroom</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-text-sub dark:text-gray-400 text-sm font-medium">
                                    {t('admin.activeProducts')}
                                </p>
                                <h3 className="text-text-main dark:text-white text-xl md:text-2xl font-bold mt-1">
                                    {stats.totalProducts}
                                </h3>
                            </div>
                        </div>

                        {/* Categories Card */}
                        <div className="flex flex-col gap-4 rounded-xl p-5 md:p-6 bg-surface-light dark:bg-surface-dark shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none border border-[#e6dbdf]/50 dark:border-gray-700">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined filled">category</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-text-sub dark:text-gray-400 text-sm font-medium">
                                    {t('admin.categories')}
                                </p>
                                <h3 className="text-text-main dark:text-white text-xl md:text-2xl font-bold mt-1">
                                    {stats.totalCategories}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-text-main dark:text-white text-base md:text-lg font-bold leading-tight tracking-tight">
                                {t('admin.recentOrders')}
                            </h3>
                            <Link
                                href="/admin/orders"
                                className="text-primary hover:text-primary-hover text-sm font-bold transition-colors"
                            >
                                {t('admin.viewAll')}
                            </Link>
                        </div>

                        <OrderDetailsModal
                            isOpen={isDetailsModalOpen}
                            onClose={() => {
                                setIsDetailsModalOpen(false);
                                setSelectedOrder(null);
                            }}
                            order={selectedOrder as any}
                        />

                        <div className="rounded-xl border border-[#e6dbdf] dark:border-gray-700 bg-surface-light dark:bg-surface-dark overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[640px]">
                                    <thead>
                                        <tr className="border-b border-[#e6dbdf] dark:border-gray-700 bg-background-light/50 dark:bg-gray-800/50">
                                            <th className={`p-3 md:p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                {t('admin.orderId')}
                                            </th>
                                            <th className={`p-3 md:p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                {t('admin.customer')}
                                            </th>
                                            <th className={`p-3 md:p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                {t('admin.product')}
                                            </th>
                                            <th className={`p-3 md:p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                {t('admin.date')}
                                            </th>
                                            <th className={`p-3 md:p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                {t('admin.amount')}
                                            </th>
                                            <th className={`p-3 md:p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                                                {t('admin.status')}
                                            </th>
                                            <th className={`p-3 md:p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400`}></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e6dbdf] dark:divide-gray-700">
                                        {stats.recentOrders.length > 0 ? (
                                            stats.recentOrders.map((order) => (
                                                <tr
                                                    key={order.id}
                                                    className="hover:bg-background-light dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <td className="p-3 md:p-4 text-sm font-bold text-text-main dark:text-white">
                                                        #{order.id.slice(-6).toUpperCase()}
                                                    </td>
                                                    <td className="p-3 md:p-4 text-sm text-text-main dark:text-white">
                                                        {order.customer}
                                                    </td>
                                                    <td className="p-3 md:p-4 text-sm text-text-sub dark:text-gray-400">
                                                        {order.items.length > 0
                                                            ? (order.items[0]?.product?.name || t('admin.unknown')) + (order.items.length > 1 ? ` + ${order.items.length - 1} ${t('common.more')}` : '')
                                                            : t('admin.unknown')}
                                                    </td>
                                                    <td className="p-3 md:p-4 text-sm text-text-sub dark:text-gray-400">
                                                        {new Date(order.createdAt).toLocaleDateString(dir === 'rtl' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </td>
                                                    <td className="p-3 md:p-4 text-sm font-bold text-text-main dark:text-white">
                                                        {order.amount}
                                                    </td>
                                                    <td className="p-3 md:p-4">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 rounded-full text-xs font-bold ${order.statusColor === "blue"
                                                                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300"
                                                                : order.statusColor === "amber"
                                                                    ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300"
                                                                    : order.statusColor === "emerald"
                                                                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300"
                                                                        : order.statusColor === "red"
                                                                            ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300"
                                                                            : "bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-300"
                                                                }`}
                                                        >
                                                            <span
                                                                className={`size-1.5 rounded-full ${order.statusColor === "blue"
                                                                    ? "bg-blue-500"
                                                                    : order.statusColor === "amber"
                                                                        ? "bg-amber-500"
                                                                        : order.statusColor === "emerald"
                                                                            ? "bg-emerald-500"
                                                                            : order.statusColor === "red"
                                                                                ? "bg-red-500"
                                                                                : "bg-gray-500"
                                                                    }`}
                                                            ></span>
                                                            {t(`admin.${order.status.toLowerCase()}`)}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 md:p-4 text-right">
                                                        <button
                                                            onClick={() => handleViewDetails(order)}
                                                            className="text-text-sub hover:text-text-main dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
                                                        >
                                                            <span className="material-symbols-outlined">
                                                                more_vert
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7} className="p-8 text-center text-text-sub dark:text-gray-500 italic">
                                                    {t('admin.noRecentOrders')}
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
        </div>
    );
}
