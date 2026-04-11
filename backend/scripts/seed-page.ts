import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const page = await prisma.page.create({
    data: {
      title: 'Home Page',
      slug: 'home',
      status: 'PUBLISHED',
      content: {
        hero: {
          title: "Welcome to Green Mentors",
          subtitle: "Empowering the next generation of eco-leaders"
        },
        sections: [
          {
            id: 1,
            title: "Our Mission",
            text: "To transform education for a sustainable future."
          }
        ]
      }
    },
  });
  console.log('Created PAGE:', page);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
