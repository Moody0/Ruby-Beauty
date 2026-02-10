import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.findUnique({
        where: { username: 'admin' }
    })

    if (user) {
        console.log('User found:')
        console.log(`Username: ${user.username}`)
        console.log(`Role: ${user.role}`)
    } else {
        console.log('User not found')
    }
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
