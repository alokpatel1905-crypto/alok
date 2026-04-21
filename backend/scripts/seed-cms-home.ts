import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding CMS Home Page...');

  // Delete existing home page if it exists
  const existingHome = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (existingHome) {
    // Delete sections first due to relations if onDelete: Cascade wasn't fully applied in DB
    await prisma.section.deleteMany({ where: { pageId: existingHome.id } });
    await prisma.page.delete({ where: { id: existingHome.id } });
  }

  const homePage = await prisma.page.create({
    data: {
      title: 'Home',
      slug: 'home',
      metaTitle: 'Home | Green Mentors',
      metaDescription: 'Building the blueprint for schools, universities, and educators to design, execute, and sustain zero-carbon educational ecosystems globally.',
      status: 'PUBLISHED',
      sections: {
        create: [
          {
            sectionKey: 'hero',
            order: 0,
            content: {
              title: 'Transforming Education \n for a Sustainable Future',
              description: 'Green Mentors empowers schools, universities, teachers, graduates, and education ecosystems through accreditation, rankings, events, awards, global networks, and sustainability-led collaboration.',
              badgeText: 'Global Greening Education Initiative',
              ctaLabel: 'Explore Programs',
              ctaLink: '#programs',
              secondaryCtaLabel: 'Join the Movement',
              secondaryCtaLink: '#support'
            }
          },
          {
            sectionKey: 'stats',
            order: 1,
            content: {
              title: 'Global Impact in Motion',
              description: 'Our global education transformation mission spans continents, tangibly equipping institutions and communities with the blueprints for a zero-carbon future.',
              stats: [
                { value: '8,000+', label: 'Schools & Universities', icon: 'building' },
                { value: '50,000+', label: 'Educators Trained', icon: 'book' },
                { value: '10 Million', label: 'Students Empowered', icon: 'users' },
                { value: '45', label: 'Countries Reached', icon: 'globe' }
              ]
            }
          },
          {
            sectionKey: 'cards',
            order: 2,
            content: {
              title: 'Explore the Green Mentors Ecosystem',
              description: 'Discover accreditation pathways, global rankings, international events, and sustainability networks structured for worldwide institutional growth.',
              cards: [
                { title: 'Programs', items: ['Green School', 'Green University', 'Green Teacher', 'Green Graduate', 'Green Fellowship'] },
                { title: 'Rankings', items: ['Global Green School Ranking', 'Global Green University Ranking', 'National Green University Ranking'] },
                { title: 'Events', items: ['NYC Green School Conference', 'NYC Children\'s Climate Conference', 'World Education Forum – Davos', 'Global Green Mentors Conference'] },
                { title: 'Networks', items: ['Global Green Teacher Network', 'Global Green Schools Network', 'Global Green University Network', 'Global Green Graduates Network', 'Global Green Innovator Network'] }
              ]
            }
          },
          {
            sectionKey: 'cta',
            order: 3,
            content: {
              title: 'Ready to Green your Institution?',
              description: 'Join thousands of schools and universities worldwide committed to environmental excellence and sustainability education.',
              buttonLabel: 'Get Started Now',
              buttonLink: '/contact'
            }
          }
        ]
      }
    }
  });

  console.log('Home page seeded successfully:', homePage.id);
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
