import Main from "../components/HomePageComponents/Main";
import {
    getActiveBanners,
    getFeaturedCategories,
    getFeaturedMainBrands,
    getHomeCollectionSections,
    getOnSaleProducts,
    getTrendingProducts,
} from "../../lib/admin-actions";

export const revalidate = 86400; // Revalidate every 24 hours

export default async function Home() {
    const [banners, categories, collectionSections, mainBrands, trendingProducts, onSaleProducts] =
        await Promise.all([
            getActiveBanners(),
            getFeaturedCategories(),
            getHomeCollectionSections(),
            getFeaturedMainBrands(),
            getTrendingProducts(),
            getOnSaleProducts(),
        ]);

    return (
        <section>
            <Main
                banners={banners}
                categories={categories}
                collectionSections={collectionSections}
                mainBrands={mainBrands}
                trendingProducts={trendingProducts}
                onSaleProducts={onSaleProducts}
            />
        </section>
    );
}
