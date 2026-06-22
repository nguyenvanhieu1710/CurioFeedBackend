# CurioFeed Backend ⚡

Đây là hệ thống API Server phục vụ cho dự án CurioFeed. Backend được xây dựng bằng **NestJS** và kết nối với MongoDB thông qua **Mongoose**. 

Hệ thống cung cấp các endpoint RESTful để Frontend có thể lấy danh sách bài viết một cách ngẫu nhiên.

## Yêu cầu hệ thống
- Node.js (phiên bản LTS, khuyên dùng v18 hoặc v20)
- npm hoặc yarn

## Hướng dẫn cài đặt

1. Mở terminal và di chuyển vào thư mục `backend`:
   ```bash
   cd backend
   ```

2. Cài đặt các thư viện Node.js:
   ```bash
   npm install
   ```

3. Cấu hình Database:
   Tạo file `.env` tại thư mục `backend/` và thêm chuỗi kết nối MongoDB của bạn vào:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/curiofeed
   PORT=3000
   ```

## Khởi chạy Backend

### Môi trường phát triển (Development)
```bash
npm run start:dev
```
*Server sẽ tự động reload lại mỗi khi bạn chỉnh sửa code. Mặc định chạy tại `http://localhost:3000`*

### Môi trường sản xuất (Production)
```bash
npm run build
npm run start:prod
```

## Các API Endpoints chính

- `GET /api/posts/random`: Lấy 1 bài viết ngẫu nhiên.
- `GET /api/posts/random-batch?count=5`: Lấy danh sách 5 bài viết ngẫu nhiên cùng lúc (Dùng cho tính năng Pre-fetch của Frontend để tăng trải nghiệm người dùng).
