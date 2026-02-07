
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = await prisma.user.updateMany({
        where: { username: 'admin' },
        data: { password: hashedPassword }
    });
    console.log('Update result:', user);
    if (user.count === 0) {
        // Maybe the username is different?
        const allUsers = await prisma.user.findMany();
        console.log('All users:', allUsers.map(u => u.username));
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
