import React from 'react';
import { prisma } from "@/lib/prisma";
import { notFound } from 'next/navigation';
import ProductGallery from '@/app/components/ProductDetailsComponents/ProductGallery';
import ProductHeader from '@/app/components/ProductDetailsComponents/ProductHeader';
import ProductPrice from '@/app/components/ProductDetailsComponents/ProductPrice';
import ProductActions from '@/app/components/ProductDetailsComponents/ProductActions';
import ProductAccordions from '@/app/components/ProductDetailsComponents/ProductAccordions';
import RelatedProducts from '@/app/components/ProductDetailsComponents/RelatedProducts';

// ProductPageProps removed as it was unused and replaced by inline props

const ProductPage = async (props: { params: Promise<{ slug: string }> }) => {
    const params = await props.params;
    // Fetch product by slug using raw query to bypass potential client schema mismatch
    const result = await prisma.$queryRaw<any[]>`SELECT * FROM "Product" WHERE slug = ${params.slug} LIMIT 1`;
    const product = result[0];

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
        <div className="grow w-full mx-auto px-6 py-8 md:px-20 lg:px-32 xl:px-48 2xl:px-64 lg:py-12">
            
            {/* Mobile Header (Title & Description above image) - REMOVED per request */}
            {/* <div className="block lg:hidden mb-6">
                <ProductHeader
                    name={product.name}
                    description={product.description}
                />
            </div> */}

            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-12 xl:gap-20">
                {/* Product Gallery (Left) */}
                <div className="lg:col-span-2 order-1">
                    <ProductGallery 
                        images={product.images} 
                        isTrending={product.isTrending} 
                    />
                </div>

                {/* Product Details (Right) */}
                <div className="flex flex-col lg:col-span-3 order-2">
                    {/* Header (Title & Description) - Visible on all screens now */}
                    <div className="block">
                        <ProductHeader
                            name={product.name}
                            description={product.description}
                        />
                    </div>
                    
                    <ProductPrice
                        price={product.price.toString()}
                        discountPrice={product.discountPrice?.toString()}
                    />

                    {/* Description - REMOVED per request */}
                    {/* <div className="mb-8">
                        <p className="text-base leading-relaxed text-text-main dark:text-white/80">
                            {product.description || 'Unlock your skin&apos;s natural luminosity with our concentrated Vitamin C serum.'}
                        </p>
                    </div> */}

                    <ProductActions product={{
                        id: product.id,
                        name: product.name,
                        price: Number(product.price),
                        image: product.images.split(',')[0],
                        slug: product.slug
                    }} />

                    <ProductAccordions />
                </div>
            </div>

            <RelatedProducts products={relatedProducts.map(p => ({
                ...p,
                price: Number(p.price),
                discountPrice: p.discountPrice ? Number(p.discountPrice) : null,
                discountType: p.discountType,
                discountValue: p.discountValue ? Number(p.discountValue) : null,
                createdAt: p.createdAt.toISOString(),
                updatedAt: p.updatedAt.toISOString(),
            }))} />
        </div>
    );
}

export default ProductPage;