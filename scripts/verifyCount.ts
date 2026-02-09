import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const pCount = await prisma.product.count();
    const cCount = await prisma.category.count();
    console.log(`Products: ${pCount}`);
    console.log(`Categories: ${cCount}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
