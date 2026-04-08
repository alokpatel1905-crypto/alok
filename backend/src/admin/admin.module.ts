import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProgramsModule } from '../programs/programs.module';

@Module({
  imports: [ProgramsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}