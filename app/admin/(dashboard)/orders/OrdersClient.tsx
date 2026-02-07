"use client";

import AdminHeader from "../../components/AdminHeader";
import { useAdminSidebar } from "../../context/AdminSidebarContext";
import Link from "next/link";
import { updateOrderStatus } from "../../../../lib/admin-actions";
import { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Order {
    id: string;
    Name: string;
    phone: string;
    streetAddress: string;
    city: string;
    totalAmount: number;
    status: string;
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

export default function OrdersClient({ orders }: { orders: Order[] }) {
    const { data: session } = useSession();
    const canManage = session?.user?.role === 'SUPER_ADMIN' || session?.user?.canManageOrders;

    const { openSidebar } = useAdminSidebar();
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [filter, setFilter] = useState<string>("ALL");

    // Calculate stats
    const stats = {
        pending: orders.filter(o => o.status === 'PENDING').length,
        shippedToday: orders.filter(o => {
            const date = new Date(o.createdAt);
            const today = new Date();
            return o.status === 'SHIPPED' &&
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
        }).length,
        deliveredMTD: orders.filter(o => {
            const date = new Date(o.createdAt);
            const today = new Date();
            return o.status === 'DELIVERED' &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
        }).length,
        totalRevenue: orders
            .filter(o => o.status === 'DELIVERED')
            .reduce((sum, o) => sum + Number(o.totalAmount), 0)
    };

    const filteredOrders = orders.filter(o => {
        if (filter === "ALL") return true;
        return o.status === filter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'DELIVERED': return 'emerald';
            case 'PROCESSING': return 'blue';
            case 'PENDING': return 'amber';
            case 'CANCELLED': return 'red';
            case 'SHIPPED': return 'purple';
            default: return 'gray';
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        setUpdatingId(id);
        try {
            const result = await updateOrderStatus(id, newStatus as OrderStatus);
            if (!result.success) {
                alert(result.error || "Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("An error occurred");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader title="Orders" onMenuClick={openSidebar} />

            <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-8">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-lg">
                                    <span className="material-symbols-outlined filled">pending_actions</span>
                                </div>
                            </div>
                            <p className="text-text-sub dark:text-gray-400 text-sm font-medium">Pending Orders</p>
                            <h3 className="text-text-main dark:text-white text-2xl font-bold mt-1">{stats.pending}</h3>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                                    <span className="material-symbols-outlined filled">local_shipping</span>
                                </div>
                            </div>
                            <p className="text-text-sub dark:text-gray-400 text-sm font-medium">Shipped Today</p>
                            <h3 className="text-text-main dark:text-white text-2xl font-bold mt-1">{stats.shippedToday}</h3>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-lg">
                                    <span className="material-symbols-outlined filled">task_alt</span>
                                </div>
                            </div>
                            <p className="text-text-sub dark:text-gray-400 text-sm font-medium">Delivered (MTD)</p>
                            <h3 className="text-text-main dark:text-white text-2xl font-bold mt-1">{stats.deliveredMTD}</h3>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                    <span className="material-symbols-outlined filled">payments</span>
                                </div>
                            </div>
                            <p className="text-text-sub dark:text-gray-400 text-sm font-medium">Total Revenue</p>
                            <h3 className="text-text-main dark:text-white text-2xl font-bold mt-1">
                                ${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </h3>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <h3 className="text-text-main dark:text-white text-lg font-bold">All Orders ({filteredOrders.length})</h3>
                                <div className="flex bg-white dark:bg-surface-dark rounded-lg p-1 border border-[#e6dbdf] dark:border-gray-700">
                                    <button
                                        onClick={() => setFilter("ALL")}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${filter === "ALL" ? "bg-primary text-white shadow-sm" : "text-text-sub hover:text-text-main"}`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setFilter("PENDING")}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${filter === "PENDING" ? "bg-amber-500 text-white shadow-sm" : "text-text-sub hover:text-amber-600"}`}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => setFilter("SHIPPED")}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${filter === "SHIPPED" ? "bg-purple-500 text-white shadow-sm" : "text-text-sub hover:text-purple-600"}`}
                                    >
                                        Shipped
                                    </button>
                                    <button
                                        onClick={() => setFilter("DELIVERED")}
                                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${filter === "DELIVERED" ? "bg-emerald-500 text-white shadow-sm" : "text-text-sub hover:text-emerald-600"}`}
                                    >
                                        Delivered
                                    </button>
                                </div>
                            </div>
                        </div>

                        <OrderDetailsModal
                            isOpen={isDetailsModalOpen}
                            onClose={() => {
                                setIsDetailsModalOpen(false);
                                setSelectedOrder(null);
                            }}
                            order={selectedOrder}
                        />

                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-[#e6dbdf] dark:border-gray-700 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#e6dbdf] dark:border-gray-700 bg-background-light/50 dark:bg-gray-800/50">
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400">Order ID</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400">Customer Name</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400">Date</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400">Total Amount</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400">Products</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400">Order Status</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-gray-400 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e6dbdf] dark:divide-gray-700">
                                        {filteredOrders.map((order) => {
                                            const statusColor = getStatusColor(order.status);
                                            return (
                                                <tr key={order.id} className="hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors">
                                                    <td className="p-4 text-sm font-bold text-text-main dark:text-white">#{order.id.slice(-6).toUpperCase()}</td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-sm font-medium text-text-main dark:text-white">{order.Name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-sm text-text-sub dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                                    <td className="p-4 text-sm font-bold text-text-main dark:text-white">${Number(order.totalAmount).toFixed(2)}</td>
                                                    <td className="p-4">
                                                        <span className="text-xs font-medium text-text-sub bg-background-light dark:bg-gray-800 px-2.5 py-1 rounded-lg border border-[#e6dbdf] dark:border-gray-700 max-w-[150px] truncate block">
                                                            {order.items.map(i => i.product?.name).join(', ') || 'Unknown'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="relative group/status w-fit">
                                                            <select
                                                                disabled={updatingId === order.id || !canManage}
                                                                value={order.status}
                                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                                className={`appearance-none pl-8 pr-10 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all outline-none border bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary/20 ${statusColor === "blue" ? "text-blue-600 border-blue-100 dark:text-blue-300 dark:border-blue-900/50" :
                                                                    statusColor === "amber" ? "text-amber-600 border-amber-100 dark:text-amber-300 dark:border-amber-900/50" :
                                                                        statusColor === "emerald" ? "text-emerald-600 border-emerald-100 dark:text-emerald-300 dark:border-emerald-900/50" :
                                                                            statusColor === "red" ? "text-red-600 border-red-100 dark:text-red-300 dark:border-red-900/50" :
                                                                                statusColor === "purple" ? "text-purple-600 border-purple-100 dark:text-purple-300 dark:border-purple-900/50" :
                                                                                    "text-gray-600 border-gray-100 dark:text-gray-300 dark:border-gray-800"
                                                                    }`}
                                                            >
                                                                <option value="PENDING">PENDING</option>
                                                                <option value="PROCESSING">PROCESSING</option>
                                                                <option value="SHIPPED">SHIPPED</option>
                                                                <option value="DELIVERED">DELIVERED</option>
                                                                <option value="CANCELLED">CANCELLED</option>
                                                            </select>
                                                            <span className={`absolute left-3 top-1/2 -translate-y-1/2 size-2 rounded-full ${statusColor === "blue" ? "bg-blue-500" :
                                                                statusColor === "amber" ? "bg-amber-500" :
                                                                    statusColor === "emerald" ? "bg-emerald-500" :
                                                                        statusColor === "red" ? "bg-red-500" :
                                                                            statusColor === "purple" ? "bg-purple-500" : "bg-gray-500"
                                                                }`}></span>
                                                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[16px] pointer-events-none text-text-sub dark:text-gray-500">
                                                                {updatingId === order.id ? 'sync' : 'expand_more'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <button
                                                            onClick={() => handleViewDetails(order)}
                                                            className="text-primary hover:text-primary-hover text-xs font-bold transition-colors"
                                                        >
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {filteredOrders.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="p-12 text-center text-text-sub italic">
                                                    No orders found for this filter.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-[#e6dbdf] dark:border-gray-700 bg-background-light/30 dark:bg-gray-800/30 flex items-center justify-between">
                                <p className="text-xs text-text-sub dark:text-gray-400 font-medium">
                                    Showing {filteredOrders.length} of {orders.length} entries
                                </p>
                                <div className="flex items-center gap-2">
                                    <button className="size-8 flex items-center justify-center rounded-lg border border-[#e6dbdf] dark:border-gray-700 text-text-sub hover:bg-white dark:hover:bg-gray-800 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                    </button>
                                    <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm shadow-primary/20">1</button>
                                    <button className="size-8 flex items-center justify-center rounded-lg border border-[#e6dbdf] dark:border-gray-700 text-text-sub hover:bg-white dark:hover:bg-gray-800 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
