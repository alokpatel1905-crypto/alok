import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { SeedController } from './seed.controller';

@Module({
  controllers: [PagesController, SeedController],
  providers: [PagesService],
})
export class PagesModule {}