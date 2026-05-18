const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Cleanup Script: Keep only the 4 real MainCategories and reassign
 * all other brands/products/categories that were incorrectly promoted.
 * 
 * The 4 real Main Categories are: Ruby Beauty, Makeup, Perfumes, Accessories
 * All other brands should remain as brands (not main categories).
 */
async function main() {
    console.log('🧹 Starting MainCategory cleanup...\n');

    const REAL_MAIN_SLUGS = ['ruby-beauty', 'makeup', 'perfumes', 'accessories'];

    // Step 1: Find the 4 real MainCategories
    const realMainCategories = await prisma.mainCategory.findMany({
        where: { slug: { in: REAL_MAIN_SLUGS } },
    });

    console.log(`Found ${realMainCategories.length} real MainCategories:`);
    realMainCategories.forEach(mc => console.log(`   ✅ ${mc.name} (${mc.slug})`));

    // Step 2: Find all fake MainCategories (the ones that should just be brands)
    const fakeMainCategories = await prisma.mainCategory.findMany({
        where: { slug: { notIn: REAL_MAIN_SLUGS } },
    });

    console.log(`\nFound ${fakeMainCategories.length} incorrectly created MainCategories to clean up.\n`);

    // Step 3: For each fake MainCategory, unlink brands/categories/products from it
    for (const fake of fakeMainCategories) {
        // Unlink brands
        await prisma.brand.updateMany({
            where: { mainCategoryId: fake.id },
            data: { mainCategoryId: null },
        });

        // Unlink categories
        await prisma.category.updateMany({
            where: { mainCategoryId: fake.id },
            data: { mainCategoryId: null },
        });

        // Unlink products
        await prisma.product.updateMany({
            where: { mainCategoryId: fake.id },
            data: { mainCategoryId: null },
        });

        console.log(`   🔓 Unlinked all relations from fake MainCategory: "${fake.name}"`);
    }

    // Step 4: Delete all fake MainCategories
    if (fakeMainCategories.length > 0) {
        await prisma.mainCategory.deleteMany({
            where: { slug: { notIn: REAL_MAIN_SLUGS } },
        });
        console.log(`\n🗑️  Deleted ${fakeMainCategories.length} fake MainCategory records.`);
    }

    // Step 5: Summary
    const remaining = await prisma.mainCategory.findMany();
    const linkedProducts = await prisma.product.count({ where: { mainCategoryId: { not: null } } });
    const totalProducts = await prisma.product.count();
    const linkedCategories = await prisma.category.count({ where: { mainCategoryId: { not: null } } });
    const totalCategories = await prisma.category.count();

    console.log('\n📊 Cleanup Summary:');
    console.log(`   MainCategories remaining: ${remaining.length}`);
    remaining.forEach(mc => console.log(`      - ${mc.name} (${mc.slug})`));
    console.log(`   Products linked: ${linkedProducts}/${totalProducts}`);
    console.log(`   Categories linked: ${linkedCategories}/${totalCategories}`);
    console.log('\n✅ Cleanup complete!');
    console.log('\nℹ️  Note: Brands without a mainCategoryId can now be assigned via the Admin Panel.');
}

main()
    .catch((e) => {
        console.error('❌ Cleanup failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
