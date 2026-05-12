
const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const slugify = require('slugify');

const prisma = new PrismaClient();

async function importData() {
    try {
        const filePath = 'C:/Users/moham/Downloads/المنتجات حسب الصيغة المطلوبة (1) (1).xlsx';
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        console.log(`Starting import of ${data.length} items...`);

        // 1. Clean existing data (OrderItems first due to FK, then Products, then Categories)
        console.log('Cleaning existing data...');
        await prisma.orderItem.deleteMany({});
        await prisma.product.deleteMany({});
        await prisma.category.deleteMany({});
        console.log('Database cleaned.');

        const rubyBrand = await prisma.brand.upsert({
            where: { slug: 'ruby-beauty' },
            update: {
                group: 'MAIN',
                isActive: true,
                isFeatured: true,
            },
            create: {
                id: 'brand-ruby-beauty',
                name: 'Ruby Beauty',
                slug: 'ruby-beauty',
                group: 'MAIN',
                isActive: true,
                isFeatured: true,
            },
        });

        // 2. Extract unique categories (filter out undefined/empty, and add 'General')
        const uniqueCategoryNames = [...new Set(data.map(item => item.Category).filter(Boolean))];
        if (!uniqueCategoryNames.includes('General')) {
            uniqueCategoryNames.push('General');
        }
        console.log(`Creating ${uniqueCategoryNames.length} categories...`);

        const categoryMap = new Map();

        for (const catName of uniqueCategoryNames) {
            try {
                const name = String(catName);
                const existingCategory = await prisma.category.findFirst({
                    where: {
                        brandId: rubyBrand.id,
                        name,
                    },
                });
                const category = existingCategory || await prisma.category.create({
                    data: {
                        name,
                        slug: `${slugify(name, { lower: true, strict: true }) || 'category'}-${Math.random().toString(36).substring(2, 7)}`,
                        description: `Products for ${catName}`,
                        brandId: rubyBrand.id,
                    },
                });
                categoryMap.set(catName, category.id);
            } catch (err) {
                console.error(`Error ensuring category ${catName}:`, err.message);
            }
        }

        // 3. Import products
        console.log('Importing products...');
        let importedCount = 0;
        let errorCount = 0;

        for (const item of data) {
            if (!item.Name) {
                console.warn(`Skipping item with missing Name: ${JSON.stringify(item)}`);
                errorCount++;
                continue;
            }

            const categoryName = item.Category || 'General';
            const categoryId = categoryMap.get(categoryName);

            try {
                const baseSlug = slugify(String(item.Name), { lower: true, strict: true }) || 'product';
                const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

                await prisma.product.create({
                    data: {
                        name: String(item.Name),
                        sku: item.SKU ? String(item.SKU) : null,
                        slug: slug,
                        price: parseFloat(item.Price) || 0,
                        stock: parseInt(item.Stock) || 0,
                        isTrending: String(item['Is Trending']).toLowerCase() === 'yes',
                        images: item.Images || '',
                        brandId: rubyBrand.id,
                        categoryId: categoryId,
                        description: `Quality product from ${categoryName}`
                    }
                });
                importedCount++;
                if (importedCount % 100 === 0) console.log(`Imported ${importedCount} products...`);
            } catch (err) {
                console.error(`Error importing product ${item.Name}:`, err.message);
                errorCount++;
            }
        }

        console.log('--- IMPORT SUMMARY ---');
        console.log(`Successfully imported: ${importedCount}`);
        console.log(`Failed: ${errorCount}`);
        console.log(`Total Categories: ${uniqueCategoryNames.length}`);

    } catch (error) {
        console.error('Fatal Import Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

importData();
