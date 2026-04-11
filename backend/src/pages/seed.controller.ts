import { Controller, Post } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly pagesService: PagesService) {}

  @Post('page')
  async seedPage() {
    return this.pagesService.create({
      title: 'Home Page',
      slug: 'home',
      status: 'PUBLISHED',
      content: {
        hero: {
          title: "Welcome to Green Mentors",
          subtitle: "Empowering the next generation of eco-leaders"
        },
        sections: [
          {
            id: 1,
            title: "Our Mission",
            text: "To transform education for a sustainable future."
          }
        ]
      }
    });
  }
}
