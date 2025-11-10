# Thư mục upload ảnh sản phẩm (Backend)

Thư mục này dùng để lưu trữ ảnh sản phẩm được upload từ admin panel.

## Cách sử dụng

1. **Upload ảnh:**
   - Admin có thể upload ảnh qua API `/api/products` (POST/PUT)
   - File sẽ được lưu vào thư mục này

2. **Truy cập ảnh:**
   - URL: `/uploads/products/{filename}`
   - Cần cấu hình static file serving trong Express

## Lưu ý

- Thư mục này nên được mount vào Docker volume để persist data
- Cần cấu hình CORS và file size limits
- Nên validate file type và size trước khi lưu

