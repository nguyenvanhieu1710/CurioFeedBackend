import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('random')
  async getRandomPost() {
    const post = await this.postsService.getRandomPost();
    if (!post) {
      return { message: 'Database hiện chưa có bài viết nào.' };
    }
    return post;
  }

  @Get('random-batch')
  async getRandomBatch(@Query('count') count: string) {
    const numCount = parseInt(count, 10) || 5;
    // Giới hạn tối đa 20 bài một lần fetch để tránh quá tải
    const safeCount = Math.min(Math.max(numCount, 1), 20);
    return this.postsService.getRandomBatch(safeCount);
  }
}
