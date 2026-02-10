import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany({ select: { images: true } });
    const categories = await prisma.category.findMany({ select: { image: true } });

    const domains = new Set<string>();

    products.forEach(p => {
        if (!p.images) return;
        p.images.split(',').forEach(url => {
            try { if (url.trim().startsWith('http')) domains.add(new URL(url.trim()).hostname); } catch (e) { }
        });
    });

    categories.forEach(c => {
        if (!c.image) return;
        try { if (c.image.trim().startsWith('http')) domains.add(new URL(c.image.trim()).hostname); } catch (e) { }
    });

    console.log('Unique hostnames found:');
    domains.forEach(d => console.log(`- ${d}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
