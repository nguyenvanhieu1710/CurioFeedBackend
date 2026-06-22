import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

// Tải biến môi trường ưu tiên .env.local cực kỳ mạnh
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envLocalPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} else {
  dotenv.config();
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/curiofeed';

@Module({
  imports: [
    // Kết nối MongoDB Atlas bằng Mongoose
    MongooseModule.forRoot(MONGODB_URI),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
