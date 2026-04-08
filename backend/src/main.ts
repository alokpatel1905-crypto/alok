import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { existsSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const uploadsPath = join(process.cwd(), 'uploads');
  console.log('Uploads path:', uploadsPath);
  console.log('Uploads folder exists:', existsSync(uploadsPath));

  app.useStaticAssets(uploadsPath, {
    prefix: '/uploads',
  });

  app.enableCors();

  await app.listen(4000, '0.0.0.0');
  console.log('Backend running on http://localhost:4000');
}
bootstrap();