import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      role: true
    }
  });
  console.log('USERS IN DB:', JSON.stringify(users, null, 2));
  await prisma.$disconnect();
}

main();
