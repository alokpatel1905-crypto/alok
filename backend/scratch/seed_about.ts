import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.page.findUnique({ where: { slug: 'about' }});
  if (!existing) {
    await prisma.page.create({
      data: {
        title: 'About',
        slug: 'about',
        status: 'PUBLISHED',
        isActive: true,
      }
    });
    console.log("Created 'about' page successfully.");
  } else {
    console.log("'about' page already exists.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
