// backend/scripts/create-admin.ts
import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@test.com';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin user already exists');
    return;
  }
  const passwordHash = await bcrypt.hash('123456', 10);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email,
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log('Admin user created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
