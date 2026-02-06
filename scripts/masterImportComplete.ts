import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Category mapping removed - keeping original Arabic names.

function decodeHtmlEntities(text: string): string {
    if (!text) return ''
    return text.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16))
    }).replace(/&#(\d+);/g, (match, dec) => {
        return String.fromCharCode(parseInt(dec, 10))
    }).replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
}

async function getAllImagesFromPage(pageUrl: string): Promise<string[]> {
    try {
        const response = await fetch(pageUrl)
        if (!response.ok) return []
        const html = await response.text()
        const blobRegex = /https:\/\/fatoradrive\.blob\.core\.windows\.net\/(itm|media)\/[^"'\s]+\.(jpg|png|jpeg)/g
        const matches = Array.from(new Set(html.match(blobRegex) || []))
        return matches.length > 0 ? matches : []
    } catch (e) {
        return []
    }
}

async function main() {
    const url = 'https://api-pdf.azurewebsites.net//Print/PrintAllItems/q=&status=-1&Category=&IsPublic=False&IsSold=False&token=98960e48-b6d7-40cf-a2a1-b2e735d57f28'

    console.log('=== FINAL MASTER PRODUCT IMPORT ===')

    // Clean up EVERYTHING
    console.log('Cleaning up all existing data (Orders, Items, Categories)...')
    await prisma.orderItem.deleteMany({})
    await prisma.order.deleteMany({})
    await prisma.product.deleteMany({})
    await prisma.category.deleteMany({})
    console.log('✅ Database cleared')

    console.log('Fetching complete inventory...')
    const response = await fetch(url)
    const html = await response.text()

    // Extract all product links
    const productLinks = Array.from(new Set(html.match(/https:\/\/fato\.me\/s\/ruby\.beauty\/i\d+/g) || []))
    console.log(`Found ${productLinks.length} products to process`)

    // Parse the table rows
    const rows = html.split('<tr>').slice(1) // Skip header

    let processed = 0
    let categoryCache: Record<string, string> = {}

    for (let i = 0; i < Math.min(rows.length, productLinks.length); i++) {
        const row = rows[i]
        const productUrl = productLinks[i]

        // Extract cells
        const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi)
        if (!cells || cells.length < 6) continue

        // Correct Cell Mapping:
        // 0: Name
        // 1: Price
        // 3: SKU
        // 4: Category
        // 5: Stock

        const rawName = cells[0].replace(/<[^>]*>/g, '').trim()
        if (!rawName || rawName === 'Name') continue
        const name = decodeHtmlEntities(rawName)

        const priceText = cells[1].replace(/<[^>]*>/g, '').trim()
        const price = parseFloat(priceText) || 0

        const sku = cells[3].replace(/<[^>]*>/g, '').trim()

        const rawCategory = cells[4].replace(/<[^>]*>/g, '').trim() || 'عام'
        const categoryName = decodeHtmlEntities(rawCategory).split(',')[0].trim()

        const stockText = cells[5].replace(/<[^>]*>/g, '').trim()
        const stock = parseInt(stockText) || 0

        // Get or create category
        if (!categoryCache[categoryName]) {
            const cat = await prisma.category.upsert({
                where: { name: categoryName },
                update: {},
                create: {
                    name: categoryName,
                    description: `Premium ${categoryName} products from Aruma Luxe collection.`
                }
            })
            categoryCache[categoryName] = cat.id
        }

        // Fetch main image
        process.stdout.write(`[${i + 1}/${productLinks.length}] ${name.substring(0, 30)}... `)
        const images = await getAllImagesFromPage(productUrl)

        const slug = name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            + '-' + productUrl.split('/').pop()

        await prisma.product.create({
            data: {
                name: name,
                slug: slug,
                price: price,
                stock: stock,
                sku: sku,
                images: images.length > 0 ? images[0] : '/placeholder.jpg',
                description: `${name} - Professional quality beauty product.`,
                categoryId: categoryCache[categoryName],
                isTrending: Math.random() > 0.9
            }
        })

        console.log(`✅ (Stock: ${stock}, Cat: ${categoryName})`)
        processed++

        // Rate limiting
        if (processed % 50 === 0) {
            console.log(`Processed ${processed} items. Taking a short breath...`)
            await new Promise(resolve => setTimeout(resolve, 2000))
        }
    }

    console.log(`\n=== IMPORT COMPLETE ===`)
    console.log(`Successfully imported ${processed} products!`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('Error:', e)
        await prisma.$disconnect()
        process.exit(1)
    })
