const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Safe Migration Script: Create MainCategory records from existing MAIN brands
 * and link all existing Brands, Categories, and Products to them.
 * 
 * IMPORTANT: This script does NOT delete any existing data.
 */
async function main() {
    console.log('🚀 Starting safe MainCategory migration...\n');

    // Step 1: Find all brands with group = MAIN
    const mainBrands = await prisma.brand.findMany({
        where: { group: 'MAIN' },
        include: {
            categories: {
                include: {
                    products: true,
                },
            },
            products: true,
        },
    });

    console.log(`Found ${mainBrands.length} MAIN brand(s) to convert into MainCategories.\n`);

    for (const brand of mainBrands) {
        // Step 2: Create or find corresponding MainCategory
        let mainCategory = await prisma.mainCategory.findUnique({
            where: { slug: brand.slug },
        });

        if (!mainCategory) {
            mainCategory = await prisma.mainCategory.create({
                data: {
                    name: brand.name,
                    slug: brand.slug,
                    description: brand.description,
                    image: brand.image,
                    isActive: brand.isActive,
                    isFeatured: brand.isFeatured,
                },
            });
            console.log(`✅ Created MainCategory: "${mainCategory.name}" (${mainCategory.id})`);
        } else {
            console.log(`⏭️  MainCategory "${mainCategory.name}" already exists, skipping creation.`);
        }

        // Step 3: Link the Brand itself to the MainCategory
        if (!brand.mainCategoryId) {
            await prisma.brand.update({
                where: { id: brand.id },
                data: { mainCategoryId: mainCategory.id },
            });
            console.log(`   🔗 Linked Brand "${brand.name}" -> MainCategory "${mainCategory.name}"`);
        }

        // Step 4: Link all Categories under this Brand to the MainCategory
        const unlinkedCategories = brand.categories.filter(c => !c.mainCategoryId);
        if (unlinkedCategories.length > 0) {
            await prisma.category.updateMany({
                where: {
                    id: { in: unlinkedCategories.map(c => c.id) },
                },
                data: { mainCategoryId: mainCategory.id },
            });
            console.log(`   🔗 Linked ${unlinkedCategories.length} categories -> MainCategory "${mainCategory.name}"`);
        }

        // Step 5: Link all Products under this Brand to the MainCategory
        const unlinkedProducts = brand.products.filter(p => !p.mainCategoryId);
        if (unlinkedProducts.length > 0) {
            await prisma.product.updateMany({
                where: {
                    id: { in: unlinkedProducts.map(p => p.id) },
                },
                data: { mainCategoryId: mainCategory.id },
            });
            console.log(`   🔗 Linked ${unlinkedProducts.length} products -> MainCategory "${mainCategory.name}"`);
        }

        console.log('');
    }

    // Step 6: Handle any DIFFERENT-group brands that have products
    // (These products still need a MainCategory — we'll link them via their brand's category)
    const differentBrands = await prisma.brand.findMany({
        where: { group: 'DIFFERENT', mainCategoryId: null },
        include: { products: true, categories: true },
    });

    if (differentBrands.length > 0) {
        console.log(`\nFound ${differentBrands.length} non-MAIN brand(s) without a MainCategory assignment.`);
        console.log('These can be assigned via the Admin Panel later.\n');
    }

    // Summary
    const totalMainCategories = await prisma.mainCategory.count();
    const linkedProducts = await prisma.product.count({ where: { mainCategoryId: { not: null } } });
    const totalProducts = await prisma.product.count();
    const linkedCategories = await prisma.category.count({ where: { mainCategoryId: { not: null } } });
    const totalCategories = await prisma.category.count();

    console.log('📊 Migration Summary:');
    console.log(`   Main Categories created: ${totalMainCategories}`);
    console.log(`   Products linked: ${linkedProducts}/${totalProducts}`);
    console.log(`   Categories linked: ${linkedCategories}/${totalCategories}`);
    console.log('\n✅ Safe migration complete! No data was deleted.');
}

main()
    .catch((e) => {
        console.error('❌ Migration failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
