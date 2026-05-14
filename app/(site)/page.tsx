import Main from "../components/HomePageComponents/Main";
import {
    getActiveBanners,
    getMainCategoryBrands,
    getBestSellerProducts,
    getOnSaleProducts,
    getNewArrivalProducts,
    getSiteSettings,
} from "../../lib/admin-actions";

export const revalidate = 86400; // Revalidate every 24 hours

export default async function Home() {
    const [banners, mainBrands, featuredBestSellers, featuredNewArrivals, featuredBundles, settings] =
        await Promise.all([
            getActiveBanners(),
            getMainCategoryBrands(),
            getBestSellerProducts(),
            getNewArrivalProducts(),
            getOnSaleProducts(),
            getSiteSettings(),
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
            />
        </section>
    );
}