import { Module } from '@nestjs/common';
import { SupportPageController } from './support-page.controller';
import { SupportPageService } from './support-page.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SupportPageController],
  providers: [SupportPageService],
})
export class SupportPageModule {}
