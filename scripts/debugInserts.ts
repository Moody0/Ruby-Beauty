import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const excelFilePath = 'C:\\Users\\moham\\OneDrive\\Desktop\\products_export.xlsx';

function getValue(row: any, searchKey: string): any {
    const entry = Object.entries(row).find(([k]) => k.trim() === searchKey.trim());
    return entry ? entry[1] : undefined;
}

async function main() {
    console.log('=== DEBUGGING INSERT ERRORS ===');

    // Wipe precisely
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});

    const workbook = XLSX.readFile(excelFilePath);
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];

    let categoryCache: Record<string, string> = {};
    let success = 0;
    let fail = 0;

    // Test first 100 rows
    for (let i = 0; i < 100; i++) {
        const row = data[i];
        const name = (getValue(row, 'الاسم') || '').toString().trim();
        if (!name) continue;

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
                    slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}-${Date.now()}`,
                    price,
                    stock,
                    sku,
                    images: imageUrl,
                    description: description || name,
                    categoryId: categoryCache[categoryName]
                }
            });
            success++;
        } catch (e: any) {
            fail++;
            console.log(`Row ${i} failed: ${e.message.substring(0, 100)}`);
        }
    }

    console.log(`Success: ${success}, Fail: ${fail}`);
}

main().catch(console.error);
