import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";

import CategoriesGrid from "./CategoriesGrid";

export const dynamic = "force-dynamic";

async function getAllCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        return categories;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export default async function CategoriesPage() {
    const categories = await getAllCategories();

    return (
        <main className="w-full pb-20">
            <nav className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-4">
                <ul className="flex items-center gap-2 text-xs font-medium text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">
                    <li><Link className="hover:text-primary transition-colors" href="/">Home</Link></li>
                    <li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
                    <li className="text-text-main-light dark:text-text-main-dark">All Categories</li>
                </ul>
            </nav>

            <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-12">
                <div className="border-l-4 border-primary pl-6">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-text-main-light dark:text-text-main-dark tracking-tight">Shop by Category</h2>
                    <p className="mt-3 text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl">
                        Explore our curated selections of premium beauty essentials. From botanical skincare to professional tools, find everything you need for your daily ritual.
                    </p>
                </div>
            </section>

            <CategoriesGrid categories={categories} />


            <section className="max-w-[1200px] mx-auto px-4 md:px-8 mt-24">
                <div className="rounded-3xl bg-primary/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/10">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <h4 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark">Can&apos;t decide where to start?</h4>
                        <p className="text-text-muted-light dark:text-text-muted-dark max-w-md">Take our Skin Quiz to get a personalized routine curated just for you by our beauty experts.</p>
                        <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
                            <Link href="/products" className="px-8 py-3 bg-transparent border border-primary text-primary rounded-full font-bold text-sm hover:bg-primary/5 transition-all">View All Products</Link>
                        </div>
                    </div>
                    <div className="hidden lg:block w-1/3">
                        <img
                            alt="Product selection"
                            className="rounded-2xl shadow-2xl rotate-3 scale-110"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-S_GMsoebb73JIEWcxtvH2G-vVgkfypE8ysWpGMNiiiwyTno8rIbMCpHR-fsa76ZQL49aYswb7bGZh-kgwc6z9lv0VwUSUrStxNWz2qU3RuIb75ShOMAKZMRyrOXZHZjEBgtxfW7r97FEEshOkEd2MqgE6FpGYrmKa8msLtMOQxXBsmhr3ZGGEtL7jpzgMYbgrAXhiHcMfCspdvD5FRNuSbgFY9_xGqcJM9KbgG0MoC4Ie4WkkmCR4FsuavfglcnY13G2ADZxlK8F"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
