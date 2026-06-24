import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Cấu hình Kafka Microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
        clientId: 'curiofeed-backend',
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID || 'curiofeed-consumer-group',
      },
    },
  });

  // Kích hoạt CORS để Frontend có thể gọi API được
  app.enableCors();
  
  // Khởi động cả HTTP server và Microservices (Kafka)
  await app.startAllMicroservices();
  
  // Lắng nghe ở cổng 3000 (mặc định) hoặc cổng theo môi trường
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
