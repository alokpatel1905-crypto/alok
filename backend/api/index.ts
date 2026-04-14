import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';


// Cache the server to prevent multiple bootstraps in the same instance
let cachedServer: any;

export const bootstrap = async () => {
  if (!cachedServer) {
    console.log('Bootstrapping NestJS application...');
    
    try {
      const app = await NestFactory.create(AppModule);
      
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        }),
      );
      
      app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
      });
      
      await app.init();
      cachedServer = app.getHttpAdapter().getInstance();
      console.log('NestJS application initialized successfully.');
    } catch (err) {
      console.error('FATAL: Failed to bootstrap NestJS application:', err);
      throw err;
    }
  }
  return cachedServer;
};


export default async (req: any, res: any) => {
  console.log('REQUEST RECEIVED:', req.method, req.url);
  
  // Manual CORS for all responses including errors
  // Using explicit origin because credentials: true is incompatible with '*'
  const origin = req.headers.origin || 'https://alok-lilac-rho.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }


  try {
    const app = await bootstrap();
    app(req, res);
  } catch (err: any) {
    console.error('SERVERLESS_HANDLER_ERROR:', err);
    res.status(500).json({
      statusCode: 500,
      message: `Internal Server Error: ${err instanceof Error ? err.message : String(err)}\nStack: ${err?.stack}`,
      error: err instanceof Error ? err.message : String(err),
      type: err?.name || 'UnknownError',
      stack: err?.stack,
    });

  }

};

