const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const mainBrands = [
        {
            name: 'Ruby Beauty',
            slug: 'ruby-beauty',
            description: 'Premium botanical skincare designed to reveal your natural radiance',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
            group: 'MAIN',
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Makeup',
            slug: 'makeup',
            description: 'Professional makeup products for every occasion',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
            group: 'MAIN',
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Perfumes',
            slug: 'perfumes',
            description: 'Luxury fragrances that leave a lasting impression',
            image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
            group: 'MAIN',
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Accessories',
            slug: 'accessories',
            description: 'Beauty tools and accessories for your daily routine',
            image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400',
            group: 'MAIN',
            isActive: true,
            isFeatured: true,
        },
    ];

    for (const brand of mainBrands) {
        const existing = await prisma.brand.findUnique({
            where: { slug: brand.slug },
        });

        if (existing) {
            console.log(`Updating brand: ${brand.name}`);
            await prisma.brand.update({
                where: { id: existing.id },
                data: brand,
            });
        } else {
            console.log(`Creating brand: ${brand.name}`);
            await prisma.brand.create({
                data: brand,
            });
        }
    }

    console.log('Done! Main brands seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });