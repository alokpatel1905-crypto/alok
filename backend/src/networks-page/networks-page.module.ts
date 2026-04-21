import { Module } from '@nestjs/common';
import { NetworksPageController } from './networks-page.controller';
import { NetworksPageService } from './networks-page.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NetworksPageController],
  providers: [NetworksPageService],
})
export class NetworksPageModule {}
