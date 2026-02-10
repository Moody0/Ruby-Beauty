import Main from "../components/HomePageComponents/Main";
import { getActiveBanners, getFeaturedCategories, getTrendingProducts, getOnSaleProducts } from "../../lib/admin-actions";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
    const banners = await getActiveBanners();
    const categories = await getFeaturedCategories();
    const trendingProducts = await getTrendingProducts();
    const onSaleProducts = await getOnSaleProducts();

    return (
        <section>
            <Main
                banners={banners}
                categories={categories}
                trendingProducts={trendingProducts}
                onSaleProducts={onSaleProducts}
            />
        </section>
    );
}
