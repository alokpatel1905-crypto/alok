// backend/scripts/check-admin.ts
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main(){
  const admin = await prisma.user.findUnique({ where: { email: 'admin@test.com' } });
  console.log('Admin user:', admin);
}
main().catch(e=>{console.error(e); process.exit(1);}).finally(()=>prisma.$disconnect());
