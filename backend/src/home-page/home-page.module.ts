import { Module } from '@nestjs/common';
import { HomePageController } from './home-page.controller';
import { HomePageService } from './home-page.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HomePageController],
  providers: [HomePageService],
})
export class HomePageModule {}
