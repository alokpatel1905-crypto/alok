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
  // Delete existing if any
  const existing = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (existing) {
    await prisma.section.deleteMany({ where: { pageId: existing.id } });
    await prisma.page.delete({ where: { id: existing.id } });
  }

  const page = await prisma.page.create({
    data: {
      title: 'Home Page',
      slug: 'home',
      status: 'PUBLISHED',
      sections: {
        create: [
          {
            sectionKey: 'hero',
            order: 0,
            content: {
              title: "Welcome to Green Mentors",
              description: "Empowering the next generation of eco-leaders",
              badgeText: "Global Initiative"
            }
          },
          {
            sectionKey: 'stats',
            order: 1,
            content: {
              title: "Our Mission",
              stats: [
                { value: "100%", label: "Commitment", icon: "globe" }
              ]
            }
          }
        ]
      }
    },
  });
  console.log('Created PAGE with sections:', page.id);
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
