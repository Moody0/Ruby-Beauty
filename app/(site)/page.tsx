import Main from "../components/HomePageComponents/Main";
import { getActiveBanners, getFeaturedCategories, getTrendingProducts } from "../../lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function Home() {
    const banners = await getActiveBanners();
    const categories = await getFeaturedCategories();
    const trendingProducts = await getTrendingProducts();

    return (
        <section>
            <Main banners={banners} categories={categories} trendingProducts={trendingProducts} />
        </section>
    );
}
