import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const username = 'admin';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await prisma.user.upsert({
        where: { username: username },
        update: {
            password: hashedPassword,
            role: 'SUPER_ADMIN',
            canDeleteBanners: true,
            canDeleteCategories: true,
            canDeleteOrders: true,
            canDeleteProducts: true,
            canDeletePromoCodes: true,
            canManageBanners: true,
            canManageCategories: true,
            canManageOrders: true,
            canManageProducts: true,
            canManagePromoCodes: true,
        },
        create: {
            username: username,
            password: hashedPassword,
            role: 'SUPER_ADMIN',
            canDeleteBanners: true,
            canDeleteCategories: true,
            canDeleteOrders: true,
            canDeleteProducts: true,
            canDeletePromoCodes: true,
            canManageBanners: true,
            canManageCategories: true,
            canManageOrders: true,
            canManageProducts: true,
            canManagePromoCodes: true,
        },
    })

    console.log(`Super Admin user created/updated. Username: ${username}, Password: ${password}`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
