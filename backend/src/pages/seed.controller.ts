import { Controller, Post } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly pagesService: PagesService) {}

  @Post('page')
  async seedPage() {
    // Attempt to delete home first to avoid slug conflict if we want a fresh seed via API
    try {
      const existing = await this.pagesService.findBySlug('home');
      if (existing) {
        await this.pagesService.remove(existing.id);
      }
    } catch (e) {}

    return this.pagesService.create({
      title: 'Home Page',
      slug: 'home',
      status: 'PUBLISHED',
      sections: [
        {
          sectionKey: 'hero',
          order: 0,
          content: {
            title: "Welcome to Green Mentors",
            description: "Empowering the next generation of eco-leaders"
          }
        },
        {
          sectionKey: 'stats',
          order: 1,
          content: {
            title: "Our Mission",
            stats: [
              { value: "10", label: "Countries", icon: "globe" }
            ]
          }
        }
      ]
    });
  }
}
