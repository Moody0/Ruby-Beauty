"use client";

import { useState } from "react";
import { deleteUser } from "@/lib/user-actions";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useAdminSidebar } from "../../context/AdminSidebarContext";
import AdminHeader from "../../components/AdminHeader";
import UserModal from "./UserModal";
import { useLanguage } from "@/app/context/LanguageContext";

interface User {
    id: string;
    username: string;
    role: string;
    canManageProducts: boolean;
    canDeleteProducts: boolean;
    canManageCategories: boolean;
    canDeleteCategories: boolean;
    canManageBanners: boolean;
    canDeleteBanners: boolean;
    canManageOrders: boolean;
    canDeleteOrders: boolean;
    canManagePromoCodes: boolean;
    canDeletePromoCodes: boolean;
    createdAt: Date | string;
}

export default function UsersClient({ users }: { users: User[] }) {
    const { openSidebar } = useAdminSidebar();
    const { t, dir } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, username: string) => {
        if (username === 'admin') {
            toast.error(t('admin.cannotDeleteAdmin'));
            return;
        }

        if (confirm(t('admin.confirmDeleteUser').replace('{username}', username))) {
            try {
                const result = await deleteUser(id);
                if (result.success) {
                    toast.success("User deleted successfully");
                } else {
                    toast.error(result.error || "Failed to delete user");
                }
            } catch (error) {
                toast.error("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark">
            <AdminHeader title={t('admin.userManagement')} onMenuClick={openSidebar} />

            <div className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-8">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-6 md:gap-8 pb-10">

                    {/* Page Heading & Breadcrumbs */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="flex flex-col gap-1">
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-sm text-text-sub dark:text-gray-400 mb-1">
                                <Link href="/admin/dashboard" className="hover:text-primary cursor-pointer transition-colors">{t('admin.dashboard')}</Link>
                                <span className={`material-symbols-outlined text-[12px] ${dir === 'rtl' ? 'rotate-180' : ''}`}>chevron_right</span>
                                <span className="text-text-main dark:text-white font-medium">{t('admin.userManagement')}</span>
                            </div>
                            <h2 className="text-3xl font-extrabold text-text-main dark:text-white tracking-tight">{t('admin.systemUsers')}</h2>
                            <p className="text-text-sub dark:text-gray-400">{t('admin.manageSubAdmins')}</p>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedUser(null);
                                setIsModalOpen(true);
                            }}
                            className="bg-primary hover:bg-primary/90 text-white h-12 px-6 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span className="material-symbols-outlined text-[20px]">person_add</span>
                            {t('admin.addNewUser')}
                        </button>
                    </div>

                    <UserModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedUser(null);
                        }}
                        user={selectedUser}
                    />

                    <div className="bg-surface-light dark:bg-surface-dark border border-[#e6dbdf] dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-background-light dark:bg-gray-800/50 border-b border-[#e6dbdf] dark:border-gray-700 text-xs font-bold text-text-sub dark:text-gray-400 uppercase tracking-wider">
                                        <th className={`p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('admin.username')}</th>
                                        <th className={`p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('admin.role')}</th>
                                        <th className={`p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('admin.permissionsSummary')}</th>
                                        <th className={`p-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('admin.createdAt')}</th>
                                        <th className={`p-5 ${dir === 'rtl' ? 'text-left' : 'text-right'}`}>{t('admin.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#e6dbdf] dark:divide-gray-700">
                                    {users.map((user) => (
                                        <tr key={user.id} className="group hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                                        {user.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <p className="font-bold text-text-main dark:text-white">{user.username}</p>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'SUPER_ADMIN'
                                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                    }`}>
                                                    {user.role === 'SUPER_ADMIN' ? t('admin.superAdmin') : user.role.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex flex-wrap gap-1">
                                                    {user.role === 'SUPER_ADMIN' ? (
                                                        <span className="text-xs text-text-sub dark:text-gray-400 italic">{t('admin.unlimitedAccess')}</span>
                                                    ) : (
                                                        <>
                                                            {user.canManageProducts && <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-text-sub dark:text-gray-300">{t('admin.products')}{!user.canDeleteProducts && " (No Delete)"}</span>}
                                                            {user.canManageCategories && <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-text-sub dark:text-gray-300">{t('admin.categories')}{!user.canDeleteCategories && " (No Delete)"}</span>}
                                                            {user.canManageBanners && <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-text-sub dark:text-gray-300">{t('admin.banners')}{!user.canDeleteBanners && " (No Delete)"}</span>}
                                                            {user.canManageOrders && <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-text-sub dark:text-gray-300">{t('admin.orders')}{!user.canDeleteOrders && " (No Delete)"}</span>}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-5 text-sm text-text-sub dark:text-gray-400">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className={`p-5 ${dir === 'rtl' ? 'text-left' : 'text-right'}`}>
                                                <div className={`flex items-center ${dir === 'rtl' ? 'justify-start' : 'justify-end'} gap-2`}>
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                        title={t('admin.editUser')}
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                                    </button>
                                                    {user.username !== 'admin' && (
                                                        <button
                                                            onClick={() => handleDelete(user.id, user.username)}
                                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                            title={t('admin.deleteUser')}
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
