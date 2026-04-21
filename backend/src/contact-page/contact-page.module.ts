import { Module } from '@nestjs/common';
import { ContactPageController } from './contact-page.controller';
import { ContactPagePublicController } from './contact-page.public.controller';
import { ContactPageService } from './contact-page.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContactPageController, ContactPagePublicController],
  providers: [ContactPageService],
})
export class ContactPageModule {}
