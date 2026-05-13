import Main from "../components/HomePageComponents/Main";
import {
    getActiveBanners,
    getMainCategoryBrands,
    getBestSellerProducts,
    getSiteSettings,
} from "../../lib/admin-actions";

export const revalidate = 86400; // Revalidate every 24 hours

export default async function Home() {
    const [banners, mainBrands, bestSellerProducts, settings] =
        await Promise.all([
            getActiveBanners(),
            getMainCategoryBrands(),
            getBestSellerProducts(),
            getSiteSettings(),
        ]);

    return (
        <section>
            <Main
                banners={banners}
                mainBrands={mainBrands}
                bestSellerProducts={bestSellerProducts}
                settings={settings}
            />
        </section>
    );
}