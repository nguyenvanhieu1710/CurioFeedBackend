import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Kích hoạt CORS để Frontend có thể gọi API được
  app.enableCors();
  
  // Lắng nghe ở cổng 3000 (mặc định) hoặc cổng theo môi trường
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
