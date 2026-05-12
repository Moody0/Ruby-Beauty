import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import ResilientImage from "@/app/components/ResilientImage";
import type { HomeBrand } from "@/lib/admin-actions";

interface MainBrandsProps {
    brands: HomeBrand[];
    t: (key: string) => string;
    dir: "ltr" | "rtl";
}

const fallbackImage = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800";

export default function MainBrands({ brands, t, dir }: MainBrandsProps) {
    if (!brands.length) return null;

    return (
        <section className="container-custom py-4 md:py-8">
            <div className="mb-6 flex items-center justify-between px-2">
                <div>
                    <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">
                        {t("brands.mainBrands")}
                    </h2>
                    <p className="mt-1 text-sm text-text-muted-light dark:text-text-muted-dark">
                        {t("brands.homeDescription")}
                    </p>
                </div>
                <Link className="flex items-center gap-1 text-sm font-medium text-primary" href="/brands">
                    {t("common.viewAll")} <MdChevronRight className={`text-sm ${dir === "rtl" ? "rotate-180" : ""}`} />
                </Link>
            </div>

            <div className="overflow-x-auto px-2 scrollbar-hide">
                <div className="flex gap-4">
                    {brands.map((brand) => (
                        <Link
                            key={brand.id}
                            href={`/brands/${brand.slug}`}
                            className="group w-[152px] min-w-[152px] rounded-xl border border-[#e6dbdf] bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg dark:border-white/10 dark:bg-white/5 md:w-[180px] md:min-w-[180px]"
                        >
                            <div className="aspect-square overflow-hidden rounded-lg bg-[#faf4f6] dark:bg-white/5">
                                <ResilientImage
                                    src={brand.image || fallbackImage}
                                    alt={brand.name}
                                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <p className="mt-3 truncate text-sm font-bold text-text-main-light transition-colors group-hover:text-primary dark:text-white">
                                {brand.name}
                            </p>
                            <p className="mt-1 text-xs text-text-muted-light dark:text-white/50">
                                {brand._count.products} {t("home.productsLabel")}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
