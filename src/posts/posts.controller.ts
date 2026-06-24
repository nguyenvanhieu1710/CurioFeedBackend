import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
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

  @EventPattern('curiofeed.new_articles')
  async handleNewArticle(@Payload() message: any) {
    try {
      const postData = typeof message === 'string' ? JSON.parse(message) : message;
      await this.postsService.upsertPost(postData);
      console.log(`[Kafka] Đã nhận và lưu thành công: ${postData.content_hash}`);
    } catch (error) {
      console.error('Lỗi khi xử lý message từ Kafka:', error);
    }
  }
}
