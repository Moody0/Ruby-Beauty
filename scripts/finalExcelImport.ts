import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const excelFilePath = 'C:\\Users\\moham\\OneDrive\\Desktop\\Ruby-Beauty-Products.xlsx';

function getValue(row: any, searchKey: string): any {
    const entry = Object.entries(row).find(([k]) => k.trim() === searchKey.trim());
    return entry ? entry[1] : undefined;
}

async function main() {
    console.log('=== FULL SEQUENTIAL IMPORT ===');

    // Wipe tables
    try {
        await prisma.orderItem.deleteMany({});
        await prisma.order.deleteMany({});
        await prisma.product.deleteMany({});
        await prisma.category.deleteMany({});
        console.log('✅ Tables cleared');
    } catch (e) {
        console.log('Cleanup error (might be first run):', (e as any).message);
    }

    const workbook = XLSX.readFile(excelFilePath);
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];
    console.log(`Excel Rows: ${data.length}`);

    let categoryCache: Record<string, string> = {};
    let success = 0;
    let fail = 0;

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const name = (getValue(row, 'الاسم') || '').toString().trim();
        if (!name) {
            fail++;
            continue;
        }

        const categoryName = (getValue(row, 'التصنيفات') || 'عام').toString().trim();
        if (!categoryCache[categoryName]) {
            const cat = await prisma.category.upsert({
                where: { name: categoryName },
                update: {},
                create: { name: categoryName, isFeatured: true }
            });
            categoryCache[categoryName] = cat.id;
        }

        const price = parseFloat((getValue(row, 'السعر') || '0').toString());
        const stock = parseInt((getValue(row, 'الكمية المتاحة') || '0').toString());
        const sku = (getValue(row, 'كود المنتج - SKU') || '').toString().trim();
        const imageUrl = (getValue(row, 'الصورة') || '/placeholder.jpg').toString().trim();
        const description = (getValue(row, 'الوصف') || getValue(row, 'تفاصيل المنتج') || '').toString().trim();

        try {
            await prisma.product.create({
                data: {
                    name,
                    slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
                    price,
                    stock,
                    sku,
                    images: imageUrl,
                    description: description || name,
                    categoryId: categoryCache[categoryName]
                }
            });
            success++;
            if (success % 100 === 0) console.log(`Progress: ${success} products...`);
        } catch (e: any) {
            fail++;
            if (fail < 10) console.log(`Row ${i} failed: ${e.message.substring(0, 100)}`);
        }
    }

    console.log(`\nImport Summary:`);
    console.log(`Success: ${success}`);
    console.log(`Fail: ${fail}`);
    console.log(`Total Categories: ${Object.keys(categoryCache).length}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
