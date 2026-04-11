import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.page.findMany({
    select: { id: true, title: true, slug: true }
  });
  console.log('All Pages:', pages);
  
  const targetId = 'cmnsfqdg10000f8ueozpqq871';
  const found = await prisma.page.findUnique({
    where: { id: targetId }
  });
  console.log(`Searching for ID ${targetId}:`, found);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
