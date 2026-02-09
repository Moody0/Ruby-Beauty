import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Fetching products to apply discounts...')

    // Get up to 10 products
    const products = await prisma.product.findMany({
        take: 10
    })

    if (products.length === 0) {
        console.log('No products found in database. Please add products first.')
        return
    }

    console.log(`Found ${products.length} products. Applying random discounts...`)

    for (const product of products) {
        // Calculate a discount price (e.g., 20% off)
        const price = Number(product.price)
        const discountPercentage = 20
        const discountPrice = price * (1 - discountPercentage / 100)

        await prisma.product.update({
            where: { id: product.id },
            data: {
                discountPrice: discountPrice,
                discountType: 'PERCENTAGE',
                discountValue: discountPercentage
            }
        })
        console.log(`Updated product: ${product.name} - New Price: ${discountPrice.toFixed(2)}`)
    }

    console.log('Finished updating products with discounts.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
