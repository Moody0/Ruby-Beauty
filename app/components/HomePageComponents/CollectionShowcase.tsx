import Link from "next/link";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import type { HomeCollectionSection } from "@/lib/admin-actions";
import ProductCard from "../ProductsPageComponents/ProductCard";
import ResilientImage from "@/app/components/ResilientImage";

interface CollectionShowcaseProps {
    sections: HomeCollectionSection[];
    t: (key: string) => string;
    dir: "ltr" | "rtl";
    language: "en" | "ar";
}

const panelThemes = [
    "border-[#f1dbe3] bg-gradient-to-br from-[#fff7f9] via-white to-[#fff0f4] dark:border-white/10 dark:from-[#301821] dark:via-[#241218] dark:to-[#1c0f14]",
    "border-[#eedee8] bg-gradient-to-br from-[#fff6fb] via-white to-[#fff5ef] dark:border-white/10 dark:from-[#2f1824] dark:via-[#241218] dark:to-[#201117]",
    "border-[#f0e2ea] bg-gradient-to-br from-[#fffaf7] via-white to-[#fff2f6] dark:border-white/10 dark:from-[#2d1a1f] dark:via-[#241218] dark:to-[#1f1117]",
] as const;

const CollectionShowcase = ({ sections, t, dir, language }: CollectionShowcaseProps) => {
    if (!sections.length) {
        return null;
    }

    return (
        <section className="container-custom py-4 md:py-8">
            <div className="flex flex-col gap-8 md:gap-12">
                {sections.map((section, index) => {
                    const theme = panelThemes[index % panelThemes.length];
                    const reverseOnLarge = index % 2 === 1;
                    const desktopGrid = reverseOnLarge
                        ? "lg:grid-cols-[1.28fr_0.72fr]"
                        : "lg:grid-cols-[0.72fr_1.28fr]";

                    return (
                        <article
                            key={section.category.id}
                            className={`overflow-hidden rounded-[2rem] border ${theme} premium-shadow`}
                        >
                            <div className={`grid gap-8 p-5 md:p-8 lg:items-center lg:gap-10 lg:p-10 ${desktopGrid}`}>
                                <div className={`flex flex-col justify-center ${reverseOnLarge ? "lg:order-2" : ""}`}>
                                    <div className="lg:rounded-[1.6rem] lg:border lg:border-white/70 lg:bg-white/50 lg:p-8 dark:lg:border-white/10 dark:lg:bg-white/5">
                                        <div className="flex items-start justify-between gap-3 sm:items-center lg:flex-col lg:items-start lg:gap-5">
                                            <h2 className="flex-1 text-3xl font-extrabold tracking-tight text-text-main-light dark:text-text-main-dark md:text-4xl xl:text-[2.8rem]">
                                                {section.category.name}
                                            </h2>
                                            <Link
                                                href={`/categories/${section.category.slug}`}
                                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-primary/90 sm:px-6 sm:py-3 sm:text-sm"
                                            >
                                                {t("home.shopNow")}
                                                <MdChevronRight className={dir === "rtl" ? "rotate-180" : ""} />
                                            </Link>
                                        </div>

                                        <div className="mt-3 lg:mt-6">
                                            <span className="inline-flex rounded-full bg-black/5 px-3 py-1 text-sm font-medium text-text-muted-light dark:bg-white/10 dark:text-text-muted-dark">
                                                {section.category.productCount} {t("home.productsLabel")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`relative min-h-[260px] overflow-hidden rounded-[1.9rem] border border-white/80 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] lg:min-h-[320px] dark:border-white/10 dark:bg-white/5 ${reverseOnLarge ? "lg:order-1" : ""}`}>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(238,43,108,0.18),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(244,180,207,0.24),transparent_32%)]" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/10 dark:from-white/10 dark:to-black/25" />
                                    <div className="absolute inset-0">
                                        <ResilientImage
                                            src={section.category.image}
                                            alt={section.category.name}
                                            className="h-full w-full object-cover transition-transform duration-700"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="absolute inset-x-4 bottom-4 rounded-[1.35rem] border border-white/20 bg-black/30 p-4 backdrop-blur-md md:inset-x-6 md:bottom-6 md:p-5">
                                        <div className="flex items-end justify-between gap-3">
                                            <p className="text-xl font-bold text-white md:text-2xl">
                                                {section.category.name}
                                            </p>
                                            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90">
                                                {section.category.productCount} {t("home.productsLabel")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden justify-items-center border-t border-white/70 bg-white/65 p-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:p-6 xl:grid-cols-6 dark:border-white/10 dark:bg-background-dark/20">
                                {section.products.map((product) => (
                                    <ProductCard key={product.id} product={product} t={t} language={language} variant="compact" />
                                ))}
                            </div>

                            <div className="overflow-x-auto px-4 pb-4 md:hidden scrollbar-hide">
                                <div className="flex gap-4 snap-x snap-mandatory">
                                    {section.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="w-[189px] min-w-[189px] flex-none snap-start"
                                        >
                                            <ProductCard product={product} t={t} language={language} variant="compact" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default CollectionShowcase;
