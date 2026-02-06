"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
    { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard", filled: true },
    { href: "/admin/products", icon: "shopping_bag", label: "Products" },
    { href: "/admin/categories", icon: "category", label: "Categories" },
    { href: "/admin/orders", icon: "package_2", label: "Orders" },
];

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();

    const handleSignOut = () => {
        signOut({ callbackUrl: "/admin/login" });
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 shrink-0 border-r border-[#e6dbdf] dark:border-gray-700 bg-surface-light dark:bg-surface-dark flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="h-full flex flex-col justify-between p-4">
                    <div className="flex flex-col gap-6">
                        {/* Logo & Brand */}
                        <div className="flex items-center justify-between px-2 py-2">
                            <div className="flex flex-col">
                                <h1 className="text-text-main dark:text-white text-lg font-bold leading-tight">
                                    Ruby Beauty
                                </h1>
                                <p className="text-text-sub dark:text-gray-400 text-xs font-normal">
                                    Admin Panel
                                </p>
                            </div>
                            {/* Close button for mobile */}
                            <button
                                onClick={onClose}
                                className="lg:hidden text-text-sub dark:text-gray-400 hover:text-text-main dark:hover:text-white"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-text-sub dark:text-gray-400 hover:bg-background-light dark:hover:bg-gray-800 hover:text-text-main dark:hover:text-white"
                                            } group`}
                                    >
                                        <span
                                            className={`material-symbols-outlined ${item.filled && isActive ? "filled" : ""
                                                } ${!isActive ? "group-hover:text-primary transition-colors" : ""}`}
                                        >
                                            {item.icon}
                                        </span>
                                        <p
                                            className={`text-sm leading-normal ${isActive ? "font-bold" : "font-medium"
                                                }`}
                                        >
                                            {item.label}
                                        </p>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col gap-2 border-t border-[#e6dbdf] dark:border-gray-700 pt-4">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-sub dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                        >
                            <span className="material-symbols-outlined group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                logout
                            </span>
                            <p className="text-sm font-medium leading-normal">Sign Out</p>
                        </button>

                        <div className="flex items-center gap-3 px-3 py-2 mt-2">
                            <div className="flex flex-col">
                                <p className="text-text-main dark:text-white text-sm font-medium leading-tight">
                                    Admin
                                </p>
                                <p className="text-text-sub dark:text-gray-500 text-xs font-normal">
                                    Super Admin
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
