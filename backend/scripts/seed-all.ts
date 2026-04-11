import 'dotenv/config';
import { PrismaClient, Role, InstitutionType, ProgramStatus, PageStatus, SubmissionStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed process...');

  // 1. Create a Super Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@greenmentors.com' },
    update: {},
    create: {
      email: 'admin@greenmentors.com',
      name: 'Super Admin',
      passwordHash: passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log('Admin user created:', admin.email);

  // 2. Create an Institution
  const institution = await prisma.institution.create({
    data: {
      name: 'Green University',
      type: InstitutionType.UNIVERSITY,
      email: 'contact@green-u.edu',
      country: 'USA',
      managedById: admin.id,
    },
  });
  console.log('Institution created:', institution.name);

  // 3. Create a Program
  const program = await prisma.program.create({
    data: {
      title: 'Sustainability 101',
      slug: 'sustainability-101',
      description: 'An introductory course on sustainable practices.',
      status: ProgramStatus.PUBLISHED,
    },
  });
  console.log('Program created:', program.title);

  // 4. Create an Event
  const event = await prisma.event.create({
    data: {
      title: 'Green Summit 2026',
      description: 'Annual summit for global sustainability.',
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-06-03'),
      location: 'New York City',
      institutionId: institution.id,
    },
  });
  console.log('Event created:', event.title);

  // 5. Create a Ranking Submission
  await prisma.rankingSubmission.create({
    data: {
      category: 'Eco-Friendly Campus',
      year: 2026,
      status: SubmissionStatus.SUBMITTED,
      institutionId: institution.id,
    },
  });
  console.log('Ranking submission created for:', institution.name);

  console.log('Seed process completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
