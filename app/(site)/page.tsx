import Main from "../components/HomePageComponents/Main";
import {
    getActiveBanners,
    getMainCategoryBrands,
    getBestSellerProducts,
    getOnSaleProducts,
    getNewArrivalProducts,
    getSiteSettings,
    getTrendingWeeklyProducts,
    getFeaturedCategories,
} from "../../lib/admin-actions";

export const revalidate = 86400; // Revalidate every 24 hours

export default async function Home() {
    const [banners, mainBrands, featuredBestSellers, featuredNewArrivals, featuredBundles, settings, trendingWeekly, featuredCategories] =
        await Promise.all([
            getActiveBanners(),
            getMainCategoryBrands(),
            getBestSellerProducts(),
            getNewArrivalProducts(),
            getOnSaleProducts(),
            getSiteSettings(),
            getTrendingWeeklyProducts(),
            getFeaturedCategories(),
        ]);

    return (
        <section>
            <Main
                banners={banners}
                mainBrands={mainBrands}
                featuredNewArrivals={featuredNewArrivals}
                featuredBundles={featuredBundles}
                featuredBestSellers={featuredBestSellers}
                settings={settings}
                trendingWeekly={trendingWeekly}
                featuredCategories={featuredCategories}
            />
        </section>
    );
}