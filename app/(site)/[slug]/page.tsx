import React from 'react';
import { prisma } from "@/lib/prisma";
import { notFound } from 'next/navigation';
import ProductBreadcrumbs from '@/app/components/ProductDetailsComponents/ProductBreadcrumbs';
import ProductGallery from '@/app/components/ProductDetailsComponents/ProductGallery';
import ProductInfo from '@/app/components/ProductDetailsComponents/ProductInfo';
import ProductActions from '@/app/components/ProductDetailsComponents/ProductActions';
import ProductAccordions from '@/app/components/ProductDetailsComponents/ProductAccordions';
import RelatedProducts from '@/app/components/ProductDetailsComponents/RelatedProducts';

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
            <ProductBreadcrumbs productName={product.name} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
                {/* Product Gallery (Left) */}
                <ProductGallery images={product.images as any} isTrending={(product as any).isTrending} />

                {/* Product Details (Right) */}
                <div className="flex flex-col">
                    <ProductInfo name={product.name} description={product.description} price={product.price.toString()} />

                    {/* Description */}
                    <div className="mb-8">
                        <p className="text-base leading-relaxed text-text-main dark:text-white/80">
                            {product.description || 'Unlock your skin\'s natural luminosity with our concentrated Vitamin C serum.'}
                        </p>
                    </div>

                    <ProductActions product={{
                        id: product.id,
                        name: product.name,
                        price: Number(product.price),
                        image: product.images as any,
                        slug: (product as any).slug || params.slug // Fallback to params.slug if product.slug missing in type
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