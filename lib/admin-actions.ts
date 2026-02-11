"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

interface ProductInput {
    name: string;
    description?: string;
    price: string | number;
    discountPrice?: string | number | null;
    discountType?: string | null;
    discountValue?: string | number | null;
    stock: string | number;
    sku?: string;
    images: string;
    categoryId: string;
}

interface CategoryInput {
    name: string;
    description?: string;
    image?: string;
    isFeatured?: boolean;
}

export async function getDashboardStats() {
    try {
        const [
            totalRevenue,
            totalOrders,
            totalProducts,
            totalCategories,
            recentOrders
        ] = await Promise.all([
            prisma.order.aggregate({
                where: {
                    status: 'DELIVERED'
                },
                _sum: {
                    totalAmount: true
                }
            }),
            prisma.order.count(),
            prisma.product.count(),
            prisma.category.count(),
            prisma.order.findMany({
                take: 5,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            })
        ]);

        return {
            totalRevenue: Number(totalRevenue._sum.totalAmount) || 0,
            totalOrders,
            totalProducts,
            totalCategories,
            recentOrders: recentOrders.map(order => ({
                id: order.id,
                Name: order.Name,
                customer: order.Name,
                phone: order.phone,
                streetAddress: order.streetAddress,
                city: order.city,
                product: order.items[0]?.product?.name || "Multiple Items",
                date: new Date(order.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                createdAt: order.createdAt.toISOString(),
                amount: `$${Number(order.totalAmount).toFixed(2)}`,
                totalAmount: Number(order.totalAmount),
                status: order.status,
                statusColor: getStatusColor(order.status),
                items: order.items.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    price: Number(item.price),
                    product: item.product ? {
                        name: item.product.name,
                        images: item.product.images
                    } : null
                }))
            }))
        };
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return {
            totalRevenue: 0,
            totalOrders: 0,
            totalProducts: 0,
            totalCategories: 0,
            recentOrders: []
        };
    }
}

function getStatusColor(status: string) {
    switch (status) {
        case 'DELIVERED':
            return 'emerald';
        case 'PROCESSING':
            return 'blue';
        case 'PENDING':
            return 'amber';
        case 'CANCELLED':
            return 'red';
        case 'SHIPPED':
            return 'blue';
        default:
            return 'gray';
    }
}

export async function getAdminProducts(page = 1, limit = 50) {
    try {
        const skip = (page - 1) * limit;
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    images: true,
                    description: true,
                    sku: true,
                    price: true,
                    discountPrice: true,
                    discountType: true,
                    discountValue: true,
                    stock: true,
                    isTrending: true,
                    categoryId: true,
                    createdAt: true,
                    updatedAt: true,
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.product.count()
        ]);

        return {
            products: products.map(product => ({
                ...product,
                price: Number(product.price),
                discountPrice: product.discountPrice ? Number(product.discountPrice) : null,
                discountValue: product.discountValue ? Number(product.discountValue) : null,
                stock: Number(product.stock),
                createdAt: product.createdAt.toISOString(),
                updatedAt: product.updatedAt.toISOString(),
            })),
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit
            }
        };
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return { products: [], pagination: { total: 0, pages: 0, page: 1, limit: 50 } };
    }
}

export async function getAdminCategories(page = 1, limit = 50) {
    try {
        const skip = (page - 1) * limit;
        const [categories, total] = await Promise.all([
            prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    isFeatured: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: { products: true }
                    }
                },
                skip,
                take: limit,
                orderBy: {
                    name: 'asc'
                }
            }),
            prisma.category.count()
        ]);
        
        return {
            categories: categories.map(category => ({
                ...category,
                createdAt: category.createdAt.toISOString(),
                updatedAt: category.updatedAt.toISOString(),
            })),
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit
            }
        };
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return { categories: [], pagination: { total: 0, pages: 0, page: 1, limit: 50 } };
    }
}

export async function getAdminOrders(page = 1, limit = 50) {
    try {
        const skip = (page - 1) * limit;
        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                select: {
                    id: true,
                    Name: true,
                    phone: true,
                    streetAddress: true,
                    city: true,
                    totalAmount: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    items: {
                        select: {
                            id: true,
                            quantity: true,
                            price: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    images: true,
                                    price: true
                                }
                            }
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.order.count()
        ]);

        return {
            orders: orders.map(order => ({
                id: order.id,
                Name: order.Name,
                phone: order.phone,
                streetAddress: order.streetAddress,
                city: order.city,
                totalAmount: Number(order.totalAmount),
                status: order.status,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString(),
                items: order.items.map(item => ({
                    ...item,
                    price: Number(item.price),
                    product: item.product ? {
                        ...item.product,
                        price: Number(item.product.price),
                    } : null
                }))
            })),
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit
            }
        };
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return { orders: [], pagination: { total: 0, pages: 0, page: 1, limit: 50 } };
    }
}

export async function createProduct(data: ProductInput) {
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                slug: data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                description: data.description,
                price: parseFloat(data.price as string),
                discountPrice: data.discountPrice ? parseFloat(data.discountPrice as string) : null,
                discountType: data.discountType,
                discountValue: data.discountValue ? parseFloat(data.discountValue as string) : null,
                stock: parseInt(data.stock as string),
                sku: data.sku,
                images: data.images,
                categoryId: data.categoryId,
            }
        });

        revalidatePath('/admin/products');

        return {
            success: true,
            product: {
                id: product.id,
                name: product.name,
                slug: product.slug,
                images: product.images,
                sku: product.sku,
                isTrending: product.isTrending,
                description: product.description,
                price: Number(product.price),
                discountPrice: product.discountPrice ? Number(product.discountPrice) : null,
                discountType: product.discountType,
                discountValue: product.discountValue ? Number(product.discountValue) : null,
                stock: Number(product.stock),
                categoryId: product.categoryId,
                createdAt: product.createdAt.toISOString(),
                updatedAt: product.updatedAt.toISOString(),
            }
        };
    } catch (error) {
        console.error("Failed to create product:", error);
        return { success: false, error: "Failed to create product" };
    }
}

export async function updateProduct(id: string, data: ProductInput) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                slug: data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                description: data.description,
                price: parseFloat(data.price as string),
                discountPrice: data.discountPrice ? parseFloat(data.discountPrice as string) : null,
                discountType: data.discountType,
                discountValue: data.discountValue ? parseFloat(data.discountValue as string) : null,
                stock: parseInt(data.stock as string),
                sku: data.sku,
                images: data.images,
                categoryId: data.categoryId,
            }
        });

        revalidatePath('/admin/products');

        return {
            success: true,
            product: {
                id: product.id,
                name: product.name,
                slug: product.slug,
                images: product.images,
                sku: product.sku,
                isTrending: product.isTrending,
                description: product.description,
                price: Number(product.price),
                discountPrice: product.discountPrice ? Number(product.discountPrice) : null,
                discountType: product.discountType,
                discountValue: product.discountValue ? Number(product.discountValue) : null,
                stock: Number(product.stock),
                categoryId: product.categoryId,
                createdAt: product.createdAt.toISOString(),
                updatedAt: product.updatedAt.toISOString(),
            }
        };
    } catch (error) {
        console.error("Failed to update product:", error);
        return { success: false, error: "Failed to update product" };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id }
        });

        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { success: false, error: "Failed to delete product" };
    }
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
    try {
        await prisma.order.update({
            where: { id },
            data: { status }
        });

        revalidatePath('/admin/orders');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Failed to update order status:", error);
        return { success: false, error: "Failed to update order status" };
    }
}

export async function deleteOrder(id: string) {
    try {
        await prisma.order.delete({
            where: { id }
        });
        revalidatePath('/admin/orders');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete order:", error);
        return { success: false, error: "Failed to delete order" };
    }
}

export async function createCategory(data: CategoryInput) {
    try {
        const category = await prisma.category.create({
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
                isFeatured: data.isFeatured ?? false,
            }
        });

        revalidatePath('/admin/categories');
        revalidatePath('/admin/products');

        return {
            success: true,
            category: {
                ...category,
                createdAt: category.createdAt.toISOString(),
                updatedAt: category.updatedAt.toISOString(),
            }
        };
    } catch (error) {
        console.error("Failed to create category:", error);
        return { success: false, error: "Failed to create category" };
    }
}

export async function updateCategory(id: string, data: CategoryInput) {
    try {
        const category = await prisma.category.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
                isFeatured: data.isFeatured,
            }
        });

        revalidatePath('/admin/categories');
        revalidatePath('/admin/products');

        return {
            success: true,
            category: {
                ...category,
                createdAt: category.createdAt.toISOString(),
                updatedAt: category.updatedAt.toISOString(),
            }
        };
    } catch (error) {
        console.error("Failed to update category:", error);
        return { success: false, error: "Failed to update category" };
    }
}

export async function deleteCategory(id: string) {
    try {
        const productsCount = await prisma.product.count({
            where: { categoryId: id }
        });

        if (productsCount > 0) {
            return { success: false, error: "Cannot delete category with associated products. Please move or delete the products first." };
        }

        await prisma.category.delete({
            where: { id }
        });

        revalidatePath('/admin/categories');
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete category:", error);
        return { success: false, error: "Failed to delete category" };
    }
}

export async function toggleCategoryFeatured(id: string, isFeatured: boolean) {
    try {
        await prisma.category.update({
            where: { id },
            data: { isFeatured }
        });

        revalidatePath('/');
        revalidatePath('/admin/categories');
        return { success: true };
    } catch (error) {
        console.error("Failed to toggle category featured status:", error);
        return { success: false, error: "Failed to toggle category featured status" };
    }
}

export async function getFeaturedCategories() {
    try {
        const categories = await prisma.category.findMany({
            where: { isFeatured: true },
            take: 8,
            orderBy: { updatedAt: 'desc' }
        });
        return categories.map(category => ({
            ...category,
            createdAt: category.createdAt.toISOString(),
            updatedAt: category.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to fetch featured categories:", error);
        return [];
    }
}

export async function toggleProductTrending(id: string, isTrending: boolean) {
    try {
        await prisma.product.update({
            where: { id },
            data: { isTrending }
        });

        revalidatePath('/');
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        console.error("Failed to toggle product trending status:", error);
        return { success: false, error: "Failed to toggle product trending status" };
    }
}

export async function getTrendingProducts() {
    try {
        const products = await prisma.product.findMany({
            where: { isTrending: true },
            take: 8,
            include: { category: true },
            orderBy: { updatedAt: 'desc' }
        });

        return products.map(product => ({
            ...product,
            price: Number(product.price),
            discountPrice: product.discountPrice ? Number(product.discountPrice) : null,
            discountType: product.discountType,
            discountValue: product.discountValue ? Number(product.discountValue) : null,
            stock: Number(product.stock),
            createdAt: product.createdAt.toISOString(),
            updatedAt: product.updatedAt.toISOString(),
            category: product.category ? {
                ...product.category,
                createdAt: product.category.createdAt.toISOString(),
                updatedAt: product.category.updatedAt.toISOString(),
            } : null
        }));
    } catch (error) {
        console.error("Failed to fetch trending products:", error);
        return [];
    }
}

export async function getOnSaleProducts() {
    try {
        const products = await prisma.product.findMany({
            where: {
                discountPrice: {
                    not: null
                }
            },
            take: 10,
            include: { category: true },
            orderBy: { updatedAt: 'desc' }
        });

        return products.map(product => ({
            ...product,
            price: Number(product.price),
            discountPrice: product.discountPrice ? Number(product.discountPrice) : null,
            discountType: product.discountType,
            discountValue: product.discountValue ? Number(product.discountValue) : null,
            stock: Number(product.stock),
            createdAt: product.createdAt.toISOString(),
            updatedAt: product.updatedAt.toISOString(),
            category: product.category ? {
                ...product.category,
                createdAt: product.category.createdAt.toISOString(),
                updatedAt: product.category.updatedAt.toISOString(),
            } : null
        }));
    } catch (error) {
        console.error("Failed to fetch on sale products:", error);
        return [];
    }
}

export async function bulkCreateProducts(products: any[]) {
    try {
        const categories = await prisma.category.findMany();
        const categoryMap = new Map(categories.map(c => [c.name.toLowerCase(), c.id]));

        const results = await Promise.all(products.map(async (p) => {
            const categoryName = (p.Category || 'Uncategorized').toLowerCase();
            let categoryId = categoryMap.get(categoryName);

            if (!categoryId) {
                const newCat = await prisma.category.create({
                    data: { name: p.Category || 'Uncategorized' }
                });
                categoryMap.set(categoryName, newCat.id);
                categoryId = newCat.id;
            }

            return prisma.product.create({
                data: {
                    name: p.Name,
                    slug: p.Name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Math.random().toString(36).substr(2, 5),
                    description: p.Description || "",
                    price: parseFloat(p.Price || "0"),
                    stock: parseInt(p.Stock || "0"),
                    sku: p.SKU || "",
                    images: p.Images || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
                    categoryId: categoryId,
                    isTrending: p["Is Trending"] === "Yes"
                }
            });
        }));

        revalidatePath('/admin/products');
        revalidatePath('/');
        return { success: true, count: results.length };
    } catch (error) {
        console.error("Bulk import failed:", error);
        return { success: false, error: "Failed to import products. Check CSV format." };
    }
}

export interface BannerInput {
    title: string;
    subtitle?: string;
    titleAr: string;
    subtitleAr?: string;
    image: string;
    buttonText?: string;
    link?: string;
    badge?: string;
    isActive?: boolean;
}

export async function getAdminBanners() {
    try {
        const banners = await prisma.banner.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return banners.map(banner => ({
            ...banner,
            createdAt: banner.createdAt.toISOString(),
            updatedAt: banner.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to fetch banners:", error);
        return [];
    }
}

export async function createBanner(data: BannerInput) {
    try {
        const banner = await prisma.banner.create({
            data: {
                title: data.title,
                subtitle: data.subtitle,
                titleAr: data.titleAr,
                subtitleAr: data.subtitleAr,
                image: data.image,
                buttonText: data.buttonText || "Shop Now",
                link: data.link || "/products",
                badge: data.badge || "New Collection",
                isActive: data.isActive ?? true,
            }
        });

        revalidatePath('/');
        revalidatePath('/admin/banners');

        return {
            success: true,
            banner: {
                ...banner,
                createdAt: banner.createdAt.toISOString(),
                updatedAt: banner.updatedAt.toISOString(),
            }
        };
    } catch (error) {
        console.error("Failed to create banner:", error);
        return { success: false, error: "Failed to create banner" };
    }
}

export async function updateBanner(id: string, data: BannerInput) {
    try {
        const banner = await prisma.banner.update({
            where: { id },
            data: {
                title: data.title,
                subtitle: data.subtitle,
                titleAr: data.titleAr,
                subtitleAr: data.subtitleAr,
                image: data.image,
                buttonText: data.buttonText,
                link: data.link,
                badge: data.badge,
                isActive: data.isActive,
            }
        });

        revalidatePath('/');
        revalidatePath('/admin/banners');

        return {
            success: true,
            banner: {
                ...banner,
                createdAt: banner.createdAt.toISOString(),
                updatedAt: banner.updatedAt.toISOString(),
            }
        };
    } catch (error) {
        console.error("Failed to update banner:", error);
        return { success: false, error: "Failed to update banner" };
    }
}

export async function deleteBanner(id: string) {
    try {
        await prisma.banner.delete({
            where: { id }
        });

        revalidatePath('/');
        revalidatePath('/admin/banners');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete banner:", error);
        return { success: false, error: "Failed to delete banner" };
    }
}

export async function toggleBannerStatus(id: string, isActive: boolean) {
    try {
        await prisma.banner.update({
            where: { id },
            data: { isActive }
        });

        revalidatePath('/');
        revalidatePath('/admin/banners');
        return { success: true };
    } catch (error) {
        console.error("Failed to toggle banner status:", error);
        return { success: false, error: "Failed to toggle banner status" };
    }
}

export async function getActiveBanners() {
    try {
        const banners = await prisma.banner.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return banners.map(banner => ({
            ...banner,
            createdAt: banner.createdAt.toISOString(),
            updatedAt: banner.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to fetch active banners:", error);
        return [];
    }
}

export interface PromoCodeInput {
    code: string;
    discountPercentage: number;
    delegateName?: string;
    isActive?: boolean;
}

export async function getPromoCodes() {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const promoCodes = await prisma.promoCode.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                orders: {
                    where: {
                        createdAt: {
                            gte: startOfMonth
                        }
                    },
                    select: {
                        totalAmount: true
                    }
                }
            }
        });

        return promoCodes.map(({ orders, ...code }) => ({
            ...code,
            totalSales: Number(code.totalSales),
            thisMonthSales: orders.reduce((sum, order) => sum + Number(order.totalAmount), 0),
            createdAt: code.createdAt.toISOString(),
            updatedAt: code.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to fetch promo codes:", error);
        return [];
    }
}

export async function createPromoCode(data: PromoCodeInput) {
    try {
        const existing = await prisma.promoCode.findUnique({
            where: { code: data.code }
        });

        if (existing) {
            return { success: false, error: "Promo code already exists" };
        }

        const promoCode = await prisma.promoCode.create({
            data: {
                code: data.code.toUpperCase(), // Store uppercase
                discountPercentage: data.discountPercentage,
                delegateName: data.delegateName,
                isActive: data.isActive ?? true,
            }
        });

        revalidatePath('/admin/promocodes');
        return { success: true, promoCode };
    } catch (error) {
        console.error("Failed to create promo code:", error);
        return { success: false, error: "Failed to create promo code" };
    }
}

export async function updatePromoCode(id: string, data: PromoCodeInput) {
    try {
        if (data.code) {
            const existing = await prisma.promoCode.findUnique({
                where: { code: data.code }
            });
            if (existing && existing.id !== id) {
                return { success: false, error: "Promo code already exists" };
            }
        }

        const promoCode = await prisma.promoCode.update({
            where: { id },
            data: {
                code: data.code.toUpperCase(),
                discountPercentage: data.discountPercentage,
                delegateName: data.delegateName,
                isActive: data.isActive,
            }
        });

        revalidatePath('/admin/promocodes');
        return { success: true, promoCode };
    } catch (error) {
        console.error("Failed to update promo code:", error);
        return { success: false, error: "Failed to update promo code" };
    }
}

export async function deletePromoCode(id: string) {
    try {
        await prisma.promoCode.delete({
            where: { id }
        });

        revalidatePath('/admin/promocodes');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete promo code:", error);
        return { success: false, error: "Failed to delete promo code" };
    }
}

export async function togglePromoCodeStatus(id: string, isActive: boolean) {
    try {
        await prisma.promoCode.update({
            where: { id },
            data: { isActive }
        });

        revalidatePath('/admin/promocodes');
        return { success: true };
    } catch (error) {
        console.error("Failed to toggle promo code status:", error);
        return { success: false, error: "Failed to toggle promo code status" };
    }
}

export async function validatePromoCode(code: string) {
    try {
        const promoCode = await prisma.promoCode.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (!promoCode) {
            return { success: false, error: "Invalid promo code" };
        }

        if (!promoCode.isActive) {
            return { success: false, error: "Promo code is inactive" };
        }

        return {
            success: true,
            promoCode: {
                id: promoCode.id,
                code: promoCode.code,
                discountPercentage: promoCode.discountPercentage
            }
        };
    } catch (error) {
        console.error("Failed to validate promo code:", error);
        return { success: false, error: "Failed to validate promo code" };
    }
}

import bcrypt from "bcryptjs";

export async function getAdminUser() {
    try {
        const user = await prisma.user.findFirst();
        if (!user) {
            return null;
        }
        return {
            id: user.id,
            username: user.username,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        };
    } catch (error) {
        console.error("Failed to fetch admin user:", error);
        return null;
    }
}

export async function updateAdminCredentials(data: {
    currentPassword: string;
    newUsername?: string;
    newPassword?: string;
}) {
    try {
        const user = await prisma.user.findFirst();
        if (!user) {
            return { success: false, error: "Admin user not found" };
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(data.currentPassword, user.password);
        if (!isPasswordValid) {
            return { success: false, error: "Current password is incorrect" };
        }

        // Prepare update data
        const updateData: { username?: string; password?: string } = {};

        if (data.newUsername && data.newUsername !== user.username) {
            updateData.username = data.newUsername;
        }

        if (data.newPassword) {
            const hashedPassword = await bcrypt.hash(data.newPassword, 10);
            updateData.password = hashedPassword;
        }

        if (Object.keys(updateData).length === 0) {
            return { success: false, error: "No changes to update" };
        }

        await prisma.user.update({
            where: { id: user.id },
            data: updateData,
        });

        return { success: true, message: "Credentials updated successfully" };
    } catch (error) {
        console.error("Failed to update admin credentials:", error);
        return { success: false, error: "Failed to update credentials" };
    }
}

export async function bulkToggleTrending(ids: string[], isTrending: boolean) {
    try {
        await prisma.product.updateMany({
            where: {
                id: { in: ids }
            },
            data: { isTrending }
        });

        revalidatePath('/');
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        console.error("Failed to bulk toggle trending status:", error);
        return { success: false, error: "Failed to bulk toggle trending status" };
    }
}

export async function bulkRemoveSale(ids: string[]) {
    try {
        await prisma.product.updateMany({
            where: {
                id: { in: ids }
            },
            data: {
                discountPrice: null,
                discountType: null,
                discountValue: null
            }
        });

        revalidatePath('/');
        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        console.error("Failed to bulk remove sale:", error);
        return { success: false, error: "Failed to bulk remove sale" };
    }
}

