import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const media = await prisma.media.findMany();
  console.log("Media records:", media);
}

main().catch(console.error).finally(() => prisma.$disconnect());
