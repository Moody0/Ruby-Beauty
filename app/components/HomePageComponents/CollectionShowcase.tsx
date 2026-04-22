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
                    const description = section.category.description || t("products.categoryDescriptionFallback");

                    return (
                        <article
                            key={section.category.id}
                            className={`overflow-hidden rounded-[2rem] border ${theme} premium-shadow`}
                        >
                            <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
                                <div className={`flex flex-col justify-center gap-6 ${reverseOnLarge ? "lg:order-2" : ""}`}>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                                            {t("home.collectionSpotlight")}
                                        </span>
                                        <span className="rounded-full border border-[#ead5de] bg-white/80 px-4 py-1.5 text-xs font-semibold text-text-muted-light dark:border-white/10 dark:bg-white/5 dark:text-text-muted-dark">
                                            {section.category.productCount} {t("home.productsLabel")}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                            <div className="max-w-2xl">
                                                <h2 className="text-3xl font-extrabold tracking-tight text-text-main-light dark:text-text-main-dark md:text-4xl xl:text-[2.8rem]">
                                                    {section.category.name}
                                                </h2>
                                                <p className="mt-3 max-w-2xl text-sm leading-7 text-text-muted-light dark:text-text-muted-dark md:text-base">
                                                    {description}
                                                </p>
                                            </div>

                                            <Link
                                                href={`/categories/${section.category.slug}`}
                                                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:gap-3"
                                            >
                                                {t("home.shopNow")}
                                                <MdChevronRight className={dir === "rtl" ? "rotate-180" : ""} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className={`relative min-h-[240px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/60 dark:border-white/10 dark:bg-white/5 ${reverseOnLarge ? "lg:order-1" : ""}`}>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(238,43,108,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(244,180,207,0.28),transparent_34%)]" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                    <div className="absolute inset-0">
                                        <ResilientImage
                                            src={section.category.image}
                                            alt={section.category.name}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-5 md:p-6">
                                        <div className="max-w-xs">
                                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                                                {t("products.categoryCollection")}
                                            </p>
                                            <p className="mt-2 text-xl font-bold text-white">
                                                {section.category.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden border-t border-white/70 bg-white/65 p-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:p-6 xl:grid-cols-6 dark:border-white/10 dark:bg-background-dark/20">
                                {section.products.map((product) => (
                                    <ProductCard key={product.id} product={product} t={t} language={language} />
                                ))}
                            </div>

                            <div className="overflow-x-auto px-4 pb-4 md:hidden scrollbar-hide">
                                <div className="flex gap-4 snap-x snap-mandatory">
                                    {section.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="w-[74vw] max-w-[280px] flex-none snap-start"
                                        >
                                            <ProductCard product={product} t={t} language={language} />
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
