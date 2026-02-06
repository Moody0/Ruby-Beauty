"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

interface ProductInput {
    name: string;
    description?: string;
    price: string | number;
    stock: string | number;
    sku?: string;
    images: string;
    categoryId: string;
}

interface CategoryInput {
    name: string;
    description?: string;
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
                email: order.email,
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

export async function getAdminProducts() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Convert Decimal types to plain numbers and ensure serializable dates
        return products.map(product => ({
            ...product,
            price: Number(product.price),
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
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export async function getAdminCategories() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });
        return categories.map(category => ({
            ...category,
            createdAt: category.createdAt.toISOString(),
            updatedAt: category.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export async function getAdminOrders() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Convert Decimal types and dates for serialization
        return orders.map(order => ({
            ...order,
            totalAmount: Number(order.totalAmount),
            createdAt: order.createdAt.toISOString(),
            updatedAt: order.updatedAt.toISOString(),
            items: order.items.map(item => ({
                ...item,
                price: Number(item.price),
                product: item.product ? {
                    ...item.product,
                    price: Number(item.product.price),
                    stock: Number(item.product.stock),
                    createdAt: item.product.createdAt.toISOString(),
                    updatedAt: item.product.updatedAt.toISOString(),
                } : null
            }))
        }));
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return [];
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
                stock: parseInt(data.stock as string),
                sku: data.sku,
                images: data.images,
                categoryId: data.categoryId,
            }
        });

        revalidatePath('/admin/products');

        // Convert Decimal types and dates for serialization
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

export async function createCategory(data: CategoryInput) {
    try {
        const category = await prisma.category.create({
            data: {
                name: data.name,
                description: data.description,
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
        // Check if category has products
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
