import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create Super Admin if not exists
  const adminEmail = 'admin@velunisbank.com'; // change in production
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const passwordHash = await bcrypt.hash('Admin123!', 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        firstName: 'Super',
        lastName: 'Admin',
        country: 'US',
        role: 'SUPER_ADMIN',
        isVerified: true,
      },
    });
  }

  // Init payment config
  await prisma.paymentConfig.upsert({
    where: { id: 'main' },
    create: { id: 'main' },
    update: {},
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());