import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import { AppModule } from '../src/app.module';

// Cache the server to prevent multiple bootstraps in the same instance
let cachedServer: any;

export const bootstrap = async () => {
  if (!cachedServer) {
    console.log('Bootstrapping NestJS application...');
    
    // Check for critical environment variables
    if (!process.env.DATABASE_URL) {
      console.error('CRITICAL: DATABASE_URL is not set!');
    } else {
      console.log('DATABASE_URL detected (length: ' + process.env.DATABASE_URL.length + ')');
    }

    try {
      const server = express();
      const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
      
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

      cachedServer = server;
      console.log('NestJS application initialized successfully.');
    } catch (err) {
      console.error('FATAL: Failed to bootstrap NestJS application:', err);
      throw err;
    }
  }
  return cachedServer;
};

export default async (req: any, res: any) => {
  try {
    const app = await bootstrap();
    app(req, res);
  } catch (err: any) {
    console.error('SERVERLESS_HANDLER_ERROR:', err);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error during application bootstrap',
      error: err instanceof Error ? err.message : String(err),
      type: err?.name || 'UnknownError',
      stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined,
    });
  }
};
