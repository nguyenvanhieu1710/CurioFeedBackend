import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true }) // Tự động thêm createdAt và updatedAt
export class Post {
  @Prop({ required: true })
  content: string; // Nội dung bài viết (bắt buộc)

  @Prop({ type: [String], default: [] })
  image_urls: string[]; // Danh sách link ảnh tĩnh (JPEG, PNG...)

  @Prop({ type: [String], default: [] })
  video_urls: string[]; // Danh sách link video nếu bài post chứa video

  @Prop({ default: '0' })
  reactions: string; // Số lượng like/reaction (VD: '1.2K')

  @Prop({ default: '0' })
  comments_count: string; // Số lượng bình luận

  @Prop({ default: '0' })
  shares_count: string; // Số lượng lượt chia sẻ

  @Prop()
  source_name: string; // Tên Fanpage/Group (VD: 'Beatvn')

  @Prop()
  source_url: string; // URL của Page/Group

  @Prop()
  permalink: string; // Link trực tiếp đến bài viết đó

  @Prop({ required: true, unique: true })
  content_hash: string; // Mã băm (SHA256) của content để chống lưu trùng lặp

  @Prop({ default: 'facebook' })
  platform: string; // Nền tảng lấy bài (facebook, reddit, v.v.)

  @Prop({ default: Date.now })
  crawled_at: Date; // Thời điểm crawler lấy bài này về
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ content_hash: 1 }, { unique: true });
