import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async getRandomPost(): Promise<Post> {
    // $sample lấy một số lượng document ngẫu nhiên từ collection
    const results = await this.postModel.aggregate([{ $sample: { size: 1 } }]);
    return results[0] || null;
  }

  async getRandomBatch(count: number): Promise<Post[]> {
    const results = await this.postModel.aggregate([{ $sample: { size: count } }]);
    return results;
  }
}
