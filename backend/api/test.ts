export default async (req: any, res: any) => {
  res.status(200).json({
    status: 'ok',
    message: 'Minimal Vercel function is working!',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      DB_PRESENT: !!process.env.DATABASE_URL,
      DB_LENGTH: process.env.DATABASE_URL?.length || 0,
    }
  });
};
