import React from 'react';
import { prisma } from "@/lib/prisma";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/app/components/ProductsPageComponents/ProductCard';

interface ProductPageProps {
    params: {
        slug: string;
    };
}

const ProductPage = async (props: { params: Promise<{ slug: string }> }) => {
    const params = await props.params;
    // Fetch product by slug
    const product = await prisma.product.findUnique({
        where: {
            slug: params.slug,
        },
    });

    if (!product) {
        notFound();
    }

    // Fetch related products (same category, exclude current)
    const relatedProducts = await prisma.product.findMany({
        where: {
            categoryId: product.categoryId,
            id: { not: product.id },
        },
        take: 4,
    });

    return (
        <div className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 lg:py-12">
            {/* Breadcrumbs */}
            <nav className="flex mb-8 text-sm font-medium text-text-muted dark:text-white/60">
                <ol className="flex items-center space-x-2">
                    <li><Link className="hover:text-primary transition-colors" href="/">Home</Link></li>
                    <li><span className="material-symbols-outlined text-[16px] align-middle">chevron_right</span></li>
                    <li><Link className="hover:text-primary transition-colors" href="/products">Shop</Link></li>
                    <li><span className="material-symbols-outlined text-[16px] align-middle">chevron_right</span></li>
                    <li><span className="text-text-main dark:text-white font-semibold">{product.name}</span></li>
                </ol>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
                {/* Product Gallery (Left) */}
                <div className="flex flex-col gap-4 sticky top-28 self-start h-fit">
                    {/* Main Image */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#f0eff0] dark:bg-white/5 group">
                        <div
                            className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url('${product.images}')` }}
                        >
                        </div>
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {product.isTrending && (
                                <span className="bg-white/90 dark:bg-black/50 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-text-main dark:text-white shadow-sm">Trending</span>
                            )}
                        </div>
                    </div>
                    {/* Thumbnails */}

                </div>
                {/* Product Details (Right) */}
                <div className="flex flex-col">
                    {/* Header Info */}
                    <div className="mb-6 border-b border-[#f4f0f2] dark:border-white/10 pb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex text-yellow-400 text-sm">
                                <span className="material-symbols-outlined text-[18px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-[18px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-[18px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-[18px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-[18px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                            </div>
                            <span className="text-sm font-medium text-text-muted dark:text-white/60 underline decoration-text-muted/50 transition-colors">4.8 (342 Reviews)</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-text-main dark:text-white tracking-tight mb-2">{product.name}</h1>
                        <p className="text-lg font-medium text-text-muted dark:text-white/60 mb-4">{product.description || 'Premium beauty product'}</p>
                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-bold text-primary">${Number(product.price).toFixed(2)}</span>
                            {/* Removed hardcoded discount */}
                        </div>
                    </div>
                    {/* Description */}
                    <div className="mb-8">
                        <p className="text-base leading-relaxed text-text-main dark:text-white/80">
                            {product.description || 'Unlock your skin\'s natural luminosity with our concentrated Vitamin C serum.'}
                        </p>
                    </div>
                    {/* Product Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-[#e6dbdf] dark:border-white/20 rounded-xl h-14 w-full sm:w-40 px-2 bg-white dark:bg-surface-dark">
                            <button className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-primary active:scale-90 transition-all">
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                            <input className="w-full text-center bg-transparent border-none text-lg font-bold text-text-main dark:text-white p-0 focus:ring-0" readOnly type="text" value="1" />
                            <button className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-primary active:scale-90 transition-all">
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                        {/* Add to Cart Button */}
                        <button className="flex-1 h-14 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                            <span className="material-symbols-outlined">shopping_bag</span>
                            Add to Cart
                        </button>
                        {/* Favorite Button */}
                        <button className="h-14 w-14 border border-[#e6dbdf] dark:border-white/20 rounded-xl flex items-center justify-center text-primary hover:bg-primary/5 dark:hover:bg-white/5 transition-colors group">
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
                        </button>
                    </div>
                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-6 mb-10 py-4 border-y border-[#f4f0f2] dark:border-white/10">
                        <div className="flex items-center gap-2 text-sm font-semibold text-text-muted dark:text-white/70">
                            <span className="material-symbols-outlined text-primary">eco</span>
                            Vegan
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-text-muted dark:text-white/70">
                            <span className="material-symbols-outlined text-primary">pets</span>
                            Cruelty-Free
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-text-muted dark:text-white/70">
                            <span className="material-symbols-outlined text-primary">science</span>
                            Paraben-Free
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-text-muted dark:text-white/70">
                            <span className="material-symbols-outlined text-primary">local_shipping</span>
                            Free Shipping
                        </div>
                    </div>
                    {/* Accordion Sections */}
                    <div className="flex flex-col gap-4">
                        {/* Ingredients */}
                        <details className="group bg-white dark:bg-surface-dark rounded-xl border border-[#f4f0f2] dark:border-white/10 overflow-hidden">
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-text-main dark:text-white select-none hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">water_drop</span>
                                    Key Ingredients
                                </span>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="px-5 pb-5 pt-2 text-text-muted dark:text-white/70 text-sm leading-relaxed border-t border-[#f4f0f2] dark:border-white/10">
                                <p className="mb-2"><strong className="text-text-main dark:text-white">Premium Extraction:</strong> sourced from the finest ingredients.</p>
                            </div>
                        </details>
                        {/* How to Use */}
                        <details className="group bg-white dark:bg-surface-dark rounded-xl border border-[#f4f0f2] dark:border-white/10 overflow-hidden">
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-text-main dark:text-white select-none hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">face_3</span>
                                    How to Use
                                </span>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="px-5 pb-5 pt-2 text-text-muted dark:text-white/70 text-sm leading-relaxed border-t border-[#f4f0f2] dark:border-white/10">
                                <ol className="list-decimal list-inside space-y-2">
                                    <li>Cleanse skin thoroughly and pat dry.</li>
                                    <li>Apply 3-4 drops to the face and neck, avoiding the eye area.</li>
                                    <li>Gently massage in upward circular motions until fully absorbed.</li>
                                    <li>Follow with your favorite moisturizer and SPF during the day.</li>
                                </ol>
                            </div>
                        </details>
                        {/* Reviews Summary */}
                        <details className="group bg-white dark:bg-surface-dark rounded-xl border border-[#f4f0f2] dark:border-white/10 overflow-hidden" id="reviews" open>
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-text-main dark:text-white select-none hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">rate_review</span>
                                    Customer Reviews
                                </span>
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                            </summary>
                            <div className="px-5 pb-5 pt-2 border-t border-[#f4f0f2] dark:border-white/10">
                                <div className="flex flex-col gap-6">
                                    {/* Rating Summary Component reuse style */}
                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-text-main dark:text-white text-4xl font-black leading-tight">4.8</p>
                                            <div className="flex gap-0.5 text-yellow-400">
                                                <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                                            </div>
                                            <p className="text-text-muted dark:text-white/60 text-sm">Based on 342 reviews</p>
                                        </div>
                                        <div className="flex-1 min-w-[200px] grid grid-cols-[12px_1fr_30px] items-center gap-y-2 gap-x-3 text-xs">
                                            <p className="text-text-main dark:text-white font-medium">5</p>
                                            <div className="h-2 w-full bg-[#f4f0f2] dark:bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                                            </div>
                                            <p className="text-text-muted dark:text-white/50 text-right">80%</p>
                                            <p className="text-text-main dark:text-white font-medium">4</p>
                                            <div className="h-2 w-full bg-[#f4f0f2] dark:bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: '12%' }}></div>
                                            </div>
                                            <p className="text-text-muted dark:text-white/50 text-right">12%</p>
                                            <p className="text-text-main dark:text-white font-medium">3</p>
                                            <div className="h-2 w-full bg-[#f4f0f2] dark:bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: '5%' }}></div>
                                            </div>
                                            <p className="text-text-muted dark:text-white/50 text-right">5%</p>
                                            <p className="text-text-main dark:text-white font-medium">2</p>
                                            <div className="h-2 w-full bg-[#f4f0f2] dark:bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: '2%' }}></div>
                                            </div>
                                            <p className="text-text-muted dark:text-white/50 text-right">2%</p>
                                            <p className="text-text-main dark:text-white font-medium">1</p>
                                            <div className="h-2 w-full bg-[#f4f0f2] dark:bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: '1%' }}></div>
                                            </div>
                                            <p className="text-text-muted dark:text-white/50 text-right">1%</p>
                                        </div>
                                    </div>
                                    <button className="w-full py-3 border border-text-main dark:border-white/20 rounded-lg text-sm font-bold hover:bg-background-light dark:hover:bg-white/5 transition-colors text-text-main dark:text-white">
                                        Read All Reviews
                                    </button>
                                </div>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <section className="mt-20 border-t border-[#f4f0f2] dark:border-white/10 pt-16">
                    <h3 className="text-2xl font-bold mb-8 text-text-main dark:text-white">Complete Your Routine</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(related => (
                            // Cast to any to bypass stale Prisma types (isTrending/slug missing in generated client)
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            <ProductCard key={related.id} product={related as any} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default ProductPage