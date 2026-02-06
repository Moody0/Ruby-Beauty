import React from 'react';
import { prisma } from "@/lib/prisma";
import { notFound } from 'next/navigation';
import ProductBreadcrumbs from '@/app/components/ProductDetailsComponents/ProductBreadcrumbs';
import ProductGallery from '@/app/components/ProductDetailsComponents/ProductGallery';
import ProductInfo from '@/app/components/ProductDetailsComponents/ProductInfo';
import ProductActions from '@/app/components/ProductDetailsComponents/ProductActions';
import ProductAccordions from '@/app/components/ProductDetailsComponents/ProductAccordions';
import RelatedProducts from '@/app/components/ProductDetailsComponents/RelatedProducts';

// ProductPageProps removed as it was unused and replaced by inline props

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
        <div className="flex-grow w-full mx-auto px-6 py-8 md:px-20 lg:px-32 xl:px-48 2xl:px-64 lg:py-12">
            <ProductBreadcrumbs productName={product.name} />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-20">
                {/* Product Gallery (Left) */}
                <div className="lg:col-span-2">
                    <ProductGallery images={product.images} isTrending={product.isTrending} />
                </div>

                {/* Product Details (Right) */}
                <div className="flex flex-col lg:col-span-3">
                    <ProductInfo name={product.name} description={product.description} price={product.price.toString()} />

                    {/* Description */}
                    <div className="mb-8">
                        <p className="text-base leading-relaxed text-text-main dark:text-white/80">
                            {product.description || 'Unlock your skin&apos;s natural luminosity with our concentrated Vitamin C serum.'}
                        </p>
                    </div>

                    <ProductActions product={{
                        id: product.id,
                        name: product.name,
                        price: Number(product.price),
                        image: product.images,
                        slug: product.slug
                    }} />

                    {/* Trust Badges - Could be componentized too but leaving inline for now or move to separate file if requested */}
                    <div className="flex flex-wrap justify-center gap-6 mb-10 border-t border-[#f4f0f2] dark:border-white/10">
                    </div>

                    <ProductAccordions />
                </div>
            </div>

            <RelatedProducts products={relatedProducts.map(p => ({
                ...p,
                price: p.price.toString()
            }))} />
        </div>
    );
}

export default ProductPage;