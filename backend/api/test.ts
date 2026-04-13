import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

export default async (req: any, res: any) => {
  let dbStatus = 'untested';
  let dbError = null;
  let userCount = 0;

  try {
    const connectionString = process.env.DATABASE_URL;
    if (connectionString) {
      const pool = new Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      const prisma = new PrismaClient({ adapter });
      userCount = await prisma.user.count();
      dbStatus = 'connected';
      await prisma.$disconnect();
      await pool.end();
    } else {
      dbStatus = 'no_url';
    }
  } catch (err: any) {
    dbStatus = 'failed';
    dbError = err.message;
  }

  res.status(200).json({
    status: 'ok',
    message: 'Test diagnosis completed.',
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      userCount,
      error: dbError,
    },
    env: {
      NODE_ENV: process.env.NODE_ENV,
      DB_PRESENT: !!process.env.DATABASE_URL,
      CLOUDINARY_PRESENT: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET),
    }
  });
};

