import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';

let cachedServer: any;

export const bootstrap = async () => {
  if (!cachedServer) {
    console.log('Bootstrapping NestJS application...');
    
    if (!process.env.DATABASE_URL) {
      console.error('CRITICAL: DATABASE_URL is not set in environment variables');
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
      
      app.enableCors();
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
  } catch (err) {
    console.error('Request processing failed during bootstrap:', err);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error during application bootstrap',
      error: process.env.NODE_ENV === 'development' ? err : undefined,
    });
  }
};
