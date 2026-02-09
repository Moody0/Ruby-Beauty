import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const category = await prisma.category.findUnique({
        where: { name: 'عام' },
        include: {
            products: {
                take: 10
            }
        }
    });

    if (!category) {
        console.log('Category "عام" not found.');
        return;
    }

    const totalProducts = await prisma.product.count({
        where: { categoryId: category.id }
    });

    console.log(`--- Category: ${category.name} ---`);
    console.log(`Total Products: ${totalProducts}`);
    console.log('Sample Products:');
    category.products.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name} (SKU: ${p.sku})`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
