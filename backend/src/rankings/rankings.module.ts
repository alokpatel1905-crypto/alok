import { Module } from '@nestjs/common';
import { RankingsController, RankingsDataController } from './rankings.controller';
import { RankingsService } from './rankings.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RankingsController, RankingsDataController],
  providers: [RankingsService],
})
export class RankingsModule {}
