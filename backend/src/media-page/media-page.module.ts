import { Module } from '@nestjs/common';
import { MediaPageService } from './media-page.service';
import { MediaPageController, MediaPagePublicController } from './media-page.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MediaPageController, MediaPagePublicController],
  providers: [MediaPageService],
})
export class MediaPageModule {}
