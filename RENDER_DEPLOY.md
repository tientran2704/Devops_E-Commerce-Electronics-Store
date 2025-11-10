# Hướng dẫn deploy lên Render.com

## 🚀 Cấu hình Render

### Frontend Service

1. **Tạo Web Service mới:**
   - Repository: `https://github.com/tientran2704/Devops_E-Commerce-Electronics-Store`
   - Branch: `main`
   - Root Directory: (để trống - sẽ dùng Dockerfile ở root)
   - Environment: `Docker`
   - Dockerfile Path: `Dockerfile` (hoặc để trống)

2. **Environment Variables:**
   ```
   VITE_API_BASE=https://your-backend-service.onrender.com
   ```

3. **Build Command:** (không cần, Render sẽ tự động build từ Dockerfile)

4. **Start Command:** (không cần, đã có trong Dockerfile)

### Backend Service

1. **Tạo Web Service mới:**
   - Repository: `https://github.com/tientran2704/Devops_E-Commerce-Electronics-Store`
   - Branch: `main`
   - Root Directory: `backend`
   - Environment: `Docker`
   - Dockerfile Path: `Dockerfile`

2. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=8080
   DB_HOST=your-db-host
   DB_PORT=3306
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=ecommerce
   JWT_SECRET=your-secret-key
   ```

3. **Database:**
   - Tạo MySQL database trên Render
   - Lấy connection string và cập nhật environment variables

### Database Service

1. **Tạo MySQL Database:**
   - Plan: Free hoặc Starter
   - Database Name: `ecommerce`

2. **Initialize Database:**
   - Chạy script `db/init.sql` trong database console
   - Hoặc sử dụng migration script

## 📝 Lưu ý

- Frontend Dockerfile đã được tạo ở root để Render có thể build
- Backend cần cấu hình Root Directory là `backend`
- Cần cập nhật `VITE_API_BASE` trong frontend để trỏ đến backend service
- Database cần được khởi tạo với schema từ `db/init.sql`

## 🔧 Troubleshooting

### Lỗi "Dockerfile not found"
- Đảm bảo Dockerfile ở root của repository
- Kiểm tra Root Directory trong Render settings

### Lỗi kết nối database
- Kiểm tra environment variables
- Đảm bảo database đã được tạo và initialized
- Kiểm tra network connectivity giữa services

### Lỗi build frontend
- Kiểm tra `VITE_API_BASE` environment variable
- Đảm bảo backend service đã được deploy và accessible

