import { Module } from '@nestjs/common';
import { AwardsPageController } from './awards-page.controller';
import { AwardsPageService } from './awards-page.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AwardsPageController],
  providers: [AwardsPageService],
})
export class AwardsPageModule {}
