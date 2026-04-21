import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MediaPageService } from './media-page.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/media-page')
export class MediaPageController {
  constructor(private readonly service: MediaPageService) {}

  // Config
  @Get('config')
  getConfig() {
    return this.service.getConfig();
  }

  @Patch('config')
  @UseGuards(JwtAuthGuard)
  updateConfig(@Body() body: any) {
    return this.service.updateConfig(body);
  }

  // Posts
  @Get('posts')
  getAllPosts() {
    return this.service.getAllPosts();
  }

  @Post('posts')
  @UseGuards(JwtAuthGuard)
  createPost(@Body() body: any) {
    return this.service.createPost(body);
  }

  @Patch('posts/:id')
  @UseGuards(JwtAuthGuard)
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.service.updatePost(id, body);
  }

  @Delete('posts/:id')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('id') id: string) {
    return this.service.deletePost(id);
  }
}

// Public Endpoint Controller (No JWT)
@Controller('api/public/media')
export class MediaPagePublicController {
  constructor(private readonly service: MediaPageService) {}

  @Get()
  async getPublicPage() {
    const [config, posts] = await Promise.all([
      this.service.getConfig(),
      this.service.getPosts(),
    ]);

    // Map `posts` into `items` format expected by frontend
    return {
      ...config,
      items: posts
    };
  }
}
