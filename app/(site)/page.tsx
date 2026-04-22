import Main from "../components/HomePageComponents/Main";
import {
    getActiveBanners,
    getFeaturedCategories,
    getHomeCollectionSections,
    getOnSaleProducts,
    getTrendingProducts,
} from "../../lib/admin-actions";

export const revalidate = 86400; // Revalidate every 24 hours

export default async function Home() {
    const [banners, categories, collectionSections, trendingProducts, onSaleProducts] =
        await Promise.all([
            getActiveBanners(),
            getFeaturedCategories(),
            getHomeCollectionSections(),
            getTrendingProducts(),
            getOnSaleProducts(),
        ]);

    return (
        <section>
            <Main
                banners={banners}
                categories={categories}
                collectionSections={collectionSections}
                trendingProducts={trendingProducts}
                onSaleProducts={onSaleProducts}
            />
        </section>
    );
}
